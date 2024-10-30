// ListUser.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Listar_User.css';
function Listar_User() {
  const [dados, setDados] = useState([]);
  const navigate = useNavigate(); // Hook para navegação

  // Função para buscar dados dos usuários
  const listagemUser = () => {
    fetch("http://localhost:8000/api/users/")
      .then((response) => response.json())
      .then((data) => setDados(data))
      .catch((error) => console.error("Erro ao buscar dados:", error));
  };

  // useEffect função para montar o componente de listagem
  useEffect(() => {
    listagemUser();
  }, []);

  return (
    <div>
      <h3>Listagem de Usuários</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>CPF/CNPJ</th>
            <th>Email</th>
            <th>editar</th>
          </tr>
        </thead>
        <tbody>
          {dados.map((user) => (
            <tr key={user.id}>
              <td className="linha">{user.id}</td>
              <td className="linha">{user.name}</td>
              <td className="linha">{user.cpf_cnpj}</td>
              <td className="linha">{user.email}</td>
              <td>
                {/* Navega para a rota de atualização ao clicar no botão Editar */}
                <button onClick={() => navigate(`/updateUser/${user.id}`)}>
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Listar_User;
