


export async function logout(){
    
  
    const res = await fetch('https://jobstride-api.onrender.com/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }

    })

    if(!res.ok){
        const error = await res.json()
        return error
    }

    const success = await res.json()
   
    return success
}