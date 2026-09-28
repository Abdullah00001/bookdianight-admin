import { useState, useRef, useMemo, useEffect } from "react";
import JoditEditor from "jodit-react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useLegalContentQuery, useUpdateLegalContentMutation } from "@/apis/legal.api";
import type { TLegalType } from "@/apis/legal.api";
import { useModalStore } from "@/stores/modal.store";

interface SettingsEditorFormProps {
  title: string;
  subtitle: string;
  type: TLegalType;
}

export function SettingsEditorForm({ title, subtitle, type }: SettingsEditorFormProps) {
  const editor = useRef(null);
  const showModal = useModalStore((state) => state.showModal);
  const [content, setContent] = useState("");

  const { data, isLoading, isError } = useLegalContentQuery(type);
  const updateMutation = useUpdateLegalContentMutation();

  useEffect(() => {
    if (data?.data?.legalContent?.content) {
      setContent(data.data.legalContent.content);
    }
  }, [data]);

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: "Start typing...",
      height: 500,
      toolbarAdaptive: false,
      buttons: [
        "image",
        "fontsize",
        "|",
        "bold",
        "italic",
        "underline",
        "|",
        "left",
        "center",
        "right",
        "justify",
        "|",
        "outdent",
        "indent",
      ],
    }),
    []
  );

  const handleSave = () => {
    updateMutation.mutate(
      { type, data: { content } },
      {
        onSuccess: (res) => {
          showModal("Success", res.message || `${title} updated successfully.`, "success");
        },
        onError: (error: any) => {
          const errorMessage =
            error?.response?.data?.message || error.message || `Failed to update ${title}.`;
          showModal("Error", errorMessage, "error");
        },
      }
    );
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 w-full pb-10">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">{title}</h2>
        <p className="text-muted-foreground text-[15px] max-w-2xl">
          {subtitle}
        </p>
      </div>

      <div className="mb-10 w-full overflow-hidden rounded-xl border border-border shadow-sm">
        <style>
          {`
            .jodit-toolbar__box {
              background-color: transparent !important;
              border-bottom: none !important;
              display: flex;
              justify-content: flex-end;
              padding-right: 1rem;
            }
            .jodit-container:not(.jodit_inline) {
              border: none !important;
            }
            .jodit-workplace {
              background-color: transparent !important;
              padding: 1rem;
            }
            .jodit-wysiwyg {
              color: hsl(var(--foreground));
              font-family: inherit;
              line-height: 1.8;
            }
          `}
        </style>
        {isLoading ? (
          <div className="h-[500px] flex items-center justify-center bg-card">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : isError ? (
          <div className="h-[500px] flex items-center justify-center bg-card text-destructive">
            Failed to load {title.toLowerCase()}.
          </div>
        ) : (
          <JoditEditor
            ref={editor}
            value={content}
            config={config}
            onBlur={(newContent) => setContent(newContent)}
            onChange={() => {}}
          />
        )}
      </div>

      <Button 
        onClick={handleSave}
        disabled={isLoading || updateMutation.isPending}
        className="w-full h-14 bg-[#E5B869] hover:bg-[#D4A353] text-white font-bold rounded-xl text-lg disabled:opacity-50"
      >
        {updateMutation.isPending ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Saving...
          </>
        ) : (
          "Save"
        )}
      </Button>
    </div>
  );
}
