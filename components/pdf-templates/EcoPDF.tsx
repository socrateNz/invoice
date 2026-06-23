import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { InvoiceData } from '@/types/invoice';
import { formatCurrency, numberToWordsFR } from '@/utils/format';

const styles = StyleSheet.create({
  page: {
    paddingTop: 160,
    paddingBottom: 80,
    paddingLeft: 40,
    paddingRight: 40,
    fontFamily: 'Helvetica',
    fontSize: 10,
    color: '#3f6212',
    backgroundColor: '#ffffff',
  },
  topGreenLine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 16,
    backgroundColor: '#65a30d',
  },
  headerContainer: {
    position: 'absolute',
    top: 40,
    left: 40,
    right: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 120,
  },
  headerLeft: {
    width: '50%',
  },
  companyName: {
    fontSize: 26,
    fontWeight: 'black',
    color: '#4d7c0f',
    letterSpacing: -1,
    marginBottom: 4,
  },
  companySlogan: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#65a30d',
    marginBottom: 10,
  },
  contactText: {
    fontSize: 8,
    color: '#3f6212',
    opacity: 0.8,
    marginBottom: 2,
  },
  headerRight: {
    width: '40%',
    textAlign: 'right',
    color: '#4d7c0f',
  },
  invoiceTitle: {
    fontSize: 24,
    color: '#4d7c0f',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 10,
  },
  invoiceMetaBox: {
    backgroundColor: '#f7fee7',
    padding: 12,
    borderRadius: 8,
    border: '1pt solid #d9f99d',
  },
  invoiceMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
    fontSize: 8,
  },
  invoiceMetaLabel: {
    color: '#65a30d',
  },
  invoiceMetaValue: {
    fontWeight: 'bold',
  },

  attentionBox: {
    marginBottom: 30,
    borderLeft: '4pt solid #84cc16',
    paddingLeft: 12,
  },
  attentionTitle: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#84cc16',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 6,
  },
  clientName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#3f6212',
    marginBottom: 4,
  },
  clientAddress: {
    color: '#4d7c0f',
    fontSize: 8,
    lineHeight: 1.5,
  },

  subjectBox: {
    flexDirection: 'row',
    backgroundColor: '#f7fee7',
    padding: 12,
    borderRadius: 8,
    marginBottom: 30,
    alignItems: 'center',
  },
  subjectLabel: {
    fontWeight: 'bold',
    color: '#65a30d',
    textTransform: 'uppercase',
    fontSize: 8,
    marginRight: 6,
  },
  subjectText: {
    color: '#3f6212',
    fontSize: 10,
  },

  table: {
    width: '100%',
    marginBottom: 30,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottom: '2pt solid #84cc16',
    paddingBottom: 8,
    marginBottom: 10,
  },
  thCol1: { width: '60%', color: '#4d7c0f', fontSize: 8, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1 },
  thCol2: { width: '15%', textAlign: 'center', color: '#4d7c0f', fontSize: 8, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1 },
  thCol3: { width: '25%', textAlign: 'right', color: '#4d7c0f', fontSize: 8, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1 },
  
  tableRow: {
    flexDirection: 'row',
    borderBottom: '1pt solid #ecfccb',
    paddingVertical: 12,
  },
  tdCol1: { width: '60%', paddingRight: 10 },
  tdCol2: { width: '15%', textAlign: 'center', color: '#3f6212' },
  tdCol3: { width: '25%', textAlign: 'right', fontWeight: 'bold', color: '#3f6212' },
  
  itemDesignation: {
    fontWeight: 'bold',
    color: '#3f6212',
    fontSize: 10,
    marginBottom: 4,
  },
  itemDescription: {
    color: '#4d7c0f',
    fontSize: 8,
    lineHeight: 1.5,
  },

  totalsWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 30,
  },
  totalsContainer: {
    width: '50%',
    backgroundColor: '#ecfccb',
    borderRadius: 10,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    border: '1pt solid #d9f99d',
  },
  totalsLabel: {
    fontWeight: 'bold',
    color: '#4d7c0f',
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontSize: 10,
  },
  totalsValue: {
    fontWeight: 'black',
    fontSize: 18,
    color: '#3f6212',
  },

  amountInWordsBox: {
    textAlign: 'center',
    color: '#4d7c0f',
    fontSize: 10,
    marginBottom: 50,
  },
  amountInWordsValue: {
    fontWeight: 'bold',
  },

  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  footerColLeft: {
    width: '50%',
  },
  footerColRight: {
    width: '50%',
    textAlign: 'right',
  },
  footerTitle: {
    fontWeight: 'bold',
    color: '#4d7c0f',
    marginBottom: 4,
    fontSize: 8,
  },
  footerText: {
    color: '#65a30d',
    fontSize: 8,
  },
  footerSignatureText: {
    color: '#65a30d',
    fontSize: 8,
    fontStyle: 'italic',
  }
});

interface EcoPDFProps {
  data: InvoiceData;
}

const EcoPDF: React.FC<EcoPDFProps> = ({ data }) => {
  const calculateTotal = () => {
    return data.items.reduce((acc, item) => acc + (parseFloat(item.quantity) || 1) * (item.price || 0), 0);
  };

  const total = data.grandTotal ?? calculateTotal();
  const totalInWords = numberToWordsFR(total);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        
        <View fixed style={styles.topGreenLine}></View>

        <View fixed style={styles.headerContainer}>
          <View style={styles.headerLeft}>
            <Text style={styles.companyName}>{data.senderName || 'ECO GREEN'}</Text>
            <Text style={styles.companySlogan}>{data.senderSlogan || 'Slogan écologique'}</Text>
            <Text style={styles.contactText}>{data.senderEmail || 'hello@eco.com'}</Text>
            <Text style={styles.contactText}>{data.senderPhone || '+000 000 000 000'}</Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.invoiceTitle}>Facture</Text>
            <View style={styles.invoiceMetaBox}>
              <View style={styles.invoiceMetaRow}>
                <Text style={styles.invoiceMetaLabel}>N°</Text>
                <Text style={styles.invoiceMetaValue}>{data.invoiceNumber || '---'}</Text>
              </View>
              <View style={styles.invoiceMetaRow}>
                <Text style={styles.invoiceMetaLabel}>Date</Text>
                <Text style={styles.invoiceMetaValue}>{data.invoiceDate || '---'}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.attentionBox}>
          <Text style={styles.attentionTitle}>À l'attention de</Text>
          <Text style={styles.clientName}>{data.recipientName || 'Client Name'}</Text>
          <Text style={styles.clientAddress}>{data.recipientAddress || 'Client Address'}</Text>
        </View>

        <View style={styles.subjectBox}>
          <Text style={styles.subjectLabel}>Objet :</Text>
          <Text style={styles.subjectText}>{data.subject || 'Objet de la facture'}</Text>
        </View>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.thCol1}>Description des services</Text>
            <Text style={styles.thCol2}>Qté</Text>
            <Text style={styles.thCol3}>Montant</Text>
          </View>

          {data.items.length > 0 ? (
            data.items.map((item) => (
              <View key={item.id} style={styles.tableRow} wrap={false}>
                <View style={styles.tdCol1}>
                  <Text style={styles.itemDesignation}>{item.designation || 'Désignation'}</Text>
                  {item.description ? <Text style={styles.itemDescription}>{item.description}</Text> : null}
                </View>
                <Text style={styles.tdCol2}>{item.quantity || '1'}</Text>
                <Text style={styles.tdCol3}>
                  {formatCurrency((parseFloat(item.quantity) || 1) * (item.price || 0))}
                </Text>
              </View>
            ))
          ) : (
            <View style={styles.tableRow}>
              <Text style={{ width: '100%', textAlign: 'center', color: '#bef264' }}>Aucune ligne ajoutée</Text>
            </View>
          )}
        </View>

        <View wrap={false}>
          <View style={styles.totalsWrapper}>
            <View style={styles.totalsContainer}>
              <Text style={styles.totalsLabel}>Total</Text>
              <Text style={styles.totalsValue}>{formatCurrency(total)} FCFA</Text>
            </View>
          </View>

          <View style={styles.amountInWordsBox}>
            <Text>Montant arrêté à : <Text style={styles.amountInWordsValue}>{totalInWords} Francs CFA</Text></Text>
          </View>

          <View style={styles.footerContainer}>
            <View style={styles.footerColLeft}>
              <Text style={styles.footerTitle}>Règlement</Text>
              <Text style={styles.footerText}>Virement bancaire / Mobile Money</Text>
            </View>
            <View style={styles.footerColRight}>
              <Text style={styles.footerTitle}>L'équipe {data.senderName}</Text>
              <Text style={styles.footerSignatureText}>Merci de votre confiance écologique.</Text>
            </View>
          </View>
        </View>

      </Page>
    </Document>
  );
};

export default EcoPDF;
