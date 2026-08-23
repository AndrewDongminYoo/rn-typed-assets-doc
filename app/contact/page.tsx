import { ProsePageView } from "@/components/prose-page";
import { contactPage } from "@/lib/prose-pages";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata(contactPage.route, contactPage.title, contactPage.description);

export default function ContactRoute() {
  return <ProsePageView page={contactPage} />;
}
