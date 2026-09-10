import { Link, NavLink, useLoaderData, useNavigate, useSearchParams } from "react-router";
import { getJobs } from "../api/getJobs.js";
import location from '../assets/location.svg'
import date from '../assets/calender.svg'
import bin from '../assets/bin.svg'
import { useState } from "react";
import { deleteJob } from "../api/deleteJob.js";

export async function applicationsLoader(){
    try{
        const jobs = await getJobs()
        
        return jobs

    }catch(err){
        return err
    }
    
   
}

export function Applications(){
    const [searchParams] = useSearchParams()
    const [showModal, setShowModal] = useState(false)
    const [deleteId, setDeleteId] = useState(null)
    
    const statusType = searchParams.get("status")
    const navigation = useNavigate()
    const jobsData = useLoaderData()
    const [search, setSearch] = useState(null)
    
   
    

    function advancedFilter(status, search){

       return jobsData?.filter(job => {
        return ( 
            (!status || job.status === status) && 
            (!search || job.company.toLowerCase().startsWith(search.toLowerCase()))
        )
       })

    }
    const filteredJobs = advancedFilter(statusType, search)

   

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

    function handleAdd(){
        navigation('/add')
    }

    function cleanDate(date){
        const dateFormat = new Date(date)
        const cleanDate = dateFormat.toLocaleDateString('en-US', {month: 'short', day: 'numeric'})
        return cleanDate
    }



    function handleConfirm(id){
    setShowModal(prev => !prev)
    setDeleteId({id: id})

    }

    async function handleDelete(){
     if(deleteId){
        const attempt = await deleteJob({
            id: deleteId.id
        })

        if(attempt.message){
            
            navigation('?deleted=true')
            setShowModal(prev => !prev)
        }

       
     }
    }

    function handleChange(e){
        const { value } = e.target
        setSearch(value)
    }

   
    return(
        <section className="applications-section">
                <h2 className="applications-title">Applications</h2>
                <div className="search-cont">
                    <input onChange={handleChange} placeholder="Search applications"/>
                </div>
                <div className="filters">
                   
                    <NavLink className={() => statusType === null ? "selected-filter" : null} to="." end>All</NavLink>
                    <NavLink className={() => statusType === 'Applied' ? "selected-filter" : null} to="?status=Applied">Applied</NavLink>
                    <NavLink className={() => statusType === 'Interview' ? "selected-filter" : null} to="?status=Interview">Interview</NavLink>
                    <NavLink className={() => statusType === 'Offer' ? "selected-filter" : null} to="?status=Offer">Offer</NavLink>
                    <NavLink className={() => statusType === 'Rejected' ? "selected-filter" : null} to="?status=Rejected">Rejected</NavLink>
          

                </div>
                <div className="applications-container">
                    {filteredJobs.map(job =>
                         
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
                                <div>
                                   
                                    
                                        
                                        <button onClick={() => handleConfirm(job.id)}  className="delete-button">
                                            <img className="bin-icon" src={bin} />
                                        </button>
                                    
                                </div>
                                
                            </div>
                         </div>
                         
                         )}
                </div>
                {filteredJobs.length === 0 && 
                <div className="empty-state">
                    <h4>No applications yet</h4>
                    <span>
                        When you save a job it will appear in the list
                    </span>

                </div>}
                <div className="addjob-container">
                       <button onClick={handleAdd} className="add-button">
                         +
                       </button>
                  </div>
                 {showModal &&
                  <div className="delete-modal">
                    <h2>Delete this application?</h2>
                    <p className="alert-message">This cannot be undone</p>
                    <div className="modal-button-cont">
                        <button onClick={() => setShowModal(false)} className="cancel-modal-button">Cancel</button>
                        <button onClick={handleDelete} className="delete-modal-button">Delete</button>
                    </div>
                  </div>}
                
        </section>
       
    )
}