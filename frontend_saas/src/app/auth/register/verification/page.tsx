import { Suspense } from "react";
import VerificationPageClient from "@/components/verify/verification-client";

export default function VerificationPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          Loading...
        </div>
      }
    >
      <VerificationPageClient />
    </Suspense>
  );
}


