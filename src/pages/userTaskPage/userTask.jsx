import React from 'react'
import Sidebar from '../../components/Sidebar'
import Navbar from '../../components/Navbar'
import UserTaskTable from '../../components/userTaskTable'

export default function UserTask() {
  return (
    <div style={{background:'rgba(245, 245, 247, 1)'}}>
    <Sidebar />
    <Navbar />
    <UserTaskTable />
  </div>
  )
}
