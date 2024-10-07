import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBarHome from "./NavBarHome.jsx";

const Pedidos = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-sky-700"> {/* Define o fundo azul e altura total da tela */}
      <NavBarHome showFAQ={false} />
      <div className="flex justify-center items-center py-10">
        <div className="bg-white h-auto w-[600px] flex flex-col p-8 rounded-3xl">
          <h1 className="text-sky-600 text-center text-3xl font-bold mb-6">
            Histórico de serviços
          </h1>
          {/* Aqui você pode adicionar o conteúdo do histórico de serviços */}
        </div>
      </div>
    </div>
  );
};

export default Pedidos;
