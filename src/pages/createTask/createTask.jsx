import React from 'react';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import TaskForm from '../../components/TaskForm';

const CreateTask = () => {
  return (
    <>
      <Sidebar />
      <Navbar />
     <TaskForm/>
    </>
  );
};

export default CreateTask;
