import logo from "/public/logo 1.svg";
import { useNavigate } from "react-router-dom";

const NavBarHome = ({ scrollToFAQ, showFAQ = true }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/conta");
  };

  const handleClickHome = () => {
    navigate("/home");
  };

  return (
    <div className="w-full h-20 flex justify-between items-center p-8 bg-white">
      <button onClick={handleClickHome} className="w-24 h-auto">
        <img src={logo} alt="" />
      </button>
      <div className="space-x-8">
        {showFAQ && (
          <button className="text-sky-700" onClick={scrollToFAQ}>
            FAQ
          </button>
        )}
        <button
          className="w-auto p-3 text-white font-semibold rounded-full bg-sky-600 hover:bg-sky-700"
          onClick={handleClick}
        >
          Minha conta
        </button>
      </div>
    </div>
  );
};

export default NavBarHome;
