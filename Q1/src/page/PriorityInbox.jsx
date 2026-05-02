import React, { useState, useEffect } from 'react';
import { Box, Typography, Select, MenuItem, Card, CardContent, Chip, CircularProgress, TextField, Avatar, Fade } from '@mui/material';
import { fetchNotifications } from '../api/notifications';
import { Log } from '../middleware/logger';

const WEIGHTS = {
    'Placement': 3,
    'Result': 2,
    'Event': 1
};

const getPriority = (notification) => {
    const weight = WEIGHTS[notification.Type] || 0;
    const timestamp = new Date(notification.Timestamp).getTime();
    return { weight, timestamp };
};

const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
};

const PriorityInbox = () => {
    const [notifications, setNotifications] = useState([]);
    const [topN, setTopN] = useState(10);
    const [filterType, setFilterType] = useState('');
    const [loading, setLoading] = useState(false);

    const loadPriorityNotifications = async () => {
        setLoading(true);
        try {
            await Log('frontend', 'info', 'page', `Loading priority inbox with top ${topN}`);
            const data = await fetchNotifications(10, 1, filterType);
            
            const sorted = data.sort((a, b) => {
                const pA = getPriority(a);
                const pB = getPriority(b);
                if (pA.weight !== pB.weight) return pB.weight - pA.weight;
                return pB.timestamp - pA.timestamp;
            });
            
            setNotifications(sorted.slice(0, topN));
        } catch (error) {
            await Log('frontend', 'error', 'page', 'Failed to load priority notifications');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPriorityNotifications();
        const interval = setInterval(loadPriorityNotifications, 10000);
        return () => clearInterval(interval);
    }, [topN, filterType]);

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
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar sx={{ bgcolor: 'secondary.main', mr: 2, width: 36, height: 36 }}>
                        ❗
                    </Avatar>
                    <Typography variant="h5" color="text.primary">Priority Inbox</Typography>
                </Box>
                
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField
                        type="number"
                        label="Top N"
                        value={topN}
                        onChange={(e) => setTopN(parseInt(e.target.value) || 10)}
                        size="small"
                        sx={{ width: 100, bgcolor: 'background.paper', borderRadius: 1 }}
                    />
                    <Select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        displayEmpty
                        size="small"
                        sx={{ bgcolor: 'background.paper', borderRadius: 1, minWidth: 140 }}
                    >
                        <MenuItem value="">All Types</MenuItem>
                        <MenuItem value="Event">Event</MenuItem>
                        <MenuItem value="Result">Result</MenuItem>
                        <MenuItem value="Placement">Placement</MenuItem>
                    </Select>
                </Box>
            </Box>

            {loading && notifications.length === 0 ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
                    <CircularProgress size={40} thickness={4} color="secondary" />
                </Box>
            ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {notifications.map((notif, index) => (
                        <Fade in={true} key={notif.ID} timeout={500 + (index * 100)}>
                            <Card 
                                elevation={2}
                                sx={{ 
                                    borderLeft: `4px solid ${getColor(notif.Type)}`,
                                    transition: 'transform 0.2s, box-shadow 0.2s',
                                    '&:hover': {
                                        transform: 'translateX(4px)',
                                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                                    }
                                }}
                            >
                                <CardContent sx={{ display: 'flex', alignItems: 'center', p: '20px !important' }}>
                                    <Avatar sx={{ bgcolor: `${getColor(notif.Type)}15`, color: getColor(notif.Type), mr: 3, width: 48, height: 48 }}>
                                        {getIcon(notif.Type)}
                                    </Avatar>
                                    
                                    <Box sx={{ flexGrow: 1 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                                            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'text.primary' }}>
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
                                                    bgcolor: `${getColor(notif.Type)}20`,
                                                    color: getColor(notif.Type)
                                                }} 
                                            />
                                        </Box>
                                        <Typography variant="body2" color="text.secondary">
                                            {formatDate(notif.Timestamp)}
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Fade>
                    ))}
                    
                    {notifications.length === 0 && !loading && (
                        <Box sx={{ textAlign: 'center', py: 8 }}>
                            <Typography variant="h6" color="text.secondary">No priority notifications found.</Typography>
                        </Box>
                    )}
                </Box>
            )}
        </Box>
    );
};

export default PriorityInbox;
