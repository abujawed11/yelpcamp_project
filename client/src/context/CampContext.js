import { createContext,useState,useContext } from "react";
import Cookies from "js-cookie";


const CampContext = createContext()

const CampFetch = (props) => {

    // const alert = useContext(AlertContext)
    // const { showAlert } = alert
    const [campData, setCampData] = useState({})


    const getCampDet = async (id) => {
        // let auth = ''
        // if (Cookies.get('user')) {
        //     auth = Cookies.get('user')
        // }
        // const url = `http://localhost:5000/campgrounds/${id}`
        const url = `/campgrounds/${id}`
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // 'auth-token': auth
            },
            credentials: "include"
        });
        const res = await response.json()
        setCampData(res.data)

        // console.log(res.data)
        // console.log(res)

        // if (res.success) {
        //     setData(res.data)
        //     setUserName(res.user)
        //     setType(res.Type)
        //     // console.log(userName)
        // } else {
        //     setError(res)
        //     navigate('/error')
        // }
        //    console.log(res)
    }

    const updateCamp = async (camp,id) => {
        const {title, location, image, price, description} = camp
        // const url = `http://localhost:5000/campground/${id}`
        const url = `/campground/${id}`
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token' : Cookies.get('user')
            },
            body: JSON.stringify({ title, location, image, price, description})
        });
        const resData = await response.json()
        // console.log(id, title, location, image, price, description)
        // console.log(resData)
        if(resData.success){
            setCampData(resData.data)      
        }
        // navigate(`/campgrounds/${data._id}`)

    }





    return (
        <CampContext.Provider value={{getCampDet,campData,setCampData,updateCamp}}>
            {props.children}
        </CampContext.Provider>
    )
}

export default CampFetch
export { CampContext }