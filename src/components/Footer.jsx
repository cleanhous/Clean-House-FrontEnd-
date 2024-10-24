import React from "react";

const Footer = () => {
  return (
    <footer className="bg-sky-700 text-white p-4 text-center">
      <div className="mt-2">
        <a href="/termos" className="text-white hover:underline mx-2">
          Termos de Serviço
        </a>
        |
        <a href="/privacidade" className="text-white hover:underline mx-2">
          Política de Privacidade
        </a>
      </div>
      <p className="text-sm mt-3 ">© 2024 Clean House. Todos os direitos reservados.</p>
    </footer>
  );
};

export default Footer;
