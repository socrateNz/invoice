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
    color: '#000000',
    backgroundColor: '#ffffff',
  },
  headerContainer: {
    position: 'absolute',
    top: 40,
    left: 40,
    right: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
    height: 100,
  },
  headerLeft: {
    width: '50%',
  },
  companyName: {
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 4,
  },
  companySlogan: {
    fontSize: 8,
    opacity: 0.8,
    marginBottom: 4,
  },
  contactText: {
    fontSize: 8,
    opacity: 0.8,
  },
  headerRight: {
    width: '40%',
    textAlign: 'right',
  },
  invoiceTitle: {
    fontSize: 18,
    fontWeight: 'normal',
    textTransform: 'uppercase',
    letterSpacing: 2,
    borderBottom: '1pt solid #000000',
    paddingBottom: 4,
    marginBottom: 8,
  },
  invoiceMetaRow: {
    fontSize: 8,
    marginBottom: 2,
  },
  invoiceMetaLabel: {
    marginRight: 5,
  },
  invoiceMetaValue: {
    fontWeight: 'bold',
  },

  clientBox: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 40,
  },
  clientBoxContent: {
    width: '50%',
    borderLeft: '2pt solid #000000',
    paddingLeft: 10,
  },
  clientBoxTitle: {
    fontSize: 8,
    textTransform: 'uppercase',
    letterSpacing: 2,
    opacity: 0.6,
    marginBottom: 6,
  },
  clientName: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 4,
  },
  clientAddress: {
    fontSize: 10,
    lineHeight: 1.4,
  },
  subjectContainer: {
    borderBottom: '1pt solid #000000',
    paddingBottom: 4,
    marginBottom: 20,
  },
  subjectText: {
    fontWeight: 'normal',
    fontSize: 10,
  },
  subjectLabel: {
    fontWeight: 'bold',
    fontSize: 8,
    letterSpacing: 1,
  },

  table: {
    width: '100%',
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottom: '1pt solid #000000',
    paddingBottom: 6,
    marginBottom: 10,
  },
  thCol1: { width: '60%', fontSize: 8, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1 },
  thCol2: { width: '15%', textAlign: 'center', fontSize: 8, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1 },
  thCol3: { width: '25%', textAlign: 'right', fontSize: 8, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1 },
  
  tableRow: {
    flexDirection: 'row',
    borderBottom: '1pt solid #f3f4f6',
    paddingVertical: 12,
  },
  tdCol1: { width: '60%' },
  tdCol2: { width: '15%', textAlign: 'center' },
  tdCol3: { width: '25%', textAlign: 'right', fontWeight: 'bold' },
  
  itemDesignation: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 8,
    lineHeight: 1.4,
    color: '#4b5563',
  },

  totalsWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 40,
    marginTop: 20,
  },
  totalsContainer: {
    width: '40%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTop: '2pt solid #000000',
    paddingTop: 10,
  },
  totalsLabel: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontSize: 10,
  },
  totalsValue: {
    fontWeight: 'bold',
    fontSize: 14,
  },

  amountInWordsBox: {
    marginBottom: 40,
    fontSize: 10,
    opacity: 0.8,
  },

  footerContainer: {
    position: 'absolute',
    bottom: 40,
    left: 40,
    right: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 8,
  },
  footerCol: {
    width: '30%',
  },
  footerTitle: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
    borderBottom: '1pt solid #000000',
    paddingBottom: 4,
    marginBottom: 6,
  },
  footerText: {
    lineHeight: 1.4,
    opacity: 0.8,
  }
});

interface MinimalistPDFProps {
  data: InvoiceData;
}

const MinimalistPDF: React.FC<MinimalistPDFProps> = ({ data }) => {
  const calculateTotal = () => {
    return data.items.reduce((acc, item) => acc + (parseFloat(item.quantity) || 1) * (item.price || 0), 0);
  };

  const total = data.grandTotal ?? calculateTotal();
  const totalInWords = numberToWordsFR(total);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        
        <View fixed style={styles.headerContainer}>
          <View style={styles.headerLeft}>
            <Text style={styles.companyName}>{data.senderName || 'NOM ENTREPRISE'}</Text>
            <Text style={styles.companySlogan}>{data.senderSlogan || 'Slogan de l\'entreprise'}</Text>
            <Text style={styles.contactText}>{data.senderEmail || 'email@exemple.com'} — {data.senderPhone || '+000 000 000 000'}</Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.invoiceTitle}>Facture</Text>
            <Text style={styles.invoiceMetaRow}>
              Facture N° : <Text style={styles.invoiceMetaValue}>{data.invoiceNumber || '---'}</Text>
            </Text>
            <Text style={styles.invoiceMetaRow}>
              Date : <Text style={styles.invoiceMetaValue}>{data.invoiceDate || '---'}</Text>
            </Text>
          </View>
        </View>

        <View style={styles.clientBox}>
          <View style={styles.clientBoxContent}>
            <Text style={styles.clientBoxTitle}>Facturé à</Text>
            <Text style={styles.clientName}>{data.recipientName || 'Nom du Client'}</Text>
            <Text style={styles.clientAddress}>{data.recipientAddress || 'Adresse du client'}</Text>
          </View>
        </View>

        <View style={styles.subjectContainer}>
          <Text style={styles.subjectText}>
            <Text style={styles.subjectLabel}>OBJET : </Text>{data.subject || 'Objet de la facture'}
          </Text>
        </View>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.thCol1}>Description</Text>
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
              <Text style={{ width: '100%', textAlign: 'center', opacity: 0.5 }}>Aucune ligne ajoutée</Text>
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
            <Text>Arrêtée la présente facture à la somme de : {totalInWords} Francs CFA</Text>
          </View>
        </View>

        <View fixed style={styles.footerContainer}>
          <View style={styles.footerCol}>
            <Text style={styles.footerTitle}>Paiement</Text>
            <Text style={styles.footerText}>Virement bancaire ou Mobile Money</Text>
          </View>
          <View style={styles.footerCol}>
            <Text style={styles.footerTitle}>Contact</Text>
            <Text style={styles.footerText}>{data.senderEmail || 'email@exemple.com'}</Text>
            <Text style={styles.footerText}>{data.senderPhone || '+000 000 000 000'}</Text>
          </View>
          <View style={styles.footerCol}>
            <Text style={styles.footerTitle}>Signature</Text>
            <Text style={styles.footerText}>{data.senderName ? data.senderName.toUpperCase() : 'L\'ENTREPRISE'}</Text>
          </View>
        </View>

      </Page>
    </Document>
  );
};

export default MinimalistPDF;
