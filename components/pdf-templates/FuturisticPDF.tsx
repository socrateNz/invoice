import React from 'react';
import { Document, Page, Text, View, StyleSheet, Svg, Circle } from '@react-pdf/renderer';
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
    color: '#e2e8f0',
    backgroundColor: '#020617',
    borderLeft: '4pt solid #06b6d4',
  },
  backgroundSvg: {
    position: 'absolute',
    top: 40,
    right: 40,
    opacity: 0.2,
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
    fontWeight: 'black',
    textTransform: 'uppercase',
    color: '#06b6d4',
    letterSpacing: 2,
    marginBottom: 4,
  },
  companySlogan: {
    fontSize: 10,
    fontFamily: 'Courier',
    color: '#3b82f6',
    letterSpacing: 2,
    marginBottom: 10,
  },
  contactText: {
    fontSize: 8,
    fontFamily: 'Courier',
    color: '#94a3b8',
    marginBottom: 2,
  },
  headerRight: {
    width: '40%',
    textAlign: 'right',
  },
  invoiceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e2e8f0',
    textTransform: 'uppercase',
    letterSpacing: 4,
    borderBottom: '1pt solid #3b82f6',
    paddingBottom: 6,
    marginBottom: 10,
    alignSelf: 'flex-end',
  },
  invoiceMetaRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 4,
    fontSize: 8,
    fontFamily: 'Courier',
  },
  invoiceMetaLabel: {
    color: '#06b6d4',
    marginRight: 6,
  },
  invoiceMetaValue: {
    color: '#e2e8f0',
  },

  boxesContainer: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  clientBox: {
    width: '60%',
    backgroundColor: '#0f172a',
    padding: 16,
    border: '1pt solid #1e293b',
    borderRadius: 4,
    marginRight: 16,
  },
  clientTitle: {
    fontSize: 8,
    fontFamily: 'Courier',
    color: '#06b6d4',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 8,
  },
  clientName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#f8fafc',
    marginBottom: 4,
  },
  clientAddress: {
    color: '#94a3b8',
    fontSize: 8,
    lineHeight: 1.5,
  },

  subjectBox: {
    width: '40%',
    backgroundColor: '#0f172a',
    padding: 16,
    border: '1pt solid #1e293b',
    borderRadius: 4,
  },
  subjectTitle: {
    fontSize: 8,
    fontFamily: 'Courier',
    color: '#3b82f6',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 8,
  },
  subjectText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#e2e8f0',
    lineHeight: 1.5,
  },

  table: {
    width: '100%',
    marginBottom: 30,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottom: '1pt solid #1e293b',
    paddingBottom: 8,
    marginBottom: 8,
  },
  thCol1: { width: '60%', color: '#06b6d4', fontFamily: 'Courier', fontSize: 8, textTransform: 'uppercase', letterSpacing: 2, paddingHorizontal: 6 },
  thCol2: { width: '15%', textAlign: 'center', color: '#06b6d4', fontFamily: 'Courier', fontSize: 8, textTransform: 'uppercase', letterSpacing: 2, paddingHorizontal: 6 },
  thCol3: { width: '25%', textAlign: 'right', color: '#06b6d4', fontFamily: 'Courier', fontSize: 8, textTransform: 'uppercase', letterSpacing: 2, paddingHorizontal: 6 },
  
  tableRow: {
    flexDirection: 'row',
    borderBottom: '1pt solid #1e293b',
    paddingVertical: 12,
  },
  tdCol1: { width: '60%', paddingHorizontal: 6 },
  tdCol2: { width: '15%', paddingHorizontal: 6, textAlign: 'center', fontFamily: 'Courier', color: '#e2e8f0' },
  tdCol3: { width: '25%', paddingHorizontal: 6, textAlign: 'right', fontFamily: 'Courier', color: '#3b82f6' },
  
  itemDesignation: {
    fontWeight: 'bold',
    color: '#f8fafc',
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
    width: '50%',
    backgroundColor: '#0f172a',
    border: '1pt solid #06b6d4',
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalsLeftBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 4,
    backgroundColor: '#06b6d4',
  },
  totalsLabel: {
    fontFamily: 'Courier',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: 2,
    fontSize: 10,
    marginLeft: 8,
  },
  totalsValue: {
    fontWeight: 'black',
    fontSize: 18,
    color: '#f8fafc',
  },
  totalsCurrency: {
    fontSize: 10,
    fontFamily: 'Courier',
    color: '#06b6d4',
  },

  amountInWordsBox: {
    textAlign: 'center',
    color: '#64748b',
    fontFamily: 'Courier',
    fontSize: 8,
    textTransform: 'uppercase',
    letterSpacing: 2,
    borderTop: '1pt solid #1e293b',
    borderBottom: '1pt solid #1e293b',
    paddingVertical: 10,
    marginBottom: 40,
  },
  amountInWordsValue: {
    color: '#e2e8f0',
  },

  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    fontFamily: 'Courier',
    fontSize: 10,
  },
  footerColLeft: {
    width: '50%',
  },
  footerColRight: {
    width: '50%',
    textAlign: 'right',
  },
  footerTitle: {
    color: '#06b6d4',
    marginBottom: 4,
  },
  footerText: {
    color: '#94a3b8',
    fontSize: 8,
  },
  footerTextValue: {
    color: '#e2e8f0',
    fontSize: 8,
  }
});

interface FuturisticPDFProps {
  data: InvoiceData;
}

const FuturisticPDF: React.FC<FuturisticPDFProps> = ({ data }) => {
  const calculateTotal = () => {
    return data.items.reduce((acc, item) => acc + (parseFloat(item.quantity) || 1) * (item.price || 0), 0);
  };

  const total = data.grandTotal ?? calculateTotal();
  const totalInWords = numberToWordsFR(total);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        
        <View fixed style={styles.backgroundSvg}>
          <Svg width="100" height="100" viewBox="0 0 100 100">
            <Circle cx="50" cy="50" r="49" stroke="#06b6d4" strokeWidth="2" strokeDasharray="4 4" fill="none" />
            <Circle cx="50" cy="50" r="30" stroke="#3b82f6" strokeWidth="1" fill="none" />
          </Svg>
        </View>

        <View fixed style={styles.headerContainer}>
          <View style={styles.headerLeft}>
            <Text style={styles.companyName}>{data.senderName || 'CYBER CORP'}</Text>
            <Text style={styles.companySlogan}>&gt;_ {data.senderSlogan || 'System.out.println("Future")'}</Text>
            <Text style={styles.contactText}>EMAIL // {data.senderEmail || 'sys@cyber.com'}</Text>
            <Text style={styles.contactText}>COMM  // {data.senderPhone || '+000 000 000 000'}</Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.invoiceTitle}>INVOICE_DATA</Text>
            <View style={styles.invoiceMetaRow}>
              <Text style={styles.invoiceMetaLabel}>ID:</Text>
              <Text style={styles.invoiceMetaValue}>{data.invoiceNumber || '---'}</Text>
            </View>
            <View style={styles.invoiceMetaRow}>
              <Text style={styles.invoiceMetaLabel}>TS:</Text>
              <Text style={styles.invoiceMetaValue}>{data.invoiceDate || '---'}</Text>
            </View>
            <View style={styles.invoiceMetaRow}>
              <Text style={styles.invoiceMetaLabel}>EXP:</Text>
              <Text style={styles.invoiceMetaValue}>{data.invoiceValidity || '---'}</Text>
            </View>
          </View>
        </View>

        <View style={styles.boxesContainer}>
          <View style={styles.clientBox}>
            <Text style={styles.clientTitle}>TARGET_ENTITY</Text>
            <Text style={styles.clientName}>{data.recipientName || 'Entity Name'}</Text>
            <Text style={styles.clientAddress}>{data.recipientAddress || 'Entity Address'}</Text>
          </View>
          <View style={styles.subjectBox}>
            <Text style={styles.subjectTitle}>OPERATION_SCOPE</Text>
            <Text style={styles.subjectText}>{data.subject || 'Operation Subject'}</Text>
          </View>
        </View>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.thCol1}>PARAM / DETAILS</Text>
            <Text style={styles.thCol2}>VOL</Text>
            <Text style={styles.thCol3}>CREDITS</Text>
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
              <Text style={{ width: '100%', padding: 20, textAlign: 'center', color: '#475569', fontFamily: 'Courier' }}>NO_DATA_FOUND</Text>
            </View>
          )}
        </View>

        <View wrap={false}>
          <View style={styles.totalsWrapper}>
            <View style={styles.totalsContainer}>
              <View style={styles.totalsLeftBorder}></View>
              <Text style={styles.totalsLabel}>TOTAL_REQ</Text>
              <Text style={styles.totalsValue}>
                {formatCurrency(total)} <Text style={styles.totalsCurrency}>FCFA</Text>
              </Text>
            </View>
          </View>

          <View style={styles.amountInWordsBox}>
            <Text>CHECKSUM: <Text style={styles.amountInWordsValue}>{totalInWords} FCFA</Text></Text>
          </View>

          <View style={styles.footerContainer}>
            <View style={styles.footerColLeft}>
              <Text style={styles.footerTitle}>TX_METHOD:</Text>
              <Text style={styles.footerText}>BANK_TRANSFER // MOBILE_MONEY</Text>
            </View>
            <View style={styles.footerColRight}>
              <Text style={styles.footerTitle}>AUTH_KEY:</Text>
              <Text style={styles.footerTextValue}>{data.senderName ? data.senderName.toUpperCase() : 'SYSADMIN'}</Text>
            </View>
          </View>
        </View>

      </Page>
    </Document>
  );
};

export default FuturisticPDF;
