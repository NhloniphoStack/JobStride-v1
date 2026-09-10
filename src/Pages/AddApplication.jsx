import { Form, Link, redirect, useActionData, useNavigation } from "react-router"
import { addJob } from "../api/addJob.js"
import { useEffect, useRef } from "react"

export async function addApplictionAction({ request }){
    
    const formData = await request.formData()
    try{
         const attempt = await addJob({
            company: formData.get("company"),
            role: formData.get("role"),
            location: formData.get("location"),
            job_url: formData.get("job_url"),
            status: formData.get("status"),
            date: formData.get("date"),
            notes: formData.get("notes")
         })

         if(attempt?.message){
          
           return redirect('/dashboard')
         }

         if(attempt.error){
            return attempt
         }

    }catch(err){
        return err
    }
}

export function AddApplication(){
    const error = useActionData()
    const navigation = useNavigation()
    const status = navigation.state

    const sectionElement = useRef()
    useEffect(() => {
        sectionElement?.current?.scrollIntoView({
            behavior: 'smooth'
        })
    })
     return (
        <section ref={sectionElement} className="add-section">
            

           <Form method="POST" replace>
            <div className="add-form">
             <h4>Add Application</h4>
            <label htmlFor="company">
                Company
            </label>
            <input 
            name="company" 
            id="company" 
            placeholder="e.g Amazon"
            required/>

            <label htmlFor="role">
                Role/Job Title
            </label>
            <input 
            name="role" 
            id="role" 
            placeholder="e.g Software Engineer"
            required/>

            <label htmlFor="location">
                Location
            </label>
            <input 
            name="location" 
            id="location" 
            placeholder="e.g New York"
            required/>

            <label htmlFor="job_url">
                Job Url
            </label>
            <input 
            name="job_url" 
            id="job_url" 
            placeholder="e.g https://jobs.example.com"
            required/>
            

            <label htmlFor="status">
                Status
            </label>
            <select 
            name="status" 
            id="status" 
            >
                <option value='Applied'>Applied</option>
                <option value='Interview'>Interview</option>
                <option value='Offer'>Offer</option>
            </select>

            <label htmlFor="date">
                Date applied
            </label>
            <input 
            name="date" 
            type="date"
            id="date" 
            
            required/>

            <label htmlFor="notes">
                Notes
            </label>
            <textarea 
            name="notes" 
            id="notes" 
            placeholder="Add any notes about the application"
            />
           {error &&
            <div className="error-container">
                <span>{error?.error}</span>

            </div>}
            <div className="save-cont">
                <button className="save-button" disabled={status !== 'idle'}>Save application</button>
                <Link to="/dashboard">Cancel</Link>
            </div>
           </div>
           </Form>
        </section>
     )
}