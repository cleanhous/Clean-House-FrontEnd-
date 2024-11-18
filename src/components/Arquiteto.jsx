import { useState, useEffect } from "react";
import NavBarHome from "./NavBarHome";
import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import { useNavigate } from "react-router-dom";
import ptBR from "date-fns/locale/pt-BR";
import "react-datepicker/dist/react-datepicker.css";
import Filtro from "./Filtro";
import axios from "axios";

registerLocale("pt-BR", ptBR);

const Arquiteto = () => {
  // Estados para o filtro
  const [filtroNota, setFiltroNota] = useState("");
  const [precoDe, setPrecoDe] = useState("");
  const [precoAte, setPrecoAte] = useState("");
  const [dataInicial, setDataInicial] = useState(null);
  const [dataFinal, setDataFinal] = useState(null);

  // Estados para os arquitetos
  const [arquitetos, setArquitetos] = useState([]);
  const [filteredArquitetos, setFilteredArquitetos] = useState([]);

  // Estados para o popup de contratação
  const [showPopup, setShowPopup] = useState(false);
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
  const [selectedArquiteto, setSelectedArquiteto] = useState(null);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [observacoes, setObservacoes] = useState("");
  const [prestadorSchedule, setPrestadorSchedule] = useState([]); // Estado para a agenda

  const navigate = useNavigate();

  // Função para buscar arquitetos
  const fetchArquitetos = async () => {
    try {
      const response = await fetch("https://backend-production-ce19.up.railway.app/arquiteto");
      const data = await response.json();
      setArquitetos(data);
      setFilteredArquitetos(data); // Inicializa com todos os arquitetos
    } catch (error) {
      console.error("Erro ao buscar arquitetos:", error);
    }
  };

  // Hook para buscar os arquitetos quando o componente monta
  useEffect(() => {
    fetchArquitetos();
  }, []);

  // Hook para buscar a agenda do prestador quando um eletricista é selecionado
  useEffect(() => {
    if (selectedArquiteto) {
      axios
        .get(
          `https://backend-production-ce19.up.railway.app/prestadores/${selectedArquiteto.id}/schedule`
        )
        .then((response) => {
          setPrestadorSchedule(response.data);
        })
        .catch((error) => {
          console.error("Erro ao buscar agenda:", error);
        });
    }
  }, [selectedArquiteto]);

  // Função para verificar se uma data está ocupada
  const isDateOccupied = (date) => {
    return prestadorSchedule.some((item) => {
      const start = new Date(item.data_inicio);
      const end = new Date(item.data_fim);
      // Ajustar as horas para comparar apenas as datas
      start.setHours(0, 0, 0, 0);
      end.setHours(23, 59, 59, 999);
      date.setHours(0, 0, 0, 0);
      return date >= start && date <= end;
    });
  };

  // Função para renderizar o conteúdo dos dias
  const renderDayContents = (day, date) => {
    const isOccupied = isDateOccupied(new Date(date));

    const style = {
      backgroundColor: isOccupied ? "#f87171" : undefined, // Vermelho para datas ocupadas
      color: isOccupied ? "white" : undefined,
      borderRadius: "0.25rem",
      width: "2rem",
      height: "2rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "0 auto",
    };

    return <div style={style}>{day}</div>;
  };


  // Função para aplicar os filtros e buscar arquitetos disponíveis com base nas informações fornecidas
  const handleFiltrar = async () => {
    try {
      let data = [];

      // Verifica se as datas foram fornecidas
      if (dataInicial && dataFinal) {
        // Enviar a requisição para a API do backend com as datas
        const queryParams = new URLSearchParams({
          dataInicio: dataInicial.toISOString(),
          dataFim: dataFinal.toISOString(),
        });

        const response = await fetch(`https://backend-production-ce19.up.railway.app/prestadores-disponiveis/arquiteto?${queryParams}`);
        data = await response.json();
      } else {
        // Se as datas não forem fornecidas, buscar todos os arquitetos
        const response = await fetch("https://backend-production-ce19.up.railway.app/arquiteto");
        data = await response.json();
      }

      // Aplicar os filtros de nota e preço no frontend
      const filtered = data.filter((arquiteto) => {
        let matches = true;

        // Filtrar por nota
        if (filtroNota) {
          matches = matches && parseInt(arquiteto.nota) === parseInt(filtroNota);
        }

        // Filtrar por preço mínimo
        if (precoDe) {
          matches = matches && arquiteto.preco >= parseFloat(precoDe);
        }

        // Filtrar por preço máximo
        if (precoAte) {
          matches = matches && arquiteto.preco <= parseFloat(precoAte);
        }

        return matches;
      });

      // Atualiza a lista de arquitetos exibidos com os filtros aplicados
      setFilteredArquitetos(filtered);

    } catch (error) {
      console.error('Erro ao buscar arquitetos:', error);
    }
  };

  // Funções para o popup de contratação
  const handleCheckAvailability = (arquiteto) => {
    setSelectedArquiteto(arquiteto);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedArquiteto(null);
    setSelectedStartDate(null);
    setSelectedEndDate(null);
    setObservacoes("");
  };

  const handleStartDateChange = (date) => {
    setSelectedStartDate(date);
    setSelectedEndDate(null);
  };

  const filterEndDateTimes = (time) => {
    if (!selectedStartDate) return true; // Se a data inicial não estiver selecionada, não filtra
  
    // Permite que a data final seja igual à data inicial, mas o horário final deve ser posterior ao inicial
    return time > selectedStartDate;
  };

  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
  };

  const handleObservacoesChange = (e) => {
    setObservacoes(e.target.value);
  };

  const isEndDateDisabled = !selectedStartDate;

  const formatDateToMySQL = (date) => {
    return date.toISOString().slice(0, 19).replace("T", " ");
  };

  const handleConfirmation = async () => {
    try {
      const dataInicioFormatted = formatDateToMySQL(selectedStartDate);
      const dataFimFormatted = formatDateToMySQL(selectedEndDate);

      const response = await fetch("https://backend-production-ce19.up.railway.app/contrato", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          prestadorId: selectedArquiteto.id,
          dataInicio: dataInicioFormatted,
          dataFim: dataFimFormatted,
          observacao: observacoes,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Erro ao confirmar contratação:", errorData);
      } else {
        console.log("Contratação confirmada com sucesso");
        setShowPopup(false);
        setShowConfirmationPopup(true);
      }
    } catch (error) {
      console.error("Erro ao confirmar contratação:", error);
    }
  };

  const handleRedirect = () => {
    navigate("/pedidos");
  };

  const formatarPreco = (preco) => {
    return `R$ ${parseFloat(preco).toFixed(2)} por diária`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-sky-700">
      <NavBarHome showFAQ={false} />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-center text-white mb-4">
          Serviços de Arquiteto
        </h1>
        <p className="text-center text-lg text-white mb-8">
          Oferecemos serviços de arquiteto de alta qualidade, garantindo
          segurança e eficiência.
        </p>

        {/* Componente Filtro */}
        <Filtro
          filtroNota={filtroNota}
          setFiltroNota={setFiltroNota}
          precoDe={precoDe}
          setPrecoDe={setPrecoDe}
          precoAte={precoAte}
          setPrecoAte={setPrecoAte}
          dataInicial={dataInicial}
          setDataInicial={setDataInicial}
          dataFinal={dataFinal}
          setDataFinal={setDataFinal}
          onFiltrar={handleFiltrar}
        />

        {/* Lista de Arquitetos */}
        <h1 className="text-2xl font-semibold text-white text-center mb-6">
          Nossos Arquitetos
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredArquitetos.length > 0 ? (
            filteredArquitetos.map((arquiteto) => (
              <div
                key={arquiteto.id}
                className="bg-white p-4 rounded-lg shadow-lg"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-sky-700">
                    {arquiteto.nome}
                  </h3>
                  <img
                    className="w-20 h-20"
                    src="https://cdn-icons-png.flaticon.com/512/3135/3135768.png"
                    alt=""
                  />
                </div>

                <p className="text-gray-600">{arquiteto.titulo}</p>
                <p className="text-gray-600">{arquiteto.descricao}</p>
                <p className="font-semibold text-sky-600">
                  {formatarPreco(arquiteto.preco)}
                </p>

                <div className="flex items-center mt-4">
                  <span className="text-gray-500">Contato via
                  <a href={`https://wa.me/55${arquiteto.telefone.replace(/[^\d]/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-green-700 "> WhatsApp
                  </a>
                  </span>
                </div>

                {/* Exibir Avaliação */}
                <div className="flex items-center">
                  {Array.from({ length: 5 }, (_, index) => (
                    <svg
                      key={index}
                      className={`w-4 h-4 ${
                        index < Math.floor(arquiteto.nota)
                          ? "text-yellow-500"
                          : "text-gray-400"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.17 3.592a1 1 0 00.95.69h3.862c.969 0 1.371 1.24.588 1.81l-3.124 2.27a1 1 0 00-.364 1.118l1.17 3.592c.3.921-.755 1.688-1.538 1.118l-3.124-2.27a1 1 0 00-1.175 0l-3.124 2.27c-.783.57-1.838-.197-1.538-1.118l1.17-3.592a1 1 0 00-.364-1.118L2.34 9.02c-.783-.57-.38-1.81.588-1.81h3.862a1 1 0 00.95-.69l1.17-3.592z" />
                    </svg>
                  ))}
                  <span className="ml-2 text-gray-500">
                    ({arquiteto.nota})
                  </span>
                </div>

                <div className="mt-4 flex justify-center">
                  <button
                    className="bg-sky-600 text-white p-2 rounded-lg hover:bg-sky-700 w-60"
                    onClick={() => handleCheckAvailability(arquiteto)}
                  >
                    Contratar {arquiteto.nome}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-white">
              Nenhum arquiteto disponível no momento.
            </p>
          )}
        </div>
      </div>

      {/* Popup de Disponibilidade */}
      {showPopup && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold text-sky-700 mb-4">
              Disponibilidade de {selectedArquiteto.nome}
            </h2>
            <p className="mb-4">Selecione a data e o horário desejado:</p>

            {/* Data Inicial */}
            <div className="mb-4">
              <p>Data Inicial:</p>
                <DatePicker
                selected={selectedStartDate}
                onChange={handleStartDateChange}
                showTimeSelect
                dateFormat="Pp"
                locale="pt-BR"
                timeFormat="HH:mm"
                timeIntervals={30}
                className="border rounded-lg p-2 w-full"
                placeholderText="Escolha a data inicial"
                renderDayContents={renderDayContents}
                minDate={new Date()} // Impede seleção de datas passadas
                filterDate={(date) => !isDateOccupied(date)} // Desabilita as datas ocupadas
              />
            </div>

              {/* Data Final */}
              <div className="mb-4">
                <p>Data Final:</p>
                <DatePicker
                  selected={selectedEndDate}
                  onChange={handleEndDateChange}
                  showTimeSelect
                  dateFormat="Pp"
                  locale="pt-BR"
                  timeFormat="HH:mm"
                  timeIntervals={30}
                  filterTime={filterEndDateTimes}
                  selectsEnd
                  startDate={selectedStartDate}
                  endDate={selectedEndDate}
                  minDate={selectedStartDate || new Date()} // Considera a data inicial como limite mínimo
                  className="border rounded-lg p-2 w-full"
                  placeholderText="Escolha a data final"
                  disabled={isEndDateDisabled}
                  renderDayContents={renderDayContents}
                />
              </div>

            {/* Observações */}
            <div className="mb-4">
              <p>Observações:</p>
              <textarea
                className="border rounded-lg p-2 w-full"
                value={observacoes}
                onChange={handleObservacoesChange}
                placeholder="Adicione observações (opcional)"
              ></textarea>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                className="bg-gray-300 text-gray-800 p-2 rounded-lg hover:bg-gray-400"
                onClick={closePopup}
              >
                Cancelar
              </button>
              <button
                className="bg-sky-600 text-white p-2 rounded-lg hover:bg-sky-700"
                onClick={handleConfirmation}
                disabled={!selectedStartDate || !selectedEndDate}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Popup de Confirmação */}
      {showConfirmationPopup && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold text-sky-700 mb-4">
              Contratação Confirmada!
            </h2>
            <p className="mb-4">
              A contratação do arquiteto {selectedArquiteto.nome} foi
              realizada com sucesso!
            </p>
            <div className="flex justify-end">
              <button
                className="bg-sky-600 text-white p-2 rounded-lg hover:bg-sky-700"
                onClick={handleRedirect}
              >
                Ver Solicitações
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Arquiteto;
