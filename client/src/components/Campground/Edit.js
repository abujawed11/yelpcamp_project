import React, { useRef, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { DbContext } from '../../context/DbContext'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import { campSchema } from '../../schema/index'
import { useNavigate } from 'react-router-dom'
import '../../App.css'
import { AlertContext } from '../../context/AlertContext'
import { CampContext } from '../../context/CampContext'

export default function Edit() {

    const { id } = useParams()
    const alert = useContext(AlertContext)
    const { showAlert } = alert

    const campd = useContext(CampContext)
    const { getCampDet, campData, setCampData, updateCamp } = campd


    // const [data,setData] = useState({})
    // const [data, setData] = useState([
    //     {
    //         title:'',
    //         location:'',
    //         image:'',
    //         price:'',
    //         description:''
    //     }
    // ])
    const camps = useContext(DbContext)
    const navigate = useNavigate()
    // const { updateCamp, campDet } = camps
    // const titleRef = useRef(null)
    // const locRef = useRef(null)
    // const ImgRef = useRef(null)
    // const descRef = useRef(null)
    // const priceRef = useRef(null)





    // const initialValues = {

    //     title: data.title,
    //     location: data.location,
    //     image: data.image,
    //     price: data.price,
    //     description: data.description
    // }


    // const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    //     initialValues: initialValues,
    //     validationSchema: campSchema,
    //     onSubmit: (values) => { updateCamp(campDet._id, values.title, values.location, values.image, values.price, values.description) }

    // })






    const [user, setUser] = useState(campData)
    //     id: '',
    //     title: '',
    //     location: '',
    //     image: '',
    //     price: '',
    //     description: '',
    //     author:''
    // })
    const [formErrors, setFormErrors] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)


    const onChangeHandle = (e) => {
        const name = e.target.name
        const value = e.target.value
        setUser({ ...user, [name]: value })
        // console.log(user)
        // setCampData({ ...campData, [name]: value })
        // console.log(user);
    }

    const handleSubmitBtn = (e) => {
        e.preventDefault()
        setFormErrors(validate(user))
        setIsSubmit(true)
        // updateSubmit()
        // updateCamp(user._id, user.title, user.location, user.image, user.price, user.description)
        // updateCamp(user)
        // console.log(user)
    }

    // const updateSubmit = () => {
    //     if (Object.keys(formErrors).length === 0 && isSubmit) {
    //         updateCamp(user._id, user.title, user.location, user.image, user.price, user.description)
    //     }
    // }
    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            // updateCamp(user._id, user.title, user.location, user.image, user.price, user.description)
            updateCamp(user, id)
            navigate(`/campgrounds/${user._id}`)
            showAlert('Success', 'Campground Successfully updated')
            // showAlert('Success','Campground Successfully updated')
        }
        // console.log(formErrors)
        // const idSel = document.querySelector('#title')

        // if (!(Object.keys(formErrors).length === 0 && isSubmit)) {
        //     console.log(user)
        //     idSel.classList.add('is-invalid')
        //     idSel.classList.remove('is-valid')
        // }else{
        //     idSel.classList.add('is-valid')
        //     idSel.classList.remove('is-invalid')
        // }
    }, [formErrors])

    const validate = (values) => {
        const error = {}
        // const regex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/
        if (!values.title) {
            error.title = "Title is required"
        } else if (values.title.length < 3) {
            error.title = "Title should be min 3 char"
        }
        if (!values.location) {
            error.location = "Location is required"
        }
        if (!values.image) {
            error.image = "image is required"
        }
        if (!values.price) {
            error.price = "Price is required"
        } else if (isNaN(values.price)) {
            error.price = "Price should be number"
        } else if (values.price < 0) {
            error.price = "Price should be positive"
        }
        if (!values.description) {
            error.description = "Description is required"
        } else if (values.description.length < 6) {
            error.description = "Description should be min 6 char"
        }
        return error
    }

    // let initialValues = {}
    // const getCampDet = async () => {
    //     const url = `http://localhost:5000/campgrounds/${id}`
    //     const response = await fetch(url, {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     });
    //     const res = await response.json()
    //     // console.log(res)
    //     // initialValues = { ...res }
    //     // console.log(initialValues)
    //     setUser(res.data)
    // }


    // const initialValues = {...user}

    // const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    //     initialValues: initialValues,
    //     validationSchema: campSchema,
    //     onSubmit: (values) => { updateCamp(campDet._id, values.title, values.location, values.image, values.price, values.description) }

    // })



    // console.log(initialValues)

    useEffect(() => {
        getCampDet(id)
        // setUser({...user})
        // console.log('hello')
    }, [])



    return (
        <div className='container'>
            <div className='row'>
                <h1 className='text-center my-3'>Edit Campground</h1>
                <div className="col-6 offset-3">

                    <form onSubmit={handleSubmitBtn}>
                        <div className='mb-3'>
                            <label htmlFor="title" className="form-label">Title</label>
                            <input type="text" id='title' className="form-control" value={user.title} onChange={onChangeHandle} name='title' />
                            <p className='red'>{formErrors.title}</p>
                        </div>

                        <div className='mb-3'>
                            <label htmlFor="location" className="form-label">Location</label>
                            <input type="text" id='location' className="form-control" value={user.location} onChange={onChangeHandle} name='location' />
                            <p className='red'>{formErrors.location}</p>
                        </div>

                        <div className='mb-3'>
                            <label htmlFor="imgurl" className="form-label">Image Url</label>
                            <input type="text" id='imgurl' className="form-control" value={user.image} onChange={onChangeHandle} name='image' />
                            <p className='red'>{formErrors.image}</p>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="price" className="form-label">Price</label>
                            <div className="input-group">
                                <span className="input-group-text" id="price-label">$</span>
                                <input type="text" name='price' id='price' className="form-control" placeholder="0.00" value={user.price} onChange={onChangeHandle} aria-label="Username" aria-describedby="price-label" />
                            </div>
                            <p className='red'>{formErrors.price}</p>
                        </div>


                        <div className='mb-3'>
                            <label htmlFor="desc" className="form-label">Description</label>
                            <textarea type="text" id='desc' className="form-control" name='description' value={user.description} onChange={onChangeHandle} ></textarea>
                            <p className='red'>{formErrors.description}</p>
                        </div>

                        <button type="submit" className='btn btn-success' >Update Campground</button>

                    </form>
                    <div className="my-2">
                        <Link to={`/campgrounds/${user._id}`}>Back</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
