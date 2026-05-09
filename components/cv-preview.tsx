"use client"

import { useState } from "react"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { type CvData, TEMPLATES, renderTemplate } from "@/components/cv-templates"

export { type CvData }

export function CvPreview({ cv, template, analysisId, onTemplateChange }: {
  cv: CvData
  template: string
  analysisId: string
  onTemplateChange: (t: string) => void
}) {
  const [downloading, setDownloading] = useState(false)

  async function downloadPdf() {
    setDownloading(true)
    try {
      const res = await fetch(`/api/cv/download/${analysisId}?template=${template}`)
      if (!res.ok) throw new Error("Download failed")
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${cv.name.replace(/\s+/g, "_")}_CV.pdf`
      a.click()
      URL.revokeObjectURL(url)
    } catch {
      toast.error("Download failed — please try again")
    } finally {
      setDownloading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-500 font-medium">Template:</span>
        <div className="flex gap-1.5 flex-wrap">
          {TEMPLATES.map((t) => (
            <button
              key={t.id}
              onClick={() => onTemplateChange(t.id)}
              className={`text-xs px-3 py-1 rounded-full border transition-all ${
                template === t.id
                  ? "border-gray-900 bg-gray-900 text-white"
                  : "border-gray-200 text-gray-600 hover:border-gray-400"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="border border-gray-200 rounded-xl overflow-hidden">
        {renderTemplate(cv, template)}
      </div>

      <Button
        onClick={downloadPdf}
        disabled={downloading}
        className="w-full bg-gray-950 hover:bg-gray-800 text-white h-11 gap-2 text-sm font-semibold rounded-xl"
      >
        {downloading ? (
          <>
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin inline-block" />
            Generating PDF…
          </>
        ) : (
          <>
            <Download className="w-4 h-4" />
            Download PDF
          </>
        )}
      </Button>
    </div>
  )
}
