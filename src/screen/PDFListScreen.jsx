import { SafeAreaView, FlatList, Text, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import React from 'react';

const PDFListScreen = ({ route }) => {
  const { pdfList } = route.params;

  const handlePDFPress = async (url) => {
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.error('Error opening PDF:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={pdfList}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.pdfItem} onPress={() => handlePDFPress(item.url)}>
            <Text style={styles.pdfText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white'
  },
  pdfItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#D0D0D0'
  },
  pdfText: {
    fontSize: 18
  }
});

export default PDFListScreen;
