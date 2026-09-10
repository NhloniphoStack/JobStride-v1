import { Outlet, NavLink } from "react-router";
import more from '../assets/more.svg'
import {  useRef, useState, useContext } from "react";
import close from '../assets/close.svg'
import profile from '../assets/profile.svg'
import { userContext } from "./AuthProvider.jsx";


export function UserLayout() {
    const [showNav, setShowNav] = useState(false)
    
    const navElement = useRef()

    function handleNavClose(){

     setShowNav(prev => !prev)
     

    }

    const user = useContext(userContext)
    const username = user?.user?.username
    

   

    return (
        <>
        <header>
             <nav>
               
                <button onClick={handleNavClose} className="more-button">
                    <img  src={more} />
                </button>
                
               
            </nav>
            <div className="logo">
                <h3 className="site-name">JobStride</h3>
            </div>
            <div className="desktop-nav">
              <NavLink className={({isActive}) => isActive ? 'selected' : null} to="/dashboard">Dashboard</NavLink>
                <NavLink className={({isActive}) => isActive ? 'selected' : null} to="/applications">Applications</NavLink>
                <NavLink className={({isActive}) => isActive ? 'selected' : null} to="/add">Add Application</NavLink>
                 <NavLink className={({isActive}) => isActive ? 'selected' : null} to="/about">About</NavLink>
                <NavLink to="/dashboard?loggedout=true">Logout</NavLink>
            </div>
           
        </header>
        {showNav &&
            <div ref={navElement} className="side-nav">
            <div>
                <button className="closeNav-btn" onClick={handleNavClose}>
                    <img src={close} />
                </button>
            </div>
            <div className="side-nav-content">
                <div className="user-details">
                    <img className="user-profile" src={profile} />
                    <span>{username}</span>
                </div>
                <NavLink className={({isActive}) => isActive ? 'selected' : null} to="/dashboard">Dashboard</NavLink>
                <NavLink className={({isActive}) => isActive ? 'selected' : null} to="/applications">Applications</NavLink>
                <NavLink className={({isActive}) => isActive ? 'selected' : null} to="/add">Add Application</NavLink>
                <NavLink className={({isActive}) => isActive ? 'selected' : null} to="/about">About</NavLink>
                <NavLink to="/dashboard?loggedout=true">Logout</NavLink>
            </div>
        </div>}
        <Outlet />
      
        </>
    )
}