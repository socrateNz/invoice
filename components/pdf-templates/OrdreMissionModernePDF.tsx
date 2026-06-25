import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { OrdreMissionData } from '@/types/ordre-mission';
import { formatCurrency } from '@/utils/format';

const P='#15803d';const A='#f0fdf4';const W='#fff';const B='#111';const G='#6b7280';const BD='#e2e8f0';

const s = StyleSheet.create({
  page:{padding:'30 35 50 35',fontFamily:'Helvetica',fontSize:8.5,color:B,backgroundColor:W},
  header:{flexDirection:'row',justifyContent:'space-between',marginBottom:6},
  iN:{fontSize:11,fontFamily:'Helvetica-Bold',color:P},
  iS:{fontSize:9,fontFamily:'Helvetica-Bold',color:P},
  iL:{fontSize:7.5,color:G,marginTop:1},iD:{fontSize:7.5,color:P,fontFamily:'Helvetica-Bold',marginTop:1},
  meta:{alignItems:'flex-end'},mR:{flexDirection:'row',marginBottom:2},
  mL:{fontSize:7.5,color:G,width:75,textAlign:'right',marginRight:4},
  mV:{width:110,borderBottom:`1pt solid ${BD}`,fontSize:8,paddingLeft:2,minHeight:10},
  div:{borderBottom:`2pt solid ${P}`,marginBottom:10,marginTop:3},
  title:{fontSize:16,fontFamily:'Helvetica-Bold',color:P,textAlign:'center',marginBottom:12,textTransform:'uppercase'},
  sh:{flexDirection:'row',alignItems:'center',marginBottom:5,marginTop:8},
  bar:{width:3,backgroundColor:P,marginRight:7,alignSelf:'stretch',minHeight:12},
  sl:{fontSize:8.5,fontFamily:'Helvetica-Bold',color:P,textTransform:'uppercase'},
  row:{flexDirection:'row',borderBottom:`0.5pt solid ${BD}`,paddingVertical:4},
  rL:{flexDirection:'row',paddingVertical:4},
  lb:{fontFamily:'Helvetica-Bold',color:P,fontSize:7.5,width:'32%'},
  vl:{flexGrow:1,fontSize:8,color:B},
  lbN:{fontFamily:'Helvetica-Bold',color:P,fontSize:7.5,width:'18%',marginLeft:8},
  vN:{fontSize:8,color:B,width:'14%'},
  chkR:{flexDirection:'row',flexWrap:'wrap',flexGrow:1},
  chkI:{flexDirection:'row',alignItems:'center',marginRight:10,marginBottom:2},
  chkB:{width:9,height:9,border:`1pt solid ${P}`,marginRight:3,alignItems:'center',justifyContent:'center'},
  chkOn:{backgroundColor:P},
  chkLb:{fontSize:7.5},
  frR:{flexDirection:'row',marginBottom:4},
  frL:{width:'55%',fontSize:8,color:G},
  frV:{width:'45%',fontSize:8,fontFamily:'Helvetica-Bold',color:P,textAlign:'right'},
  tot:{flexDirection:'row',backgroundColor:P,padding:'5 8',marginBottom:10},
  totL:{flexGrow:1,fontSize:9,fontFamily:'Helvetica-Bold',color:W},
  totV:{fontSize:9,fontFamily:'Helvetica-Bold',color:A},
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

export default function OrdreMissionModernePDF({data}:{data:OrdreMissionData}){
  const total=(data.perDiemJournalier||0)*(parseFloat(data.duree)||1)+(data.fraisTransport||0)+(data.autresFrais||0);
  return(<Document><Page size="A4" style={s.page}>
    <View style={s.header}>
      <View><Text style={s.iN}>{data.institutionName||'UNIVERSITE INTERNATIONALE'}</Text><Text style={s.iS}>{data.institutionSubtitle||'JEAN PAUL II DE BAFANG'}</Text><Text style={s.iL}>UIJPII — {data.institutionLocation||'Bafang, Cameroun'}</Text><Text style={s.iD}>{data.institutionDepartment||'Cellule Informatique'}</Text></View>
      <View style={s.meta}><View style={s.mR}><Text style={s.mL}>N° Ordre :</Text><View style={s.mV}><Text>{v(data.numeroOrdre)}</Text></View></View><View style={s.mR}><Text style={s.mL}>Date d'émission :</Text><View style={s.mV}><Text>{v(data.dateEmission)}</Text></View></View></View>
    </View>
    <View style={s.div}/>
    <Text style={s.title}>Ordre de Mission</Text>
    <S n="1" t="Identification de l'Agent"/>
    <View style={s.row}><Text style={s.lb}>Nom & Prénom</Text><Text style={s.vl}>{v(data.nomPrenom)}</Text><Text style={s.lbN}>Matricule</Text><Text style={s.vN}>{v(data.matricule)}</Text></View>
    <View style={s.row}><Text style={s.lb}>Grade / Titre</Text><Text style={s.vl}>{v(data.grade)}</Text><Text style={s.lbN}>Fonction</Text><Text style={s.vN}>{v(data.fonction)}</Text></View>
    <View style={s.rL}><Text style={s.lb}>Département / Service</Text><Text style={s.vl}>{v(data.departement)}</Text></View>
    <S n="2" t="Détails de la Mission"/>
    <View style={s.row}><Text style={s.lb}>Objet de la mission</Text><Text style={s.vl}>{v(data.objetMission)}</Text></View>
    <View style={s.row}><Text style={s.lb}>Destination</Text><Text style={s.vl}>{v(data.destination)}</Text></View>
    <View style={s.row}><Text style={s.lb}>Date de départ</Text><Text style={s.vl}>{v(data.dateDepart)}</Text><Text style={s.lbN}>Date de retour</Text><Text style={s.vN}>{v(data.dateRetour)}</Text></View>
    <View style={s.rL}><Text style={s.lb}>Durée (jours)</Text><Text style={s.vl}>{v(data.duree)}</Text></View>
    <S n="3" t="Moyen de Transport"/>
    <View style={s.row}><Text style={s.lb}>Transport</Text><View style={s.chkR}><Chk on={!!data.moyenTransport?.vehiculeService} l="Véhicule service"/><Chk on={!!data.moyenTransport?.vehiculePersonnel} l="Véhicule perso"/><Chk on={!!data.moyenTransport?.transport_commun} l="Transport commun"/><Chk on={!!data.moyenTransport?.avion} l="Avion"/></View></View>
    <S n="4" t="Frais Alloués"/>
    <View style={{marginBottom:8}}>
      <View style={s.frR}><Text style={s.frL}>Per diem journalier × {v(data.duree)||'0'} jour(s)</Text><Text style={s.frV}>{formatCurrency((data.perDiemJournalier||0)*(parseFloat(data.duree)||1))} {data.devise||'FCFA'}</Text></View>
      <View style={s.frR}><Text style={s.frL}>Frais de transport</Text><Text style={s.frV}>{formatCurrency(data.fraisTransport||0)} {data.devise||'FCFA'}</Text></View>
      <View style={s.frR}><Text style={s.frL}>Autres frais</Text><Text style={s.frV}>{formatCurrency(data.autresFrais||0)} {data.devise||'FCFA'}</Text></View>
    </View>
    <View style={s.tot}><Text style={s.totL}>TOTAL FRAIS ALLOUÉS</Text><Text style={s.totV}>{formatCurrency(total)} {data.devise||'FCFA'}</Text></View>
    <Text style={{fontSize:8.5,fontFamily:'Helvetica-Bold',color:P,textTransform:'uppercase',marginBottom:4}}>Autorisation & Signatures</Text>
    <View style={s.sigRow}>
      <View style={[s.sigB,s.sigBL]}><Text style={s.sigT}>L'Intéressé(e)</Text><Text style={s.sigLb}>Nom & Prénom :</Text><View style={s.sigLn}/><Text style={s.sigLb}>Signature :</Text><View style={[s.sigLn,{marginBottom:8}]}/><Text style={s.sigLb}>Date : {v(data.dateSignature)}</Text></View>
      <View style={s.sigB}><Text style={s.sigT}>{v(data.titreAutorisateur)||'Le Directeur Général'}</Text><Text style={s.sigLb}>Nom & Prénom : {v(data.autorisePar)}</Text><View style={s.sigLn}/><Text style={s.sigLb}>Signature & Cachet :</Text><View style={[s.sigLn,{marginBottom:8}]}/><Text style={s.sigLb}>Lieu : {v(data.lieuSignature)} — {v(data.dateSignature)}</Text></View>
    </View>
    <View fixed style={s.footer}><Text style={s.ftxt}>UIJPII — Cellule Informatique | Science et conscience pour un monde meilleur — UIJPII</Text></View>
  </Page></Document>);
}
