import React from 'react';
import { Document, Page } from '@react-pdf/renderer';
import { BonLivraisonData } from '@/types/bon-livraison';
import { CLASSIQUE_THEME, moderneTheme, prestigeTheme, getTheme, StyleTier, PdfTheme } from './shared/theme';
import { createSharedStyles } from './shared/styles';
import {
  PageShell, DocumentHeader, Divider, DocumentTitle, SectionTitle,
  PartyRow, PartyBox, LabelValueTable, ItemsTable, SignatureRow, DocumentFooter, v,
} from './shared/primitives';

const THEMES: Record<StyleTier, PdfTheme> = {
  classique: CLASSIQUE_THEME,
  moderne: moderneTheme('#ea580c', '#fff7ed'),
  prestige: prestigeTheme({ primary: '#7c2d12', accent: '#fbbf24', dark: '#1c1006', surface: '#292018', text: '#fef3c7', muted: '#a8a29e', border: '#44403c' }),
};

interface Props { data: BonLivraisonData }

export default function BonLivraisonDocument({ data }: Props) {
  const theme = getTheme(data.template, THEMES);
  const s = createSharedStyles(theme);

  const items = data.items?.length > 0 ? data.items : [
    { id: '1', designation: '', unite: '', quantiteCommandee: 0, quantiteLivree: 0 },
    { id: '2', designation: '', unite: '', quantiteCommandee: 0, quantiteLivree: 0 },
    { id: '3', designation: '', unite: '', quantiteCommandee: 0, quantiteLivree: 0 },
  ];

  return (
    <Document>
      <Page size="A4" style={s.page}>
        <PageShell theme={theme}>
          <DocumentHeader
            theme={theme}
            institution={{ name: data.institutionName, subtitle: data.institutionSubtitle, location: data.institutionLocation, acronym: data.institutionAcronym, department: data.institutionDepartment }}
            meta={[{ label: 'N° Bon de Livraison', value: data.numeroBL }, { label: 'Date de livraison', value: data.dateLivraison }]}
          />
          <Divider theme={theme} />
          <DocumentTitle theme={theme}>Bon de Livraison</DocumentTitle>

          <PartyRow theme={theme}>
            <PartyBox theme={theme} title="Fournisseur" lines={[
              v(data.fournisseurNom),
              v(data.fournisseurAdresse),
              { label: 'Contact :', value: data.fournisseurContact },
            ]} />
            <PartyBox theme={theme} title="Destinataire" lines={[
              data.institutionName || 'UNIVERSITE INTERNATIONALE',
              data.institutionSubtitle || 'JEAN PAUL II DE BAFANG',
              data.institutionLocation || 'Bafang, Cameroun',
              { label: 'Service :', value: data.institutionDepartment },
            ]} />
          </PartyRow>

          <LabelValueTable theme={theme} rows={[
            { label: 'Réf. Bon de Commande', value: data.numeroBonCommande, narrowLabel: 'Transporteur', narrowValue: data.transporteur },
          ]} />

          <SectionTitle theme={theme}>Articles Livrés</SectionTitle>
          <ItemsTable
            theme={theme}
            columns={[
              { key: 'n', label: 'N°', width: '6%', align: 'center', render: (_row, i) => String(i + 1) },
              { key: 'designation', label: 'Désignation', width: '40%', render: (row) => v(row.designation) },
              { key: 'unite', label: 'Unité', width: '10%', align: 'center', render: (row) => v(row.unite) },
              { key: 'commande', label: 'Qté commandée', width: '22%', align: 'center', render: (row) => row.quantiteCommandee ? String(row.quantiteCommandee) : '' },
              { key: 'livree', label: 'Qté livrée', width: '22%', align: 'center', render: (row) => row.quantiteLivree ? String(row.quantiteLivree) : '' },
            ]}
            rows={items}
          />

          {data.observations ? (
            <LabelValueTable theme={theme} rows={[{ label: 'Observations', value: data.observations }]} />
          ) : null}

          <SectionTitle theme={theme}>Signatures</SectionTitle>
          <SignatureRow theme={theme} signatures={[
            { title: 'Le Livreur', name: data.livreurNom, date: data.dateSignatureLivreur, image: data.signatures?.livreur },
            { title: 'Le Réceptionniste', subtitle: v(data.receptionnaireFonction), name: data.receptionnaireNom, date: data.dateSignatureReceptionnaire, image: data.signatures?.receptionnaire },
          ]} />

          <DocumentFooter theme={theme} text={data.footerText} />
        </PageShell>
      </Page>
    </Document>
  );
}
