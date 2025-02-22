import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Tasks from "./pages/Tasks"
import Protected from "./components/Protected"
import TasksNew from "./pages/TasksNew"
import TasksEdit from "./pages/TasksEdit"

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/tasks" element={<Protected><Tasks/></Protected>} />
        <Route path="/tasks/new" element={<Protected><TasksNew/></Protected>} />
        <Route path="/tasks/edit/:id" element={<Protected><TasksEdit/></Protected>} />
      </Routes>
    </Router>
  )
}

export default App
