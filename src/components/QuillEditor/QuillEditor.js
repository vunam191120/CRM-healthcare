import React, { useRef, useMemo } from 'react';
import { BsCardImage } from 'react-icons/bs';
// import { IoImagesSharp } from 'react-icons/io5';
import ReactQuill from 'react-quill';
import 'quill/dist/quill.snow.css'; // Add css for snow theme
import 'react-quill/dist/quill.core.css';
import ImageResize from 'quill-image-resize-module-react';
import { useDispatch } from 'react-redux';
import { message } from 'antd';

import articleAPI from '../../api/article';
import { appendDoc } from '../../store/slices/articlesSlice';

const { Quill } = ReactQuill;
Quill.register('modules/imageResize', ImageResize);

// Add fonts to whitelist and register them
const Font = Quill.import('formats/font');
Font.whitelist = [
  'arial',
  'comic-sans',
  'courier-new',
  'georgia',
  'helvetica',
  'lucida',
];
Quill.register(Font, true);

// Add sizes to whitelist and register them
const Size = Quill.import('formats/size');
Size.whitelist = ['extra-small', 'small', 'medium', 'large'];
Quill.register(Size, true);

// Custom Undo button icon component for Quill editor. You can import it directly
// from 'quill/assets/icons/undo.svg' but I found that a number of loaders do not
// handle them correctly
const CustomUndo = () => (
  <svg viewBox="0 0 18 18">
    <polygon className="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10" />
    <path
      className="ql-stroke"
      d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9"
    />
  </svg>
);

// Redo button icon component for Quill editor
const CustomRedo = () => (
  <svg viewBox="0 0 18 18">
    <polygon className="ql-fill ql-stroke" points="12 10 14 12 16 10 12 10" />
    <path
      className="ql-stroke"
      d="M9.91,13.91A4.6,4.6,0,0,1,9,14a5,5,0,1,1,5-5"
    />
  </svg>
);

const CustomImage2 = () => <BsCardImage className="ql-custom-icon" />;
// const CustomImage3 = () => <IoImagesSharp className="ql-custom-icon" />;

export default function QuillEditor({ content, action, keyContent }) {
  const quillRef = useRef();
  const dispatch = useDispatch();
  /** 3 types mode upload image and append it to editor
   *  Mode 1: Upload directly to server and get url
   *  Mode 2: Paste url image in other site
   *  Mode 3: Can review all previously posted photos and copy images from them
   */

  function undoChange() {
    quillRef.current.getEditor().history.undo();
  }
  function redoChange() {
    quillRef.current.getEditor().history.redo();
  }

  // Modules object for setting up the Quill editor
  const modules = useMemo(() => {
    const imageHandler = async () => {
      const input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.setAttribute('accept', 'image/*');
      input.click();
      input.onchange = async () => {
        var file = input && input.files ? input.files[0] : null;
        const formData = new FormData();
        formData.append('article', file);
        let quillObj = quillRef.current.getEditor();
        await articleAPI
          .uploadDocument(formData)
          .then((res) => {
            let data = res.data.data[0].url;
            const range = quillObj.getSelection();
            quillObj.insertEmbed(range.index, 'image', data);
            dispatch(appendDoc(data));
          })
          .catch((err) => {
            message.error('Cannot upload file');
            return false;
          });
      };
    };

    return {
      toolbar: {
        container: '#toolbar',
        handlers: {
          image: imageHandler,
          undo: undoChange,
          redo: redoChange,
          image2: () => {
            const editor = quillRef.current.getEditor(); // get quill eidtor by reference
            const range = editor.getSelection(); // get the index of pointer in editor
            var value = prompt('please copy paste the image url here.');
            if (value) {
              editor.insertEmbed(range, 'image', value);
            }
          },
        },
      },
      imageResize: {
        parchment: Quill.import('parchment'),
        modules: ['Resize', 'DisplaySize'],
      },
      history: {
        delay: 500,
        maxStack: 100,
        userOnly: true,
      },
    };
  }, [dispatch]);

  // Formats objects for setting up the Quill editor
  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'align',
    'strike',
    'script',
    'blockquote',
    'background',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'color',
    'code-block',
  ];

  // const modules = useMemo(
  //   () => ({
  //     toolbar: {
  //       container: [
  //         // [{ uploadmode: ['Select image before', 'Select image in computer'] }],
  //         ['bold', 'italic', 'underline', 'strike'], // toggled buttons
  //         ['link', 'image', 'video'],
  //         [{ list: 'ordered' }, { list: 'bullet' }],
  //         [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
  //         [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
  //         [{ direction: 'rtl' }], // text direction
  //         [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
  //         ['blockquote', 'code-block'],
  //         [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  //         [{ font: [] }],
  //         [{ align: [] }],
  //         ['clean'], // remove formatting button
  //         // ['Resize', 'DisplaySize', 'Toolbar'], // resize
  //       ],
  //       handlers: {
  //         image: imageHandler,
  //         // uploadmode: uploadmodeHandler,
  //       },
  //     },
  //     imageResize: {
  //       parchment: Quill.import('parchment'),
  //       modules: ['Resize', 'DisplaySize'],
  //     },
  //   }),
  //   []
  // );

  const QuillToolbar = () => (
    <div id="toolbar">
      <span className="ql-formats">
        <select className="ql-font" defaultValue="arial">
          <option value="arial">Arial</option>
          <option value="comic-sans">Comic Sans</option>
          <option value="courier-new">Courier New</option>
          <option value="georgia">Georgia</option>
          <option value="helvetica">Helvetica</option>
          <option value="lucida">Lucida</option>
        </select>
        <select className="ql-size" defaultValue="medium">
          <option value="large">Large</option>
          <option value="medium">Medium</option>
          <option value="small">Small</option>
          <option value="extra-small">Extra small</option>
        </select>
        <select className="ql-header" defaultValue="3">
          <option value="1">Heading 1</option>
          <option value="2">Heading 2</option>
          <option value="3">Heading 3</option>
          <option value="4">Heading 4</option>
          <option value="5">Heading 5</option>
        </select>
      </span>
      <span className="ql-formats">
        <button className="ql-bold" />
        <button className="ql-italic" />
        <button className="ql-underline" />
        <button className="ql-strike" />
      </span>
      <span className="ql-formats">
        <button className="ql-list" value="ordered" />
        <button className="ql-list" value="bullet" />
        <button className="ql-indent" value="-1" />
        <button className="ql-indent" value="+1" />
      </span>
      <span className="ql-formats">
        <button className="ql-script" value="super" />
        <button className="ql-script" value="sub" />
        <button className="ql-blockquote" />
        <button className="ql-direction" />
      </span>
      <span className="ql-formats">
        <select className="ql-align" />
        <select className="ql-color" />
        <select className="ql-background" />
      </span>
      <span className="ql-formats">
        <button className="ql-formula" />
        <button className="ql-code-block" />
        <button className="ql-clean" />
      </span>
      <span className="ql-formats">
        <button className="ql-undo">
          <CustomUndo />
        </button>
        <button className="ql-redo">
          <CustomRedo />
        </button>
      </span>
      <span className="ql-formats">
        <button className="ql-link" />
        <button className="ql-video" />
        <button className="ql-image" />
      </span>
      <span className="ql-formats">
        <button className="ql-image2 ql-custom-button">
          <CustomImage2 />
        </button>
        {/* <button className="ql-image3 ql-custom-button">
          <CustomImage3 />
        </button> */}
      </span>
    </div>
  );

  const handleSetContent = (value) => {
    const obj = {};
    obj[keyContent] = value;
    return action(obj);
  };

  return (
    <>
      <div className="text-editor">
        {QuillToolbar()}
        <ReactQuill
          ref={quillRef}
          theme="snow"
          value={content}
          onChange={(value) => dispatch(handleSetContent(value))}
          modules={modules}
          formats={formats}
          placeholder="Start to write your article!"
        />
      </div>
    </>
  );
}
