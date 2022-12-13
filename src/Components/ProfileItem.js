import React,{useRef, useState} from 'react'
import { Link } from 'react-router-dom';

const ProfileItem = (props) => {
    const {note, updateNote , name , email, age, batch} = props;
    // const open = useRef(null);
    // const Close = useRef(null);
    // const pay = ()=>{
    // open.current.click();
    // }
    // const handle = (e)=>{
    //    setload("true");
    //     Close.current.click();
    //     alert("Payment Successfully", "success")
    // }
    const onchange = ()=>{
        setload(true);
        alert("payment done successfully");
    }
    const [load,setload]=useState(false);
  return (
    <>
    <div className="Success-container">
        <div className='container'>
          <center><h3>Welcome! You have confirm your slot!!</h3></center>
        <div className=' my-3'>
          <u><center><h2>Your Details</h2></center></u>
          <div>Name : {name}</div>
          <div>E-mail : {email}</div>
          <div>Age : {age}</div>
          <div>Batch : {batch}</div>
          <div>Fees: 500/-</div>
        </div>

        <button type="submit" className="btn btn-primary mx-2"  onClick={ ()=>{updateNote(note);}}>Edit Batch Timing</button>

        <button type="submit" disabled ={load} className="btn btn-primary mx-2 " onClick={onchange} >Pay Now</button>
        <Link exact to='/login'
            className='primaryBtn d-flex align-items-center'>Back to the Home Page </Link>
        </div>
  </div>
  </>
  )
}

export default ProfileItem