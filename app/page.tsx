import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  FileText, FileSignature, ShoppingCart, Truck, ClipboardList, Navigation,
  Wallet, Receipt, Banknote, PenLine, LayoutDashboard, ShieldCheck,
  Sparkles, Palette, Building2, ArrowRight, CheckCircle2,
} from "lucide-react";

const DOCUMENT_TYPES = [
  { icon: FileText, label: "Factures", color: "bg-blue-600", desc: "Facturez vos clients avec des modèles professionnels." },
  { icon: FileSignature, label: "Devis", color: "bg-[#2563eb]", desc: "Proposez un devis avant facturation." },
  { icon: ShoppingCart, label: "Bons de Commande", color: "bg-[#7c3aed]", desc: "Commandez du matériel auprès de vos fournisseurs." },
  { icon: Truck, label: "Bons de Livraison", color: "bg-[#ea580c]", desc: "Confirmez la livraison des articles commandés." },
  { icon: ClipboardList, label: "Bordereaux", color: "bg-[#1a2e5a]", desc: "Tracez la réception de vos dossiers." },
  { icon: Navigation, label: "Ordres de Mission", color: "bg-[#1a2e5a]", desc: "Autorisez les déplacements officiels." },
  { icon: Wallet, label: "Notes de Frais", color: "bg-[#be123c]", desc: "Justifiez les dépenses engagées en mission." },
  { icon: ClipboardList, label: "Fiches de Besoin", color: "bg-teal-700", desc: "Exprimez vos besoins matériels." },
  { icon: Receipt, label: "Reçus de Paiement", color: "bg-green-700", desc: "Attestez les paiements reçus." },
  { icon: Banknote, label: "Bons de Caisse", color: "bg-[#059669]", desc: "Enregistrez les mouvements de caisse." },
];

const FEATURES = [
  { icon: Palette, title: "3 styles par document", desc: "Classique, Moderne ou Prestige — chaque document s'adapte à votre image de marque." },
  { icon: PenLine, title: "Signature numérique", desc: "Signez à la souris ou au doigt, ou tapez votre nom dans une police manuscrite." },
  { icon: LayoutDashboard, title: "Tableau de bord unifié", desc: "Suivez tous vos documents, leur statut et leur historique au même endroit." },
  { icon: Building2, title: "Multi-organisation", desc: "Centralisez logo, coordonnées et départements pour pré-remplir vos documents." },
  { icon: Sparkles, title: "Export PDF instantané", desc: "Prévisualisez en direct et téléchargez un PDF prêt à l'emploi en un clic." },
  { icon: ShieldCheck, title: "Accès sécurisé", desc: "Authentification par compte et rôles dédiés pour l'administration." },
];

const STATS = [
  { value: "10", label: "types de documents" },
  { value: "3", label: "styles visuels par document" },
  { value: "100%", label: "généré en PDF" },
  { value: "0", label: "installation requise" },
];

export default async function LandingPage() {
  const session = await auth();
  if (session?.user) redirect("/dashboard");

  return (
    <div className="min-h-screen bg-white">
      {/* ── Header ── */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-[#1a2e5a] rounded-lg flex items-center justify-center">
              <Building2 className="text-white w-5 h-5" />
            </div>
            <span className="font-bold text-lg text-gray-900">ETARCOS BILL</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <a href="#fonctionnalites" className="hover:text-gray-900 transition-colors">Fonctionnalités</a>
            <a href="#types-documents" className="hover:text-gray-900 transition-colors">Types de documents</a>
            <a href="#comment-ca-marche" className="hover:text-gray-900 transition-colors">Comment ça marche</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Se connecter
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#1a2e5a] text-white text-sm font-medium rounded-full hover:bg-[#243d78] transition-colors"
            >
              Créer un compte
            </Link>
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="bg-[#eef1f6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Vos documents professionnels,<br />prêts en quelques clics
            </h1>
            <p className="mt-5 text-gray-600 text-lg max-w-lg">
              Factures, bons de commande, reçus, ordres de mission... Générez, personnalisez et signez
              vos documents administratifs en PDF, pour toute votre organisation.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#1a2e5a] text-white text-sm font-semibold rounded-full hover:bg-[#243d78] transition-colors shadow-sm"
              >
                Créer un compte <ArrowRight size={16} />
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-300 text-gray-700 text-sm font-semibold rounded-full hover:bg-gray-50 transition-colors"
              >
                Se connecter
              </Link>
            </div>
            <p className="mt-6 text-sm text-gray-500">
              Types populaires :{" "}
              <a href="#types-documents" className="text-[#1a2e5a] font-medium hover:underline">Factures</a>,{" "}
              <a href="#types-documents" className="text-[#1a2e5a] font-medium hover:underline">Bons de Commande</a>,{" "}
              <a href="#types-documents" className="text-[#1a2e5a] font-medium hover:underline">Reçus de Paiement</a>
            </p>
          </div>

          {/* Hero visual — a stylized mockup of a generated, signed document */}
          <div className="relative max-w-sm mx-auto md:mx-0 md:ml-auto">
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 -rotate-2">
              <div className="flex items-center justify-between mb-4">
                <div className="h-3 w-24 bg-[#1a2e5a] rounded-full" />
                <div className="h-6 w-6 rounded bg-[#d4a017]/20 flex items-center justify-center">
                  <FileText size={13} className="text-[#d4a017]" />
                </div>
              </div>
              <div className="space-y-2 mb-5">
                <div className="h-2 w-full bg-gray-100 rounded-full" />
                <div className="h-2 w-4/5 bg-gray-100 rounded-full" />
              </div>
              <div className="space-y-1.5 mb-5">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between text-xs">
                    <div className="h-2 w-28 bg-gray-100 rounded-full" />
                    <div className="h-2 w-10 bg-gray-100 rounded-full" />
                  </div>
                ))}
              </div>
              <div className="flex justify-end mb-5">
                <div className="px-3 py-1.5 bg-[#d4a017]/15 rounded text-xs font-bold text-[#a17812]">
                  TOTAL 245 000 FCFA
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-dashed border-gray-200 pt-3">
                <span className="text-[11px] text-gray-400">Signature</span>
                <span style={{ fontFamily: "var(--font-caveat)" }} className="text-2xl text-[#1a2e5a] -rotate-3">
                  J. Kamga
                </span>
              </div>
            </div>

            <div className="absolute -top-5 -left-8 bg-white rounded-xl shadow-lg border border-gray-200 px-3.5 py-2.5 rotate-3 hidden sm:flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
              <span className="text-xs font-medium text-gray-700">Signature numérique</span>
            </div>
            <div className="absolute -bottom-5 -right-4 bg-white rounded-xl shadow-lg border border-gray-200 px-3.5 py-2.5 -rotate-2 hidden sm:flex items-center gap-2">
              <Sparkles size={16} className="text-[#d4a017] shrink-0" />
              <span className="text-xs font-medium text-gray-700">10 types de documents</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl font-bold text-[#1a2e5a]">{s.value}</p>
              <p className="text-sm text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Two-card split ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid md:grid-cols-2 gap-6">
        <div className="bg-[#eef1f6] rounded-2xl p-8">
          <div className="w-11 h-11 bg-[#1a2e5a] rounded-xl flex items-center justify-center mb-5">
            <FileText className="text-white" size={20} />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Créez vos documents</h3>
          <p className="mt-2 text-gray-600 text-sm max-w-sm">
            Générez factures, bons de commande, reçus et bien plus, personnalisés à l'image de votre
            organisation, avec aperçu PDF en direct.
          </p>
          <Link href="/register" className="mt-5 inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#1a2e5a] text-white text-sm font-medium rounded-full hover:bg-[#243d78] transition-colors">
            Commencer <ArrowRight size={15} />
          </Link>
        </div>
        <div className="bg-[#faf3e3] rounded-2xl p-8">
          <div className="w-11 h-11 bg-[#d4a017] rounded-xl flex items-center justify-center mb-5">
            <Building2 className="text-white" size={20} />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Gérez votre organisation</h3>
          <p className="mt-2 text-gray-600 text-sm max-w-sm">
            Centralisez logo, coordonnées et départements, et gardez une vue d'ensemble de tous les
            documents générés par votre équipe.
          </p>
          <a href="#fonctionnalites" className="mt-5 inline-flex items-center gap-1.5 px-5 py-2.5 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-full hover:bg-gray-50 transition-colors">
            Voir les fonctionnalités <ArrowRight size={15} />
          </a>
        </div>
      </section>

      {/* ── Comment ça marche ── */}
      <section id="comment-ca-marche" className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Comment ça marche</h2>
          <div className="mt-10 grid md:grid-cols-3 gap-8">
            {[
              { n: "1", title: "Choisissez un type de document", desc: "Facture, bon de commande, reçu... sélectionnez parmi 10 types prêts à l'emploi." },
              { n: "2", title: "Personnalisez et prévisualisez", desc: "Remplissez le formulaire, choisissez un style visuel, l'aperçu PDF se met à jour en direct." },
              { n: "3", title: "Signez et téléchargez", desc: "Ajoutez une signature numérique si besoin, puis téléchargez le PDF final en un clic." },
            ].map((step) => (
              <div key={step.n}>
                <div className="w-9 h-9 rounded-full bg-[#1a2e5a] text-white text-sm font-bold flex items-center justify-center mb-4">
                  {step.n}
                </div>
                <h3 className="font-semibold text-gray-900">{step.title}</h3>
                <p className="mt-1.5 text-sm text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Types de documents ── */}
      <section id="types-documents" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Types de documents disponibles</h2>
            <p className="mt-2 text-gray-500">10 types de documents, chacun en 3 styles visuels.</p>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {DOCUMENT_TYPES.map((doc) => (
            <div key={doc.label} className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-gray-300 transition-all">
              <div className={`w-10 h-10 rounded-lg ${doc.color} flex items-center justify-center mb-4`}>
                <doc.icon className="text-white" size={18} />
              </div>
              <h3 className="font-semibold text-gray-900 text-sm">{doc.label}</h3>
              <p className="mt-1 text-xs text-gray-500 leading-relaxed">{doc.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Fonctionnalités ── */}
      <section id="fonctionnalites" className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Fonctionnalités clés</h2>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f) => (
              <div key={f.title} className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="w-10 h-10 rounded-lg bg-[#1a2e5a]/10 flex items-center justify-center mb-4">
                  <f.icon className="text-[#1a2e5a]" size={18} />
                </div>
                <h3 className="font-semibold text-gray-900">{f.title}</h3>
                <p className="mt-1.5 text-sm text-gray-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA banner ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-[#1a2e5a] rounded-2xl px-8 py-14 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
          <h2 className="text-2xl md:text-3xl font-bold text-white relative">
            Prêt à simplifier la gestion de vos documents ?
          </h2>
          <p className="mt-3 text-white/70 max-w-xl mx-auto relative">
            Créez un compte pour votre organisation et générez votre premier document en quelques minutes.
          </p>
          <Link
            href="/register"
            className="mt-7 inline-flex items-center gap-2 px-7 py-3 bg-[#d4a017] text-[#1a2e5a] text-sm font-bold rounded-full hover:bg-[#e0ac1f] transition-colors relative"
          >
            Créer un compte <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-[#1a2e5a] rounded-lg flex items-center justify-center">
              <Building2 className="text-white w-4 h-4" />
            </div>
            <span className="font-bold text-gray-900">ETARCOS BILL</span>
            <span className="text-gray-400 text-sm">par ETARCOS DEV</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <Link href="/login" className="hover:text-gray-900 transition-colors">Connexion</Link>
            <Link href="/register" className="hover:text-gray-900 transition-colors">Créer un compte</Link>
          </div>
          <p className="text-sm text-gray-400">© {new Date().getFullYear()} ETARCOS DEV. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}
