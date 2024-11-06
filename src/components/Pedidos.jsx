import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBarHome from "./NavBarHome.jsx";

const Pedidos = () => {
  const navigate = useNavigate();
  const [contratos, setContratos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedContrato, setSelectedContrato] = useState(null);
  const [estrelas, setEstrelas] = useState(0);

  const fetchContratos = async () => {
    try {
      const response = await fetch("http://localhost:3000/contratos/cliente", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setContratos(data);
      } else {
        console.error("Erro ao buscar contratos:", response.status);
      }
    } catch (error) {
      console.error("Erro ao buscar contratos:", error);
    }
  };

  const handleAvaliarClick = (contrato) => {
    setSelectedContrato(contrato);
    setShowModal(true);
  };

  const enviarAvaliacao = async () => {
    try {
     
  
      if (estrelas === 0) {
        alert("Por favor, selecione uma avaliação.");
        return;
      }
  
      await fetch(`http://localhost:3000/contratos/avaliar/${selectedContrato.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ estrelas }), 
      });
  
      alert("Avaliação enviada com sucesso!");
      setShowModal(false);
      setEstrelas(0);
    } catch (error) {
      console.error("Erro ao enviar avaliação:", error);
    }
  };
  
  

  useEffect(() => {
    fetchContratos();
  }, []);

  const renderStars = (star) => (
    <span
      key={star}
      onClick={() => setEstrelas(star)}
      className={`cursor-pointer text-3xl ${star <= estrelas ? "text-yellow-500" : "text-gray-300"}`}
    >
      ★
    </span>
  );

  return (
    <div className="min-h-screen bg-sky-700">
      <NavBarHome showFAQ={false} />
      <div className="flex justify-center items-center py-10">
        <div className="bg-white h-auto w-[600px] flex flex-col p-8 rounded-3xl">
          <h1 className="text-sky-600 text-center text-3xl font-bold mb-6">
            Histórico de serviços
          </h1>
          {contratos.length > 0 ? (
            <ul className="space-y-4">
              {contratos.map((contrato, index) => (
                <li key={index} className="bg-sky-100 p-4 rounded-lg shadow">
                  <h2 className="text-xl font-bold text-sky-700">
                    {contrato.nome}
                  </h2>
                  <p>Início: {new Date(contrato.data_inicio).toLocaleString()}</p>
                  <p>Fim: {new Date(contrato.data_fim).toLocaleString()}</p>
                  <p>Observações: {contrato.observacao}</p>
                  {new Date(contrato.data_fim) < new Date() && (
                    <button
                      onClick={() => handleAvaliarClick(contrato)}
                      className="mt-2 text-white bg-sky-600 px-4 py-2 rounded-lg hover:bg-sky-700"
                    >
                      Avaliar Serviço
                    </button>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-500">Nenhum contrato encontrado.</p>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white w-[400px] p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-sky-700">
              Avalie o serviço
            </h2>
            <div className="flex justify-center mb-4">
              {[1, 2, 3, 4, 5].map(renderStars)}
            </div>
            <button
              onClick={enviarAvaliacao}
              className="w-full bg-sky-600 text-white p-2 rounded-lg hover:bg-sky-700"
            >
              Enviar Avaliação
            </button>
            <button
              onClick={() => setShowModal(false)}
              className="w-full mt-2 bg-gray-300 text-gray-700 p-2 rounded-lg hover:bg-gray-400"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pedidos;
