// UpdateUserPage.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './Update_User.css';

function Update_User() {
  const { id } = useParams(); // Obter o ID via API
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    cpf_cnpj: "",
    is_active: false,
  });

  // Função para buscar os dados do usuário
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/users/user/${id}`
        );
        const data = await response.json();
        if (response.ok) {
          console.log(data);
          setFormData({
            name: data.name,
            email: data.email,
            cpf_cnpj: data.cpf_cnpj,
            password: data.password,
            is_active: data.is_active,
          });
        } else {
          alert("Erro buscando os dados.");
        }
      } catch (error) {
        console.error("Erro com conexão com a API:", error);
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.cpf_cnpj
    ) {
      alert("Favor preencher todos os campos!!");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8000/api/users/user/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        alert("Usuário atualizado com sucesso.");
        navigate("/listarUser");
        // Leva a pagina de listagem após update
      } else {
        const data = await response.json();
        alert(`Erro: ${data.error}`);
      }
    } catch (error) {
      alert("Erro ao atualizar o seguinte user: " + error.message);
    }
  };

  return (
    <div className="container">
      <div id="formulario">
    <h2>Atualizar Usuário</h2>
    <form className="forms" onSubmit={handleSubmit}>
      <label htmlFor="name">Nome</label>
      <input
        type="text"
        name="name"
        id="name"
        value={formData.name}
        onChange={handleChange}
      />
      <br />
      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        id="email"
        value={formData.email}
        onChange={handleChange}
      />
      <br />
      <label htmlFor="cpf_cnpj">CPF / CNPJ</label>
      <input
        type="text"
        name="cpf_cnpj"
        id="cpf_cnpj"
        value={formData.cpf_cnpj}
        onChange={handleChange}
      />
      <br />
      <label htmlFor="senha">Senha</label>
      <input
        type="password"
        name="password"
        id="senha"
        value={formData.password}
        onChange={handleChange}
      />
      <br />
      <button type="submit">Atualizar</button>
      <button type="button" onClick={() => navigate("/Listar_User")}>
        Cancelar
      </button>
    </form>
  </div></div>
    
  );
}

export default Update_User;
