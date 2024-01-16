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
import { FaFlag } from "react-icons/fa";

import Dialog from "./Dialog";
import SimpleModal from "./Modal";
import axios from "axios";
function createData(Name, dueDate, Assignee, Priority, Status, Action) {
  return { Name, dueDate, Assignee, Priority, Status, Action };
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
  const [tasks, setTasks] = useState([]);
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
      setTasks(initialTasks);
    } else {
      // Filter tasks based on the selected priority
      const filteredTasks = initialTasks.filter(
        (task) => task.priority === priority
      );
      setTasks(filteredTasks);
    }
  };
  const notify = () =>
    toast.success("Task Delete Sucessfully!", {
      position: "top-center",
      autoClose: 4000,
      theme: "dark",
    });
  const statusNotify = () =>
    toast.success("Task Delete Sucessfully!", {
      position: "top-center",
      autoClose: 4000,
      theme: "dark",
    });
  const notifyError = () =>
    toast.error("Status Updated Successfully!", {
      position: "top-center",
      autoClose: 4000,
      theme: "dark",
    });
  const statusErrorNotidy = () =>
    toast.error("Status Update Failed!", {
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
        `https://itchy-puce-perch.cyclic.app/api/delete-task`,
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
        `https://itchy-puce-perch.cyclic.app/api/update-task-status`,
        {
          id: taskId,
          status: newStatus,
        }
      );

      // Update the tasks list after status change
      const updatedTasks = tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      );
      setTasks(updatedTasks);
      statusNotify()
    } catch (error) {
     statusErrorNotidy()
    }
  };

  useEffect(() => {
    const fetchTasksForAdmin = async () => {
      try {
        const response = await axios.post(
          `https://itchy-puce-perch.cyclic.app/api/alltask`,
          {
            userId: userId,
          }
        );
        // Set the initial tasks and status filter
        const initialTasksWithDefaultStatus = response.data.map((task) => {
          return {
            ...task,
            statusFilter: task.status,
          };
        });

        setInitialTasks(initialTasksWithDefaultStatus);
        setTasks(initialTasksWithDefaultStatus);
        setLoading(false);
        console.log(response);
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
        height: "88vh",
        background: "rgba(245, 245, 247, 1)",
        border: "2px solid rgba(245, 245, 247, 1)",
      }}
    >
      {detailModal && (
        <SimpleModal
          open={detailModal}
          onClose={handleCloseModal2}
          value={selectedTask}
        />
      )}
      <div
        className="main_container"
        style={{
          maxWidth: "1500px",
          marginLeft: "2rem",
          marginTop: "5rem",
          background: "rgba(245, 245, 247, 1)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "20px",
          }}
        >
          <Select
            value={priorityFilter}
            onChange={(e) => {
              setPriorityFilter(e.target.value);
              filterTasksByPriority(e.target.value);
            }}
            style={{
              marginRight: "10px",
              background: "rgba(84, 111, 255, 1)",
              width: "100px",
              borderRadius: "10px",
            }}
          >
            <MenuItem value={null}>All Priorities</MenuItem>
            <MenuItem value="high">High</MenuItem>
            <MenuItem value="normal">Normal</MenuItem>
            <MenuItem value="low">Low</MenuItem>
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
            //  maxWidth: "100%",
            overflowY: "auto",
          }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Due Date</TableCell>
                <TableCell align="right">Assignee</TableCell>
                <TableCell align="right">priority</TableCell>
                <TableCell align="right">Status</TableCell>
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
                        textDecoration: "underline",
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
                      {task.priority ? (
                        <FaFlag
                          color={
                            task.priority === "high"
                              ? "#F25353"
                              : task.priority === "normal"
                              ? "#75D653"
                              : "#FFB72A"
                          }
                          size={20}
                        />
                      ) : (
                        <FaFlag color="green" size={20} />
                      )}
                      {task.priority || "Medium"}
                    </TableCell>
                    <TableCell
                      align="right"
                      style={{ fontWeight: "600", fontSize: "1rem" }}
                    >
                      <Select
                        value={task.status}
                        onChange={(e) =>
                          handleStatusChange(task.id, e.target.value)
                        }
                        style={{
                          width: "120px",
                          border: "none",
                          outline: "none",
                          height: "40px",
                          color: "white",
                          fontWeight:'700',
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
                        <MenuItem value="pending">Pending</MenuItem>
                        <MenuItem value="progress">Active</MenuItem>
                        <MenuItem value="complete">Closed</MenuItem>
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
