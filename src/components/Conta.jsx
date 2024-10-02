import { useState } from "react";
import api from "../services/api.js";
import CEP from "../services/cep.js";
import NavBarHome from "./NavBarHome.jsx";

const Conta = () => {
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [uf, setUf] = useState("");
  const [cep, setCep] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [cidade, setCidade] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await api.post("/cadastro", {
        email: email,
        telefone: telefone,
        senha: senha,
        uf: uf,
        cidade: cidade,
        logradouro: logradouro,
        cep: cep,
        numero: numero,
        complemento: complemento,
      });
      alert("usuario atualizado com sucesso");
    } catch (error) {
      console.log(error);
      alert("Deu erro");
    }

    setEmail("");
    setTelefone("");
    setSenha("");
    setComplemento("");
    setUf("");
    setCep("");
    setLogradouro("");
    setCidade("");
    setNumero("");
  };

  const buscarCep = async (e) => {
    const cepValue = e.target.value.replace(/\D/g, "");
    if (cepValue.length !== 8) {
      alert("Insira um Cep valido");
      return;
    }

    try {
      const response = await CEP.get(`/${cepValue}/json/`);
      console.log(response.data);
      setLogradouro(response.data.logradouro);
      setCep(cepValue);
      setUf(response.data.uf);
      setCidade(response.data.localidade);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
        <NavBarHome />
      <div className="bg-sky-700 grid grid-cols-2 grid-rows-1">
        <div className="flex justify-around col-span-2">
          <div className="col-span-1 col-end-1">
            <div className="h-auto w-[450px] flex flex-col p-6 items-center bg-white rounded-3xl mt-8">
              <h1 className="text-sky-600 text-3xl font-bold mb-3 ">
                Altere seus dados
              </h1>
              <form onSubmit={handleRegister} className="flex flex-col w-full ">
                <label>
                  <span className="block text-sky-700 text-xl ">Email</span>
                  <input
                    className="w-full p-2 rounded-xl outline-none border-2 border-sky-700 "
                    type="email"
                    placeholder="example@gmail.com"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </label>
                <label>
                  <span className="block text-sky-700 text-xl ">Telefone</span>
                  <input
                    className="w-full p-2 rounded-xl outline-none border-2 border-sky-700 "
                    type="text"
                    placeholder="859999999"
                    onChange={(e) => setTelefone(e.target.value)}
                    value={telefone}
                  />
                </label>
                <label>
                  <span className="block text-sky-700 text-xl ">Senha</span>
                  <input
                    className="w-full p-2 rounded-xl outline-none border-2 border-sky-700 "
                    type="password"
                    placeholder="******"
                    onChange={(e) => setSenha(e.target.value)}
                    value={senha}
                  />
                </label>
                <label>
                  <span className=" text-sky-700 text-xl ">Cep</span>
                  <input
                    className="w-full p-2 rounded-xl outline-none border-2 border-sky-700 "
                    type="text"
                    placeholder="00000000"
                    onBlur={buscarCep}
                  />
                </label>
                <div className="flex justify-between gap-2">
                  <label>
                    <span className="block text-sky-700 text-xl ">UF</span>
                    <input
                      className="w-auto p-2 rounded-xl outline-none border-2 border-sky-700 "
                      type="text"
                      placeholder="UF"
                      value={uf}
                      readOnly
                    />
                  </label>
                  <label>
                    <span className="block text-sky-700 text-xl ">Cidade</span>
                    <input
                      className="w-auto p-2 rounded-xl outline-none border-2 border-sky-700 "
                      type="text"
                      placeholder="Cidade"
                      value={cidade}
                      readOnly
                    />
                  </label>
                </div>
                <div className="flex justify-between gap-2">
                  <label>
                    <span className="block text-sky-700 text-xl ">Rua</span>
                    <input
                      className="w-auto p-2 rounded-xl outline-none border-2 border-sky-700 "
                      type="text"
                      placeholder="Rua"
                      value={logradouro}
                      readOnly
                    />
                  </label>
                  <label>
                    <span className="block text-sky-700 text-xl ">Numero</span>
                    <input
                      className="w-auto p-2 rounded-xl outline-none border-2 border-sky-700 "
                      type="text"
                      placeholder="000"
                      onChange={(e) => setNumero(e.target.value)}
                      value={numero}
                    />
                  </label>
                </div>
                <label>
                  <span className="block text-sky-700 text-xl ">
                    Complemento
                  </span>
                  <input
                    className="w-full p-2 rounded-xl outline-none border-2 mb-4 border-sky-700 "
                    type="text"
                    placeholder="Complemento"
                    onChange={(e) => setComplemento(e.target.value)}
                    value={complemento}
                  />
                </label>
                <button
                  type="submit"
                  onClick={handleRegister}
                  className="font-bold text-lg bg-sky-600 w-full h-10 text-slate-50 border-2 outline-none rounded-2xl cursor-pointer hover:bg-sky-700"
                >
                  Alterar
                </button>
              </form>
            </div>
          </div>
          <div className="col-span-1 col-start-2 flex">
            <div className="bg-white h-auto w-[450px] flex flex-col p-6 mt-8  rounded-3xl">
              <h1 className="text-sky-600 text-center text-3xl font-bold mb-3 ">
                Histórico de serviços
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Conta;
