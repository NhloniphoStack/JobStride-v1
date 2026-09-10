import { 
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider

 } from "react-router"

import { Login } from "./Pages/Login.jsx"
import { loginAction } from "./Pages/Login.jsx"
import { Dashboard } from "./Pages/Dashboard.jsx"
import { dashboardLoader } from "./Pages/Dashboard.jsx"
import { AuthProvider } from "./Components/AuthProvider.jsx"
import { authLoader } from "./Components/AuthProvider.jsx"
import { UserLayout } from "./Components/UserLayout.jsx"
import { AddApplication } from "./Pages/AddApplication.jsx"
import { addApplictionAction } from "./Pages/AddApplication.jsx"
import { Applications } from "./Pages/Applications.jsx"
import { applicationsLoader } from "./Pages/Applications.jsx"
import { ApplicationDetails } from "./Pages/ApplicationDetails.jsx"
import { detailsLoader } from "./Pages/ApplicationDetails.jsx"
import { EditApplication } from "./Pages/EditApplication.jsx"
import { editLoader } from "./Pages/EditApplication.jsx"
import { editAction } from "./Pages/EditApplication.jsx"
import { Signup } from "./Pages/Signup.jsx"
import { signupAction } from "./Pages/Signup.jsx"
import { About } from "./Pages/About.jsx"
import { NotFound } from "./Pages/NotFound.jsx"

const router = createBrowserRouter(createRoutesFromElements(
  <>
    <Route path="*" element={<NotFound />} />
    <Route path="/" element={<Login />} action={loginAction}/>
         <Route path="" element={<AuthProvider />} loader={authLoader}>
         <Route path="" element={<UserLayout />}>
              <Route path="/dashboard" element={<Dashboard />} loader={dashboardLoader}/>
              <Route path="/add" element={<AddApplication />}  action={addApplictionAction}/>
            <Route path="/applications" element={<Applications />} loader={applicationsLoader}/>
            <Route path="/applications/:id" element={<ApplicationDetails />} loader={detailsLoader}/>
             <Route path="/applications/:id/edit" element={<EditApplication />} loader={editLoader} action={editAction}/>
           <Route path="/about" element={<About />} />

    </Route>
    </Route>
    <Route path="/signup" element={<Signup />} action={signupAction}/>
  </>
))

function App() {
  
  return (
    <RouterProvider router={router} />
  )

}

export default App
