import React, { useState } from "react";
import NavBarHome from "./NavBarHome";
import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import ptBR from "date-fns/locale/pt-BR"; // Importa o locale para português do Brasil
import "react-datepicker/dist/react-datepicker.css";
import eletricista1 from "/public/eletricistas/eletricista1.jpeg";
import eletricista2 from "/public/eletricistas/eletricista2.jpeg";
import eletricista3 from "/public/eletricistas/eletricista3.jpeg";

// Registra o locale para usar nas datas
registerLocale("pt-BR", ptBR);

const Eletricistas = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedEletricista, setSelectedEletricista] = useState(null);
  const [selectedStartDate, setSelectedStartDate] = useState(null); // Data inicial selecionada
  const [selectedEndDate, setSelectedEndDate] = useState(null); // Data final selecionada
  const [observacoes, setObservacoes] = useState(""); // Campo de observações

  const eletricistas = [
    {
      id: 1,
      nome: "Carlos Silva",
      especialidade: "Instalações Elétricas",
      foto: eletricista1,
      preco: "R$ 100/dia",
      avaliacao: 4.5,
      descricao: "Especialista em instalações elétricas seguras e eficientes.",
    },
    {
      id: 2,
      nome: "Rafael Souza",
      especialidade: "Manutenção Elétrica",
      foto: eletricista2,
      preco: "R$ 100/dia",
      avaliacao: 4.8,
      descricao: "Experiência em manutenção e reparos em sistemas elétricos.",
    },
    {
      id: 3,
      nome: "José Santos",
      especialidade: "Reparos Elétricos",
      foto: eletricista3,
      preco: "R$ 100/dia",
      avaliacao: 4.4,
      descricao: "Pronto para solucionar problemas elétricos de forma rápida.",
    },
  ];

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
    if (selectedStartDate && date <= selectedStartDate) {
      alert("A data e o horário final devem ser posteriores ao inicial.");
    } else {
      setSelectedEndDate(date);
    }
  };

  const filterEndDateTimes = (time) => {
    if (!selectedStartDate) return true; // Se a data inicial não estiver selecionada, não filtra

    // Compara a hora da data final com a hora da data inicial
    return time > selectedStartDate;
  };

  const filterAvailableTimes = (time) => {
    const hours = time.getHours();
    return hours >= 8 && hours <= 17; // Restringe os horários entre 8h e 17h
  };

  const handleObservacoesChange = (e) => {
    setObservacoes(e.target.value);
  };

  const isEndDateDisabled = !selectedStartDate; // Desabilita o campo de data final até que a data inicial seja escolhida

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

        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-sky-700">
            Serviços Oferecidos
          </h2>
          <ul className="list-disc ml-5 mt-2">
            <li>Instalação elétrica</li>
            <li>Manutenção de sistemas elétricos</li>
            <li>Verificação de segurança elétrica</li>
            <li>Instalação de iluminação</li>
            <li>Reparos elétricos gerais</li>
          </ul>
        </div>

        <div className="mt-10">
          <h1 className="text-2xl font-semibold text-white text-center mb-6">
            Nossos Eletricistas
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {eletricistas.map((eletricista) => (
              <div
                key={eletricista.id}
                className="bg-white p-4 rounded-lg shadow-lg"
              >
                <img
                  src={eletricista.foto}
                  alt={eletricista.nome}
                  className="h-48 object-cover rounded-lg mb-2"
                  style={{ objectFit: "contain" }} // Mantém a imagem completa
                />
                <h3 className="text-lg font-bold text-sky-700">
                  {eletricista.nome}
                </h3>
                <p className="text-gray-600">{eletricista.especialidade}</p>
                <p className="text-gray-600">{eletricista.descricao}</p>
                <p className="font-semibold text-sky-600">
                  {eletricista.preco}
                </p>

                <div className="flex items-center">
                  {Array.from({ length: 5 }, (_, index) => (
                    <svg
                      key={index}
                      className={`w-4 h-4 ${
                        index < Math.floor(eletricista.avaliacao)
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
                    ({eletricista.avaliacao})
                  </span>
                </div>

                {/* Botão de contratar */}
                <div className="mt-4 flex justify-center">
                  <button
                    className="bg-sky-600 text-white p-2 rounded-lg hover:bg-sky-700 w-60"
                    onClick={() => handleCheckAvailability(eletricista)}
                  >
                    Verificar Disponibilidade
                  </button>
                </div>
              </div>
            ))}
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
                filterTime={filterAvailableTimes} // Restringe os horários
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
                filterTime={filterEndDateTimes} // Restringe os horários para garantir que a data final seja após a inicial
                selectsEnd
                startDate={selectedStartDate}
                endDate={selectedEndDate}
                minDate={selectedStartDate} // Garante que a data final seja após a inicial
                className="border rounded-lg p-2 w-full"
                placeholderText="Escolha a data final"
                disabled={isEndDateDisabled} // Desabilita até que a data inicial seja selecionada
              />
            </div>

            {/* Campo de observações */}
            <div className="mb-4">
              <p>Observações:</p>
              <textarea
                className="border rounded-lg p-2 w-full"
                rows="3"
                value={observacoes}
                onChange={handleObservacoesChange}
              />
            </div>

            {/* Botões de cancelar e confirmar */}
            <div className="flex justify-end">
              <button
                className="bg-gray-400 text-white p-2 rounded-lg mr-2"
                onClick={closePopup}
              >
                Cancelar
              </button>
              <button
                className="bg-sky-600 text-white p-2 rounded-lg"
                onClick={() => {
                  console.log("Data Inicial:", selectedStartDate);
                  console.log("Data Final:", selectedEndDate);
                  console.log("Observações:", observacoes);
                  closePopup();
                }}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Eletricistas;
