import React, {useState} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {WebView} from 'react-native-webview';

const PDFViewerScreen = ({route}) => {
  const {pdfUrl} = route.params;
  const [pdfViewerUrl, setPdfViewUrl] = useState(
    `https://docs.google.com/viewer?url=${encodeURIComponent(
      pdfUrl,
    )}&embedded=true`,
  );

  // Google Docs viewer URL that renders PDFs
  // let pdfViewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(pdfUrl)}&embedded=true`;

  return (
    <View style={styles.container}>
      <WebView
        source={{uri: pdfViewerUrl}}
        style={styles.webview}
        originWhitelist={['*']}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default PDFViewerScreen;
