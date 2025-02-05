import React, { useState } from 'react';
import { v4 as uuid } from "uuid";
import './UserForm.css'; 
import axios from 'axios';
import Loader from '../loading/Loader';

const UserForm = () => {

const[loading,setloading]=useState(false)
  const [userData, setUserData] = useState({
    id: '',
    email: "",
    first_name: "",
    last_name: "",
    avatar: "",
  });

 
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    if (!userData.email) {
      formErrors.email = "Email is required.";
      isValid = false;
    }

    if (!userData.first_name) {
      formErrors.first_name = "First name is required.";
      isValid = false;
    }

    if (!userData.last_name) {
      formErrors.last_name = "Last name is required.";
      isValid = false;
    }

    if (!userData.avatar) {
      formErrors.avatar = "Avatar URL is required.";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };


  const handleSubmit = async(e) => {
      
    e.preventDefault();
  
    if (validateForm()) {
        setloading(true)
    
      await axios.post('https://reqres.in/api/users',{
        first_name:userData.first_name,
        last_name:userData.last_name,
        email:userData.email,
        avatar:userData.avatar
      })
      .then((res)=>{console.log(res)
        setloading(false)
      })
      .catch((err)=>{console.log(err)})
      setErrors({});
    }
  };

  return (
    <div className="container form-container mt-5">
      <h2 className="text-center mb-4">User Form</h2>
      <form onSubmit={handleSubmit} className="form-card p-4 rounded shadow">
        <div className="form-group">
          <label htmlFor="id">ID:</label>
          <input
            type="text"
            id="id"
            name="id"
            value={userData.id}
            onChange={handleChange}
            className="form-control"
            disabled
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="first_name">First Name:</label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={userData.first_name}
            onChange={handleChange}
            className={`form-control ${errors.first_name ? 'is-invalid' : ''}`}
          />
          {errors.first_name && <div className="invalid-feedback">{errors.first_name}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="last_name">Last Name:</label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={userData.last_name}
            onChange={handleChange}
            className={`form-control ${errors.last_name ? 'is-invalid' : ''}`}
          />
          {errors.last_name && <div className="invalid-feedback">{errors.last_name}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="avatar">Avatar URL:</label>
          <input
            type="text"
            id="avatar"
            name="avatar"
            value={userData.avatar}
            onChange={handleChange}
            className={`form-control ${errors.avatar ? 'is-invalid' : ''}`}
          />
          {errors.avatar && <div className="invalid-feedback">{errors.avatar}</div>}
        </div>

        <div className="text-center mt-4">
        {loading===true?<Loader/>: <button type="submit" className="btn btn-primary btn-block">Submit</button>} 
        </div>
      </form>

      <div className="mt-4 text-center">
        <h3>Avatar Preview:</h3>
        <img
          src={userData.avatar}
          alt="User Avatar"
          className="avatar-preview"
        />
      </div>
    </div>
  );
};

export default UserForm;

