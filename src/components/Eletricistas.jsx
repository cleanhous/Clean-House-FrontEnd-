import React, { useState, useEffect } from "react";
import NavBarHome from "./NavBarHome";
import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import { useNavigate } from "react-router-dom";
import ptBR from "date-fns/locale/pt-BR";
import "react-datepicker/dist/react-datepicker.css";

registerLocale("pt-BR", ptBR);

const Eletricistas = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
  const [selectedEletricista, setSelectedEletricista] = useState(null);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [observacoes, setObservacoes] = useState("");
  const [eletricistas, setEletricistas] = useState([]);
  const navigate = useNavigate();

  const fetchEletricistas = async () => {
    try {
      const response = await fetch("http://localhost:3000/eletricistas");
      const data = await response.json();
      console.log('Dados de eletricistas recebidos:', data); // Verifique aqui
      setEletricistas(data);
    } catch (error) {
      console.error("Erro ao buscar eletricistas:", error);
    }
  };
  

  // Hook para buscar os eletricistas quando o componente monta
  useEffect(() => {
    fetchEletricistas();
  }, []);

  

  const handleCheckAvailability = (eletricista) => {
    setSelectedEletricista(eletricista);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedEletricista(null);
    setSelectedStartDate(null);
    setSelectedEndDate(null);
    setObservacoes(""); // Limpa o campo de observações ao fechar o popup
  };

  const handleStartDateChange = (date) => {
    setSelectedStartDate(date);
    setSelectedEndDate(null); // Limpa a data final ao escolher nova data inicial
  };

  const handleEndDateChange = (date) => {
    if (selectedStartDate && date <= selectedStartDate && date.getTime() === selectedStartDate.getTime()) {
      const startHours = selectedStartDate.getHours();
      const startMinutes = selectedStartDate.getMinutes();
      const endHours = date.getHours();
      const endMinutes = date.getMinutes();

      if (endHours < startHours || (endHours === startHours && endMinutes <= startMinutes)) {
        alert("O horário final deve ser posterior ao horário inicial.");
        return;
      }
    }

    setSelectedEndDate(date);
  };

  const filterEndDateTimes = (time) => {
    if (!selectedStartDate) return true; // Se a data inicial não estiver selecionada, não filtra

    const hours = time.getHours();
    const isWithinWorkingHours = hours >= 8 && hours <= 17;

    return isWithinWorkingHours && time >= selectedStartDate;
  };

  const filterAvailableTimes = (time) => {
    const hours = time.getHours();
    return hours >= 8 && hours <= 17; // Restringe os horários entre 8h e 17h
  };

  const handleObservacoesChange = (e) => {
    setObservacoes(e.target.value);
  };

  const isEndDateDisabled = !selectedStartDate;

  const formatDateToMySQL = (date) => {
    return date.toISOString().slice(0, 19).replace('T', ' ');
  };
  
  const handleConfirmation = async () => {
    try {
      const dataInicioFormatted = formatDateToMySQL(selectedStartDate);
      const dataFimFormatted = formatDateToMySQL(selectedEndDate);
  
      const response = await fetch("http://localhost:3000/contrato", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          prestadorId: selectedEletricista.id,
          dataInicio: dataInicioFormatted,
          dataFim: dataFimFormatted,
          observacao: observacoes,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Erro ao confirmar contratação:", errorData);
      } else {
        console.log('Prestador ID recebido:', selectedEletricista.id);

        console.log("Contratação confirmada com sucesso");
        setShowConfirmationPopup(true);
      }
    } catch (error) {
      console.error("Erro ao confirmar contratação:", error);
    }
  };


  const handleRedirect = () => {
    navigate("/pedidos")
  };

  const formatarPreco = (preco) => {
    return `R$ ${parseFloat(preco).toFixed(2)} por diária`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-sky-700">
      <NavBarHome showFAQ={false} />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-center text-white mb-4">
          Serviços de Eletricista
        </h1>
        <p className="text-center text-lg text-white mb-8">
          Oferecemos serviços de eletricista de alta qualidade, garantindo
          segurança e eficiência.
        </p>

        <div className="mt-10">
          <h1 className="text-2xl font-semibold text-white text-center mb-6">
            Nossos Eletricistas
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {eletricistas.length > 0 ? (
              eletricistas.map((eletricista) => (
                <div
                  key={eletricista.id}
                  className="bg-white p-4 rounded-lg shadow-lg"
                >
                  <h3 className="text-lg font-bold text-sky-700">
                    {eletricista.nome}
                  </h3>
                  <p className="text-gray-600">{eletricista.titulo}</p>
                  <p className="text-gray-600">{eletricista.descricao}</p>
                  <p className="font-semibold text-sky-600">
                    {formatarPreco(eletricista.preco)}
                  </p>

                  {/* Exibir Avaliação */}
                  <div className="flex items-center">
                    {Array.from({ length: 5 }, (_, index) => (
                      <svg
                        key={index}
                        className={`w-4 h-4 ${
                          index < Math.floor(eletricista.nota)
                            ? "text-yellow-500"
                            : "text-gray-400"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M10 15.27L16.18 20 14.54 12.97 20 8.36l-7.19-.61L10 0 7.19 7.75 0 8.36l5.46 4.61L3.82 20z" />
                      </svg>
                    ))}
                    <span className="ml-2 text-gray-500">
                      ({eletricista.nota})
                    </span>
                  </div>

                  <div className="mt-4 flex justify-center">
                    <button
                      className="bg-sky-600 text-white p-2 rounded-lg hover:bg-sky-700 w-60"
                      onClick={() => handleCheckAvailability(eletricista)}
                    >
                      Verificar Disponibilidade
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-white">
                Nenhum eletricista disponível no momento.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Popup de disponibilidade */}
      {showPopup && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold text-sky-700 mb-4">
              Disponibilidade de {selectedEletricista.nome}
            </h2>
            <p className="mb-4">Selecione a data e o horário desejado:</p>

            {/* Calendário para a data inicial */}
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
                filterTime={filterAvailableTimes}
                className="border rounded-lg p-2 w-full"
                placeholderText="Escolha a data inicial"
              />
            </div>

            {/* Calendário para a data final */}
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
                minDate={selectedStartDate}
                className="border rounded-lg p-2 w-full"
                placeholderText="Escolha a data final"
                disabled={isEndDateDisabled}
              />
            </div>

            {/* Campo de observações */}
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

      {/* Popup de confirmação */}
      {showConfirmationPopup && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold text-sky-700 mb-4">
              Contratação Confirmada!
            </h2>
            <p className="mb-4">
              A contratação do eletricista {selectedEletricista.nome} foi
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

export default Eletricistas;
