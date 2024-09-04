export default async function login(email: string, password: string) {
    console.log(email, password)
    const response = await fetch(`http://localhost:${process.env.REACT_APP_API_PORT}/auth/login`, {
        method: 'POST',
        body: JSON.stringify({ email: email, password: password }),
        headers: {
            'Content-Type': 'application/json',
            'auth': process.env.AUTH || ''
        }
    }).then(data => {
        return data.json()
    }).catch(error => {
        console.log(error)
    }) 

    return response
}