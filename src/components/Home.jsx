import React from "react";
import NavBar from "./NavBar";
import logo from "/public/logo 1.svg";
import {
  PlugZap,
  Droplet,
  User,
  Handshake,
  Settings,
  Paintbrush,
  Key,
  KeyRound,
  LayoutDashboard,
  BrainCircuit,
  CookingPot,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/cadastro");
  };

  return (
    <div className="min-h-screen min-w-screen bg-sky-700">
      <NavBar />
      <div className="">
        <img className="mx-auto px-4 mt-5" src={logo} alt="Logo" />
        <p className="p-5 text-center mt-4 text-xl text-white">
          Praticidade, comodidade e segurança
        </p>
        <div className="w-full bg-white h-44 p-4">
          <p className="text-center text-xl mb-2 text-sky-700 font-semibold">
            Alguns de nossos serviços
          </p>
          <div className="flex justify-between">
            <div className="shadow-lg rounded-full w-28 h-28 bg-gray-200 p-4 flex flex-col justify-center items-center text-sky-700 text-lg">
              Eletricista
              <PlugZap className="w-8 h-8 text-sky-600 mt-2" />
            </div>
            <div className="shadow-lg rounded-full w-28 h-28 bg-gray-200 p-4 flex flex-col justify-center items-center text-sky-700 text-lg">
              Encanador
              <Droplet className="w-8 h-8 text-sky-600 mt-2" />
            </div>
            <div className="shadow-lg rounded-full w-28 h-28 bg-gray-200 p-4 flex flex-col justify-center items-center text-sky-700 text-lg">
              Diarista
              <User className="w-8 h-8 text-sky-600 mt-2" />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 p-3 flex flex-col justify-center items-center bg-white mx-4">
        <Handshake className="w-20 h-20 " />
        <p className="font-bold text-xl">Precisando de praticidade?</p>
        <p className="text-center p-4 font-semibold">
          Estamos aqui para ajudar você a encontrar os melhores profissionais
          com facilidade e confiança. Conte com a gente!
        </p>
        <button
          className="w-auto p-3 text-white rounded-xl bg-sky-700 hover:bg-sky-800"
          onClick={handleClick}
        >
          Registre-se agora
        </button>
      </div>
      <div className="bg-white grid grid-cols-3 grid-rows-4 mt-2 p-3 mx-4 gap-4">
        <p className=" row-span-1 col-span-3 bg-red-500 text-center font-semibold text-xl text-sky-700">
          Todos os nossos serviços
        </p>
        <div className="row-span-1 rounded-lg col-span-1 flex flex-col items-center shadow-lg bg-gray-200 p-4 text-sky-700 text-lg">
          <p className="text-center">Eletricista</p>
          <PlugZap className="w-8 h-8 text-sky-600 mt-2" />
        </div>
        <div className="row-span-1 rounded-lg col-span-1 flex flex-col items-center shadow-lg bg-gray-200 p-4 text-sky-700 text-lg">
          <p className="text-center">Encanador</p>
          <Droplet className="w-8 h-8 text-sky-600 mt-2" />
        </div>
        <div className="row-span-1 rounded-lg col-span-1 flex flex-col items-center shadow-lg bg-gray-200 p-4 text-sky-700 text-lg">
          <p className="text-center">Diarista</p>
          <User className="w-8 h-8 text-sky-600 mt-2" />
        </div>
        <div className="row-span-1 rounded-lg col-span-1 flex flex-col items-center shadow-lg bg-gray-200 p-4 text-sky-700 text-lg">
          <p className="text-center">Assistência técnica</p>
          <Settings className="w-8 h-8 text-sky-600 mt-2" />
        </div>
        <div className="row-span-1 rounded-lg col-span-1 flex flex-col items-center shadow-lg bg-gray-200 p-4 text-sky-700 text-lg">
          <p className="text-center">Pintor</p>
          <Paintbrush className="w-8 h-8 text-sky-600 mt-2" />
        </div>
        <div className="row-span-1 rounded-lg col-span-1 flex flex-col items-center shadow-lg bg-gray-200 p-4 text-sky-700 text-lg">
          <p className="text-center">Chaveiro</p>
          <KeyRound className="w-8 h-8 text-sky-600 mt-2" />
        </div>
        <div className="row-span-1 rounded-lg col-span-1 flex flex-col items-center shadow-lg bg-gray-200 p-4 text-sky-700 text-lg">
          <p className="text-center">Empreiteiro</p>
          <LayoutDashboard className="w-8 h-8 text-sky-600 mt-2" />
        </div>
        <div className="row-span-1 rounded-lg col-span-1 flex flex-col items-center shadow-lg bg-gray-200 p-4 text-sky-700 text-lg">
          <p className="text-center">Arquiteto</p>
          <BrainCircuit className="w-8 h-8 text-sky-600 mt-2" />
        </div>
        <div className="row-span-1 rounded-lg col-span-1 flex flex-col items-center shadow-lg bg-gray-200 p-4 text-sky-700 text-lg">
          <p className="text-center">Cozinheiro</p>
          <CookingPot className="w-8 h-8 text-sky-600 mt-2" />
        </div>
      </div>
    </div>
  );
};

export default Home;
