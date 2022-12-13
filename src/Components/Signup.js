import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './Registration.css'

const Signup = () => {
  const [credentials, setcredentials] = useState({name:"", email:"", password:"", age:"", batch:"",cpassword:""})
  let navigate = useNavigate();
  const handlesubmit = async (e)=>{
      e.preventDefault();
      const  {name , email,age, password,batch}= credentials;
      if(age>=18 && age<=65){
      const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({name,email,age,password, batch})
        }); 
          
        const json = await response.json()
        console.log(json)
        alert(json.message);
          // Save and redirect the authtoken
          if(json.success){
          localStorage.setItem('token', json.authtoken);
          navigate('/login');
          }
        }
        else{
          alert("Invalid Age")
        }
    }
    const onChange = (e)=>{
      setcredentials({...credentials, [e.target.name]:e.target.value})
    }

  return (
    <div className="Auth-form-container">
    <form className="Auth-form" onSubmit={handlesubmit}>
      < div className="Auth-form-content">
        <h3 className="Auth-form-title">Flexmoney Yoga Camp Registration form</h3>
        <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" name="name" value={credentials.name} onChange={onChange} aria-describedby="name"/>
  </div>
        <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={onChange} aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="age" className="form-label">Age</label>
    <input type="text" className="form-control" id="age" name="age" value={credentials.age} onChange={onChange} aria-describedby="age"/>
  </div>


  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" value={credentials.password} onChange={onChange} name="password"/>
  </div>

  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" id="cpassword" value={credentials.cpassword} onChange={onChange} name="cpassword"/>
  </div>
  <div className="mb-3">
                     <div className="form-label">Batch Timing:</div>
                     <select class="form-control" name="batch" value={credentials.batch} onChange={onChange} required>
                        <option value="" disabled selected>Select Batch</option>
                        <option>6AM - 7AM</option>
                        <option>7AM - 8AM</option>
                        <option>8AM - 9AM</option>
                        <option>5PM - 6PM</option>
                      </select>
                 </div>
  < div className='flex-container'>
      <div><button type="submit" className="btn btn-primary " >Submit</button></div>
      <div><Link exact to='/login ' >Already Have an account! Login </Link></div></div> 
   
  </div>
  </form>
  </div>
  )
}

export default Signup