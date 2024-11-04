// src/components/Admin.jsx

import React, { useState, useEffect } from 'react';

const Admin = () => {
  
  const [showDeleteButtons, setShowDeleteButtons] = useState(false);


  const [funcionarios, setFuncionarios] = useState([]);

  useEffect(() => {
    const fetchFuncionarios = async () => {
      try {
        const response = await fetch('https://api.exemplo.com/funcionarios');
        const data = await response.json();
        setFuncionarios(data);
      } catch (error) {
        console.error('Erro ao buscar os funcionários:', error);
      }
    };

    fetchFuncionarios();
  }, []);

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
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Adicionar Funcionário
          </button>
        </div>

        {/* Novos Botões */}
        <div className="flex space-x-4 mb-4">
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
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
              <th className="py-2 px-4 border-b text-center">Cargo</th>
              <th className="py-2 px-4 border-b text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {funcionarios.length > 0 ? (
              funcionarios.map((employee) => (
                <tr key={employee.id}>
                  <td className="py-2 px-4 border-b text-center">{employee.id}</td>
                  <td className="py-2 px-4 border-b text-center">{employee.name}</td>
                  <td className="py-2 px-4 border-b text-center">{employee.position}</td>
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
    </div>
  );
};

export default Admin;
