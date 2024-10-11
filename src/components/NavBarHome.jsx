import logo from "/public/logo 1.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ChevronDown } from "lucide-react"; // Importando o ícone da seta para baixo

const NavBarHome = ({ scrollToFAQ, showFAQ = true }) => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleClickHome = () => {
    navigate("/home");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleNavigate = (path) => {
    setIsDropdownOpen(false); // Fecha o dropdown após a navegação
    navigate(path);
  };

  return (
    <div className="w-full h-20 flex justify-between items-center p-8 bg-white">
      <button onClick={handleClickHome} className="w-24 h-auto">
        <img src={logo} alt="" />
      </button>
      <div className="space-x-8 relative">
        {showFAQ && (
          <button className="text-sky-700" onClick={scrollToFAQ}>
            FAQ
          </button>
        )}

        {/* Dropdown Menu */}
        <div className="relative inline-block text-left">
          <button
            className="w-auto p-3 text-white font-semibold rounded-full bg-sky-600 hover:bg-sky-700 flex items-center"
            onClick={toggleDropdown}
          >
            Minha conta
            <ChevronDown className="w-5 h-5 ml-2" /> {/* Ícone de seta para baixo */}
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
              <button
                className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                onClick={() => handleNavigate("/pedidos")}
              >
                Meus pedidos
              </button>
              <button
                className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                onClick={() => handleNavigate("/conta")}
              >
                Configurações
              </button>
              <button
                className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                onClick={() => handleNavigate("/login")}
              >
                Sair
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBarHome;
