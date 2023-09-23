import { useState } from "react"

export const useForm = (addUser) => {

    const [formState, setFormState] = useState(addUser)



    const onInputChange=({target})=>{
        const { name, value } = target
        setFormState({
            ...formState,
            [name]: value
        })
    }


  return {
    ...formState,
    formState,
    onInputChange
  }
}
