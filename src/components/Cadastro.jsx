import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api.js";
import cep from "../services/cep.js"
import logo from "/public/logo 1.svg"

const Cadastro = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [uf, setUf] = useState("");
  const [cep, setCep] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post("/cadastro", {
        name: nome,
        email: email,
        senha: senha,
      });
      Navigate
      alert("usuario cadastrado com sucesso")
    } catch (error) {
        console.log(error);
        alert("Deu erro")
    }

    setNome("");
    setEmail("");
    setSenha("");
  };

  const buscarCep = async () => {
    
    if (cep === "") {
      alert("Insira seu cep")
    }
    try {
      const response = await cep.get(`/${cep}/json/`)
      setUf(response.data.uf)
      
    } catch (error) {
      
    }

    
  }

  return (
    <div className="overflow-x-hidden p-4 min-h-screen min-w-screen bg-sky-700 flex justify-center items-center">
      <div className="h-auto w-[600px] flex flex-col p-6 items-center bg-white rounded-3xl">
        <h1 className="text-sky-700 text-3xl font-bold mb-3 ">
          Faça seu Cadastro
        </h1>
        <form onSubmit={handleRegister} className="flex flex-col w-full ">
          <label>
            <span className="block text-sky-700 text-xl ">Nome</span>
            <input
              className="w-full p-2 rounded-xl outline-none border-2 mb-4 border-sky-700 "
              type="text"
              placeholder="Nome completo"
              onChange={(e) => setNome(e.target.value)}
              value={nome}
            />
          </label>
          <label>
            <span className="block text-sky-700 text-xl ">Email</span>
            <input
              className="w-full p-2 rounded-xl outline-none border-2 mb-4 border-sky-700 "
              type="email"
              placeholder="example@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </label>
          <label>
            <span className="block text-sky-700 text-xl ">Senha</span>
            <input
              className="w-full p-2 rounded-xl outline-none border-2 mb-4 border-sky-700 "
              type="password"
              placeholder="******"
              onChange={(e) => setSenha(e.target.value)}
              value={senha}
            />
          </label>
          <div className="w-full h-full rounded-xl border-2  border-sky-700 p-4">
            <span className="block text-center text-sky-700 text-3xl font-bold mb-3">Endereço</span>
            <label className="flex gap-4">
            <span className="block  text-sky-700 text-xl ">Cep</span>
            <input
              className="w-full p-2 rounded-xl outline-none border-2 mb-4 border-sky-700 "
              type="password"
              placeholder="******"
              value={cep}
            />
            <button className="w-full h-10 bg-indigo-800 rounded-2xl">Buscar</button>
          </label>
          <label>
            <span className="block text-sky-700 text-xl ">UF</span>
            <input
              className="w-full p-2 rounded-xl outline-none border-2 mb-4 border-sky-700 "
              type="text"
              placeholder="******"
              onChange={(e) => buscarCep(e.target.value)}
              // value={cep}
            />
          </label>
          <label>
            <span className="block text-sky-700 text-xl ">Numero</span>
            <input
              className="w-full p-2 rounded-xl outline-none border-2 mb-4 border-sky-700 "
              type="password"
              placeholder="******"
              onChange={(e) => setSenha(e.target.value)}
              value={senha}
            />
          </label>
          <label>
            <span className="block text-sky-700 text-xl ">Complemento</span>
            <input
              className="w-full p-2 rounded-xl outline-none border-2 mb-4 border-sky-700 "
              type="password"
              placeholder="******"
              onChange={(e) => setSenha(e.target.value)}
              value={senha}
            />
          </label>
          </div>
          

          <div className="flex justify-between gap-8 mb-4">
            <label>
              <input type="checkbox" />
              <span className="ml-1 ">Lembre de mim</span>
            </label>
            <Link className="text-sky-700 underline" to="/">
              Faça seu login
            </Link>
          </div>

          <button
            type="submit"
            className="font-bold text-lg bg-sky-700 w-full h-10 text-slate-50 border-2 outline-none rounded-2xl cursor-pointer hover:opacity-80"
          >
            Cadastrar
          </button>
        </form>
      </div>
      {/* <section>
        <img src={logo} alt="" />
      </section> */}
    </div>  
  );
};

export default Cadastro;
