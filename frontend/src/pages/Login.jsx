import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "/alfresco/api/-default-/public/authentication/versions/1/tickets",
        JSON.stringify({ userId: username, password: password }),
        { headers: { "Content-Type": "application/json" } }
      );

      localStorage.setItem("alfresco_ticket", response.data.entry.id);
      navigate("/dashboard");
    } catch (err) {
      setError("Échec de connexion. Vérifiez vos identifiants.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 vw-100" style={{ backgroundColor: "#f8f9fa" }}>
      <div className="card p-4 shadow-lg border-0 rounded-4" style={{ width: "380px", backgroundColor: "#ffffff" }}>
        <div className="text-center mb-3">
          <img src="/logo_cetic.png" alt="CETIC SPA Logo" className="img-fluid" style={{ maxHeight: "50px" }} />
        </div>
        <h2 className="text-center fw-bold text-primary">Connexion</h2>
        {error && <div className="alert alert-danger text-center">{error}</div>}
        
        <div className="mb-3">
          <input
            type="text"
            className="form-control rounded-3 shadow-sm"
            placeholder="Nom d'utilisateur"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        
        <div className="mb-3">
          <input
            type="password"
            className="form-control rounded-3 shadow-sm"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        
        <button className="btn btn-primary w-100 rounded-3 fw-bold shadow-sm" onClick={handleLogin}>
          🔐 Se connecter
        </button>

        <p className="text-center mt-3">
          <a href="#" className="text-decoration-none text-primary">Mot de passe oublié ?</a>
        </p>
      </div>
    </div>
  );
}

export default Login;

