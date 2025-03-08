import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Tasks from "./pages/Tasks/Tasks"
import Protected from "./components/Protected"
import TasksNew from "./pages/Tasks/TasksNew"
import TasksEdit from "./pages/Tasks/TasksEdit"
import NotFound from "./pages/NotFound"
import Navbar from "./components/Navbar"
import Maps from "./pages/Maps/Maps"

function App() {

  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/login" element={<Login/>} />
          {/* Tareas */}
        <Route path="/tasks" element={<Protected><Tasks/></Protected>} />
        <Route path="/tasks/new" element={<Protected><TasksNew/></Protected>} />
        <Route path="/tasks/edit/:id" element={<Protected><TasksEdit/></Protected>} />
          {/* Maps */}
        <Route path="/maps" element={<Protected><Maps/></Protected>} />
          {/* 404 */}
        <Route path="/*" element={<Protected><NotFound/></Protected>} />
      </Routes>
    </Router>
  )
}

export default App
