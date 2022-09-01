# React Quill Editor (SSR)

## Next.js + React-Quill + Image Resize Module

![Animation](https://user-images.githubusercontent.com/69332203/187809623-b3609c45-f751-48c2-b027-adaab6f6c8e2.gif)

### React Quill, Image Resize Module 설치

```sh
npm install react-quill
npm install quill-image-resize
```

### quillEditor.js

✔ quill editor는 ssr을 지원해주지 않음

1. `dynamic`을 사용해 동적으로 `import`
2. `ssr: false` 옵션 추가

```JavaScript
const ReactQuillComponent = dynamic(
   async () => {
      const { default: Rq } = await import("react-quill");
      const { default: ImageResize } = await import("quill-image-resize");
      ...
   },
   { ssr: false, }
);
```

✔ module을 추가해주기 위해선 register 필요

1. `default` 키워드로 import한 모듈의 이름을 변수로 선언해서 사용 가능
2. `Rq.Quill.register`로 모듈 추가

```JavaScript
Rq.Quill.register("modules/imageResize", ImageResize);
```

✔ return 값이 실제로 뿌려지는 editor component

1. props를 사용해 기본 module에 `imageResize` 모듈을 추가 후 return

```JavaScript
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
   return
   <Rq ref="{forwardedRef}" {...newProps} />;
};
```

✔ ReactQuillComponent 옵션

1. onChange: editor param의 editor.getHTML()을 통해 editor의 HTML 값을 얻음
2. forwardedRef: ref값 설정, editor에 접근 가능

```sh
<ReactQuillComponent
   ...
   onChange={(content, delta, source, editor) => setValue(editor.getHTML())}
   forwardedRef={editorRef} />
```

### index. js

✔ useRef를 사용해 editor에 접근

1. `editorRef.current.focus()`로 editor에 focus를 줌

```JavaScript
const editorRef = useRef(null);
...
editorRef.current.focus();
```

✔ editor 내용 validation

1. enter값, 공백 등 내용이 없는 경우 정규식 표현 `/<(\/p|p|\/br|br)([^>]*)>|(\s*)/g`

```JavaScript
if (!value.replace(/<(\/p|p|\/br|br)([^>]*)>|(\s*)/g, "")) {
   alert("Please enter your content...");
   ...
}
```

### 보완점

1. image를 리사이징해서 저장했을 경우 html 값은 제대로 저장
   but, 글 수정 시 html을 불러오면 image의 style이 적용되지 않고 원본으로 나타남
2. editor 크기를 고정 시 image resize icon이 editor 밖으로 표시됨

### Ref

> https://github.com/zenoamaro/react-quill
