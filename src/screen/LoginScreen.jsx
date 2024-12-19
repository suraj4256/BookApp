import { Alert, Image, KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth'
import login_img from '../assets/login_image.jpg'

const LoginScreen = () => {
    const [number, setNumber] = useState(null);
    const navigation = useNavigation();


    useEffect(()=>{
      const unsubscribe = auth().onAuthStateChanged((user)=>{
        if(user){
          console.log("User already logged in", user);
          navigation.reset({
            index: 0,
            routes: [{ name: 'Sections' }],
          });
        }
        return unsubscribe;
      })
    },[])


    const handleLogin=async()=>{
        try {
          const phoneNumber = "+91" + number;  // Prefix the phone number with the country code
          console.log(phoneNumber);
          const response = await auth().signInWithPhoneNumber(phoneNumber);
          console.log('Confirmation object:', response);
          navigation.navigate('Otp', { confirm: response }); 
            
          } catch (error) {
            console.error("Error during phone sign-in:", error.message);
          }
    }

    return (
        <>
    <SafeAreaView
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          backgroundColor: 'white',
          alignItems: 'center',
        }}>
        
        <KeyboardAvoidingView
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 30,
            backgroundColor: 'white',
          }}>
          <ScrollView>
          <View style={{
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: 300, 
            marginTop:50
          }}>
            <Image 
             style={{
              width: '95%', 
              height: '100%', 
            }}
            source={login_img}
            resizeMode='contain'

            />       
          </View>
          <View style={{marginTop: 50}}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 5,
                backgroundColor: '#D0D0D0',
                paddingVertical: 5,
                borderRadius: 5,
                marginTop: 10,
                padding: 10,
                borderRadius: 10,
              }}>
              <TextInput
                style={{
                  marginVertical: 10,
                  width: 320,
                }}
                onChangeText={setNumber}
                value={number}
                placeholder="Enter your phone number"
              />
            </View>
          </View>
          </ScrollView>
        </KeyboardAvoidingView>
       
         <TouchableOpacity
          onPress={handleLogin}
          style={{
            backgroundColor: 'black',
            marginTop: 50,
            padding: 20,
            width: 340,
            borderRadius: 10,
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: 'white',
            }}>
            Continue
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
      </>
        );
}

export default LoginScreen

const styles = StyleSheet.create({})