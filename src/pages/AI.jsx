import React, { useState } from "react";
import Input from "./components/input";

import {generate} from "../AI.js";

export default function AI() {
  const [prompt, setPrompt] = useState("what this image describes?");
  const [selectedImage, setSelectedImage] = useState(null); // Store selected image data

  const handlePromptChange = (event) => {
    setPrompt(event.target.value);
  };
  
  const handleImageSelect = (image) => {
    // Validate image (optional, but recommended):
    if (!image || !image.type.startsWith("image/")) {
      console.error("Please select a valid image file.");
      return;
    }
    const reader = new FileReader(); // Create a FileReader object
    reader.readAsDataURL(image); // Read the image as a data URL

    reader.onload = () => {
      setSelectedImage(fileToGenerativePart(image)); // Set the data URL as the image path
      
    };
    
  };
  // image to data
  function fileToGenerativePart(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
        console.log(event.target.result.split(',')[1]);
      return {
        data: event.target.result.split(',')[1], // Extract base64 data
        mimeType: file.type,
      };
    };
  }
  


  return (
    <div>
      <Input handleImageSelect={(e)=>handleImageSelect(e.target.files[0])} /> {/* Pass handleImageSelect to Input component */}
      <input type="text" value={prompt} onChange={handlePromptChange} placeholder="Enter your prompt" />
      <img src={selectedImage} alt="" />
      <button disabled={!selectedImage} onClick={()=>generate(prompt,selectedImage)}>click</button>
    </div>
  );
}
