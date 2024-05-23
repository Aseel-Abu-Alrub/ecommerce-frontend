import * as Yup from 'yup'

export const registerSchema=Yup.object({
    userName:Yup.string().required("please enter user name!").min(3,"username must between 3 and 20 characters").max(20,"username must between 3 and 20 characters"),
    email:Yup.string().required("please enter your email !").email("not valid email"),
    password:Yup.string().required("please enter your password").matches(/^[A-Z][a-z0-9]{3,8}$/,"password must start uppercase, and minimum 9 character"),
    cPassword:Yup.string().required("please confirm password").oneOf([Yup.ref("password")],"not match password")
})