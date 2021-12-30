import axios from "axios"

export const fetchAllPrice = async () => {
    return await axios.get("https://satangcorp.com/api/v3/ticker/24hr")
}