import { Link, useLoaderData, useNavigate } from "react-router"
import { getJob } from "../api/getJob.js"
import { createContext } from "react"


export async function detailsLoader({ params }){
    const jobid = params
    
    try{
        const attempt = await getJob(jobid)
        
        if(attempt.error){
            return attempt
        }
        return attempt

    }catch(err){
       
        return err
    }
    
}


export function ApplicationDetails(){
    const job = useLoaderData()
    const navigate = useNavigate()
    

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

    function handleNav(){
       navigate('edit')
    }

    function cleanDate(date){
        const dateFormat = new Date(date)
        const cleanDate = dateFormat.toLocaleDateString('en-US', {month: 'short', day: 'numeric', year:"numeric"})
        return cleanDate
    }

    return (
        
        <section className="application-section">
            <div className="back-container">
            <Link className="back-button" to="/applications">Back</Link>
            </div>

            <div className="application-header">
                <label>Company</label>
                <h2>{job.company}</h2>
                <div className="role-status">
                    <p className="job-app-role">{job.role}</p>
                    <p style={getColor(job.status)} className="job-status">{job.status}</p>
                </div>
            </div>
            <div>
                <div className="item">
                    <div>
                        <label className="value-type">Location</label>
                        <p>{job.location}</p>
                    </div>
                </div>

                  <div className="item">
                   <div>
                        <label className="value-type">Date applied</label>
                        <p>{cleanDate(job.date)}</p>
                    </div>
                </div>

                  <div className="item">
                    <div>
                        <label className="value-type">Job URL</label>
                        <p className="job-url">{job.job_url}</p>
                    </div>
                </div>

                <div className="item">
                    <div>
                        <label className="value-type">Notes</label>
                        <p className="job-notes">{job.notes}</p>
                    </div>
                </div>

                


            </div>
            <div className="edit-container">
                <button onClick={handleNav} className="edit-button">Edit</button>
            </div>
        </section>
    )
}