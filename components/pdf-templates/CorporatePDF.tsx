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
    color: '#334155',
    backgroundColor: '#ffffff',
  },
  headerContainer: {
    position: 'absolute',
    top: 40,
    left: 40,
    right: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    borderBottom: '4pt solid #0f172a',
    paddingBottom: 20,
    height: 100,
  },
  headerLeft: {
    width: '60%',
  },
  companyName: {
    fontSize: 24,
    fontWeight: 'black',
    textTransform: 'uppercase',
    color: '#0f172a',
    letterSpacing: -1,
    marginBottom: 4,
  },
  companySlogan: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#64748b',
  },
  headerRight: {
    width: '40%',
    textAlign: 'right',
  },
  invoiceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0f172a',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  invoiceNumber: {
    color: '#64748b',
    fontSize: 10,
  },

  addressesBox: {
    flexDirection: 'row',
    backgroundColor: '#f8fafc',
    border: '1pt solid #e2e8f0',
    marginBottom: 30,
  },
  addressColLeft: {
    width: '50%',
    padding: 16,
    borderRight: '1pt solid #e2e8f0',
  },
  addressColRight: {
    width: '50%',
    padding: 16,
  },
  addressTitle: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#0f172a',
    textTransform: 'uppercase',
    letterSpacing: 2,
    borderBottom: '1pt solid #cbd5e1',
    paddingBottom: 6,
    marginBottom: 10,
  },
  addressName: {
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 4,
  },
  addressText: {
    color: '#475569',
    fontSize: 8,
    lineHeight: 1.5,
  },

  detailsBox: {
    flexDirection: 'row',
    borderTop: '1pt solid #e2e8f0',
    borderBottom: '1pt solid #e2e8f0',
    paddingVertical: 12,
    marginBottom: 30,
  },
  detailColFirst: {
    width: '33.33%',
    paddingRight: 10,
  },
  detailCol: {
    width: '33.33%',
    paddingLeft: 16,
    borderLeft: '1pt solid #e2e8f0',
  },
  detailLabel: {
    fontSize: 8,
    color: '#64748b',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  detailValue: {
    fontWeight: 'bold',
    color: '#0f172a',
  },

  table: {
    width: '100%',
    border: '1pt solid #e2e8f0',
    marginBottom: 30,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#0f172a',
    color: '#ffffff',
  },
  thCol1: { width: '60%', padding: 10, fontSize: 8, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1, borderRight: '1pt solid #334155' },
  thCol2: { width: '15%', padding: 10, textAlign: 'center', fontSize: 8, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1, borderRight: '1pt solid #334155' },
  thCol3: { width: '25%', padding: 10, textAlign: 'right', fontSize: 8, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1 },
  
  tableRowEven: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
  },
  tableRowOdd: {
    flexDirection: 'row',
    backgroundColor: '#f8fafc',
  },
  tdCol1: { width: '60%', padding: 12, borderRight: '1pt solid #e2e8f0', borderBottom: '1pt solid #e2e8f0' },
  tdCol2: { width: '15%', padding: 12, textAlign: 'center', borderRight: '1pt solid #e2e8f0', borderBottom: '1pt solid #e2e8f0', color: '#334155' },
  tdCol3: { width: '25%', padding: 12, textAlign: 'right', borderBottom: '1pt solid #e2e8f0', fontWeight: 'bold', color: '#0f172a' },
  
  itemDesignation: {
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 4,
  },
  itemDescription: {
    color: '#64748b',
    fontSize: 8,
    lineHeight: 1.5,
  },

  totalsWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 30,
  },
  totalsContainer: {
    width: '40%',
    backgroundColor: '#f8fafc',
    border: '1pt solid #0f172a',
  },
  totalsHeader: {
    backgroundColor: '#0f172a',
    color: '#ffffff',
    padding: 8,
    textAlign: 'center',
  },
  totalsLabel: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontSize: 10,
  },
  totalsBody: {
    padding: 16,
    textAlign: 'center',
  },
  totalsValue: {
    fontWeight: 'black',
    fontSize: 18,
    color: '#0f172a',
  },

  amountInWordsBox: {
    textAlign: 'center',
    color: '#64748b',
    fontSize: 10,
    marginBottom: 50,
  },
  amountInWordsValue: {
    fontWeight: 'bold',
    color: '#0f172a',
    textTransform: 'uppercase',
  },

  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    borderTop: '2pt solid #e2e8f0',
    paddingTop: 16,
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
    color: '#0f172a',
    textTransform: 'uppercase',
    letterSpacing: 2,
    fontSize: 8,
    marginBottom: 4,
  },
  footerText: {
    color: '#64748b',
    fontSize: 8,
  },
  footerSignatureText: {
    color: '#64748b',
    fontSize: 8,
    marginTop: 20,
    fontWeight: 'bold',
  }
});

interface CorporatePDFProps {
  data: InvoiceData;
}

const CorporatePDF: React.FC<CorporatePDFProps> = ({ data }) => {
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
            <Text style={styles.companyName}>{data.senderName || 'ENTERPRISE LLC'}</Text>
            <Text style={styles.companySlogan}>{data.senderSlogan || 'Global Solutions'}</Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.invoiceTitle}>Facture Commerciale</Text>
            <Text style={styles.invoiceNumber}>{data.invoiceNumber || '---'}</Text>
          </View>
        </View>

        <View style={styles.addressesBox}>
          <View style={styles.addressColLeft}>
            <Text style={styles.addressTitle}>Émetteur</Text>
            <Text style={styles.addressName}>{data.senderName}</Text>
            <Text style={styles.addressText}>{data.senderEmail || 'email@exemple.com'}</Text>
            <Text style={styles.addressText}>{data.senderPhone || '+000 000 000 000'}</Text>
          </View>
          <View style={styles.addressColRight}>
            <Text style={styles.addressTitle}>Destinataire</Text>
            <Text style={styles.addressName}>{data.recipientName || 'Client Name'}</Text>
            <Text style={styles.addressText}>{data.recipientAddress || 'Client Address'}</Text>
          </View>
        </View>

        <View style={styles.detailsBox}>
          <View style={styles.detailColFirst}>
            <Text style={styles.detailLabel}>Date d'émission</Text>
            <Text style={styles.detailValue}>{data.invoiceDate || '---'}</Text>
          </View>
          <View style={styles.detailCol}>
            <Text style={styles.detailLabel}>Échéance</Text>
            <Text style={styles.detailValue}>{data.invoiceValidity || '---'}</Text>
          </View>
          <View style={styles.detailCol}>
            <Text style={styles.detailLabel}>Objet</Text>
            <Text style={styles.detailValue}>{data.subject || '---'}</Text>
          </View>
        </View>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.thCol1}>Description</Text>
            <Text style={styles.thCol2}>Qté</Text>
            <Text style={styles.thCol3}>Montant</Text>
          </View>

          {data.items.length > 0 ? (
            data.items.map((item, i) => (
              <View key={item.id} style={i % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd} wrap={false}>
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
            <View style={styles.tableRowEven}>
              <Text style={{ width: '100%', padding: 20, textAlign: 'center', color: '#cbd5e1' }}>Aucune ligne</Text>
            </View>
          )}
        </View>

        <View wrap={false}>
          <View style={styles.totalsWrapper}>
            <View style={styles.totalsContainer}>
              <View style={styles.totalsHeader}>
                <Text style={styles.totalsLabel}>Total à payer</Text>
              </View>
              <View style={styles.totalsBody}>
                <Text style={styles.totalsValue}>{formatCurrency(total)} FCFA</Text>
              </View>
            </View>
          </View>

          <View style={styles.amountInWordsBox}>
            <Text>La somme due est de <Text style={styles.amountInWordsValue}>{totalInWords} Francs CFA</Text>.</Text>
          </View>

          <View style={styles.footerContainer}>
            <View style={styles.footerColLeft}>
              <Text style={styles.footerTitle}>Modalités de paiement</Text>
              <Text style={styles.footerText}>Virement bancaire / Mobile Money</Text>
            </View>
            <View style={styles.footerColRight}>
              <Text style={styles.footerTitle}>Visa / Signature</Text>
              <Text style={styles.footerSignatureText}>{data.senderName ? data.senderName.toUpperCase() : "L'ENTREPRISE"}</Text>
            </View>
          </View>
        </View>

      </Page>
    </Document>
  );
};

export default CorporatePDF;
