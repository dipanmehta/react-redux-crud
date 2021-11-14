import axios from 'axios';

export default axios.create({
    baseURL:"https://jer28pk6q6.execute-api.ap-southeast-2.amazonaws.com/Prod",
    header: {
        "Content-type":"application/json"
    }
});