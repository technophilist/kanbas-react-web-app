import axios from "axios"

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER

const fetchWelcomeMessage = async () => {
    const response = await axios.get(`${REMOTE_SERVER}/lab5/welcome`)
    return response.data
}

export {fetchWelcomeMessage}