import React from "react";
import { generateOrganizationSchema } from "@/lib/seo";

export function SeoSchema() {
  const schema = generateOrganizationSchema();
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
