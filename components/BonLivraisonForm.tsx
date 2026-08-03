"use client";
import { useFieldArray } from "react-hook-form";
import { BonLivraisonData } from "@/types/bon-livraison";
import { Plus, Trash2, Building2, Truck, PenLine } from "lucide-react";
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

const SH = "flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-[#ea580c] to-[#c2410c] text-white";
const I = "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ea580c] focus:border-transparent transition-all bg-white";

interface Props {
  onDataChange: (d: BonLivraisonData) => void;
  initialData: BonLivraisonData;
  signatures?: Record<string, string>;
  onSignatureChange?: (slot: string, dataUrl: string | null) => void;
}

export default function BonLivraisonForm({ onDataChange, initialData, signatures = {}, onSignatureChange = () => {} }: Props) {
  const { register, control, watch } = useDocumentForm<BonLivraisonData>(initialData, onDataChange);
  const { fields, append, remove } = useFieldArray({ control, name: "items" });

  return (
    <div className="space-y-1">
      <div className="mb-5 px-1">
        <h2 className="text-xl font-bold text-gray-800">Éditeur de Bon de Livraison</h2>
        <p className="text-xs text-gray-500 mt-1">Remplissez les champs pour générer le bon de livraison PDF</p>
      </div>

      <TemplateSelector register={register} watch={watch} name="template" gradientFrom="#ea580c" gradientTo="#c2410c" options={[
        { value: 'classique', label: 'Classique', desc: 'Standard' },
        { value: 'moderne', label: 'Moderne', desc: 'Orange & Épuré' },
        { value: 'prestige', label: 'Prestige', desc: 'Terre Cuite Premium' },
      ]} />

      {/* Institution / Destinataire */}
      <div className={SC}>
        <div className={SH}><Building2 size={16} /><span className={ST}>Institution (Destinataire)</span></div>
        <div className={SB}>
          <div className="grid grid-cols-2 gap-3">
            <div><label className={L}>Nom de l'institution</label><input {...register("institutionName")} className={I} placeholder="UNIVERSITE INTERNATIONALE" /></div>
            <div><label className={L}>Sous-titre</label><input {...register("institutionSubtitle")} className={I} placeholder="JEAN PAUL II DE BAFANG" /></div>
            <div><label className={L}>Localisation</label><input {...register("institutionLocation")} className={I} placeholder="Bafang, Cameroun" /></div>
            <div><label className={L}>Service destinataire</label><input {...register("institutionDepartment")} className={I} placeholder="Cellule Informatique" /></div>
            <div><label className={L}>Acronyme Institution</label><input {...register("institutionAcronym")} className={I} placeholder="UIJPII" /></div>
            <div className="col-span-2"><label className={L}>Texte du pied de page</label><input {...register("footerText")} className={I} /></div>
          </div>
          <div className="grid grid-cols-3 gap-3 pt-2 border-t border-gray-100">
            <div><label className={L}>N° Bon de Livraison</label><input {...register("numeroBL")} className={I} placeholder="BL-2026-001" /></div>
            <div><label className={L}>Date de livraison</label><input type="date" {...register("dateLivraison")} className={I} /></div>
            <div><label className={L}>Réf. Bon de Commande</label><input {...register("numeroBonCommande")} className={I} placeholder="BC-2026-001" /></div>
          </div>
        </div>
      </div>

      {/* Fournisseur */}
      <div className={SC}>
        <div className={SH}><Building2 size={16} /><span className={ST}>Fournisseur</span></div>
        <div className={SB}>
          <div><label className={L}>Nom / Raison sociale</label><input {...register("fournisseurNom")} className={I} placeholder="Nom du fournisseur" /></div>
          <div><label className={L}>Adresse</label><input {...register("fournisseurAdresse")} className={I} placeholder="Adresse complète" /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className={L}>Contact</label><input {...register("fournisseurContact")} className={I} placeholder="Tél / Email" /></div>
            <div><label className={L}>Transporteur</label><input {...register("transporteur")} className={I} placeholder="Nom du transporteur" /></div>
          </div>
        </div>
      </div>

      {/* Articles */}
      <div className={SC}>
        <div className={SH}>
          <Truck size={16} />
          <span className={ST}>Articles Livrés</span>
          <button
            type="button"
            onClick={() => append({ id: crypto.randomUUID(), designation: "", unite: "", quantiteCommandee: 1, quantiteLivree: 1 })}
            className="ml-auto flex items-center gap-1 px-3 py-1 bg-white/20 hover:bg-white/30 text-white text-xs rounded-lg transition-colors"
          >
            <Plus size={13} /> Ajouter
          </button>
        </div>
        <div className="p-4 space-y-2">
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200 group">
              <div className="flex items-center justify-center w-6 h-6 bg-[#ea580c] text-white text-xs rounded-full shrink-0 mt-1">{index + 1}</div>
              <div className="flex-1 grid grid-cols-12 gap-2">
                <div className="col-span-5"><label className="block text-xs text-gray-500 mb-1">Désignation</label>
                  <input {...register(`items.${index}.designation`)} className={I} placeholder="Ex: Rame de papier A4" /></div>
                <div className="col-span-2"><label className="block text-xs text-gray-500 mb-1">Unité</label>
                  <input {...register(`items.${index}.unite`)} className={I} placeholder="pcs" /></div>
                <div className="col-span-2"><label className="block text-xs text-gray-500 mb-1">Qté commandée</label>
                  <input type="number" {...register(`items.${index}.quantiteCommandee`, { valueAsNumber: true })} className={I} placeholder="1" /></div>
                <div className="col-span-3"><label className="block text-xs text-gray-500 mb-1">Qté livrée</label>
                  <input type="number" {...register(`items.${index}.quantiteLivree`, { valueAsNumber: true })} className={I} placeholder="1" /></div>
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

      {/* Observations & Signatures */}
      <div className={SC}>
        <div className={SH}><PenLine size={16} /><span className={ST}>Observations & Signatures</span></div>
        <div className={SB}>
          <div><label className={L}>Observations</label><textarea {...register("observations")} rows={2} className={`${I} resize-none`} /></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-[#ea580c] uppercase border-b pb-1">Le Livreur</h4>
              <div><label className={L}>Nom</label><input {...register("livreurNom")} className={I} /></div>
              <div><label className={L}>Date de signature</label><input type="date" {...register("dateSignatureLivreur")} className={I} /></div>
              <SignatureField label="Le Livreur" value={signatures.livreur} onChange={(v) => onSignatureChange("livreur", v)} />
            </div>
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-[#ea580c] uppercase border-b pb-1">Le Réceptionniste</h4>
              <div><label className={L}>Nom</label><input {...register("receptionnaireNom")} className={I} /></div>
              <div><label className={L}>Fonction</label><input {...register("receptionnaireFonction")} className={I} /></div>
              <div><label className={L}>Date de signature</label><input type="date" {...register("dateSignatureReceptionnaire")} className={I} /></div>
              <SignatureField label="Le Réceptionniste" value={signatures.receptionnaire} onChange={(v) => onSignatureChange("receptionnaire", v)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
