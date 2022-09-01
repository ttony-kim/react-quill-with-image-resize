import { useRef, useState } from "react";
import QuillComponent from "../components/quillEditor";

export default function Home() {
  const editorRef = useRef(null);
  const [value, setValue] = useState("");

  const onClick = () => {
    if (!value.replace(/<(\/p|p|\/br|br)([^>]*)>|(\s*)/g, "")) {
      alert("Please enter your content...");
      editorRef.current.focus();
      return;
    }
    console.log(value);
  };

  return (
    <div style={{ width: "80%", margin: "auto" }}>
      <h1 style={{ textAlign: "center" }}> Quill Editor </h1>
      <QuillComponent value={value} setValue={setValue} editorRef={editorRef} />
      <div>
        <button onClick={onClick} style={{ marginTop: "50px", float: "right" }}>
          Submit
        </button>
      </div>
    </div>
  );
}
