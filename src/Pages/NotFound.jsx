import { Link } from "react-router"

export function NotFound(){
    return(
        
        <section className="notfound-section">
        <div className='not-found'> 
            <h2>
                Sorry, the page you were
                looking for was not found.

            </h2>
            <Link  to="/">Return to home</Link>
         </div>
    </section>
    )
}