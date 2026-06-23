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
    color: '#374151',
    backgroundColor: '#ffffff',
  },
  headerContainer: {
    position: 'absolute',
    top: 40,
    left: 40,
    right: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottom: '2pt solid #1f2937',
    paddingBottom: 20,
    height: 100,
  },
  headerLeft: {
    width: '50%',
  },
  companyName: {
    fontSize: 24,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: '#111827',
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  companySlogan: {
    fontSize: 10,
    color: '#4b5563',
    marginBottom: 10,
  },
  contactText: {
    fontSize: 8,
    color: '#6b7280',
    marginBottom: 2,
  },
  headerRight: {
    width: '40%',
    textAlign: 'right',
  },
  invoiceTitle: {
    fontSize: 20,
    fontWeight: 'light',
    color: '#9ca3af',
    textTransform: 'uppercase',
    marginBottom: 10,
    letterSpacing: 2,
  },
  invoiceMetaRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 4,
  },
  invoiceMetaLabel: {
    fontWeight: 'bold',
    color: '#111827',
    marginRight: 10,
  },
  invoiceMetaValue: {
    color: '#4b5563',
  },

  clientBox: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  clientBoxLeft: {
    width: '50%',
  },
  clientBoxRight: {
    width: '50%',
    paddingLeft: 20,
    borderLeft: '1pt solid #e5e7eb',
  },
  sectionTitle: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#9ca3af',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 6,
  },
  clientName: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#111827',
    marginBottom: 4,
  },
  clientAddress: {
    color: '#4b5563',
    lineHeight: 1.4,
  },
  subjectText: {
    fontWeight: 'medium',
    color: '#1f2937',
  },

  table: {
    width: '100%',
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottom: '2pt solid #111827',
    paddingBottom: 8,
    marginBottom: 8,
  },
  thCol1: { width: '10%', paddingLeft: 4, color: '#111827', fontSize: 8, fontWeight: 'bold', textTransform: 'uppercase' },
  thCol2: { width: '50%', color: '#111827', fontSize: 8, fontWeight: 'bold', textTransform: 'uppercase' },
  thCol3: { width: '15%', textAlign: 'center', color: '#111827', fontSize: 8, fontWeight: 'bold', textTransform: 'uppercase' },
  thCol4: { width: '25%', paddingRight: 4, textAlign: 'right', color: '#111827', fontSize: 8, fontWeight: 'bold', textTransform: 'uppercase' },
  
  tableRow: {
    flexDirection: 'row',
    borderBottom: '1pt solid #e5e7eb',
    paddingVertical: 10,
  },
  tdCol1: { width: '10%', paddingLeft: 4, color: '#6b7280', textAlign: 'center' },
  tdCol2: { width: '50%' },
  tdCol3: { width: '15%', textAlign: 'center', color: '#4b5563' },
  tdCol4: { width: '25%', paddingRight: 4, textAlign: 'right', fontWeight: 'medium', color: '#111827' },
  
  itemDesignation: {
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  itemDescription: {
    color: '#6b7280',
    fontSize: 8,
    lineHeight: 1.4,
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
    backgroundColor: '#f3f4f6',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  totalsLabel: {
    fontWeight: 'bold',
    color: '#111827',
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontSize: 10,
  },
  totalsValue: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#111827',
  },

  amountInWordsBox: {
    marginBottom: 30,
    color: '#6b7280',
    fontSize: 10,
  },
  amountInWordsValue: {
    fontWeight: 'bold',
    color: '#111827',
  },

  bottomBoxes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  conditionsBox: {
    width: '50%',
  },
  signatureBox: {
    width: '50%',
    textAlign: 'right',
  },
  boxTitle: {
    fontWeight: 'bold',
    color: '#111827',
    fontSize: 8,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  conditionsText: {
    fontSize: 8,
    color: '#6b7280',
  },
  signatureText: {
    fontSize: 8,
    color: '#6b7280',
  },

  footerLine: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    borderTop: '1pt solid #e5e7eb',
    paddingTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 8,
    color: '#9ca3af',
  },
  footerSenderName: {
    fontWeight: 'bold',
    color: '#4b5563',
  }
});

interface ModernPDFProps {
  data: InvoiceData;
}

const ModernPDF: React.FC<ModernPDFProps> = ({ data }) => {
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
            <Text style={styles.contactText}>{data.senderEmail || 'email@exemple.com'}</Text>
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
            <View style={styles.invoiceMetaRow}>
              <Text style={styles.invoiceMetaLabel}>Validité</Text>
              <Text style={styles.invoiceMetaValue}>{data.invoiceValidity || '---'}</Text>
            </View>
          </View>
        </View>

        <View style={styles.clientBox}>
          <View style={styles.clientBoxLeft}>
            <Text style={styles.sectionTitle}>Facturé à</Text>
            <Text style={styles.clientName}>{data.recipientName || 'Nom du Client'}</Text>
            <Text style={styles.clientAddress}>{data.recipientAddress || 'Adresse du client'}</Text>
          </View>
          <View style={styles.clientBoxRight}>
            <Text style={styles.sectionTitle}>Objet</Text>
            <Text style={styles.subjectText}>{data.subject || 'Objet de la facture'}</Text>
          </View>
        </View>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.thCol1}>N°</Text>
            <Text style={styles.thCol2}>Désignation</Text>
            <Text style={styles.thCol3}>Qté</Text>
            <Text style={styles.thCol4}>Montant (FCFA)</Text>
          </View>

          {data.items.length > 0 ? (
            data.items.map((item, index) => (
              <View key={item.id} style={styles.tableRow} wrap={false}>
                <Text style={styles.tdCol1}>{(index + 1).toString().padStart(2, '0')}</Text>
                <View style={styles.tdCol2}>
                  <Text style={styles.itemDesignation}>{item.designation || 'Désignation'}</Text>
                  {item.description ? <Text style={styles.itemDescription}>{item.description}</Text> : null}
                </View>
                <Text style={styles.tdCol3}>{item.quantity || '1'}</Text>
                <Text style={styles.tdCol4}>
                  {formatCurrency((parseFloat(item.quantity) || 1) * (item.price || 0))}
                </Text>
              </View>
            ))
          ) : (
            <View style={styles.tableRow}>
              <Text style={{ width: '100%', padding: 20, textAlign: 'center', color: '#9ca3af' }}>Aucune ligne ajoutée</Text>
            </View>
          )}
        </View>

        <View wrap={false}>
          <View style={styles.totalsWrapper}>
            <View style={styles.totalsContainer}>
              <Text style={styles.totalsLabel}>Total Général</Text>
              <Text style={styles.totalsValue}>{formatCurrency(total)} FCFA</Text>
            </View>
          </View>

          <View style={styles.amountInWordsBox}>
            <Text>Arrêtée la présente facture à la somme de : <Text style={styles.amountInWordsValue}>{totalInWords} Francs CFA</Text></Text>
          </View>

          <View style={styles.bottomBoxes}>
            <View style={styles.conditionsBox}>
              <Text style={styles.boxTitle}>Conditions</Text>
              <Text style={styles.conditionsText}>Mode de règlement : Virement bancaire ou Mobile Money</Text>
            </View>
            <View style={styles.signatureBox}>
              <Text style={styles.boxTitle}>La Direction</Text>
              <Text style={styles.signatureText}>{data.senderName ? data.senderName.toUpperCase() : "L'ENTREPRISE"}</Text>
            </View>
          </View>
        </View>

        <View fixed style={styles.footerLine}>
          <Text style={styles.footerSenderName}>{data.senderName ? data.senderName.toUpperCase() : 'ETARCOS DEV'}</Text>
          <Text>{data.senderEmail || 'email@exemple.com'} | {data.senderPhone || '+000 000 000 000'}</Text>
        </View>

      </Page>
    </Document>
  );
};

export default ModernPDF;
