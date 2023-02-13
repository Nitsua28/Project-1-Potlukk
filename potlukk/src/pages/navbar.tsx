import { Link } from "react-router-dom";




export function NavBar(){


    return <>
        <div>
        <Link to="/">Home</Link>
        <Link to="/home">Home</Link>
        <Link to="/registration">Register</Link>
        <Link to="/guest">Guest</Link>
        <Link to="/host">Host</Link>
        </div>
        
    </>
}