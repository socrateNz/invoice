import React from 'react';
import { Document, Page } from '@react-pdf/renderer';
import { BordereauData } from '@/types/bordereau';
import { CLASSIQUE_THEME, moderneTheme, prestigeTheme, getTheme, StyleTier, PdfTheme } from './shared/theme';
import { createSharedStyles } from './shared/styles';
import {
  PageShell, DocumentHeader, Divider, DocumentTitle, SectionTitle,
  LabelValueTable, ItemsTable, SignatureRow, DocumentFooter,
} from './shared/primitives';

const THEMES: Record<StyleTier, PdfTheme> = {
  classique: CLASSIQUE_THEME,
  moderne: moderneTheme('#0f766e', '#f0fdf4'),
  prestige: prestigeTheme({ primary: '#0f172a', accent: '#d4a017', dark: '#0f172a', surface: '#1e293b', text: '#f8fafc', muted: '#94a3b8', border: '#334155' }),
};

interface Props { data: BordereauData }

export default function BordereauDocument({ data }: Props) {
  const theme = getTheme(data.template, THEMES);
  const s = createSharedStyles(theme);

  const docRows = data.documents.length > 0 ? data.documents : [
    { id: '1', designation: '', nombrePages: '', observations: '' },
    { id: '2', designation: '', nombrePages: '', observations: '' },
    { id: '3', designation: '', nombrePages: '', observations: '' },
    { id: '4', designation: '', nombrePages: '', observations: '' },
  ];

  return (
    <Document>
      <Page size="A4" style={s.page}>
        <PageShell theme={theme}>
          <DocumentHeader
            theme={theme}
            institution={{ name: data.institutionName, subtitle: data.institutionSubtitle, location: data.institutionLocation, acronym: data.institutionAcronym, department: data.institutionDepartment }}
            meta={[
              { label: 'N° Bordereau', value: data.numeroBordereau },
              { label: 'Date de réception', value: data.dateReception },
              { label: 'Heure', value: data.heure },
            ]}
          />
          <Divider theme={theme} />
          <DocumentTitle theme={theme}>Bordereau de Réception de Dossier</DocumentTitle>

          <SectionTitle theme={theme}>1. Identification du Service Émetteur</SectionTitle>
          <LabelValueTable theme={theme} rows={[
            { label: 'Service / Département', value: data.serviceDepartement, narrowLabel: "Date d'envoi", narrowValue: data.dateEnvoi },
            { label: "Nom de l'agent", value: data.nomAgent, narrowLabel: 'Fonction', narrowValue: data.fonction },
            { label: 'Contact / Poste', value: data.contactPoste },
          ]} />

          <SectionTitle theme={theme}>2. Description du Dossier Reçu</SectionTitle>
          <LabelValueTable theme={theme} rows={[
            { label: 'Intitulé / Objet du dossier', value: data.intituleObjet },
            { label: 'Référence interne', value: data.referenceInterne },
            { label: 'Nature du dossier', checks: [
              { checked: data.natureDossier?.administratif, label: 'Administratif' },
              { checked: data.natureDossier?.technique, label: 'Technique' },
              { checked: data.natureDossier?.pedagogique, label: 'Pédagogique' },
              { checked: data.natureDossier?.financier, label: 'Financier' },
              { checked: data.natureDossier?.autreNature, label: `Autre : ${data.natureDossier?.autreNatureTexte || '_________'}` },
            ] },
            { label: 'Support', checks: [
              { checked: data.support?.papier, label: 'Papier' },
              { checked: data.support?.numerique, label: 'Numérique (USB/CD)' },
              { checked: data.support?.courriel, label: 'Courriel' },
              { checked: data.support?.autreSupport, label: `Autre : ${data.support?.autreSupportTexte || ''}` },
            ] },
          ]} />

          <SectionTitle theme={theme}>3. Liste des Documents / Pièces Jointes</SectionTitle>
          <ItemsTable
            theme={theme}
            columns={[
              { key: 'n', label: 'N°', width: '8%', align: 'center', render: (_row, i) => String(i + 1) },
              { key: 'designation', label: 'Désignation du document', width: '46%', render: (row) => row.designation || '' },
              { key: 'pages', label: 'Nombre de pages', width: '18%', align: 'center', render: (row) => row.nombrePages || '' },
              { key: 'observations', label: 'Observations', width: '28%', render: (row) => row.observations || '' },
            ]}
            rows={docRows}
          />

          <SectionTitle theme={theme}>4. Priorité et Traitement</SectionTitle>
          <LabelValueTable theme={theme} rows={[
            { label: "Degré d'urgence", checks: [
              { checked: data.degreeUrgence === 'normal', label: 'Normal' },
              { checked: data.degreeUrgence === 'urgent', label: 'Urgent' },
              { checked: data.degreeUrgence === 'tres_urgent', label: 'Très urgent' },
            ] },
            { label: 'Délai de traitement demandé', value: data.delaiTraitement },
            { label: 'Transmis à / Affecté à', value: data.transmisA },
            { label: 'Instructions particulières', value: data.instructionsParticulieres },
          ]} />

          <SectionTitle theme={theme}>5. État du Dossier à la Réception</SectionTitle>
          <LabelValueTable theme={theme} rows={[
            { label: 'État', checks: [
              { checked: data.etatDossier?.complet, label: 'Dossier complet' },
              { checked: data.etatDossier?.incomplet, label: 'Dossier incomplet (voir observations)' },
              { checked: data.etatDossier?.endommage, label: 'Dossier endommagé' },
            ] },
            { label: 'Observations', value: data.observationsEtat },
          ]} />

          <SectionTitle theme={theme}>6. Signatures</SectionTitle>
          <SignatureRow theme={theme} signatures={[
            { title: 'Agent émetteur (Service)', name: data.nomPrenomEmetteur, date: data.dateSignatureEmetteur, image: data.signatures?.emetteur },
            { title: 'Réceptionniste (Cellule Informatique)', name: data.nomPrenomReceptionniste, date: data.dateSignatureReceptionniste, signatureLabel: 'Signature & Cachet', image: data.signatures?.receptionniste },
          ]} />

          <DocumentFooter theme={theme} text={data.footerText} />
        </PageShell>
      </Page>
    </Document>
  );
}
