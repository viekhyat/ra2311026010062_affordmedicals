import axios from 'axios';
import { Log } from '../middleware/logger';

export const fetchNotifications = async (limit, page, notificationType) => {
    try {
        const token = import.meta.env.VITE_ACCESS_TOKEN || localStorage.getItem('access_token');
        let url = `/evaluation-service/notifications?page=${page}&limit=${limit}`;
        if (notificationType) {
            url += `&notification_type=${notificationType}`;
        }
        const response = await axios.get(url, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        await Log('frontend', 'info', 'api', `Fetched notifications page ${page}`);
        return response.data.notifications || [];
    } catch (error) {
        await Log('frontend', 'error', 'api', 'Failed to fetch notifications');
        return [];
    }
};
