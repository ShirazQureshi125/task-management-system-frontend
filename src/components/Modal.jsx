import React , {useState, useEffect} from "react";
import { Button, Modal } from "react-bootstrap";
import { IoClose } from "react-icons/io5";
import { Select, MenuItem } from "@mui/material";
import { FaFlag } from "react-icons/fa";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const SimpleModal = ({ open, onClose, value }) => {
  const [tasks, setTasks] = useState([]);
  const userID = localStorage.getItem("userData");
  const userId = JSON.parse(userID);
  const notify = () =>
  toast.success("Status Updated Sucessfully!", {
    position: "top-center",
    autoClose: 4000,
    theme: "dark",
  });
const notifyError = () =>
  toast.error("Status Update Failed!", {
    position: "top-center",
    autoClose: 4000,
    theme: "dark",
  });
  const fetchTasksForUser = async () => {
    try {
      const response = await axios.post(
        "https://super-fish-pajamas.cyclic.app/api/user-task",
        { userId: userId }
      );
      setTasks(response.data);
 
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };
  useEffect(() => {
    fetchTasksForUser();
  }, [userId]);

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
      
     notify()
    } catch (error) {
    notifyError()
    }
  };

  return (
    <Modal
      show={open}
      onHide={onClose}
      dialogClassName="custom-modal"
      centered
      style={{ marginTop: "2rem" }}
    >
      <div
        className="modal-content"
        style={{
          width: "64vw",
          maxWidth: "100rem",
          maxHeight: "100%",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <Modal.Header closeButton style={{ display: "flex" }}>
          <Modal.Title style={{ fontSize: "24px", flex: "1" }}>
            Task Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="task-modal">
          <h2
            style={{
              color: "#546FFF",
              lineHeight: "150%",
              letterSpacing: "-0.48px",
            }}
          >
            {value.Name}
          </h2>
          <div
            className="modal-p"
            style={{ display: "flex", flexWrap: "wrap" }}
          >
            <p style={{ marginLeft: "2rem", flex: "1" }}>
              <span>
                Due Date:<br></br>
              </span>{" "}
              {value.dueDate}
            </p>
            <p style={{ marginLeft: "2rem", flex: "1" }}>
              <span>
                Assignee:<br></br>
              </span>{" "}
              {value.assignee ? value.assignee.username : "N/A"}
            </p>
            <p style={{ marginLeft: "2rem", flex: "1" }}>
              <span>
                Priority:<br></br>
              </span>{" "}
              {value.priority ? (
                <FaFlag
                  color={
                    value.priority === "high"
                      ? "#F25353"
                      : value.priority === "normal"
                      ? "#75D653"
                      : "#FFB72A"
                  }
                  size={20}
                />
              ) : (
                <FaFlag color="green" size={20} />
              )}
              {value.priority || "Medium"}
            </p>
            <p style={{ marginLeft: "2rem", flex: "1" }}>
              <span>
             Status{" "}
                <br></br>
              </span>{" "}
              <Select
                  value={value && value.status}
                  onChange={(e) => handleStatusChange(value.id, e.target.value)}
                  style={{
                    width: "120px",
                    border: "none",
                    outline: "none",
                    height: "40px",
                    fontWeight: "700",
                    width: "150px",
                    backgroundColor:
                     value && value.status === "pending"
                        ? "#FFB72B"
                        : value && value.status === "progress"
                        ? "#75D653"
                        :value && value.status === "complete"
                        ? "#F25353"
                        : "transparent",
                    borderRadius: "10px",
                    color:value && value.status === "complete" ? "#fff" : "#000", // Set text color
                  }}
                >
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="progress">Active</MenuItem>
                  <MenuItem value="complete">Closed</MenuItem>
                </Select>
            </p>
            <p style={{ marginLeft: "2rem", flex: "1" }}>
              <span>
                Assigned By: <br></br>
              </span>{" "}
              {value.assignee.username}
            </p>
          </div>
          <div
            className="modal-discription"
            style={{
              border: "2px solid rgba(101, 111, 125, 0.2)",
              width: "100%",
              maxWidth: "922px",
              height: "244px",
              borderRadius: "10px",
              marginLeft: "1rem",
              height: "100%",
            }}
          >
            <div className="disc_content">
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: "500",
                  marginTop: "1rem",
                  margin: "1rem",
                }}
              >
                <span
                  style={{
                    fontWeight: "600",
                    fontSize: "15px",
                    color: "#3b71ca",
                  }}
                >
                  {value.description}
                </span>{" "}
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
                praesentium rem iste, nam fuga vel nemo minus voluptate
                repellendus vitae, quis voluptatibus nobis voluptatem tempore
                itaque non! Corrupti, nulla optio. Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Ipsa voluptates totam dolore
                aspernatur nemo? Temporibus odit, vero deleniti sit corporis
                quisquam voluptatum! Laborum aliquam odit nihil repellat esse
                quidem suscipit! Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Fuga consequatur veritatis magnam possimus
                blanditiis fugiat voluptatem. Sequi mollitia, reiciendis fuga
                accusantium, iure cumque velit, aliquam quaerat nobis voluptate
                dolorum error?
              </p>
            </div>
          </div>
        </Modal.Body>
      </div>
    </Modal>
  );
};

export default SimpleModal;
