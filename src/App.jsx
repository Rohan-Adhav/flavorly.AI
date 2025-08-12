import Header from "/components/Header"
import Main from "/components/Main"
export default function App(){
  return(
    <>
    <Header/>
    <Main/>
    </>
  )
}

// import React, { useState } from "react";
// import { generateText } from "./ai";

// function App() {
//   const [prompt, setPrompt] = useState("");
//   const [output, setOutput] = useState("");
//   const [loading, setLoading] = useState(false);

//   async function handleSubmit(e) {
//     e.preventDefault();
//     setLoading(true);
//     setOutput("Generating...");

//     const result = await generateText(prompt);
//     setOutput(result);
//     setLoading(false);
//   }

//   return (
//     <div style={{ padding: "20px", fontFamily: "Arial" }}>
//       <h1>🧠 Hugging Face LLaMA 3 Prompt Tester</h1>
//       <form onSubmit={handleSubmit}>
//         <textarea
//           rows="5"
//           cols="60"
//           placeholder="Enter your prompt here..."
//           value={prompt}
//           onChange={(e) => setPrompt(e.target.value)}
//         />
//         <br />
//         <button type="submit" disabled={loading}>
//           {loading ? "Loading..." : "Generate"}
//         </button>
//       </form>
//       <div style={{ marginTop: "20px", whiteSpace: "pre-wrap" }}>
//         <strong>Response:</strong>
//         <p>{output}</p>
//       </div>
//     </div>
//   );
// }

// export default App;
