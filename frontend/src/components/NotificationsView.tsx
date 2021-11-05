import { Alert, Button, List, Stack } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { UserNotification } from '../types';
import { Noti } from './Noti';


export const NotificationsView: FC = () => {
  const [notifications, setNotifications] = useState<UserNotification[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    getNotifications();
  }, []);

  const getNotifications = async () => {
    try {
      const res: Response = await fetch('http://localhost:3003/notification');
      if (res.ok) {
        const json = await res.json();
        setError('');
        setNotifications(json);
        window.localStorage.setItem('notifications', JSON.stringify(json));
      }
    } catch (e) {
      console.error('Failed to fetch');
      setError('Something went wrong.  Try reloading');
      const savedNotifications = window.localStorage.getItem('notifications');
      if (savedNotifications && savedNotifications.length) {
        setNotifications(JSON.parse(savedNotifications));
      }
    }
  };

  return (
    <>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <h1>Notifications</h1>
        {error ? (
          <Alert severity="error">
            {error}
          </Alert>
        ) : null}
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', justifyContent: 'center' }}>
          {notifications.map((n: UserNotification) => (<Noti key={n.id} un={n} />))}
        </List>
        <Button
          variant="contained"
          onClick={() => {
            getNotifications();
          }}
        >
          Refresh Notifications
        </Button>
      </Stack>
    </>
  );
};