import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserList from "../Pages/UserList";
import UserDetails from "../Pages/UserDetails";
import UserForm from "../Pages/UserForm";
import Updatepage from '../Pages/Updatepage';
function RoutesEnpoint() {
    
  return (
    <Router>

      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/users/:id" element={<UserDetails />} />
        <Route path="/users/add" element={<UserForm />} />
        <Route path="/users/edit/:id" element={<Updatepage/>} />
      </Routes>
  </Router>
  )
}

export default RoutesEnpoint