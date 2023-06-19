import Cookies from 'js-cookie'
import React, { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AlertContext } from '../../context/AlertContext'
import { AuthContext } from '../../context/AuthContext'
import {ReviewContext} from '../../context/ReviewContext'
import StarRating from '../other/StarRating'
export default function Review(props) {

    const alert = useContext(AlertContext)
    const { showAlert } = alert

    const login = useContext(AuthContext)
    const {loginData} = login

    const rev = useContext(ReviewContext)
    const {fetchReview,fetchRating,setFetchRating,postReview} = rev

    // const [Logged, setLogged] = useState([])
    // const [otherLogged, setOtherLogged] = useState([])
    // const [notLogged, setNotLogged] = useState([])
    const [review, setReview] = useState({
        body: '', rating: 0
    })
    const [formErrors, setFormErrors] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)
    // const [fetchRating, setFetchRating] = useState([])
    // const [seed,setSeed] = useState(1)
    // const navigate = useNavigate()

    const { id } = useParams()
    const handleOnchange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setReview({ ...review, [name]: value })
        // console.log(review);

    }



    // const fetchRevUser = async () => {
    //     let auth = ''
    //     if (Cookies.get('user')) {
    //         auth = Cookies.get('user')
    //     }
    //     const url = `http://localhost:5000/campground/${id}/reviews`
    //     const response = await fetch(url, {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'auth-token': auth
    //         },
    //         credentials: "include"
    //     });
    //     const res = await response.json()
    //     // console.log(res);
    //     if (Cookies.get('user')) {
    //         setLogged(res.LoggedIn)
    //         setOtherLogged(res.other)
    //     } else {
    //         setNotLogged(res.data)
    //     }
    //     // console.log(res);
    // }


    // const postReview = async () => {
    //     const url = `http://localhost:5000/campground/${id}/reviews`
    //     const response = await fetch(url, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'auth-token': Cookies.get('user')
    //         },
    //         // body: JSON.stringify({ body: revRef.current.value,rating: parseInt(ratRef.current.value)})
    //         body: JSON.stringify({ ...review })
    //     });
    //     const res = await response.json()
    //     // setFetchRating([...fetchRating, resData.data])
    //     if (Cookies.get('user')) {
    //         setLogged([...Logged,res.data])
    //     }
    //     setReview({ body: '', rating: 0 })
    //     showAlert('Success', 'Your review posted')
    // }

    // function refreshPage() {
    //     window.location.reload(false);
    // }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!Cookies.get('user')) {
            showAlert('Error', 'Login to Post your Review')
        }
        else {
            setFormErrors(validate(review))
            setIsSubmit(true)
        }

    }



    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            postReview(id,review,loginData.username)
            setReview({ body: '', rating: 0 })
            // navigate(`/campgrounds/${id}`)
        }

    }, [formErrors])

    const validate = (values) => {
        const error = {}
        if (!values.body) {
            error.body = "Review is required"
        }

        return error
    }

    // const fetchReview = async () => {
    //     const url = `http://localhost:5000/campground/${id}/reviews`
    //     const response = await fetch(url, {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     });
    //     const resData = await response.json()
    //     setFetchRating(resData.data.reviews)
    //     // console.log(resData);

    // }

    useEffect(() => {
        fetchReview(id)
        // fetchRevUser()
    }, [])

    const handleDelete = async (revId) => {
        // const url = `http://localhost:5000/campground/${id}/reviews/${revId}`
        const url = `/campground/${id}/reviews/${revId}`
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const resData = await response.json()
        const newNote = fetchRating.filter(e => e._id !== revId)
        // console.log(newNote);
        setFetchRating(newNote)
        showAlert('Info', 'Your review has been Deleted')
        // fetchReview()
    }

    return (
        <div>
            <h2 className='my-2'>Leave a Review</h2>
            {/* <h1>{loginData.username}</h1> */}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    {/* <StarRating selected='not' setReview={setReview} review={review}/> */}
                    <label className='form-label' htmlFor="range">Rating</label>
                    <input className='form-range' value={review.rating} onChange={handleOnchange} type="range" min={0} max={5} name="rating" id="range" />
                </div>
                <div className="mb-3">
                    <label className='form-label' htmlFor="body">Review</label>
                    <textarea name="body" value={review.body} onChange={handleOnchange} className='form-control' placeholder='Write your review here' id="body" cols="30" rows="3"></textarea>
                    <p className='red'>{formErrors.body}</p>
                </div>

                <button className="btn btn-success">Submit Review</button>
            </form>

            {fetchRating.map((e, i) => {
                return (
                    <div className='card my-3' key={i}>
                        <div className="card-body">
                            <div className="d-flex justify-content-between"><h5 className="card-title">Rating: {e.rating} <span className="badge bg-danger">By: {e.user}</span></h5>
                            {loginData.username === e.user && <i className="fa-solid fa-trash" onClick={() => { handleDelete(e._id) }}></i>}
                            </div>
                            <p className="card-text">Review: {e.body}</p>
                        </div>
                    </div>
                )
            })}
            {/* {Cookies.get('user') && otherLogged.map((e, i) => {
                return (
                    <div className='card my-3' key={i}>
                        <div className="card-body">
                            <div className="d-flex justify-content-between"><h5 className="card-title">Rating: {e.rating} <span className="badge bg-danger">By: {e.author.username}</span></h5></div>
                            <p className="card-text">Review: {e.body}</p>
                        </div>
                    </div>
                )
            })}
            {!Cookies.get('user') && notLogged.map((e, i) => {
                return (
                    <div className='card my-3' key={i}>
                        <div className="card-body">
                            <div className="d-flex justify-content-between"><h5 className="card-title">Rating: {e.rating} <span className="badge bg-danger">By: {e.author.username}</span></h5>
                            </div>
                            <p className="card-text">Review: {e.body}</p>
                        </div>
                    </div>
                )
            })} */}



        </div>
    )
}
