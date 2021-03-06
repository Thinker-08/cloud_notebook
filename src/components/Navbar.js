import React, {useEffect} from 'react'
import { Link, useLocation } from "react-router-dom";
import {useHistory} from 'react-router-dom'
  

const Navbar = () => {
    let location = useLocation();
    let history = useHistory();
    useEffect(() => {
        console.log(location.pathname);
      }, [location]);
      const handleLogout=()=>{
        localStorage.removeItem('token');
        history.push('/login')
      }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/"><img src='https://cdn-icons.flaticon.com/png/512/2402/premium/2402808.png?token=exp=1656412408~hmac=03c10f79b7abc950a6bc7719a679a643' alt="cloud" height="25px" width="30px"/>Cloudy</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname==="/"? "active": ""}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname==="/about"? "active": ""}`} to="/about">About</Link>
                        </li>

                    </ul>
                    {!localStorage.getItem('token')?<form className="d-flex">
                        <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
                        <Link className="btn btn-primary mx-2" to="/signup" role="button">Signup</Link>
                    </form>:<form className="d-flex">
                        <button className="btn btn-primary mx-2" onClick={handleLogout}>Logout</button>
                    </form>}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
