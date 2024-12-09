import {FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState } from 'react';
import SectionCard from '../components/SectionCard';
import storage from '@react-native-firebase/storage';
import { useNavigation } from '@react-navigation/native';

const SectionsScreen = () => {
  const navigation = useNavigation();
  const [categories, setCategories] = useState([
    { name: 'Maths', folder: 'Maths' },
    { name: 'English', folder: 'English'},
    { name: 'GK', folder: 'GK'},
    { name: 'LR', folder: 'LR' },
    { name: 'Hindi', folder: 'Hindi' }
  ]);

  const fetchPDFs = async (folder) => {
    try {
      const listResult = await storage().ref(folder).listAll();
      const pdfList = listResult.items.map(item => ({
        name: item.name,
        url: item.getDownloadURL()
      }));
      return pdfList;
    } catch (error) {
      console.error('Error fetching PDFs:', error);
    }
  };

  const handleCategoryPress = async (folder) => {
    const pdfList = await fetchPDFs(folder);
    navigation.navigate('PDFList', { pdfList });
  };

  return (
    <SafeAreaView style={styles.container}>
    <FlatList
      data={categories}
      keyExtractor={(item) => item.folder}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.card} onPress={() => handleCategoryPress(item.folder)}>
          <Text style={styles.cardText}>{item.name}</Text>
        </TouchableOpacity>
      )}
    />
    <SectionCard/>
  </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding:25,
    display:'flex',
    width:"100%",
    height:"100%",
    flexDirection:'row',
    backgroundColor: 'white'
  },
  card: {
    backgroundColor: '#D0D0D0',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    width: '50%',
    alignItems: 'center',
    backgroundColor:'gray'
  },
  cardText: {
    fontSize: 20,
    fontWeight: 'bold'
  }
});

export default SectionsScreen;


