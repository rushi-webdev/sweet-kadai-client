import React from 'react'
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const user = useSelector((state) => state.user.user);
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard