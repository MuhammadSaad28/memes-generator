import React, { useState } from "react";
import axios from "axios";
import "./Memes.css";

const MemeGenerator = () => {
  const [memeUrl, setMemeUrl] = useState(null);
  const [text0, setText0] = useState("");
  const [text1, setText1] = useState("");
  const [loading, setLoading] = useState(false);

  const [selectedTemplate, setSelectedTemplate] = useState(
    "Bernie_I_Am_Once_Again_Asking_For_Your_Support"
  ); // Default template
//   6bdf0be52bmsh962f1cc3c036963p1b21fajsne6972bffb54d
  const fetchMeme = async () => {
    setLoading(true);
    const options = {
      method: "POST",
      url: `https://meme-generator-and-template-database.p.rapidapi.com/template/${selectedTemplate}`,
      headers: {
        "x-rapidapi-key": "dd2d631513msh32f9a396dc4183bp140202jsnbc67f0237170",
        "x-rapidapi-host":
          "meme-generator-and-template-database.p.rapidapi.com",
        "Content-Type": "application/json",
      },
      data: {
        text0: { text: text0, font_size: 33, font: "kanit" },
        text1: { text: text1, font_size: 30 },
      },
      responseType: "blob",
    };

    try {
      const response = await axios.request(options);
      const imageUrl = URL.createObjectURL(response.data);
      setMemeUrl(imageUrl);
    } catch (error) {
      console.error("Error fetching meme data:", error);
    } finally {
      setLoading(false);
    }
  };

  // In your render return statement, you can have a select dropdown for templates
  return (
    <div>
      <h2>Meme Generator</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetchMeme();
        }}
      >
        <label>
          Select Template:
          <select
            onChange={(e) => setSelectedTemplate(e.target.value)}
            value={selectedTemplate}
          >
            <option value="Bernie_I_Am_Once_Again_Asking_For_Your_Support">
              Bernie
            </option>
            <option value="Drake_Hotline_Bling">Drake</option>
            <option value="Distracted_Boyfriend">Distracted Boyfriend</option>
            <option value="Two_Buttons">Two Buttons</option>
            <option value="Change_My_Mind">Change My Mind</option>
            <option value="Expanding_Brain">Expanding Brain</option>
            <option value="Is_This_a_Pigeon?">Is This a Pigeon?</option>
            <option value="Surprised_Pikachu">Surprised Pikachu</option>
            <option value="Arthur_Fist">Arthur Fist</option>
            <option value="One_Does_Not_Simply">One Does Not Simply</option>
            <option value="The_Rock_Driving">The Rock Driving</option>
            <option value="Grumpy_Cat">Grumpy Cat</option>
            <option value="Batman_Slapping_Robin">Batman Slapping Robin</option>
            <option value="Evil_Kermit">Evil Kermit</option>
            <option value="This_Is_Fine">This Is Fine</option>
            <option value="Doge">Doge</option>
            <option value="Success_Kid">Success Kid</option>
            <option value="Hide_the_Pain_Harold">Hide the Pain Harold</option>
            <option value="Epic_Handshake">Epic Handshake</option>
            <option value="Sad_Keanu">Sad Keanu</option>
          </select>
        </label>
        <br />
        <label>
          Text1 (optional):
          <input
            type="text"
            value={text0}
            onChange={(e) => setText0(e.target.value)}
          />
        </label>
        <br />
        <label>
          Text2 (optional):
          <input
            type="text"
            value={text1}
            onChange={(e) => setText1(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Generate Meme</button>
      </form>

      {loading ? (
        <div className="loader">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
      ) : (
        memeUrl && <img src={memeUrl} alt="Generated Meme" />
      )}
    </div>
  );
};

export default MemeGenerator;