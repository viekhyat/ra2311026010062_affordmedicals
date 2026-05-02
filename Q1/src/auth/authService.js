import axios from 'axios';

export const registerClient = async (userData) => {
    try {
        const response = await axios.post(
            '/evaluation-service/register',
            userData
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getAuthToken = async (authData) => {
    try {
        const response = await axios.post(
            '/evaluation-service/auth',
            authData
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};
