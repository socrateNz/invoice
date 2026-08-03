import React from 'react';
import { Document, Page, View } from '@react-pdf/renderer';
import { OrdreMissionData } from '@/types/ordre-mission';
import { formatCurrency } from '@/utils/format';
import { CLASSIQUE_THEME, moderneTheme, prestigeTheme, getTheme, StyleTier, PdfTheme } from './shared/theme';
import { createSharedStyles } from './shared/styles';
import {
  PageShell, DocumentHeader, Divider, DocumentTitle, SectionTitle,
  LabelValueTable, KeyValueRow, TotalBar, NoteBox, SignatureRow, DocumentFooter, v,
} from './shared/primitives';

const THEMES: Record<StyleTier, PdfTheme> = {
  classique: CLASSIQUE_THEME,
  moderne: moderneTheme('#15803d', '#f0fdf4'),
  prestige: prestigeTheme({ primary: '#7f1d1d', accent: '#fbbf24', dark: '#1c0a00', surface: '#2d1010', text: '#fef3c7', muted: '#9ca3af', border: '#374151' }),
};

interface Props { data: OrdreMissionData }

export default function OrdreMissionDocument({ data }: Props) {
  const theme = getTheme(data.template, THEMES);
  const s = createSharedStyles(theme);
  const duree = parseFloat(data.duree) || 1;
  const perDiemTotal = (data.perDiemJournalier || 0) * duree;
  const totalFrais = perDiemTotal + (data.fraisTransport || 0) + (data.autresFrais || 0);
  const devise = data.devise || 'FCFA';

  return (
    <Document>
      <Page size="A4" style={s.page}>
        <PageShell theme={theme}>
          <DocumentHeader
            theme={theme}
            institution={{ name: data.institutionName, subtitle: data.institutionSubtitle, location: data.institutionLocation, acronym: data.institutionAcronym, department: data.institutionDepartment }}
            meta={[{ label: 'N° Ordre', value: data.numeroOrdre }, { label: "Date d'émission", value: data.dateEmission }]}
          />
          <Divider theme={theme} />
          <DocumentTitle theme={theme}>Ordre de Mission</DocumentTitle>

          <SectionTitle theme={theme}>1. Identification de l'Agent</SectionTitle>
          <LabelValueTable theme={theme} rows={[
            { label: 'Nom & Prénom', value: data.nomPrenom, narrowLabel: 'Matricule', narrowValue: data.matricule },
            { label: 'Grade / Titre', value: data.grade, narrowLabel: 'Fonction', narrowValue: data.fonction },
            { label: 'Département / Service', value: data.departement },
          ]} />

          <SectionTitle theme={theme}>2. Détails de la Mission</SectionTitle>
          <LabelValueTable theme={theme} rows={[
            { label: 'Objet de la mission', value: data.objetMission },
            { label: 'Destination', value: data.destination },
            { label: 'Date de départ', value: data.dateDepart, narrowLabel: 'Date de retour', narrowValue: data.dateRetour },
            { label: 'Durée (jours)', value: data.duree },
          ]} />

          <SectionTitle theme={theme}>3. Moyen de Transport</SectionTitle>
          <LabelValueTable theme={theme} rows={[
            { label: 'Transport utilisé', checks: [
              { checked: data.moyenTransport?.vehiculeService, label: 'Véhicule de service' },
              { checked: data.moyenTransport?.vehiculePersonnel, label: 'Véhicule personnel' },
              { checked: data.moyenTransport?.transport_commun, label: 'Transport en commun' },
              { checked: data.moyenTransport?.avion, label: 'Avion' },
              { checked: data.moyenTransport?.autre, label: `Autre : ${data.moyenTransport?.autreTexte || '______'}` },
            ] },
          ]} />

          <SectionTitle theme={theme}>4. Frais Alloués</SectionTitle>
          <View style={[s.table, { padding: 10 }]}>
            <KeyValueRow theme={theme} label={`Per diem journalier (${devise}) ×${v(data.duree) || '0'} jour(s)`} value={`${formatCurrency(perDiemTotal)} ${devise}`} />
            <KeyValueRow theme={theme} label="Frais de transport" value={`${formatCurrency(data.fraisTransport || 0)} ${devise}`} />
            <KeyValueRow theme={theme} label="Autres frais" value={`${formatCurrency(data.autresFrais || 0)} ${devise}`} />
          </View>
          <TotalBar theme={theme} label="TOTAL FRAIS ALLOUÉS" value={`${formatCurrency(totalFrais)} ${devise}`} />

          {data.observations ? (
            <>
              <SectionTitle theme={theme}>5. Observations / Instructions</SectionTitle>
              <NoteBox theme={theme}>{data.observations}</NoteBox>
            </>
          ) : null}

          <SectionTitle theme={theme}>Autorisation & Signatures</SectionTitle>
          <SignatureRow theme={theme} signatures={[
            { title: "L'Intéressé(e)", date: data.dateSignature, image: data.signatures?.interesse },
            { title: v(data.titreAutorisateur) || 'Le Directeur Général', name: data.autorisePar, date: `${v(data.lieuSignature)} — ${v(data.dateSignature)}`, signatureLabel: 'Signature & Cachet', image: data.signatures?.autorisateur },
          ]} />

          <DocumentFooter theme={theme} text={data.footerText} />
        </PageShell>
      </Page>
    </Document>
  );
}
