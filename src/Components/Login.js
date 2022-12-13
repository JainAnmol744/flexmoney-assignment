import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './Registration.css'

const Login = ({userlogin}) => {
  const [credentials, setcredentials] = useState({email:"", password:""})
      let navigate = useNavigate();
      const handlesubmit = async (e)=>{
          e.preventDefault();
          const response = await fetch(`http://localhost:5000/api/auth/login`, {
              method: 'POST', 
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({email:credentials.email, password: credentials.password}) 
            });
            const json = await response.json()
            console.log(json)
            alert(json.message);
            userlogin(json.user);
              // Save and redirect the authtoken
              if(json.success){
              localStorage.setItem('token', json.authtoken);
              navigate('/Profile');
              }
      }
      const onChange = (e)=>{
        setcredentials({...credentials, [e.target.name]:e.target.value})
      }

  return (
    <div className="Auth-form-container">
    <form className="Auth-form" onSubmit={handlesubmit}>
      < div className="Auth-form-content">
        <h3 className="Auth-form-title">Login</h3>
        <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={onChange} aria-describedby="emailHelp"/>
  </div>

  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" value={credentials.password} onChange={onChange} name="password"/>
  </div>
  < div className='flex-container'>
      <div><button type="submit" className="btn btn-primary " >Submit</button></div>
      <div><Link exact to='/signup ' >Don't Have an account! Register </Link></div></div> 
   
  </div>
  </form>
  </div>
  )
}

export default Login