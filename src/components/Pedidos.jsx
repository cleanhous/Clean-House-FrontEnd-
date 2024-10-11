import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBarHome from "./NavBarHome.jsx";

const Pedidos = () => {
  const navigate = useNavigate();
  const [contratos, setContratos] = useState([]);

  // Função para buscar os contratos do cliente
  const fetchContratos = async () => {
    try {
      const response = await fetch("http://localhost:3000/contratos/cliente", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Passando o token de autenticação
        },
      })

      if (response.ok) {
        const data = await response.json();
        setContratos(data)
      } else {
        console.error("Erro ao buscar contratos:", response.status);
      }
    } catch (error) {
      console.error("Erro ao buscar contratos:", error);
    }
  };

 
  useEffect(() => {
    fetchContratos();
  }, []);

  return (
    <div className="min-h-screen bg-sky-700">
      <NavBarHome showFAQ={false} />
      <div className="flex justify-center items-center py-10">
        <div className="bg-white h-auto w-[600px] flex flex-col p-8 rounded-3xl">
          <h1 className="text-sky-600 text-center text-3xl font-bold mb-6">
            Histórico de serviços
          </h1>
          {/* Renderiza a lista de contratos */}
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
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-500">Nenhum contrato encontrado.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pedidos;
