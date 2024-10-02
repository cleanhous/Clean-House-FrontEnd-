import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api.js";
import CEP from "../services/cep.js";

const Cadastro = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("")
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [uf, setUf] = useState("");
  const [cep, setCep] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [cidade, setCidade] = useState("");

  const formatarCpf = (value) => {
    value = value.replace(/\D/g, ""); // Remove qualquer caractere que não seja número
    value = value.replace(/(\d{3})(\d)/, "$1.$2"); // Coloca o primeiro ponto
    value = value.replace(/(\d{3})(\d)/, "$1.$2"); // Coloca o segundo ponto
    value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2"); // Coloca o traço
    return value;
  };

  const handleCpfChange = (e) => {
    const cpfValue = formatarCpf(e.target.value);
    setCpf(cpfValue);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await api.post("/cadastro", {
        nome: nome,
        email: email,
        cpf: cpf,
        telefone: telefone,
        senha: senha,
        uf: uf,
        cidade: cidade,
        logradouro: logradouro,
        cep: cep,
        numero: numero,
        complemento: complemento,
      });
      alert("usuario cadastrado com sucesso");
    } catch (error) {
      if (error.response && error.response.data.errors) {
        console.log(error.response.data.errors);
        alert(error.response.data.errors.join("\n"))
      } else {
        alert("Erro desconhecido");
      }
    }

    setNome("");
    setEmail("");
    setCpf("")
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
            <span className="block text-sky-700 text-xl ">CPF</span>
            <input
              className="w-full p-2 rounded-xl outline-none border-2 mb-4 border-sky-700 "
              type="text"
              placeholder="000.000.000-00"
              onChange={handleCpfChange}
              value={cpf}
            />
          </label>
          <label>
            <span className="block text-sky-700 text-xl ">Telefone</span>
            <input
              className="w-full p-2 rounded-xl outline-none border-2 mb-4 border-sky-700 "
              type="text"
              placeholder="859999999"
              onChange={(e) => setTelefone(e.target.value)}
              value={telefone}
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
          <label>
            <span className=" text-sky-700 text-xl ">Cep</span>
            <input
              className="w-full p-2 rounded-xl outline-none border-2 mb-4 border-sky-700 "
              type="text"
              placeholder="00000000"
              onBlur={buscarCep}
            />
          </label>
          <label>
            <span className="block text-sky-700 text-xl ">UF</span>
            <input
              className="w-full p-2 rounded-xl outline-none border-2 mb-4 border-sky-700 "
              type="text"
              placeholder="UF"
              value={uf}
              readOnly
            />
          </label>
          <label>
            <span className="block text-sky-700 text-xl ">Cidade</span>
            <input
              className="w-full p-2 rounded-xl outline-none border-2 mb-4 border-sky-700 "
              type="text"
              placeholder="Cidade"
              value={cidade}
              readOnly
            />
          </label>
          <label>
            <span className="block text-sky-700 text-xl ">Rua</span>
            <input
              className="w-full p-2 rounded-xl outline-none border-2 mb-4 border-sky-700 "
              type="text"
              placeholder="Rua"
              value={logradouro}
              readOnly
            />
          </label>
          <label>
            <span className="block text-sky-700 text-xl ">Numero</span>
            <input
              className="w-full p-2 rounded-xl outline-none border-2 mb-4 border-sky-700 "
              type="text"
              placeholder="000"
              onChange={(e) => setNumero(e.target.value)}
              value={numero}
            />
          </label>
          <label>
            <span className="block text-sky-700 text-xl ">Complemento</span>
            <input
              className="w-full p-2 rounded-xl outline-none border-2 mb-4 border-sky-700 "
              type="text"
              placeholder="Complemento"
              onChange={(e) => setComplemento(e.target.value)}
              value={complemento}
            />
          </label>
          <div className="flex justify-center mb-4">
            <p>Ja tem uma conta?</p>
            <Link
              className="text-sky-700 underline hover:no-underline"
              to="/login"
            >
              Faça seu login
            </Link>
          </div>
          <button
            type="submit"
            onClick={handleRegister}
            className="font-bold text-lg bg-sky-600 w-full h-10 text-slate-50 border-2 outline-none rounded-2xl cursor-pointer hover:bg-sky-700"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Cadastro;
