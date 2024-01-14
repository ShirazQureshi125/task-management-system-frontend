import React from 'react';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import TaskTable from '../../components/taskTable';

const TaskPage = () => {
  
  return (
    <div style={{background:'rgba(245, 245, 247, 1)'}}>
      <Sidebar />
      <Navbar />
      <TaskTable />
    </div>
  );
};

export default TaskPage;
