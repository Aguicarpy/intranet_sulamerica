import { useState } from "react"

export const useForm = (addUser) => {

    const [formState, setFormState] = useState(addUser)



    const onInputChange=({target})=>{
        const { name, value } = target
        const newValue = name === "locals" ? [...formState[name], value] : value;
        setFormState({
            ...formState,
            [name]: newValue
        })
    }


  return {
    ...formState,
    formState,
    setFormState,
    onInputChange
  }
}
