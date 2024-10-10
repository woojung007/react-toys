import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Editor } from "@ckeditor/ckeditor5-core"; // Editor 타입 import
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { EventInfo } from "@ckeditor/ckeditor5-utils"; // EventInfo 타입 import
import { useState } from "react";

export default function CkEditorPage() {
  const [editorData, setEditorData] = useState<string>(
    `<h1>CKEditor 5 Test</h1>
     <p>This is a sample content with <strong>bold</strong> and <em>italic</em> text.</p>
     <ul>
       <li>First item</li>
       <li>Second item</li>
       <li>Third item</li>
     </ul>
     <p>Here is a link: <a href="https://ckeditor.com">CKEditor Official Site</a></p>`
  );

  const onChangeEditorData = (event: EventInfo, editor: Editor) => {
    const data = editor.getData();
    setEditorData(data);
  };

  return (
    <div>
      <h2>CKEditor 5 Viewer</h2>
      <CKEditor
        editor={ClassicEditor}
        config={{
          // plugins: [Highlight], // Highlight 플러그인 추가
          toolbar: {
            items: [
              "heading",
              "|",
              "bold",
              "italic",
              "link",
              "|",
              "undo",
              "redo",
              "-",
              "bulletedList",
              "numberedList",
              "blockQuote",
            ],
            shouldNotGroupWhenFull: true,
          },
          placeholder: "Type your content here...", // 플레이스홀더 추가
        }}
        data={editorData}
        onChange={onChangeEditorData}
      />

      <CKEditor
        editor={ClassicEditor}
        data={editorData}
        config={{
          toolbar: [], // 툴바를 숨김으로써 편집 기능을 비활성화
        }}
        disabled={true} // ReadOnly 모드
      />
    </div>
  );
}
