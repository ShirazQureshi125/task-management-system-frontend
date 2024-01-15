import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./pages/Signin/Signin";
import SignUp from "./pages/Signup/Signup";
import TaskPage from "./pages/Task/Task";
import Dialog from "./components/Dialog";
import Status from "./components/Status";
import Modal from "./components/Modal";
import CreateTask from "./pages/createTask/createTask";
import UserTask from "./pages/userTaskPage/userTask";
import NotFound from "./pages/404Page/notFound";

function App() {
  const UserRole = localStorage.getItem("userRole");
  const userRole = JSON.parse(UserRole);
  

  const userRoutes = [
    {
      routeName: "/user-task",
      element: <UserTask />,
    },
    {
      routeName: "/dialog",
      element: <Dialog />,
    },
    {
      routeName: "/status",
      element: <Status />,
    },
    {
      routeName: "/modal",
      element: <Modal />,
    },
    {
      routeName: "/404",
      element: <NotFound />,
    },
  ];

  const adminRoutes = [
    {
      routeName: "/create-task",
      element: <CreateTask />,
    },
    {
      routeName: "/task-page",
      element: <TaskPage />,
    },
    {
      routeName: "/404",
      element: <NotFound />,
    },
  ];

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes accessible to everyone */}
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/"
          element={
            <SignIn />
          }
        />

        {userRole === "user" && userRoutes.map((route) => (
          <Route
            key={route.routeName}
            path={route.routeName}
            element={route.element}
          />
        ))}

        {userRole === "admin" && adminRoutes.map((route) => (
          <Route
            key={route.routeName}
            path={route.routeName}
            element={route.element}
          />
        ))}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;