import { useState } from "react"

// since this is a hook, it should technically be using a useAuthContext, but we are leaving it this way for now
export default function useRegister() {
    const baseURL = "http://127.0.0.1:5000"
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    // const {dispatch} = useAuthContext()

    const register = async (email, password) => {
        // used for error handling
        setIsLoading(true)
        setError(null)

        // POST request into db
        const response = await fetch(baseURL + '/api/user/register/', {
            method: "POST",
            headers: {"content-type": "application/json"},
            body: JSON.stringify({email, password})
        })

        // logging the response data
        console.log(response)
        
        const json = await response.json()
        
        // checking response
        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        if (response.ok) {
            // save user to local storage
            // localStorage.setItem("user", JSON.stringify(json))

            // // update auth context
            // dispatch({type: "LOGIN", payload: json})
            setIsLoading(false)
        }
    }

    return {register, isLoading, error}
}