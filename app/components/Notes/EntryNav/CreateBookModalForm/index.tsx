import React from 'react';
import { Form, Input, message, Modal } from 'antd';

interface Values {
  title: string;
}

interface CollectionCreateFormProps {
  visible: boolean;
  onCreate: (values: Values) => void;
  onCancel: () => void;
}

export default function CreateBookModalForm({
  visible,
  onCreate,
  onCancel
}: CollectionCreateFormProps) {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="Create New Book"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            form.resetFields();
            // TODO: fix this type matching issue with ant <Store> vs <Values>
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            onCreate(values);
            return null;
          })
          .catch(err => {
            message.warning(`Create Book failed: ${err}`);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{}}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: 'Please input the book title!' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}
