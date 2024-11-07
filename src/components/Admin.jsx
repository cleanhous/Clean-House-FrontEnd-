import { useState, useEffect } from 'react';
import axios from 'axios'; // Certifique-se de que o axios está instalado

const Admin = () => {
  const [showDeleteButtons, setShowDeleteButtons] = useState(false);
  const [funcionarios, setFuncionarios] = useState([]);

  // Estados para controlar a visibilidade e animação dos modais
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [successMessage, setSuccessMessage] = useState('');
  const [selectedPrestadorId, setSelectedPrestadorId] = useState(null);

  // Inicialização do estado newPrestador com todos os campos necessários
  const [newPrestador, setNewPrestador] = useState({
    nome: '',
    email: '',
    cpf: '',
    senha: '',
    telefone: '',
    nota: 0, // Valor padrão
    especialidade_id: '',
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
      const response = await axios.post('http://localhost:3000/prestadores/create', newPrestador);
      // Atualize a lista de funcionários com o novo prestador
      setFuncionarios([...funcionarios, response.data]);
      // Limpe o formulário e feche o modal de adicionar
      setNewPrestador({
        nome: '',
        email: '',
        cpf: '',
        senha: '',
        telefone: '',
        nota: 5,
        especialidade_id: '',
      });
      // Inicia a animação de saída
      setIsModalOpen(false);
      // Exibe o modal de sucesso após o tempo da animação
      setTimeout(() => {
        setShowAddModal(false);
        setSuccessMessage('Prestador cadastrado com sucesso');
        setShowSuccessModal(true);
        setIsSuccessModalOpen(true);
      }, 300); // 300ms deve ser igual ao tempo da animação
    } catch (error) {
      console.error('Erro ao cadastrar o prestador:', error);
      alert('Ocorreu um erro ao cadastrar o prestador. Tente novamente.');
    }
  };

  // Função para abrir o modal de confirmação de exclusão
  const openConfirmDeleteModal = (id) => {
    setSelectedPrestadorId(id);
    setShowConfirmDeleteModal(true);
    setIsConfirmDeleteOpen(true);
  };

  // Função para confirmar a exclusão do prestador
  const confirmDeletePrestador = async () => {
    try {
      await axios.delete(`http://localhost:3000/prestadores/${selectedPrestadorId}`);
      setFuncionarios(funcionarios.filter((funcionario) => funcionario.prestador_id !== selectedPrestadorId));
      // Inicia a animação de saída
      setIsConfirmDeleteOpen(false);
      setTimeout(() => {
        setShowConfirmDeleteModal(false);
        setSuccessMessage('Prestador excluído com sucesso');
        setShowSuccessModal(true);
        setIsSuccessModalOpen(true);
      }, 300);
    } catch (error) {
      console.error('Erro ao excluir o prestador:', error);
      alert('Ocorreu um erro ao excluir o prestador. Tente novamente.');
    }
  };

  // Função para abrir o modal de adicionar prestador
  const openAddModal = () => {
    setShowAddModal(true);
    setIsModalOpen(true);
  };

  // Função para fechar o modal de adicionar prestador
  const closeAddModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setShowAddModal(false);
    }, 300);
  };

  // Função para fechar o modal de sucesso
  const closeSuccessModal = () => {
    setIsSuccessModalOpen(false);
    setTimeout(() => {
      setShowSuccessModal(false);
    }, 300);
  };

  // Função para fechar o modal de confirmação de exclusão
  const closeConfirmDeleteModal = () => {
    setIsConfirmDeleteOpen(false);
    setTimeout(() => {
      setShowConfirmDeleteModal(false);
    }, 300);
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
      <main className="flex-1 p-6 bg-gray-100 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Funcionários</h2>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={openAddModal}
          >
            Adicionar Funcionário
          </button>
        </div>

        {/* Novos Botões */}
        <div className="flex space-x-4 mb-4">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={openAddModal}
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
              <th className="py-2 px-4 border-b text-center">Email</th>
              <th className="py-2 px-4 border-b text-center">Telefone</th>
              <th className="py-2 px-4 border-b text-center">Especialidade</th>
              <th className="py-2 px-4 border-b text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {funcionarios.length > 0 ? (
              funcionarios.map((employee) => (
                <tr key={employee.prestador_id}>
                  <td className="py-2 px-4 border-b text-center">{employee.prestador_id}</td>
                  <td className="py-2 px-4 border-b text-center">{employee.prestador_nome}</td>
                  <td className="py-2 px-4 border-b text-center">{employee.prestador_email}</td>
                  <td className="py-2 px-4 border-b text-center">{employee.prestador_telefone}</td>
                  <td className="py-2 px-4 border-b text-center">{employee.especialidade_titulo}</td>
                  <td className="py-2 px-4 border-b text-center">
                    {showDeleteButtons && (
                      <button
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                        onClick={() => openConfirmDeleteModal(employee.prestador_id)}
                      >
                        Excluir
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-4 text-center">
                  Carregando funcionários...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </main>

      {/* Modal para adicionar prestador */}
      {showAddModal && (
        <div
          className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 overflow-auto transition-opacity duration-300 ${
            isModalOpen ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div
            className={`bg-white p-6 rounded w-1/2 transform transition-transform duration-300 ${
              isModalOpen ? 'translate-y-0' : '-translate-y-10'
            }`}
          >
            <h3 className="text-xl mb-4">Adicionar Prestador</h3>
            <form onSubmit={handleCadastro}>
              {/* Campos do Formulário */}
              <div className="grid grid-cols-2 gap-4">
                {/* Coluna 1 */}
                <div>
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
                </div>
                {/* Coluna 2 */}
                <div>
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
                    <label className="block text-gray-700">Especialidade ID</label>
                    <input
                      type="text"
                      name="especialidade_id"
                      value={newPrestador.especialidade_id}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Senha</label>
                    <input
                      type="password"
                      name="senha"
                      value={newPrestador.senha}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={closeAddModal}
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

      {/* Modal de confirmação de exclusão */}
      {showConfirmDeleteModal && (
        <div
          className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 overflow-auto transition-opacity duration-300 ${
            isConfirmDeleteOpen ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div
            className={`bg-white p-6 rounded w-1/3 transform transition-transform duration-300 ${
              isConfirmDeleteOpen ? 'translate-y-0' : '-translate-y-10'
            }`}
          >
            <h3 className="text-xl mb-4">Confirmar Exclusão</h3>
            <p>Tem certeza que deseja excluir este prestador?</p>
            <div className="flex justify-end mt-6">
              <button
                onClick={closeConfirmDeleteModal}
                className="mr-4 px-4 py-2 text-gray-700 hover:text-gray-900"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDeletePrestador}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de sucesso */}
      {showSuccessModal && (
        <div
          className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 overflow-auto transition-opacity duration-300 ${
            isSuccessModalOpen ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div
            className={`bg-white p-6 rounded w-1/3 transform transition-transform duration-300 ${
              isSuccessModalOpen ? 'translate-y-0' : '-translate-y-10'
            }`}
          >
            <h3 className="text-xl mb-4">Sucesso</h3>
            <p>{successMessage}</p>
            <div className="flex justify-end mt-6">
              <button
                onClick={closeSuccessModal}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
