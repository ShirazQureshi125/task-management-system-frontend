import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import { Button, Select, MenuItem } from "@mui/material";
import { RiDeleteBin5Line } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "../../src/App.css";
import { RevolvingDot } from "react-loader-spinner";
import { FaFlag, FaCircle } from "react-icons/fa";

import Dialog from "./Dialog";
import SimpleModal from "./Modal";
import axios from "axios";

function createData(Name, dueDate, Assignee, Priority, Status, Action) {
  const parsedDueDate = new Date(dueDate);

  // Format the date in the desired format (e.g., "MM/DD/YYYY")
  const formattedDueDate = `${
    parsedDueDate.getMonth() + 1
  }/${parsedDueDate.getDate()}/${parsedDueDate.getFullYear()}`;
  return {
    Name,
    dueDate: formattedDueDate,
    Assignee,
    Priority,
    Status,
    Action,
  };
}

/* const tasks = [
  createData(
    "Create mobile app",
    "1-02-2024",
    "Saud Sheikh",
    <Dialog />,
    "pending",
    <RiDeleteBin5Line color="red" size={30} />
  ),
  createData(
    "Create mobile app",
    "1-02-2024",
    "Saud Sheikh",
    <Dialog />,
    "completed",
    <RiDeleteBin5Line color="red" size={30} />
  ),
  createData(
    "Create mobile app",
    "1-02-2024",
    "Saud Sheikh",
    <Dialog />,
    "completed",
    <RiDeleteBin5Line color="red" size={30} />
  ),
  createData(
    "Create mobile app",
    "1-02-2024",
    "Saud Sheikh",
    <Dialog />,
    "progress",
    <RiDeleteBin5Line color="red" size={30} />
  ),
  createData(
    "Create mobile app",
    "1-02-2024",
    "Saud Sheikh",
    <Dialog />,
    "progress",
    <RiDeleteBin5Line color="red" size={30} />
  ),
]; */

const TaskTable = () => {
  const [tasks, setTasks] = useState(null);
  const [openModal, setOpenModal] = React.useState(false);
  const [detailModal, setDetailModal] = React.useState(false);
  const [selectedTask, setSelectedTask] = React.useState(null);
  const [priorityFilter, setPriorityFilter] = useState(null);
  const [initialTasks, setInitialTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const filterTasksByPriority = (priority) => {
    if (priority === null) {
      console.log(priority);
      setTasks(initialTasks);
    } else {
      // Filter tasks based on the selected priority
      const filteredTasks = initialTasks.filter(
        (task) => task.priority === priority
      );
      setTasks(filteredTasks);
    }
  };
  const filterTasksByStatus = (status) => {
    if (status === null) {
      // Reset filter, show all tasks
      setTasks(initialTasks);
    } else {
      // Filter tasks based on the selected status
      const filteredTasks = initialTasks.filter((task) => task.status === status);
      setTasks(filteredTasks);
    }
  }
  const notify = () =>
    toast.success("Task Delete Sucessfully!", {
      position: "top-center",
      autoClose: 4000,
      theme: "dark",
    });
  const statusNotify = () =>
    toast.success("Status Chnaged Sucessfully!", {
      position: "top-center",
      autoClose: 4000,
      theme: "dark",
    });
  const priorityNotify = () =>
    toast.success("Priority Changed Sucessfully!", {
      position: "top-center",
      autoClose: 4000,
      theme: "dark",
    });
  const notifyError = () =>
    toast.error("Task Delete Failed!", {
      position: "top-center",
      autoClose: 4000,
      theme: "dark",
    });
  const statusErrorNotify = () =>
    toast.error("Status Update Failed!", {
      position: "top-center",
      autoClose: 4000,
      theme: "dark",
    });
  const priorityErrorNotify = () =>
    toast.error("Priority Update Failed!", {
      position: "top-center",
      autoClose: 4000,
      theme: "dark",
    });
  const handleTaskClick = (task) => {
    setDetailModal(true);
    setSelectedTask(task);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleCloseModal2 = () => {
    setDetailModal(false);
  };
  const userID = localStorage.getItem("userData");
  const userId = JSON.parse(userID);
  const UserToken = localStorage.getItem("userToken");
  // console.log(UserToken);
  //console.log("user id", userId);
  const handleDeleteTask = async (taskId) => {
    try {
      // Send a request to your backend API to delete the task
      await axios.delete(
        `https://cute-slip-eel.cyclic.app/api/delete-task`,
        {
          data: { id: taskId, userId: userId }, // Provide necessary data for the backend API
        }
      );
      setDeleteLoading(true);
      // Update the tasks list after deletion
      const updatedTasks = tasks.filter((task) => task.id !== taskId);
      setTasks(updatedTasks);

      notify();
      console.log("Task deleted successfully");
    } catch (error) {
      console.error("Error deleting task:", error);
      notifyError();
    } finally {
      setTimeout(() => {
        setDeleteLoading(false);
      }, 500);
    }
  };
  const handleStatusChange = async (taskId, newStatus) => {
    try {
      // Send a request to your backend API to update the task status
      await axios.put(
        `https://cute-slip-eel.cyclic.app/api/update-task-status`,
        {
          id: taskId,
          status: newStatus,
        }
      );

      // // Update the tasks list after status change
      // const updatedTasks = tasks.map((task) =>
      //   task.id === taskId ? { ...task, status: newStatus } : task
      // );
      // setTasks(updatedTasks);
      const updatedTasks = tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      );
      setTasks(updatedTasks);
      statusNotify();
    } catch (error) {
      statusErrorNotify();
    }
  };

  const handlePriorityChange = async (taskId, newPriority) => {
    try {
      await axios.put(
        `https://cute-slip-eel.cyclic.app/api/update-task-priority`,
        {
          id: taskId,
          priority: newPriority,
        }
      );

      // Update the tasks list after priority change
      const updatedTasks = tasks.map((task) =>
        task.id === taskId ? { ...task, priority: newPriority } : task
      );
      setTasks(updatedTasks);
      priorityNotify();
    } catch (error) {
      priorityErrorNotify();
    }
  };
  
  useEffect(() => {
    const fetchTasksForAdmin = async () => {
      try {
        const response = await axios.post(
          `https://cute-slip-eel.cyclic.app/api/alltask`,
          {
            userId: userId,
          }
        );

        // Map the tasks with formatted due date and priority as a numeric value
        const mappedTasks = response.data.map((task) => {
          const parsedDueDate = new Date(task.dueDate);
          const formattedDueDate = `${
            parsedDueDate.getMonth() + 1
          }/${parsedDueDate.getDate()}/${parsedDueDate.getFullYear()}`;

          return {
            ...task,
            statusFilter: task.status,
            dueDate: formattedDueDate,
            priorityValue:
              task.priority === "high"
                ? 0
                : task.priority === "normal"
                ? 1
                : 2,
          };
        });

        // Sort tasks based on priority (High -> Normal -> Low)
        const sortedTasks = mappedTasks.sort(
          (a, b) => a.priorityValue - b.priorityValue
        );

        setInitialTasks(sortedTasks);
        setTasks(sortedTasks);
        setLoading(false);
        console.log(sortedTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasksForAdmin();
  }, [userId]);


  console.log(tasks);

  return (
    <div
      className="super_container"
      style={{
        maxWidth: "1620px",
        marginLeft: "18rem",
        marginTop: "6rem ",
        height: "86vh",
        background: "rgba(245, 245, 247, 1)",
        border: "2px solid rgba(245, 245, 247, 1)",
      }}
    >
      {detailModal && (
        <SimpleModal
          open={detailModal}
          onClose={handleCloseModal2}
          value={selectedTask}
          setTasks={setTasks}
        />
      )}
      <div
        className="main_container"
        style={{
          maxWidth: "1500px",
          marginLeft: "2rem",
          marginTop: "4rem",
          background: "rgba(245, 245, 247, 1)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            marginBottom: "20px",
          }}
        >
    <Select
  value={priorityFilter || ''}
  onChange={(e) => {
    setPriorityFilter(e.target.value);
    filterTasksByPriority(e.target.value);
  }}
  style={{ marginRight: "10px", background: "rgba(84, 111, 255, 1)", width: "200px", borderRadius: "10px", color:'white', border:'none', outline: 'none' }} 
  displayEmpty
  inputProps={{ 'aria-label': 'Without label' }}
>
  <MenuItem value="" disabled>
    Select Priority
  </MenuItem>
  <MenuItem value={null}>All Priorities</MenuItem>
  <MenuItem value="high">
    <FaFlag color="#F25353" size={18} style={{ marginRight: "8px" }} />
    High
  </MenuItem>
  <MenuItem value="normal">
    <FaFlag color="#75D653" size={18} style={{ marginRight: "8px" }} />
    Normal
  </MenuItem>
  <MenuItem value="low">
    <FaFlag color="#FFB72A" size={18} style={{ marginRight: "8px" }} />
    Low
  </MenuItem>
</Select>

<Select
  value={statusFilter || ''}
  onChange={(e) => {
    setStatusFilter(e.target.value);
    filterTasksByStatus(e.target.value);
  }}
  style={{ marginRight: "10px", background: "rgba(84, 111, 255, 1)", width: "200px", borderRadius: "10px", color:'white', border:'none', outline:'none' }}
  displayEmpty
  inputProps={{ 'aria-label': 'Without label' }}
>
  <MenuItem value="" disabled>
    Select Status
  </MenuItem>
  <MenuItem value={null}>All Status</MenuItem>
  <MenuItem value="pending">
    <FaCircle color="#FFB72B" size={18} style={{ marginRight: "8px" }} />
    Pending
  </MenuItem>
  <MenuItem value="progress">
    <FaCircle color="#75D653" size={18} style={{ marginRight: "8px" }} />
    Active
  </MenuItem>
  <MenuItem value="complete">
    <FaCircle color="#F25353" size={18} style={{ marginRight: "8px" }} />
    Closed
  </MenuItem>
</Select>

          <Link
            to="/create-task"
            style={{
              textDecoration: "none",
              color: "#fff",
              background: "rgba(84, 111, 255, 1)",
              width: "210px",
              height: "60px",
              borderRadius: "10px",
              display: "flex",
              justifyContent: "center",
              marginLeft:'34rem'
            }}
          >
            <Button color="inherit">Create Task</Button>
          </Link>
        </div>

        <TableContainer
          component={Paper}
          style={{
            border: "1px solid rgba(0, 0, 0, 0.2)",
            maxHeight: "450px",
              maxWidth: "97%",
              borderRadius: "10px",
            overflowY: "auto",
          }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
            <TableRow style={{ position: "sticky", top: 0, background: "white", zIndex: 1 }}>
                <TableCell>Name</TableCell>
                <TableCell align="right">Due Date</TableCell>
                <TableCell align="right">Assignee</TableCell>
                <TableCell align="center">priority</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {deleteLoading ? (
                <>
                  <TableCell style={{ display: "flex" }}></TableCell>

                  <TableCell></TableCell>
                  <TableCell>
                    <RevolvingDot
                      isLoading={true}
                      color="#546fff"
                      ariaLabel="revolving-dot-loading"
                      wrapperStyle={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                      }}
                      wrapperClass="revolingDotIcon"
                    />
                  </TableCell>

                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </>
              ) : loading ? (
                // Show skeleton while loading
                Array.from({ length: 5 }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Skeleton width={100} />
                    </TableCell>
                    <TableCell>
                      <Skeleton width={80} />
                    </TableCell>
                    <TableCell>
                      <Skeleton width={80} />
                    </TableCell>
                    <TableCell>
                      <Skeleton width={80} />
                    </TableCell>
                    <TableCell>
                      <Skeleton width={80} />
                    </TableCell>
                    <TableCell>
                      <Skeleton width={40} />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                tasks.map((task) => (
                  <TableRow
                    key={task.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      style={{
                        fontWeight: "600",
                        fontSize: "1rem",
                        color: "rgba(84, 111, 255, 1)",
                        cursor: "pointer",
                      }}
                      onClick={() => handleTaskClick(task)}
                    >
                      {task.title}
                    </TableCell>

                    <TableCell
                      align="right"
                      style={{ fontWeight: "600", fontSize: "1rem" }}
                    >
                      {task.dueDate}
                    </TableCell>
                    <TableCell
                      align="right"
                      style={{ fontWeight: "600", fontSize: "1rem" }}
                    >
                      {task.assignee ? task.assignee.username : "N/A"}
                    </TableCell>
                    <TableCell
                      align="right"
                      style={{ fontWeight: "600", fontSize: "1rem" }}
                    >
                      <Select
                        value={task && task.priority}
                        onChange={(e) => handlePriorityChange(task.id, e.target.value)}
                        variant="outlined"
                        style={{
                          minWidth: "120px",
                          height: "40px",
                          border: "none",
                          outline: "none",
                        }}
                      >
                        <MenuItem value="high">
                          <FaFlag
                            color="#F25353"
                            size={20}
                            style={{ marginRight: "8px" }}
                          />
                          High
                        </MenuItem>
                        <MenuItem value="normal">
                          <FaFlag
                            color="#75D653"
                            size={20}
                            style={{ marginRight: "8px" }}
                          />
                          Normal
                        </MenuItem>
                        <MenuItem value="low">
                          <FaFlag
                            color="#FFB72A"
                            size={20}
                            style={{ marginRight: "8px" }}
                          />
                          Low
                        </MenuItem>
                      </Select>
                    </TableCell>

                    <TableCell
                      align="right"
                      style={{ fontWeight: "600", fontSize: "1rem" }}
                    >
                      <Select
                        value={task && task.status}
                        onChange={(e) =>
                          handleStatusChange(task.id, e.target.value)
                        }
                        style={{
                          width: "120px",
                          border: "none",
                          outline: "none",
                          height: "40px",
                          color: "white",
                          fontWeight: "700",
                          width: "150px",
                          backgroundColor:
                            task.status === "pending"
                              ? "#FFB72B"
                              : task.status === "progress"
                              ? "#75D653"
                              : task.status === "complete"
                              ? "#F25353"
                              : "transparent",
                          borderRadius: "10px",
                        }}
                      >
                        <MenuItem value="pending">
                          <FaCircle
                            color="#FFB72B"
                            size={12}
                            style={{ marginRight: "8px" }}
                          />
                          Pending
                        </MenuItem>
                        <MenuItem value="progress">
                          <FaCircle
                            color="#75D653"
                            size={12}
                            style={{ marginRight: "8px" }}
                          />
                          Active
                        </MenuItem>
                        <MenuItem value="complete">
                          <FaCircle
                            color="#F25353"
                            size={12}
                            style={{ marginRight: "8px" }}
                          />
                          Closed
                        </MenuItem>
                      </Select>
                    </TableCell>
                    <TableCell
                      align="right"
                      style={{ fontWeight: "600", fontSize: "1rem" }}
                    >
                      <RiDeleteBin5Line
                        color="red"
                        size={30}
                        onClick={() => handleDeleteTask(task.id)}
                        className="delete-icon"
                      />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default TaskTable;
