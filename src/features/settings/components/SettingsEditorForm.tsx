import { useState, useRef, useMemo } from "react";
import JoditEditor from "jodit-react";
import { Button } from "@/components/ui/button";

interface SettingsEditorFormProps {
  title: string;
  subtitle: string;
  initialValue?: string;
}

export function SettingsEditorForm({ title, subtitle, initialValue = "" }: SettingsEditorFormProps) {
  const editor = useRef(null);
  const [content, setContent] = useState(initialValue);

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
        <JoditEditor
          ref={editor}
          value={content}
          config={config}
          onBlur={(newContent) => setContent(newContent)}
          onChange={() => {}}
        />
      </div>

      <Button className="w-full h-14 bg-[#E5B869] hover:bg-[#D4A353] text-white font-bold rounded-xl text-lg">
        Save
      </Button>
    </div>
  );
}
