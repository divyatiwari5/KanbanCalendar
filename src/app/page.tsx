"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/calendar-portal/calendar');
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#f6f8ff] to-[#eef1f9]">
      <div className="max-w-7xl mx-auto p-4">
        {/* Loading state while redirecting */}
        <div className="flex items-center justify-center h-screen">
          <div className="text-gray-600">Loading calendar...</div>
        </div>
      </div>
    </div>
  );
}
