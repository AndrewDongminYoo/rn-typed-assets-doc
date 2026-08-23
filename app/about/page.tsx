import { ProsePageView } from "@/components/prose-page";
import { aboutPage } from "@/lib/prose-pages";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata(aboutPage.route, aboutPage.title, aboutPage.description);

export default function AboutRoute() {
  return <ProsePageView page={aboutPage} />;
}
