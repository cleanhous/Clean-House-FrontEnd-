import React, { useState, useEffect } from "react";
import NavBarHome from "./NavBarHome";
import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import { useNavigate } from "react-router-dom";
import ptBR from "date-fns/locale/pt-BR";
import "react-datepicker/dist/react-datepicker.css";
import Filtro from "./Filtro";

registerLocale("pt-BR", ptBR);

const Pintores = () => {
  const [filtroNota, setFiltroNota] = useState("");
  const [precoDe, setPrecoDe] = useState("");
  const [precoAte, setPrecoAte] = useState("");
  const [dataInicial, setDataInicial] = useState(null);
  const [dataFinal, setDataFinal] = useState(null);

  const [pintores, setPintores] = useState([]);
  const [filteredPintores, setFilteredPintores] = useState([]);

  const [showPopup, setShowPopup] = useState(false);
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
  const [selectedPintor, setSelectedPintor] = useState(null);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [observacoes, setObservacoes] = useState("");

  const navigate = useNavigate();

  const fetchPintores = async () => {
    try {
      const response = await fetch("http://localhost:3000/pintor");
      const data = await response.json();
      setPintores(data);
      setFilteredPintores(data);
    } catch (error) {
      console.error("Erro ao buscar pintores:", error);
    }
  };

  useEffect(() => {
    fetchPintores();
  }, []);

  const handleFiltrar = async () => {
    try {
      let data = [];

      if (dataInicial && dataFinal) {
        const queryParams = new URLSearchParams({
          dataInicio: dataInicial.toISOString(),
          dataFim: dataFinal.toISOString(),
        });

        const response = await fetch(`http://localhost:3000/prestadores-disponiveis/pintor?${queryParams}`);
        data = await response.json();
      } else {
        const response = await fetch("http://localhost:3000/pintor");
        data = await response.json();
      }

      const filtered = data.filter((pintor) => {
        let matches = true;

        if (filtroNota) {
          matches = matches && parseInt(pintor.nota) === parseInt(filtroNota);
        }

        if (precoDe) {
          matches = matches && pintor.preco >= parseFloat(precoDe);
        }

        if (precoAte) {
          matches = matches && pintor.preco <= parseFloat(precoAte);
        }

        return matches;
      });

      setFilteredPintores(filtered);
    } catch (error) {
      console.error("Erro ao buscar pintores:", error);
    }
  };

  const handleCheckAvailability = (pintor) => {
    setSelectedPintor(pintor);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedPintor(null);
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
          prestadorId: selectedPintor.id,
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
          Serviços de Pintor
        </h1>
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

        <h1 className="text-2xl font-semibold text-white text-center mb-6">
          Nossos Pintores
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredPintores.length > 0 ? (
            filteredPintores.map((pintor) => (
              <div
                key={pintor.id}
                className="bg-white p-4 rounded-lg shadow-lg"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-sky-700">
                    {pintor.nome}
                  </h3>
                  <img
                    className="w-20 h-20"
                    src="https://cdn-icons-png.flaticon.com/512/3135/3135768.png"
                    alt=""
                  />
                </div>

                <p className="text-gray-600">{pintor.titulo}</p>
                <p className="text-gray-600">{pintor.descricao}</p>
                <p className="font-semibold text-sky-600">
                  {formatarPreco(pintor.preco)}
                </p>

            
                <div className="flex items-center mt-4">
                
                  <span className="text-gray-500">Contato via
                  <a href="https://wa.me/5585998413328" className="text-green-700 "> Whatsapp


                  </a>
                  </span>
                </div>

                <div className="mt-4 flex justify-center">
                  <button
                    className="bg-sky-600 text-white p-2 rounded-lg hover:bg-sky-700 w-60"
                    onClick={() => handleCheckAvailability(pintor)}
                  >
                    Contratar {pintor.nome}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-white">
              Nenhum pintor disponível no momento.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pintores;
