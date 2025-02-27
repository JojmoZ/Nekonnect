import React, { useState, useEffect } from "react";
import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory as managerIDL, canisterId as managerCanisterId } from "../declarations/test";

const TempPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [uploadedImages, setUploadedImages] = useState<{ name: string; url: string }[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    try {
      const agent = new HttpAgent();
      if (process.env.DFX_NETWORK !== "ic") {
        await agent.fetchRootKey();
      }

      const managerActor = Actor.createActor(managerIDL, { agent, canisterId: managerCanisterId });

      await managerActor.uploadFile(file.name, [...uint8Array]);

      // 🚀 Fetch and display images after uploading
      fetchFiles();
      alert("File uploaded successfully!");
    } catch (error) {
      console.error("File upload failed:", error);
      alert("Upload failed.");
    }
  };

  const fetchFiles = async () => {
    try {
      const agent = new HttpAgent();
      if (process.env.DFX_NETWORK !== "ic") {
        await agent.fetchRootKey();
      }

      const managerActor = Actor.createActor(managerIDL, { agent, canisterId: managerCanisterId });

      const files: any = await managerActor.getUploadedFiles();
      setUploadedFiles(files);

      // Fetch and display images automatically
      const images = await Promise.all(
        files.map(async (fileName: any) => {
          const content: any = await managerActor.getFileContent(fileName);
          if (content.length > 0) {
            // ✅ Create a Blob URL with auto-detected type
            const blob = new Blob([new Uint8Array(content)]);
            const imageUrl = URL.createObjectURL(blob);

            return { name: fileName, url: imageUrl };
          }
          return null;
        })
      );

      setUploadedImages(images.filter((img) => img !== null) as { name: string; url: string }[]);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
};


  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div>
      <h1>File Upload System</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

      <h2>Uploaded Files:</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {uploadedImages.map((image, index) => (
          <div key={index} style={{ textAlign: "center" }}>
            <img src={image.url} alt={image.name} style={{ maxWidth: "200px", maxHeight: "200px" }} />
            <p>{image.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TempPage;
