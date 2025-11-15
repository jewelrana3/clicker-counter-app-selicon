import Loading from "@/app/loading";
import PrivacyPolicy from "@/components/pages/privacy-policy/PrivacyPolicy";
import { Suspense } from "react";

export default function page() {
  return (
    <Suspense fallback={<Loading />}>
      <PrivacyPolicy />
    </Suspense>
  );
}
