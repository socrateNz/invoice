import React from 'react';
import { Document, Page, View } from '@react-pdf/renderer';
import { NoteFraisData } from '@/types/note-frais';
import { formatCurrency } from '@/utils/format';
import { CLASSIQUE_THEME, moderneTheme, prestigeTheme, getTheme, StyleTier, PdfTheme } from './shared/theme';
import { createSharedStyles } from './shared/styles';
import {
  PageShell, DocumentHeader, Divider, DocumentTitle, SectionTitle,
  LabelValueTable, ItemsTable, KeyValueRow, TotalBar, SignatureRow, DocumentFooter, v,
} from './shared/primitives';

const THEMES: Record<StyleTier, PdfTheme> = {
  classique: CLASSIQUE_THEME,
  moderne: moderneTheme('#be123c', '#fff1f2'),
  prestige: prestigeTheme({ primary: '#831843', accent: '#fbbf24', dark: '#1a0a12', surface: '#3f0d24', text: '#fce7f3', muted: '#c4b5fd', border: '#4a044e' }),
};

interface Props { data: NoteFraisData }

export default function NoteFraisDocument({ data }: Props) {
  const theme = getTheme(data.template, THEMES);
  const s = createSharedStyles(theme);
  const devise = data.devise || 'FCFA';

  const depenses = data.depenses?.length > 0 ? data.depenses : [
    { id: '1', date: '', motif: '', categorie: '', montant: 0 },
    { id: '2', date: '', motif: '', categorie: '', montant: 0 },
    { id: '3', date: '', motif: '', categorie: '', montant: 0 },
  ];
  const totalDepenses = depenses.reduce((sum, d) => sum + (d.montant || 0), 0);
  const totalARembourser = totalDepenses - (data.avanceRecue || 0);

  return (
    <Document>
      <Page size="A4" style={s.page}>
        <PageShell theme={theme}>
          <DocumentHeader
            theme={theme}
            institution={{ name: data.institutionName, subtitle: data.institutionSubtitle, location: data.institutionLocation, acronym: data.institutionAcronym, department: data.institutionDepartment }}
            meta={[{ label: 'N° Note', value: data.numeroNote }, { label: 'Date', value: data.dateNote }]}
          />
          <Divider theme={theme} />
          <DocumentTitle theme={theme}>Note de Frais</DocumentTitle>

          <SectionTitle theme={theme}>Employé</SectionTitle>
          <LabelValueTable theme={theme} rows={[
            { label: 'Nom & Prénom', value: data.employeNom, narrowLabel: 'Fonction', narrowValue: data.employeFonction },
            { label: 'Département / Service', value: data.employeDepartement, narrowLabel: 'Réf. Ordre de Mission', narrowValue: data.numeroOrdreMission },
          ]} />

          <SectionTitle theme={theme}>Détail des Dépenses</SectionTitle>
          <ItemsTable
            theme={theme}
            columns={[
              { key: 'date', label: 'Date', width: '15%', align: 'center', render: (row) => v(row.date) },
              { key: 'motif', label: 'Motif', width: '40%', render: (row) => v(row.motif) },
              { key: 'categorie', label: 'Catégorie', width: '25%', render: (row) => v(row.categorie) },
              { key: 'montant', label: `Montant (${devise})`, width: '20%', align: 'right', render: (row) => row.montant ? formatCurrency(row.montant) : '' },
            ]}
            rows={depenses}
          />

          <View style={[s.table, { padding: 10 }]}>
            <KeyValueRow theme={theme} label="Total des dépenses" value={`${formatCurrency(totalDepenses)} ${devise}`} />
            <KeyValueRow theme={theme} label="Avance déjà reçue" value={`- ${formatCurrency(data.avanceRecue || 0)} ${devise}`} />
          </View>
          <TotalBar theme={theme} label="TOTAL À REMBOURSER" value={`${formatCurrency(totalARembourser)} ${devise}`} />

          {data.observations ? (
            <LabelValueTable theme={theme} rows={[{ label: 'Observations', value: data.observations }]} />
          ) : null}

          <SectionTitle theme={theme}>Approbations & Signatures</SectionTitle>
          <SignatureRow theme={theme} signatures={[
            { title: "L'Employé", name: data.employeNom, date: data.dateSignatureEmploye, image: data.signatures?.employe },
            { title: 'Valideur', subtitle: v(data.valideurFonction), name: data.valideurNom, date: data.dateSignatureValideur, image: data.signatures?.valideur },
            { title: v(data.directeurFonction) || 'Directeur Général', name: data.directeurNom, date: data.dateSignatureDirecteur, signatureLabel: 'Signature & Cachet', image: data.signatures?.directeur },
          ]} />

          <DocumentFooter theme={theme} text={data.footerText} />
        </PageShell>
      </Page>
    </Document>
  );
}
