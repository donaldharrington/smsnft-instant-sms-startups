import axios from "axios";

export const getAllFreeNumbers = () => {
    const backend_api = "https://api-smsnft.azure-api.net/getavail/manual/paths/invoke";
    return axios.get(backend_api)
      .then(data => data.data)
      .catch(error => { throw error.response });
}

export const getAllCallHistory = () => {
    const backend_api = "https://api-smsnft.azure-api.net/manual/paths/invoke?SimNumber=%2B447909056448";
    return axios.get(backend_api)
        .then(data => data.data)
        .catch(error => { throw error.response });
}