import { Form, redirect, useActionData, useNavigation, Link } from "react-router"
import {signup} from '../api/signup.js'
import { getDate } from '../util/getDate.js'


export async function signupAction({request}){
    const formData = await request.formData()
    const name = formData.get("name")
    const email = formData.get("email")
    const username = formData.get("username")
    const password = formData.get("password")
    

    try{
        const attempt = await signup({
            name: name,
            email: email,
            username: username,
            password: password,
            created_at: getDate()
        })
       
        if(attempt.error){
            return attempt
        }

        return redirect('/dashboard')

    }catch(err){
        return err
    }
    
}

export function Signup(){
    const error = useActionData()
    
    
    const navigation = useNavigation()

    const status = navigation.state
   
    return (
        <section className="signup-section">
            
            <Form method="POST">
            <div className="signup-form">
                <div className="signup-header">
                <h2>Create your account</h2>
                <p>Get started with Jobstride in a few simple steps</p>
                 </div>
                <div className="label">
                <label htmlFor="name">Full name</label>
                <input id="name" name="name" placeholder="John Doe" required/>
                </div>
                <div className="label">
                 <label htmlFor="email">Email address</label>
                <input type="email" id="email" name="email" placeholder="JohnDoe@org.com" required/>
                </div>
                  <div className="label">
                  <label htmlFor="email">username</label>
                <input id="username" name="username" placeholder="John" required/>
                </div>
                  <div className="label">
                  <label htmlFor="password">Password</label>
                <input id="password" name="password" type="password" required/>
                </div>
                {error &&
                    <div className="error-container">
                  <p>{error.error}</p>
                </div>}
                <div className="signup-button">
                    <button disabled={status !== 'idle'}>
                       { status !== 'idle' && 
                        <div className="loader">

                        </div>}
                        {status !== 'idle' ? 'Signing up': 'Sign up'}
                    </button>
                    <div className="login-reminder">
                        <p>
                            Already have an account?
                            <Link to="/">Log in</Link>
                        </p>
                    </div>
                </div>
            </div>
          </Form>
        </section>
    )
}