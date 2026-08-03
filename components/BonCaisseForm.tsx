"use client";
import { Banknote, User, PenLine } from "lucide-react";
import { BonCaisseData } from "@/types/bon-caisse";
import { SECTION_CARD as SC, SECTION_TITLE as ST, SECTION_BODY as SB, FIELD_LABEL as L } from "@/components/forms/shared/styles";
import { useDocumentForm } from "@/components/forms/shared/useDocumentForm";
import { TemplateSelector } from "@/components/forms/shared/TemplateSelector";
import SignatureField from "@/components/SignatureField";

const SH = "flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-[#059669] to-[#047857] text-white";
const I = "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#059669] focus:border-transparent transition-all bg-white";
const CB = "w-4 h-4 rounded border-gray-300 text-[#059669] focus:ring-[#059669] cursor-pointer";

interface Props {
  onDataChange: (d: BonCaisseData) => void;
  initialData: BonCaisseData;
  signatures?: Record<string, string>;
  onSignatureChange?: (slot: string, dataUrl: string | null) => void;
}

export default function BonCaisseForm({ onDataChange, initialData, signatures = {}, onSignatureChange = () => {} }: Props) {
  const { register, watch } = useDocumentForm<BonCaisseData>(initialData, onDataChange);

  return (
    <div className="space-y-1">
      <div className="mb-5 px-1">
        <h2 className="text-xl font-bold text-gray-800">Éditeur de Bon de Caisse</h2>
        <p className="text-xs text-gray-500 mt-1">Remplissez les champs pour générer le bon de caisse PDF</p>
      </div>

      <TemplateSelector register={register} watch={watch} name="template" gradientFrom="#059669" gradientTo="#047857" options={[
        { value: 'classique', label: 'Classique', desc: 'Standard' },
        { value: 'moderne', label: 'Moderne', desc: 'Émeraude & Épuré' },
        { value: 'prestige', label: 'Prestige', desc: 'Vert Forêt Premium' },
      ]} />

      {/* Institution */}
      <div className={SC}>
        <div className={SH}><User size={16} /><span className={ST}>Institution</span></div>
        <div className={SB}>
          <div className="grid grid-cols-2 gap-3">
            <div><label className={L}>Nom de l'institution</label><input {...register("institutionName")} className={I} placeholder="UNIVERSITE INTERNATIONALE" /></div>
            <div><label className={L}>Sous-titre</label><input {...register("institutionSubtitle")} className={I} placeholder="JEAN PAUL II DE BAFANG" /></div>
            <div><label className={L}>Localisation</label><input {...register("institutionLocation")} className={I} placeholder="Bafang, Cameroun" /></div>
            <div><label className={L}>Département</label><input {...register("institutionDepartment")} className={I} placeholder="Cellule Informatique" /></div>
            <div><label className={L}>Acronyme Institution</label><input {...register("institutionAcronym")} className={I} placeholder="UIJPII" /></div>
            <div className="col-span-2"><label className={L}>Texte du pied de page</label><input {...register("footerText")} className={I} /></div>
          </div>
          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-gray-100">
            <div><label className={L}>N° Bon de Caisse</label><input {...register("numeroBonCaisse")} className={I} placeholder="BX-2026-001" /></div>
            <div><label className={L}>Date de l'opération</label><input type="date" {...register("dateOperation")} className={I} /></div>
          </div>
        </div>
      </div>

      {/* Opération */}
      <div className={SC}>
        <div className={SH}><Banknote size={16} /><span className={ST}>💰 Opération de Caisse</span></div>
        <div className={SB}>
          <div>
            <label className={L}>Type de mouvement</label>
            <div className="flex gap-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" value="entree" {...register("typeMouvement")} className={CB} />
                <span className="text-sm font-medium text-green-700">Entrée (encaissement)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" value="sortie" {...register("typeMouvement")} className={CB} />
                <span className="text-sm font-medium text-red-700">Sortie (décaissement)</span>
              </label>
            </div>
          </div>
          <div>
            <label className={L}>Montant (FCFA)</label>
            <input type="number" {...register("montant", { valueAsNumber: true })} className={`${I} text-2xl font-bold text-emerald-700 py-3`} placeholder="0" />
          </div>
          <div><label className={L}>Bénéficiaire</label><input {...register("beneficiaire")} className={I} placeholder="Nom du bénéficiaire" /></div>
          <div><label className={L}>Motif</label><input {...register("motif")} className={I} placeholder="Ex: Achat de fournitures de bureau" /></div>
        </div>
      </div>

      {/* Mode de paiement */}
      <div className={SC}>
        <div className={SH}><Banknote size={16} /><span className={ST}>Mode de Paiement</span></div>
        <div className={SB}>
          <div className="flex flex-wrap gap-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
            {[
              { f: "modePaiement.especes" as const, l: "Espèces" },
              { f: "modePaiement.mobileMoney" as const, l: "Mobile Money" },
              { f: "modePaiement.virement" as const, l: "Virement bancaire" },
              { f: "modePaiement.cheque" as const, l: "Chèque" },
              { f: "modePaiement.autre" as const, l: "Autre" },
            ].map(({ f, l }) => (
              <label key={f} className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" {...register(f)} className={CB} />
                <span className="text-sm text-gray-700">{l}</span>
              </label>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className={L}>Solde avant opération (FCFA)</label><input type="number" {...register("soldeAvant", { valueAsNumber: true })} className={I} placeholder="0" /></div>
            <div><label className={L}>Solde après opération (FCFA)</label><input type="number" {...register("soldeApres", { valueAsNumber: true })} className={I} placeholder="0" /></div>
          </div>
        </div>
      </div>

      {/* Signatures */}
      <div className={SC}>
        <div className={SH}><PenLine size={16} /><span className={ST}>Caissier & Autorisation</span></div>
        <div className={SB}>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-[#059669] uppercase border-b pb-1">Le Caissier</h4>
              <div><label className={L}>Nom</label><input {...register("caissierNom")} className={I} /></div>
              <div><label className={L}>Date de signature</label><input type="date" {...register("dateSignatureCaissier")} className={I} /></div>
              <SignatureField label="Le Caissier" value={signatures.caissier} onChange={(v) => onSignatureChange("caissier", v)} />
            </div>
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-[#059669] uppercase border-b pb-1">L'Autorisateur</h4>
              <div><label className={L}>Nom</label><input {...register("autorisateurNom")} className={I} /></div>
              <div><label className={L}>Fonction</label><input {...register("autorisateurFonction")} className={I} /></div>
              <div><label className={L}>Date de signature</label><input type="date" {...register("dateSignatureAutorisateur")} className={I} /></div>
              <SignatureField label="L'Autorisateur" value={signatures.autorisateur} onChange={(v) => onSignatureChange("autorisateur", v)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
