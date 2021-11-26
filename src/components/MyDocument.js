import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
  },
  section: {
    padding: 20,
    flexGrow: 1
  }
});

const MyDocument = ({ userInput }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>{userInput}</Text>
      </View>
    </Page>
  </Document>
);

export default MyDocument;