import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';

const SectionCard = () => {
  const navigation = useNavigation();
  const handleLogout = async () => {
    const user = auth().currentUser;
    console.log(user);
    if (user) {
      try {
        await auth().signOut();
        console.log('User signed out successfully', user.uid);
        navigation.reset({
          index: 0,
          routes: [{name: 'Login'}],
        });
      } catch (error) {
        console.error('Sign Out Error', error);
      }
    } else {
      console.log('No user currently signed in.');
    }
  };
  return (
    <View>
      <Pressable onPress={handleLogout}>
        <Text>Logout</Text>
      </Pressable>
    </View>
  );
};

export default SectionCard;

const styles = StyleSheet.create({});