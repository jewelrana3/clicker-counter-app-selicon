"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import { getDisclaimerAction } from "@/app/actions/getDisclaimerAction";
import { updateDisclaimerAction } from "@/app/actions/updateDisclaimerAction";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

export default function TermsConditionsPage() {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchTermsConditions = useCallback(async () => {
    setLoading(true);
    try {
      const result = await getDisclaimerAction("terms-and-conditions");
      if (result.success) {
        setContent(result.data?.content || "");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Failed to fetch terms and conditions.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTermsConditions();
  }, [fetchTermsConditions]);

  const handleSave = async () => {
    if (!content) {
      toast.error("Content cannot be empty.");
      return;
    }

    setSaving(true);
    try {
      const result = await updateDisclaimerAction({
        type: "terms-and-conditions",
        content,
      });

      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("An error occurred while saving.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mt-[1%] relative">
      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-[550px] bg-gray-50/50 rounded-lg border border-dashed border-gray-300">
          <Loader2 className="h-10 w-10 text-red-500 animate-spin mb-2" />
          <p className="text-gray-500 font-medium">
            Loading Terms & Conditions...
          </p>
        </div>
      ) : (
        <>
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
            <Button
              className="w-[30%] h-12 rounded-full bg-red-600 hover:bg-red-700 font-semibold"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save & Change"
              )}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
