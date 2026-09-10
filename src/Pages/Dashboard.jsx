import { userContext } from "../Components/AuthProvider.jsx"
import { useContext } from "react"
import { getJobs } from '../api/getJobs.js'
import { logout } from "../api/logout.js";
import { redirect, useLoaderData, useNavigate, useSearchParams, Link } from "react-router";
import location from '../assets/location.svg'
import date from '../assets/calender.svg'
import briefcase from '../assets/briefcase.png'
import paper from '../assets/paper.png'
import calender from '../assets/time.png'
import star from '../assets/star.png'

export async function dashboardLoader(){
    try{
        const attempt = await getJobs()

        return attempt

    }catch(err){
        return err
    }
    
}


export function Dashboard(){
    const [searchParams, setSearchParasms] = useSearchParams()
    const navigate = useNavigate()
    const loggedOut = searchParams.get("loggedout")


    const user = useContext(userContext)
  const jobs = useLoaderData()
 
  const recent = () => {
    if(jobs.length === 0){
        return []
    }

    if(!jobs[jobs.length - 2]){
        
        return [jobs[jobs.length - 1]]
    }
    return [jobs[jobs.length - 1], jobs[jobs.length - 2]]
  }
  

 
  const applied = jobs?.filter(job => job.status === 'Applied')
  const interview = jobs?.filter(job => job.status === 'Interview')
   const offers = jobs?.filter(job => job.status === 'Offer')
 
    

    if(loggedOut){
        async function loadLogout(){
            const attempt = await logout()

            if(attempt.message){
                
                navigate('/')
            }
        }
        loadLogout()
    }

    function handleAdd(){
        navigate('/add')
    }

    function cleanDate(date){
        const dateFormat = new Date(date)
        const cleanDate = dateFormat.toLocaleDateString('en-US', {month: 'short', day: 'numeric'})
        return cleanDate
    }

    function getColor(status){
        if(status === 'Interview'){
          return {
            backgroundColor: ' #7f9aad',
            color: '#454fdc'
          }
        }

        if(status === 'Offer'){
          return {
            backgroundColor: ' #a6d3b4',
            color: ' #149e44'
          }
        }

        if(status === 'Reject'){
            return {
                backgroundColor: '#d3a6a6',
                color: '#bc3434'
            }
        }

        if(status === 'Applied'){
            return {
                backgroundColor: '#a6a9d3',
                color: '#383fa6'
            }
        }
    }
    return (
        <section className="dashboard-section">
           <h2>Dashboard</h2>
           {jobs &&
           <div className="dashboard-stats">
                <div className="box">
                    <p 
                    className="box-amount">
                        {jobs.length}
                    </p>
                    <div className="value-box">
                    <img className="icon" src={briefcase} />
                    <p className="type">Total</p>
                    </div>
                </div>

                <div className="box">
                    <p 
                    className="box-amount">
                        {applied.length}
                    </p>
                    <div className="value-box">
                        <img className="icon" src={paper} />
                    <p className="type">Applied</p>
                    </div>
                </div>

                <div className="box">
                    <p 
                    className="box-amount">
                        {interview.length}
                    </p>
                    <div className="value-box">
                          <img className="icon" src={calender} />
                    <p className="type">Interview</p>
                    </div>
                </div>

                <div className="box">
                    <p 
                    className="box-amount">
                        {offers.length}
                    </p>
                    <div className="value-box">
                          <img className="icon" src={star} />
                    <p className="type">Offers</p>
                    </div>
                </div>
           </div>
           }
           <div className="recent-cont">
                <h4>Recent Applications</h4>
                <div className="job-column">
                    <p>Company</p>
                    <p>Role</p>
                    <p>Location</p>
                    <p>Date</p>
                    <p>Status</p>
                </div>
               { recent().length > 0 &&
                <div className="recent-container">
                    {recent().map(job => 
                     <div key={job.id} className="application-item">
                                               
                                                <div className="app-details">
                                                <Link to={`/applications/${job.id}`}>
                                                <p id="company-name">{job.company}</p>
                                                <p id="role">{job.role}</p>
                                                <div className="location-stack">
                                                    <div className="location">
                                                        <img className="location-icon" src={location} />
                                                        <p>{job.location}</p>
                    
                                                    </div>
                                                    <div className="date">
                                                        <img className="date-icon" src={date} />
                                                        <p>{cleanDate(job.date)}</p>
                                                    </div>
                                                    
                                                </div>
                                                </Link>
                                                </div>
                                                <div className="status-delete-cont">
                                                    <div style={getColor(job.status)} className="status-container">
                                                        <p>{job.status}</p>
                                                    </div>
                                                    
                                                    
                                                </div>
                                             </div>
                )}
                </div>}
                { recent().length === 0 && 
                <div className="empty-state">
                    <h4>No applications yet</h4>
                    <span>
                        Add your first job to start
                        tracking
                    </span>

                </div>

                }
           </div>
           <div className="addjob-container">
                       <button onClick={handleAdd} className="add-button">
                         +
                       </button>
           </div>
        </section>
    )
}