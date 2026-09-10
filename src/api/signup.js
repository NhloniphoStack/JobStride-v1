

export async function signup(details){
   
// https://jobstride-api.onrender.com/api
    const res = await fetch('https://jobstride-api.onrender.com/api/auth/signup', {
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
   
    return success
}