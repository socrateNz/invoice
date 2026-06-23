import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import { InvoiceData } from '@/types/invoice';
import { formatCurrency, numberToWordsFR } from '@/utils/format';

// Define styles
const styles = StyleSheet.create({
  page: {
    paddingTop: 140, // Space for fixed header
    paddingBottom: 80, // Space for fixed footer
    paddingLeft: 40,
    paddingRight: 40,
    fontFamily: 'Helvetica',
    fontSize: 10,
    color: '#1f2937',
    backgroundColor: '#ffffff',
  },
  // Fixed Header
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
    backgroundColor: '#1e3a8a',
    color: '#ffffff',
    padding: 15,
    width: '45%',
    borderBottomRightRadius: 8,
  },
  companyName: {
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  companySlogan: {
    fontSize: 8,
    marginBottom: 8,
    opacity: 0.9,
  },
  contactText: {
    fontSize: 8,
    marginBottom: 2,
  },
  headerRight: {
    width: '50%',
    textAlign: 'right',
    paddingTop: 10,
  },
  invoiceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e3a8a',
    textTransform: 'uppercase',
    marginBottom: 10,
    letterSpacing: 1,
  },
  invoiceMetaRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 2,
  },
  invoiceMetaLabel: {
    color: '#4b5563',
    marginRight: 5,
  },
  invoiceMetaValue: {
    fontWeight: 'bold',
    color: '#1f2937',
  },

  // Normal flow content
  clientBox: {
    border: '1pt solid #1e3a8a',
    marginBottom: 20,
  },
  clientBoxTitle: {
    backgroundColor: '#e6edf5',
    color: '#1e3a8a',
    padding: '4 8',
    fontSize: 8,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    borderBottom: '1pt solid #1e3a8a',
  },
  clientBoxContent: {
    padding: 8,
  },
  clientName: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#111827',
    marginBottom: 2,
  },
  clientAddress: {
    color: '#4b5563',
    lineHeight: 1.4,
  },
  subject: {
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },

  // Table
  table: {
    width: '100%',
    border: '1pt solid #d1d5db',
    borderBottom: 0,
    marginBottom: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#1e3a8a',
    color: '#ffffff',
    textTransform: 'uppercase',
    fontSize: 8,
    fontWeight: 'bold',
  },
  thCol1: { width: '10%', padding: 6, borderRight: '1pt solid #1e3a8a' },
  thCol2: { width: '50%', padding: 6, borderRight: '1pt solid #1e3a8a' },
  thCol3: { width: '15%', padding: 6, textAlign: 'center', borderRight: '1pt solid #1e3a8a' },
  thCol4: { width: '25%', padding: 6, textAlign: 'right' },
  
  tableRow: {
    flexDirection: 'row',
    borderBottom: '1pt solid #d1d5db',
  },
  tdCol1: { width: '10%', padding: 6, borderRight: '1pt solid #d1d5db', textAlign: 'center' },
  tdCol2: { width: '50%', padding: 6, borderRight: '1pt solid #d1d5db' },
  tdCol3: { width: '15%', padding: 6, textAlign: 'center', borderRight: '1pt solid #d1d5db' },
  tdCol4: { width: '25%', padding: 6, textAlign: 'right' },
  
  itemDesignation: {
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 2,
  },
  itemDescription: {
    color: '#4b5563',
    fontSize: 8,
    lineHeight: 1.4,
  },

  // Totals
  totalsContainer: {
    flexDirection: 'row',
    border: '1pt solid #1e3a8a',
    borderTop: 0,
    marginBottom: 10,
    marginTop: -10, // overlap bottom border of table
  },
  totalsLabel: {
    flexGrow: 1,
    backgroundColor: '#1e3a8a',
    color: '#ffffff',
    padding: '6 10',
    textAlign: 'right',
    fontWeight: 'bold',
  },
  totalsValue: {
    width: 100,
    backgroundColor: '#facc15',
    color: '#111827',
    padding: '6 10',
    textAlign: 'right',
    fontWeight: 'bold',
    fontSize: 12,
  },

  amountInWordsBox: {
    border: '1pt solid #d1d5db',
    padding: 8,
    marginBottom: 20,
    fontSize: 10,
  },
  amountInWordsLabel: {
    color: '#1f2937',
  },
  amountInWordsValue: {
    fontWeight: 'bold',
    color: '#1e3a8a',
  },

  // Conditions & Signature
  bottomBoxes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    border: '1pt solid #d1d5db',
    marginBottom: 20,
  },
  conditionsBox: {
    width: '50%',
    padding: 10,
    borderRight: '1pt solid #d1d5db',
  },
  signatureBox: {
    width: '50%',
    padding: 10,
    position: 'relative',
    minHeight: 100,
  },
  boxTitle: {
    fontWeight: 'bold',
    color: '#1e3a8a',
    fontSize: 8,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  conditionsText: {
    fontSize: 8,
    color: '#374151',
  },
  signatureText: {
    fontSize: 8,
    color: '#4b5563',
    marginBottom: 30,
  },
  signatureLabel: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    fontSize: 8,
    color: '#1f2937',
  },

  // Absolute Footer
  footerLine: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    borderTop: '2pt solid #1e3a8a',
    paddingTop: 8,
    textAlign: 'center',
    fontSize: 8,
    color: '#6b7280',
  },
  footerSenderName: {
    fontWeight: 'bold',
    color: '#111827',
  }
});

interface ClassicPDFProps {
  data: InvoiceData;
}

const ClassicPDF: React.FC<ClassicPDFProps> = ({ data }) => {
  const calculateTotal = () => {
    return data.items.reduce((acc, item) => acc + (parseFloat(item.quantity) || 1) * (item.price || 0), 0);
  };

  const total = data.grandTotal ?? calculateTotal();
  const totalInWords = numberToWordsFR(total);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        
        {/* Fixed Header */}
        <View fixed style={styles.headerContainer}>
          <View style={styles.headerLeft}>
            <Text style={styles.companyName}>{data.senderName || 'NOM ENTREPRISE'}</Text>
            <Text style={styles.companySlogan}>{data.senderSlogan || 'Slogan de l\'entreprise'}</Text>
            <Text style={styles.contactText}>Email : {data.senderEmail || 'email@exemple.com'}</Text>
            <Text style={styles.contactText}>Tél : {data.senderPhone || '+000 000 000 000'}</Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.invoiceTitle}>Facture Proforma</Text>
            <View style={styles.invoiceMetaRow}>
              <Text style={styles.invoiceMetaLabel}>N° : </Text>
              <Text style={styles.invoiceMetaValue}>{data.invoiceNumber || '---'}</Text>
            </View>
            <View style={styles.invoiceMetaRow}>
              <Text style={styles.invoiceMetaLabel}>Date : </Text>
              <Text style={styles.invoiceMetaValue}>{data.invoiceDate || '---'}</Text>
            </View>
            <View style={styles.invoiceMetaRow}>
              <Text style={styles.invoiceMetaLabel}>Validité : </Text>
              <Text style={styles.invoiceMetaValue}>{data.invoiceValidity || '---'}</Text>
            </View>
          </View>
        </View>

        {/* Client Info (Page 1 Only) */}
        <View style={styles.clientBox}>
          <Text style={styles.clientBoxTitle}>Destinataire / Client</Text>
          <View style={styles.clientBoxContent}>
            <Text style={styles.clientName}>{data.recipientName || 'Nom du Client'}</Text>
            <Text style={styles.clientAddress}>{data.recipientAddress || 'Adresse du client'}</Text>
          </View>
        </View>

        <Text style={styles.subject}>Objet : {data.subject || 'Objet de la facture'}</Text>

        {/* Table */}
        <View style={styles.table}>
          {/* We do not repeat this header, but it could be built to repeat */}
          <View style={styles.tableHeader}>
            <Text style={styles.thCol1}>N°</Text>
            <Text style={styles.thCol2}>Désignation / Description</Text>
            <Text style={styles.thCol3}>Quantité</Text>
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

        {/* Totals Block */}
        <View wrap={false}>
          <View style={styles.totalsContainer}>
            <Text style={styles.totalsLabel}>TOTAL GENERAL (FCFA)</Text>
            <Text style={styles.totalsValue}>{formatCurrency(total)}</Text>
          </View>

          <View style={styles.amountInWordsBox}>
            <Text style={styles.amountInWordsLabel}>
              Arrêtée la présente facture à la somme de : <Text style={styles.amountInWordsValue}>{totalInWords} Francs CFA ({formatCurrency(total)} FCFA)</Text>
            </Text>
          </View>

          <View style={styles.bottomBoxes}>
            <View style={styles.conditionsBox}>
              <Text style={styles.boxTitle}>Conditions de Règlement</Text>
              <Text style={styles.conditionsText}>• Mode de règlement : virement bancaire / Mobile Money</Text>
            </View>
            <View style={styles.signatureBox}>
              <Text style={styles.boxTitle}>Signature & Cachet</Text>
              <Text style={styles.signatureText}>Pour {data.senderName ? data.senderName.toUpperCase() : "L'ENTREPRISE"}</Text>
              <Text style={styles.signatureLabel}>Le Directeur Général</Text>
            </View>
          </View>
        </View>

        {/* Fixed Footer */}
        <View fixed style={styles.footerLine}>
          <Text>
            <Text style={styles.footerSenderName}>{data.senderName ? data.senderName.toUpperCase() : 'ETARCOS DEV'} </Text>
            — {data.senderSlogan || 'Solutions Numériques & Développement Web'} | {data.senderEmail || 'email@exemple.com'}
          </Text>
        </View>

      </Page>
    </Document>
  );
};

export default ClassicPDF;
