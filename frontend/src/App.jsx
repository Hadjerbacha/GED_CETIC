import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import WorkflowPage from './pages/WorkflowPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/workflow" element={<WorkflowPage />} />
        {/* Ajoute d'autres routes ici */}
      </Routes>
    </Router>
  )
}

export default App


