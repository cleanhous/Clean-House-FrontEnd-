import logo from "/public/logo 1.svg";
import { useNavigate } from "react-router-dom";
const NavBar = () => {
  const navigate = useNavigate()
  
  const handleClick = () => {
    navigate('/')
  }

  return (
    <div className="w-full h-14 flex justify-between items-center p-8 bg-white">
      <img className="w-10 h-auto" src={logo} alt="asdas" />
      <button className="w-auto p-3 text-white rounded-full bg-sky-600 hover:bg-sky-700" onClick={handleClick}>
        Entrar
      </button>
    </div>
  );
};

export default NavBar;
