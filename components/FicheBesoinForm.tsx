"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { FicheBesoinData } from "@/types/fiche-besoin";
import { Plus, Trash2, Building2, User, ClipboardList, PenLine } from "lucide-react";
import { useEffect } from "react";

interface FicheBesoinFormProps {
  onDataChange: (data: FicheBesoinData) => void;
  initialData: FicheBesoinData;
}

const sectionClass = "bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-5";
const sectionHeaderClass = "flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-[#1a2e5a] to-[#243d78] text-white";
const sectionTitleClass = "font-semibold text-sm tracking-wide";
const sectionBodyClass = "p-5 space-y-4";
const labelClass = "block text-xs font-medium text-gray-600 mb-1";
const inputClass = "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1a2e5a] focus:border-transparent transition-all bg-white";

export default function FicheBesoinForm({ onDataChange, initialData }: FicheBesoinFormProps) {
  const { register, control, watch } = useForm<FicheBesoinData>({
    defaultValues: initialData,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  useEffect(() => {
    const subscription = watch((value) => {
      onDataChange(value as FicheBesoinData);
    });
    return () => subscription.unsubscribe();
  }, [watch, onDataChange]);

  return (
    <div className="space-y-1">
      <div className="mb-5 px-1">
        <h2 className="text-xl font-bold text-gray-800">Éditeur de Fiche de Besoin</h2>
        <p className="text-xs text-gray-500 mt-1">Remplissez les champs ci-dessous pour générer la fiche PDF</p>
      </div>

      {/* ── Template Selector ── */}
      <div className={sectionClass}>
        <div className={sectionHeaderClass}>
          <span className={sectionTitleClass}>🎨 Modèle de document</span>
        </div>
        <div className={sectionBodyClass}>
          <div className="grid grid-cols-3 gap-3">
            {[
              { value: 'classique', label: 'Classique', desc: 'Standard UIJPII' },
              { value: 'moderne',   label: 'Moderne',   desc: 'Épuré & Sarcelle' },
              { value: 'prestige',  label: 'Prestige',  desc: 'Violet Premium' },
            ].map(({ value, label, desc }) => {
              const isActive = (watch('template') || 'classique') === value;
              return (
                <label key={value} className={`flex flex-col items-center gap-1 p-3 rounded-xl border-2 cursor-pointer transition-all ${isActive ? 'border-[#1a2e5a] bg-[#1a2e5a]/5' : 'border-gray-200 hover:border-gray-300'}`}>
                  <input type="radio" value={value} {...register('template')} className="sr-only" />
                  <span className={`text-sm font-semibold ${isActive ? 'text-[#1a2e5a]' : 'text-gray-700'}`}>{label}</span>
                  <span className="text-xs text-gray-400">{desc}</span>
                </label>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Institution Info ── */}
      <div className={sectionClass}>
        <div className={sectionHeaderClass}><Building2 size={16} /><span className={sectionTitleClass}>Institution</span></div>
        <div className={sectionBodyClass}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className={labelClass}>Nom institution</label><input {...register('institutionName')} className={inputClass} /></div>
            <div><label className={labelClass}>Sous-titre</label><input {...register('institutionSubtitle')} className={inputClass} /></div>
            <div><label className={labelClass}>Localisation</label><input {...register('institutionLocation')} className={inputClass} /></div>
            <div><label className={labelClass}>Département / Service</label><input {...register('institutionDepartment')} className={inputClass} /></div>
          </div>
        </div>
      </div>

      {/* ── En-tête de la Fiche ── */}
      <div className={sectionClass}>
        <div className={sectionHeaderClass}><ClipboardList size={16} /><span className={sectionTitleClass}>Informations générales</span></div>
        <div className={sectionBodyClass}>
          <div className="grid grid-cols-2 gap-4">
            <div><label className={labelClass}>N° Fiche</label><input {...register('numeroFiche')} className={inputClass} placeholder="FB-2024-..." /></div>
            <div><label className={labelClass}>Date de la demande</label><input type="date" {...register('dateDemande')} className={inputClass} /></div>
          </div>
        </div>
      </div>

      {/* ── Demandeur ── */}
      <div className={sectionClass}>
        <div className={sectionHeaderClass}><User size={16} /><span className={sectionTitleClass}>Demandeur</span></div>
        <div className={sectionBodyClass}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div><label className={labelClass}>Nom & Prénom</label><input {...register('demandeurNom')} className={inputClass} /></div>
            <div><label className={labelClass}>Fonction</label><input {...register('demandeurFonction')} className={inputClass} /></div>
            <div><label className={labelClass}>Service / Département</label><input {...register('departementDemandeur')} className={inputClass} /></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div><label className={labelClass}>Motif du besoin / Projet</label><input {...register('motifBesoin')} className={inputClass} placeholder="Renouvellement matériel, événement..." /></div>
            <div><label className={labelClass}>Date souhaitée</label><input type="date" {...register('dateSouhaitee')} className={inputClass} /></div>
          </div>
        </div>
      </div>

      {/* ── Articles ── */}
      <div className={sectionClass}>
        <div className={sectionHeaderClass}><ClipboardList size={16} /><span className={sectionTitleClass}>Désignation des Besoins</span></div>
        <div className={sectionBodyClass}>
          <div className="space-y-3">
            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-2 items-start p-3 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex-grow grid grid-cols-12 gap-2">
                  <div className="col-span-4"><label className="block text-[10px] text-gray-500 mb-1">Désignation</label><input {...register(`items.${index}.designation` as const)} className={inputClass} placeholder="Article..." /></div>
                  <div className="col-span-2"><label className="block text-[10px] text-gray-500 mb-1">Unité</label><input {...register(`items.${index}.unite` as const)} className={inputClass} placeholder="U, kg, ml..." /></div>
                  <div className="col-span-2"><label className="block text-[10px] text-gray-500 mb-1">Quantité</label><input type="number" step="0.01" {...register(`items.${index}.quantite` as const, { valueAsNumber: true })} className={inputClass} /></div>
                  <div className="col-span-4"><label className="block text-[10px] text-gray-500 mb-1">Est. Unit. (FCFA)</label><input type="number" {...register(`items.${index}.estimationPrix` as const, { valueAsNumber: true })} className={inputClass} placeholder="0" /></div>
                </div>
                <button type="button" onClick={() => remove(index)} className="mt-5 p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors"><Trash2 size={16} /></button>
              </div>
            ))}
          </div>
          <button type="button" onClick={() => append({ id: crypto.randomUUID(), designation: "", unite: "", quantite: 1, estimationPrix: 0 })} className="mt-4 w-full py-2.5 border-2 border-dashed border-gray-300 text-gray-600 rounded-lg text-sm font-medium hover:border-[#1a2e5a] hover:text-[#1a2e5a] transition-colors flex items-center justify-center gap-2">
            <Plus size={16} /> Ajouter un besoin
          </button>
        </div>
      </div>

      {/* ── Signatures ── */}
      <div className={sectionClass}>
        <div className={sectionHeaderClass}><PenLine size={16} /><span className={sectionTitleClass}>Signatures</span></div>
        <div className={sectionBodyClass}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
              <h4 className="text-xs font-bold text-gray-700 border-b pb-2">Demandeur</h4>
              <div><label className={labelClass}>Nom</label><input {...register('demandeurNom')} disabled className={`${inputClass} bg-gray-100 cursor-not-allowed`} /></div>
              <div><label className={labelClass}>Date de signature</label><input type="date" {...register('dateSignatureDemandeur')} className={inputClass} /></div>
            </div>
            <div className="space-y-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
              <h4 className="text-xs font-bold text-gray-700 border-b pb-2">Responsable Hiérarchique</h4>
              <div><label className={labelClass}>Nom</label><input {...register('responsableNom')} className={inputClass} /></div>
              <div><label className={labelClass}>Fonction</label><input {...register('responsableFonction')} className={inputClass} defaultValue="Resp. Hiérarchique" /></div>
              <div><label className={labelClass}>Date de signature</label><input type="date" {...register('dateSignatureResponsable')} className={inputClass} /></div>
            </div>
            <div className="space-y-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
              <h4 className="text-xs font-bold text-gray-700 border-b pb-2">Direction / Finances</h4>
              <div><label className={labelClass}>Nom</label><input {...register('directionNom')} className={inputClass} /></div>
              <div><label className={labelClass}>Fonction</label><input {...register('directionFonction')} className={inputClass} defaultValue="Direction" /></div>
              <div><label className={labelClass}>Date de signature</label><input type="date" {...register('dateSignatureDirection')} className={inputClass} /></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
