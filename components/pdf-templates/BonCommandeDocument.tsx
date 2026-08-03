import React from 'react';
import { Document, Page } from '@react-pdf/renderer';
import { BonCommandeData } from '@/types/bon-commande';
import { formatCurrency } from '@/utils/format';
import { CLASSIQUE_THEME, moderneTheme, prestigeTheme, getTheme, StyleTier, PdfTheme } from './shared/theme';
import { createSharedStyles } from './shared/styles';
import {
  PageShell, DocumentHeader, Divider, DocumentTitle, SectionTitle,
  PartyRow, PartyBox, LabelValueTable, ItemsTable, TotalBox, SignatureRow, DocumentFooter, v,
} from './shared/primitives';

const THEMES: Record<StyleTier, PdfTheme> = {
  classique: CLASSIQUE_THEME,
  moderne: moderneTheme('#c2410c', '#fff7ed'),
  prestige: prestigeTheme({ primary: '#1e3a5f', accent: '#d4a017', dark: '#0f1f35', surface: '#162a42', text: '#f0f4f8', muted: '#94a3b8', border: '#2d4a6b' }),
};

interface Props { data: BonCommandeData }

export default function BonCommandeDocument({ data }: Props) {
  const theme = getTheme(data.template, THEMES);
  const s = createSharedStyles(theme);

  const items = data.items?.length > 0 ? data.items : [
    { id: '1', designation: '', unite: '', quantite: 0, prixUnitaire: 0 },
    { id: '2', designation: '', unite: '', quantite: 0, prixUnitaire: 0 },
    { id: '3', designation: '', unite: '', quantite: 0, prixUnitaire: 0 },
  ];
  const total = items.reduce((sum, item) => sum + (item.quantite || 0) * (item.prixUnitaire || 0), 0);

  return (
    <Document>
      <Page size="A4" style={s.page}>
        <PageShell theme={theme}>
          <DocumentHeader
            theme={theme}
            institution={{ name: data.institutionName, subtitle: data.institutionSubtitle, location: data.institutionLocation, acronym: data.institutionAcronym, department: data.institutionDepartment }}
            meta={[{ label: 'N° Bon', value: data.numeroBon }, { label: 'Date', value: data.dateCommande }]}
          />
          <Divider theme={theme} />
          <DocumentTitle theme={theme}>Bon de Commande</DocumentTitle>

          <PartyRow theme={theme}>
            <PartyBox theme={theme} title="Acheteur" lines={[
              data.institutionName || 'UNIVERSITE INTERNATIONALE',
              data.institutionSubtitle || 'JEAN PAUL II DE BAFANG',
              data.institutionLocation || 'Bafang, Cameroun',
              { label: 'Service :', value: data.institutionDepartment },
            ]} />
            <PartyBox theme={theme} title="Fournisseur" lines={[
              v(data.fournisseurNom),
              v(data.fournisseurAdresse),
              { label: 'Contact :', value: data.fournisseurContact },
            ]} />
          </PartyRow>

          <SectionTitle theme={theme}>Désignation des Articles</SectionTitle>
          <ItemsTable
            theme={theme}
            columns={[
              { key: 'n', label: 'N°', width: '6%', align: 'center', render: (_row, i) => String(i + 1) },
              { key: 'designation', label: 'Désignation', width: '40%', render: (row) => v(row.designation) },
              { key: 'unite', label: 'Unité', width: '10%', align: 'center', render: (row) => v(row.unite) },
              { key: 'quantite', label: 'Qté', width: '10%', align: 'center', render: (row) => row.quantite ? String(row.quantite) : '' },
              { key: 'prixUnitaire', label: 'Prix Unit. (FCFA)', width: '17%', align: 'right', render: (row) => row.prixUnitaire ? formatCurrency(row.prixUnitaire) : '' },
              { key: 'total', label: 'Total (FCFA)', width: '17%', align: 'right', render: (row) => (row.quantite && row.prixUnitaire) ? formatCurrency(row.quantite * row.prixUnitaire) : '' },
            ]}
            rows={items}
          />
          <TotalBox theme={theme} label="TOTAL GÉNÉRAL (FCFA)" value={formatCurrency(total)} />

          <SectionTitle theme={theme}>Conditions</SectionTitle>
          <LabelValueTable theme={theme} rows={[
            { label: 'Délai de livraison :', value: data.delaiLivraison },
            { label: 'Lieu de livraison :', value: data.lieuLivraison },
            { label: 'Mode de paiement :', value: data.modePaiement },
            ...(data.conditions ? [{ label: 'Conditions particulières :', value: data.conditions }] : []),
          ]} />

          <SectionTitle theme={theme}>Approbations & Signatures</SectionTitle>
          <SignatureRow theme={theme} signatures={[
            { title: 'Demandeur', subtitle: v(data.demandeurFonction), name: data.demandeurNom, date: data.dateSignature, image: data.signatures?.demandeur },
            { title: 'Validateur', subtitle: v(data.validateurFonction), name: data.validateurNom, date: data.dateSignature, image: data.signatures?.validateur },
            { title: v(data.directeurFonction) || 'Directeur Général', subtitle: v(data.directeurFonction), name: data.directeurNom, date: data.dateSignature, signatureLabel: 'Signature & Cachet', image: data.signatures?.directeur },
          ]} />

          <DocumentFooter theme={theme} text={data.footerText} />
        </PageShell>
      </Page>
    </Document>
  );
}
