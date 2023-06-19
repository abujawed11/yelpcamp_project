import React,{ useContext } from 'react'
import { AlertContext } from '../../context/AlertContext'

export default function Alert() {
    const cap = (word) => {
        const lower = word.toLowerCase()
        return lower.charAt(0).toUpperCase() + lower.slice(1)
    }

    const alertdisp = useContext(AlertContext)
    const {alert} = alertdisp
    

    const errorType = (error) => {
      if(alert.type === 'Error' || alert.type === 'Warning'){
        return 'danger'
      }else if(alert.type === 'Success'){
        return 'success'
      }else if(alert.type === 'Info'){
        return 'info'
      }
    }


  return (
    <div id='alert'>
    {alert && <div className='d-flex justify-content-center fixed-top mt-5'>
       <div className={`alert alert-${errorType(alert.type)} alert-dismissible fade show`} role="alert">
        {/* <strong>{cap(alert.type) === 'Danger'?'Error':cap(alert.type)}</strong>: {alert.msg} */}
        <strong>{alert.type}</strong>: {alert.msg}
      </div>
    </div>}
    </div>
  )
}
