import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { AlertContext } from "./AlertContext";

const AuthContext = createContext()

const AuthCheck = (props) => {
    const alert = useContext(AlertContext)
    const {showAlert} = alert
    const [loginData, setLoginData] = useState({})
    const [type, setType] = useState('')
    const [accError, setAccError] = useState(null)

    const loginUser = async (inputLog) => {
        // const url = 'http://localhost:5000/login'
        const url = '/login'
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...inputLog })
        })
        const resData = await response.json()
        if (resData.success) {
            Cookies.set('user', resData.Token)
            showAlert('Success', 'You Logged in successfully')
            setLoginData(resData.userData)
            // console.log(resData.userData)
            return true
            // navigate('/campgrounds')
            // console.log(Cookies.get())
        } else {
            setAccError(resData.error)
            return false
            // setLoginData({ username: '', password: '' })
        }
    }

    const getUserDetails = async ()=> {
        // const url = 'http://localhost:5000/userdetails'
        const url = '/userdetails'
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': Cookies.get('user')
            }
            // body: JSON.stringify({ ...inputLog })
        })
        const det = await response.json()
        // console.log(det)
        setLoginData(det.userData)
    }

    useEffect(() => {
        if(Cookies.get('user')){
            getUserDetails()
        }else{
            setLoginData({})
        }
    },[])


    return (
        <AuthContext.Provider value={{loginUser,accError,setAccError,loginData,setLoginData}}>
            {props.children}
        </AuthContext.Provider>
    )

}

export default AuthCheck
export {AuthContext}
