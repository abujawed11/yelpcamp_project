import { createContext,useState } from "react";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";

const ReviewContext = createContext()

const ReviewFetch = (props) => {

    const [fetchRating, setFetchRating] = useState([])

    const fetchReview = async (id) => {
        // const url = `http://localhost:5000/campground/${id}/reviews`
        const url = `/campground/${id}/reviews`
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const resData = await response.json()
        setFetchRating(resData.data.reviews)
        // console.log(resData);

    }


    const postReview = async (id,review,user) => {
        // const url = `http://localhost:5000/campground/${id}/reviews`
        const url = `/campground/${id}/reviews`
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': Cookies.get('user')
            },
            // body: JSON.stringify({ body: revRef.current.value,rating: parseInt(ratRef.current.value)})
            body: JSON.stringify({ ...review,user:user })
        });
        const resData = await response.json()
        if(resData.success){
            setFetchRating([...fetchRating, resData.data])
        }
        // if (Cookies.get('user')) {
        //     setLogged([...Logged,res.data])
        // }
        // setReview({ body: '', rating: 0 })
        // showAlert('Success', 'Your review posted')
    }



    return(
        <ReviewContext.Provider value={{fetchReview,fetchRating,setFetchRating,postReview}}>
            {props.children}
        </ReviewContext.Provider>
    )
}

export default ReviewFetch
export {ReviewContext}