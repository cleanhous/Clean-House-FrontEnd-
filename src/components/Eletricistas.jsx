import React from "react";
import NavBarHome from "./NavBarHome";
import eletricista1 from "/public/eletricistas/eletricista1.jpeg";
import eletricista2 from "/public/eletricistas/eletricista2.jpeg";
import eletricista3 from "/public/eletricistas/eletricista3.jpeg";

const Eletricistas = () => {
  const eletricistas = [
    {
      id: 1,
      nome: "Carlos Silva",
      especialidade: "Instalações Elétricas",
      foto: eletricista1,
      preco: "R$ 100/h",
      avaliacao: 4.5,
      descricao: "Especialista em instalações elétricas seguras e eficientes.",
    },
    {
      id: 2,
      nome: "Rafael Souza",
      especialidade: "Manutenção Elétrica",
      foto: eletricista2,
      preco: "R$ 100/h",
      avaliacao: 4.8,
      descricao: "Experiência em manutenção e reparos em sistemas elétricos.",
    },
    {
      id: 3,
      nome: "José Santos",
      especialidade: "Reparos Elétricos",
      foto: eletricista3,
      preco: "R$ 100/h",
      avaliacao: 4.4,
      descricao: "Pronto para solucionar problemas elétricos de forma rápida.",
    },
  ];

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
          <h2 className="text-xl text-center font-semibold text-sky-700">
            Serviços Oferecidos
          </h2>

          <div className="bg-white grid grid-cols-5 grid-rows-1 mt-8 p-3 mx-4 gap-4 ">
            <div className="row-span-1 rounded-lg col-span-1 flex flex-col items-center shadow-lg bg-gray-200 p-4 text-sky-700 text-lg cursor-pointer hover:bg-gray-300">
              <p className="text-center">Instalação elétrica</p>
            </div>

            <div className="row-span-1 rounded-lg col-span-1 flex flex-col items-center shadow-lg bg-gray-200 p-4 text-sky-700 text-lg cursor-pointer hover:bg-gray-300">
              <p className="text-center">Manutenção de sistemas elétricos</p>
            </div>

            <div className="row-span-1 rounded-lg col-span-1 flex flex-col items-center shadow-lg bg-gray-200 p-4 text-sky-700 text-lg cursor-pointer hover:bg-gray-300">
              <p className="text-center">Verificação de segurança elétrica</p>
            </div>

            <div className="row-span-1 rounded-lg col-span-1 flex flex-col items-center shadow-lg bg-gray-200 p-4 text-sky-700 text-lg cursor-pointer hover:bg-gray-300">
              <p className="text-center">Instalação de iluminação</p>
            </div>

            <div className="row-span-1 rounded-lg col-span-1 flex flex-col items-center shadow-lg bg-gray-200 p-4 text-sky-700 text-lg cursor-pointer hover:bg-gray-300">
              <p className="text-center">Reparos elétricos gerais</p>
            </div>

          </div>
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
                  <button className="bg-sky-600 text-white p-2 rounded-lg hover:bg-sky-700 w-60">
                    Verificar Disponibilidade
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Eletricistas;
