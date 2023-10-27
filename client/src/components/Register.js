import React from "react"
import { useState } from "react"
import useRegister from "../hooks/useRegister"
import "./Register.css"

export default function Register () {
    // states containing info
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const {register, error, isLoading} = useRegister()

    // attempt to register user on form submission
    const handleSubmit = () => {
        register(email, password)
    }
    return (
        <div>
        <form name="login-form">

            <label htmlFor="email">Email</label>
            <input 
                type="email" 
                onChange={(e) => setEmail(e.target.value)} 
                value={email}
                name="email" 
                className="field" 
                required
            />
            
            <label htmlFor="password">Password</label>
            <input 
                type="password" 
                name="password" 
                onChange={(e) => setPassword(e.target.value)} 
                value={password}
                className="field" 
                required
            />

            {error && <div>Sorry, email is already in use.</div> }

        </form>
        <button onClick={() => handleSubmit()}>
            Submit
        </button>
        </div>
    );
}