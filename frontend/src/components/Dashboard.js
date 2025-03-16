import React, { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      const ticket = localStorage.getItem("alfresco_ticket");

      if (!ticket) {
        console.error("Aucun ticket trouvé, redirection vers la connexion...");
        window.location.href = "/";
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/-root-/children",
          {
            headers: { Authorization: `Basic ${btoa(ticket)}` },
          }
        );
        setDocuments(response.data.list.entries);
      } catch (error) {
        console.error("Erreur lors de la récupération des documents", error);
      }
    };

    fetchDocuments();
  }, []);

  return (
    <div>
      <h2>Tableau de Bord Alfresco</h2>
      <ul>
        {documents.map((doc, index) => (
          <li key={index}>{doc.entry.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
