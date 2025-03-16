import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

 

  const handleLogin = async () => {
  try {
    const response = await axios.post(
      "/alfresco/api/-default-/public/authentication/versions/1/tickets",
      JSON.stringify({ userId: username, password: password }),
      { headers: { "Content-Type": "application/json" } }
    );
    
    localStorage.setItem("alfresco_ticket", response.data.entry.id);
    window.location.href = "/dashboard";
  } catch (err) {
    setError("Échec de connexion. Vérifiez vos identifiants.");
  }
};

  
  

  return (
    <div>
      <h2>Connexion à Alfresco</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input type="text" placeholder="Nom d'utilisateur" onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Mot de passe" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Se connecter</button>
    </div>
  );
}

export default Login;
