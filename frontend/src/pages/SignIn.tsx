import { useState } from 'react';
import login from '../utils/login';

export default function SignIn() {
    const [loggedIn, setLoggedIn] = useState(false)
    const [errorLabel, setErrorLabel] = useState('')

    async function handleSubmit(e: any) {
        e.preventDefault();
    
        const form = e.target;
        const formData = new FormData(form);

        const email = String(formData.get("email"))
        const password = String(formData.get("password"))

        const response = await login(email, password)

        if(response.statusCode !== 200) {
            setErrorLabel(response.message)
        }

        setLoggedIn(true)
    }

    return (
        <div className="sign-in flex flex-col items-center justify-center bg-gray-800 m-10 rounded-lg">
            <form onSubmit={handleSubmit}>
                <div className="py-3 flex flex-col justify-center p-1">
                    <label htmlFor="email" className="text-white font-medium">Enter email: <input type="email" name="email" placeholder="example@email.com" className="px-4 mx-4 text-black rounded-lg"/>
                    </label>
                </div>
                <div className="py-3 flex flex-col justify-center p-1">
                    <label htmlFor="password" className="text-white font-medium">Enter password: <input type="password" name="password" placeholder="********" className="px-4 mx-4 text-black rounded-lg"/>
                    </label>
                </div>
                <label className="font-medium text-rose-500">{errorLabel}</label>
                <button type="submit" className="my-2 w-full hover:bg-violet-600 text-white outline outline-violet-600 font-medium">Sign in</button>
            </form>
        </div>
    )
}