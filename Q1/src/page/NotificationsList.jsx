import React, { useState, useEffect } from 'react';
import { Box, Typography, Select, MenuItem, Pagination, Card, CardContent, Chip, IconButton, CircularProgress, Tooltip, Avatar, Fade } from '@mui/material';
import { fetchNotifications } from '../api/notifications';
import { Log } from '../middleware/logger';

const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
};

const NotificationsList = () => {
    const [notifications, setNotifications] = useState([]);
    const [page, setPage] = useState(1);
    const [filterType, setFilterType] = useState('');
    const [loading, setLoading] = useState(false);
    const [readIds, setReadIds] = useState(new Set());
    const limit = 10;

    const loadNotifications = async () => {
        setLoading(true);
        try {
            await Log('frontend', 'info', 'page', `Loading notifications list for page ${page}`);
            const data = await fetchNotifications(limit, page, filterType);
            setNotifications(data);
        } catch (error) {
            await Log('frontend', 'error', 'page', 'Failed to load notifications');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadNotifications();
    }, [page, filterType]);

    const handleMarkAsRead = async (id) => {
        const newReadIds = new Set(readIds);
        newReadIds.add(id);
        setReadIds(newReadIds);
        await Log('frontend', 'info', 'page', 'Marked notification as read');
    };

    const getIcon = (type) => {
        switch(type) {
            case 'Placement': return '💼';
            case 'Result': return '📊';
            default: return '📅';
        }
    };

    const getColor = (type) => {
        switch(type) {
            case 'Placement': return '#ef4444';
            case 'Result': return '#f59e0b';
            default: return '#3b82f6';
        }
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" color="text.primary">Latest Updates</Typography>
                <Select
                    value={filterType}
                    onChange={(e) => {
                        setFilterType(e.target.value);
                        setPage(1);
                    }}
                    displayEmpty
                    size="small"
                    sx={{ bgcolor: 'background.paper', borderRadius: 2, minWidth: 150 }}
                >
                    <MenuItem value="">All Types</MenuItem>
                    <MenuItem value="Event">Event</MenuItem>
                    <MenuItem value="Result">Result</MenuItem>
                    <MenuItem value="Placement">Placement</MenuItem>
                </Select>
            </Box>

            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
                    <CircularProgress size={40} thickness={4} />
                </Box>
            ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {notifications.map((notif) => {
                        const isRead = readIds.has(notif.ID);
                        return (
                            <Fade in={true} key={notif.ID} timeout={500}>
                                <Card 
                                    elevation={isRead ? 0 : 2}
                                    sx={{ 
                                        bgcolor: isRead ? '#f9fafb' : '#ffffff', 
                                        border: isRead ? '1px solid #e5e7eb' : 'none',
                                        transition: 'transform 0.2s, box-shadow 0.2s',
                                        '&:hover': {
                                            transform: 'translateY(-2px)',
                                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                                        }
                                    }}
                                >
                                    <CardContent sx={{ display: 'flex', alignItems: 'center', p: '20px !important' }}>
                                        <Avatar sx={{ bgcolor: isRead ? '#9ca3af' : getColor(notif.Type), mr: 2, width: 48, height: 48 }}>
                                            {getIcon(notif.Type)}
                                        </Avatar>
                                        
                                        <Box sx={{ flexGrow: 1 }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                                                <Typography variant="subtitle1" sx={{ fontWeight: isRead ? 500 : 700, color: isRead ? 'text.secondary' : 'text.primary' }}>
                                                    {notif.Message}
                                                </Typography>
                                                <Chip 
                                                    label={notif.Type} 
                                                    size="small" 
                                                    sx={{ 
                                                        ml: 2, 
                                                        height: 20, 
                                                        fontSize: '0.7rem',
                                                        fontWeight: 600,
                                                        bgcolor: isRead ? '#e5e7eb' : `${getColor(notif.Type)}20`,
                                                        color: isRead ? '#6b7280' : getColor(notif.Type)
                                                    }} 
                                                />
                                            </Box>
                                            <Typography variant="body2" color="text.secondary">
                                                {formatDate(notif.Timestamp)}
                                            </Typography>
                                        </Box>

                                        {!isRead && (
                                            <Tooltip title="Mark as read">
                                                <IconButton 
                                                    color="primary" 
                                                    onClick={() => handleMarkAsRead(notif.ID)}
                                                    sx={{ bgcolor: 'primary.50', '&:hover': { bgcolor: 'primary.100' } }}
                                                >
                                                    ✓
                                                </IconButton>
                                            </Tooltip>
                                        )}
                                    </CardContent>
                                </Card>
                            </Fade>
                        );
                    })}
                    
                    {notifications.length === 0 && !loading && (
                        <Box sx={{ textAlign: 'center', py: 8 }}>
                            <Typography variant="h6" color="text.secondary">No notifications found.</Typography>
                        </Box>
                    )}
                </Box>
            )}

            <Box sx={{ mt: 5, mb: 2, display: 'flex', justifyContent: 'center' }}>
                <Pagination 
                    count={10} 
                    page={page} 
                    onChange={(e, value) => setPage(value)} 
                    color="primary" 
                    shape="rounded"
                    size="large"
                />
            </Box>
        </Box>
    );
};

export default NotificationsList;
