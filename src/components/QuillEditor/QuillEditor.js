import React, { useRef, useMemo } from 'react';
import ReactQuill from 'react-quill';
import 'quill/dist/quill.snow.css'; // Add css for snow theme
import ImageResize from 'quill-image-resize-module-react';

const { Quill } = ReactQuill;
Quill.register('modules/imageResize', ImageResize);

export default function QuillEditor({ content, setContent }) {
  const quillRef = useRef();

  const imageHandler = () => {
    const editor = quillRef.current.getEditor(); // get quill eidtor by reference
    const range = editor.getSelection(); // get the index of pointer in editor
    var value = prompt('please copy paste the image url here.');
    if (value) {
      editor.insertEmbed(range, 'image', value);
    }
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          ['bold', 'italic', 'underline', 'strike'], // toggled buttons
          ['link', 'image', 'video'],
          [{ header: [1, 2, 3, 4, 5, 6] }], // custom button values
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
          [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
          [{ direction: 'rtl' }], // text direction
          [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
          ['blockquote', 'code-block'],
          [{ color: [] }, { background: [] }], // dropdown with defaults from theme
          [{ font: [] }],
          [{ align: [] }],
          ['clean'], // remove formatting button
          ['Resize', 'DisplaySize', 'Toolbar'], // resize
        ],
        handlers: {
          image: imageHandler,
        },
      },
      imageResize: {
        parchment: Quill.import('parchment'),
        modules: ['Resize', 'DisplaySize'],
      },
    }),
    []
  );

  return (
    <>
      <div className="text-editor">
        <ReactQuill
          ref={quillRef}
          theme="snow"
          value={content}
          onChange={setContent}
          modules={modules}
          placeholder="Start to write your article!"
        />
      </div>
      {/* <div dangerouslySetInnerHTML={{ __html: value }}></div> --- use for parse html string to jsx*/}
    </>
  );
}
