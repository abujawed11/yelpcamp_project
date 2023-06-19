import React, { useRef, useContext, useEffect, useState } from 'react'
import { DbContext } from '../../context/DbContext'
import { useNavigate, Link } from 'react-router-dom'
import { useFormik } from 'formik'
import { campSchema } from '../../schema/index'
import '../../App.css'
import { AlertContext } from '../../context/AlertContext'
import { AuthContext } from '../../context/AuthContext'


export default function NewCamp() {

    const titleRef = useRef(null)
    const locRef = useRef(null)
    const ImgRef = useRef(null)
    const descRef = useRef(null)
    const priceRef = useRef(null)
    const navigate = useNavigate()

    const camps = useContext(DbContext)
    const { addCamp } = camps

    const login = useContext(AuthContext)
    const { loginData } = login

    const alert = useContext(AlertContext)
    const { showAlert } = alert

    // const [user, setUser] = useState({
    //     title: '',
    //     location: '',
    //     image: '',
    //     price: '',
    //     description: ''
    // })

    const initialValues = {
        title: '',
        location: '',
        image: '',
        price: '',
        description: '',
        author: ''
    }

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: campSchema,
        onSubmit: (values) => {
            addCamp(values, loginData.username)
            showAlert('Success', 'New Campground added')
        }

    })

    // const handleChange = (e) => {
    //     const name = e.target.name
    //     const value = e.target.value
    //     setUser({ ...user, [name]: value })
    //     // console.log({[name]:value});
    // }






    // useEffect(() => { }, [])

    const handleSubmitBtn = (e) => {
        e.preventDefault()
        // addCamp(titleRef.current.value, locRef.current.value, ImgRef.current.value, priceRef.current.value, descRef.current.value)
        // addCamp(user)
        // navigate('/campgrouds')
        // console.log(addedData);
        // setDidMount(true)
        // console.log(add)
        // const getId = add.id;
        // navigate(`/campgrouds/${getId}`)
    }

    //   useEffect(()=>{
    //     {didMount && console.log(add)}
    //     setDidMount(false)
    //   },[handleSubmit])

    // const myAdd = document.getElementById('add')
    // if(myAdd){
    //     myAdd.addEventListener('mouseover', () => {
    //         myAdd.style.backgroundColor = 'red'  
    // })}


    return (
        <div className='container'>
            <div className='row'>
                <h1 className='text-center my-3'>New Campground</h1>
                <div className="col-6 offset-3">
                    <form onSubmit={handleSubmit} noValidate className='needs-validation'>
                        <div className='mb-3'>
                            <label htmlFor="title" className="form-label">Title</label>
                            <input type="text" autoComplete='off' id='title' className={`form-control ${errors.title && touched.title ? 'is-invalid' : ''} ${touched.title && 'is-valid'}`} ref={titleRef} name='title' value={values.title} onBlur={handleBlur} onChange={handleChange} required />
                            {errors.title && touched.title ? <p className='red'>
                                {errors.title}
                            </p> : ''}
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="location" className="form-label">Location</label>
                            <input type="text" autoComplete='off' id='location' className={`form-control ${errors.location && touched.location ? 'is-invalid' : ''} ${touched.location && 'is-valid'}`} ref={locRef} name='location' value={values.location} onBlur={handleBlur} onChange={handleChange} required />
                            {errors.location && touched.location ? <p className='red'>
                                {errors.location}
                            </p> : ''}
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="imgurl" className="form-label">Image Url</label>
                            <input type="text" id='imgurl' autoComplete='off' className={`form-control ${errors.image && touched.image ? 'is-invalid' : ''} ${touched.image && 'is-valid'}`} ref={ImgRef} name='image' value={values.image} onBlur={handleBlur} onChange={handleChange} required />
                            {errors.image && touched.image ? <p className='red'>
                                {errors.image}
                            </p> : ''}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="price" className="form-label">Price</label>
                            <div className="input-group">
                                <span className="input-group-text" id="price-label">$</span>
                                <input type="text" id='price' autoComplete='off' name='price' value={values.price} onBlur={handleBlur} onChange={handleChange} className={`form-control ${errors.price && touched.price ? 'is-invalid' : ''} ${touched.price && 'is-valid'}`} placeholder="0.00" ref={priceRef} aria-label="Username" aria-describedby="price-label" required />
                            </div>
                            {errors.price && touched.price ? <p className='red'>
                                {errors.price}
                            </p> : ''}
                        </div>

                        <div className='mb-3'>
                            <label htmlFor="desc" className="form-label">Description</label>
                            <textarea type="text" id='desc' autoComplete='off' className={`form-control ${errors.description && touched.description ? 'is-invalid' : ''} ${touched.description && 'is-valid'}`} ref={descRef} name='description' value={values.description} onBlur={handleBlur} onChange={handleChange} required></textarea>
                            {errors.description && touched.description ? <p className='red'>
                                {errors.description}
                            </p> : ''}
                        </div>



                        <button type="submit" id='add' className='btn btn-success' >Add Campground</button>

                    </form>
                    <div className="my-2">
                        <Link to={'/campgrounds'}>Back to Campgrounds</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
