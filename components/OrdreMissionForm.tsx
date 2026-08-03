"use client";
import { OrdreMissionData } from "@/types/ordre-mission";
import { User, MapPin, Truck, Wallet, PenLine } from "lucide-react";
import { SECTION_CARD as SC, SECTION_TITLE as ST, SECTION_BODY as SB, FIELD_LABEL as L } from "@/components/forms/shared/styles";
import { useDocumentForm } from "@/components/forms/shared/useDocumentForm";
import { TemplateSelector } from "@/components/forms/shared/TemplateSelector";
import SignatureField from "@/components/SignatureField";

const SH = "flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-[#1a2e5a] to-[#243d78] text-white";
const I = "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1a2e5a] focus:border-transparent transition-all bg-white";
const CB = "w-4 h-4 rounded border-gray-300 text-[#1a2e5a] focus:ring-[#1a2e5a] cursor-pointer";

interface Props {
  onDataChange: (d: OrdreMissionData) => void;
  initialData: OrdreMissionData;
  signatures?: Record<string, string>;
  onSignatureChange?: (slot: string, dataUrl: string | null) => void;
}

export default function OrdreMissionForm({ onDataChange, initialData, signatures = {}, onSignatureChange = () => {} }: Props) {
  const { register, watch } = useDocumentForm<OrdreMissionData>(initialData, onDataChange);

  return (
    <div className="space-y-1">
      <div className="mb-5 px-1">
        <h2 className="text-xl font-bold text-gray-800">Éditeur d'Ordre de Mission</h2>
        <p className="text-xs text-gray-500 mt-1">Remplissez les champs pour générer l'ordre de mission PDF</p>
      </div>

      <TemplateSelector register={register} watch={watch} name="template" gradientFrom="#1a2e5a" gradientTo="#243d78" options={[
        { value: 'classique', label: 'Classique', desc: 'Standard' },
        { value: 'moderne', label: 'Moderne', desc: 'Vert Forêt & Épuré' },
        { value: 'prestige', label: 'Prestige', desc: 'Bordeaux & Or Premium' },
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
            <div className="col-span-2"><label className={L}>Texte du pied de page</label><input {...register("footerText")} className={I} placeholder="UIJPII — Cellule Informatique | Science et conscience pour un monde meilleur — UIJPII" /></div>
          </div>
          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-gray-100">
            <div><label className={L}>N° de l'Ordre</label><input {...register("numeroOrdre")} className={I} placeholder="OM-2026-001" /></div>
            <div><label className={L}>Date d'émission</label><input type="date" {...register("dateEmission")} className={I} /></div>
          </div>
        </div>
      </div>

      {/* Agent */}
      <div className={SC}>
        <div className={SH}><User size={16} /><span className={ST}>1. Identification de l'Agent</span></div>
        <div className={SB}>
          <div className="grid grid-cols-2 gap-3">
            <div><label className={L}>Nom & Prénom</label><input {...register("nomPrenom")} className={I} /></div>
            <div><label className={L}>Matricule</label><input {...register("matricule")} className={I} /></div>
            <div><label className={L}>Grade / Titre</label><input {...register("grade")} className={I} placeholder="Ex: Maître de conférences" /></div>
            <div><label className={L}>Fonction</label><input {...register("fonction")} className={I} placeholder="Ex: Enseignant-chercheur" /></div>
            <div className="col-span-2"><label className={L}>Département / Service</label><input {...register("departement")} className={I} /></div>
          </div>
        </div>
      </div>

      {/* Mission */}
      <div className={SC}>
        <div className={SH}><MapPin size={16} /><span className={ST}>2. Détails de la Mission</span></div>
        <div className={SB}>
          <div><label className={L}>Objet de la mission</label><textarea {...register("objetMission")} rows={2} className={`${I} resize-none`} placeholder="Ex: Participation à la conférence internationale sur..." /></div>
          <div><label className={L}>Destination</label><input {...register("destination")} className={I} placeholder="Ex: Yaoundé, Cameroun" /></div>
          <div className="grid grid-cols-3 gap-3">
            <div><label className={L}>Date de départ</label><input type="date" {...register("dateDepart")} className={I} /></div>
            <div><label className={L}>Date de retour</label><input type="date" {...register("dateRetour")} className={I} /></div>
            <div><label className={L}>Durée (jours)</label><input type="number" {...register("duree")} className={I} placeholder="1" min="1" /></div>
          </div>
        </div>
      </div>

      {/* Transport */}
      <div className={SC}>
        <div className={SH}><Truck size={16} /><span className={ST}>3. Moyen de Transport</span></div>
        <div className={SB}>
          <div className="flex flex-wrap gap-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
            {[
              { f: "moyenTransport.vehiculeService" as const, l: "Véhicule de service" },
              { f: "moyenTransport.vehiculePersonnel" as const, l: "Véhicule personnel" },
              { f: "moyenTransport.transport_commun" as const, l: "Transport en commun" },
              { f: "moyenTransport.avion" as const, l: "Avion" },
              { f: "moyenTransport.autre" as const, l: "Autre" },
            ].map(({ f, l }) => (
              <label key={f} className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" {...register(f)} className={CB} />
                <span className="text-sm text-gray-700">{l}</span>
              </label>
            ))}
          </div>
          <div><label className={L}>Précisez si autre</label><input {...register("moyenTransport.autreTexte")} className={I} placeholder="—" /></div>
        </div>
      </div>

      {/* Frais */}
      <div className={SC}>
        <div className={SH}><Wallet size={16} /><span className={ST}>4. Frais Alloués</span></div>
        <div className={SB}>
          <div className="grid grid-cols-2 gap-3">
            <div><label className={L}>Devise</label>
              <select {...register("devise")} className={I}>
                <option value="FCFA">FCFA</option>
                <option value="EUR">EUR</option>
                <option value="USD">USD</option>
              </select>
            </div>
            <div><label className={L}>Per diem journalier</label><input type="number" {...register("perDiemJournalier", { valueAsNumber: true })} className={I} placeholder="0" /></div>
            <div><label className={L}>Frais de transport</label><input type="number" {...register("fraisTransport", { valueAsNumber: true })} className={I} placeholder="0" /></div>
            <div><label className={L}>Autres frais</label><input type="number" {...register("autresFrais", { valueAsNumber: true })} className={I} placeholder="0" /></div>
          </div>
        </div>
      </div>

      {/* Observations */}
      <div className={SC}>
        <div className={SH}><PenLine size={16} /><span className={ST}>Observations & Signature</span></div>
        <div className={SB}>
          <div><label className={L}>Instructions / Observations</label><textarea {...register("observations")} rows={2} className={`${I} resize-none`} /></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-[#1a2e5a] uppercase border-b pb-1">L'Intéressé(e)</h4>
              <SignatureField label="L'Intéressé(e)" value={signatures.interesse} onChange={(v) => onSignatureChange("interesse", v)} />
            </div>
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-[#1a2e5a] uppercase border-b pb-1">Autorisateur</h4>
              <div><label className={L}>Autorisé par</label><input {...register("autorisePar")} className={I} /></div>
              <div><label className={L}>Titre de l'autorisateur</label><input {...register("titreAutorisateur")} className={I} placeholder="Directeur Général" /></div>
              <SignatureField label="Autorisateur" value={signatures.autorisateur} onChange={(v) => onSignatureChange("autorisateur", v)} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className={L}>Lieu de signature</label><input {...register("lieuSignature")} className={I} placeholder="Bafang" /></div>
            <div><label className={L}>Date de signature</label><input type="date" {...register("dateSignature")} className={I} /></div>
          </div>
        </div>
      </div>
    </div>
  );
}
