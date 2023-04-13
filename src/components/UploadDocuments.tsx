import React, { useCallback, useEffect, useState } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { Database } from '../utils/database.types';
import { useDropzone } from 'react-dropzone';
import styles from './UploadDocuments.module.css';
type Documents = Database['public']['Tables']['documents']['Row'];

export default function UploadDocuments({
  uid,
  url,
  size,
  onUpload,
}: {
  uid: string;
  url: Documents['document_url'];
  size: number;
  onUpload: (url: string) => void;
}) {
  const supabase = useSupabaseClient<Database>();
  const [documentUrl, setDocumentUrl] = useState<Documents['document_url']>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  useEffect(() => {
    if (url) downloadImage(url);
  }, [url]);

  async function downloadImage(path: string) {
    try {
      const { data, error } = await supabase.storage.from('documents').download(path);
      if (error) {
        throw error;
      }
      const url = URL.createObjectURL(data);
      setDocumentUrl(url);
    } catch (error) {
      console.log('Error downloading document: ', error);
    }
  }

  const uploadDocument = async (file: File) => {
    try {
      setUploading(true);

      if (!file) {
        throw new Error('You must select a document to upload.');
      }

      const fileExt = file.name.split('.').pop();
      const timeStamp = Date.now()
      const fileName = `${timeStamp}.${fileExt}`;
      const filePath = `${fileName}`;

      let { error: uploadError } = await supabase.storage
        .from('documents')
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        throw uploadError;
      }

      alert('Document successfully uploaded!');
      setUploadedFile(file);
    } catch (error) {
      alert('Error uploading document!');
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
    [uploadDocument],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const [inputKey, setInputKey] = useState(Date.now());

  return (
    <div>
      <div {...getRootProps()} className={styles.dropzone}>
        <input {...getInputProps()} />
        <h3>Dokumente hochladen</h3>
        {isDragActive ? (
          <p>Dokument hier ablegen...</p>
        ) : (
          <p>Drag'n'Drop oder draufklicken</p>
        )}
      </div>
      {uploadedFile && (
        <div className={styles.uploadedFile}>
          <h4>Uploaded File:</h4>
          <p>{uploadedFile.name}</p>
        </div>
      )}
    </div>
  );
}
