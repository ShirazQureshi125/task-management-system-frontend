import React from 'react';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import TaskForm from '../../components/TaskForm';

const CreateTask = () => {
  return (
    <div style={{background:'rgba(245, 245, 247, 1)'}}>
      <Sidebar />
      <Navbar />
     <TaskForm/>
    </div>
  );
};

export default CreateTask;
