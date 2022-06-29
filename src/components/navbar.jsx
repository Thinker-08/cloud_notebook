import React,{ useEffect } from 'react'
import { Link, useLocation } from "react-router-dom"

function Navbar() {
  let location = useLocation();
  useEffect(()=>{
  },[location]);
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand" to="/"><img src='https://cdn-icons.flaticon.com/png/512/2402/premium/2402808.png?token=exp=1656412408~hmac=03c10f79b7abc950a6bc7719a679a643' alt="cloud" height="25px" width="30px"/>Cloudy</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="/navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className={`nav-item ${location.pathname==='/'?"active":""}`} >
        <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
      </li>
      <li className={`nav-item ${location.pathname==='/about'?"active":""}`}>
        <Link className="nav-link" to="/about">About</Link>
      </li>
    </ul>
  </div>
</nav>
    </div>
  )
}

export default Navbar