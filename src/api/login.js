
export async function login(details){
    
   
    const res = await fetch('https://jobstride-api.onrender.com/api/auth/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(details)

    })

    if(!res.ok){
        const error = await res.json()
        return error
    }

    const success = await res.json()
   console.log(success)
    return success
}