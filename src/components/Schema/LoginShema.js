import * as Yup from 'yup'

export const loginShema=Yup.object({
  email:Yup.string().required("email is required").email("not valid email"),
  password:Yup.string().required("password is required")
})