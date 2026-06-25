import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { FicheBesoinData } from '@/types/fiche-besoin';
import { formatCurrency } from '@/utils/format';

const P='#0d9488'; const A='#f0fdfa'; const W='#fff'; const B='#111'; const GR='#6b7280'; const BD='#e2e8f0';

const s=StyleSheet.create({
  page:{padding:'30 35 50 35',fontFamily:'Helvetica',fontSize:8.5,color:B,backgroundColor:W},
  hdr:{flexDirection:'row',justifyContent:'space-between',marginBottom:6},
  iN:{fontSize:11,fontFamily:'Helvetica-Bold',color:P},iS:{fontSize:9,fontFamily:'Helvetica-Bold',color:P},
  iL:{fontSize:7.5,color:GR,marginTop:1},iD:{fontSize:7.5,color:P,fontFamily:'Helvetica-Bold',marginTop:1},
  meta:{alignItems:'flex-end'},mR:{flexDirection:'row',marginBottom:2},
  mL:{fontSize:7.5,color:GR,width:75,textAlign:'right',marginRight:4},
  mV:{width:110,borderBottom:`1pt solid ${BD}`,fontSize:8,paddingLeft:2,minHeight:10},
  div:{borderBottom:`2pt solid ${P}`,marginBottom:10,marginTop:3},
  title:{fontSize:16,fontFamily:'Helvetica-Bold',color:P,textAlign:'center',marginBottom:12,textTransform:'uppercase'},
  partyRow:{flexDirection:'row',gap:8,marginBottom:10},
  partyBox:{flex:1,border:`1pt solid ${BD}`},
  pHdr:{backgroundColor:A,borderBottom:`1pt solid ${P}`,padding:'3 8',fontSize:8,fontFamily:'Helvetica-Bold',color:P,textAlign:'center'},
  pBody:{padding:8},pLine:{fontSize:8,color:B,marginBottom:3},pLbl:{fontSize:7.5,color:GR},
  sh:{flexDirection:'row',alignItems:'center',marginBottom:5,marginTop:8},
  bar:{width:3,backgroundColor:P,marginRight:7,alignSelf:'stretch',minHeight:12},
  sl:{fontSize:8.5,fontFamily:'Helvetica-Bold',color:P,textTransform:'uppercase'},
  tHead:{flexDirection:'row',backgroundColor:P},
  thN:{width:'8%',padding:'4 4',color:W,fontFamily:'Helvetica-Bold',fontSize:7.5,textAlign:'center',borderRight:`0.5pt solid ${W}`},
  thD:{width:'42%',padding:'4 6',color:W,fontFamily:'Helvetica-Bold',fontSize:7.5,borderRight:`0.5pt solid ${W}`},
  thU:{width:'10%',padding:'4 4',color:W,fontFamily:'Helvetica-Bold',fontSize:7.5,textAlign:'center',borderRight:`0.5pt solid ${W}`},
  thQ:{width:'10%',padding:'4 4',color:W,fontFamily:'Helvetica-Bold',fontSize:7.5,textAlign:'center',borderRight:`0.5pt solid ${W}`},
  thP:{width:'15%',padding:'4 4',color:W,fontFamily:'Helvetica-Bold',fontSize:7.5,textAlign:'right',borderRight:`0.5pt solid ${W}`},
  thT:{width:'15%',padding:'4 4',color:W,fontFamily:'Helvetica-Bold',fontSize:7.5,textAlign:'right'},
  row:{flexDirection:'row',borderBottom:`0.5pt solid ${BD}`},rL:{flexDirection:'row'},
  tdN:{width:'8%',padding:'3 4',fontSize:8,textAlign:'center',borderRight:`0.5pt solid ${BD}`},
  tdD:{width:'42%',padding:'3 6',fontSize:8,borderRight:`0.5pt solid ${BD}`},
  tdU:{width:'10%',padding:'3 4',fontSize:8,textAlign:'center',borderRight:`0.5pt solid ${BD}`},
  tdQ:{width:'10%',padding:'3 4',fontSize:8,textAlign:'center',borderRight:`0.5pt solid ${BD}`},
  tdP:{width:'15%',padding:'3 6',fontSize:8,textAlign:'right',borderRight:`0.5pt solid ${BD}`},
  tdT:{width:'15%',padding:'3 6',fontSize:8,textAlign:'right'},
  totWrap:{flexDirection:'row',justifyContent:'flex-end',marginBottom:10},
  totBox:{flexDirection:'row',border:`1pt solid ${P}`},
  totL:{backgroundColor:P,color:W,padding:'5 12',fontSize:9,fontFamily:'Helvetica-Bold'},
  totV:{backgroundColor:A,color:P,padding:'5 12',fontSize:10,fontFamily:'Helvetica-Bold'},
  sigRow:{flexDirection:'row',marginTop:4},
  sigB:{flex:1,padding:8},sigBM:{borderLeft:`1pt solid ${BD}`,borderRight:`1pt solid ${BD}`},
  sigT:{fontSize:7.5,fontFamily:'Helvetica-Bold',color:P,marginBottom:6,textTransform:'uppercase'},
  sigLn:{borderBottom:`0.5pt solid ${GR}`,marginBottom:12,marginTop:4,width:'80%'},
  sigLb:{fontSize:7,color:GR},
  footer:{position:'absolute',bottom:18,left:35,right:35,borderTop:`1pt solid ${P}`,paddingTop:5,alignItems:'center'},
  ftxt:{fontSize:7,color:GR,fontFamily:'Helvetica-Oblique',textAlign:'center'},
});

const v=(x?:string|number)=>x?.toString()||'';

export default function FicheBesoinModernePDF({data}:{data:FicheBesoinData}){
  const items=data.items?.length?data.items:[1,2,3,4].map(i=>({id:String(i),designation:'',unite:'',quantite:0,estimationPrix:0}));
  const total=items.reduce((s,i)=>s+(i.quantite||0)*(i.estimationPrix||0),0);
  return(<Document><Page size="A4" style={s.page}>
    <View style={s.hdr}>
      <View><Text style={s.iN}>{data.institutionName||'UNIVERSITE INTERNATIONALE'}</Text><Text style={s.iS}>{data.institutionSubtitle||'JEAN PAUL II DE BAFANG'}</Text><Text style={s.iL}>UIJPII — {data.institutionLocation||'Bafang, Cameroun'}</Text><Text style={s.iD}>{data.institutionDepartment||'Cellule Informatique'}</Text></View>
      <View style={s.meta}>{[['N° Fiche',data.numeroFiche],['Date',data.dateDemande]].map(([l,val])=>(<View key={l} style={s.mR}><Text style={s.mL}>{l} :</Text><View style={s.mV}><Text>{v(val)}</Text></View></View>))}</View>
    </View>
    <View style={s.div}/><Text style={s.title}>Fiche d'Expression de Besoin</Text>
    
    <View style={s.partyRow}>
      <View style={s.partyBox}><Text style={s.pHdr}>Demandeur</Text><View style={s.pBody}><Text style={s.pLine}><Text style={s.pLbl}>Nom : </Text>{v(data.demandeurNom)}</Text><Text style={s.pLine}><Text style={s.pLbl}>Fonction : </Text>{v(data.demandeurFonction)}</Text><Text style={s.pLine}><Text style={s.pLbl}>Service : </Text>{v(data.departementDemandeur)}</Text></View></View>
      <View style={s.partyBox}><Text style={s.pHdr}>Détails</Text><View style={s.pBody}><Text style={s.pLine}><Text style={s.pLbl}>Motif/Projet : </Text>{v(data.motifBesoin)}</Text><Text style={s.pLine}><Text style={s.pLbl}>Date souhaitée : </Text>{v(data.dateSouhaitee)}</Text></View></View>
    </View>

    <View style={s.sh}><View style={s.bar}/><Text style={s.sl}>Désignation des Besoins</Text></View>
    <View style={{border:`1pt solid ${BD}`,marginBottom:6}}>
      <View style={s.tHead}><Text style={s.thN}>N°</Text><Text style={s.thD}>Désignation de l'article</Text><Text style={s.thU}>Unité</Text><Text style={s.thQ}>Qté</Text><Text style={s.thP}>Est. Unit.</Text><Text style={s.thT}>Total Est.</Text></View>
      {items.map((it,i)=>(<View key={it.id||i} style={i<items.length-1?s.row:s.rL}><Text style={s.tdN}>{i+1}</Text><Text style={s.tdD}>{v(it.designation)}</Text><Text style={s.tdU}>{v(it.unite)}</Text><Text style={s.tdQ}>{it.quantite||''}</Text><Text style={s.tdP}>{it.estimationPrix?formatCurrency(it.estimationPrix):''}</Text><Text style={s.tdT}>{it.quantite&&it.estimationPrix?formatCurrency(it.quantite*it.estimationPrix):''}</Text></View>))}
    </View>
    <View style={s.totWrap}><View style={s.totBox}><Text style={s.totL}>COÛT ESTIMATIF (FCFA)</Text><Text style={s.totV}>{formatCurrency(total)}</Text></View></View>
    
    <View style={s.sh}><View style={s.bar}/><Text style={s.sl}>Visa & Approbations</Text></View>
    <View style={{flexDirection:'row',border:`1pt solid ${BD}`}}>
      {[['Le Demandeur',data.demandeurNom,data.dateSignatureDemandeur],[data.responsableFonction||'Resp. Hiérarchique',data.responsableNom,data.dateSignatureResponsable],[data.directionFonction||'Direction / Finances',data.directionNom,data.dateSignatureDirection]].map(([fn,nm,dt],i)=>(
        <View key={i} style={[s.sigB,i===1?s.sigBM:{}]}>
          <Text style={s.sigT}>{v(fn)}</Text>
          <Text style={s.sigLb}>{v(nm)}</Text>
          <View style={s.sigLn}/><Text style={s.sigLb}>Signature</Text>
          <View style={[s.sigLn,{marginBottom:6}]}/><Text style={s.sigLb}>Date : {v(dt)}</Text>
        </View>
      ))}
    </View>
    
    <View fixed style={s.footer}><Text style={s.ftxt}>UIJPII — Cellule Informatique | Science et conscience pour un monde meilleur — UIJPII</Text></View>
  </Page></Document>);
}
