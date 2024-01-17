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
import { FaFlag, FaCircle } from "react-icons/fa";

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
  const [statusFilter, setStatusFilter] = useState(null);

  const [priorityFilter, setPriorityFilter] = useState(null);
  const [initialTasks, setInitialTasks] = useState([]);
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
  const priorityNotify = () =>
  toast.success("Priority Changed Sucessfully!", {
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
  // console.log(UserToken);
  console.log("userid", userId);
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
    const fetchTasksForUser = async (req, res) => {
      try {
        //const userId = req.userId;
        const response = await axios.post(
          "https://cute-slip-eel.cyclic.app/api/user-task",
          {
            userId: userId,
          }
        );
        const formattedTasks = response.data.map((task) => ({
          ...task,
          dueDate: new Date(task.dueDate).toLocaleDateString("en-US"),
        }));
 
        setTasks(formattedTasks);
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
      await axios.put(`https://cute-slip-eel.cyclic.app/api/update-task-status`, {
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
          setTasks={setTasks} 
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
        <Select
  value={priorityFilter || ''}
  onChange={(e) => {
    setPriorityFilter(e.target.value);
    filterTasksByPriority(e.target.value);
  }}
  style={{ marginRight: "10px", background: "rgba(84, 111, 255, 1)", width: "200px", borderRadius: "10px", color:'white', border:'none', outline: 'none', marginBottom:'2rem' }} 
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
                      style={{
                        fontWeight: "600",
                        fontSize: "1rem",
                        border: "1px solid transparent",
                      }}
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
