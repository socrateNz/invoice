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
  backgroundShape: {
    position: 'absolute',
    top: -20,
    right: -20,
    width: 300,
    height: 300,
    backgroundColor: '#0d9488',
    opacity: 0.1,
    borderBottomLeftRadius: 300,
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
    color: '#0d9488',
    marginBottom: 4,
  },
  companySlogan: {
    fontSize: 10,
    fontWeight: 'medium',
    color: '#111827',
    marginBottom: 10,
  },
  contactRow: {
    flexDirection: 'row',
  },
  contactBadge: {
    backgroundColor: '#f0fdfa',
    color: '#0f766e',
    padding: '4 8',
    borderRadius: 4,
    fontSize: 8,
    marginRight: 8,
  },
  headerRight: {
    width: '40%',
  },
  invoiceBox: {
    backgroundColor: '#0d9488',
    color: '#ffffff',
    padding: 16,
    borderRadius: 16,
  },
  invoiceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    borderBottom: '1pt solid #5eead4',
    paddingBottom: 6,
    marginBottom: 10,
    letterSpacing: 1,
  },
  invoiceMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
    fontSize: 8,
  },
  invoiceMetaLabel: {
    color: '#ccfbf1',
  },
  invoiceMetaValue: {
    fontWeight: 'bold',
  },

  clientBox: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    borderRadius: 16,
    padding: 20,
    borderLeft: '4pt solid #0d9488',
    marginBottom: 30,
  },
  clientBoxLeft: {
    width: '50%',
    paddingRight: 10,
    borderRight: '1pt solid #d1d5db',
  },
  clientBoxRight: {
    width: '50%',
    paddingLeft: 20,
  },
  sectionTitle: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#0d9488',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
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
    fontSize: 12,
    color: '#1f2937',
    lineHeight: 1.5,
  },

  table: {
    width: '100%',
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    paddingBottom: 8,
    paddingLeft: 10,
    paddingRight: 10,
  },
  thCol1: { width: '60%', color: '#9ca3af', fontSize: 8, textTransform: 'uppercase' },
  thCol2: { width: '15%', textAlign: 'center', color: '#9ca3af', fontSize: 8, textTransform: 'uppercase' },
  thCol3: { width: '25%', textAlign: 'right', color: '#9ca3af', fontSize: 8, textTransform: 'uppercase' },
  
  tableRow: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    padding: 12,
    marginBottom: 8,
    border: '1pt solid #f3f4f6',
    borderRadius: 8,
  },
  tdCol1: { width: '60%' },
  tdCol2: { width: '15%', textAlign: 'center', color: '#4b5563' },
  tdCol3: { width: '25%', textAlign: 'right', fontWeight: 'bold', color: '#0d9488' },
  
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
    width: '45%',
    backgroundColor: '#0f172a',
    color: '#ffffff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    transform: 'rotate(1deg)',
  },
  totalsLabel: {
    color: '#94a3b8',
    textTransform: 'uppercase',
    fontSize: 10,
  },
  totalsValue: {
    fontWeight: 'black',
    fontSize: 16,
    color: '#2dd4bf',
  },

  amountInWordsBox: {
    backgroundColor: '#f0fdfa',
    border: '1pt solid #ccfbf1',
    borderRadius: 8,
    padding: 10,
    marginBottom: 30,
    textAlign: 'center',
    fontSize: 10,
    color: '#4b5563',
  },
  amountInWordsValue: {
    fontWeight: 'bold',
    color: '#0f766e',
    textTransform: 'uppercase',
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
    color: '#0d9488',
    fontSize: 8,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  conditionsText: {
    fontSize: 8,
    color: '#6b7280',
    backgroundColor: '#f9fafb',
    padding: 8,
    borderRadius: 8,
  },
  signatureText: {
    fontSize: 8,
    color: '#6b7280',
  },

  footerContainer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    alignItems: 'center',
    fontSize: 8,
    color: '#9ca3af',
  },
  footerDot: {
    width: 30,
    height: 3,
    backgroundColor: '#0d9488',
    borderRadius: 3,
    marginBottom: 8,
  },
  footerSenderName: {
    fontWeight: 'bold',
    color: '#4b5563',
    marginBottom: 2,
  }
});

interface CreativePDFProps {
  data: InvoiceData;
}

const CreativePDF: React.FC<CreativePDFProps> = ({ data }) => {
  const calculateTotal = () => {
    return data.items.reduce((acc, item) => acc + (parseFloat(item.quantity) || 1) * (item.price || 0), 0);
  };

  const total = data.grandTotal ?? calculateTotal();
  const totalInWords = numberToWordsFR(total);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View fixed style={styles.backgroundShape}></View>
        
        <View fixed style={styles.headerContainer}>
          <View style={styles.headerLeft}>
            <Text style={styles.companyName}>{data.senderName || 'NOM ENTREPRISE'}</Text>
            <Text style={styles.companySlogan}>{data.senderSlogan || 'Slogan de l\'entreprise'}</Text>
            <View style={styles.contactRow}>
              {data.senderEmail && <Text style={styles.contactBadge}>{data.senderEmail}</Text>}
              {data.senderPhone && <Text style={styles.contactBadge}>{data.senderPhone}</Text>}
            </View>
          </View>
          <View style={styles.headerRight}>
            <View style={styles.invoiceBox}>
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
        </View>

        <View style={styles.clientBox}>
          <View style={styles.clientBoxLeft}>
            <Text style={styles.sectionTitle}>Destinataire</Text>
            <Text style={styles.clientName}>{data.recipientName || 'Nom du Client'}</Text>
            <Text style={styles.clientAddress}>{data.recipientAddress || 'Adresse du client'}</Text>
          </View>
          <View style={styles.clientBoxRight}>
            <Text style={styles.sectionTitle}>Objet de la facture</Text>
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
              <Text style={{ width: '100%', textAlign: 'center', color: '#9ca3af' }}>Aucune ligne ajoutée</Text>
            </View>
          )}
        </View>

        <View wrap={false}>
          <View style={styles.totalsWrapper}>
            <View style={styles.totalsContainer}>
              <Text style={styles.totalsLabel}>Montant Total</Text>
              <Text style={styles.totalsValue}>{formatCurrency(total)} FCFA</Text>
            </View>
          </View>

          <View style={styles.amountInWordsBox}>
            <Text>Arrêtée la présente facture à la somme de : <Text style={styles.amountInWordsValue}>{totalInWords} Francs CFA</Text></Text>
          </View>

          <View style={styles.bottomBoxes}>
            <View style={styles.conditionsBox}>
              <Text style={styles.boxTitle}>Notes & Conditions</Text>
              <Text style={styles.conditionsText}>Mode de règlement : Virement bancaire ou Mobile Money</Text>
            </View>
            <View style={styles.signatureBox}>
              <Text style={styles.boxTitle}>Signature autorisée</Text>
              <Text style={styles.signatureText}>{data.senderName ? data.senderName.toUpperCase() : "L'ENTREPRISE"}</Text>
            </View>
          </View>
        </View>

        <View fixed style={styles.footerContainer}>
          <View style={styles.footerDot}></View>
          <Text style={styles.footerSenderName}>{data.senderName ? data.senderName.toUpperCase() : 'ETARCOS DEV'}</Text>
          <Text>{data.senderEmail || 'email@exemple.com'} • {data.senderPhone || '+000 000 000 000'}</Text>
        </View>

      </Page>
    </Document>
  );
};

export default CreativePDF;
