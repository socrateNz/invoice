"use client";
import { useForm } from "react-hook-form";
import { RecuPaiementData } from "@/types/recu-paiement";
import { useEffect } from "react";
import { Banknote, User, PenLine } from "lucide-react";

const SC = "bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-5";
const SH = "flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-[#166534] to-[#15803d] text-white";
const ST = "font-semibold text-sm tracking-wide";
const SB = "p-5 space-y-4";
const L = "block text-xs font-medium text-gray-600 mb-1";
const I = "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#166534] focus:border-transparent transition-all bg-white";
const CB = "w-4 h-4 rounded border-gray-300 text-[#166534] focus:ring-[#166534] cursor-pointer";

interface Props { onDataChange: (d: RecuPaiementData) => void; initialData: RecuPaiementData; }

export default function RecuPaiementForm({ onDataChange, initialData }: Props) {
  const { register, watch } = useForm<RecuPaiementData>({ defaultValues: initialData });
  useEffect(() => {
    const sub = watch((v) => onDataChange(v as RecuPaiementData));
    return () => sub.unsubscribe();
  }, [watch, onDataChange]);

  return (
    <div className="space-y-1">
      <div className="mb-5 px-1">
        <h2 className="text-xl font-bold text-gray-800">Éditeur de Reçu de Paiement</h2>
        <p className="text-xs text-gray-500 mt-1">Remplissez les champs pour générer le reçu PDF</p>
      </div>

      {/* ── Template Selector ── */}
      <div className={SC}>
        <div className={SH}>
          <span className={ST}>🎨 Modèle de document</span>
        </div>
        <div className={SB}>
          <div className="grid grid-cols-3 gap-3">
            {[
              { value: 'classique', label: 'Classique', desc: 'Standard UIJPII' },
              { value: 'moderne',   label: 'Moderne',   desc: 'Bleu Corporate' },
              { value: 'prestige',  label: 'Prestige',  desc: 'Noir Carbone & Or' },
            ].map(({ value, label, desc }) => {
              const isActive = (watch('template') || 'classique') === value;
              return (
                <label key={value} className={`flex flex-col items-center gap-1 p-3 rounded-xl border-2 cursor-pointer transition-all ${isActive ? 'border-[#166534] bg-[#166534]/5' : 'border-gray-200 hover:border-gray-300'}`}>
                  <input type="radio" value={value} {...register('template')} className="sr-only" />
                  <span className={`text-sm font-semibold ${isActive ? 'text-[#166534]' : 'text-gray-700'}`}>{label}</span>
                  <span className="text-xs text-gray-400">{desc}</span>
                </label>
              );
            })}
          </div>
        </div>
      </div>

      {/* Institution */}
      <div className={SC}>
        <div className={SH}><User size={16} /><span className={ST}>Institution</span></div>
        <div className={SB}>
          <div className="grid grid-cols-2 gap-3">
            <div><label className={L}>Nom de l'institution</label><input {...register("institutionName")} className={I} placeholder="UNIVERSITE INTERNATIONALE" /></div>
            <div><label className={L}>Sous-titre</label><input {...register("institutionSubtitle")} className={I} placeholder="JEAN PAUL II DE BAFANG" /></div>
            <div><label className={L}>Localisation</label><input {...register("institutionLocation")} className={I} placeholder="Bafang, Cameroun" /></div>
            <div><label className={L}>Département</label><input {...register("institutionDepartment")} className={I} placeholder="Cellule Informatique" /></div>
          </div>
          <div className="grid grid-cols-3 gap-3 pt-2 border-t border-gray-100">
            <div><label className={L}>N° Reçu</label><input {...register("numeroRecu")} className={I} placeholder="RCP-2026-001" /></div>
            <div><label className={L}>Date</label><input type="date" {...register("dateRecu")} className={I} /></div>
            <div><label className={L}>Heure</label><input type="time" {...register("heure")} className={I} /></div>
          </div>
        </div>
      </div>

      {/* Montant */}
      <div className={SC}>
        <div className={SH}><Banknote size={16} /><span className={ST}>💰 Montant Reçu</span></div>
        <div className={SB}>
          <div>
            <label className={L}>Somme (FCFA)</label>
            <input type="number" {...register("sommeChiffres", { valueAsNumber: true })} className={`${I} text-2xl font-bold text-green-700 py-3`} placeholder="0" />
          </div>
          <div><label className={L}>Motif / Objet du paiement</label><input {...register("motif")} className={I} placeholder="Ex: Frais de scolarité 2025-2026" /></div>
          <div><label className={L}>Référence dossier / facture</label><input {...register("reference")} className={I} placeholder="Ex: FACT-2026-045" /></div>
        </div>
      </div>

      {/* Payeur */}
      <div className={SC}>
        <div className={SH}><User size={16} /><span className={ST}>Informations du Payeur</span></div>
        <div className={SB}>
          <div><label className={L}>Reçu de (Nom complet)</label><input {...register("recuDe")} className={I} placeholder="Prénom & Nom du payeur" /></div>
          <div><label className={L}>Adresse / Contact</label><input {...register("adressePayeur")} className={I} placeholder="Ex: Bafang, +(237) 6XX XXX XXX" /></div>
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
            <div><label className={L}>Opérateur / Banque</label><input {...register("operateur")} className={I} placeholder="Ex: MTN, Orange, CCA Bank..." /></div>
            <div><label className={L}>N° Transaction / Référence</label><input {...register("numeroTransaction")} className={I} placeholder="—" /></div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">Précisez si autre :</span>
            <input {...register("modePaiement.autreTexte")} className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#166534]" />
          </div>
        </div>
      </div>

      {/* Signature */}
      <div className={SC}>
        <div className={SH}><PenLine size={16} /><span className={ST}>Caissier & Signature</span></div>
        <div className={SB}>
          <div className="grid grid-cols-2 gap-3">
            <div><label className={L}>Nom du caissier / agent</label><input {...register("nomCaissier")} className={I} /></div>
            <div><label className={L}>Date de signature</label><input type="date" {...register("dateSignature")} className={I} /></div>
          </div>
        </div>
      </div>
    </div>
  );
}
