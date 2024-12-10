import { SafeAreaView, FlatList, Dimensions, Text, TouchableOpacity, Linking, StyleSheet, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const PDFListScreen = ({ route }) => {
  const { pdfList } = route.params;
  const navigation = useNavigation();

  const handlePDFPress = async (urlObject) => {
    const url = urlObject._j;
    console.log("Url is getting in pdf screen", url);
    
    try {  
    navigation.navigate('PDFViewerScreen',{pdfUrl:url});
    } catch (error) {
      console.error('Error in navigating to the pdf viewer screen', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={pdfList}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePDFPress(item.url)}>
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  pdf: {
    flex:1,
    width:Dimensions.get('window').width,
    height:Dimensions.get('window').height,
}
});

export default PDFListScreen;
