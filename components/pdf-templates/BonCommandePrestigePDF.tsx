import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { BonCommandeData } from '@/types/bon-commande';
import { formatCurrency } from '@/utils/format';

const P='#1e3a5f';const G='#d4a017';const D='#0f1f35';const W='#fff';const T='#f0f4f8';const GR='#94a3b8';const BD='#2d4a6b';const L='#162a42';

const s=StyleSheet.create({
  page:{padding:'25 30 50 30',fontFamily:'Helvetica',fontSize:8.5,color:T,backgroundColor:D},
  border:{border:`2pt solid ${G}`,padding:'20 22'},
  hdr:{flexDirection:'row',justifyContent:'space-between',borderBottom:`1pt solid ${BD}`,paddingBottom:10,marginBottom:8},
  iN:{fontSize:11,fontFamily:'Helvetica-Bold',color:G,textTransform:'uppercase'},
  iS:{fontSize:9,fontFamily:'Helvetica-Bold',color:T},iL:{fontSize:7.5,color:GR},iD:{fontSize:7.5,color:G,fontFamily:'Helvetica-Bold'},
  mR:{flexDirection:'row',marginBottom:3},mL:{fontSize:7.5,color:GR,width:75,textAlign:'right',marginRight:4},
  mV:{width:100,borderBottom:`1pt solid ${BD}`,fontSize:8,color:T,paddingLeft:2,minHeight:10},
  titleBox:{backgroundColor:G,padding:'7 14',marginBottom:10,alignItems:'center'},
  titleTxt:{fontSize:13,fontFamily:'Helvetica-Bold',color:D,textTransform:'uppercase',letterSpacing:1},
  partyRow:{flexDirection:'row',gap:8,marginBottom:8},
  partyBox:{flex:1,border:`0.5pt solid ${BD}`},
  pHdr:{backgroundColor:L,borderBottom:`0.5pt solid ${G}`,padding:'3 8',fontSize:8,fontFamily:'Helvetica-Bold',color:G,textAlign:'center'},
  pBody:{padding:8},pLine:{fontSize:8,color:T,marginBottom:3},pLbl:{fontSize:7.5,color:GR},
  st:{color:G,fontFamily:'Helvetica-Bold',fontSize:8,textTransform:'uppercase',marginBottom:4,marginTop:8},
  tHead:{flexDirection:'row',backgroundColor:L},
  thN:{width:'6%',padding:'4 4',color:G,fontFamily:'Helvetica-Bold',fontSize:7.5,textAlign:'center',borderRight:`0.5pt solid ${D}`},
  thD:{width:'40%',padding:'4 6',color:G,fontFamily:'Helvetica-Bold',fontSize:7.5,borderRight:`0.5pt solid ${D}`},
  thU:{width:'10%',padding:'4 4',color:G,fontFamily:'Helvetica-Bold',fontSize:7.5,textAlign:'center',borderRight:`0.5pt solid ${D}`},
  thQ:{width:'10%',padding:'4 4',color:G,fontFamily:'Helvetica-Bold',fontSize:7.5,textAlign:'center',borderRight:`0.5pt solid ${D}`},
  thP:{width:'17%',padding:'4 4',color:G,fontFamily:'Helvetica-Bold',fontSize:7.5,textAlign:'right',borderRight:`0.5pt solid ${D}`},
  thT:{width:'17%',padding:'4 4',color:G,fontFamily:'Helvetica-Bold',fontSize:7.5,textAlign:'right'},
  row:{flexDirection:'row',borderBottom:`0.5pt solid ${BD}`},rL:{flexDirection:'row'},
  tdN:{width:'6%',padding:'3 4',fontSize:8,textAlign:'center',borderRight:`0.5pt solid ${BD}`,color:T},
  tdD:{width:'40%',padding:'3 6',fontSize:8,borderRight:`0.5pt solid ${BD}`,color:T},
  tdU:{width:'10%',padding:'3 4',fontSize:8,textAlign:'center',borderRight:`0.5pt solid ${BD}`,color:T},
  tdQ:{width:'10%',padding:'3 4',fontSize:8,textAlign:'center',borderRight:`0.5pt solid ${BD}`,color:T},
  tdP:{width:'17%',padding:'3 6',fontSize:8,textAlign:'right',borderRight:`0.5pt solid ${BD}`,color:T},
  tdT:{width:'17%',padding:'3 6',fontSize:8,textAlign:'right',color:T},
  totWrap:{flexDirection:'row',justifyContent:'flex-end',marginBottom:10},
  totBox:{flexDirection:'row',border:`1pt solid ${G}`},
  totL:{backgroundColor:L,color:G,padding:'5 12',fontSize:9,fontFamily:'Helvetica-Bold'},
  totV:{backgroundColor:G,color:D,padding:'5 12',fontSize:10,fontFamily:'Helvetica-Bold'},
  condRow:{flexDirection:'row',marginBottom:4},
  condL:{width:'30%',fontSize:8,fontFamily:'Helvetica-Bold',color:G},
  condV:{flexGrow:1,fontSize:8,color:T},
  sigRow:{flexDirection:'row',border:`0.5pt solid ${BD}`,marginTop:4},
  sigB:{flex:1,padding:8},sigBM:{borderLeft:`0.5pt solid ${BD}`,borderRight:`0.5pt solid ${BD}`},
  sigT:{fontSize:7.5,fontFamily:'Helvetica-Bold',color:G,marginBottom:6},
  sigLn:{borderBottom:`0.5pt solid ${BD}`,marginBottom:12,marginTop:4,width:'80%'},
  sigLb:{fontSize:7,color:GR},
  footer:{position:'absolute',bottom:15,left:30,right:30,borderTop:`1pt solid ${G}`,paddingTop:5,alignItems:'center'},
  ftxt:{fontSize:7,color:GR,fontFamily:'Helvetica-Oblique',textAlign:'center'},
});

const v=(x?:string|number)=>x?.toString()||'';

export default function BonCommandePrestigePDF({data}:{data:BonCommandeData}){
  const items=data.items?.length?data.items:[1,2,3].map(i=>({id:String(i),designation:'',unite:'',quantite:0,prixUnitaire:0}));
  const total=items.reduce((s,i)=>s+(i.quantite||0)*(i.prixUnitaire||0),0);
  return(<Document><Page size="A4" style={s.page}>
    <View style={s.border}>
      <View style={s.hdr}>
        <View><Text style={s.iN}>{data.institutionName||'UNIVERSITE INTERNATIONALE'}</Text><Text style={s.iS}>{data.institutionSubtitle||'JEAN PAUL II DE BAFANG'}</Text><Text style={s.iL}>UIJPII — {data.institutionLocation||'Bafang, Cameroun'}</Text><Text style={s.iD}>{data.institutionDepartment||'Cellule Informatique'}</Text></View>
        <View>{[['N° Bon',data.numeroBon],['Date',data.dateCommande]].map(([l,val])=>(<View key={l} style={s.mR}><Text style={s.mL}>{l} :</Text><View style={s.mV}><Text>{v(val)}</Text></View></View>))}</View>
      </View>
      <View style={s.titleBox}><Text style={s.titleTxt}>Bon de Commande</Text></View>
      <View style={s.partyRow}>
        <View style={s.partyBox}><Text style={s.pHdr}>Acheteur</Text><View style={s.pBody}><Text style={s.pLine}>{data.institutionName}</Text><Text style={s.pLine}>{data.institutionSubtitle}</Text><Text style={s.pLine}>{data.institutionLocation}</Text><Text style={s.pLine}><Text style={s.pLbl}>Service : </Text>{data.institutionDepartment}</Text></View></View>
        <View style={s.partyBox}><Text style={s.pHdr}>Fournisseur</Text><View style={s.pBody}><Text style={s.pLine}>{v(data.fournisseurNom)}</Text><Text style={s.pLine}>{v(data.fournisseurAdresse)}</Text><Text style={s.pLine}><Text style={s.pLbl}>Contact : </Text>{v(data.fournisseurContact)}</Text></View></View>
      </View>
      <Text style={s.st}>Désignation des Articles</Text>
      <View style={{border:`0.5pt solid ${BD}`,marginBottom:6}}>
        <View style={s.tHead}><Text style={s.thN}>N°</Text><Text style={s.thD}>Désignation</Text><Text style={s.thU}>Unité</Text><Text style={s.thQ}>Qté</Text><Text style={s.thP}>Prix Unit.</Text><Text style={s.thT}>Total</Text></View>
        {items.map((it,i)=>(<View key={it.id||i} style={i<items.length-1?s.row:s.rL}><Text style={s.tdN}>{i+1}</Text><Text style={s.tdD}>{v(it.designation)}</Text><Text style={s.tdU}>{v(it.unite)}</Text><Text style={s.tdQ}>{it.quantite||''}</Text><Text style={s.tdP}>{it.prixUnitaire?formatCurrency(it.prixUnitaire):''}</Text><Text style={s.tdT}>{it.quantite&&it.prixUnitaire?formatCurrency(it.quantite*it.prixUnitaire):''}</Text></View>))}
      </View>
      <View style={s.totWrap}><View style={s.totBox}><Text style={s.totL}>TOTAL GÉNÉRAL (FCFA)</Text><Text style={s.totV}>{formatCurrency(total)}</Text></View></View>
      <Text style={s.st}>Conditions</Text>
      <View style={{marginBottom:8}}>
        <View style={s.condRow}><Text style={s.condL}>Délai de livraison :</Text><Text style={s.condV}>{v(data.delaiLivraison)}</Text></View>
        <View style={s.condRow}><Text style={s.condL}>Lieu de livraison :</Text><Text style={s.condV}>{v(data.lieuLivraison)}</Text></View>
        <View style={s.condRow}><Text style={s.condL}>Mode de paiement :</Text><Text style={s.condV}>{v(data.modePaiement)}</Text></View>
      </View>
      <Text style={s.st}>Approbations & Signatures</Text>
      <View style={s.sigRow}>
        {[[data.demandeurFonction||'Demandeur',data.demandeurNom],[data.validateurFonction||'Validateur',data.validateurNom],[data.directeurFonction||'Directeur',data.directeurNom]].map(([fn,nm],i)=>(
          <View key={i} style={[s.sigB,i===1?s.sigBM:{}]}>
            <Text style={s.sigT}>{v(fn)}</Text>
            <Text style={s.sigLb}>{v(nm)}</Text>
            <View style={s.sigLn}/><Text style={s.sigLb}>Signature</Text>
            <View style={[s.sigLn,{marginBottom:6}]}/><Text style={s.sigLb}>Date : {v(data.dateSignature)}</Text>
          </View>
        ))}
      </View>
    </View>
    <View fixed style={s.footer}><Text style={s.ftxt}>UIJPII — Cellule Informatique | Science et conscience pour un monde meilleur — UIJPII</Text></View>
  </Page></Document>);
}
