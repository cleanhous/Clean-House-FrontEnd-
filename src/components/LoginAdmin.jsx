import { Link, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar.jsx";
import { useState } from "react";
import api from "../services/api.js";
import Footer from "./Footer";

const AdminLogin = () => {
  const [codigo, setCodigo] = useState("");
  const [senha, setSenha] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); 
  const [isLoading, setIsLoading] = useState(false); 
  const navigate = useNavigate();

  const handleSubimit = async (e) => {
    e.preventDefault();
    setIsLoading(true); 
    setErrorMessage(""); 
    try {
      const { data: { acessToken } } = await api.post("/admin/login", {
        codigo,
        senha,
      });

      localStorage.setItem("token", acessToken);
      navigate("/admin");
    } catch (error) {
      setErrorMessage("Código ou senha incorretos. Tente novamente.");
    } finally {
      setIsLoading(false); 
    }
  }

  return (
    <div>
      <NavBar showFAQ={false} />
      <div className="h-screen w-screen bg-sky-700 flex justify-center items-center">
        <div className="h-[400px] w-96 flex flex-col p-6 items-center bg-white rounded-3xl">
          <h1 className="text-sky-700 text-3xl font-bold mb-3 ">
            Login de Administrador
          </h1>
          <form className="flex flex-col" onSubmit={handleSubimit}>
            <label>
              <span className="block text-sky-700 text-xl ">Código</span>
              <input
                className="w-full p-2 rounded-xl outline-none border-2 mb-4 border-sky-700"
                type="text"
                id="Login-admin"
                placeholder="Admin123"
                onChange={(e) => setCodigo(e.target.value)}
              />
            </label>
            <label>
              <span className="block text-sky-700 text-xl ">Senha</span>
              <input
                className="w-full p-2 rounded-xl outline-none border-2 mb-4 border-sky-700"
                type="password"
                id="Login-senha"
                placeholder="******"
                onChange={(e) => setSenha(e.target.value)}
              />
            </label>

            {errorMessage && (
              <div className="text-red-500 text-sm mb-4">{errorMessage}</div>
            )}

            <div className="flex justify-center">
              <p className="block mb-4 text-center">Esqueceu seu código?</p>
              <Link
                to="/admin/recuperar-codigo"
                className="text-sky-700 underline hover:no-underline"
              >
                Recuperar Código
              </Link>
            </div>
          </form>

          <button
            type="submit"
            onClick={handleSubimit}
            className={`font-bold text-lg w-full h-10 text-slate-50 border-2 outline-none rounded-2xl cursor-pointer ${
              isLoading ? "bg-sky-500" : "bg-sky-600 hover:bg-sky-700"
            }`}
            disabled={isLoading} 
          >
            {isLoading ? (
              <div className="flex justify-center items-center">
                <svg
                  className="animate-spin h-5 w-5 mr-3 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Carregando...
              </div>
            ) : (
              "Entrar"
            )}
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminLogin;
