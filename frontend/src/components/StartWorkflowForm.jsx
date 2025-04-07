import React from 'react'
import { useState } from 'react'
import axios from 'axios'

const StartWorkflowForm = () => {
  const [workflowId, setWorkflowId] = useState('')

  const startWorkflow = () => {
    axios.post('/api/workflows/start/', { id: workflowId })
      .then(() => alert('Workflow démarré'))
      .catch(err => console.error(err))
  }

  return (
    <div className="p-4 shadow rounded bg-white">
      <h2 className="text-xl font-bold mb-2">▶️ Démarrer un Workflow</h2>
      <input
        type="text"
        placeholder="ID Workflow"
        className="input"
        value={workflowId}
        onChange={(e) => setWorkflowId(e.target.value)}
      />
      <button className="btn mt-2" onClick={startWorkflow}>Démarrer</button>
    </div>
  )
}

export default StartWorkflowForm
