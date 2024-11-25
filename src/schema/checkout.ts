import * as Yup from 'yup';

export const checkoutSchema = Yup.object({
    fullname: Yup.string().required("Fullname is required"),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    country: Yup.string().required("Country is required"), 
    address: Yup.string().required("Address is required"), 
    phone: Yup.number().required("Phone number is required"), 
})