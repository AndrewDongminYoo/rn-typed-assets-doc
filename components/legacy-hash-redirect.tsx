"use client";

import { useEffect } from "react";

const typedAssetsHashes = new Set([
  "#ci",
  "#cli",
  "#configuration",
  "#features",
  "#how-it-works",
  "#installation",
]);

export function LegacyHashRedirect() {
  useEffect(() => {
    function redirectTypedAssetsHash() {
      if (typedAssetsHashes.has(window.location.hash)) {
        window.location.replace(`/rn-typed-assets${window.location.hash}`);
      }
    }

    redirectTypedAssetsHash();
    window.addEventListener("hashchange", redirectTypedAssetsHash);

    return () => window.removeEventListener("hashchange", redirectTypedAssetsHash);
  }, []);

  return null;
}
