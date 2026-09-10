import { Form, Link, redirect, useActionData, useLoaderData, useNavigation, useParams } from "react-router"
import { getJob } from "../api/getJob.js"
import { editJob } from '../api/editJob.js'
export async function editLoader({params}){
    const jobId = params

    try{
        const attempt = await getJob(jobId)
        return attempt
    }catch(err){
        return err
    }
} 

export async function editAction({request, params}){
    
    const formData = await request.formData()
   
    try{
      const attempt = await editJob({
        id: params.id,
        location: formData.get("location"),
        date: formData.get("date"),
        job_url: formData.get("job_url"),
        notes: formData.get("notes")
      })

      if(attempt.error){
        return attempt
      }

      return redirect(`/applications/${params.id}`)


    }catch(err){
        return err
    }

}

export function EditApplication(){
    const job = useLoaderData()
    const data = useActionData()
  
    const navigation = useNavigation
    const params = useParams()
    function formatDate(date){

        const data = new Date(date)
        const year = data.getFullYear()
        const month = data.getMonth() + 1
        const day = data.getDate()
       return  `${year}-${month < 10 ? `0${month}` : month }-${day < 10 ? `0${day}`: day }`

    }
 
 
   
    const status = navigation.state
    
    return (
        <section className="edit-section">
            <Form method="POST" replace>
            <div className="edit-form">

                <label htmlFor="location" >Location</label>
          <input defaultValue={job.location} name="location" id="location" />

          <label htmlFor="date">Date</label>
          <input defaultValue={formatDate(job.date)}  type="date" name="date" id="date" required/>

          <label htmlFor="job_url" >Job url</label>
          <input defaultValue={job.job_url} name="job_url" id="job_url" />

          <label htmlFor="notes" >Notes</label>
          <textarea defaultValue={job.notes} name="notes" id="notes" />

            </div>
            <div className="edit-button-cont">
                <button 
                className="save-button" >Save changes</button>
                <Link to={`/applications/${params.id}`}>Cancel</Link>
            </div>
            </Form>
        </section>
    )
}