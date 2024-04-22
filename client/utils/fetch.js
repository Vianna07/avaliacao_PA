export default async function Fetch(url, method) {
    const data = await fetch(url, {method: method})
    .then(response => {
        if (response.status === 200 || response.status === 304) {
            return response.json()
        } else {
            throw new Error(`${response.status} - ${response.statusText}`)
        }
    })
    .then(data => data)
    .catch(error => {
        throw new Error(`${error.message} - ${error}`)
    })

    return data
}