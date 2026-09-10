import { Form, Link, redirect, useActionData, useNavigation } from "react-router"
import briefcase from '../assets/briefcase.png'
import { login } from "../api/login"
export async function loginAction({ request }){
    
    const formData = await request.formData()
   
    const username = formData.get("username")
    const password = formData.get("password")

    try{
       const attempt = await login({
        username: username,
        password: password
       })

       if(attempt.message === "Login successful"){
        return redirect('/dashboard')
       }

       if(attempt?.error){
        
        return attempt
       }

       

    }catch(err){
        return err
    }

    
    return null
}

export function Login(){
    const actionData = useActionData();

    const error = actionData?.error

    
    const navigation = useNavigation()

    const status = navigation.state


    return (
        <section className="login-section">
           <Form method="POST" replace>
               <div className="login-form">
                    <div className="login-header">
                        <div>
                            <img className="case-icon" src={briefcase} />
                        </div>
                        <h2 className="app-name">JobStride</h2>
                        <p>Track your applications</p>
                    </div>
                    <label htmlFor="username"></label>
                    <input 
                    type="text"
                     name="username"
                      id="username"
                      placeholder="Username"
                      required/>

                      <label htmlFor="username"></label>
                      <input 
                       type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                        required/>
                         <button disabled={status !== 'idle'} className="login-button">
                            {status !== 'idle' &&
                            <div className="loader">
                            </div>}
                             {status === 'submitting' ? 'Signing in' : 'Login'}
                        </button>
                       {error &&
                        <div className="error-container">
                           <p>{error}</p>
                        </div>
                        }
                        <div className="login-reminder">
                            <p>
                                Don't have an account?  
                                <Link to='/signup'>
                                    Sign up
                                </Link>
                            </p>
                        </div>
               </div>
           </Form>
        </section>
    )
}