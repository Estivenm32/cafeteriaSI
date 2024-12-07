import axios from 'axios';

const API_URL = 'http://localhost:5000/api/sales';

export const makeSale = async (sale) => {
    const response = await axios.post(API_URL, sale);
    return response.data;
};


