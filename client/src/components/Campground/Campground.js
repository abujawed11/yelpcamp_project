import React, { useContext, useEffect, useState } from 'react'
import { DbContext } from '../../context/DbContext'
import { Link } from 'react-router-dom'
import CampCards from './CampCards'
import Show from './Show'

export default function Campground(props) {

    const camps = useContext(DbContext)
    const { grounds, getCampGrd } = camps
    const [active,setActive] = useState('Show')


    useEffect(() => {
        document.title = 'Campgrounds'
        getCampGrd()
    }, [])

    return (
        <div className='container'>
            <h1 className='text-center mt-2 mb-4'>All Campgrounds</h1>

            {grounds.map((camp,ind) => {
                return (
                        <CampCards key={ind} camp={camp}/>
                )
            })}

        </div>
    )
}
