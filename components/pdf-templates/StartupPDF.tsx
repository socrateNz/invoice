import React from 'react';
import { Document, Page, Text, View, StyleSheet, Svg, Defs, LinearGradient, Stop, Rect } from '@react-pdf/renderer';
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
  gradientHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 100,
    opacity: 0.1,
  },
  headerContainer: {
    position: 'absolute',
    top: 40,
    left: 40,
    right: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 100,
  },
  headerLeft: {
    width: '50%',
  },
  companyName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ec4899',
    marginBottom: 6,
  },
  companySlogan: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#64748b',
    marginBottom: 8,
  },
  contactText: {
    fontSize: 8,
    color: '#94a3b8',
    marginBottom: 2,
  },
  headerRight: {
    width: '40%',
    textAlign: 'right',
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 8,
    border: '1pt solid #f1f5f9',
  },
  invoiceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f43f5e',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  invoiceMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
    fontSize: 8,
  },
  invoiceMetaLabel: {
    color: '#94a3b8',
  },
  invoiceMetaValue: {
    fontWeight: 'bold',
    color: '#334155',
  },

  clientInfoContainer: {
    flexDirection: 'row',
    marginBottom: 40,
  },
  clientBox: {
    width: '50%',
    backgroundColor: '#f8fafc',
    padding: 16,
    borderRadius: 12,
    border: '1pt solid #e2e8f0',
    marginRight: 20,
  },
  clientTitle: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#ec4899',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 6,
  },
  clientName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 4,
  },
  clientAddress: {
    color: '#64748b',
    fontSize: 8,
    lineHeight: 1.5,
  },

  subjectBox: {
    width: '45%',
    padding: 16,
    borderLeft: '2pt solid #f1f5f9',
  },
  subjectTitle: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#a855f7',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 6,
  },
  subjectText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#334155',
  },

  table: {
    width: '100%',
    marginBottom: 30,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f8fafc',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  thCol1: { width: '60%', color: '#64748b', fontSize: 8, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1 },
  thCol2: { width: '15%', textAlign: 'center', color: '#64748b', fontSize: 8, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1 },
  thCol3: { width: '25%', textAlign: 'right', color: '#64748b', fontSize: 8, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1 },
  
  tableRow: {
    flexDirection: 'row',
    borderBottom: '1pt solid #f1f5f9',
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  tdCol1: { width: '60%', paddingRight: 10 },
  tdCol2: { width: '15%', textAlign: 'center', fontWeight: 'bold', color: '#334155' },
  tdCol3: { width: '25%', textAlign: 'right', fontWeight: 'bold', color: '#334155' },
  
  itemDesignation: {
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 4,
  },
  itemDescription: {
    color: '#94a3b8',
    fontSize: 8,
    lineHeight: 1.5,
  },

  totalsWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 30,
  },
  totalsGradientBorder: {
    width: '50%',
    padding: 2,
    borderRadius: 12,
    backgroundColor: '#ec4899', // fallback
  },
  totalsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 10,
  },
  totalsLabel: {
    fontWeight: 'bold',
    color: '#334155',
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontSize: 10,
  },
  totalsValue: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#ec4899',
  },
  totalsCurrency: {
    fontSize: 10,
    color: '#334155',
  },

  amountInWordsBox: {
    textAlign: 'center',
    marginBottom: 50,
  },
  amountInWordsValue: {
    fontWeight: 'bold',
    color: '#0f172a',
  },

  bottomBoxes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 8,
  },
  bottomColLeft: {
    width: '50%',
  },
  bottomColRight: {
    width: '50%',
    textAlign: 'right',
  },
  boxTitle: {
    fontWeight: 'bold',
    color: '#334155',
    marginBottom: 4,
  },
  boxText: {
    color: '#94a3b8',
  }
});

interface StartupPDFProps {
  data: InvoiceData;
}

const StartupPDF: React.FC<StartupPDFProps> = ({ data }) => {
  const calculateTotal = () => {
    return data.items.reduce((acc, item) => acc + (parseFloat(item.quantity) || 1) * (item.price || 0), 0);
  };

  const total = data.grandTotal ?? calculateTotal();
  const totalInWords = numberToWordsFR(total);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        
        {/* Gradient Background for Header */}
        <View fixed style={styles.gradientHeader}>
          <Svg height="100%" width="100%">
            <Defs>
              <LinearGradient id="myGradient" x1="0" y1="0" x2="1" y2="0">
                <Stop offset="0" stopColor="#a855f7" />
                <Stop offset="0.5" stopColor="#ec4899" />
                <Stop offset="1" stopColor="#f43f5e" />
              </LinearGradient>
            </Defs>
            <Rect x="0" y="0" width="100%" height="100%" fill="url('#myGradient')" />
          </Svg>
        </View>

        <View fixed style={styles.headerContainer}>
          <View style={styles.headerLeft}>
            <Text style={styles.companyName}>{data.senderName || 'STARTUP INC'}</Text>
            <Text style={styles.companySlogan}>{data.senderSlogan || 'Innovate the future'}</Text>
            <Text style={styles.contactText}>{data.senderEmail || 'hello@startup.com'}</Text>
            <Text style={styles.contactText}>{data.senderPhone || '+000 000 000 000'}</Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.invoiceTitle}>Facture</Text>
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

        <View style={styles.clientInfoContainer}>
          <View style={styles.clientBox}>
            <Text style={styles.clientTitle}>Facturé à</Text>
            <Text style={styles.clientName}>{data.recipientName || 'Client Name'}</Text>
            <Text style={styles.clientAddress}>{data.recipientAddress || 'Client Address'}</Text>
          </View>
          <View style={styles.subjectBox}>
            <Text style={styles.subjectTitle}>Projet / Objet</Text>
            <Text style={styles.subjectText}>{data.subject || 'Objet de la facture'}</Text>
          </View>
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
              <Text style={{ width: '100%', textAlign: 'center', color: '#cbd5e1' }}>Aucune ligne ajoutée</Text>
            </View>
          )}
        </View>

        <View wrap={false}>
          <View style={styles.totalsWrapper}>
            <View style={styles.totalsGradientBorder}>
              <View style={styles.totalsContainer}>
                <Text style={styles.totalsLabel}>Total</Text>
                <Text style={styles.totalsValue}>
                  {formatCurrency(total)} <Text style={styles.totalsCurrency}>FCFA</Text>
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.amountInWordsBox}>
            <Text style={styles.amountInWordsValue}>{totalInWords} Francs CFA</Text>
          </View>

          <View style={styles.bottomBoxes}>
            <View style={styles.bottomColLeft}>
              <Text style={styles.boxTitle}>Règlement</Text>
              <Text style={styles.boxText}>Virement bancaire / Mobile Money</Text>
            </View>
            <View style={styles.bottomColRight}>
              <Text style={styles.boxTitle}>Signature</Text>
              <Text style={styles.boxText}>{data.senderName ? data.senderName.toUpperCase() : "L'ENTREPRISE"}</Text>
            </View>
          </View>
        </View>

      </Page>
    </Document>
  );
};

export default StartupPDF;
