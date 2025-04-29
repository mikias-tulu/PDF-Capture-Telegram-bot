import axios from "axios";
import * as fs from "fs";
import * as path from "path";


export const downloadFile = async (fileUrl: string, downloadFolder = "downloads"): Promise<string> => {
  const fileName = `pdf-${Date.now()}.pdf`;
  const folderPath = path.join(__dirname, "..", downloadFolder);

  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }

  const filePath = path.join(folderPath, fileName);
  const writer = fs.createWriteStream(filePath);

  const response = await axios.get(fileUrl, { responseType: "stream" });

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on("finish", () => resolve(filePath));
    writer.on("error", reject);
  });
};

export const deleteFile = (filePath: string): void => {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};

export const isValidUrl = (text: string): boolean => {
  try {
    new URL(text);
    return true;
  } catch (_) {
    return false;
  }
};
