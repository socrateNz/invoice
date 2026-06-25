import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { RecuPaiementData } from '@/types/recu-paiement';
import { formatCurrency, numberToWordsFR } from '@/utils/format';

const P='#111827';const G='#d4a017';const W='#ffffff';const T='#f9fafb';const GR='#9ca3af';const BD='#374151';const L='#1f2937';

const s=StyleSheet.create({
  page:{padding:'25 30 50 30',fontFamily:'Helvetica',fontSize:8.5,color:T,backgroundColor:P},
  border:{border:`1.5pt solid ${G}`,padding:'22 22'},
  hdr:{flexDirection:'row',justifyContent:'space-between',borderBottom:`1pt solid ${BD}`,paddingBottom:10,marginBottom:10},
  iN:{fontSize:11,fontFamily:'Helvetica-Bold',color:G,textTransform:'uppercase'},
  iS:{fontSize:9,fontFamily:'Helvetica-Bold',color:T},iL:{fontSize:7.5,color:GR},iD:{fontSize:7.5,color:G,fontFamily:'Helvetica-Bold'},
  mR:{flexDirection:'row',marginBottom:3},mL:{fontSize:7.5,color:GR,width:75,textAlign:'right',marginRight:4},
  mV:{width:100,borderBottom:`1pt solid ${BD}`,fontSize:8,color:T,paddingLeft:2,minHeight:10},
  titleBox:{backgroundColor:G,padding:'8 16',marginBottom:16,alignItems:'center'},
  titleTxt:{fontSize:13,fontFamily:'Helvetica-Bold',color:P,textTransform:'uppercase',letterSpacing:1},
  hero:{backgroundColor:L,border:`1pt solid ${G}`,padding:'16 20',marginBottom:16,alignItems:'center'},
  heroLbl:{fontSize:8.5,color:G,fontFamily:'Helvetica-Bold',textTransform:'uppercase',marginBottom:4},
  heroVal:{fontSize:24,fontFamily:'Helvetica-Bold',color:G,marginBottom:4},
  heroWords:{fontSize:8,color:GR,fontFamily:'Helvetica-Oblique',textAlign:'center'},
  st:{color:G,fontFamily:'Helvetica-Bold',fontSize:8,textTransform:'uppercase',marginBottom:4,marginTop:8},
  tw:{border:`0.5pt solid ${BD}`,marginBottom:8},
  row:{flexDirection:'row',borderBottom:`0.5pt solid ${BD}`},rL:{flexDirection:'row'},
  lb:{backgroundColor:L,color:GR,fontFamily:'Helvetica-Bold',fontSize:7.5,padding:'4 6',width:'30%',borderRight:`0.5pt solid ${BD}`},
  vl:{fontSize:8,padding:'4 6',flexGrow:1,color:T},
  chkR:{flexDirection:'row',flexWrap:'wrap',padding:'4 6',flexGrow:1,gap:8},
  chkI:{flexDirection:'row',alignItems:'center',marginRight:8},
  chkB:{width:9,height:9,border:`1pt solid ${GR}`,marginRight:3,alignItems:'center',justifyContent:'center'},
  chkOn:{backgroundColor:G,border:`1pt solid ${G}`},chkLb:{fontSize:7.5,color:T},
  stamp:{border:`1.5pt dashed ${G}`,padding:10,marginBottom:8,alignItems:'center',backgroundColor:L},
  stampT:{fontSize:8,color:G,fontFamily:'Helvetica-Bold',textTransform:'uppercase'},
  sigRow:{flexDirection:'row',border:`0.5pt solid ${BD}`,marginTop:4},
  sigB:{flex:1,padding:10},sigBL:{borderRight:`0.5pt solid ${BD}`},
  sigT:{fontSize:8,fontFamily:'Helvetica-Bold',color:G,marginBottom:8},
  sigLn:{borderBottom:`0.5pt solid ${BD}`,marginBottom:14,marginTop:4,width:'70%'},
  sigLb:{fontSize:7.5,color:GR},
  footer:{position:'absolute',bottom:15,left:30,right:30,borderTop:`1pt solid ${G}`,paddingTop:5,alignItems:'center'},
  ftxt:{fontSize:7,color:GR,fontFamily:'Helvetica-Oblique',textAlign:'center'},
});

const Chk=({on,l}:{on:boolean;l:string})=>(<View style={s.chkI}><View style={[s.chkB,on?s.chkOn:{}]}>{on&&<Text style={{color:P,fontSize:6}}>✓</Text>}</View><Text style={s.chkLb}>{l}</Text></View>);
const v=(x?:string|number)=>x?.toString()||'';

export default function RecuPaiementPrestigePDF({data}:{data:RecuPaiementData}){
  const words=data.sommeChiffres?numberToWordsFR(data.sommeChiffres):'---';
  return(<Document><Page size="A4" style={s.page}>
    <View style={s.border}>
      <View style={s.hdr}>
        <View><Text style={s.iN}>{data.institutionName||'UNIVERSITE INTERNATIONALE'}</Text><Text style={s.iS}>{data.institutionSubtitle||'JEAN PAUL II DE BAFANG'}</Text><Text style={s.iL}>UIJPII — {data.institutionLocation||'Bafang, Cameroun'}</Text><Text style={s.iD}>{data.institutionDepartment||'Cellule Informatique'}</Text></View>
        <View>{[['N° Reçu',data.numeroRecu],['Date',data.dateRecu],['Heure',data.heure]].map(([l,val])=>(<View key={l} style={s.mR}><Text style={s.mL}>{l} :</Text><View style={s.mV}><Text>{v(val)}</Text></View></View>))}</View>
      </View>
      <View style={s.titleBox}><Text style={s.titleTxt}>Reçu de Paiement</Text></View>
      <View style={s.hero}>
        <Text style={s.heroLbl}>Montant Reçu</Text>
        <Text style={s.heroVal}>{formatCurrency(data.sommeChiffres||0)} FCFA</Text>
        <Text style={s.heroWords}>Arrêté à : {words} Francs CFA</Text>
      </View>
      <Text style={s.st}>1. Informations du Payeur</Text>
      <View style={s.tw}><View style={s.row}><Text style={s.lb}>Reçu de</Text><Text style={s.vl}>{v(data.recuDe)}</Text></View><View style={s.rL}><Text style={s.lb}>Adresse / Contact</Text><Text style={s.vl}>{v(data.adressePayeur)}</Text></View></View>
      <Text style={s.st}>2. Détails du Paiement</Text>
      <View style={s.tw}>
        <View style={s.row}><Text style={s.lb}>Motif / Objet</Text><Text style={s.vl}>{v(data.motif)}</Text></View>
        <View style={s.row}><Text style={s.lb}>Référence</Text><Text style={s.vl}>{v(data.reference)}</Text></View>
        <View style={s.row}><Text style={s.lb}>Mode de paiement</Text><View style={s.chkR}><Chk on={!!data.modePaiement?.especes} l="Espèces"/><Chk on={!!data.modePaiement?.mobileMoney} l="Mobile Money"/><Chk on={!!data.modePaiement?.virement} l="Virement"/><Chk on={!!data.modePaiement?.cheque} l="Chèque"/></View></View>
        <View style={s.rL}><Text style={s.lb}>N° Transaction</Text><Text style={s.vl}>{v(data.numeroTransaction)}</Text></View>
      </View>
      <View style={s.stamp}><Text style={s.stampT}>Zone réservée au tampon / cachet officiel</Text></View>
      <Text style={s.st}>Signatures</Text>
      <View style={s.sigRow}>
        <View style={[s.sigB,s.sigBL]}><Text style={s.sigT}>Le Payeur</Text><Text style={s.sigLb}>Nom : {v(data.recuDe)}</Text><View style={s.sigLn}/><Text style={s.sigLb}>Signature :</Text><View style={[s.sigLn,{marginBottom:8}]}/><Text style={s.sigLb}>Date : {v(data.dateRecu)}</Text></View>
        <View style={s.sigB}><Text style={s.sigT}>Le Caissier / Agent</Text><Text style={s.sigLb}>Nom : {v(data.nomCaissier)}</Text><View style={s.sigLn}/><Text style={s.sigLb}>Signature & Cachet :</Text><View style={[s.sigLn,{marginBottom:8}]}/><Text style={s.sigLb}>Date : {v(data.dateSignature)}</Text></View>
      </View>
    </View>
    <View fixed style={s.footer}><Text style={s.ftxt}>UIJPII — Cellule Informatique | Science et conscience pour un monde meilleur — UIJPII</Text></View>
  </Page></Document>);
}
