import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { BordereauData } from '@/types/bordereau';

const P = '#0f172a'; const G = '#d4a017'; const L = '#1e293b'; const W = '#ffffff';
const T = '#f8fafc'; const GR = '#94a3b8'; const BD = '#334155';

const s = StyleSheet.create({
  page: { padding: '25 30 50 30', fontFamily: 'Helvetica', fontSize: 8.5, color: T, backgroundColor: P },
  outerBorder: { border: `1.5pt solid ${G}`, padding: '25 25 20 25', minHeight: 780 },
  header: { alignItems: 'center', marginBottom: 8, borderBottom: `1pt solid ${BD}`, paddingBottom: 10 },
  instName: { fontSize: 12, fontFamily: 'Helvetica-Bold', color: G, textTransform: 'uppercase', textAlign: 'center' },
  instSub: { fontSize: 10, fontFamily: 'Helvetica-Bold', color: T, textAlign: 'center', marginBottom: 2 },
  instLoc: { fontSize: 7.5, color: GR, textAlign: 'center' },
  metaRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 6, gap: 20 },
  metaItem: { flexDirection: 'row' },
  metaLbl: { fontSize: 7.5, color: GR, marginRight: 3 },
  metaVal: { fontSize: 8, color: G, fontFamily: 'Helvetica-Bold' },
  titleBox: { backgroundColor: G, padding: '8 16', marginBottom: 14, alignItems: 'center' },
  titleText: { fontSize: 13, fontFamily: 'Helvetica-Bold', color: P, textTransform: 'uppercase', letterSpacing: 1 },
  sectionTitle: { color: G, fontFamily: 'Helvetica-Bold', fontSize: 8, textTransform: 'uppercase', marginBottom: 5, marginTop: 8, letterSpacing: 0.5 },
  row: { flexDirection: 'row', borderBottom: `0.5pt solid ${BD}` },
  rowLast: { flexDirection: 'row' },
  lbl: { backgroundColor: L, color: GR, fontFamily: 'Helvetica-Bold', fontSize: 7.5, padding: '4 6', width: '30%', borderRight: `0.5pt solid ${BD}` },
  val: { fontSize: 8, padding: '4 6', flexGrow: 1, color: T },
  lblN: { backgroundColor: L, color: GR, fontFamily: 'Helvetica-Bold', fontSize: 7.5, padding: '4 6', width: '17%', borderRight: `0.5pt solid ${BD}`, borderLeft: `0.5pt solid ${BD}` },
  valN: { fontSize: 8, padding: '4 6', width: '13%', color: T, borderRight: `0.5pt solid ${BD}` },
  chkRow: { flexDirection: 'row', flexWrap: 'wrap', padding: '4 6', flexGrow: 1, gap: 8 },
  chkItem: { flexDirection: 'row', alignItems: 'center', marginRight: 8 },
  chkBox: { width: 9, height: 9, border: `1pt solid ${GR}`, marginRight: 3, alignItems: 'center', justifyContent: 'center' },
  chkOn: { backgroundColor: G, border: `1pt solid ${G}` },
  chkLbl: { fontSize: 7.5, color: T },
  tableWrapper: { border: `0.5pt solid ${BD}` },
  tHead: { flexDirection: 'row', backgroundColor: BD },
  tHN: { width:'8%', padding:'3 4', color:G, fontFamily:'Helvetica-Bold', fontSize:7, textAlign:'center', borderRight:`0.5pt solid ${P}` },
  tHD: { width:'46%', padding:'3 6', color:G, fontFamily:'Helvetica-Bold', fontSize:7, borderRight:`0.5pt solid ${P}` },
  tHP: { width:'18%', padding:'3 4', color:G, fontFamily:'Helvetica-Bold', fontSize:7, textAlign:'center', borderRight:`0.5pt solid ${P}` },
  tHO: { width:'28%', padding:'3 6', color:G, fontFamily:'Helvetica-Bold', fontSize:7 },
  tRN: { width:'8%', padding:'3 4', fontSize:8, textAlign:'center', borderRight:`0.5pt solid ${BD}`, color:T },
  tRD: { width:'46%', padding:'3 6', fontSize:8, borderRight:`0.5pt solid ${BD}`, color:T },
  tRP: { width:'18%', padding:'3 4', fontSize:8, textAlign:'center', borderRight:`0.5pt solid ${BD}`, color:T },
  tRO: { width:'28%', padding:'3 6', fontSize:8, color:T },
  sigRow: { flexDirection: 'row', border: `0.5pt solid ${BD}`, marginTop: 4 },
  sigBox: { flex: 1, padding: 10 },
  sigBoxLeft: { borderRight: `0.5pt solid ${BD}` },
  sigTitle: { fontSize: 8, fontFamily: 'Helvetica-Bold', color: G, marginBottom: 8 },
  sigLine: { borderBottom: `0.5pt solid ${BD}`, marginBottom: 14, marginTop: 4, width: '70%' },
  sigLbl: { fontSize: 7.5, color: GR },
  footer: { position: 'absolute', bottom: 15, left: 30, right: 30, borderTop: `1pt solid ${G}`, paddingTop: 5, alignItems: 'center' },
  footerTxt: { fontSize: 7, color: GR, fontFamily: 'Helvetica-Oblique', textAlign: 'center' },
});

const Chk = ({ on, label }: { on: boolean; label: string }) => (
  <View style={s.chkItem}><View style={[s.chkBox, on ? s.chkOn : {}]}>{on && <Text style={{ color: P, fontSize: 6 }}>✓</Text>}</View><Text style={s.chkLbl}>{label}</Text></View>
);
const v = (x?: string) => x || '';

export default function BordereauPrestigePDF({ data }: { data: BordereauData }) {
  const docs = data.documents?.length ? data.documents : [1,2,3,4].map(i => ({ id:String(i), designation:'', nombrePages:'', observations:'' }));
  return (
    <Document><Page size="A4" style={s.page}>
      <View style={s.outerBorder}>
        {/* Header */}
        <View style={s.header}>
          <Text style={s.instName}>{data.institutionName || 'UNIVERSITE INTERNATIONALE'}</Text>
          <Text style={s.instSub}>{data.institutionSubtitle || 'JEAN PAUL II DE BAFANG'}</Text>
          <Text style={s.instLoc}>UIJPII — {data.institutionLocation || 'Bafang, Cameroun'} | {data.institutionDepartment || 'Cellule Informatique'}</Text>
          <View style={s.metaRow}>
            {[['N° Bordereau', data.numeroBordereau],['Date', data.dateReception],['Heure', data.heure]].map(([l,val]) => (
              <View key={l} style={s.metaItem}><Text style={s.metaLbl}>{l} :</Text><Text style={s.metaVal}>{v(val) || '___'}</Text></View>
            ))}
          </View>
        </View>

        {/* Title */}
        <View style={s.titleBox}><Text style={s.titleText}>Bordereau de Réception de Dossier</Text></View>

        {/* S1 */}
        <Text style={s.sectionTitle}>1. Identification du Service Émetteur</Text>
        <View style={s.tableWrapper}>
          <View style={s.row}><Text style={s.lbl}>Service / Département</Text><Text style={s.val}>{v(data.serviceDepartement)}</Text><Text style={s.lblN}>Date d'envoi</Text><Text style={s.valN}>{v(data.dateEnvoi)}</Text></View>
          <View style={s.row}><Text style={s.lbl}>Nom de l'agent</Text><Text style={s.val}>{v(data.nomAgent)}</Text><Text style={s.lblN}>Fonction</Text><Text style={s.valN}>{v(data.fonction)}</Text></View>
          <View style={s.rowLast}><Text style={s.lbl}>Contact / Poste</Text><Text style={[s.val,{borderRight:0}]}>{v(data.contactPoste)}</Text></View>
        </View>

        {/* S2 */}
        <Text style={s.sectionTitle}>2. Description du Dossier Reçu</Text>
        <View style={s.tableWrapper}>
          <View style={s.row}><Text style={s.lbl}>Intitulé / Objet</Text><Text style={s.val}>{v(data.intituleObjet)}</Text></View>
          <View style={s.row}><Text style={s.lbl}>Référence interne</Text><Text style={s.val}>{v(data.referenceInterne)}</Text></View>
          <View style={s.row}><Text style={s.lbl}>Nature du dossier</Text><View style={s.chkRow}>{[['administratif','Administratif'],['technique','Technique'],['pedagogique','Pédagogique'],['financier','Financier']].map(([k,l]) => <Chk key={k} on={!!(data.natureDossier as any)?.[k]} label={l} />)}</View></View>
          <View style={s.rowLast}><Text style={s.lbl}>Support</Text><View style={s.chkRow}>{[['papier','Papier'],['numerique','Numérique'],['courriel','Courriel']].map(([k,l]) => <Chk key={k} on={!!(data.support as any)?.[k]} label={l} />)}</View></View>
        </View>

        {/* S3 */}
        <Text style={s.sectionTitle}>3. Liste des Documents / Pièces Jointes</Text>
        <View style={s.tableWrapper}>
          <View style={s.tHead}><Text style={s.tHN}>N°</Text><Text style={s.tHD}>Désignation du document</Text><Text style={s.tHP}>Nb. pages</Text><Text style={s.tHO}>Observations</Text></View>
          {docs.map((d,i) => <View key={d.id||i} style={{flexDirection:'row',borderBottom:`0.5pt solid ${BD}`}}><Text style={s.tRN}>{i+1}</Text><Text style={s.tRD}>{v(d.designation)}</Text><Text style={s.tRP}>{v(d.nombrePages)}</Text><Text style={s.tRO}>{v(d.observations)}</Text></View>)}
        </View>

        {/* S4 */}
        <Text style={s.sectionTitle}>4. Priorité et Traitement</Text>
        <View style={s.tableWrapper}>
          <View style={s.row}><Text style={s.lbl}>Degré d'urgence</Text><View style={s.chkRow}>{[['normal','Normal'],['urgent','Urgent'],['tres_urgent','Très urgent']].map(([k,l]) => <Chk key={k} on={data.degreeUrgence===k} label={l} />)}</View></View>
          <View style={s.row}><Text style={s.lbl}>Délai de traitement</Text><Text style={s.val}>{v(data.delaiTraitement)}</Text><Text style={s.lblN}>Transmis à</Text><Text style={[s.val,{width:'30%'}]}>{v(data.transmisA)}</Text></View>
          <View style={s.rowLast}><Text style={s.lbl}>Instructions particulières</Text><Text style={s.val}>{v(data.instructionsParticulieres)}</Text></View>
        </View>

        {/* S5 */}
        <Text style={s.sectionTitle}>5. État du Dossier à la Réception</Text>
        <View style={s.tableWrapper}>
          <View style={s.row}><Text style={s.lbl}>État</Text><View style={s.chkRow}><Chk on={!!data.etatDossier?.complet} label="Complet" /><Chk on={!!data.etatDossier?.incomplet} label="Incomplet" /><Chk on={!!data.etatDossier?.endommage} label="Endommagé" /></View></View>
          <View style={s.rowLast}><Text style={s.lbl}>Observations</Text><Text style={s.val}>{v(data.observationsEtat)}</Text></View>
        </View>

        {/* S6 */}
        <Text style={s.sectionTitle}>6. Signatures</Text>
        <View style={s.sigRow}>
          {[['Agent émetteur (Service)', data.nomPrenomEmetteur, data.dateSignatureEmetteur],['Réceptionniste (Cellule Informatique)', data.nomPrenomReceptionniste, data.dateSignatureReceptionniste]].map(([titre, nom, date], i) => (
            <View key={i} style={[s.sigBox, i===0?s.sigBoxLeft:{}]}>
              <Text style={s.sigTitle}>{titre}</Text>
              <Text style={s.sigLbl}>Nom & Prénom : <Text style={{color:T,fontFamily:'Helvetica-Bold'}}>{v(nom)}</Text></Text>
              <View style={s.sigLine} /><Text style={s.sigLbl}>Signature :</Text>
              <View style={[s.sigLine,{marginBottom:8}]} /><Text style={s.sigLbl}>Date : {v(date)}</Text>
            </View>
          ))}
        </View>
      </View>

      <View fixed style={s.footer}><Text style={s.footerTxt}>UIJPII — Cellule Informatique | Science et conscience pour un monde meilleur — UIJPII</Text></View>
    </Page></Document>
  );
}
