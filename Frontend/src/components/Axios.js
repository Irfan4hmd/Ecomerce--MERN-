import axios from 'axios'
const instance = axios.create({
    baseURL:"http://127.0.0.1:4000"
})

    let authToken = localStorage.getItem("JWT");
    if (authToken === null) {
        // This means that there ISN'T JWT and no user is logged in.
        instance.defaults.headers.common.Authorization = null;
    } else {
        // This means that there IS a JWT so someone must be logged in.
        instance.defaults.headers.common.Authorization = `Bearer ${authToken}`;
    }

export default instance;