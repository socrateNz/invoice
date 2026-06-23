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
    fontFamily: 'Times-Roman',
    fontSize: 10,
    color: '#333333',
    backgroundColor: '#faf9f6',
    border: '12pt solid #ffffff',
  },
  headerContainer: {
    position: 'absolute',
    top: 40,
    left: 40,
    right: 40,
    alignItems: 'center',
    borderBottom: '1pt solid #d4af37',
    paddingBottom: 20,
    height: 100,
  },
  companyName: {
    fontSize: 24,
    textTransform: 'uppercase',
    letterSpacing: 4,
    color: '#0f172a',
    marginBottom: 6,
  },
  companySlogan: {
    fontSize: 10,
    fontStyle: 'italic',
    color: '#64748b',
    marginBottom: 8,
    letterSpacing: 1,
  },
  contactRow: {
    flexDirection: 'row',
    fontSize: 8,
    color: '#475569',
    letterSpacing: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactDot: {
    color: '#d4af37',
    marginHorizontal: 10,
  },

  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  invoiceInfo: {
    width: '45%',
  },
  invoiceTitle: {
    fontSize: 22,
    color: '#0f172a',
    textTransform: 'uppercase',
    letterSpacing: 4,
    marginBottom: 20,
  },
  invoiceMetaRow: {
    flexDirection: 'row',
    marginBottom: 8,
    fontSize: 10,
    color: '#475569',
  },
  invoiceMetaLabel: {
    width: 80,
    textTransform: 'uppercase',
    letterSpacing: 2,
    color: '#94a3b8',
    fontSize: 8,
  },
  invoiceMetaValue: {
    color: '#0f172a',
  },

  clientInfo: {
    width: '45%',
    textAlign: 'right',
  },
  clientTitle: {
    fontSize: 8,
    textTransform: 'uppercase',
    letterSpacing: 2,
    color: '#d4af37',
    marginBottom: 10,
  },
  clientName: {
    fontSize: 16,
    color: '#0f172a',
    marginBottom: 6,
  },
  clientAddress: {
    color: '#475569',
    lineHeight: 1.5,
  },

  subjectContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  subjectBox: {
    flexDirection: 'row',
    borderTop: '1pt solid #e2e8f0',
    borderBottom: '1pt solid #e2e8f0',
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  subjectLabel: {
    textTransform: 'uppercase',
    fontSize: 8,
    color: '#94a3b8',
    letterSpacing: 2,
    marginRight: 10,
  },
  subjectText: {
    fontSize: 10,
    color: '#334155',
  },

  table: {
    width: '100%',
    marginBottom: 30,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottom: '1pt solid #0f172a',
    paddingBottom: 8,
    marginBottom: 10,
  },
  thCol1: { width: '60%', color: '#94a3b8', fontSize: 8, textTransform: 'uppercase', letterSpacing: 2 },
  thCol2: { width: '15%', textAlign: 'center', color: '#94a3b8', fontSize: 8, textTransform: 'uppercase', letterSpacing: 2 },
  thCol3: { width: '25%', textAlign: 'right', color: '#94a3b8', fontSize: 8, textTransform: 'uppercase', letterSpacing: 2 },
  
  tableRow: {
    flexDirection: 'row',
    borderBottom: '1pt solid #e2e8f0',
    paddingVertical: 15,
  },
  tdCol1: { width: '60%', paddingRight: 10 },
  tdCol2: { width: '15%', textAlign: 'center', color: '#475569' },
  tdCol3: { width: '25%', textAlign: 'right', color: '#0f172a' },
  
  itemDesignation: {
    color: '#0f172a',
    fontSize: 12,
    marginBottom: 6,
  },
  itemDescription: {
    color: '#64748b',
    fontSize: 8,
    lineHeight: 1.5,
  },

  totalsWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 40,
  },
  totalsContainer: {
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    borderBottom: '2pt solid #d4af37',
    paddingBottom: 8,
  },
  totalsLabel: {
    textTransform: 'uppercase',
    letterSpacing: 2,
    fontSize: 10,
    color: '#0f172a',
  },
  totalsValue: {
    fontSize: 18,
    color: '#0f172a',
    letterSpacing: 1,
  },
  totalsCurrency: {
    fontSize: 10,
    color: '#64748b',
  },

  amountInWordsBox: {
    textAlign: 'center',
    color: '#475569',
    fontStyle: 'italic',
    marginBottom: 50,
  },
  amountInWordsValue: {
    color: '#0f172a',
    fontSize: 12,
    fontStyle: 'normal',
    marginTop: 8,
  },

  bottomBoxes: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  bottomCol: {
    width: '40%',
    alignItems: 'center',
  },
  boxTitle: {
    fontSize: 8,
    textTransform: 'uppercase',
    letterSpacing: 2,
    color: '#94a3b8',
    borderBottom: '1pt solid #e2e8f0',
    paddingBottom: 4,
    marginBottom: 8,
  },
  conditionsText: {
    fontSize: 8,
    color: '#475569',
  },
  signatureText: {
    fontSize: 8,
    color: '#0f172a',
    fontStyle: 'italic',
    marginTop: 20,
  },

  footerContainer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: 'center',
    fontSize: 8,
    textTransform: 'uppercase',
    letterSpacing: 2,
    color: '#94a3b8',
  }
});

interface ElegantPDFProps {
  data: InvoiceData;
}

const ElegantPDF: React.FC<ElegantPDFProps> = ({ data }) => {
  const calculateTotal = () => {
    return data.items.reduce((acc, item) => acc + (parseFloat(item.quantity) || 1) * (item.price || 0), 0);
  };

  const total = data.grandTotal ?? calculateTotal();
  const totalInWords = numberToWordsFR(total);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        
        <View fixed style={styles.headerContainer}>
          <Text style={styles.companyName}>{data.senderName || 'NOM ENTREPRISE'}</Text>
          <Text style={styles.companySlogan}>{data.senderSlogan || 'Slogan de l\'entreprise'}</Text>
          <View style={styles.contactRow}>
            {data.senderEmail && <Text>{data.senderEmail}</Text>}
            {data.senderEmail && data.senderPhone && <Text style={styles.contactDot}>•</Text>}
            {data.senderPhone && <Text>{data.senderPhone}</Text>}
          </View>
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.invoiceInfo}>
            <Text style={styles.invoiceTitle}>Facture</Text>
            <View style={styles.invoiceMetaRow}>
              <Text style={styles.invoiceMetaLabel}>Facture N°</Text>
              <Text style={styles.invoiceMetaValue}>{data.invoiceNumber || '---'}</Text>
            </View>
            <View style={styles.invoiceMetaRow}>
              <Text style={styles.invoiceMetaLabel}>Date</Text>
              <Text style={styles.invoiceMetaValue}>{data.invoiceDate || '---'}</Text>
            </View>
            <View style={styles.invoiceMetaRow}>
              <Text style={styles.invoiceMetaLabel}>Échéance</Text>
              <Text style={styles.invoiceMetaValue}>{data.invoiceValidity || '---'}</Text>
            </View>
          </View>
          
          <View style={styles.clientInfo}>
            <Text style={styles.clientTitle}>Facturé à</Text>
            <Text style={styles.clientName}>{data.recipientName || 'Nom du Client'}</Text>
            <Text style={styles.clientAddress}>{data.recipientAddress || 'Adresse du client'}</Text>
          </View>
        </View>

        <View style={styles.subjectContainer}>
          <View style={styles.subjectBox}>
            <Text style={styles.subjectLabel}>Objet :</Text>
            <Text style={styles.subjectText}>{data.subject || 'Objet de la facture'}</Text>
          </View>
        </View>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.thCol1}>Désignation</Text>
            <Text style={styles.thCol2}>Quantité</Text>
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
              <Text style={{ width: '100%', textAlign: 'center', color: '#94a3b8', fontStyle: 'italic' }}>Aucune ligne ajoutée</Text>
            </View>
          )}
        </View>

        <View wrap={false}>
          <View style={styles.totalsWrapper}>
            <View style={styles.totalsContainer}>
              <Text style={styles.totalsLabel}>Total Général</Text>
              <Text style={styles.totalsValue}>
                {formatCurrency(total)} <Text style={styles.totalsCurrency}>FCFA</Text>
              </Text>
            </View>
          </View>

          <View style={styles.amountInWordsBox}>
            <Text>Arrêtée la présente facture à la somme de :</Text>
            <Text style={styles.amountInWordsValue}>{totalInWords} Francs CFA</Text>
          </View>

          <View style={styles.bottomBoxes}>
            <View style={styles.bottomCol}>
              <Text style={styles.boxTitle}>Règlement</Text>
              <Text style={styles.conditionsText}>Virement ou Mobile Money</Text>
            </View>
            <View style={{ width: '20%' }}></View>
            <View style={styles.bottomCol}>
              <Text style={styles.boxTitle}>Signature</Text>
              <Text style={styles.signatureText}>{data.senderName ? data.senderName : "L'Entreprise"}</Text>
            </View>
          </View>
        </View>

        <View fixed style={styles.footerContainer}>
          <Text>Merci pour votre confiance</Text>
        </View>

      </Page>
    </Document>
  );
};

export default ElegantPDF;
