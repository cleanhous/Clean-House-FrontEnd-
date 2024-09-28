import React from "react";
import { MessageCircleQuestion, Phone, Users, Award } from "lucide-react";

const FAQ = () => {
  return (
    <div className="min-h-screen flex flex-col bg-sky-700">
      <div className="flex-1 bg-white p-6 md:p-12">
        <h1 className="text-center text-3xl text-sky-700 font-bold mb-12 mt-7">
          Perguntas Frequentes (FAQ)
        </h1>


        <div className="space-y-8 ">
          <div className="bg-gray-200 p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4 ">
              <MessageCircleQuestion className="w-8 h-8 text-sky-600 mr-4" />
              <p className="text-xl font-semibold text-sky-700">
              Como posso acompanhar o status do meu serviço?
              </p>
            </div>
            <p className="text-gray-700">
            Após contratar um serviço, você pode acompanhar o status em tempo real pelo aplicativo. O profissional enviará atualizações e notificações conforme necessário.
            </p>
          </div>

          <div className="bg-gray-200 p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <Phone className="w-8 h-8 text-sky-600 mr-4" />
              <p className="text-xl font-semibold text-sky-700">
                Como posso entrar em contato com vocês?
              </p>
            </div>
            <p className="text-gray-700">
              Você pode entrar em contato conosco através do nosso aplicativo ou
              pelo número de telefone disponível na página de contato.
            </p>
          </div>

          <div className="bg-gray-200 p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <Users className="w-8 h-8 text-sky-600 mr-4" />
              <p className="text-xl font-semibold text-sky-700">
              Posso escolher o profissional que fará o serviço?
              </p>
            </div>
            <p className="text-gray-700">
            Sim, você pode visualizar os perfis dos profissionais disponíveis, incluindo suas avaliações e especialidades, para escolher o que mais se adequa às suas necessidades.
            </p>
          </div>

          <div className="bg-gray-200 p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <Award className="w-8 h-8 text-sky-600 mr-4" />
              <p className="text-xl font-semibold text-sky-700">
                Os profissionais são confiáveis?
              </p>
            </div>
            <p className="text-gray-700">
              Todos os profissionais são previamente verificados, possuindo
              certificações e avaliações de outros clientes, garantindo
              segurança e qualidade.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 flex flex-col items-center pb-12">
        <p className="text-center font-semibold text-sky-700 text-lg">
          Precisa de mais ajuda?
        </p>
        <button className="mt-4 p-3 text-white bg-sky-700 rounded-lg hover:bg-sky-800">
          Entre em contato
        </button>
      </div>
    </div>
  );
};

export default FAQ;
