import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "./UserList.css";
import { useNavigate } from 'react-router-dom';

function UserList() {
    const[usersData,setusersData]=useState([])
    const[currentPage, setcurrentPage]=useState(1)
    const[totalpage,settotalpage]=useState()
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState(null);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const Navigate=useNavigate()
  
    const handleSearch = (e) => {
      setSearch(e.target.value);
    };
  
    const handleSort = (key) => {
      setSortBy(key);
    };
  
    const handleDeleteClick = (user) => {
        setUserToDelete(user);
        setShowConfirmDialog(true);
      };
    
      const handleDeleteConfirm = () => {
        handleDelete(userToDelete)
        setShowConfirmDialog(false);
      };
    
      const handleDeleteCancel = () => {
        setShowConfirmDialog(false);
        setUserToDelete(null);
      };
    const filteredUsers = usersData.filter((user) =>
      `${user.first_name} ${user.last_name} ${user.email}`.toLowerCase().includes(search.toLowerCase())
    );
  
    const sortedUsers = sortBy
      ? [...filteredUsers].sort((a, b) => a[sortBy].localeCompare(b[sortBy]))
      : filteredUsers;

      const handleDelete = async (userId) => {
        await axios.delete(`https://reqres.in/api/users/${userId}`)
        .then((res)=>{
            console.log(res)
            UserDate()
            alert( `status:  ${res.status}`)
        })
        .catch((err)=>{
            console.log(err)
        })
      };
      const handleUpdate = (userId) => {
        Navigate(`/users/edit/${userId}`)
      };
      
      
       async function UserDate(){
        await axios.get(`https://reqres.in/api/users?page=${currentPage}`)
        .then((res)=>{
            console.log(res.data.total_pages)
            let c=res.data.total_pages
            let total=[]
            for(let i=1;i<=2;i++){
                total.push(i)
            }
            settotalpage(total)
            setusersData(res.data.data)
        })
        .catch((err)=>{
            console.log(err)
        })
       }
       useEffect(()=>{
        UserDate()
       },[currentPage])
  return (
    <div className="container-fluid pd-4 user-list-container">
      <h2 className="mb-4 text-center text-primary">User List</h2>
      
  
      
      <input
        type="text"
        placeholder="Search by name or email"
        className="form-control mb-3 search-bar"
        value={search}
        onChange={handleSearch}
      />
      <div className="d-flex justify-content-end mb-3">
        <button className="btn btn-primary me-2 sort-button" onClick={() => handleSort("first_name")}>
          Sort by Name
        </button>
        <button className="btn btn-secondary sort-button" onClick={() => handleSort("email")}>
          Sort by Email
        </button>
      </div>
      <div className="d-flex justify-content-end mb-3">
      <button className="btn btn-success " onClick={()=>Navigate("/users/add")}>Go to Upload Pages</button>
      </div>
      <div className="row">
        {sortedUsers.map((user) => (
          <div className="col-md-4 mb-3" key={user.id}>
            <div className="card p-3 text-center user-card animated-card">
              <img src={user.avatar} alt={user.first_name} className="rounded-circle mx-auto user-avatar animated-avatar" />
              <h5 className="mt-2 text-dark">{user.first_name} {user.last_name}</h5>
              <p className="text-muted">{user.email}</p>
              <button className="delete-button" onClick={() => handleDeleteClick(user.id)}>  &#10005;</button>
              <button className="update-button" onClick={() => handleUpdate(user.id)}>  &#9998;   </button>
              <button  className="button" onClick={()=>Navigate(`/users/${user.id}`)}>Detail page</button>
            </div>
          </div>
        ))}
      </div>
         {
            totalpage?.map((page)=>(
                <button
            key={page}
            className={`pagination-button ${currentPage === page ? 'active' : ''}`}
            onClick={() => setcurrentPage(page)}
            disabled={currentPage === page}
          >
            {page}
          </button>
            ))
         }
      {showConfirmDialog && (
        <div className="confirmation-dialog">
          <div className="dialog-overlay" onClick={handleDeleteCancel}></div>
          <div className="dialog-box">
            <h5>Are you sure you want to delete {userToDelete?.first_name} {userToDelete?.last_name}?</h5>
            <button className="btn btn-danger me-2" onClick={handleDeleteConfirm}>Delete</button>
            <button className="btn btn-secondary" onClick={handleDeleteCancel}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserList