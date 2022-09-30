import React from 'react';
import { Form, Input, InputNumber } from 'antd';

export default function EditableCell({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) {
  let inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  if (dataIndex === 'description') {
    inputNode = <Input.TextArea autosize={{ minRows: 2, maxRows: 6 }} />;
  }
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
}
