import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  Button,
  Modal,
  Form,
  Table,
  InputGroup,
  Toast,
  ToastContainer,
  Spinner,
} from 'react-bootstrap'

const WorkflowPage = () => {
  const [workflows, setWorkflows] = useState([])
  const [filteredWorkflows, setFilteredWorkflows] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    assignedTo: '',
    workflowId: '',
  })
  const [notification, setNotification] = useState(null)
  const [loading, setLoading] = useState(true)

  // Chargement des workflows
  useEffect(() => {
    axios
      .get('http://localhost:8000/api/workflows/')
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : res.data.results || []
        setWorkflows(data)
        setFilteredWorkflows(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Erreur de chargement des workflows :', err)
        setLoading(false)
        setNotification('❌ Impossible de charger les workflows.')
      })
  }, [])

  // Recherche
  const handleSearch = (e) => {
    const query = e.target.value
    setSearchQuery(query)
    const filtered = workflows.filter(
      (wf) =>
        wf.name?.toLowerCase().includes(query.toLowerCase()) ||
        wf.description?.toLowerCase().includes(query.toLowerCase())
    )
    setFilteredWorkflows(filtered)
  }

  // Gestion du formulaire
  const handleOpenModal = () => setShowModal(true)
  const handleCloseModal = () => {
    setShowModal(false)
    setNewTask({
      title: '',
      description: '',
      assignedTo: '',
      workflowId: '',
    })
  }

  const handleCreateTask = (e) => {
    e.preventDefault()
    axios
      .post(`http://localhost:8000/api/workflows/${newTask.workflowId}/tasks/`, newTask)
      .then(() => {
        setNotification(`✅ Tâche créée pour le workflow #${newTask.workflowId}`)
        handleCloseModal()
      })
      .catch((err) => {
        console.error('Erreur création tâche :', err)
        setNotification('❌ Erreur lors de la création de la tâche.')
      })
  }

  return (
    <div className="container-fluid p-4">
      {/* Titre et bouton */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>📄 Workflows</h2>
        <Button variant="primary" onClick={handleOpenModal}>
          ▶️ Démarrer un Workflow
        </Button>
      </div>

      {/* Barre de recherche */}
      <InputGroup className="mb-4">
        <Form.Control
          type="text"
          placeholder="🔍 Rechercher un workflow..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </InputGroup>

      {/* Tableau */}
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : (
        <Table striped bordered hover responsive>
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Description</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(filteredWorkflows) && filteredWorkflows.length > 0 ? (
              filteredWorkflows.map((wf) => (
                <tr key={wf.id}>
                  <td>{wf.id}</td>
                  <td>{wf.name}</td>
                  <td>{wf.description}</td>
                  <td>
                    <span
                      className={`badge ${
                        wf.status === 'actif' ? 'bg-success' : 'bg-secondary'
                      }`}
                    >
                      {wf.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  Aucun workflow trouvé
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}

      {/* Modal - Création de Tâche */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>📝 Nouvelle Tâche</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCreateTask}>
            <Form.Group className="mb-3">
              <Form.Label>ID du Workflow</Form.Label>
              <Form.Control
                type="number"
                required
                value={newTask.workflowId}
                onChange={(e) =>
                  setNewTask({ ...newTask, workflowId: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Titre</Form.Label>
              <Form.Control
                type="text"
                required
                value={newTask.title}
                onChange={(e) =>
                  setNewTask({ ...newTask, title: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                required
                value={newTask.description}
                onChange={(e) =>
                  setNewTask({ ...newTask, description: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Assigner à</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nom d'utilisateur"
                required
                value={newTask.assignedTo}
                onChange={(e) =>
                  setNewTask({ ...newTask, assignedTo: e.target.value })
                }
              />
            </Form.Group>
            <div className="text-end">
              <Button variant="secondary" onClick={handleCloseModal} className="me-2">
                Annuler
              </Button>
              <Button variant="success" type="submit">
                Créer
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Notification */}
      {notification && (
        <ToastContainer position="top-end" className="p-3">
          <Toast
            bg="info"
            onClose={() => setNotification(null)}
            show={!!notification}
            delay={3000}
            autohide
          >
            <Toast.Body>{notification}</Toast.Body>
          </Toast>
        </ToastContainer>
      )}
    </div>
  )
}

export default WorkflowPage
