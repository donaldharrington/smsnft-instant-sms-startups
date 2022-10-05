import axios from "axios";

export const getAllFreeNumbers = () => {
    const backend_api = "https://api-smsnft.azure-api.net/getavail/manual/paths/invoke";
    return axios.get(backend_api)
      .then(data => data.data)
      .catch(error => { throw error.response });
}

export const getAllCallHistory = (SimNumber) => {
    const backend_api = "https://api-smsnft.azure-api.net/manual/paths/invoke?SimNumber=%2B" + SimNumber;
    return axios.get(backend_api)
        .then(data => data.data)
        .catch(error => { throw error.response });
}