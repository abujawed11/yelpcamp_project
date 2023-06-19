import React, { useContext, useEffect, useState } from 'react'
import { DbContext } from '../../context/DbContext'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Review from './Review'
import { AlertContext } from '../../context/AlertContext'
import { CampContext } from '../../context/CampContext'
import { AuthContext } from '../../context/AuthContext'
import Cookies from 'js-cookie'
import StarRating from '../other/StarRating'




export default function Show() {

    const campd = useContext(CampContext)
    const { getCampDet, campData } = campd

    const login = useContext(AuthContext)
    const { loginData } = login

    // const [userName, setUserName] = useState({})
    // const [type, setType] = useState('')
    const [data, setData] = useState({})
    const camp = useContext(DbContext)
    const { campDet, deleteCamp, setError } = camp
    const navigate = useNavigate()
    const alert = useContext(AlertContext)
    const { showAlert } = alert
    const { id } = useParams()

    const handleDelete = () => {
        // if (localStorage.getItem('token')) {
        deleteCamp(campData._id)
        showAlert('Info', 'Campground Deleted')
        navigate('/campgrounds')
        // } else {
        //     showAlert('Warning', 'You must sign in to Delete the Camp')
        // }


    }

    // const authCheck = () => {
    //     if (!localStorage.getItem('token')) {
    //         showAlert('Warning', 'You must sign in to Edit the Camp')
    //     }
    // }


    // setData(campDet)

    // const getCampDet = async () => {
    //     let auth = ''
    //     if (Cookies.get('user')) {
    //         auth = Cookies.get('user')
    //     }
    //     const url = `http://localhost:5000/campgrounds/${id}`
    //     const response = await fetch(url, {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'auth-token': auth
    //         },
    //         credentials: "include"
    //     });
    //     const res = await response.json()

    //     if (res.success) {
    //         setData(res.data)
    //         setUserName(res.user)
    //         setType(res.Type)
    //         // console.log(userName)
    //     } else {
    //         setError(res)
    //         navigate('/error')
    //     }
    //     //    console.log(res)
    // }



    useEffect(() => {
        getCampDet(id)
    }, [])



    return (
        <>
            <div className='container'>
                <div className="row mt-3">
                    <div className="col-md-6">
                        {/* <h1>{type}</h1> */}
                        <div className="card" >
                            <img src={campData.image} style={{ maxHeight: '50%' }} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">{campData.title}</h5>
                                <p className="card-text">{campData.description}</p>
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item text-muted">{campData.location}</li>
                                <li className="list-group-item">${campData.price}/night</li>
                            </ul>
                            {loginData.username == campData.user && <div className="card-body">
                                {/* <a href="#" className="card-link">Card link</a> */}
                                {/* <Link className="card-link btn btn-info" onClick={authCheck} to={localStorage.getItem('token') ? `/campgrounds/${data._id}/edit` : `/campgrounds/${data._id}`}>Edit</Link> */}
                                <Link className="card-link btn btn-info" to={`/campgrounds/${campData._id}/edit`}>Edit</Link>
                                <button className="card-link btn btn-danger" onClick={handleDelete}>Delete</button>
                                {/* <a href="#" className="card-link">Another link</a> */}
                            </div>}
                            <div className="card-footer">
                                <small className="text-muted">Submitted By: {campData.user}</small>
                            </div>
                        </div>

                    </div>
                    <div className="col-md-6">
                        <Review campdata={campData} />
                    </div>
                </div>
            </div>


        </>
    )
}
