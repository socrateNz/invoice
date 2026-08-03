import type { Organization } from "@prisma/client";

/** Unifies the org-derived defaults every document type prefills from — replaces the
 * ad hoc `INST` object built inline in editor-client.tsx and Invoice's separate
 * individual-field convention. Also wires up `taxId`/`logoUrl`, present on the
 * Organization model but never previously exposed to any document. */
export interface OrgDefaults {
  institutionName: string;
  institutionSubtitle: string;
  institutionLocation: string;
  institutionDepartment: string;
  institutionAcronym: string;
  footerText: string;
  email: string;
  phone: string;
  defaultAddress: string;
  taxId: string;
  logoUrl: string;
}

export function buildOrgDefaults(organization: Organization | null): OrgDefaults {
  const name = organization?.name || "UNIVERSITE INTERNATIONALE";
  const subtitle = organization?.subtitle || "JEAN PAUL II DE BAFANG";
  const location = organization?.location || "Bafang, Cameroun";
  const department = organization?.departments?.[0] || "Cellule Informatique";

  return {
    institutionName: name,
    institutionSubtitle: subtitle,
    institutionLocation: location,
    institutionDepartment: department,
    institutionAcronym: "UIJPII",
    footerText: `UIJPII — Cellule Informatique | Science et conscience pour un monde meilleur — UIJPII`,
    email: organization?.email || "contact@email.com",
    phone: organization?.phone || "+(237) xxx xxx xxx",
    defaultAddress: organization?.defaultAddress || "Siège",
    taxId: organization?.taxId || "",
    logoUrl: organization?.logoUrl || "",
  };
}
