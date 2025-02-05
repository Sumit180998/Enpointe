import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {  useNavigate, useParams } from 'react-router-dom';
import { v4 as uuid } from "uuid";
import "./UserDetails.css";

function UserDetails() {
    const Navigate = useNavigate();
    const[ user,setuser]=useState({})
    const {id}=useParams()
 
   
  

    async function UserDetailsDate(){
        await axios.get(`https://reqres.in/api/users/${id}`)
        .then((res)=>{
            console.log(res.data.data)
            setuser(res.data.data)
        })
        .catch((err)=>{
            console.log(err)
        })
       }
       useEffect(()=>{
        UserDetailsDate()
       },[])
  
  return (
    <div className="container ">
      <button className="btn btn-secondary mb-4" onClick={()=>Navigate('/')} >
        Back
      </button>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg border-0">
            <img
              src={user.avatar}
              className="card-img-top rounded-circle mx-auto mt-3"
              alt="User Avatar"
              style={{ width: '150px', height: '150px' }}
            />
            <div className="card-body text-center">
              <h3 className="card-title">{user.first_name} {user.last_name}</h3>
              <p className="card-text">{user.email}</p>
              <p className="card-text">ID: {user.id}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserDetails