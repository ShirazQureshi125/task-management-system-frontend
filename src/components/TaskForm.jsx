import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Grid,
  Paper,
  TextField,
  Button,
  MenuItem,
  Typography,
} from "@mui/material";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { RevolvingDot } from "react-loader-spinner";
const priorities = ["High", "Medium", "Low"];
const statuses = ["Pending", "Progress", "Complete"];
const Assignees = ["Saeed", "Ahmed", "Javeeda"];
const UserToken = localStorage.getItem("userToken");
const userToken = JSON.parse(UserToken);
const userID = localStorage.getItem("userData");
const userId = JSON.parse(userID);

console.log(userId);
console.log(userToken);
const TaskForm = () => {
  const navigate = useNavigate();
  const notify = () =>
    toast.success("Task Created Sucessfully!", {
      position: "top-center",
      autoClose: 4000,
      theme: "dark",
    });
  const notifyError = () =>
    toast.error("Task Creation Failed!", {
      position: "top-center",
      autoClose: 4000,
      theme: "dark",
    });
  const notifyWarn = () =>
    toast.warn("Something Went Wrong!", {
      position: "top-center",
      autoClose: 4000,
      theme: "dark",
    });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [assignees, setAssignees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [taskLoading, setTaskLoading] = useState(false);
  useEffect(() => {
    const fetchAssignees = async () => {
      try {
        const response = await axios.post(
          "https://itchy-puce-perch.cyclic.app/api/getalluser",
          {
            userId: userId,
          }
        );
        setAssignees(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching assignees:", error);
        setLoading(false);
      }
    };

    fetchAssignees();
  }, [userId]);

  const onSubmit = async (data) => {
    const selectedAssignee = assignees.find(
      (assignee) => assignee.id === data.assignee
    );
    console.log(selectedAssignee);
    try {
      console.log(data);
      setTaskLoading(true);
      const response = await axios.post(
        "https://itchy-puce-perch.cyclic.app/api/create-task",

        {
          title: data.title,
          description: data.description,
          userId: userId,
          assigneeId: selectedAssignee.id,
          dueDate: data.dueDate,
          status:data.status,
          priority: data.priority,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      if (response.status === 200) {
        notify();
        navigate("/task-page");
      }
      console.log(response.data);
    } catch (error) {
      console.error(error);
      notifyError();
    } finally {
      setTaskLoading(false);
    }
  };
  return (
    <div
      className="super_container"
      style={{
        maxWidth: "1220px",
        marginLeft: "22rem",
        marginTop: "6rem",
        height: "90vh",
        background: "rgba(245, 245, 247, 1)",
        border: "2px solid rgba(245, 245, 247, 1)",
      }}
    >
      <div className="task_form">
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          style={{ height: "100%" }}
        >
          <Grid item xs={10} sm={8} md={1} lg={3}>
            <Paper
              elevation={3}
              style={{
                padding: "20px",
                borderRadius: "10px",
                marginLeft: "-30rem",
                marginTop: "4rem",
                width: "77vw",
              }}
            >
              <Typography
                variant="h4"
                color="textPrimary"
                align="center"
                style={{
                  fontWeight: "bold",
                  paddingBottom: "20px",
                  color: "rgba(76, 78, 100, 0.87)",
                }}
              >
                Task Details
              </Typography>
              <form onSubmit={handleSubmit(onSubmit)}>
                {taskLoading ? (
                   <Grid container spacing={1} textAlign={"center"}>
                  <RevolvingDot
                   isLoading={true}
                    color="#546fff"
                    ariaLabel="revolving-dot-loading"
                  wrapperStyle={{ width: "100%" , display:"flex", justifyContent:"center"}}
                    wrapperClass="revolingDotIcon"
                  />
                   </Grid>
                ) : (
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Controller
                        name="title"
                        control={control}
                        defaultValue=""
                        rules={{ required: "Title is required" }}
                        render={({ field }) => (
                          <TextField
                            label="Title"
                            variant="outlined"
                            fullWidth
                            {...field}
                            error={!!errors.title}
                            helperText={errors.title?.message}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Controller
                        name="dueDate"
                        control={control}
                        defaultValue=""
                        rules={{ required: "Due Date is required" }}
                        render={({ field }) => (
                          <TextField
                            label="Due Date"
                            variant="outlined"
                            fullWidth
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            {...field}
                            error={!!errors.dueDate}
                            helperText={errors.dueDate?.message}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Controller
                        name="priority"
                        control={control}
                        defaultValue=""
                        rules={{ required: "Priority is required" }}
                        render={({ field }) => (
                          <TextField
                            select
                            label="Priority"
                            variant="outlined"
                            fullWidth
                            {...field}
                            error={!!errors.priority}
                            helperText={errors.priority?.message}
                          >
                            {priorities.map((priority) => (
                              <MenuItem
                                key={priority}
                                value={priority.toLowerCase()}
                              >
                                {priority}
                              </MenuItem>
                            ))}
                          </TextField>
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Controller
                        name="status"
                        control={control}
                        defaultValue=""
                        rules={{ required: "Status is required" }}
                        render={({ field }) => (
                          <TextField
                            select
                            label="Status"
                            variant="outlined"
                            fullWidth
                            {...field}
                            error={!!errors.status}
                            helperText={errors.status?.message}
                          >
                            {statuses.map((status) => (
                              <MenuItem
                                key={status.toLowerCase()}
                                value={status.toLowerCase()}
                              >
                                {status}
                              </MenuItem>
                            ))}
                          </TextField>
                        )}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Controller
                        name="assignee"
                        control={control}
                        defaultValue=""
                        rules={{ required: "Assignee is required" }}
                        render={({ field }) => (
                          <TextField
                            select
                            label="Assignee"
                            variant="outlined"
                            fullWidth
                            {...field}
                            error={!!errors.assignee}
                            helperText={errors.assignee?.message}
                          >
                            {loading ? (
                              <MenuItem disabled>
                                {" "}
                                <Skeleton />
                              </MenuItem>
                            ) : (
                              assignees.map((assignee) => (
                                <MenuItem key={assignee.id} value={assignee.id}>
                                  {assignee.username}
                                </MenuItem>
                              ))
                            )}
                          </TextField>
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Controller
                        name="description"
                        control={control}
                        defaultValue=""
                        rules={{ required: "Description is required" }}
                        render={({ field }) => (
                          <TextField
                            label="Description"
                            variant="outlined"
                            placeholder="lorem is Lorem Ips but not Lorem Ips"
                            fullWidth
                            multiline
                            minRows={1}
                            {...field}
                            error={!!errors.description}
                            helperText={errors.description?.message}
                          />
                        )}
                      />
                    </Grid>
                    <div className="div">
                      <Grid
                        item
                        xs={12}
                        style={{ paddingTop: "20px", marginLeft: "1rem" }}
                      >
                        <Button
                          type="submit"
                          variant="contained"
                          style={{
                            background: "rgba(102, 108, 255, 1)",
                            borderRadius: "10px",
                            padding: "14px",
                            width: "216px",
                          }}
                        >
                          Create Task
                        </Button>
                        <ToastContainer />
                      </Grid>
                    </div>
                  </Grid>
                )}
              </form>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default TaskForm;
