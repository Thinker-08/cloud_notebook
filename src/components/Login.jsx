import React,{useState} from 'react'
import {useHistory} from 'react-router-dom'
import './login.css'

const Login = (props) => {
  let history = useHistory();
    const [detail, setDetail] = useState({name:"",email:"",password:""})
    const handleSubmit=async (e)=>{
        e.preventDefault();
        console.log(detail)
        const response = await fetch("http://localhost:5000/api/auth/login",{
            method:'POST',
            headers: {
              'Content-Type':'application/json'
            },
            body:JSON.stringify({email:detail.email,password:detail.password})
          });
          var dat = await response.json();
          console.log(dat);
          if(dat.success){
            localStorage.setItem('token',dat.authtoken);
            history.push("/")
            props.showAlert("Logged in Successfully","success")
          }else{
            props.showAlert("Invalid Credentails!!","danger")
          }
    }
    const onChange=(e)=>{
        setDetail({...detail,[e.target.name]:e.target.value})
    }
  return (
    <div className="containerOfLogin">
  <form className="my-8"  onSubmit={handleSubmit}>
  <div className="form-outline mb-4">
    <input type="email" id="form2Example1" className="form-control" name="email" value={detail.email} onChange={onChange}/>
    <label className="form-label" htmlFor="form2Example1">Email address</label>
  </div>
  <div className="form-outline mb-4">
    <input type="password" id="form2Example2" className="form-control" name="password" value={detail.password} onChange={onChange}/>
    <label className="form-label" htmlFor="form2Example2">Password</label>
  </div>
  <button type="submit" className="btn btn-primary btn-block mb-4">Login</button>

  <div className="text-center">
    <p>Not a member? <a href="/signup">Register</a></p>
    <p>or sign up with:</p>
    <button type="button" className="btn btn-link btn-floating mx-1">
      <i className="fab fa-facebook-f"></i>
    </button>

    <button type="button" className="btn btn-link btn-floating mx-1">
      <i className="fab fa-google"></i>
    </button>

    <button type="button" className="btn btn-link btn-floating mx-1">
      <i className="fab fa-twitter"></i>
    </button>

    <button type="button" className="btn btn-link btn-floating mx-1">
      <i className="fab fa-github"></i>
    </button>
  </div>
</form>
</div>
  )
}

export default Login