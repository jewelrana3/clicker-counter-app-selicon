"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

export default function TermsConditionsPage() {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  return (
    <div className="mt-[1%]">
      <JoditEditor
        className="break-all"
        ref={editor}
        value={content}
        tabIndex={1}
        onBlur={(newContent) => setContent(newContent)}
        onChange={() => {}}
        config={{ height: 550, theme: "", readonly: false }}
      />
      <div className="flex items-center justify-center mt-6">
        <Button className="w-[30%]">Save & Change</Button>
      </div>
    </div>
  );
}
