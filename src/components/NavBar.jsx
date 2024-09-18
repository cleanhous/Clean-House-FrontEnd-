import logo from "/public/logo 1.svg";
const NavBar = () => {
  return (
    <div className="w-full h-14 flex justify-between items-center p-8 bg-white">
      <img className="w-10 h-auto" src={logo} alt="asdas" />
      <button className="w-auto p-3 text-white rounded-xl bg-sky-700">
        Entrar
      </button>
    </div>
  );
};

export default NavBar;
