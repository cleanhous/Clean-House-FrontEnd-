import { useState, useEffect } from 'react';
import axios from 'axios';

const Admin = () => {
  // Estado para controlar a visualização atual ('funcionarios' ou 'contratos')
  const [currentView, setCurrentView] = useState('funcionarios');

  // Estados relacionados aos funcionários
  const [funcionarios, setFuncionarios] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Estados relacionados aos contratos
  const [contratos, setContratos] = useState([]);
  const [searchContratoTerm, setSearchContratoTerm] = useState('');

  // Estados para controlar a visibilidade e animação dos modais
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Estados para o modal de erro
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Estados para o modal de edição
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [successMessage, setSuccessMessage] = useState('');
  const [selectedPrestadorId, setSelectedPrestadorId] = useState(null);

  // Estado para armazenar o prestador que está sendo editado
  const [currentPrestador, setCurrentPrestador] = useState({
    email: '',
    telefone: '',
    especialidade_id: '',
  });

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

  // Estado para controlar o modo ativo ('edit' ou 'delete')
  const [activeMode, setActiveMode] = useState(''); // '', 'edit', 'delete'

  // Efeito para buscar funcionários
  useEffect(() => {
    const fetchFuncionarios = async () => {
      try {
        const response = await axios.get('https://backend-production-ce19.up.railway.app/prestadores');
        setFuncionarios(response.data);
      } catch (error) {
        console.error('Erro ao buscar os funcionários:', error);
      }
    };

    if (currentView === 'funcionarios') {
      fetchFuncionarios();
    }
  }, [currentView]);

  // Efeito para buscar contratos
  useEffect(() => {
    const fetchContratos = async () => {
      try {
        const response = await axios.get('https://backend-production-ce19.up.railway.app/contratos');
        setContratos(response.data);
      } catch (error) {
        console.error('Erro ao buscar os contratos:', error);
      }
    };

    if (currentView === 'contratos') {
      fetchContratos();
    }
  }, [currentView]);

  // Função para lidar com a mudança nos inputs do formulário
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPrestador({ ...newPrestador, [name]: value });
  };

  // Função para lidar com a mudança nos inputs do formulário de edição
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentPrestador({ ...currentPrestador, [name]: value });
  };

  // Função para lidar com o cadastro do novo prestador
  const handleCadastro = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://backend-production-ce19.up.railway.app/prestadores/create',
        newPrestador
      );
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
      await axios.delete(`https://backend-production-ce19.up.railway.app/prestadores/${selectedPrestadorId}`);
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
      // Verifica se o erro é devido a contratos associados
      if (error.response && error.response.data && error.response.data.message) {
        const errorMsg = error.response.data.message;
        if (errorMsg.includes('contratos associados')) {
          setErrorMessage('Há contratos associados a esse prestador.');
        } else {
          setErrorMessage('Ocorreu um erro ao excluir o prestador. Tente novamente.');
        }
      } else {
        setErrorMessage('Ocorreu um erro ao excluir o prestador. Tente novamente.');
      }
      setShowErrorModal(true);
      setIsErrorModalOpen(true);
      // Fecha o modal de confirmação de exclusão
      setIsConfirmDeleteOpen(false);
      setTimeout(() => {
        setShowConfirmDeleteModal(false);
      }, 300);
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

  // Função para abrir o modal de edição
  const openEditModal = (prestador) => {
    setCurrentPrestador({
      email: prestador.prestador_email || '',
      telefone: prestador.prestador_telefone || '',
      especialidade_id: prestador.especialidade_id || '',
    });
    setSelectedPrestadorId(prestador.prestador_id);
    setShowEditModal(true);
    setIsEditModalOpen(true);
  };

  // Função para fechar o modal de edição
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setTimeout(() => {
      setShowEditModal(false);
    }, 300);
  };

  // Função para lidar com a atualização do prestador
  const handleUpdatePrestador = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        `https://backend-production-ce19.up.railway.app/prestadores/${selectedPrestadorId}`,
        currentPrestador
      );
      // Atualiza o prestador na lista
      setFuncionarios(
        funcionarios.map((funcionario) =>
          funcionario.prestador_id === selectedPrestadorId
            ? { ...funcionario, ...currentPrestador }
            : funcionario
        )
      );
      // Fecha o modal de edição
      setIsEditModalOpen(false);
      setTimeout(() => {
        setShowEditModal(false);
        setSuccessMessage('Prestador atualizado com sucesso');
        setShowSuccessModal(true);
        setIsSuccessModalOpen(true);
      }, 300);
    } catch (error) {
      console.error('Erro ao atualizar o prestador:', error);
      alert('Ocorreu um erro ao atualizar o prestador. Tente novamente.');
    }
  };

  // Função para fechar o modal de sucesso
  const closeSuccessModal = () => {
    setIsSuccessModalOpen(false);
    setTimeout(() => {
      setShowSuccessModal(false);
    }, 300);
  };

  // Função para fechar o modal de erro
  const closeErrorModal = () => {
    setIsErrorModalOpen(false);
    setTimeout(() => {
      setShowErrorModal(false);
    }, 300);
  };

  // Função para fechar o modal de confirmação de exclusão
  const closeConfirmDeleteModal = () => {
    setIsConfirmDeleteOpen(false);
    setTimeout(() => {
      setShowConfirmDeleteModal(false);
    }, 300);
  };

  // Filtrar os funcionários com base no termo de busca
  const filteredFuncionarios = funcionarios.filter((employee) => {
    const search = searchTerm.toLowerCase();
    return (
      (employee.prestador_nome?.toLowerCase() || '').includes(search) ||
      (employee.prestador_email?.toLowerCase() || '').includes(search) ||
      (employee.prestador_telefone?.toLowerCase() || '').includes(search) ||
      (employee.especialidade_titulo?.toLowerCase() || '').includes(search) ||
      employee.prestador_id?.toString().includes(search)
    );
  });

  // Filtrar os contratos com base no termo de busca
  const filteredContratos = contratos.filter((contrato) => {
    const search = searchContratoTerm.toLowerCase();
    return (
      contrato.contrato_id?.toString().includes(search) ||
      contrato.cliente_nome?.toLowerCase().includes(search) ||
      contrato.prestador_nome?.toLowerCase().includes(search) ||
      contrato.data_inicio?.toLowerCase().includes(search) ||
      contrato.data_fim?.toLowerCase().includes(search)
    );
  });

  return (
    <div className="flex h-screen">
      {/* Menu Lateral */}
      <aside className="w-64 bg-sky-700 text-white">
        <div className="p-6">
          <h1 className="text-2xl font-semibold">Painel Administrativo</h1>
        </div>
        <nav>
          <ul>
            <li
              className={`px-6 py-2 hover:bg-sky-600 cursor-pointer ${
                currentView === 'funcionarios' ? 'bg-sky-600' : ''
              }`}
              onClick={() => setCurrentView('funcionarios')}
            >
              Funcionários
            </li>
            <li
              className={`px-6 py-2 hover:bg-sky-600 cursor-pointer ${
                currentView === 'contratos' ? 'bg-sky-600' : ''
              }`}
              onClick={() => setCurrentView('contratos')}
            >
              Contratos
            </li>
            <li className="px-6 py-2 hover:bg-sky-600">
              <a href="#">Configurações</a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Conteúdo Principal */}
      <main className="flex-1 p-6 bg-gray-100 overflow-auto">
        {currentView === 'funcionarios' && (
          <>
            {/* Seção de Funcionários */}
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
                id='adicionar-prestador'
                onClick={openAddModal}
              >
                Adicionar
              </button>
              <button
                className={`bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 ${
                  activeMode === 'delete' ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                onClick={() => setActiveMode(activeMode === 'edit' ? '' : 'edit')}
              >
                Alterar
              </button>
              <button
                className={`bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ${
                  activeMode === 'edit' ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                id='excluir-prestador'
                onClick={() => setActiveMode(activeMode === 'delete' ? '' : 'delete')}
              >
                Excluir
              </button>
            </div>

            {/* Campo de Busca */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Buscar funcionários..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
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
                {filteredFuncionarios.length > 0 ? (
                  filteredFuncionarios.map((employee) => (
                    <tr key={employee.prestador_id}>
                      <td className="py-2 px-4 border-b text-center">{employee.prestador_id}</td>
                      <td className="py-2 px-4 border-b text-center">{employee.prestador_nome}</td>
                      <td className="py-2 px-4 border-b text-center">{employee.prestador_email}</td>
                      <td className="py-2 px-4 border-b text-center">{employee.prestador_telefone}</td>
                      <td className="py-2 px-4 border-b text-center">{employee.especialidade_titulo}</td>
                      <td className="py-2 px-4 border-b text-center">
                        <div className="flex justify-center space-x-2">
                          {activeMode === 'edit' && (
                            <button
                              className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                              onClick={() => openEditModal(employee)}
                            >
                              Alterar
                            </button>
                          )}
                          {activeMode === 'delete' && (
                            <button
                              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                              onClick={() => openConfirmDeleteModal(employee.prestador_id)}
                            >
                              Excluir
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="py-4 text-center">
                      Nenhum funcionário encontrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </>
        )}

        {currentView === 'contratos' && (
          <>
            {/* Seção de Contratos */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Contratos</h2>
            </div>

            {/* Campo de Busca para Contratos */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Buscar contratos..."
                value={searchContratoTerm}
                onChange={(e) => setSearchContratoTerm(e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b text-center">ID do Contrato</th>
                  <th className="py-2 px-4 border-b text-center">Nome do Cliente</th>
                  <th className="py-2 px-4 border-b text-center">Nome do Prestador</th>
                  <th className="py-2 px-4 border-b text-center">Data Início</th>
                  <th className="py-2 px-4 border-b text-center">Data Fim</th>
                </tr>
              </thead>
              <tbody>
                {filteredContratos.length > 0 ? (
                  filteredContratos.map((contrato) => (
                    <tr key={contrato.contrato_id}>
                      <td className="py-2 px-4 border-b text-center">{contrato.contrato_id}</td>
                      <td className="py-2 px-4 border-b text-center">{contrato.cliente_nome}</td>
                      <td className="py-2 px-4 border-b text-center">{contrato.prestador_nome}</td>
                      <td className="py-2 px-4 border-b text-center">
                        {new Date(contrato.data_inicio).toLocaleString('pt-BR')}
                      </td>
                      <td className="py-2 px-4 border-b text-center">
                        {new Date(contrato.data_fim).toLocaleString('pt-BR')}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="py-4 text-center">
                      Nenhum contrato encontrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </>
        )}
      </main>

      {/* Modais existentes (Adicionar, Editar, Confirmar Exclusão, Sucesso, Erro) */}
      {/* Mantenha os modais já implementados */}
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
                      id='nome-prestador'
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
                      id='email-prestador'
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
                      id='cpf-prestador'
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
                      id='telefone-prestador'
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
                      id='especialidade-prestador'
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
                      id='senha-prestador'
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
                  id='salvar-prestador'
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de edição do prestador */}
      {showEditModal && (
        <div
          className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 overflow-auto transition-opacity duration-300 ${
            isEditModalOpen ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div
            className={`bg-white p-6 rounded w-1/2 transform transition-transform duration-300 ${
              isEditModalOpen ? 'translate-y-0' : '-translate-y-10'
            }`}
          >
            <h3 className="text-xl mb-4">Editar Prestador</h3>
            <form onSubmit={handleUpdatePrestador}>
              {/* Campos do Formulário de Edição */}
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={currentPrestador.email}
                  onChange={handleEditInputChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Telefone</label>
                <input
                  type="text"
                  name="telefone"
                  value={currentPrestador.telefone}
                  onChange={handleEditInputChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Especialidade ID</label>
                <input
                  type="text"
                  name="especialidade_id"
                  value={currentPrestador.especialidade_id}
                  onChange={handleEditInputChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="mr-4 px-4 py-2 text-gray-700 hover:text-gray-900"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Salvar Alterações
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

      {/* Modal de erro */}
      {showErrorModal && (
        <div
          className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 overflow-auto transition-opacity duration-300 ${
            isErrorModalOpen ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div
            className={`bg-white p-6 rounded w-1/3 transform transition-transform duration-300 ${
              isErrorModalOpen ? 'translate-y-0' : '-translate-y-10'
            }`}
          >
            <h3 className="text-xl mb-4">Erro</h3>
            <p>{errorMessage}</p>
            <div className="flex justify-end mt-6">
              <button
                onClick={closeErrorModal}
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
