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
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { ToastContainer, toast } from "react-toastify";

import Dialog from "./Dialog";
import SimpleModal from "./Modal";
import { FaFlag } from "react-icons/fa";

import axios from "axios";
function createData(Name, dueDate, Assignee, Priority, Status, Action) {
  return { Name, dueDate, Assignee, Priority, Status, Action };
}

const UserTaskTable = () => {
  const [tasks, setTasks] = useState([]);
  const [openModal, setOpenModal] = React.useState(false);
  const [detailModal, setDetailModal] = React.useState(false);
  const [selectedTask, setSelectedTask] = React.useState(null);
  const [loading, setLoading] = useState(true);
  const notify = () =>
  toast.success("Status Updated Successfully!", {
    position: "top-center",
    autoClose: 4000,
    theme: "dark",
  });
const notifyError = () =>
  toast.error("Status Updated Failed!", {
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
  // console.log(UserToken);
  console.log("userid", userId);

  useEffect(() => {
    const fetchTasksForUser = async (req, res) => {
      try {
        //const userId = req.userId;
        const response = await axios.post(
          "https://itchy-puce-perch.cyclic.app/api/user-task",
          {
            userId: userId,
          }
        );
        setTasks(response.data);
        setLoading(false);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasksForUser();
  }, [userId]);
  console.log(tasks);
  const handleStatusChange = async (taskId, newStatus) => {
    try {
      // Send a request to your backend API to update the task status
      await axios.put(`https://itchy-puce-perch.cyclic.app/api/update-task-status`, {
        id: taskId,
        status: newStatus,
      });

      // Update the tasks list after status change
      const updatedTasks = tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      );
      setTasks(updatedTasks);
     /*  console.log("Task status updated successfully");
      console.log("Updated Status:", newStatus); */
      notify()
    } catch (error) {
      console.error("Error updating task status:", error);
      notifyError()
    }
  };

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
        <TableContainer
          component={Paper}
          style={{
            border: "1px solid rgba(0, 0, 0, 0.2)",
            maxHeight: "450px",
            // width: "1150px",
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
              </TableRow>
            </TableHead>
            <TableBody>
              {loading
                ? // Show skeleton while loading
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
                    </TableRow>
                  ))
                : tasks.map((task) => (
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
                            color: task.status === "complete" ? "#fff" : "#000", // Set text color
                          }}
                        >
                          <MenuItem value="pending">Pending</MenuItem>
                          <MenuItem value="progress">Active</MenuItem>
                          <MenuItem value="complete">Closed</MenuItem>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default UserTaskTable;
