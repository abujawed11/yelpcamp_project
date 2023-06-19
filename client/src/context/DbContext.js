import { createContext, useState,useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { AlertContext } from './AlertContext'

const DbContext = createContext()

const DbFetch = (props) => {

    const alert = useContext(AlertContext)
    const {showAlert} = alert
    const [error, setError] = useState({})
    const notesInitial = []
    const [grounds, setGrounds] = useState(notesInitial)
    const [campDet, setCampDet] = useState({})
    const navigate = useNavigate()

    //fetching camp ground
    const getCampGrd = async () => {
        // const url = 'http://localhost:5000/campgrounds'
        const url = '/campgrounds'
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const getData = await response.json()
        // console.log(getData.data)
        if (getData.success) {
            setGrounds(getData.data)
        }
        else {
            setError(getData)
            navigate('/error')
        }

        // console.log(grounds)
    }

    //fetch campground det
    // const getCampDet = async (id) => {
    //     const url = `http://localhost:5000/campgrounds/${id}`
    //     const response = await fetch(url, {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     });
    //     const data = await response.json()
    //       console.log('I am also here')
    //     setCampDet(data)

    // }
    //Adding new camp
    const addCamp = async (camp,user) => {
        const { title, location, image, price, description } = camp
        // const url = `http://localhost:5000/campgrounds`
        const url = `/campgrounds`
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token' : Cookies.get('user')
            },
            body: JSON.stringify({ title, location, image, price, description,user:user })
        });
        const resData = await response.json()
        //   console.log(data._id)
        if (resData.success) {
            setCampDet(resData)
            navigate(`/campgrounds/${resData.data._id}`)
        }else{
            setError(resData)
            navigate('/error')
        }
        // getCampDet(data._id)
    }





    // const addCamp = async (title, location, image, price, description) => {
    //     const url = `http://localhost:5000/campgrounds`
    //     const response = await fetch(url, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({ title, location, image, price, description })
    //     });
    //     const data = await response.json()
    //     //   console.log(data._id)
    //     setCampDet(data)
    //     navigate(`/campgrounds/${data._id}`)
    //     // getCampDet(data._id)
    // }





    //Update Camp
    // const updateCamp = async (camp) => {
    //     const {id, title, location, image, price, description} = camp
    //     console.log(camp)
    //     console.log(id)
    //     const url = `http://localhost:5000/campground/${id}`
    //     // const url = 'http://localhost:5000/campground/638ed96476131a52d57e8f3f'
    //     const response = await fetch(url, {
    //         method: 'PUT',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({ title, location, image, price, description })
    //     });
    //     const data = await response.json()
    //     setCampDet(data)
    //     navigate(`/campgrounds/${data._id}`)
    // }



    // const updateCamp = async (id, title, location, image, price, description) => {
    //     const url = `http://localhost:5000/campground/${id}`
    //     const response = await fetch(url, {
    //         method: 'PUT',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'auth-token' : Cookies.get('user')
    //         },
    //         body: JSON.stringify({ title, location, image, price, description })
    //     });
    //     const resData = await response.json()
    //     if(resData.success){
    //         setCampDet(resData)
    //         navigate(`/campgrounds/${resData.data._id}`)
    //         showAlert('Success','Campground Successfully updated')

            
    //     }else{
    //         navigate('/campgrounds')
    //         showAlert('Error','You are not Authrised to update')

    //     }
    //     // navigate(`/campgrounds/${data._id}`)

    // }





    //Delete
    const deleteCamp = async (id) => {
        // const url = `http://localhost:5000/campground/${id}`
        const url = `/campground/${id}`
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token' : Cookies.get('user')
            }
            // body: JSON.stringify({ title, location })
        });

    }



    return (
        <DbContext.Provider value={{ grounds, getCampGrd, campDet, addCamp, deleteCamp, error, setError }}>
            {props.children}
        </DbContext.Provider>
    )
}

export default DbFetch
export { DbContext }