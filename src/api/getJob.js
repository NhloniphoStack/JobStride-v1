

export async function getJob(id){

    const res = await fetch(`https://jobstride-api.onrender.com/api/jobs/${id.id}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if(!res.ok){
    const error = await res.json();
    return error
   }

   const success = await res.json()
   
   return success
}