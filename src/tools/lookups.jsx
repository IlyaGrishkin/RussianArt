import axios from 'axios'
import { SERVER_HOST } from '../components/Utils/constants';


async function getData() {
    const refreshToken = JSON.parse(localStorage.getItem("refreshToken"))
    const apiUrl = `${SERVER_HOST}/api/v1/customers/refresh`;
    await axios.post(apiUrl,
        {
            refresh_token: refreshToken
        }
    )

        .then((resp) => {
            const serverData = resp.data;
            const accessToken = serverData.data.access_token
            const refreshToken = serverData.data.refresh_token
            const expires = serverData.data.expires_in
            localStorage.setItem('accessToken', JSON.stringify(accessToken))
            localStorage.setItem('refreshToken', JSON.stringify(refreshToken))
            localStorage.setItem('expires', JSON.stringify(expires))
        })
        .catch(resp => {
            
        })
}


export async function handleToken() {
    const expires = parseInt(JSON.parse(localStorage.getItem("expires")))
    if (expires) {
        const date = Math.floor(Date.now() / 1000)
        if (date > expires - 300) {
            await getData()
        }
    }
}