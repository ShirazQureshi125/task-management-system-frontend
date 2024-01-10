import * as React from "react";
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

function createData(Name, dueDate, Assignee, Priority, Status, Action) {
  return { Name, dueDate, Assignee, Priority, Status, Action };
}

const tasks = [
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
];

const TaskTable = () => {
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
          style={{ border: "1px solid rgba(0, 0, 0, 0.2)" }}
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
              {tasks.map((task) => (
                <TableRow
                  key={task.Name}
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
                    {task.Name}
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
                    {task.Assignee}
                  </TableCell>
                  <TableCell
                    align="right"
                    style={{ fontWeight: "600", fontSize: "1rem" }}
                  >
                    {task.Priority}
                  </TableCell>
                  <TableCell
                    align="right"
                    style={{ fontWeight: "600", fontSize: "1rem" }}
                  >
                    {task.Status}
                  </TableCell>
                  <TableCell
                    align="right"
                    style={{ fontWeight: "600", fontSize: "1rem" }}
                  >
                    {task.Action}
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

export default TaskTable;
