import axios from 'axios';

export const Log = async (stack, level, packageName, message) => {
    try {
        const token = localStorage.getItem('access_token');
        if (!token) return;
        
        await axios.post(
            '/evaluation-service/logs',
            {
                stack: stack,
                level: level,
                package: packageName,
                message: message
            },
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );
    } catch (error) {
        
    }
};
