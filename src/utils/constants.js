const prod = {
    url: {
        API_URL: 'https://cedricauc.alwaysdata.net/api',
    }
}
const dev = {
    url: {
        API_URL: 'http://localhost:8000/api'
    }
}
export const config = process.env.NODE_ENV === 'development' ? dev : prod