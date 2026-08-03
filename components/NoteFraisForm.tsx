"use client";
import { useFieldArray } from "react-hook-form";
import { NoteFraisData } from "@/types/note-frais";
import { Plus, Trash2, User, Wallet, PenLine } from "lucide-react";
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

const SH = "flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-[#be123c] to-[#9f1239] text-white";
const I = "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#be123c] focus:border-transparent transition-all bg-white";

interface Props {
  onDataChange: (d: NoteFraisData) => void;
  initialData: NoteFraisData;
  signatures?: Record<string, string>;
  onSignatureChange?: (slot: string, dataUrl: string | null) => void;
}

export default function NoteFraisForm({ onDataChange, initialData, signatures = {}, onSignatureChange = () => {} }: Props) {
  const { register, control, watch } = useDocumentForm<NoteFraisData>(initialData, onDataChange);
  const { fields, append, remove } = useFieldArray({ control, name: "depenses" });

  return (
    <div className="space-y-1">
      <div className="mb-5 px-1">
        <h2 className="text-xl font-bold text-gray-800">Éditeur de Note de Frais</h2>
        <p className="text-xs text-gray-500 mt-1">Remplissez les champs pour générer la note de frais PDF</p>
      </div>

      <TemplateSelector register={register} watch={watch} name="template" gradientFrom="#be123c" gradientTo="#9f1239" options={[
        { value: 'classique', label: 'Classique', desc: 'Standard' },
        { value: 'moderne', label: 'Moderne', desc: 'Rose & Épuré' },
        { value: 'prestige', label: 'Prestige', desc: 'Bordeaux Premium' },
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
          <div className="grid grid-cols-3 gap-3 pt-2 border-t border-gray-100">
            <div><label className={L}>N° Note</label><input {...register("numeroNote")} className={I} placeholder="NF-2026-001" /></div>
            <div><label className={L}>Date</label><input type="date" {...register("dateNote")} className={I} /></div>
            <div><label className={L}>Réf. Ordre de Mission</label><input {...register("numeroOrdreMission")} className={I} placeholder="OM-2026-001 (optionnel)" /></div>
          </div>
        </div>
      </div>

      {/* Employé */}
      <div className={SC}>
        <div className={SH}><User size={16} /><span className={ST}>Employé</span></div>
        <div className={SB}>
          <div className="grid grid-cols-3 gap-3">
            <div><label className={L}>Nom & Prénom</label><input {...register("employeNom")} className={I} /></div>
            <div><label className={L}>Fonction</label><input {...register("employeFonction")} className={I} /></div>
            <div><label className={L}>Département / Service</label><input {...register("employeDepartement")} className={I} /></div>
          </div>
        </div>
      </div>

      {/* Dépenses */}
      <div className={SC}>
        <div className={SH}>
          <Wallet size={16} />
          <span className={ST}>Détail des Dépenses</span>
          <button
            type="button"
            onClick={() => append({ id: crypto.randomUUID(), date: "", motif: "", categorie: "", montant: 0 })}
            className="ml-auto flex items-center gap-1 px-3 py-1 bg-white/20 hover:bg-white/30 text-white text-xs rounded-lg transition-colors"
          >
            <Plus size={13} /> Ajouter
          </button>
        </div>
        <div className="p-4 space-y-2">
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200 group">
              <div className="flex items-center justify-center w-6 h-6 bg-[#be123c] text-white text-xs rounded-full shrink-0 mt-1">{index + 1}</div>
              <div className="flex-1 grid grid-cols-12 gap-2">
                <div className="col-span-3"><label className="block text-xs text-gray-500 mb-1">Date</label>
                  <input type="date" {...register(`depenses.${index}.date`)} className={I} /></div>
                <div className="col-span-4"><label className="block text-xs text-gray-500 mb-1">Motif</label>
                  <input {...register(`depenses.${index}.motif`)} className={I} placeholder="Ex: Taxi aéroport" /></div>
                <div className="col-span-2"><label className="block text-xs text-gray-500 mb-1">Catégorie</label>
                  <input {...register(`depenses.${index}.categorie`)} className={I} placeholder="Transport" /></div>
                <div className="col-span-3"><label className="block text-xs text-gray-500 mb-1">Montant (FCFA)</label>
                  <input type="number" {...register(`depenses.${index}.montant`, { valueAsNumber: true })} className={I} placeholder="0" /></div>
              </div>
              <AlertDialog>
                <AlertDialogTrigger className="text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity mt-6 shrink-0">
                  <Trash2 size={15} />
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
                    <AlertDialogDescription>Voulez-vous vraiment supprimer cette dépense ?</AlertDialogDescription>
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
              Aucune dépense. Cliquez sur <strong>Ajouter</strong>.
            </div>
          )}
          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-gray-100">
            <div><label className={L}>Avance déjà reçue (FCFA)</label><input type="number" {...register("avanceRecue", { valueAsNumber: true })} className={I} placeholder="0" /></div>
            <div><label className={L}>Devise</label>
              <select {...register("devise")} className={I}>
                <option value="FCFA">FCFA</option>
                <option value="EUR">EUR</option>
                <option value="USD">USD</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Observations & Signatures */}
      <div className={SC}>
        <div className={SH}><PenLine size={16} /><span className={ST}>Observations & Signatures</span></div>
        <div className={SB}>
          <div><label className={L}>Observations</label><textarea {...register("observations")} rows={2} className={`${I} resize-none`} /></div>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-[#be123c] uppercase border-b pb-1">Employé</h4>
              <div><label className={L}>Date de signature</label><input type="date" {...register("dateSignatureEmploye")} className={I} /></div>
              <SignatureField label="Employé" value={signatures.employe} onChange={(v) => onSignatureChange("employe", v)} />
            </div>
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-[#be123c] uppercase border-b pb-1">Valideur</h4>
              <div><label className={L}>Nom</label><input {...register("valideurNom")} className={I} /></div>
              <div><label className={L}>Fonction</label><input {...register("valideurFonction")} className={I} /></div>
              <div><label className={L}>Date de signature</label><input type="date" {...register("dateSignatureValideur")} className={I} /></div>
              <SignatureField label="Valideur" value={signatures.valideur} onChange={(v) => onSignatureChange("valideur", v)} />
            </div>
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-[#be123c] uppercase border-b pb-1">Directeur</h4>
              <div><label className={L}>Nom</label><input {...register("directeurNom")} className={I} /></div>
              <div><label className={L}>Fonction</label><input {...register("directeurFonction")} className={I} placeholder="Directeur Général" /></div>
              <div><label className={L}>Date de signature</label><input type="date" {...register("dateSignatureDirecteur")} className={I} /></div>
              <SignatureField label="Directeur" value={signatures.directeur} onChange={(v) => onSignatureChange("directeur", v)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
