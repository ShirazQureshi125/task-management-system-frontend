import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { IoClose } from "react-icons/io5";
import { Select, MenuItem } from "@mui/material";
import { FaFlag, FaCircle } from "react-icons/fa";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { RevolvingDot } from "react-loader-spinner";

import '../App.css';
const SimpleModal = ({ open, onClose, value, setTasks }) => {
  const [initialTasks, setInitialTasks] = useState([]);
  const [status, setStatus] = useState(value.status);
  const [priority, setPriority] = useState(value.priority);
  const [editingDescription, setEditingDescription] = useState(false);
  const [editedDescription, setEditedDescription] = useState(value.description);
  const [loading, setLoading] = useState(false);

  const userID = localStorage.getItem("userData");
  const userId = JSON.parse(userID);

  const notify = () =>
    toast.success("Status Updated Sucessfully!", {
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
  // const fetchTasksForUser = async () => {
  //   try {
  //     const response = await axios.post(
  //       "https://cute-slip-eel.cyclic.app/api/user-task",
  //       { userId: userId }
  //     );
  //     const initialTasksWithDefaultStatus = response.data.map((task) => {
  //       return {
  //         ...task,
  //         statusFilter: task.status,
  //       };
  //     });
  //     setInitialTasks(initialTasksWithDefaultStatus);
  //     setTasks(initialTasksWithDefaultStatus);

  //     console.log(response.data);
  //   } catch (error) {
  //     console.error("Error fetching tasks:", error);
  //   }
  // };
  // useEffect(() => {
  //   fetchTasksForUser();
  // }, [userId]);

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

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, status: newStatus } : task
        )
      );
      setStatus(newStatus);
      notify();
    } catch (error) {
      notifyError();
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

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, priority: newPriority } : task
        )
      );
      setPriority(newPriority);
      priorityNotify();
    } catch (error) {
      priorityErrorNotify();
    }
  };

  const handleEditDescription = () => {
    setEditingDescription(true);
  };

  const handleSaveDescription = async () => {
    try {
      // Send a request to your backend API to update the task description
      await axios.put(
        `https://cute-slip-eel.cyclic.app/api/update-task-description`,
        {
          id: value.id,
          description: editedDescription,
        }
      );
        setLoading(true);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === value.id
            ? { ...task, description: editedDescription }
            : task
        )
      );

      // Disable editing mode and notify
      setEditingDescription(false);
      toast.success("Description Updated Successfully!", {
        position: "top-center",
        autoClose: 4000,
        theme: "dark",
      });
    } catch (error) {
      toast.error("Description Update Failed!", {
        position: "top-center",
        autoClose: 4000,
        theme: "dark",
      });
    }finally{
      setLoading(false);
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
          marginLeft: "-7rem",
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
              <Select
                value={priority}
                onChange={(e) => handlePriorityChange(value.id, e.target.value)}
                style={{
                  minWidth: "120px",
                  height: "40px",
                  border: "none",
                  outline: "none",
                }}
              >
                <MenuItem value="high">
                  <FaFlag color="#F25353" size={20} />
                  High
                </MenuItem>
                <MenuItem value="normal">
                  <FaFlag color="#75D653" size={20} />
                  Normal
                </MenuItem>
                <MenuItem value="low">
                  <FaFlag color="#FFB72A" size={20} />
                  Low
                </MenuItem>
              </Select>
            </p>
            <p style={{ marginLeft: "2rem", flex: "1" }}>
              <span>
                Status <br></br>
              </span>{" "}
              <Select
                value={status}
                onChange={(e) => handleStatusChange(value.id, e.target.value)}
                style={{
                  width: "120px",
                  border: "none",
                  outline: "none",
                  height: "40px",
                  fontWeight: "700",
                  width: "150px",
                  backgroundColor:
                    status === "pending"
                      ? "#FFB72B"
                      : status === "progress"
                      ? "#75D653"
                      : status === "complete"
                      ? "#F25353"
                      : "transparent",
                  borderRadius: "10px",
                  color: status === "complete" ? "#fff" : "#000", // Set text color
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
            </p>
            <p style={{ marginLeft: "2rem", flex: "1" }}>
              <span>
                Assigned By: <br></br>
              </span>{" "}
             Admin
            </p>
          </div>
        
          <div
        className="modal-discription"
        style={{
          border: "2px solid rgba(101, 111, 125, 0.2)",
          width: "100%",
          maxWidth: "922px",
          height: "auto",
          borderRadius: "10px",
          marginLeft: "1rem",
        }}
      >
        {editingDescription ? (
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            style={{
              width: "100%",
              height: "200px",
              padding: "1rem",
              border: "none",
              borderRadius: "10px",
            }}
          />
        ) : (
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
                {editedDescription}
              </span>{" "}
              {/* Display the edited description */}
            </p>
          </div>
        )}
      </div>

      <div style={{ marginTop: "1rem" }}>
        {editingDescription ? (
          // Show save button when in editing mode
          <Button className="save_button" onClick={handleSaveDescription}  style={{ marginLeft: "2rem", background: "#546fff " }}>
            Save Description
          </Button>
        ) : (
          // Show edit button when not in editing mode
          <Button
            style={{ marginLeft: "2rem", background: "#546fff " }}
            onClick={handleEditDescription}
            className="save_button"
          >
            Edit Description
          </Button>
        )}
        
      </div>
   
        </Modal.Body>
      </div>
    </Modal>
  );
};

export default SimpleModal;
