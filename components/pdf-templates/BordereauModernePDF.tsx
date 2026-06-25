import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { BordereauData } from '@/types/bordereau';

const P = '#0f766e'; const A = '#f0fdf4'; const W = '#ffffff'; const B = '#111111';
const G = '#6b7280'; const BD = '#e2e8f0'; const T = '#134e4a';

const s = StyleSheet.create({
  page: { padding: '30 35 50 35', fontFamily: 'Helvetica', fontSize: 8.5, color: B, backgroundColor: W },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  instName: { fontSize: 11, fontFamily: 'Helvetica-Bold', color: T },
  instSub: { fontSize: 9, fontFamily: 'Helvetica-Bold', color: T },
  instLoc: { fontSize: 7.5, color: G, marginTop: 1 },
  instDept: { fontSize: 7.5, color: P, fontFamily: 'Helvetica-Bold', marginTop: 1 },
  meta: { alignItems: 'flex-end' },
  metaRow: { flexDirection: 'row', marginBottom: 2 },
  metaLbl: { fontSize: 7.5, color: G, width: 80, textAlign: 'right', marginRight: 4 },
  metaVal: { width: 110, borderBottom: `1pt solid ${BD}`, fontSize: 8, paddingLeft: 2, minHeight: 10 },
  divider: { borderBottom: `2pt solid ${P}`, marginBottom: 10, marginTop: 3 },
  title: { fontSize: 16, fontFamily: 'Helvetica-Bold', color: T, textAlign: 'center', marginBottom: 2, textTransform: 'uppercase', letterSpacing: 0.5 },
  titleSub: { fontSize: 8, color: G, textAlign: 'center', marginBottom: 12, fontFamily: 'Helvetica-Oblique' },
  sectionBlock: { marginBottom: 10 },
  sectionHead: { flexDirection: 'row', alignItems: 'center', marginBottom: 5 },
  sectionBar: { width: 3, backgroundColor: P, marginRight: 7, alignSelf: 'stretch', minHeight: 12 },
  sectionLbl: { fontSize: 8.5, fontFamily: 'Helvetica-Bold', color: T, textTransform: 'uppercase' },
  row: { flexDirection: 'row', borderBottom: `0.5pt solid ${BD}`, paddingVertical: 4 },
  rowLast: { flexDirection: 'row', paddingVertical: 4 },
  lbl: { fontFamily: 'Helvetica-Bold', color: P, fontSize: 7.5, width: '30%' },
  val: { flexGrow: 1, fontSize: 8, color: B },
  lblNarrow: { fontFamily: 'Helvetica-Bold', color: P, fontSize: 7.5, width: '18%', marginLeft: 8 },
  valNarrow: { fontSize: 8, color: B, width: '14%' },
  chkRow: { flexDirection: 'row', flexWrap: 'wrap', flexGrow: 1 },
  chkItem: { flexDirection: 'row', alignItems: 'center', marginRight: 10, marginBottom: 2 },
  chkBox: { width: 9, height: 9, border: `1pt solid ${P}`, marginRight: 3, alignItems: 'center', justifyContent: 'center' },
  chkBoxOn: { backgroundColor: P },
  chkLbl: { fontSize: 7.5 },
  // Documents table
  dtHead: { flexDirection: 'row', backgroundColor: A, borderBottom: `1pt solid ${P}` },
  dtHN: { width: '8%', padding: '3 4', color: P, fontFamily: 'Helvetica-Bold', fontSize: 7, textAlign: 'center', borderRight: `0.5pt solid ${BD}` },
  dtHD: { width: '46%', padding: '3 6', color: P, fontFamily: 'Helvetica-Bold', fontSize: 7, borderRight: `0.5pt solid ${BD}` },
  dtHP: { width: '18%', padding: '3 4', color: P, fontFamily: 'Helvetica-Bold', fontSize: 7, textAlign: 'center', borderRight: `0.5pt solid ${BD}` },
  dtHO: { width: '28%', padding: '3 6', color: P, fontFamily: 'Helvetica-Bold', fontSize: 7 },
  dtRN: { width: '8%', padding: '3 4', fontSize: 8, textAlign: 'center', borderRight: `0.5pt solid ${BD}` },
  dtRD: { width: '46%', padding: '3 6', fontSize: 8, borderRight: `0.5pt solid ${BD}` },
  dtRP: { width: '18%', padding: '3 4', fontSize: 8, textAlign: 'center', borderRight: `0.5pt solid ${BD}` },
  dtRO: { width: '28%', padding: '3 6', fontSize: 8 },
  // Signatures
  sigRow: { flexDirection: 'row', marginTop: 4 },
  sigBox: { flex: 1, padding: 10 },
  sigBoxLeft: { borderRight: `1pt solid ${BD}` },
  sigTitle: { fontSize: 8, fontFamily: 'Helvetica-Bold', color: P, marginBottom: 8, textTransform: 'uppercase' },
  sigLine: { borderBottom: `0.5pt solid ${G}`, marginBottom: 14, marginTop: 4, width: '70%' },
  sigLbl: { fontSize: 7.5, color: G },
  footer: { position: 'absolute', bottom: 18, left: 35, right: 35, borderTop: `1pt solid ${P}`, paddingTop: 5, alignItems: 'center' },
  footerTxt: { fontSize: 7, color: G, fontFamily: 'Helvetica-Oblique', textAlign: 'center' },
});

const Chk = ({ on, label }: { on: boolean; label: string }) => (
  <View style={s.chkItem}>
    <View style={[s.chkBox, on ? s.chkBoxOn : {}]}>{on && <Text style={{ color: W, fontSize: 6 }}>✓</Text>}</View>
    <Text style={s.chkLbl}>{label}</Text>
  </View>
);
const v = (x?: string) => x || '';
const Section = ({ n, label }: { n: string; label: string }) => (
  <View style={s.sectionHead}><View style={s.sectionBar} /><Text style={s.sectionLbl}>{n}. {label}</Text></View>
);

export default function BordereauModernePDF({ data }: { data: BordereauData }) {
  const docs = data.documents?.length ? data.documents : [1,2,3,4].map(i => ({ id:String(i), designation:'', nombrePages:'', observations:'' }));
  return (
    <Document><Page size="A4" style={s.page}>
      <View style={s.header}>
        <View>
          <Text style={s.instName}>{data.institutionName || 'UNIVERSITE INTERNATIONALE'}</Text>
          <Text style={s.instSub}>{data.institutionSubtitle || 'JEAN PAUL II DE BAFANG'}</Text>
          <Text style={s.instLoc}>UIJPII — {data.institutionLocation || 'Bafang, Cameroun'}</Text>
          <Text style={s.instDept}>{data.institutionDepartment || 'Cellule Informatique'}</Text>
        </View>
        <View style={s.meta}>
          {[['N° Bordereau', data.numeroBordereau],['Date de réception', data.dateReception],['Heure', data.heure]].map(([l,val]) => (
            <View key={l} style={s.metaRow}><Text style={s.metaLbl}>{l} :</Text><View style={s.metaVal}><Text>{v(val)}</Text></View></View>
          ))}
        </View>
      </View>
      <View style={s.divider} />
      <Text style={s.title}>Bordereau de Réception de Dossier</Text>
      <Text style={s.titleSub}>Document officiel — {data.institutionName || 'UIJPII'}</Text>

      {/* S1 */}
      <View style={s.sectionBlock}>
        <Section n="1" label="Identification du Service Émetteur" />
        <View style={s.row}><Text style={s.lbl}>Service / Département</Text><Text style={s.val}>{v(data.serviceDepartement)}</Text><Text style={s.lblNarrow}>Date d'envoi</Text><Text style={s.valNarrow}>{v(data.dateEnvoi)}</Text></View>
        <View style={s.row}><Text style={s.lbl}>Nom de l'agent</Text><Text style={s.val}>{v(data.nomAgent)}</Text><Text style={s.lblNarrow}>Fonction</Text><Text style={s.valNarrow}>{v(data.fonction)}</Text></View>
        <View style={s.rowLast}><Text style={s.lbl}>Contact / Poste</Text><Text style={s.val}>{v(data.contactPoste)}</Text></View>
      </View>

      {/* S2 */}
      <View style={s.sectionBlock}>
        <Section n="2" label="Description du Dossier Reçu" />
        <View style={s.row}><Text style={s.lbl}>Intitulé / Objet</Text><Text style={s.val}>{v(data.intituleObjet)}</Text></View>
        <View style={s.row}><Text style={s.lbl}>Référence interne</Text><Text style={s.val}>{v(data.referenceInterne)}</Text></View>
        <View style={s.row}><Text style={s.lbl}>Nature du dossier</Text><View style={s.chkRow}>{[['administratif','Administratif'],['technique','Technique'],['pedagogique','Pédagogique'],['financier','Financier']].map(([k,l]) => <Chk key={k} on={!!(data.natureDossier as any)?.[k]} label={l} />)}</View></View>
        <View style={s.rowLast}><Text style={s.lbl}>Support</Text><View style={s.chkRow}>{[['papier','Papier'],['numerique','Numérique'],['courriel','Courriel']].map(([k,l]) => <Chk key={k} on={!!(data.support as any)?.[k]} label={l} />)}</View></View>
      </View>

      {/* S3 */}
      <View style={s.sectionBlock}>
        <Section n="3" label="Liste des Documents / Pièces Jointes" />
        <View style={s.dtHead}><Text style={s.dtHN}>N°</Text><Text style={s.dtHD}>Désignation</Text><Text style={s.dtHP}>Pages</Text><Text style={s.dtHO}>Observations</Text></View>
        {docs.map((d,i) => <View key={d.id||i} style={{ flexDirection:'row', borderBottom:`0.5pt solid ${BD}` }}><Text style={s.dtRN}>{i+1}</Text><Text style={s.dtRD}>{v(d.designation)}</Text><Text style={s.dtRP}>{v(d.nombrePages)}</Text><Text style={s.dtRO}>{v(d.observations)}</Text></View>)}
      </View>

      {/* S4 */}
      <View style={s.sectionBlock}>
        <Section n="4" label="Priorité et Traitement" />
        <View style={s.row}><Text style={s.lbl}>Degré d'urgence</Text><View style={s.chkRow}>{[['normal','Normal'],['urgent','Urgent'],['tres_urgent','Très urgent']].map(([k,l]) => <Chk key={k} on={data.degreeUrgence===k} label={l} />)}</View></View>
        <View style={s.row}><Text style={s.lbl}>Délai de traitement</Text><Text style={s.val}>{v(data.delaiTraitement)}</Text><Text style={s.lblNarrow}>Transmis à</Text><Text style={[s.val,{width:'30%'}]}>{v(data.transmisA)}</Text></View>
        <View style={s.rowLast}><Text style={s.lbl}>Instructions particulières</Text><Text style={s.val}>{v(data.instructionsParticulieres)}</Text></View>
      </View>

      {/* S5 */}
      <View style={s.sectionBlock}>
        <Section n="5" label="État du Dossier à la Réception" />
        <View style={s.row}><Text style={s.lbl}>État</Text><View style={s.chkRow}><Chk on={!!data.etatDossier?.complet} label="Complet" /><Chk on={!!data.etatDossier?.incomplet} label="Incomplet" /><Chk on={!!data.etatDossier?.endommage} label="Endommagé" /></View></View>
        <View style={s.rowLast}><Text style={s.lbl}>Observations</Text><Text style={s.val}>{v(data.observationsEtat)}</Text></View>
      </View>

      {/* S6 */}
      <Section n="6" label="Signatures" />
      <View style={{ flexDirection:'row', border:`1pt solid ${BD}`, marginTop:4 }}>
        {[['Agent émetteur (Service)', data.nomPrenomEmetteur, data.dateSignatureEmetteur],['Réceptionniste (Cellule Informatique)', data.nomPrenomReceptionniste, data.dateSignatureReceptionniste]].map(([titre, nom, date], i) => (
          <View key={i} style={[s.sigBox, i===0?s.sigBoxLeft:{}]}>
            <Text style={s.sigTitle}>{titre}</Text>
            <Text style={s.sigLbl}>Nom & Prénom : <Text style={{color:B,fontFamily:'Helvetica-Bold'}}>{v(nom)}</Text></Text>
            <View style={s.sigLine} />
            <Text style={s.sigLbl}>Signature :</Text>
            <View style={[s.sigLine,{marginBottom:8}]} />
            <Text style={s.sigLbl}>Date : {v(date)}</Text>
          </View>
        ))}
      </View>

      <View fixed style={s.footer}><Text style={s.footerTxt}>UIJPII — Cellule Informatique | Science et conscience pour un monde meilleur — UIJPII</Text></View>
    </Page></Document>
  );
}
