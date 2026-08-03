import React from 'react';
import { Document, Page } from '@react-pdf/renderer';
import { DevisData } from '@/types/devis';
import { formatCurrency } from '@/utils/format';
import { CLASSIQUE_THEME, moderneTheme, prestigeTheme, getTheme, StyleTier, PdfTheme } from './shared/theme';
import { createSharedStyles } from './shared/styles';
import {
  PageShell, DocumentHeader, Divider, DocumentTitle, SectionTitle,
  PartyRow, PartyBox, LabelValueTable, ItemsTable, TotalBox, SignatureRow, DocumentFooter, v,
} from './shared/primitives';

const THEMES: Record<StyleTier, PdfTheme> = {
  classique: CLASSIQUE_THEME,
  moderne: moderneTheme('#2563eb', '#eff6ff'),
  prestige: prestigeTheme({ primary: '#1e3a8a', accent: '#d4a017', dark: '#0b1120', surface: '#111827', text: '#f1f5f9', muted: '#94a3b8', border: '#1e293b' }),
};

interface Props { data: DevisData }

export default function DevisDocument({ data }: Props) {
  const theme = getTheme(data.template, THEMES);
  const s = createSharedStyles(theme);

  const items = data.items?.length > 0 ? data.items : [
    { id: '1', designation: '', quantite: 0, prixUnitaire: 0 },
    { id: '2', designation: '', quantite: 0, prixUnitaire: 0 },
    { id: '3', designation: '', quantite: 0, prixUnitaire: 0 },
  ];
  const total = items.reduce((sum, item) => sum + (item.quantite || 0) * (item.prixUnitaire || 0), 0);

  return (
    <Document>
      <Page size="A4" style={s.page}>
        <PageShell theme={theme}>
          <DocumentHeader
            theme={theme}
            institution={{ name: data.institutionName, subtitle: data.institutionSubtitle, location: data.institutionLocation, acronym: data.institutionAcronym, department: data.institutionDepartment }}
            meta={[
              { label: 'N° Devis', value: data.numeroDevis },
              { label: 'Date', value: data.dateDevis },
              { label: 'Valable jusqu\'au', value: data.dateValidite },
            ]}
          />
          <Divider theme={theme} />
          <DocumentTitle theme={theme}>Devis</DocumentTitle>

          <PartyRow theme={theme}>
            <PartyBox theme={theme} title="Émetteur" lines={[
              data.institutionName || 'UNIVERSITE INTERNATIONALE',
              data.institutionSubtitle || 'JEAN PAUL II DE BAFANG',
              data.institutionLocation || 'Bafang, Cameroun',
            ]} />
            <PartyBox theme={theme} title="Client" lines={[
              v(data.clientNom),
              v(data.clientAdresse),
              { label: 'Contact :', value: data.clientContact },
            ]} />
          </PartyRow>

          {data.objet ? (
            <LabelValueTable theme={theme} rows={[{ label: 'Objet du devis', value: data.objet }]} />
          ) : null}

          <SectionTitle theme={theme}>Détail de la Prestation</SectionTitle>
          <ItemsTable
            theme={theme}
            columns={[
              { key: 'n', label: 'N°', width: '6%', align: 'center', render: (_row, i) => String(i + 1) },
              { key: 'designation', label: 'Désignation', width: '47%', render: (row) => v(row.designation) },
              { key: 'quantite', label: 'Qté', width: '10%', align: 'center', render: (row) => row.quantite ? String(row.quantite) : '' },
              { key: 'prixUnitaire', label: 'Prix Unit. (FCFA)', width: '18.5%', align: 'right', render: (row) => row.prixUnitaire ? formatCurrency(row.prixUnitaire) : '' },
              { key: 'total', label: 'Total (FCFA)', width: '18.5%', align: 'right', render: (row) => (row.quantite && row.prixUnitaire) ? formatCurrency(row.quantite * row.prixUnitaire) : '' },
            ]}
            rows={items}
          />
          <TotalBox theme={theme} label="TOTAL ESTIMÉ (FCFA)" value={formatCurrency(total)} />

          {data.conditions ? (
            <>
              <SectionTitle theme={theme}>Conditions</SectionTitle>
              <LabelValueTable theme={theme} rows={[{ label: 'Conditions particulières :', value: data.conditions }]} />
            </>
          ) : null}

          <SectionTitle theme={theme}>Signatures</SectionTitle>
          <SignatureRow theme={theme} signatures={[
            { title: 'Établi par', subtitle: v(data.demandeurFonction), name: data.demandeurNom, date: data.dateSignature, image: data.signatures?.emetteur },
            { title: 'Bon pour accord (Client)', name: data.clientNom, date: data.dateSignature, signatureLabel: 'Signature du client', image: data.signatures?.client },
          ]} />

          <DocumentFooter theme={theme} text={data.footerText} />
        </PageShell>
      </Page>
    </Document>
  );
}
