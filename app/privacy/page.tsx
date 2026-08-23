import { ProsePageView } from "@/components/prose-page";
import { privacyPage } from "@/lib/prose-pages";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata(privacyPage.route, privacyPage.title, privacyPage.description);

export default function PrivacyRoute() {
  return <ProsePageView page={privacyPage} />;
}
