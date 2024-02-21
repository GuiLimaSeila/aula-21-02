import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography, Grid } from '@material-ui/core';
import firebase from 'firebase/app';
import 'firebase/firestore';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  userInfo: {
    marginBottom: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

const Profile = () => {
  const classes = useStyles();
  const user = useSelector((state) => state.user.currentUser);
  const [displayName, setDisplayName] = useState('');
  const [photoURL, setPhotoURL] = useState('');

  useEffect(() => {
    if (user) {
      firebase.firestore().collection('users').doc(user.uid).get().then((doc) => {
        if (doc.exists) {
          setDisplayName(doc.data().displayName);
          setPhotoURL(doc.data().photoURL);
        }
      });
    }
  }, [user]);

  return (
    <div className={classes.root}>
      <Typography variant="h4" component="h1" className={classes.userInfo}>
        {displayName || 'Your Name'}
      </Typography>
      <Typography variant="body1" component="p" className={classes.userInfo}>
        {photoURL ? (
          <img src={photoURL} alt="Profile" width="100" height="100" style={{ borderRadius: '50%' }} />
        ) : (
          'No photo available'
        )}
      </Typography>
      <Button variant="contained" color="primary" className={classes.button}>
        Edit Profile
      </Button>
      <Grid container spacing={2}>
        {/* Add more components here to display other user data, such as servers joined, friends, etc. */}
      </Grid>
    </div>
  );
};

export default Profile;