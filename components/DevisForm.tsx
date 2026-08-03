"use client";
import { useFieldArray } from "react-hook-form";
import { DevisData } from "@/types/devis";
import { Plus, Trash2, Building2, FileText, PenLine } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { SECTION_CARD as SC, SECTION_TITLE as ST, SECTION_BODY as SB, FIELD_LABEL as L } from "@/components/forms/shared/styles";
import { useDocumentForm } from "@/components/forms/shared/useDocumentForm";
import { TemplateSelector } from "@/components/forms/shared/TemplateSelector";
import SignatureField from "@/components/SignatureField";

const SH = "flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] text-white";
const I = "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent transition-all bg-white";

interface Props {
  onDataChange: (d: DevisData) => void;
  initialData: DevisData;
  signatures?: Record<string, string>;
  onSignatureChange?: (slot: string, dataUrl: string | null) => void;
}

export default function DevisForm({ onDataChange, initialData, signatures = {}, onSignatureChange = () => {} }: Props) {
  const { register, control, watch } = useDocumentForm<DevisData>(initialData, onDataChange);
  const { fields, append, remove } = useFieldArray({ control, name: "items" });

  return (
    <div className="space-y-1">
      <div className="mb-5 px-1">
        <h2 className="text-xl font-bold text-gray-800">Éditeur de Devis</h2>
        <p className="text-xs text-gray-500 mt-1">Remplissez les champs pour générer le devis PDF</p>
      </div>

      <TemplateSelector register={register} watch={watch} name="template" gradientFrom="#2563eb" gradientTo="#1d4ed8" options={[
        { value: 'classique', label: 'Classique', desc: 'Standard' },
        { value: 'moderne', label: 'Moderne', desc: 'Bleu & Épuré' },
        { value: 'prestige', label: 'Prestige', desc: 'Bleu Nuit Premium' },
      ]} />

      {/* Institution / Émetteur */}
      <div className={SC}>
        <div className={SH}><Building2 size={16} /><span className={ST}>Institution (Émetteur)</span></div>
        <div className={SB}>
          <div className="grid grid-cols-2 gap-3">
            <div><label className={L}>Nom de l'institution</label><input {...register("institutionName")} className={I} placeholder="UNIVERSITE INTERNATIONALE" /></div>
            <div><label className={L}>Sous-titre</label><input {...register("institutionSubtitle")} className={I} placeholder="JEAN PAUL II DE BAFANG" /></div>
            <div><label className={L}>Localisation</label><input {...register("institutionLocation")} className={I} placeholder="Bafang, Cameroun" /></div>
            <div><label className={L}>Département</label><input {...register("institutionDepartment")} className={I} placeholder="Cellule Informatique" /></div>
            <div><label className={L}>Acronyme Institution</label><input {...register("institutionAcronym")} className={I} placeholder="UIJPII" /></div>
            <div className="col-span-2"><label className={L}>Texte du pied de page</label><input {...register("footerText")} className={I} /></div>
          </div>
          <div className="grid grid-cols-3 gap-3 pt-2 border-t border-gray-100">
            <div><label className={L}>N° Devis</label><input {...register("numeroDevis")} className={I} placeholder="DV-2026-001" /></div>
            <div><label className={L}>Date du devis</label><input type="date" {...register("dateDevis")} className={I} /></div>
            <div><label className={L}>Valable jusqu'au</label><input type="date" {...register("dateValidite")} className={I} /></div>
          </div>
        </div>
      </div>

      {/* Client */}
      <div className={SC}>
        <div className={SH}><Building2 size={16} /><span className={ST}>Client</span></div>
        <div className={SB}>
          <div><label className={L}>Nom / Raison sociale</label><input {...register("clientNom")} className={I} placeholder="Nom du client" /></div>
          <div><label className={L}>Adresse</label><input {...register("clientAdresse")} className={I} placeholder="Adresse complète" /></div>
          <div><label className={L}>Contact</label><input {...register("clientContact")} className={I} placeholder="Tél / Email" /></div>
          <div><label className={L}>Objet du devis</label><input {...register("objet")} className={I} placeholder="Ex: Prestation de développement web" /></div>
          <SignatureField label="Client (bon pour accord)" value={signatures.client} onChange={(v) => onSignatureChange("client", v)} />
        </div>
      </div>

      {/* Articles */}
      <div className={SC}>
        <div className={SH}>
          <FileText size={16} />
          <span className={ST}>Détail de la Prestation</span>
          <button
            type="button"
            onClick={() => append({ id: crypto.randomUUID(), designation: "", quantite: 1, prixUnitaire: 0 })}
            className="ml-auto flex items-center gap-1 px-3 py-1 bg-white/20 hover:bg-white/30 text-white text-xs rounded-lg transition-colors"
          >
            <Plus size={13} /> Ajouter
          </button>
        </div>
        <div className="p-4 space-y-2">
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200 group">
              <div className="flex items-center justify-center w-6 h-6 bg-[#2563eb] text-white text-xs rounded-full shrink-0 mt-1">{index + 1}</div>
              <div className="flex-1 grid grid-cols-12 gap-2">
                <div className="col-span-6"><label className="block text-xs text-gray-500 mb-1">Désignation</label>
                  <input {...register(`items.${index}.designation`)} className={I} placeholder="Ex: Développement d'application web" /></div>
                <div className="col-span-3"><label className="block text-xs text-gray-500 mb-1">Qté</label>
                  <input type="number" {...register(`items.${index}.quantite`, { valueAsNumber: true })} className={I} placeholder="1" /></div>
                <div className="col-span-3"><label className="block text-xs text-gray-500 mb-1">Prix unitaire (FCFA)</label>
                  <input type="number" {...register(`items.${index}.prixUnitaire`, { valueAsNumber: true })} className={I} placeholder="0" /></div>
              </div>
              <AlertDialog>
                <AlertDialogTrigger className="text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity mt-6 shrink-0">
                  <Trash2 size={15} />
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
                    <AlertDialogDescription>Voulez-vous vraiment supprimer cet article ?</AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Annuler</AlertDialogCancel>
                    <AlertDialogAction onClick={() => remove(index)}>Supprimer</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          ))}
          {fields.length === 0 && (
            <div className="text-center py-6 text-gray-400 border-2 border-dashed rounded-lg text-sm">
              Aucun article. Cliquez sur <strong>Ajouter</strong>.
            </div>
          )}
        </div>
      </div>

      {/* Conditions & Signatures */}
      <div className={SC}>
        <div className={SH}><PenLine size={16} /><span className={ST}>Conditions & Signatures</span></div>
        <div className={SB}>
          <div><label className={L}>Conditions particulières</label><textarea {...register("conditions")} rows={2} className={`${I} resize-none`} /></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-[#2563eb] uppercase border-b pb-1">Établi par</h4>
              <div><label className={L}>Nom</label><input {...register("demandeurNom")} className={I} /></div>
              <div><label className={L}>Fonction</label><input {...register("demandeurFonction")} className={I} /></div>
              <SignatureField label="Émetteur" value={signatures.emetteur} onChange={(v) => onSignatureChange("emetteur", v)} />
            </div>
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-[#2563eb] uppercase border-b pb-1">Directeur</h4>
              <div><label className={L}>Nom</label><input {...register("directeurNom")} className={I} /></div>
              <div><label className={L}>Fonction</label><input {...register("directeurFonction")} className={I} placeholder="Directeur Général" /></div>
            </div>
          </div>
          <div><label className={L}>Date de signature</label><input type="date" {...register("dateSignature")} className={`${I} w-48`} /></div>
        </div>
      </div>
    </div>
  );
}
