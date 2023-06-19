import * as Yup from 'yup'

export const campSchema = Yup.object({
    title:Yup.string().min(3).max(25).required("Please enter the Title"),
    location: Yup.string().min(4).max(30).required("Please enter the Location"),
    image: Yup.string().min(4).required("Please enter Image Url"),
    price:Yup.number('Price must be number').min(0).required('Please Enter the Price').typeError('Price should be number'),
    description:Yup.string().min(5).max(200).required("Please enter the Description")
})