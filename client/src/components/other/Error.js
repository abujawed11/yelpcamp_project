import React, { useContext } from 'react'
import { DbContext } from '../../context/DbContext'

export default function Error(props) {

    const errorMsg = useContext(DbContext)
    const {error} = errorMsg

    // console.log(error);
    return (
        <div className='row mt-5'>
            <div className="col-md-6 offset-3">
                <div className="alert alert-danger" role="alert">
                    <h4 className="alert-heading">{error.type === 'CastError'?'400!':'404!'}</h4>
                    <p>{error.type === 'CastError'?'Page Not Found':'Something wen wrong'}</p>
                    <hr />
                    {/* <p className="mb-0">Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p> */}
                </div>
            </div>
        </div>
    )
}
