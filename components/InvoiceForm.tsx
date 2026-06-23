"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { InvoiceData } from "@/types/invoice";
import { Plus, Trash2 } from "lucide-react";
import { useEffect } from "react";
import { Input } from "./ui/input";

interface InvoiceFormProps {
  onDataChange: (data: InvoiceData) => void;
  initialData: InvoiceData;
}

export default function InvoiceForm({ onDataChange, initialData }: InvoiceFormProps) {
  const { register, control, watch, formState: { errors } } = useForm<InvoiceData>({
    defaultValues: initialData,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  // Watch for all changes and bubble them up
  useEffect(() => {
    const subscription = watch((value) => {
      onDataChange(value as InvoiceData);
    });
    return () => subscription.unsubscribe();
  }, [watch, onDataChange]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Éditeur de Facture</h2>

      <form className="space-y-8">
        {/* Personnalisation */}
        <section>
          <h3 className="text-lg font-semibold border-b pb-2 mb-4 text-gray-700">Personnalisation</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Modèle de facture</label>
              <select {...register("template")} className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none">
                <option value="classic">Classique (Bleu corporatif)</option>
                <option value="modern">Moderne (Gris épuré)</option>
                <option value="minimalist">Minimaliste (Noir & Blanc)</option>
                <option value="creative">Créatif (Design audacieux)</option>
                <option value="elegant">Élégant (Style chic)</option>
                <option value="startup">Startup (Vibrant & Tech)</option>
                <option value="corporate">Entreprise (Strict & Formel)</option>
                <option value="eco">Éco (Nature & Douceur)</option>
                <option value="retro">Rétro (Vintage & Grille)</option>
                <option value="futuristic">Futuriste (Cyber & Géométrique)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Police de caractères</label>
              <select {...register("fontFamily")} className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none">
                <option value="Arial, Helvetica, sans-serif">Arial / Sans-serif (Moderne)</option>
                <option value="'Times New Roman', Times, serif">Times New Roman (Classique)</option>
                <option value="'Courier New', Courier, monospace">Courier New (Monospace)</option>
                <option value="Georgia, serif">Georgia (Élégant)</option>
                <option value="Verdana, Geneva, sans-serif">Verdana (Lisible)</option>
              </select>
            </div>
          </div>
        </section>

        {/* Émetteur */}
        <section>
          <h3 className="text-lg font-semibold border-b pb-2 mb-4 text-gray-700">Votre Entreprise (Émetteur)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
              <Input {...register("senderName")} className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Slogan</label>
              <Input {...register("senderSlogan")} className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <Input {...register("senderEmail")} className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
              <Input {...register("senderPhone")} className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
          </div>
        </section>

        {/* Détails Facture */}
        <section>
          <h3 className="text-lg font-semibold border-b pb-2 mb-4 text-gray-700">Détails de la Facture</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">N° Facture</label>
              <Input {...register("invoiceNumber")} className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <Input {...register("invoiceDate")} className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Validité</label>
              <Input {...register("invoiceValidity")} className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
          </div>
        </section>

        {/* Destinataire */}
        <section>
          <h3 className="text-lg font-semibold border-b pb-2 mb-4 text-gray-700">Destinataire (Client)</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nom / Raison Sociale</label>
              <Input {...register("recipientName")} className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Adresse / Infos</label>
              <Input {...register("recipientAddress")} className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Ex: Bafang, Région de l'Ouest — Cameroun" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Objet</label>
              <Input {...register("subject")} className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
          </div>
        </section>

        {/* Lignes de facture */}
        <section>
          <div className="flex justify-between items-center border-b pb-2 mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Articles / Prestations</h3>
            <button
              type="button"
              onClick={() => append({ id: crypto.randomUUID(), designation: "", description: "", quantity: "1", price: 0 })}
              className="flex items-center text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded hover:bg-blue-100 transition-colors"
            >
              <Plus size={16} className="mr-1" /> Ajouter une ligne
            </button>
          </div>

          <div className="space-y-4">
            {fields.map((field, index) => (
              <div key={field.id} className="p-4 border rounded bg-gray-50 relative group">
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="absolute top-2 right-2 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Supprimer"
                >
                  <Trash2 size={18} />
                </button>
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-12 md:col-span-7 space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Désignation (Titre)</label>
                      <Input
                        {...register(`items.${index}.designation`)}
                        className="w-full p-2 border rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="Ex: Hébergement web"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Description (Détails)</label>
                      <textarea
                        {...register(`items.${index}.description`)}
                        className="w-full p-2 border rounded text-sm min-h-[60px] focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="Ex: Renouvellement annuel..."
                      />
                    </div>
                  </div>
                  <div className="col-span-6 md:col-span-2">
                    <label className="block text-xs font-medium text-gray-500 mb-1">Quantité / Unité</label>
                    <Input
                      {...register(`items.${index}.quantity`)}
                      className="w-full p-2 border rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="1 an, 1 forfait..."
                    />
                  </div>
                  <div className="col-span-6 md:col-span-3">
                    <label className="block text-xs font-medium text-gray-500 mb-1">Prix Unitaire (FCFA)</label>
                    <Input
                      type="number"
                      {...register(`items.${index}.price`, { valueAsNumber: true })}
                      className="w-full p-2 border rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>
              </div>
            ))}
            {fields.length === 0 && (
              <div className="text-center py-6 text-gray-500 border-2 border-dashed rounded bg-gray-50">
                Aucune prestation ajoutée. Cliquez sur "Ajouter une ligne".
              </div>
            )}
          </div>
        </section>
      </form>
    </div>
  );
}
