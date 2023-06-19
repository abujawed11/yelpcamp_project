import { createContext, useState } from "react";

const AlertContext = createContext()

const AlertShow = (props) => {

    const [alert, setAlert] = useState(null)
    const showAlert = (type, message) => {
        setAlert({
            type: type,
            msg: message
        })
        setTimeout(() => {
            setAlert(null)
        }, 2000)
    }


    return (
        <AlertContext.Provider value={{ alert,showAlert }}>
            {props.children}
        </AlertContext.Provider>
    )
}

export default AlertShow
export { AlertContext }