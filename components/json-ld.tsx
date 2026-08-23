import type { JsonLdNode } from "@/lib/structured-data";

/**
 * Emits a JSON-LD block in the server-rendered HTML. The payload is project-authored, but `<` is
 * still escaped so a future string containing `</script` cannot terminate the element early.
 */
export function JsonLd({ graph }: { graph: JsonLdNode }) {
  return (
    <script
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replaceAll("<", "\\u003c") }}
      type="application/ld+json"
    />
  );
}
