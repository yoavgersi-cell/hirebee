import mammoth from "mammoth"

async function parsePdf(buffer: Buffer): Promise<string> {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const pdfParse = require("pdf-parse/lib/pdf-parse")
  const fn = pdfParse.default ?? pdfParse
  const data = await fn(buffer)
  return data.text
}

export async function extractTextFromFile(buffer: Buffer, mimeType: string): Promise<string> {
  if (mimeType === "application/pdf") {
    const text = await parsePdf(buffer)
    return text.trim()
  }

  if (
    mimeType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    mimeType === "application/msword"
  ) {
    const result = await mammoth.extractRawText({ buffer })
    return result.value.trim()
  }

  throw new Error("Unsupported file type. Please upload a PDF or Word document.")
}
