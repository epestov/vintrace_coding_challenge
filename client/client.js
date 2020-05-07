import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000';

export async function getAllLotCodes() {
    return await axios.get('/api/getAllLotCodes');
}         

export async function getLot(lotCode) {
    return await axios.get(`/api/getLot/${lotCode}`);
}

export async function updateLot(lot) {
    return await axios.put(`/api/updateLot`,  { ...lot });
}

export async function getYearBreakdown(lotCode) {
    return await axios.get(`/api/getYearBreakdown/${lotCode}`);
}

export async function getVarietyBreakdown(lotCode) {
    return await axios.get(`/api/getVarietyBreakdown/${lotCode}`);
}

export async function getRegionBreakdown(lotCode) {
    return await axios.get(`/api/getRegionBreakdown/${lotCode}`);
}

export async function getYearAndVarietyBreakdown(lotCode) {
    return await axios.get(`/api/getYearAndVarietyBreakdown/${lotCode}`);
}
