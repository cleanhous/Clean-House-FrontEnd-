import React from "react";
import NavBar from "./NavBar";
import logo from "/public/logo 1.svg";
import eletricista from "/public/eletricista.jpg";
import encanador from "/public/encanador.jpg";
import diarista from "/public/diarista.jpg";
import {
  PlugZap,
  Droplet,
  User,
  Handshake,
  Settings,
  Paintbrush,
  KeyRound,
  LayoutDashboard,
  BrainCircuit,
  CookingPot,
  MessageCircleQuestion,
  Phone,
  Users,
  Award,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/cadastro");
  };

  return (
    <div className="min-h-screen flex flex-col bg-sky-700">
      <NavBar />
      <div className="flex-1 ">
        <div className="md:flex md:flex-row-reverse md:p-10 ">
          <img
            className="mx-auto px-4 mt-5 md:w-[450px] md:[450px]"
            src={logo}
            alt="Logo"
          />
          <div className="md:flex md:flex-col md:p-4">
            <p className="p-5 text-center mt-4 text-xl text-white md:text-3xl md:text-left md:py-16">
              Praticidade, comodidade e segurança em um só aplicativo de
              serviços domésticos.
            </p>
            <p className="hidden md:inline-block md:ml-10 md:text-white md:italic md:-mt-10 md:text-lg">
              "Tenha tudo em um só lugar, disponível a qualquer momento, com uma
              incrível qualidade de serviço"
            </p>
          </div>
        </div>

        <div className="w-full bg-white h-48 p-2 md:p-8 md:h-auto">
          <p className="text-center text-xl mb-4 text-sky-700 font-semibold md:text-4xl md:font-bold md:mb-10">
            Alguns de nossos serviços
          </p>
          <div className="flex justify-between md:justify-around">
            <div className="shadow-lg rounded-full w-28 h-28 bg-gray-200 p-4 flex flex-col justify-center items-center  md:rounded-none md:w-auto md:h-72 md:p-0 md:bg-white md:shadow-sky-950">
              <p className="text-sky-700 text-lg md:mt-6 md:text-2xl ">
                Eletricista
              </p>
              <img className="hidden md:block w-96 h-auto border-2 border-t-sky-700" src={eletricista} />
              <PlugZap className="md:hidden w-8 h-8 text-sky-600 mt-2" />
            </div>
            <div className="shadow-lg rounded-full w-28 h-28 bg-gray-200 p-4 flex flex-col justify-center items-center  md:rounded-none md:w-auto md:h-72 md:p-0 md:bg-white md:shadow-sky-950">
              <p className="text-sky-700 text-lg md:mt-6 md:text-2xl">
                Encanador
              </p>
              <img
                className="hidden md:block w-96 h-auto border-2 border-t-sky-700"
                src={encanador}
                alt="encanador"
              />
              <Droplet className="md:hidden w-8 h-8 text-sky-600 mt-2" />
            </div>
            <div className="shadow-lg rounded-full w-28 h-28 bg-gray-200 p-4 flex flex-col justify-center items-center  md:rounded-none md:w-auto md:h-72 md:p-0 md:bg-white md:shadow-sky-950">
              <p className="text-sky-700 text-lg md:mt-6 md:text-2xl">
                Diarista
              </p>
              <img
                className="hidden md:block w-96 h-auto border-2 border-t-sky-700"
                src={diarista}
                alt=""
              />
              <User className="md:hidden w-8 h-8 text-sky-600 mt-2" />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 p-3 mx-4 flex flex-col justify-center items-center bg-white rounded-lg md:flex md:flex-row">
        <Handshake className="md:hidden w-20 h-20 text-sky-700" />
        <img
          src="https://img.freepik.com/vetores-gratis/produtos-de-limpeza-com-produtos-de-limpeza-servico-de-limpeza_18591-52068.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1726531200&semt=ais_hybrid"
          className="hidden md:block md:w-[450px] md:h-[450px]"
          alt=""
        />
        <div className="flex flex-col justify-center items-center">
          <p className="font-bold text-xl text-sky-700 md:text-4xl">
            Precisando de praticidade?
          </p>
          <p className="text-center p-4 font-semibold md:text-xl">
            Estamos aqui para ajudar você a encontrar os melhores profissionais
            com facilidade e confiança. Conte com a gente!
          </p>
          <button
            className="w-auto p-3 text-white font-semibold rounded-xl bg-sky-700 hover:bg-sky-800 md:w-72 "
            onClick={handleClick}
          >
            Registre-se agora
          </button>
        </div>
      </div>
      <div className="bg-white mt-6 p-2">
        <p className=" text-center font-semibold text-xl text-sky-700 md:text-4xl">
          Todos os nossos serviços
        </p>
        <div className="bg-white grid grid-cols-3 grid-rows-3 mt-2 p-3 mx-4 gap-4 md:px-20 md:py-10">
          <div className="row-span-1 rounded-lg col-span-1 flex flex-col items-center shadow-lg bg-gray-200 p-4 text-sky-700 text-lg">
            <p className="text-center   ">Eletricista</p> 
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
      <div className="mt-6 p-3 mx-4 mb-6 flex flex-col items-center bg-white rounded-lg md:flex-row md:justify-around md:h-80 ">
        <div className="flex flex-col gap-3 p-5 justify-center items-center">
          <MessageCircleQuestion size={60} className=" text-sky-700 " />
          <p className="font-bold text-2xl text-sky-700">Quem somos?</p>
          <p className="text-center p-4 font-semibold md:text-lg">
            Somos uma plataforma, onde você pode contratar serviços domésticos
            de forma rápida, fácil e segura.
          </p>
        </div>

        <div className="flex flex-col gap-3 p-5 justify-center items-center">
          <Users className="text-sky-700" size={60} />
          <h5 className="text-xl font-bold text-sky-700">Faça seu chamado</h5>
          <p className="text-center p-4 font-semibold md:text-lg">
            Chame um profissional qualificado a qualquer momento
          </p>
        </div>
        <div className="flex flex-col gap-3 p-5 justify-center items-center">
          <Award className="text-sky-700 " size={60} />
          <h5 className="text-xl font-bold text-sky-700">Segurança</h5>
          <p className="text-center p-4 font-semibold md:text-lg">
            Um profissional qualificado irá atendê-lo
          </p>
        </div>
        <div className="flex flex-col gap-3 p-5 justify-center items-center">
          <Phone className="text-sky-700" size={60} />
          <h5 className="text-xl font-bold text-sky-700">Praticidade</h5>
          <p className="text-center p-4 font-semibold md:text-lg">
            Você poderá chamar um profissional de qualquer dispositivo conectado
            a internet
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
