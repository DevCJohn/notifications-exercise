import { Alert, Button, Divider, List, ListItemButton, ListItemText, Stack } from '@mui/material';
import moment from 'moment';
import React, { FC, useEffect, useState } from 'react';

interface UserNotification {
  id: number;
  title: string;
  body: string;
  date: Date;
  link: string;
}

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

const Noti: FC<{ un: UserNotification }> = ({ un }) => (
  <>
    <ListItemButton alignItems="flex-start" component="a" href={un.link}>
      <ListItemText
        primary={un.title}
        secondary={`${un.body} // ${moment(un.date).fromNow()}`} />
    </ListItemButton>
    <Divider />
  </>
);