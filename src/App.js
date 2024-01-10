import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/Signin/Signin";
import SignUp from "./pages/Signup/Signup";
import TaskPage from "./pages/Task/Task";
import Dialog from "./components/Dialog"
import Status from './components/Status'
import Modal from "./components/Modal";
import CreateTask from "./pages/createTask/createTask";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/task-page" element={<TaskPage/>} />
        <Route path="/dialog" element={<Dialog/>} />
        <Route path="/status" element={<Status/>} />
        <Route path="/modal" element={<Modal/>} />
        <Route path="/create-task" element={<CreateTask/>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
