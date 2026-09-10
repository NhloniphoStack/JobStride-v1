
export async function getUser(){
    
   const res = await fetch('https://jobstride-api.onrender.com/api/me', {
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