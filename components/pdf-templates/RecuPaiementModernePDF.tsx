import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { RecuPaiementData } from '@/types/recu-paiement';
import { formatCurrency, numberToWordsFR } from '@/utils/format';

const P='#1d4ed8';const A='#eff6ff';const W='#fff';const B='#111';const G='#6b7280';const BD='#e2e8f0';

const s=StyleSheet.create({
  page:{padding:'30 35 50 35',fontFamily:'Helvetica',fontSize:8.5,color:B,backgroundColor:W},
  hdr:{flexDirection:'row',justifyContent:'space-between',marginBottom:6},
  iN:{fontSize:11,fontFamily:'Helvetica-Bold',color:P},iS:{fontSize:9,fontFamily:'Helvetica-Bold',color:P},
  iL:{fontSize:7.5,color:G,marginTop:1},iD:{fontSize:7.5,color:P,fontFamily:'Helvetica-Bold',marginTop:1},
  meta:{alignItems:'flex-end'},mR:{flexDirection:'row',marginBottom:2},
  mL:{fontSize:7.5,color:G,width:75,textAlign:'right',marginRight:4},
  mV:{width:110,borderBottom:`1pt solid ${BD}`,fontSize:8,paddingLeft:2,minHeight:10},
  div:{borderBottom:`2pt solid ${P}`,marginBottom:10,marginTop:3},
  title:{fontSize:16,fontFamily:'Helvetica-Bold',color:P,textAlign:'center',marginBottom:2,textTransform:'uppercase'},
  hero:{border:`1.5pt solid ${P}`,backgroundColor:A,padding:'14 20',marginBottom:14,alignItems:'center'},
  heroLbl:{fontSize:8.5,color:P,fontFamily:'Helvetica-Bold',textTransform:'uppercase',marginBottom:4},
  heroVal:{fontSize:22,fontFamily:'Helvetica-Bold',color:P,marginBottom:4},
  heroWords:{fontSize:8,color:P,fontFamily:'Helvetica-Oblique',textAlign:'center'},
  sh:{flexDirection:'row',alignItems:'center',marginBottom:5,marginTop:8},
  bar:{width:3,backgroundColor:P,marginRight:7,alignSelf:'stretch',minHeight:12},
  sl:{fontSize:8.5,fontFamily:'Helvetica-Bold',color:P,textTransform:'uppercase'},
  row:{flexDirection:'row',borderBottom:`0.5pt solid ${BD}`,paddingVertical:4},
  rL:{flexDirection:'row',paddingVertical:4},
  lb:{fontFamily:'Helvetica-Bold',color:P,fontSize:7.5,width:'32%'},
  vl:{flexGrow:1,fontSize:8,color:B},
  chkR:{flexDirection:'row',flexWrap:'wrap',flexGrow:1,gap:8},
  chkI:{flexDirection:'row',alignItems:'center',marginRight:8},
  chkB:{width:9,height:9,border:`1pt solid ${P}`,marginRight:3,alignItems:'center',justifyContent:'center'},
  chkOn:{backgroundColor:P},chkLb:{fontSize:7.5},
  stamp:{border:`1.5pt dashed ${P}`,backgroundColor:A,padding:10,marginBottom:8,alignItems:'center'},
  stampT:{fontSize:8,color:P,fontFamily:'Helvetica-Bold',textTransform:'uppercase'},
  sigRow:{flexDirection:'row',border:`1pt solid ${BD}`,marginTop:4},
  sigB:{flex:1,padding:10},sigBL:{borderRight:`1pt solid ${BD}`},
  sigT:{fontSize:8,fontFamily:'Helvetica-Bold',color:P,marginBottom:8,textTransform:'uppercase'},
  sigLn:{borderBottom:`0.5pt solid ${G}`,marginBottom:14,marginTop:4,width:'70%'},
  sigLb:{fontSize:7.5,color:G},
  footer:{position:'absolute',bottom:18,left:35,right:35,borderTop:`1pt solid ${P}`,paddingTop:5,alignItems:'center'},
  ftxt:{fontSize:7,color:G,fontFamily:'Helvetica-Oblique',textAlign:'center'},
});

const Chk=({on,l}:{on:boolean;l:string})=>(<View style={s.chkI}><View style={[s.chkB,on?s.chkOn:{}]}>{on&&<Text style={{color:W,fontSize:6}}>✓</Text>}</View><Text style={s.chkLb}>{l}</Text></View>);
const v=(x?:string|number)=>x?.toString()||'';
const S=({n,t}:{n:string;t:string})=>(<View style={s.sh}><View style={s.bar}/><Text style={s.sl}>{n}. {t}</Text></View>);

export default function RecuPaiementModernePDF({data}:{data:RecuPaiementData}){
  const words=data.sommeChiffres?numberToWordsFR(data.sommeChiffres):'---';
  return(<Document><Page size="A4" style={s.page}>
    <View style={s.hdr}>
      <View><Text style={s.iN}>{data.institutionName||'UNIVERSITE INTERNATIONALE'}</Text><Text style={s.iS}>{data.institutionSubtitle||'JEAN PAUL II DE BAFANG'}</Text><Text style={s.iL}>UIJPII — {data.institutionLocation||'Bafang, Cameroun'}</Text><Text style={s.iD}>{data.institutionDepartment||'Cellule Informatique'}</Text></View>
      <View style={s.meta}>{[['N° Reçu',data.numeroRecu],['Date',data.dateRecu],['Heure',data.heure]].map(([l,val])=>(<View key={l} style={s.mR}><Text style={s.mL}>{l} :</Text><View style={s.mV}><Text>{v(val)}</Text></View></View>))}</View>
    </View>
    <View style={s.div}/>
    <Text style={s.title}>Reçu de Paiement</Text>
    <View style={s.hero}>
      <Text style={s.heroLbl}>Montant Reçu</Text>
      <Text style={s.heroVal}>{formatCurrency(data.sommeChiffres||0)} FCFA</Text>
      <Text style={s.heroWords}>Arrêté à : {words} Francs CFA</Text>
    </View>
    <S n="1" t="Informations du Payeur"/>
    <View style={s.row}><Text style={s.lb}>Reçu de</Text><Text style={s.vl}>{v(data.recuDe)}</Text></View>
    <View style={s.rL}><Text style={s.lb}>Adresse / Contact</Text><Text style={s.vl}>{v(data.adressePayeur)}</Text></View>
    <S n="2" t="Détails du Paiement"/>
    <View style={s.row}><Text style={s.lb}>Motif / Objet</Text><Text style={s.vl}>{v(data.motif)}</Text></View>
    <View style={s.row}><Text style={s.lb}>Référence dossier</Text><Text style={s.vl}>{v(data.reference)}</Text></View>
    <View style={s.row}><Text style={s.lb}>Mode de paiement</Text><View style={s.chkR}><Chk on={!!data.modePaiement?.especes} l="Espèces"/><Chk on={!!data.modePaiement?.mobileMoney} l="Mobile Money"/><Chk on={!!data.modePaiement?.virement} l="Virement"/><Chk on={!!data.modePaiement?.cheque} l="Chèque"/></View></View>
    <View style={s.rL}><Text style={s.lb}>N° Transaction</Text><Text style={s.vl}>{v(data.numeroTransaction)}</Text></View>
    <View style={s.stamp}><Text style={s.stampT}>Zone réservée au tampon / cachet officiel</Text></View>
    <S n="3" t="Signatures"/>
    <View style={s.sigRow}>
      <View style={[s.sigB,s.sigBL]}><Text style={s.sigT}>Le Payeur</Text><Text style={s.sigLb}>Nom : {v(data.recuDe)}</Text><View style={s.sigLn}/><Text style={s.sigLb}>Signature :</Text><View style={[s.sigLn,{marginBottom:8}]}/><Text style={s.sigLb}>Date : {v(data.dateRecu)}</Text></View>
      <View style={s.sigB}><Text style={s.sigT}>Le Caissier / Réceptionniste</Text><Text style={s.sigLb}>Nom : {v(data.nomCaissier)}</Text><View style={s.sigLn}/><Text style={s.sigLb}>Signature & Cachet :</Text><View style={[s.sigLn,{marginBottom:8}]}/><Text style={s.sigLb}>Date : {v(data.dateSignature)}</Text></View>
    </View>
    <View fixed style={s.footer}><Text style={s.ftxt}>UIJPII — Cellule Informatique | Science et conscience pour un monde meilleur — UIJPII</Text></View>
  </Page></Document>);
}
