import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import padrao from "../../public/usuario-padrao.jpg";
import api from "../services/api.js";
import CEP from "../services/cep.js";
import NavBarHome from "./NavBarHome.jsx";
import Footer from "./Footer.jsx";

const Conta = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [enderecos, setEnderecos] = useState([
    {
      id: Date.now(),
      uf: "",
      cep: "",
      bairro: "",
      logradouro: "",
      numero: "",
      complemento: "",
      cidade: "",
    },
  ]);
  const [foto, setFoto] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }

    const fetchClienteData = async () => {
      try {
        const response = await api.get("/clientes", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const cliente = response.data;
        setNome(cliente.nome);
        setEmail(cliente.email);
        setTelefone(cliente.telefone);
        setFoto(cliente.foto || null);
        setEnderecos(
          cliente.enderecos || [
            {
              id: Date.now(),
              uf: "",
              cep: "",
              bairro: "",
              logradouro: "",
              numero: "",
              complemento: "",
              cidade: "",
            },
          ]
        );
      } catch (error) {
        console.log(error);
        alert("Erro ao carregar os dados do cliente ou usuário não autorizado");
        navigate("/login");
      }
    };

    fetchClienteData();
  }, [navigate]);
  
  const handleRegister = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Usuário não autenticado");
      navigate("/login");
      return;
    }

    try {
      await api.post(
        "/clientes",
        {
          email,
          telefone,
          enderecos,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Usuário atualizado com sucesso");
    } catch (error) {
      console.log(error);
      alert("Erro ao atualizar o usuário");
    }
  };

  const buscarCep = async (index, cepValue) => {
    cepValue = cepValue.replace(/\D/g, "");
    if (cepValue.length !== 8) {
      alert("Insira um CEP válido");
      return;
    }

    try {
      const response = await CEP.get(`/${cepValue}/json/`);
      const newEnderecos = [...enderecos];
      newEnderecos[index] = {
        ...newEnderecos[index],
        cep: cepValue,
        logradouro: response.data.logradouro,
        bairro: response.data.bairro,
        uf: response.data.uf,
        cidade: response.data.localidade,
      };
      setEnderecos(newEnderecos);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddressChange = (index, field, value) => {
    const newEnderecos = [...enderecos];
    newEnderecos[index] = { ...newEnderecos[index], [field]: value };
    setEnderecos(newEnderecos);
  };

  const addAddress = () => {
    setEnderecos([
      ...enderecos,
      {
        id: Date.now(),
        uf: "",
        cep: "",
        bairro: "",
        logradouro: "",
        numero: "",
        complemento: "",
        cidade: "",
      },
    ]);
  };

  const removeAddress = (index) => {
    const newEnderecos = enderecos.filter((_, i) => i !== index);
    setEnderecos(newEnderecos);
  };

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setFoto(URL.createObjectURL(file));

      const formData = new FormData();
      formData.append("foto", file);

      try {
        const token = localStorage.getItem("token");
        await api.post("/clientes", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        alert("Foto alterada com sucesso!");
      } catch (error) {
        console.log(error);
        alert("Erro ao atualizar a foto do perfil");
      }
    }
  };

  return (
    <div>
      <NavBarHome showFAQ={false} />
      <div className="flex md:flex-row justify-around bg-sky-700 p-10">
        <div className="w-24 h-24 sm:w-32 sm:h-32 mr-0 lg:mr-6">
          <img
            src={foto || padrao}
            alt="Foto do usuário"
            className="w-full h-full object-cover rounded-full mb-4"
          />
          <label
            htmlFor="file-upload"
            className="mt-4 md:ml-4 sm:ml-4 p-2 text-sm bg-sky-600 text-white rounded-full cursor-pointer hover:bg-sky-500"
          >
            Alterar Foto
          </label>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="hidden"
          />
        </div>

        <div>
          <h2 className="text-white text-2xl sm:text-3xl font-bold mt-10">
            Olá, {nome}!
          </h2>
        </div>
      </div>
      <div className="bg-sky-700 grid grid-cols-1 md:grid-cols-2 md:grid-rows-1 gap-6 p-4 lg:p-10">
        <div className="flex justify-center md:justify-around md:col-span-2 mt-10 md:mb-20">
          <div className="md:flex md:flex-col md:items-center md:h-auto w-full max-w-[800px] p-6 bg-white rounded-3xl shadow-md">
            <h1 className="text-sky-600 text-2xl sm:text-3xl font-bold mb-6 text-center">
              Altere seus dados
            </h1>
            <form onSubmit={handleRegister} className="flex flex-col gap-6">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Dados pessoais */}
                <div className="flex-1 bg-gray-100 p-4 rounded-xl">
                  <h2 className="text-center text-sky-600 text-xl sm:text-2xl font-bold mb-4">
                    Dados pessoais
                  </h2>
                  <label>
                    <span className="block text-sky-700 text-lg">Email</span>
                    <input
                      className="w-full p-2 rounded-xl outline-none border-2 border-sky-700 mb-3"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </label>
                  <label>
                    <span className="block text-sky-700 text-lg">Telefone</span>
                    <input
                      className="w-full p-2 rounded-xl outline-none border-2 border-sky-700 mb-3"
                      type="text"
                      value={telefone}
                      onChange={(e) => setTelefone(e.target.value)}
                    />
                  </label>
                </div>

                {/* Endereços */}
                <div className="flex-1 bg-gray-100 p-4 rounded-xl">
                  <h2 className="text-center text-sky-600 text-xl sm:text-2xl font-bold mb-4">
                    Endereços
                  </h2>
                  {enderecos.map((endereco, index) => (
                    <div
                      key={endereco.id}
                      className="bg-gray-200 p-4 rounded-xl mb-4"
                    >
                      <label>
                        <span className="text-sky-700 text-lg">CEP</span>
                        <input
                          className="w-full p-2 rounded-xl outline-none border-2 border-sky-700 mb-3"
                          type="text"
                          value={endereco.cep}
                          onBlur={() => buscarCep(index, endereco.cep)}
                          onChange={(e) =>
                            handleAddressChange(index, "cep", e.target.value)
                          }
                        />
                      </label>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <label className="flex-1">
                          <span className="text-sky-700 text-lg">UF</span>
                          <input
                            className="w-full p-2 rounded-xl outline-none border-2 border-sky-700 mb-3"
                            type="text"
                            value={endereco.uf}
                            readOnly
                          />
                        </label>
                        <label className="flex-1">
                          <span className="text-sky-700 text-lg">Cidade</span>
                          <input
                            className="w-full p-2 rounded-xl outline-none border-2 border-sky-700 mb-3"
                            type="text"
                            value={endereco.cidade}
                            readOnly
                          />
                        </label>
                      </div>
                      <label>
                        <span className="text-sky-700 text-xl">Logradouro</span>
                        <input
                          className="w-full p-2 rounded-xl outline-none border-2 border-sky-700 mb-3"
                          type="text"
                          value={endereco.logradouro}
                          readOnly
                        />
                      </label>
                      <label>
                        <span className="text-sky-700 text-xl">Bairro</span>
                        <input
                          className="w-full p-2 rounded-xl outline-none border-2 border-sky-700 mb-3"
                          type="text"
                          value={endereco.bairro}
                          readOnly
                        />
                      </label>
                      <label>
                        <span className="text-sky-700 text-xl">Número</span>
                        <input
                          className="w-full p-2 rounded-xl outline-none border-2 border-sky-700 mb-3"
                          type="text"
                          value={endereco.numero}
                          onChange={(e) =>
                            handleAddressChange(index, "numero", e.target.value)
                          }
                        />
                      </label>
                      <label>
                        <span className="text-sky-700 text-xl">
                          Complemento
                        </span>
                        <input
                          className="w-full p-2 rounded-xl outline-none border-2 border-sky-700 mb-3"
                          type="text"
                          value={endereco.complemento}
                          onChange={(e) =>
                            handleAddressChange(
                              index,
                              "complemento",
                              e.target.value
                            )
                          }
                        />
                      </label>
                      <button
                        type="button"
                        onClick={() => removeAddress(index)}
                        className="mt-2 p-2 bg-red-600 text-white rounded-lg hover:bg-red-500"
                      >
                        Remover endereço
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addAddress}
                    className="mt-2 p-2 bg-sky-600 text-white rounded-lg hover:bg-sky-500 w-full"
                  >
                    Adicionar endereço
                  </button>
                </div>
              </div>
              <button
                type="submit"
                className="mt-6 w-full p-2 bg-sky-600 text-white rounded-full hover:bg-sky-500"
              >
                Salvar Alterações
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Conta;
