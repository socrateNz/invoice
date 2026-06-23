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
    fontFamily: 'Courier',
    fontSize: 10,
    color: '#451a03',
    backgroundColor: '#fffbeb',
    border: '8pt solid #78350f',
  },
  headerContainer: {
    position: 'absolute',
    top: 40,
    left: 40,
    right: 40,
    alignItems: 'center',
    borderBottom: '4pt solid #78350f',
    paddingBottom: 20,
    height: 100,
  },
  companyName: {
    fontSize: 24,
    fontFamily: 'Courier-Bold',
    textTransform: 'uppercase',
    letterSpacing: 2,
    color: '#78350f',
    marginBottom: 6,
  },
  companySlogan: {
    fontSize: 10,
    fontFamily: 'Courier-Bold',
    color: '#92400e',
    marginBottom: 8,
  },
  contactRow: {
    flexDirection: 'row',
    fontSize: 8,
    color: '#92400e',
    justifyContent: 'center',
  },
  contactText: {
    marginHorizontal: 10,
  },

  infoContainer: {
    flexDirection: 'row',
    backgroundColor: '#fef3c7',
    border: '4pt solid #78350f',
    marginBottom: 20,
  },
  clientInfo: {
    width: '50%',
    padding: 12,
    borderRight: '4pt solid #78350f',
  },
  invoiceInfo: {
    width: '50%',
    padding: 12,
  },
  sectionTitle: {
    fontSize: 8,
    fontFamily: 'Courier-Bold',
    color: '#78350f',
    textTransform: 'uppercase',
    textDecoration: 'underline',
    marginBottom: 8,
  },
  clientName: {
    fontSize: 14,
    fontFamily: 'Courier-Bold',
    color: '#451a03',
    marginBottom: 6,
  },
  clientAddress: {
    color: '#78350f',
    lineHeight: 1.5,
  },
  invoiceMetaRow: {
    flexDirection: 'row',
    marginBottom: 4,
    fontSize: 10,
    fontFamily: 'Courier-Bold',
    color: '#451a03',
  },
  invoiceMetaLabel: {
    width: 90,
  },

  subjectBox: {
    border: '2pt dashed #78350f',
    padding: 10,
    marginBottom: 30,
    fontFamily: 'Courier-Bold',
    color: '#451a03',
  },

  table: {
    width: '100%',
    border: '4pt solid #78350f',
    marginBottom: 30,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#78350f',
    color: '#fffbeb',
  },
  thCol1: { width: '60%', padding: 8, fontSize: 8, fontFamily: 'Courier-Bold', borderRight: '4pt solid #fffbeb' },
  thCol2: { width: '15%', padding: 8, textAlign: 'center', fontSize: 8, fontFamily: 'Courier-Bold', borderRight: '4pt solid #fffbeb' },
  thCol3: { width: '25%', padding: 8, textAlign: 'right', fontSize: 8, fontFamily: 'Courier-Bold' },
  
  tableRow: {
    flexDirection: 'row',
    backgroundColor: '#fef3c7',
    borderBottom: '2pt solid #78350f',
  },
  tdCol1: { width: '60%', padding: 12, borderRight: '4pt solid #78350f' },
  tdCol2: { width: '15%', padding: 12, textAlign: 'center', borderRight: '4pt solid #78350f', fontFamily: 'Courier-Bold' },
  tdCol3: { width: '25%', padding: 12, textAlign: 'right', fontFamily: 'Courier-Bold', color: '#451a03' },
  
  itemDesignation: {
    fontFamily: 'Courier-Bold',
    color: '#451a03',
    marginBottom: 4,
  },
  itemDescription: {
    color: '#92400e',
    fontSize: 8,
    lineHeight: 1.5,
    marginLeft: 10,
  },

  totalsWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 30,
  },
  totalsContainer: {
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#78350f',
    border: '4pt solid #78350f',
    color: '#fffbeb',
    padding: 10,
    fontFamily: 'Courier-Bold',
    fontSize: 14,
  },

  amountInWordsBox: {
    textAlign: 'center',
    color: '#78350f',
    fontFamily: 'Courier-Bold',
    fontSize: 10,
    marginBottom: 40,
  },

  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    borderTop: '4pt solid #78350f',
    paddingTop: 16,
    fontFamily: 'Courier-Bold',
    fontSize: 8,
  },
  footerColLeft: {
    width: '50%',
  },
  footerColRight: {
    width: '50%',
    textAlign: 'right',
  },
  footerTitle: {
    color: '#451a03',
    textDecoration: 'underline',
    marginBottom: 4,
  },
  footerText: {
    color: '#92400e',
  }
});

interface RetroPDFProps {
  data: InvoiceData;
}

const RetroPDF: React.FC<RetroPDFProps> = ({ data }) => {
  const calculateTotal = () => {
    return data.items.reduce((acc, item) => acc + (parseFloat(item.quantity) || 1) * (item.price || 0), 0);
  };

  const total = data.grandTotal ?? calculateTotal();
  const totalInWords = numberToWordsFR(total);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        
        <View fixed style={styles.headerContainer}>
          <Text style={styles.companyName}>{data.senderName || 'RETRO COMPANY'}</Text>
          <Text style={styles.companySlogan}>--- {data.senderSlogan || 'Vintage Services'} ---</Text>
          <View style={styles.contactRow}>
            <Text style={styles.contactText}>[ EMAIL: {data.senderEmail || 'hello@retro.com'} ]</Text>
            <Text style={styles.contactText}>[ TEL: {data.senderPhone || '+000 000 000 000'} ]</Text>
          </View>
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.clientInfo}>
            <Text style={styles.sectionTitle}>FACTURE A:</Text>
            <Text style={styles.clientName}>{data.recipientName || 'Client Name'}</Text>
            <Text style={styles.clientAddress}>{data.recipientAddress || 'Client Address'}</Text>
          </View>
          <View style={styles.invoiceInfo}>
            <Text style={styles.sectionTitle}>DETAILS FACTURE:</Text>
            <View style={styles.invoiceMetaRow}>
              <Text style={styles.invoiceMetaLabel}>NO. FACTURE</Text>
              <Text>: {data.invoiceNumber || '---'}</Text>
            </View>
            <View style={styles.invoiceMetaRow}>
              <Text style={styles.invoiceMetaLabel}>DATE</Text>
              <Text>: {data.invoiceDate || '---'}</Text>
            </View>
            <View style={styles.invoiceMetaRow}>
              <Text style={styles.invoiceMetaLabel}>ECHEANCE</Text>
              <Text>: {data.invoiceValidity || '---'}</Text>
            </View>
          </View>
        </View>

        <View style={styles.subjectBox}>
          <Text>&gt; OBJET : {data.subject || 'Objet de la facture'}</Text>
        </View>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.thCol1}>DESCRIPTION</Text>
            <Text style={styles.thCol2}>QTE</Text>
            <Text style={styles.thCol3}>MONTANT</Text>
          </View>

          {data.items.length > 0 ? (
            data.items.map((item) => (
              <View key={item.id} style={styles.tableRow} wrap={false}>
                <View style={styles.tdCol1}>
                  <Text style={styles.itemDesignation}>&gt; {item.designation || 'Désignation'}</Text>
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
              <Text style={{ width: '100%', padding: 20, textAlign: 'center', color: '#d97706', fontFamily: 'Courier-Bold' }}>A U C U N E  L I G N E</Text>
            </View>
          )}
        </View>

        <View wrap={false}>
          <View style={styles.totalsWrapper}>
            <View style={styles.totalsContainer}>
              <Text>TOTAL :</Text>
              <Text>{formatCurrency(total)} CFA</Text>
            </View>
          </View>

          <View style={styles.amountInWordsBox}>
            <Text>*** SOMME ARRÊTÉE À : {totalInWords.toUpperCase()} FRANCS CFA ***</Text>
          </View>

          <View style={styles.footerContainer}>
            <View style={styles.footerColLeft}>
              <Text style={styles.footerTitle}>REGLEMENT:</Text>
              <Text style={styles.footerText}>VIREMENT / MOBILE MONEY</Text>
            </View>
            <View style={styles.footerColRight}>
              <Text style={styles.footerTitle}>SIGNATURE:</Text>
              <Text style={styles.footerText}>{data.senderName ? data.senderName.toUpperCase() : "L'ENTREPRISE"}</Text>
            </View>
          </View>
        </View>

      </Page>
    </Document>
  );
};

export default RetroPDF;
