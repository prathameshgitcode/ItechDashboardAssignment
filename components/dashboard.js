import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Button, Drawer} from 'react-native';
import firebase from '../database/firebase';
import 'firebase/auth';

const Dashboard = ({navigation}) => {
  const [displayName, setDisplayName] = useState('');
  const [uid, setUid] = useState('');

  useEffect(() => {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      setDisplayName(currentUser.displayName);
      setUid(currentUser.uid);
    }
  }, []);

  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        navigation.navigate('Login');
      })
      .catch(error => console.log(error.message));
  };

  const Sidebar = () => {
    return (
      <View style={styles.sidebar}>
        <Text style={styles.sidebarText}>Dashboard</Text>
        <Button
          style={styles.sidebarButton}
          title="Profile"
          onPress={() => navigation.navigate('MyProfile')}
        />
        <Button
          style={styles.sidebarButton}
          title="Employee"
          onPress={() => navigation.navigate('employee')}
        />
        <Button
          style={styles.sidebarButton}
          title="Settings"
          onPress={() => navigation.navigate('settings')}
        />
        <Button style={styles.sidebarButton} title="Logout" onPress={signOut} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Drawer
        open={true}
        content={Sidebar()}
        onClose={() => console.log('Drawer closed')}>
        <Text style={styles.textStyle}>
          Hello, {displayName}, Welcome to the Dashboard!
        </Text>
        <Button color="#3740FE" title="Logout" onPress={signOut} />
      </Drawer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 35,
    backgroundColor: '#fff',
  },
  sidebar: {
    width: 200,
    backgroundColor: '#3740FE',
  },
  sidebarText: {
    fontSize: 15,
    color: '#fff',
    margin: 10,
  },
  sidebarButton: {
    color: '#fff',
    margin: 10,
    padding: 10,
  },
});

export default Dashboard;
