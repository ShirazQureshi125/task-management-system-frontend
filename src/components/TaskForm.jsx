import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Grid,
  Paper,
  TextField,
  Button,
  MenuItem,
  Typography,
} from "@mui/material";

const priorities = ["High", "Medium", "Low"];
const statuses = ["Pending", "In Progress", "Completed"];
const Assignees = ["Saeed", "Ahmed", "Javeeda"];
const TaskForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // Handle form submission logic here
    console.log(data);
  };

  return (
    <div
      className="super_container"
      style={{
        maxWidth: "1620px",
        marginLeft: "18rem",
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
          <Grid item xs={10} sm={8} md={6} lg={4}>
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
                            <MenuItem key={status} value={status.toLowerCase()}>
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
                          {Assignees.map((assignee) => (
                            <MenuItem
                              key={assignee}
                              value={assignee.toLowerCase()}
                            >
                              {assignee}
                            </MenuItem>
                          ))}
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
                  <Grid
                    item
                    xs={12}
                    style={{ paddingTop: "20px", marginLeft: "76rem" }}
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
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default TaskForm;
