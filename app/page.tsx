"use client";

import React, { Suspense } from "react";
import HomeContent from "./homeContent";


export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
