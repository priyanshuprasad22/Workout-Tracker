import { Link } from 'react-router-dom'
import { useLogOut } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'


const Navbar = ()=>{

    const { logout }=useLogOut()
    const { user } = useAuthContext()

    const handleClick = () =>{
        logout()
    }

    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1>
                        Workout Tracker
                    </h1>
                </Link>
                <nav>
                    {user && (
                        <div>
                        <span>{user.email}</span>
                        <button onClick={handleClick}>
                            LogOut
                        </button>
                    </div>
                    )}
                    {!user &&(
                        <div>
                        <Link to = "/login">Login</Link>
                        <Link to = "/signup">SignUp</Link>
                        </div>
                    )}
                    
                </nav>
            </div>
        </header>
    )

}

export default Navbar