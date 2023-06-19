import Cookies from 'js-cookie'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { AlertContext } from '../../context/AlertContext'

export default function SignUp() {

    const alert = useContext(AlertContext)
    const { showAlert } = alert
    const closeRef = useRef('')
    const [formErrors, setFormErrors] = useState({})
    const [accError,setAccError] = useState(null)
    const [isSubmit, setIsSubmit] = useState(false)
    const [loginData, setLoginData] = useState({
        username: '',
        email: '',
        password: ''
    })
    const handleOnChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setLoginData({ ...loginData, [name]: value })
        setAccError(null)
        // setFormErrors(validate(loginData))
        // console.log(loginData)
    }

    const signUpUser = async () => {
        // const url = `http://localhost:5000/signup`
        const url = `/signup`
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...loginData })
        });
        const resData = await response.json()
        // console.log(resData.success)
        if (resData.success) {
            // localStorage.setItem('token',resData.Token)
            Cookies.set('user', resData.Token)
            closeRef.current.click()
            showAlert('Success', 'You signed up successfully')
            setLoginData({username: '',email: '',password: ''})
        }else{
            setAccError(resData.error)
            setLoginData({username: '',email: '',password: ''})
        }

        //     if(resData.success){
        //         console.log('User added')
        //     }
    }

    const closehandle = () => {
        setLoginData({username: '',email: '',password: ''})
        setAccError(null)
    }


    const submitRef = useRef('')
    const handleSubmit = () => {
        submitRef.current.click()
    }

    const handleLogin = (e) => {
        e.preventDefault()
        setFormErrors(validate(loginData))
        setIsSubmit(true)
    }

    const validate = (values) => {
        const error = {}
        const regex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/i
        if (!values.username) {
            error.username = "Username is required"
        } else if (values.username.length < 5) {
            error.username = "Username should be min 5 character"
        }
        if (!values.email) {
            error.email = "Email is required"
        } else if (!regex.test(values.email)) {
            error.email = "Not Valid Email"
        }
        if (!values.password) {
            error.password = "Password is required"
        } else if (values.password.length < 6) {
            error.password = "Password should be min 6 character"
        }
        return error
    }

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            // console.log(loginData)
            signUpUser()
        }
    }, [formErrors])

    // useEffect(() => {
    //     setLoginData({
    //         username: '',
    //         email: '',
    //         password: ''
    //     })
    // }, [])



    return (
        <div>
            <div className="modal fade" id="signup" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header flex-column" >
                            <h5 className="modal-title" id="exampleModalLabel" style={{fontSize:'2rem'}}>Sign-Up </h5><p className='red'>{accError}</p>
                            {/* <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleLogin}>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">Username:</label>
                                    <input type="text" autoComplete='off' className={`form-control`} value={loginData.username} onChange={handleOnChange} id="username" name='username' />
                                    <p className='red'>{formErrors.username}</p>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email:</label>
                                    <input type="text" name='email' autoComplete='off' className="form-control" value={loginData.email} onChange={handleOnChange} id="email" />
                                    <p className='red'>{formErrors.email}</p>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password:</label>
                                    <input type="password" name='password' autoComplete='off' className="form-control" value={loginData.password} onChange={handleOnChange} id="password" />
                                    <p className='red'>{formErrors.password}</p>
                                </div>

                                <button type="submit" ref={submitRef} hidden className="btn btn-primary">Submit</button>
                            </form>


                        </div>
                        <div className="modal-footer">
                            <button type="button" onClick={closehandle} ref={closeRef} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" onClick={handleSubmit} className="btn btn-success">Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
