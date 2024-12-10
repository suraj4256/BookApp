import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Pdf from 'react-native-pdf';

const PDFViewerScreen = ({route}) => {
  const {pdfUrl} = route.params;
  console.log("Url --->",pdfUrl)
    return (
        <View style={styles.container}>
            <Text>{pdfUrl}</Text>
        <Pdf
          source={{ uri: pdfUrl, cache: true }}
          onLoadComplete={(numberOfPages) => {
            console.log(`Number of pages: ${numberOfPages}`);
          }}
          onPageChanged={(page) => {
            console.log(`Current page: ${page}`);
          }}
          onError={(error) => {
            console.log(error);
          }}
          onPressLink={(uri) => {
            console.log(`Link pressed: ${uri}`);
          }}
          style={styles.pdf}
        />
      </View>       
  )
}

export default PDFViewerScreen


const styles = StyleSheet.create({
    container: {
       flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 25,
    },
    pdf: {
      width:Dimensions.get('window').width,
      height:Dimensions.get('window').height,
    },
  });
  