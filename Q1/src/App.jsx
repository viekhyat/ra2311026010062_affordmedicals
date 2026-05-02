import React, { useState } from 'react';
import { Container, Typography, Box, Tabs, Tab, AppBar, Toolbar, Paper } from '@mui/material';
import NotificationsList from './page/NotificationsList';
import PriorityInbox from './page/PriorityInbox';

function App() {
    const [currentTab, setCurrentTab] = useState(0);

    const handleTabChange = (event, newValue) => {
        setCurrentTab(newValue);
    };

    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <AppBar position="sticky" elevation={0} sx={{ bgcolor: 'primary.main' }}>
                <Toolbar>
                    <Typography variant="h5" sx={{ mr: 2 }}>🔔</Typography>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
                        Campus Notifications
                    </Typography>
                </Toolbar>
            </AppBar>

            <Container maxWidth="md" sx={{ flex: 1, py: 4 }}>
                <Paper elevation={0} sx={{ borderRadius: 2, overflow: 'hidden', mb: 3 }}>
                    <Tabs 
                        value={currentTab} 
                        onChange={handleTabChange} 
                        variant="fullWidth"
                        indicatorColor="primary"
                        textColor="primary"
                        sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper' }}
                    >
                        <Tab label="All Notifications" sx={{ py: 2, fontWeight: 'bold' }} />
                        <Tab label="Priority Inbox" sx={{ py: 2, fontWeight: 'bold' }} />
                    </Tabs>
                </Paper>

                <Box>
                    {currentTab === 0 && <NotificationsList />}
                    {currentTab === 1 && <PriorityInbox />}
                </Box>
            </Container>
        </Box>
    );
}

export default App;
