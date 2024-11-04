// src/components/Admin.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Importe o axios para fazer as requisições HTTP

const Admin = () => {
  const [showDeleteButtons, setShowDeleteButtons] = useState(false);
  const [funcionarios, setFuncionarios] = useState([]);

  // Estado para controlar a visibilidade do modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Inicialização correta do estado newPrestador
  const [newPrestador, setNewPrestador] = useState({
    nome: '',
    email: '',
    cpf: '',
    telefone: '',
    especialidade: '',
  });

  useEffect(() => {
    const fetchFuncionarios = async () => {
      try {
        const response = await axios.get('http://localhost:3000/prestadores');
        setFuncionarios(response.data);
      } catch (error) {
        console.error('Erro ao buscar os funcionários:', error);
      }
    };

    fetchFuncionarios();
  }, []);

  // Função para lidar com a mudança nos inputs do formulário
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPrestador({ ...newPrestador, [name]: value });
  };

  // Função para lidar com o cadastro do novo prestador
  const handleCadastro = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/prestadores', newPrestador);
      // Atualize a lista de funcionários com o novo prestador
      setFuncionarios([...funcionarios, response.data]);
      alert('Funcionário cadastrado com sucesso');
      // Limpe o formulário e feche o modal
      setNewPrestador({
        nome: '',
        email: '',
        cpf: '',
        telefone: '',
        especialidade: '',
      });
      setIsModalOpen(false);
    } catch (error) {
      console.error('Erro ao cadastrar o funcionário:', error);
      alert('Ocorreu um erro ao cadastrar o funcionário. Tente novamente.');
    }
  };

  return (
    <div className="flex h-screen">
      {/* Menu Lateral */}
      <aside className="w-64 bg-sky-700 text-white">
        <div className="p-6">
          <h1 className="text-2xl font-semibold">Painel Administrativo</h1>
        </div>
        <nav>
          <ul>
            <li className="px-6 py-2 hover:bg-sky-600">
              <a href="#">Funcionários</a>
            </li>
            <li className="px-6 py-2 hover:bg-sky-600">
              <a href="#">Configurações</a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Conteúdo Principal */}
      <main className="flex-1 p-6 bg-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Funcionários</h2>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => setIsModalOpen(true)}
          >
            Adicionar Funcionário
          </button>
        </div>

        {/* Novos Botões */}
        <div className="flex space-x-4 mb-4">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={() => setIsModalOpen(true)}
          >
            Adicionar
          </button>
          <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
            Alterar
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={() => setShowDeleteButtons(!showDeleteButtons)}
          >
            Excluir
          </button>
        </div>

        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-center">ID</th>
              <th className="py-2 px-4 border-b text-center">Nome</th>
              <th className="py-2 px-4 border-b text-center">Especialidade</th>
              <th className="py-2 px-4 border-b text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {funcionarios.length > 0 ? (
              funcionarios.map((employee) => (
                <tr key={employee.id}>
                  <td className="py-2 px-4 border-b text-center">{employee.id}</td>
                  <td className="py-2 px-4 border-b text-center">{employee.nome}</td>
                  <td className="py-2 px-4 border-b text-center">{employee.especialidade}</td>
                  <td className="py-2 px-4 border-b text-center">
                    {showDeleteButtons && (
                      <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">
                        Excluir
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-4 text-center">
                  Carregando funcionários...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </main>

      {/* Modal para adicionar prestador */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded w-1/3">
            <h3 className="text-xl mb-4">Adicionar Prestador</h3>
            <form onSubmit={handleCadastro}>
              <div className="mb-4">
                <label className="block text-gray-700">Nome</label>
                <input
                  type="text"
                  name="nome"
                  value={newPrestador.nome}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">CPF</label>
                <input
                  type="text"
                  name="cpf"
                  value={newPrestador.cpf}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={newPrestador.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Telefone</label>
                <input
                  type="text"
                  name="telefone"
                  value={newPrestador.telefone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Especialidade</label>
                <input
                  type="text"
                  name="especialidade"
                  value={newPrestador.especialidade}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="mr-4 px-4 py-2 text-gray-700 hover:text-gray-900"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
