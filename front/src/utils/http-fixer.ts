import axios from "axios";



export default axios.create({
        baseURL: "http://data.fixer.io/api/",
        headers: {
            "Content-type": "application/json"
        }
    });
