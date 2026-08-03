"use client";

import { useEffect, useState } from "react";
import { getOrganizationSettings, updateOrganizationSettings } from "@/lib/actions/organization";
import { Building2, Save, Plus, X } from "lucide-react";

export default function OrganizationSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  
  const [formData, setFormData] = useState({
    name: "",
    slogan: "",
    email: "",
    phone: "",
    defaultAddress: "",
    location: "",
    subtitle: "",
    taxId: "",
    departments: [] as string[]
  });
  const [newDepartment, setNewDepartment] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const org = await getOrganizationSettings();
        if (org) {
          setFormData({
            name: org.name || "",
            slogan: org.slogan || "",
            email: org.email || "",
            phone: org.phone || "",
            defaultAddress: org.defaultAddress || "",
            location: org.location || "",
            subtitle: org.subtitle || "",
            taxId: org.taxId || "",
            departments: org.departments || []
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const addDepartment = () => {
    if (newDepartment.trim() && !formData.departments.includes(newDepartment.trim())) {
      setFormData(prev => ({
        ...prev,
        departments: [...prev.departments, newDepartment.trim()]
      }));
      setNewDepartment("");
    }
  };

  const removeDepartment = (dept: string) => {
    setFormData(prev => ({
      ...prev,
      departments: prev.departments.filter(d => d !== dept)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    try {
      await updateOrganizationSettings(formData);
      setMessage("Paramètres mis à jour avec succès.");
    } catch (err: any) {
      setMessage(err.message || "Une erreur est survenue.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Chargement...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-[#1a2e5a] text-white rounded-lg">
          <Building2 size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Paramètres de l'organisation</h1>
          <p className="text-gray-500">Ces informations seront pré-chargées dans vos documents.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 space-y-6">
          
          {message && (
            <div className={`p-4 rounded-lg ${message.includes('succès') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
              {message}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Nom de l'organisation *</label>
              <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Slogan</label>
              <input type="text" name="slogan" value={formData.slogan} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" placeholder="Ex: Solutions Numériques" />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Sous-titre (Institution)</label>
              <input type="text" name="subtitle" value={formData.subtitle} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" placeholder="Ex: JEAN PAUL II DE BAFANG" />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Email de contact</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Téléphone</label>
              <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Adresse complète (rue, BP)</label>
              <input type="text" name="defaultAddress" value={formData.defaultAddress} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Localisation (Ville, Pays)</label>
              <input type="text" name="location" value={formData.location} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" placeholder="Ex: Bafang, Cameroun" />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">N° Fiscal / NIF</label>
              <input type="text" name="taxId" value={formData.taxId} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" />
            </div>
          </div>

          <hr className="border-gray-200" />

          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">Départements / Services</label>
            <p className="text-xs text-gray-500">Ajoutez les différents départements de votre structure (ex: Cellule Informatique, Ressources Humaines).</p>
            
            <div className="flex gap-2">
              <input 
                type="text" 
                value={newDepartment} 
                onChange={(e) => setNewDepartment(e.target.value)} 
                className="flex-1 px-4 py-2 border rounded-lg" 
                placeholder="Nouveau département..."
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addDepartment())}
              />
              <button type="button" onClick={addDepartment} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
                <Plus size={20} />
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mt-3">
              {formData.departments.map((dept, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-[#1a2e5a]/10 text-[#1a2e5a] px-3 py-1.5 rounded-full text-sm font-medium">
                  {dept}
                  <button type="button" onClick={() => removeDepartment(dept)} className="text-[#1a2e5a] hover:text-red-500 transition">
                    <X size={14} />
                  </button>
                </div>
              ))}
              {formData.departments.length === 0 && (
                <p className="text-sm text-gray-400 italic">Aucun département défini.</p>
              )}
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t flex justify-end">
          <button 
            type="submit" 
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-2 bg-[#1a2e5a] text-white rounded-lg font-medium hover:bg-[#243d78] transition disabled:opacity-50"
          >
            <Save size={18} />
            {saving ? "Enregistrement..." : "Enregistrer les modifications"}
          </button>
        </div>
      </form>
    </div>
  );
}
