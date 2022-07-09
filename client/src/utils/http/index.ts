import axios from "axios";

import { config } from "../../config";

export function uploadCSVFileByFormData(
  data: FormData,
  onUploadProgress: (event: any) => void
) {
  return axios.post(`${config.REACT_APP_UPLOAD_BASE_URL}/api/v1/upload`, data, {
    onUploadProgress,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "multipart/form-data",
    },
  });
}
