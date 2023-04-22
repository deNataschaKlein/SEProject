import React, { useCallback, useState, MouseEvent } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useDropzone } from "react-dropzone";
import styles from "./UploadDocuments.module.css";

export default function UploadDocuments({
  onUpload,
}: {
  onUpload: (url: string) => void;
}) {
  const supabase = useSupabaseClient();
  const [uploading, setUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [notification, setNotification] = useState(false);
  const [uploadCount, setUploadCount] = useState(0);

  const uploadDocument = async (file: File) => {
    try {
      setUploading(true);

      if (!file) {
        throw new Error("You must select a document to upload.");
      }

      const fileExt = file.name.split(".").pop();
      const timeStamp = Date.now();
      const fileName = `${timeStamp}.${fileExt}`;
      const filePath = `${fileName}`;

      let { error: uploadError } = await supabase.storage
        .from("documents")
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        throw uploadError;
      }

      onUpload(filePath);
      setUploadCount(uploadCount + 1);

      if (uploadCount >= 1) {
        setNotification(true);
      }

      alert("Document successfully uploaded!");
      setUploadedFile(file);
    } catch (error) {
      alert("Error uploading document!");
      console.log(error);
    } finally {
      setUploading(false);
    }
  };

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      await uploadDocument(file);
    },
    [uploadDocument]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleClick = (event: MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <div>
      <div {...getRootProps()} className={styles.dropzone} onClick={handleClick}>
        <input {...getInputProps()} />
        <h3>Ein Dokument hochladen</h3>
        {isDragActive ? (
          <p>Dokument hier ablegen...</p>
        ) : (
          <p>Drag and Drop oder draufklicken</p>
        )}
      </div>
      {notification && (
        <h3 style={{ color: "var(--color-red)" }}>Ein neues Dokument wurde hochgeladen und das alte ersetzt!</h3>
      )}
      {uploadedFile && (
        <div>
          <h4>Hochgeladene Datei:</h4>
          <p>{uploadedFile.name}</p>
        </div>
      )}
    </div>
  );
}
