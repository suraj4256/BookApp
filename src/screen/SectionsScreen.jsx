import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

const SectionsScreen = () => {
  const navigation = useNavigation();
  const [categories, setCategories] = useState([
    { name: 'Maths', folder: 'Maths' },
    { name: 'English', folder: 'English' },
    { name: 'GK', folder: 'GK' },
    { name: 'LR', folder: 'LR' },
    { name: 'Hindi', folder: 'Hindi' },
  ]);

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
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.sectionName}> Sections </Text>
        <TouchableOpacity onPress={handleLogout}>
        </TouchableOpacity>
      </View>

      {/* Cards Section */}
      <FlatList
        data={categories}
        numColumns={2}
        keyExtractor={(item) => item.folder}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('PDFList', { folder: item.folder })}
          >
            <Text style={styles.cardText}>{item.name}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.flatListContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  sectionName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  flatListContainer: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  card: {
    backgroundColor: '#D0D0D0',
    padding: 20,
    borderRadius: 10,
    margin: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default SectionsScreen;
