import {
  SafeAreaView,
  FlatList,
  Dimensions,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
import storage from '@react-native-firebase/storage';
import { HeaderBackButton } from '@react-navigation/elements';

const PDFListScreen = ({route}) => {
  const navigation = useNavigation();
  const {folder} = route.params;
  const [pdfList, setPdfList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPDFs = useCallback(async folder => {
    setLoading(true);
    try {
      const listResult = await storage().ref(folder).listAll();
      const pdfs = await Promise.all(
        listResult.items.map(async item => ({
          name: item.name,
          url: await item.getDownloadURL(),
        })),
      );
      setPdfList(pdfs);
      console.log('--->', pdfs);
    } catch (error) {
      console.error('Error fetching PDFs:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPDFs(folder);
  }, []);

  const handlePDFPress = async urlObject => {
    const url = urlObject.url;
    console.log('Url is getting in pdf screen', url);
    try {
      navigation.navigate('PDFViewerScreen', {pdfUrl: url});
    } catch (error) {
      console.error('Error in navigating to the pdf viewer screen', error);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <HeaderBackButton onPress={() => navigation.goBack()} />
        </View>
        <Text style={styles.loadingText}>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <HeaderBackButton onPress={() => navigation.goBack()} />
      </View>
      <FlatList
        data={pdfList}
        keyExtractor={item => item.name}
        renderItem={({item}) => (
          <TouchableOpacity style={styles.card} onPress={() => handlePDFPress(item)}>
            <Text style={styles.cardTitle}>{item.name}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
    width: '100%',
  },
  header: {
    marginBottom: 10,
    backgroundColor: 'white',
  },
  loadingText: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 20,
    color: '#555',
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#f8f8f8',
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 5,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
});

export default PDFListScreen;
