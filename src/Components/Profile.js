import React, { useContext, useRef, useState } from 'react'
import ProfileItem from './ProfileItem';
import noteContext from "../context/noteContext";
import './success.css'

const Profile = (props) => {
  const {id,name,age,batch,email} = props
  const context = useContext(noteContext);
  const { notes, editNote } = context;

  const ref = useRef(null);
  const refClose = useRef(null);
  
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({eemail:email, ebatch:batch})
  };

   const handleclick = (e)=>{
    console.log("Updated Note", note)
    editNote(note.eemail, note.ebatch)
    refClose.current.click();
    alert("Updated Successfully", "success")
}
const onChange = (e)=>{
  setNote({...note, [e.target.name]:e.target.value})
}

const[note, setNote] = useState({eemail:"",ebatch:""})



  return (
    
    <div className="Success-container">
    <div>
        <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Edit Note
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
              </button>
            </div>
            <div className="modal-body">
            <form>
        <div className="mb-3 my-3">
                     <div className="form-label">Batch Timing:</div>
                     <select class="form-control" name="ebatch" value={note.ebatch} onChange={onChange} required>
                        <option value="" disabled selected>Select Batch</option>
                        <option>6AM - 7AM</option>
                        <option>7AM - 8AM</option>
                        <option>8AM - 9AM</option>
                        <option>5PM - 6PM</option>
                      </select>
          </div>
      </form>
            </div>
            <div className="modal-footer">
              <button
              ref= {refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button"  className="btn btn-primary" onClick={handleclick}>
                Update changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <ProfileItem key={note.email} updateNote= {updateNote} note={note}  name={name} email={email} age={age} batch={batch}/>

      
        </div>
    </div>
  )
}

export default Profile