import React from 'react';
import { Document, Page } from '@react-pdf/renderer';
import { FicheBesoinData } from '@/types/fiche-besoin';
import { formatCurrency } from '@/utils/format';
import { CLASSIQUE_THEME, moderneTheme, prestigeTheme, getTheme, StyleTier, PdfTheme } from './shared/theme';
import { createSharedStyles } from './shared/styles';
import {
  PageShell, DocumentHeader, Divider, DocumentTitle, SectionTitle,
  PartyRow, PartyBox, ItemsTable, TotalBox, SignatureRow, DocumentFooter, v,
} from './shared/primitives';

const THEMES: Record<StyleTier, PdfTheme> = {
  classique: CLASSIQUE_THEME,
  moderne: moderneTheme('#0d9488', '#f0fdfa'),
  prestige: prestigeTheme({ primary: '#4c1d95', accent: '#fbbf24', dark: '#1e1b4b', surface: '#2e1065', text: '#f5f3ff', muted: '#8b5cf6', border: '#4c1d95' }),
};

interface Props { data: FicheBesoinData }

export default function FicheBesoinDocument({ data }: Props) {
  const theme = getTheme(data.template, THEMES);
  const s = createSharedStyles(theme);

  const items = data.items?.length > 0 ? data.items : [1, 2, 3, 4].map((i) => ({ id: String(i), designation: '', unite: '', quantite: 0, estimationPrix: 0 }));
  const total = items.reduce((sum, item) => sum + (item.quantite || 0) * (item.estimationPrix || 0), 0);

  return (
    <Document>
      <Page size="A4" style={s.page}>
        <PageShell theme={theme}>
          <DocumentHeader
            theme={theme}
            institution={{ name: data.institutionName, subtitle: data.institutionSubtitle, location: data.institutionLocation, acronym: data.institutionAcronym, department: data.institutionDepartment }}
            meta={[{ label: 'N° Fiche', value: data.numeroFiche }, { label: 'Date', value: data.dateDemande }]}
          />
          <Divider theme={theme} />
          <DocumentTitle theme={theme}>Fiche d'Expression de Besoin</DocumentTitle>

          <PartyRow theme={theme}>
            <PartyBox theme={theme} title="Demandeur" lines={[
              { label: 'Nom & Prénom :', value: data.demandeurNom },
              { label: 'Fonction :', value: data.demandeurFonction },
              { label: 'Service :', value: data.departementDemandeur },
            ]} />
            <PartyBox theme={theme} title="Détails de la demande" lines={[
              { label: 'Motif / Projet :', value: data.motifBesoin },
              { label: 'Date souhaitée :', value: data.dateSouhaitee },
            ]} />
          </PartyRow>

          <SectionTitle theme={theme}>Désignation des Besoins</SectionTitle>
          <ItemsTable
            theme={theme}
            columns={[
              { key: 'n', label: 'N°', width: '8%', align: 'center', render: (_row, i) => String(i + 1) },
              { key: 'designation', label: "Désignation de l'article / besoin", width: '42%', render: (row) => v(row.designation) },
              { key: 'unite', label: 'Unité', width: '10%', align: 'center', render: (row) => v(row.unite) },
              { key: 'quantite', label: 'Qté', width: '10%', align: 'center', render: (row) => row.quantite ? String(row.quantite) : '' },
              { key: 'estimationPrix', label: 'Est. Unit.', width: '15%', align: 'right', render: (row) => row.estimationPrix ? formatCurrency(row.estimationPrix) : '' },
              { key: 'total', label: 'Total Est.', width: '15%', align: 'right', render: (row) => (row.quantite && row.estimationPrix) ? formatCurrency(row.quantite * row.estimationPrix) : '' },
            ]}
            rows={items}
          />
          <TotalBox theme={theme} label="COÛT ESTIMATIF (FCFA)" value={formatCurrency(total)} />

          <SectionTitle theme={theme}>Visa & Approbations</SectionTitle>
          <SignatureRow theme={theme} signatures={[
            { title: 'Le Demandeur', name: data.demandeurNom, date: data.dateSignatureDemandeur, image: data.signatures?.demandeur },
            { title: v(data.responsableFonction) || 'Resp. Hiérarchique', name: data.responsableNom, date: data.dateSignatureResponsable, image: data.signatures?.responsable },
            { title: v(data.directionFonction) || 'Direction / Finances', name: data.directionNom, date: data.dateSignatureDirection, image: data.signatures?.direction },
          ]} />

          <DocumentFooter theme={theme} text={data.footerText} />
        </PageShell>
      </Page>
    </Document>
  );
}
