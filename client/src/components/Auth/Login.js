import React, { useContext, useEffect, useRef, useState } from 'react'
import { AlertContext } from '../../context/AlertContext'
import { useNavigate } from 'react-router-dom'
import {AuthContext} from '../../context/AuthContext'
import Cookies from 'js-cookie'


export default function Login() {

    const alert = useContext(AlertContext)
    const {showAlert} = alert

    const login = useContext(AuthContext)
    const {loginUser,accError,setAccError} = login

    const navigate = useNavigate()
    const closeRef = useRef('')
    const submitRef = useRef('')
    // const [accError, setAccError] = useState(null)
    const handleSubmit = () => {
        submitRef.current.click()
    }

    const closehandle = () => {
        setLoginData({ username: '', password: '' })
        setAccError(null)
    }


    // const loginUser = async () => {
    //     const url = 'http://localhost:5000/login'
    //     const response = await fetch(url, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({ ...loginData })
    //     })
    //     const resData = await response.json()
    //     if (resData.success) {
    //         // localStorage.setItem('token', resData.Token)
    //         Cookies.set('user', resData.Token)
    //         closeRef.current.click()
    //         showAlert('Success', 'You Logged in successfully')
    //         setLoginData({ username: '', password: '' })
    //         navigate('/campgrounds')
    //         // console.log(Cookies.get())
    //     }else{
    //         setAccError(resData.error)
    //         setLoginData({ username: '', password: '' })
    //     }
    // }

    const handleLogin = async (e) => {
        e.preventDefault()
        let log = await loginUser(loginData)
        if(log){
            closeRef.current.click()
        }
        // console.log(log)

    }
    const [loginData, setLoginData] = useState({ username: '', password: '' })
    const handleOnChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setLoginData({ ...loginData, [name]: value })
        setAccError(null)
        // setFormErrors(validate(loginData))
        // console.log(loginData)
    }

    return (
        <div>
            <div className="modal fade" id="login" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header flex-column">
                            <h5 className="modal-title" id="exampleModalLabel" style={{ fontSize: '2rem' }}>Login</h5><p className='red'>{accError}</p>
                            {/* <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleLogin}>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">Username:</label>
                                    <input type="text" autoComplete='off' className={`form-control`} value={loginData.username} onChange={handleOnChange} id="lusername" name='username' />
                                    {/* <p className='red'>{formErrors.username}</p> */}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password:</label>
                                    <input type="password" name='password' autoComplete='off' className="form-control" value={loginData.password} onChange={handleOnChange} id="lpassword" />
                                    {/* <p className='red'>{formErrors.password}</p> */}
                                </div>

                                <button type="submit" ref={submitRef} hidden className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" onClick={closehandle} ref={closeRef} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" onClick={handleSubmit} className="btn btn-primary">Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


