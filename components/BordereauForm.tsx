"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { BordereauData } from "@/types/bordereau";
import { Plus, Trash2, Building2, FileText, ListChecks, AlertTriangle, ClipboardCheck, PenLine } from "lucide-react";
import { useEffect } from "react";

interface BordereauFormProps {
  onDataChange: (data: BordereauData) => void;
  initialData: BordereauData;
}

const sectionClass = "bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-5";
const sectionHeaderClass = "flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-[#1a2e5a] to-[#243d78] text-white";
const sectionTitleClass = "font-semibold text-sm tracking-wide";
const sectionBodyClass = "p-5 space-y-4";
const labelClass = "block text-xs font-medium text-gray-600 mb-1";
const inputClass = "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1a2e5a] focus:border-transparent transition-all bg-white";
const checkboxClass = "w-4 h-4 rounded border-gray-300 text-[#1a2e5a] focus:ring-[#1a2e5a] cursor-pointer";

export default function BordereauForm({ onDataChange, initialData }: BordereauFormProps) {
  const { register, control, watch } = useForm<BordereauData>({
    defaultValues: initialData,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "documents",
  });

  useEffect(() => {
    const subscription = watch((value) => {
      onDataChange(value as BordereauData);
    });
    return () => subscription.unsubscribe();
  }, [watch, onDataChange]);

  return (
    <div className="space-y-1">
      <div className="mb-5 px-1">
        <h2 className="text-xl font-bold text-gray-800">Éditeur de Bordereau</h2>
        <p className="text-xs text-gray-500 mt-1">Remplissez les champs ci-dessous pour générer le bordereau PDF</p>
      </div>

      {/* ── Template Selector ── */}
      <div className={sectionClass}>
        <div className={sectionHeaderClass}>
          <span className={sectionTitleClass}>🎨 Modèle de document</span>
        </div>
        <div className={sectionBodyClass}>
          <div className="grid grid-cols-3 gap-3">
            {[
              { value: 'classique', label: 'Classique', desc: 'Marine & Or — UIJPII' },
              { value: 'moderne',   label: 'Moderne',   desc: 'Épuré & Sarcelle' },
              { value: 'prestige',  label: 'Prestige',  desc: 'Sombre & Luxueux' },
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
        <div className={sectionHeaderClass}>
          <Building2 size={16} />
          <span className={sectionTitleClass}>Informations de l'Institution</span>
        </div>
        <div className={sectionBodyClass}>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Nom de l'institution</label>
              <input {...register("institutionName")} className={inputClass} placeholder="UNIVERSITE INTERNATIONALE" />
            </div>
            <div>
              <label className={labelClass}>Sous-titre / Nom complet</label>
              <input {...register("institutionSubtitle")} className={inputClass} placeholder="JEAN PAUL II DE BAFANG" />
            </div>
            <div>
              <label className={labelClass}>Localisation</label>
              <input {...register("institutionLocation")} className={inputClass} placeholder="Bafang, Cameroun" />
            </div>
            <div>
              <label className={labelClass}>Département émetteur</label>
              <input {...register("institutionDepartment")} className={inputClass} placeholder="Cellule Informatique" />
            </div>
          </div>
        </div>
      </div>

      {/* ── En-tête du Bordereau ── */}
      <div className={sectionClass}>
        <div className={sectionHeaderClass}>
          <FileText size={16} />
          <span className={sectionTitleClass}>En-tête du Bordereau</span>
        </div>
        <div className={sectionBodyClass}>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className={labelClass}>N° Bordereau</label>
              <input {...register("numeroBordereau")} className={inputClass} placeholder="BRD-2026-001" />
            </div>
            <div>
              <label className={labelClass}>Date de réception</label>
              <input type="date" {...register("dateReception")} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Heure</label>
              <input type="time" {...register("heure")} className={inputClass} />
            </div>
          </div>
        </div>
      </div>

      {/* ── Section 1: Identification du service émetteur ── */}
      <div className={sectionClass}>
        <div className={sectionHeaderClass}>
          <Building2 size={16} />
          <span className={sectionTitleClass}>1. Identification du Service Émetteur</span>
        </div>
        <div className={sectionBodyClass}>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Service / Département</label>
              <input {...register("serviceDepartement")} className={inputClass} placeholder="Ex: Scolarité" />
            </div>
            <div>
              <label className={labelClass}>Date d'envoi</label>
              <input type="date" {...register("dateEnvoi")} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Nom de l'agent</label>
              <input {...register("nomAgent")} className={inputClass} placeholder="Prénom & Nom" />
            </div>
            <div>
              <label className={labelClass}>Fonction</label>
              <input {...register("fonction")} className={inputClass} placeholder="Ex: Secrétaire" />
            </div>
            <div className="col-span-2">
              <label className={labelClass}>Contact / Poste</label>
              <input {...register("contactPoste")} className={inputClass} placeholder="Ex: Poste 12 / +237 6XX XXX XXX" />
            </div>
          </div>
        </div>
      </div>

      {/* ── Section 2: Description du dossier ── */}
      <div className={sectionClass}>
        <div className={sectionHeaderClass}>
          <FileText size={16} />
          <span className={sectionTitleClass}>2. Description du Dossier Reçu</span>
        </div>
        <div className={sectionBodyClass}>
          <div>
            <label className={labelClass}>Intitulé / Objet du dossier</label>
            <input {...register("intituleObjet")} className={inputClass} placeholder="Ex: Dossier d'inscription 2025-2026" />
          </div>
          <div>
            <label className={labelClass}>Référence interne</label>
            <input {...register("referenceInterne")} className={inputClass} placeholder="Ex: REF-SCO-2026-045" />
          </div>

          {/* Nature du dossier */}
          <div>
            <label className={labelClass}>Nature du dossier</label>
            <div className="flex flex-wrap gap-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
              {[
                { field: "natureDossier.administratif" as const, label: "Administratif" },
                { field: "natureDossier.technique" as const, label: "Technique" },
                { field: "natureDossier.pedagogique" as const, label: "Pédagogique" },
                { field: "natureDossier.financier" as const, label: "Financier" },
                { field: "natureDossier.autreNature" as const, label: "Autre" },
              ].map(({ field, label }) => (
                <label key={field} className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" {...register(field)} className={checkboxClass} />
                  <span className="text-sm text-gray-700">{label}</span>
                </label>
              ))}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Précisez :</span>
                <input
                  {...register("natureDossier.autreNatureTexte")}
                  className="px-2 py-1 border border-gray-300 rounded text-sm w-32 focus:outline-none focus:ring-1 focus:ring-[#1a2e5a]"
                  placeholder="___________"
                />
              </div>
            </div>
          </div>

          {/* Support */}
          <div>
            <label className={labelClass}>Support</label>
            <div className="flex flex-wrap gap-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
              {[
                { field: "support.papier" as const, label: "Papier" },
                { field: "support.numerique" as const, label: "Numérique (USB/CD)" },
                { field: "support.courriel" as const, label: "Courriel" },
                { field: "support.autreSupport" as const, label: "Autre" },
              ].map(({ field, label }) => (
                <label key={field} className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" {...register(field)} className={checkboxClass} />
                  <span className="text-sm text-gray-700">{label}</span>
                </label>
              ))}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Précisez :</span>
                <input
                  {...register("support.autreSupportTexte")}
                  className="px-2 py-1 border border-gray-300 rounded text-sm w-32 focus:outline-none focus:ring-1 focus:ring-[#1a2e5a]"
                  placeholder="___________"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Section 3: Documents ── */}
      <div className={sectionClass}>
        <div className={sectionHeaderClass}>
          <ListChecks size={16} />
          <span className={sectionTitleClass}>3. Liste des Documents / Pièces Jointes</span>
          <button
            type="button"
            onClick={() => append({ id: crypto.randomUUID(), designation: "", nombrePages: "", observations: "" })}
            className="ml-auto flex items-center gap-1 px-3 py-1 bg-white/20 hover:bg-white/30 text-white text-xs rounded-lg transition-colors"
          >
            <Plus size={13} /> Ajouter
          </button>
        </div>
        <div className="p-4 space-y-2">
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200 group">
              <div className="flex items-center justify-center w-6 h-6 bg-[#1a2e5a] text-white text-xs rounded-full shrink-0 mt-1">
                {index + 1}
              </div>
              <div className="flex-1 grid grid-cols-12 gap-2">
                <div className="col-span-6">
                  <label className="block text-xs text-gray-500 mb-1">Désignation</label>
                  <input
                    {...register(`documents.${index}.designation`)}
                    className={inputClass}
                    placeholder="Nom du document"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs text-gray-500 mb-1">Nb. pages</label>
                  <input
                    {...register(`documents.${index}.nombrePages`)}
                    className={inputClass}
                    placeholder="—"
                  />
                </div>
                <div className="col-span-4">
                  <label className="block text-xs text-gray-500 mb-1">Observations</label>
                  <input
                    {...register(`documents.${index}.observations`)}
                    className={inputClass}
                    placeholder="—"
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity mt-6 shrink-0"
                title="Supprimer"
              >
                <Trash2 size={15} />
              </button>
            </div>
          ))}
          {fields.length === 0 && (
            <div className="text-center py-6 text-gray-400 border-2 border-dashed rounded-lg text-sm">
              Aucun document ajouté. Cliquez sur <strong>Ajouter</strong> pour en saisir.
            </div>
          )}
        </div>
      </div>

      {/* ── Section 4: Priorité et traitement ── */}
      <div className={sectionClass}>
        <div className={sectionHeaderClass}>
          <AlertTriangle size={16} />
          <span className={sectionTitleClass}>4. Priorité et Traitement</span>
        </div>
        <div className={sectionBodyClass}>
          <div>
            <label className={labelClass}>Degré d'urgence</label>
            <div className="flex gap-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
              {[
                { value: "normal", label: "Normal" },
                { value: "urgent", label: "Urgent" },
                { value: "tres_urgent", label: "Très urgent" },
              ].map(({ value, label }) => (
                <label key={value} className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" value={value} {...register("degreeUrgence")} className={checkboxClass} />
                  <span className={`text-sm font-medium ${value === 'tres_urgent' ? 'text-red-600' : value === 'urgent' ? 'text-orange-500' : 'text-gray-700'}`}>
                    {label}
                  </span>
                </label>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Délai de traitement demandé</label>
              <input {...register("delaiTraitement")} className={inputClass} placeholder="Ex: 48h, 5 jours ouvrables" />
            </div>
            <div>
              <label className={labelClass}>Transmis à / Affecté à</label>
              <input {...register("transmisA")} className={inputClass} placeholder="Ex: Direction des études" />
            </div>
          </div>
          <div>
            <label className={labelClass}>Instructions particulières</label>
            <textarea
              {...register("instructionsParticulieres")}
              rows={2}
              className={`${inputClass} resize-none`}
              placeholder="Ex: Traitement urgent, réponse attendue avant le..."
            />
          </div>
        </div>
      </div>

      {/* ── Section 5: État du dossier ── */}
      <div className={sectionClass}>
        <div className={sectionHeaderClass}>
          <ClipboardCheck size={16} />
          <span className={sectionTitleClass}>5. État du Dossier à la Réception</span>
        </div>
        <div className={sectionBodyClass}>
          <div>
            <label className={labelClass}>État</label>
            <div className="flex flex-wrap gap-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" {...register("etatDossier.complet")} className={checkboxClass} />
                <span className="text-sm text-green-700 font-medium">Dossier complet</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" {...register("etatDossier.incomplet")} className={checkboxClass} />
                <span className="text-sm text-orange-600 font-medium">Dossier incomplet</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" {...register("etatDossier.endommage")} className={checkboxClass} />
                <span className="text-sm text-red-600 font-medium">Dossier endommagé</span>
              </label>
            </div>
          </div>
          <div>
            <label className={labelClass}>Observations sur l'état</label>
            <textarea
              {...register("observationsEtat")}
              rows={2}
              className={`${inputClass} resize-none`}
              placeholder="Ex: Il manque la pièce d'identité..."
            />
          </div>
        </div>
      </div>

      {/* ── Section 6: Signatures ── */}
      <div className={sectionClass}>
        <div className={sectionHeaderClass}>
          <PenLine size={16} />
          <span className={sectionTitleClass}>6. Signatures</span>
        </div>
        <div className={sectionBodyClass}>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-[#1a2e5a] uppercase tracking-wider border-b border-gray-200 pb-1">
                Agent émetteur
              </h4>
              <div>
                <label className={labelClass}>Nom & Prénom</label>
                <input {...register("nomPrenomEmetteur")} className={inputClass} placeholder="—" />
              </div>
              <div>
                <label className={labelClass}>Date de signature</label>
                <input type="date" {...register("dateSignatureEmetteur")} className={inputClass} />
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-[#1a2e5a] uppercase tracking-wider border-b border-gray-200 pb-1">
                Réceptionniste
              </h4>
              <div>
                <label className={labelClass}>Nom & Prénom</label>
                <input {...register("nomPrenomReceptionniste")} className={inputClass} placeholder="—" />
              </div>
              <div>
                <label className={labelClass}>Date de signature</label>
                <input type="date" {...register("dateSignatureReceptionniste")} className={inputClass} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
