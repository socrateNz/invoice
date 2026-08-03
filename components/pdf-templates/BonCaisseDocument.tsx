import React from 'react';
import { Document, Page } from '@react-pdf/renderer';
import { BonCaisseData } from '@/types/bon-caisse';
import { formatCurrency } from '@/utils/format';
import { CLASSIQUE_THEME, moderneTheme, prestigeTheme, getTheme, StyleTier, PdfTheme } from './shared/theme';
import { createSharedStyles } from './shared/styles';
import {
  PageShell, DocumentHeader, Divider, DocumentTitle, SectionTitle,
  LabelValueTable, AmountHero, SignatureRow, DocumentFooter, v,
} from './shared/primitives';

const THEMES: Record<StyleTier, PdfTheme> = {
  classique: CLASSIQUE_THEME,
  moderne: moderneTheme('#059669', '#ecfdf5'),
  prestige: prestigeTheme({ primary: '#064e3b', accent: '#fbbf24', dark: '#04120d', surface: '#0f2a20', text: '#ecfdf5', muted: '#6ee7b7', border: '#065f46' }),
};

interface Props { data: BonCaisseData }

export default function BonCaisseDocument({ data }: Props) {
  const theme = getTheme(data.template, THEMES);
  const s = createSharedStyles(theme);
  const isEntree = data.typeMouvement !== 'sortie';
  const heroColor = isEntree ? '#166534' : '#991b1b';
  const heroBg = isEntree ? '#dcfce7' : '#fee2e2';

  return (
    <Document>
      <Page size="A4" style={s.page}>
        <PageShell theme={theme}>
          <DocumentHeader
            theme={theme}
            institution={{ name: data.institutionName, subtitle: data.institutionSubtitle, location: data.institutionLocation, acronym: data.institutionAcronym, department: data.institutionDepartment }}
            meta={[{ label: 'N° Bon de Caisse', value: data.numeroBonCaisse }, { label: 'Date', value: data.dateOperation }]}
          />
          <Divider theme={theme} />
          <DocumentTitle theme={theme}>Bon de Caisse — {isEntree ? 'Entrée' : 'Sortie'}</DocumentTitle>

          <AmountHero
            label={isEntree ? 'Montant Encaissé' : 'Montant Décaissé'}
            value={`${formatCurrency(data.montant || 0)} FCFA`}
            color={heroColor}
            backgroundColor={heroBg}
          />

          <SectionTitle theme={theme}>Détails de l'Opération</SectionTitle>
          <LabelValueTable theme={theme} rows={[
            { label: 'Bénéficiaire', value: data.beneficiaire },
            { label: 'Motif', value: data.motif },
            { label: 'Mode de paiement', checks: [
              { checked: data.modePaiement?.especes, label: 'Espèces' },
              { checked: data.modePaiement?.mobileMoney, label: 'Mobile Money' },
              { checked: data.modePaiement?.virement, label: 'Virement' },
              { checked: data.modePaiement?.cheque, label: 'Chèque' },
              { checked: data.modePaiement?.autre, label: `Autre : ${data.modePaiement?.autreTexte || ''}` },
            ] },
            { label: 'Solde avant opération', value: data.soldeAvant ? `${formatCurrency(data.soldeAvant)} FCFA` : undefined, narrowLabel: 'Solde après', narrowValue: data.soldeApres ? `${formatCurrency(data.soldeApres)} FCFA` : undefined },
          ]} />

          <SectionTitle theme={theme}>Signatures</SectionTitle>
          <SignatureRow theme={theme} signatures={[
            { title: 'Le Caissier', name: data.caissierNom, date: data.dateSignatureCaissier, image: data.signatures?.caissier },
            { title: v(data.autorisateurFonction) || "L'Autorisateur", name: data.autorisateurNom, date: data.dateSignatureAutorisateur, signatureLabel: 'Signature & Cachet', image: data.signatures?.autorisateur },
          ]} />

          <DocumentFooter theme={theme} text={data.footerText} />
        </PageShell>
      </Page>
    </Document>
  );
}
