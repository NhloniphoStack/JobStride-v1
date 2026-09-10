import briefcase from '../assets/briefcase.png'

export function About(){
    return(
        <section className="about-section">
          
            <div className='about-content'>
                <h2 className='site-name'>JobStride</h2>
                <img src={briefcase} />
                <p>Track your job in one place.</p>

                <p>JobStride helps you save roles 
                    and also update status.

                </p>
                <p>Built as a simple React and Node
                    project
                </p>
               
            </div>

            

        </section>
    )
}