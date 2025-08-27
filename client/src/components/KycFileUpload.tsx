import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, X, FileText, Loader2 } from "lucide-react";

interface KycFileUploadProps {
  onFilesUploaded: (urls: string[]) => void;
  currentFiles?: string[];
  disabled?: boolean;
}

export function KycFileUpload({ onFilesUploaded, currentFiles = [], disabled = false }: KycFileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>(currentFiles);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const newUploadedFiles: string[] = [];

    try {
      for (const file of Array.from(files)) {
        // Get upload URL from backend
        const token = localStorage.getItem('token');
        const response = await fetch('/api/kyc/upload-url', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ filename: file.name })
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error('Failed to get upload URL:', errorText);
          throw new Error(`Failed to get upload URL: ${response.status}`);
        }

        const { uploadURL } = await response.json();
        console.log('Got upload URL for', file.name, ':', uploadURL);

        // Upload file to object storage
        const uploadResponse = await fetch(uploadURL, {
          method: 'PUT',
          body: file,
          headers: {
            'Content-Type': file.type
          }
        });

        if (!uploadResponse.ok) {
          const errorText = await uploadResponse.text();
          console.error(`Upload failed for ${file.name}:`, errorText);
          throw new Error(`Failed to upload ${file.name}: ${uploadResponse.status}`);
        }

        // Extract object path from upload URL to create download URL
        // Upload URL format: https://storage.googleapis.com/bucket/.private/kyc/filename?...
        const url = new URL(uploadURL);
        const pathParts = url.pathname.split('/');
        // Get only the kyc/filename part (skip bucket and .private)
        const kycIndex = pathParts.findIndex(part => part === 'kyc');
        if (kycIndex === -1) {
          throw new Error('Invalid upload URL format');
        }
        const kycPath = pathParts.slice(kycIndex).join('/'); // kyc/uuid_filename
        const downloadUrl = `/objects/${kycPath}`;
        
        console.log('Generated download URL:', downloadUrl);
        newUploadedFiles.push(downloadUrl);
      }

      const allFiles = [...uploadedFiles, ...newUploadedFiles];
      setUploadedFiles(allFiles);
      onFilesUploaded(allFiles);
      console.log('Successfully uploaded files:', newUploadedFiles);
      
    } catch (error) {
      console.error('Error uploading files:', error);
      alert('Error al subir archivos. Inténtalo de nuevo.');
    } finally {
      setUploading(false);
      // Clear the input
      if (event.target) {
        event.target.value = '';
      }
    }
  };

  const removeFile = (index: number) => {
    const newFiles = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(newFiles);
    onFilesUploaded(newFiles);
  };

  return (
    <div className="space-y-4">
      <div>
        <Label className="text-emerald-300 mb-2 block">
          Documentos KYC <span className="text-red-400">*</span>
        </Label>
        <div className="space-y-3">
          {/* File Input */}
          <div className="relative">
            <Input
              type="file"
              multiple
              accept=".pdf,.jpg,.jpeg,.png,.gif"
              onChange={handleFileUpload}
              disabled={uploading || disabled}
              className="bg-black/50 border-emerald-500/20 text-emerald-50 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-500/20 file:text-emerald-300 hover:file:bg-emerald-500/30"
            />
            {uploading && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Loader2 className="h-4 w-4 animate-spin text-emerald-400" />
              </div>
            )}
          </div>

          <p className="text-emerald-200/60 text-sm">
            Formatos soportados: PDF, JPG, PNG, GIF. Máximo 10MB por archivo.
          </p>

          {/* Uploaded Files List */}
          {uploadedFiles.length > 0 && (
            <div className="mt-4 space-y-2">
              <Label className="text-emerald-300 text-sm">Archivos subidos:</Label>
              {uploadedFiles.map((fileUrl, index) => (
                <div key={index} className="flex items-center justify-between bg-black/30 rounded-lg p-3 border border-emerald-500/10">
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-emerald-400" />
                    <div>
                      <p className="text-emerald-50 text-sm font-medium">
                        Documento {index + 1}
                      </p>
                      <p className="text-emerald-300/70 text-xs">
                        {fileUrl.split('/').pop()?.substring(0, 30)}...
                      </p>
                    </div>
                  </div>
                  {!disabled && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-red-500/20 text-red-300 hover:bg-red-500/10"
                      onClick={() => removeFile(index)}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}