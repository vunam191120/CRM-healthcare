import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function QuillEditor() {
  const [value, setValue] = useState('');
  var toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'], // toggled buttons
    ['link', 'image'],
    [{ header: 1 }, { header: 2 }], // custom button values
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
  ];

  var bindings = {
    tab: {
      key: 9,
      handler: function (range, text) {
        // Handle tab
        console.log('heloo', range, text);
      },
    },
  };

  return (
    <ReactQuill
      modules={{
        toolbar: toolbarOptions,
      }}
      theme="snow"
      value={value}
      onChange={setValue}
      keyboard={{
        bindings: bindings,
      }}
    />
  );
}
