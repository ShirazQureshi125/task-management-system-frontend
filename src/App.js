import "./App.css";
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
  console.log({UserRole});
  const userRole = JSON.parse(UserRole)
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

  const adminRoute = [
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
  console.log(userRole === "admin")
  return (
    /*  <BrowserRouter>
      <Routes>
        {adminRoute.map((route) => {
          return <Route path={route.routeName} element={route.element} />;
        })}
      </Routes>
    </BrowserRouter> */
    <BrowserRouter>
      <Routes>
        {/* Public routes accessible to everyone */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<SignIn />} />

        {
        (userRole == "user" || userRole === "manager") &&
          userRoutes.map((route) => {
            console.log("userRoutes", userRole)   
            return (
              <Route
                key={route.routeName}
                path={route.routeName}
                element={route.element}
              />
            );
          })
          }

        {userRole == "admin" &&
          adminRoute.map((route) => {
            console.log("admin Routes", userRole) 
            return (
              <Route
                key={route.routeName}
                path={route.routeName}
                element={route.element}
              />
            );
          }
          )}

        {/* Redirect to the appropriate default route based on the role */}
        <Route
          path="/"
          element={
            <Navigate to={userRole === "admin" ? "/task-page" : "/user-task"} />
          }
        />
        {/* <Route path="/*" element={<Navigate to="/404" />} /> */}

      </Routes>
    </BrowserRouter>
  );
}

export default App;
