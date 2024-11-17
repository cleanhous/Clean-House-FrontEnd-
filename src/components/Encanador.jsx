import React, { useState, useEffect } from "react";
import NavBarHome from "./NavBarHome";
import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import { useNavigate } from "react-router-dom";
import ptBR from "date-fns/locale/pt-BR";
import "react-datepicker/dist/react-datepicker.css";
import Filtro from "./Filtro";

registerLocale("pt-BR", ptBR);

const Encanadores = () => {
  // Estados para o filtro
  const [filtroNota, setFiltroNota] = useState("");
  const [precoDe, setPrecoDe] = useState("");
  const [precoAte, setPrecoAte] = useState("");
  const [dataInicial, setDataInicial] = useState(null);
  const [dataFinal, setDataFinal] = useState(null);

  // Estados para os encanadores
  // eslint-disable-next-line no-unused-vars
  const [encanadores, setEncanadores] = useState([]);
  const [filteredEncanadores, setFilteredEncanadores] = useState([]);

  // Estados para o popup de contratação
  const [showPopup, setShowPopup] = useState(false);
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
  const [selectedEncanador, setSelectedEncanador] = useState(null);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [observacoes, setObservacoes] = useState("");

  const navigate = useNavigate();

  // Função para buscar encanadores
  const fetchEncanadores = async () => {
    try {
      const response = await fetch("http://localhost:3000/encanador");
      const data = await response.json();
      setEncanadores(data);
      setFilteredEncanadores(data); // Inicializa com todos os encanadores
    } catch (error) {
      console.error("Erro ao buscar encanadores:", error);
    }
  };

  // Hook para buscar os encanadores quando o componente monta
  useEffect(() => {
    fetchEncanadores();
  }, []);

  // Função para aplicar os filtros e buscar encanadores disponíveis com base nas informações fornecidas
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

        const response = await fetch(
          `http://localhost:3000/prestadores-disponiveis/encanador?${queryParams}`
        );
        data = await response.json();
      } else {
        // Se as datas não forem fornecidas, buscar todos os encanadores
        const response = await fetch("http://localhost:3000/encanador");
        data = await response.json();
      }

      // Aplicar os filtros de nota e preço no frontend
      const filtered = data.filter((encanador) => {
        let matches = true;

        // Filtrar por nota
        if (filtroNota) {
          matches =
            matches && parseInt(encanador.nota) === parseInt(filtroNota);
        }

        // Filtrar por preço mínimo
        if (precoDe) {
          matches = matches && encanador.preco >= parseFloat(precoDe);
        }

        // Filtrar por preço máximo
        if (precoAte) {
          matches = matches && encanador.preco <= parseFloat(precoAte);
        }

        return matches;
      });

      // Atualiza a lista de encanadores exibidos com os filtros aplicados
      setFilteredEncanadores(filtered);
    } catch (error) {
      console.error("Erro ao buscar encanadores:", error);
    }
  };

  // Funções para o popup de contratação
  const handleCheckAvailability = (encanador) => {
    setSelectedEncanador(encanador);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedEncanador(null);
    setSelectedStartDate(null);
    setSelectedEndDate(null);
    setObservacoes("");
  };

  const handleStartDateChange = (date) => {
    setSelectedStartDate(date);
    setSelectedEndDate(null);
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

      const response = await fetch("http://localhost:3000/contrato", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          prestadorId: selectedEncanador.id,
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
          Serviços de Encanador
        </h1>
        <p className="text-center text-lg text-white mb-8">
          Oferecemos serviços de encanador de alta qualidade, garantindo
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

        {/* Lista de Encanadores */}
        <h1 className="text-2xl font-semibold text-white text-center mb-6">
          Nossos Encanadores
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredEncanadores.length > 0 ? (
            filteredEncanadores.map((encanador) => (
              <div
                key={encanador.id}
                className="bg-white p-4 rounded-lg shadow-lg"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-sky-700">
                    {encanador.nome}
                  </h3>
                  <img
                    className="w-20 h-20"
                    src="https://cdn-icons-png.flaticon.com/512/3135/3135768.png"
                    alt=""
                  />
                </div>

                <p className="text-gray-600">{encanador.titulo}</p>
                <p className="text-gray-600">{encanador.descricao}</p>
                <p className="font-semibold text-sky-600">
                  {formatarPreco(encanador.preco)}
                </p>

                <div className="flex items-center mt-4">
                
                  <span className="text-gray-500">Contato via
                  <a href={`https://wa.me/55${encanador.telefone.replace(/[^\d]/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-green-700 "> Whatsapp
                  </a>
                  </span>
                </div>

                {/* Exibir Avaliação */}
                <div className="flex items-center">
                  {Array.from({ length: 5 }, (_, index) => (
                    <svg
                      key={index}
                      className={`w-4 h-4 ${
                        index < Math.floor(encanador.nota)
                          ? "text-yellow-500"
                          : "text-gray-400"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.17 3.592a1 1 0 00.95.691h3.828c.969 0 1.371 1.24.588 1.81l-3.1 2.254a1 1 0 00-.364 1.118l1.17 3.592c.3.921-.755 1.688-1.54 1.118l-3.1-2.254a1 1 0 00-1.176 0l-3.1 2.254c-.784.57-1.838-.197-1.539-1.118l1.17-3.592a1 1 0 00-.364-1.118l-3.1-2.254c-.783-.57-.38-1.81.588-1.81h3.829a1 1 0 00.95-.691l1.17-3.592z" />
                    </svg>
                  ))}
                </div>

                <div className="text-center mt-4">
                  <button
                    onClick={() => handleCheckAvailability(encanador)}
                    className="bg-sky-700 text-white font-bold py-2 px-4 rounded-lg hover:bg-sky-600 transition"
                  >
                    Verificar Disponibilidade
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-white">
              Nenhum encanador disponível no momento.
            </p>
          )}
        </div>
      </div>
      {/* Popup de Contratação */}
      {showPopup && selectedEncanador && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-sky-700">
              Contratar {selectedEncanador.nome}
            </h2>
            <p className="mb-2">
              Selecione as datas de início e fim para o serviço:
            </p>

            <div className="mb-4">
              <label className="block mb-2 text-sm">Data de Início:</label>
              <DatePicker
                locale="pt-BR"
                selected={selectedStartDate}
                onChange={handleStartDateChange}
                dateFormat="dd/MM/yyyy"
                minDate={new Date()}
                className="w-full border border-gray-300 p-2 rounded-md"
                placeholderText="Selecione uma data de início"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-sm">Data de Fim:</label>
              <DatePicker
                locale="pt-BR"
                selected={selectedEndDate}
                onChange={handleEndDateChange}
                dateFormat="dd/MM/yyyy"
                minDate={selectedStartDate || new Date()}
                className="w-full border border-gray-300 p-2 rounded-md"
                placeholderText="Selecione uma data de fim"
                disabled={isEndDateDisabled}
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-sm">Observações:</label>
              <textarea
                value={observacoes}
                onChange={handleObservacoesChange}
                placeholder="Adicione observações sobre o serviço"
                className="w-full border border-gray-300 p-2 rounded-md"
                rows="3"
              ></textarea>
            </div>

            <div className="flex justify-between mt-6">
              <button
                className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-600 transition"
                onClick={closePopup}
              >
                Cancelar
              </button>
              <button
                className="bg-sky-700 text-white font-bold py-2 px-4 rounded-lg hover:bg-sky-600 transition"
                onClick={handleConfirmation}
                disabled={!selectedStartDate || !selectedEndDate}
              >
                Confirmar Contratação
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Popup de Confirmação */}
      {showConfirmationPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-sky-700">
              Contratação Confirmada!
            </h2>
            <p className="mb-4">
              O serviço foi agendado com sucesso. Você pode acompanhar os
              detalhes na seção de pedidos.
            </p>
            <button
              onClick={handleRedirect}
              className="bg-sky-700 text-white font-bold py-2 px-4 rounded-lg hover:bg-sky-600 transition w-full"
            >
              Ir para Pedidos
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Encanadores;
