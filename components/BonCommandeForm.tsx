"use client";
import { useFieldArray } from "react-hook-form";
import { BonCommandeData } from "@/types/bon-commande";
import { Plus, Trash2, Building2, ShoppingCart, FileText, PenLine } from "lucide-react";
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

const SH = "flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-[#7c3aed] to-[#6d28d9] text-white";
const I = "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#7c3aed] focus:border-transparent transition-all bg-white";

interface Props {
  onDataChange: (d: BonCommandeData) => void;
  initialData: BonCommandeData;
  signatures?: Record<string, string>;
  onSignatureChange?: (slot: string, dataUrl: string | null) => void;
}

export default function BonCommandeForm({ onDataChange, initialData, signatures = {}, onSignatureChange = () => {} }: Props) {
  const { register, control, watch } = useDocumentForm<BonCommandeData>(initialData, onDataChange);
  const { fields, append, remove } = useFieldArray({ control, name: "items" });

  return (
    <div className="space-y-1">
      <div className="mb-5 px-1">
        <h2 className="text-xl font-bold text-gray-800">Éditeur de Bon de Commande</h2>
        <p className="text-xs text-gray-500 mt-1">Remplissez les champs pour générer le bon de commande PDF</p>
      </div>

      <TemplateSelector register={register} watch={watch} name="template" gradientFrom="#7c3aed" gradientTo="#6d28d9" options={[
        { value: 'classique', label: 'Classique', desc: 'Standard' },
        { value: 'moderne', label: 'Moderne', desc: 'Ambre & Design' },
        { value: 'prestige', label: 'Prestige', desc: 'Bleu Marine Premium' },
      ]} />

      {/* Institution */}
      <div className={SC}>
        <div className={SH}><Building2 size={16} /><span className={ST}>Institution (Acheteur)</span></div>
        <div className={SB}>
          <div className="grid grid-cols-2 gap-3">
            <div><label className={L}>Nom de l'institution</label><input {...register("institutionName")} className={I} placeholder="UNIVERSITE INTERNATIONALE" /></div>
            <div><label className={L}>Sous-titre</label><input {...register("institutionSubtitle")} className={I} placeholder="JEAN PAUL II DE BAFANG" /></div>
            <div><label className={L}>Localisation</label><input {...register("institutionLocation")} className={I} placeholder="Bafang, Cameroun" /></div>
            <div><label className={L}>Département demandeur</label><input {...register("institutionDepartment")} className={I} placeholder="Cellule Informatique" /></div>
            <div><label className={L}>Acronyme Institution</label><input {...register("institutionAcronym")} className={I} placeholder="UIJPII" /></div>
            <div className="col-span-2"><label className={L}>Texte du pied de page</label><input {...register("footerText")} className={I} placeholder="UIJPII — Cellule Informatique | Science et conscience pour un monde meilleur — UIJPII" /></div>
          </div>
          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-gray-100">
            <div><label className={L}>N° Bon de Commande</label><input {...register("numeroBon")} className={I} placeholder="BC-2026-001" /></div>
            <div><label className={L}>Date de commande</label><input type="date" {...register("dateCommande")} className={I} /></div>
          </div>
        </div>
      </div>

      {/* Fournisseur */}
      <div className={SC}>
        <div className={SH}><Building2 size={16} /><span className={ST}>Fournisseur</span></div>
        <div className={SB}>
          <div><label className={L}>Nom / Raison sociale</label><input {...register("fournisseurNom")} className={I} placeholder="Nom du fournisseur" /></div>
          <div><label className={L}>Adresse</label><input {...register("fournisseurAdresse")} className={I} placeholder="Adresse complète" /></div>
          <div><label className={L}>Contact</label><input {...register("fournisseurContact")} className={I} placeholder="Tél / Email" /></div>
        </div>
      </div>

      {/* Articles */}
      <div className={SC}>
        <div className={SH}>
          <ShoppingCart size={16} />
          <span className={ST}>Articles Commandés</span>
          <button
            type="button"
            onClick={() => append({ id: crypto.randomUUID(), designation: "", unite: "", quantite: 1, prixUnitaire: 0 })}
            className="ml-auto flex items-center gap-1 px-3 py-1 bg-white/20 hover:bg-white/30 text-white text-xs rounded-lg transition-colors"
          >
            <Plus size={13} /> Ajouter
          </button>
        </div>
        <div className="p-4 space-y-2">
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200 group">
              <div className="flex items-center justify-center w-6 h-6 bg-[#7c3aed] text-white text-xs rounded-full shrink-0 mt-1">{index + 1}</div>
              <div className="flex-1 grid grid-cols-12 gap-2">
                <div className="col-span-5"><label className="block text-xs text-gray-500 mb-1">Désignation</label>
                  <input {...register(`items.${index}.designation`)} className={I} placeholder="Ex: Rame de papier A4" /></div>
                <div className="col-span-2"><label className="block text-xs text-gray-500 mb-1">Unité</label>
                  <input {...register(`items.${index}.unite`)} className={I} placeholder="pcs" /></div>
                <div className="col-span-2"><label className="block text-xs text-gray-500 mb-1">Qté</label>
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

      {/* Conditions */}
      <div className={SC}>
        <div className={SH}><FileText size={16} /><span className={ST}>Conditions de la Commande</span></div>
        <div className={SB}>
          <div className="grid grid-cols-2 gap-3">
            <div><label className={L}>Délai de livraison</label><input {...register("delaiLivraison")} className={I} placeholder="Ex: 7 jours ouvrables" /></div>
            <div><label className={L}>Lieu de livraison</label><input {...register("lieuLivraison")} className={I} placeholder="Ex: Campus UIJPII, Bafang" /></div>
          </div>
          <div><label className={L}>Mode de paiement</label>
            <select {...register("modePaiement")} className={I}>
              <option value="Virement bancaire">Virement bancaire</option>
              <option value="Mobile Money">Mobile Money</option>
              <option value="Chèque">Chèque</option>
              <option value="Espèces">Espèces</option>
              <option value="À la livraison">À la livraison</option>
            </select>
          </div>
          <div><label className={L}>Conditions particulières</label><textarea {...register("conditions")} rows={2} className={`${I} resize-none`} /></div>
        </div>
      </div>

      {/* Signatures */}
      <div className={SC}>
        <div className={SH}><PenLine size={16} /><span className={ST}>Approbations & Signatures</span></div>
        <div className={SB}>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-[#7c3aed] uppercase border-b pb-1">Demandeur</h4>
              <div><label className={L}>Nom</label><input {...register("demandeurNom")} className={I} /></div>
              <div><label className={L}>Fonction</label><input {...register("demandeurFonction")} className={I} /></div>
              <SignatureField label="Demandeur" value={signatures.demandeur} onChange={(v) => onSignatureChange("demandeur", v)} />
            </div>
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-[#7c3aed] uppercase border-b pb-1">Validateur</h4>
              <div><label className={L}>Nom</label><input {...register("validateurNom")} className={I} /></div>
              <div><label className={L}>Fonction</label><input {...register("validateurFonction")} className={I} /></div>
              <SignatureField label="Validateur" value={signatures.validateur} onChange={(v) => onSignatureChange("validateur", v)} />
            </div>
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-[#7c3aed] uppercase border-b pb-1">Directeur</h4>
              <div><label className={L}>Nom</label><input {...register("directeurNom")} className={I} /></div>
              <div><label className={L}>Fonction</label><input {...register("directeurFonction")} className={I} placeholder="Directeur Général" /></div>
              <SignatureField label="Directeur" value={signatures.directeur} onChange={(v) => onSignatureChange("directeur", v)} />
            </div>
          </div>
          <div><label className={L}>Date de signature</label><input type="date" {...register("dateSignature")} className={`${I} w-48`} /></div>
        </div>
      </div>
    </div>
  );
}
