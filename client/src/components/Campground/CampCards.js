import React,{useState,useContext,useEffect} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import '../../App.css'
// import Show from './Show'
import { DbContext } from '../../context/DbContext'
import Show from './Show'

export default function CampCards(props) {
    // const navigate = useNavigate()
    const [active,setActive] = useState('Show')
    const camps = useContext(DbContext)
    const { getCampGrd} = camps


    // useEffect(() => {
    //     document.title = 'Campgrounds'
    //     getCampGrd()
    // }, [])

    const { camp } = props
    return (
        <>
        <div className='row my-2'>
            <div className="col-md-4">
                <img src={camp.image} alt="" />
            </div>
            <div className="col-md-8">
                <div className="card-body">
                    <h5 className="card-title">{camp.title}</h5>
                    <p className="card-text">{camp.description}</p>
                    <p className="card-text">
                        <small className="text-muted">{camp.location}</small>
                    </p>
                    <Link className='btn btn-primary' to={`${camp._id}`}>View {camp.title}</Link>
                    {/* <Link className='btn btn-primary'  onClick={<Show camp={camp}/>} to={`${camp._id}`} >View {camp.title}</Link> */}
                    {/* <button onClick={()=>{<Show camp={camp}/>}}>View</button> */}
                </div>
            </div>
        </div>
        </>
    )
}
