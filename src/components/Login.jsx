import { Link, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import { useState } from "react";
import api from "../services/api.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate()
  console.log(email, senha);

  const handleSubimit = async (e) => {
    e.preventDefault();
    try {
      const { data: { acessToken } } = await api.post("/login", {
        email,
        senha,
      });

      localStorage.setItem('token',acessToken)
      console.log(acessToken)
      navigate('/home')
    } catch{
      alert("Usuário ou senha incorretos")
    }
  }

  return (
    <div>
      <NavBar />
      <div className="h-screen w-screen bg-sky-700 flex justify-center items-center">
        <div className="h-[400px] w-96 flex flex-col p-6 items-center bg-white rounded-3xl">
          <h1 className="text-sky-700 text-3xl font-bold mb-3 ">
            Faça seu Login
          </h1>
          <form className="flex flex-col ">
            <label>
              <span className="block text-sky-700 text-xl ">Email</span>
              <input
                className="w-full p-2 rounded-xl outline-none border-2 mb-4 border-sky-700 "
                type="email"
                placeholder="example@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label>
              <span className="block text-sky-700 text-xl ">Senha</span>
              <input
                className="w-full p-2 rounded-xl outline-none border-2 mb-4 border-sky-700 "
                type="password"
                placeholder="******"
                onChange={(e) => setSenha(e.target.value)}
              />
            </label>
            <div className="flex gap-8 mb-4">
              <label>
                <input type="checkbox" />
                <span className="ml-1 ">Lembre de mim</span>
              </label>
              <Link className="text-sky-700 underline hover:no-underline" to="/">
                Esqueceu a senha?
              </Link>
            </div>
            <div className="flex justify-center">
              <p className="block mb-4 text-center">Não tem uma conta?</p>
              <Link to= "/cadastro" className="text-sky-700 underline hover:no-underline"> Registre-se</Link>
            </div>
          </form>
          <button type="submit" onClick={handleSubimit} className="font-bold text-lg bg-sky-600 w-full h-10 text-slate-50 border-2 outline-none rounded-2xl cursor-pointer hover:bg-sky-700">
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
