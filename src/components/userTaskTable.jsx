import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { RiDeleteBin5Line } from "react-icons/ri";
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

const UserTaskTable = () => {
  const [tasks, setTasks] = useState([]);
  const [openModal, setOpenModal] = React.useState(false);
  const [detailModal, setDetailModal] = React.useState(false);
  const [selectedTask, setSelectedTask] = React.useState(null);

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
          "https://super-fish-pajamas.cyclic.app/api/user-task",
          {
            userId: userId,
          }
        );
        setTasks(response.data);

        console.log(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasksForUser();
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
              {tasks.map((task) => (
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
                    {task.priority}
                  </TableCell>
                  <TableCell
                    align="right"
                    style={{ fontWeight: "600", fontSize: "1rem" }}
                  >
                    {task.status}
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
