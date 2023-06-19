import React,{useContext, useEffect} from 'react'
import { Link,useNavigate,useLocation } from 'react-router-dom'
import { AlertContext } from '../../context/AlertContext'
import { AuthContext } from '../../context/AuthContext'
import Cookies from 'js-cookie'
import account from './account.png'


export default function Navbar() {

    const login = useContext(AuthContext)
    const {loginData,setLoginData} = login

    const alert = useContext(AlertContext)
    const navigate = useNavigate()
    let location = useLocation()
    const {showAlert} = alert
    const logOut = () => {
        localStorage.removeItem('token')
        Cookies.remove('user')
        setLoginData({})
        showAlert('Success', 'You Logged out successfully')
        // console.log(Cookies.get())
        navigate('/campgrounds')
    }

    const newCamp = () => {
        if(!Cookies.get('user')){
            showAlert('Warning','You must sign in to Add new Camp')
            // console.log(location.pathname)
        }
    }
    // useEffect(()=>{
    //     if(!Cookies.get('user')){
    //         setLoginData({});
    //     }
    // },[])


    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="#">YelpCamp</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <Link className="nav-link" aria-current="page" to="/">Home</Link>
                            <Link className="nav-link" to="/campgrounds">Campgrounds</Link>
                            <Link className="nav-link" onClick={newCamp} to={Cookies.get('user') ? `/campgrounds/new` : `${location.pathname}`}>New Campground</Link>
                        </div>
                    </div>
                    <div className="d-flex">
                        {/* <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#login">
                            Launch demo modal
                        </button> */}
                        {Cookies.get('user') && <img id='myAcc' data-bs-toggle="modal" data-bs-target="#userdtl" src={account} alt="" />}
                        {!Cookies.get('user') ? <>
                         <button className="btn btn-outline-success mx-2 px-3" data-bs-toggle="modal" data-bs-target="#login">Login</button>
                        <button className="btn btn-success mx-2 px-3" data-bs-toggle="modal" data-bs-target="#signup">Sign Up</button>
                        </> : <button className="btn btn-danger mx-2 px-3" onClick={logOut}>Log Out</button>}
                        
                    </div>
                </div>
            </nav>
        </>
    )
}
