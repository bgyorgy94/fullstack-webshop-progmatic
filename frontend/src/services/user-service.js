export default {
    register(formData) {
        console.log(formData)
        return fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
    },
}