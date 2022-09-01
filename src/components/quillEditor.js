import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "image",
  "link",
  "color",
  "background",
];

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["image", "link"],
    [{ color: [] }, { background: [] }],
  ],
  clipboard: {
    matchVisual: false,
  },
};

const ReactQuillComponent = dynamic(
  async () => {
    const { default: Rq } = await import("react-quill");
    const { default: ImageResize } = await import("quill-image-resize");
    Rq.Quill.register("modules/imageResize", ImageResize);

    return function forwardRef({ forwardedRef, ...props }) {
      const newProps = {
        ...props,
        modules: {
          ...props.modules,
          imageResize: {
            parchment: Rq.Quill.import("parchment"),
            modules: ["Resize"],
          },
        },
      };
      return <Rq ref={forwardedRef} {...newProps} />;
    };
  },
  {
    ssr: false,
    loading: () => <div>Loading</div>,
  }
);

export default function QuillComponent({ value, setValue, editorRef }) {
  return (
    <ReactQuillComponent
      modules={modules}
      formats={formats}
      theme="snow"
      value={value}
      onChange={(content, delta, source, editor) => setValue(editor.getHTML())}
      style={{ height: 450 }}
      forwardedRef={editorRef}
    />
  );
}
