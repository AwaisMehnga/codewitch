import React, { useEffect, useState } from "react";
import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/generative-ai";
import { getBase64 } from "./components/imageHelper";
import {
  prompt,
  refine_prompt,
  html_prompt,
  refine_html_prompt,
} from "./components/Prompts";
import GeneratedContents from "./components/GeneratedContents";
import "./Styles/AI.css";

export default function AI() {
  // states
  const [image, setImage] = useState("");
  const [imageInineData, setImageInlineData] = useState({});
  const [compiledResponse, setCompiledResponse] = useState("");
  const [description, setDescription] = useState("");
  const [refinedDescription, setRefinedDescription] = useState("");
  const [initialHtml, setInitialHtml] = useState("");
  const [refinedHtml, setRefinedHtml] = useState("");
  const [message, setMessage] = useState("");

  // selecting refining model
  const generation_config = {
    temperature: 1,
    top_p: 0.95,
    top_k: 64,
    max_output_tokens: 8192,
    response_mime_type: "text/plain",
  };

  const safetySetting = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    },
  ];

  const framework = "Regular CSS use flex grid etc"; //define any framework required

  const genAI = new GoogleGenerativeAI(
    "AIzaSyBSl2C4Jax2_yEJ_2CpAsjrhcKapT3UfMo"
  );
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro-latest",
    safetySetting,
    generation_config,
  });
  const chat = model.startChat({ history: [] });

  // send message to AI
  async function send_message(textprompt, imageData) {
    try {
      const result = await chat.sendMessageStream([textprompt, imageData]);
      let compiled = "";

      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        compiled += chunkText;
        setCompiledResponse(compiled);
      }
    } catch (error) {
      if (error.message.includes("[429 ]")) {
        alert("Request limit exceeded, please try Tomorrow.");
      }
    }
    return compiled;
  }
  // Converts a File object to a GoogleGenerativeAI.Part object.
  async function fileToGenerativePart(file) {
    const base64EncodedDataPromise = new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(",")[1]);
      reader.readAsDataURL(file);
    });

    return {
      inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
    };
  }

  // on click
  const handleClick = async () => {
    // getting details
    setMessage("Initial description...");
    setDescription(await send_message(prompt, imageInineData));

    // refining
    send_message("Refining description...");
    setRefinedDescription(
      await send_message(refine_prompt(description), imageInineData)
    );

    // Generate HTML
    send_message("Generating HTML...");
    setInitialHtml(
      await send_message(
        html_prompt(framework, refinedDescription),
        imageInineData
      )
    );

    // Refine HTML
    setMessage("Refining HTML...");
    setRefinedHtml(
      await send_message(
        refine_html_prompt(framework, initialHtml),
        imageInineData
      )
    );

    setMessage("completed");
  };

  // on image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    // getting base64 from file to render in DOM
    getBase64(file)
      .then((result) => {
        setImage(result);
      })
      .catch((e) => console.log(e));

    // generating content model for Gemini Google AI
    fileToGenerativePart(file).then((image) => {
      setImageInlineData(image);
    });
  };

  // download code
  const Downloadcode = () => {
    const element = document.createElement("a");
    const file = new Blob([refinedHtml], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "index.html";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  return (
    <div>
      <div>
        <div className="aiContainer">
          <div className="inputContainer">
            <div className="inpBox">
              <input
                className="inp"
                type="file"
                onChange={(e) => handleImageChange(e)}
              />
              <span>Upload</span>
            </div>
          </div>
          <div className="Convert">
            <button
              style={{ marginLeft: "20px" }}
              onClick={() => handleClick()}
            >
              Convert
            </button>
          </div>
          <p>{message}</p>
        </div>
        <div className="imgTocodeprev">
          <img src={image} style={{ width: "30%", marginTop: 30 }} />
          <GeneratedContents
            className="compiledResponse"
            id="compiledResponse"
            dataRes={compiledResponse}
          />
        </div>
        <h2>Description</h2>
        <GeneratedContents
          className="prev"
          id="description"
          dataRes={description}
        />
        <h2>Refined Description</h2>
        <GeneratedContents
          className="prev"
          id="refinedDescription"
          dataRes={refinedDescription}
        />
        <h2>Initial HTML</h2>
        <GeneratedContents
          className="prev"
          id="initialHtml"
          dataRes={initialHtml}
        />
        <h2>Refined HTML</h2>
        <GeneratedContents
          className="prev"
          id="refinedHtml"
          dataRes={refinedHtml}
        />
        <div className="Convert">
          {/* disabled until message is not equal to completed */}
          <button
            disabled={message !== "completed"}
            style={{ backgroundColor: "#ffcc00" }}
            onClick={Downloadcode}
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
}
