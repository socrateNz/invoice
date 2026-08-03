import React from 'react';
import { Document, Page } from '@react-pdf/renderer';
import { RecuPaiementData } from '@/types/recu-paiement';
import { formatCurrency, numberToWordsFR } from '@/utils/format';
import { CLASSIQUE_THEME, moderneTheme, prestigeTheme, getTheme, StyleTier, PdfTheme } from './shared/theme';
import { createSharedStyles } from './shared/styles';
import {
  PageShell, DocumentHeader, Divider, DocumentTitle, SectionTitle,
  LabelValueTable, AmountHero, StampArea, SignatureRow, DocumentFooter,
} from './shared/primitives';

const THEMES: Record<StyleTier, PdfTheme> = {
  classique: CLASSIQUE_THEME,
  moderne: moderneTheme('#1d4ed8', '#eff6ff'),
  prestige: prestigeTheme({ primary: '#111827', accent: '#d4a017', dark: '#111827', surface: '#1f2937', text: '#f9fafb', muted: '#9ca3af', border: '#374151' }),
};

interface Props { data: RecuPaiementData }

export default function RecuPaiementDocument({ data }: Props) {
  const theme = getTheme(data.template, THEMES);
  const s = createSharedStyles(theme);
  const montantWords = data.sommeChiffres ? numberToWordsFR(data.sommeChiffres) : '---';

  return (
    <Document>
      <Page size="A4" style={s.page}>
        <PageShell theme={theme}>
          <DocumentHeader
            theme={theme}
            institution={{ name: data.institutionName, subtitle: data.institutionSubtitle, location: data.institutionLocation, acronym: data.institutionAcronym, department: data.institutionDepartment }}
            meta={[{ label: 'N° Reçu', value: data.numeroRecu }, { label: 'Date', value: data.dateRecu }, { label: 'Heure', value: data.heure }]}
          />
          <Divider theme={theme} />
          <DocumentTitle theme={theme}>Reçu de Paiement</DocumentTitle>

          <AmountHero
            label="Montant Reçu"
            value={`${formatCurrency(data.sommeChiffres || 0)} FCFA`}
            subtext={`Arrêté à la somme de : ${montantWords} Francs CFA`}
          />

          <SectionTitle theme={theme}>1. Informations du Payeur</SectionTitle>
          <LabelValueTable theme={theme} rows={[
            { label: 'Reçu de', value: data.recuDe },
            { label: 'Adresse / Contact', value: data.adressePayeur },
          ]} />

          <SectionTitle theme={theme}>2. Détails du Paiement</SectionTitle>
          <LabelValueTable theme={theme} rows={[
            { label: 'Motif / Objet', value: data.motif },
            { label: 'Référence dossier', value: data.reference },
            { label: 'Mode de paiement', checks: [
              { checked: data.modePaiement?.especes, label: 'Espèces' },
              { checked: data.modePaiement?.mobileMoney, label: 'Mobile Money' },
              { checked: data.modePaiement?.virement, label: 'Virement' },
              { checked: data.modePaiement?.cheque, label: 'Chèque' },
              { checked: data.modePaiement?.autre, label: `Autre : ${data.modePaiement?.autreTexte || ''}` },
            ] },
            ...(data.modePaiement?.mobileMoney || data.modePaiement?.virement
              ? [{ label: 'Opérateur / Banque', value: data.operateur }]
              : []),
            { label: 'N° Transaction / Référence', value: data.numeroTransaction },
          ]} />

          <StampArea theme={theme} />

          <SectionTitle theme={theme}>Signatures</SectionTitle>
          <SignatureRow theme={theme} signatures={[
            { title: 'Le Payeur', name: data.recuDe, date: data.dateRecu, image: data.signatures?.payeur },
            { title: 'Le Caissier / Réceptionniste', name: data.nomCaissier, date: data.dateSignature, signatureLabel: 'Signature & Cachet', image: data.signatures?.caissier },
          ]} />

          <DocumentFooter theme={theme} text={data.footerText} />
        </PageShell>
      </Page>
    </Document>
  );
}
