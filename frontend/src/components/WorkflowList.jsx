import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Button, Spinner, Alert, Form, InputGroup, Table, Toast, ToastContainer } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const WorkflowList = () => {
  const [workflows, setWorkflows] = useState([])
  const [filteredWorkflows, setFilteredWorkflows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    axios.get('http://localhost:8000/api/workflows/') // adapte l’URL à ton backend
      .then(res => {
        if (Array.isArray(res.data)) {
          setWorkflows(res.data)
          setFilteredWorkflows(res.data)
        } else {
          setWorkflows([])
          setFilteredWorkflows([])
        }
        setLoading(false)
      })
      .catch(err => {
        setError("Erreur lors du chargement des workflows.")
        setLoading(false)
      })
  }, [])

  const handleSearch = (e) => {
    const query = e.target.value
    setSearchQuery(query)
    const results = workflows.filter(wf =>
      wf.name.toLowerCase().includes(query.toLowerCase()) ||
      wf.status.toLowerCase().includes(query.toLowerCase())
    )
    setFilteredWorkflows(results)
  }

  const handleStartWorkflow = (id) => {
    // Simuler le démarrage — ici tu pourrais appeler une vraie API
    setNotification(`Workflow ${id} démarré avec succès !`)
    setTimeout(() => setNotification(null), 3000)
  }

  if (loading) {
    return <div className="text-center mt-4"><Spinner animation="border" /> Chargement...</div>
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">📄 Liste des Workflows</h2>

      {/* Barre de recherche */}
      <InputGroup className="mb-4">
        <Form.Control
          placeholder="🔍 Rechercher par nom ou statut"
          value={searchQuery}
          onChange={handleSearch}
        />
        <Button variant="outline-secondary" onClick={() => handleSearch({ target: { value: searchQuery } })}>
          Rechercher
        </Button>
      </InputGroup>

      {/* Tableau */}
      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Description</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredWorkflows.length === 0 ? (
            <tr><td colSpan="5" className="text-center">Aucun workflow trouvé.</td></tr>
          ) : (
            filteredWorkflows.map((wf) => (
              <tr key={wf.id}>
                <td>{wf.id}</td>
                <td>{wf.name}</td>
                <td>{wf.description}</td>
                <td>
                  <span className={`badge ${wf.status === 'actif' ? 'bg-success' : 'bg-secondary'}`}>
                    {wf.status}
                  </span>
                </td>
                <td>
                  <Link to={`/workflow/${wf.id}`} className="btn btn-info btn-sm me-2">Détails</Link>
                  <Button variant="success" size="sm" onClick={() => handleStartWorkflow(wf.id)}>
                    ▶️ Démarrer
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      {/* Notification */}
      {notification && (
        <ToastContainer position="top-end" className="p-3">
          <Toast bg="success" onClose={() => setNotification(null)} show={!!notification} delay={3000} autohide>
            <Toast.Header>
              <strong className="me-auto">Notification</strong>
            </Toast.Header>
            <Toast.Body className="text-white">{notification}</Toast.Body>
          </Toast>
        </ToastContainer>
      )}
    </div>
  )
}

export default WorkflowList
