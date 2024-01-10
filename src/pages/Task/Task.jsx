import React from 'react';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import TaskTable from '../../components/taskTable';

const TaskPage = () => {
  return (
    <>
      <Sidebar />
      <Navbar />
      <TaskTable />
    </>
  );
};

export default TaskPage;
