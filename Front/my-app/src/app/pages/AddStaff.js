import React, { useState } from 'react'
import  '../Styles/AddStaff.css'
import { Link } from "react-router-dom";
import {  selectUserName, signUpAsync,selectStaff} from './LoginSlice';
import { useSelector, useDispatch } from 'react-redux';

const AddStaff = () => {
    const dispatch = useDispatch();
    const userName = useSelector(selectUserName);
    const [newStaffUserName, setNewStaffUserName] = useState("")
    const [staff, setStaff] = useState(false)
    const [staffPwd, setStaffPwd] = useState("")
    const [confirmStaffPwd, setConfirmStaffPwd] = useState("")
    const isStaff = useSelector(selectStaff)
    const clean = (state) => {
        setNewStaffUserName("")
        setStaffPwd("")
        setConfirmStaffPwd("")
    }
    
  return (
    isStaff ?
    <div>
        <nav className="bg-dark navbar-dark navbar">
            <div className="row col-12 d-flex justify-content-center text-white">
                <h3>Registration</h3>
            </div>
        </nav>

        <div className="form">
          <div className="form-body">
              <div className="username">
              <label className="form__label" htmlFor='username'>Username </label>
              <input type="text" placeholder="Username" value={newStaffUserName} onChange={(e) => setNewStaffUserName(e.target.value)}required />
              </div>
              <div className="staff">
              Staff: <input on onChange={(e) => setStaff(e.target.checked)} type={'checkbox'}></input>
              
              </div>
              
              <div className="password">
                  <label className="form__label" htmlFor="password">Password </label>
                  <input className="form__input" value={staffPwd} onChange={(e) => setStaffPwd(e.target.value)} required type={'password'} placeholder="Password"/>
              </div>
              <div className="confirm-password">
                  <label className="form__label" htmlFor="confirmPassword">Confirm Password </label>
                  <input className="form__input" value={confirmStaffPwd} onChange={(e) => setConfirmStaffPwd(e.target.value)} required type={'password'} placeholder="Confirm Password"/>
              </div>
          </div>
          <div className="footer">
          {staffPwd===confirmStaffPwd &&
          <Link to="#"><button onClick={() => dispatch(signUpAsync({ username: newStaffUserName, password: staffPwd,  staff: staff}),clean())}>Register</button></Link>}
          
          </div>
      </div>

    </div>
    : " sign in please"
  )
}

export default AddStaff