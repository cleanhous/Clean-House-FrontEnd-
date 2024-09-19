import logo from "/public/logo 1.svg";
import { Link, useNavigate } from "react-router-dom";
const NavBar = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/login");
  };

  const handleClickHome = () => {
    navigate("/");
  };

  return (
    <div className="w-full h-14 flex justify-between items-center p-8 bg-white">
      <button onClick={handleClickHome} className="w-10 h-auto">
        <img src={logo} alt="" />
      </button>

      <button
        className="w-auto p-3 text-white font-semibold rounded-full bg-sky-600 hover:bg-sky-700"
        onClick={handleClick}
      >
        Entrar
      </button>
    </div>
  );
};

export default NavBar;
