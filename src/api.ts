import axios from "axios";
import { PDF_API_URL, PDF_API_KEY } from "./config";

export const generatePDF = async (url: string): Promise<string> => {
  const response = await axios.post(
    PDF_API_URL,
    { url },
    {
      headers: {
        "Content-Type": "application/json",
        "pdfcapture-api-key": PDF_API_KEY,
      },
    }
  );

  return response.data.pdfUrl;
};
