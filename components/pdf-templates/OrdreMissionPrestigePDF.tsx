import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { OrdreMissionData } from '@/types/ordre-mission';
import { formatCurrency } from '@/utils/format';

const P='#7f1d1d';const G='#fbbf24';const D='#1c0a00';const W='#fff';const T='#fef3c7';const GR='#9ca3af';const BD='#374151';

const s = StyleSheet.create({
  page:{padding:'25 30 50 30',fontFamily:'Helvetica',fontSize:8.5,color:W,backgroundColor:D},
  border:{border:`2pt solid ${G}`,padding:'20 22'},
  hdr:{flexDirection:'row',justifyContent:'space-between',borderBottom:`1pt solid ${BD}`,paddingBottom:10,marginBottom:8},
  iN:{fontSize:11,fontFamily:'Helvetica-Bold',color:G,textTransform:'uppercase'},
  iS:{fontSize:9,fontFamily:'Helvetica-Bold',color:W},iL:{fontSize:7.5,color:GR},iD:{fontSize:7.5,color:G,fontFamily:'Helvetica-Bold'},
  mR:{flexDirection:'row',marginBottom:3},mL:{fontSize:7.5,color:GR,width:80,textAlign:'right',marginRight:4},
  mV:{width:100,borderBottom:`1pt solid ${BD}`,fontSize:8,paddingLeft:2,minHeight:10,color:T},
  titleBox:{backgroundColor:G,padding:'7 14',marginBottom:12,alignItems:'center'},
  titleTxt:{fontSize:13,fontFamily:'Helvetica-Bold',color:D,textTransform:'uppercase',letterSpacing:1},
  st:{color:G,fontFamily:'Helvetica-Bold',fontSize:8,textTransform:'uppercase',marginBottom:4,marginTop:8,letterSpacing:0.5},
  tw:{border:`0.5pt solid ${BD}`,marginBottom:8},
  row:{flexDirection:'row',borderBottom:`0.5pt solid ${BD}`},rL:{flexDirection:'row'},
  lb:{backgroundColor:BD,color:GR,fontFamily:'Helvetica-Bold',fontSize:7.5,padding:'4 6',width:'30%',borderRight:`0.5pt solid ${D}`},
  vl:{fontSize:8,padding:'4 6',flexGrow:1,color:T},
  lbN:{backgroundColor:BD,color:GR,fontFamily:'Helvetica-Bold',fontSize:7.5,padding:'4 6',width:'17%',borderRight:`0.5pt solid ${D}`,borderLeft:`0.5pt solid ${D}`},
  vN:{fontSize:8,padding:'4 6',width:'13%',color:T,borderRight:`0.5pt solid ${BD}`},
  chkR:{flexDirection:'row',flexWrap:'wrap',padding:'4 6',flexGrow:1,gap:8},
  chkI:{flexDirection:'row',alignItems:'center',marginRight:8},
  chkB:{width:9,height:9,border:`1pt solid ${GR}`,marginRight:3,alignItems:'center',justifyContent:'center'},
  chkOn:{backgroundColor:G,border:`1pt solid ${G}`},
  chkLb:{fontSize:7.5,color:T},
  frR:{flexDirection:'row',marginBottom:4},
  frL:{width:'55%',fontSize:8,color:GR},frV:{width:'45%',fontSize:8,fontFamily:'Helvetica-Bold',color:G,textAlign:'right'},
  tot:{flexDirection:'row',backgroundColor:G,padding:'5 8',marginBottom:10},
  totL:{flexGrow:1,fontSize:9,fontFamily:'Helvetica-Bold',color:D},totV:{fontSize:9,fontFamily:'Helvetica-Bold',color:D},
  sigRow:{flexDirection:'row',border:`0.5pt solid ${BD}`,marginTop:4},
  sigB:{flex:1,padding:10},sigBL:{borderRight:`0.5pt solid ${BD}`},
  sigT:{fontSize:8,fontFamily:'Helvetica-Bold',color:G,marginBottom:8},
  sigLn:{borderBottom:`0.5pt solid ${BD}`,marginBottom:14,marginTop:4,width:'70%'},
  sigLb:{fontSize:7.5,color:GR},
  footer:{position:'absolute',bottom:15,left:30,right:30,borderTop:`1pt solid ${G}`,paddingTop:5,alignItems:'center'},
  ftxt:{fontSize:7,color:GR,fontFamily:'Helvetica-Oblique',textAlign:'center'},
});

const Chk=({on,l}:{on:boolean;l:string})=>(<View style={s.chkI}><View style={[s.chkB,on?s.chkOn:{}]}>{on&&<Text style={{color:D,fontSize:6}}>✓</Text>}</View><Text style={s.chkLb}>{l}</Text></View>);
const v=(x?:string|number)=>x?.toString()||'';

export default function OrdreMissionPrestigePDF({data}:{data:OrdreMissionData}){
  const total=(data.perDiemJournalier||0)*(parseFloat(data.duree)||1)+(data.fraisTransport||0)+(data.autresFrais||0);
  return(<Document><Page size="A4" style={s.page}>
    <View style={s.border}>
      <View style={s.hdr}>
        <View><Text style={s.iN}>{data.institutionName||'UNIVERSITE INTERNATIONALE'}</Text><Text style={s.iS}>{data.institutionSubtitle||'JEAN PAUL II DE BAFANG'}</Text><Text style={s.iL}>UIJPII — {data.institutionLocation||'Bafang, Cameroun'}</Text><Text style={s.iD}>{data.institutionDepartment||'Cellule Informatique'}</Text></View>
        <View>{[['N° Ordre',data.numeroOrdre],["Date d'émission",data.dateEmission]].map(([l,val])=>(<View key={l} style={s.mR}><Text style={s.mL}>{l} :</Text><View style={s.mV}><Text>{v(val)}</Text></View></View>))}</View>
      </View>
      <View style={s.titleBox}><Text style={s.titleTxt}>Ordre de Mission</Text></View>
      <Text style={s.st}>1. Identification de l'Agent</Text>
      <View style={s.tw}>
        <View style={s.row}><Text style={s.lb}>Nom & Prénom</Text><Text style={s.vl}>{v(data.nomPrenom)}</Text><Text style={s.lbN}>Matricule</Text><Text style={s.vN}>{v(data.matricule)}</Text></View>
        <View style={s.row}><Text style={s.lb}>Grade / Titre</Text><Text style={s.vl}>{v(data.grade)}</Text><Text style={s.lbN}>Fonction</Text><Text style={s.vN}>{v(data.fonction)}</Text></View>
        <View style={s.rL}><Text style={s.lb}>Département / Service</Text><Text style={s.vl}>{v(data.departement)}</Text></View>
      </View>
      <Text style={s.st}>2. Détails de la Mission</Text>
      <View style={s.tw}>
        <View style={s.row}><Text style={s.lb}>Objet</Text><Text style={s.vl}>{v(data.objetMission)}</Text></View>
        <View style={s.row}><Text style={s.lb}>Destination</Text><Text style={s.vl}>{v(data.destination)}</Text></View>
        <View style={s.row}><Text style={s.lb}>Départ</Text><Text style={s.vl}>{v(data.dateDepart)}</Text><Text style={s.lbN}>Retour</Text><Text style={s.vN}>{v(data.dateRetour)}</Text></View>
        <View style={s.rL}><Text style={s.lb}>Durée</Text><Text style={s.vl}>{v(data.duree)} jour(s)</Text></View>
      </View>
      <Text style={s.st}>3. Frais Alloués</Text>
      <View style={{marginBottom:6}}>
        <View style={s.frR}><Text style={s.frL}>Per diem × {v(data.duree)||'0'} j</Text><Text style={s.frV}>{formatCurrency((data.perDiemJournalier||0)*(parseFloat(data.duree)||1))} {data.devise||'FCFA'}</Text></View>
        <View style={s.frR}><Text style={s.frL}>Transport</Text><Text style={s.frV}>{formatCurrency(data.fraisTransport||0)} {data.devise||'FCFA'}</Text></View>
        <View style={s.frR}><Text style={s.frL}>Autres</Text><Text style={s.frV}>{formatCurrency(data.autresFrais||0)} {data.devise||'FCFA'}</Text></View>
      </View>
      <View style={s.tot}><Text style={s.totL}>TOTAL FRAIS ALLOUÉS</Text><Text style={s.totV}>{formatCurrency(total)} {data.devise||'FCFA'}</Text></View>
      <Text style={s.st}>Signatures</Text>
      <View style={s.sigRow}>
        <View style={[s.sigB,s.sigBL]}><Text style={s.sigT}>L'Intéressé(e)</Text><Text style={s.sigLb}>Nom & Prénom :</Text><View style={s.sigLn}/><Text style={s.sigLb}>Signature :</Text><View style={[s.sigLn,{marginBottom:8}]}/><Text style={s.sigLb}>Date : {v(data.dateSignature)}</Text></View>
        <View style={s.sigB}><Text style={s.sigT}>{v(data.titreAutorisateur)||'Le Directeur Général'}</Text><Text style={s.sigLb}>Nom : {v(data.autorisePar)}</Text><View style={s.sigLn}/><Text style={s.sigLb}>Signature & Cachet :</Text><View style={[s.sigLn,{marginBottom:8}]}/><Text style={s.sigLb}>{v(data.lieuSignature)} — {v(data.dateSignature)}</Text></View>
      </View>
    </View>
    <View fixed style={s.footer}><Text style={s.ftxt}>UIJPII — Cellule Informatique | Science et conscience pour un monde meilleur — UIJPII</Text></View>
  </Page></Document>);
}
