import { useRef, useEffect } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import img from '../../../../../../../assets/arrow-right-square.svg';
import handlers from '../../../../../../../utils/socket';

const MessageArea = ({ id, author }) => {
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  });
  const { t } = useTranslation();
  const formik = useFormik({
    initialValues: {
      body: '',
    },
    validationSchema: Yup.object().shape({
      body: Yup.string()
        .required(),
    }),
    onSubmit: async ({ body }) => {
      try {
        await handlers.addMessage({ message: body, channelId: id, author });
        formik.values.body = '';
      } catch (e) {
        console.error(e.message);
        throw e;
      } finally {
        formik.setSubmitting(false);
      }
    },
  });
  return (
    <div className="mt-auto px-5 py-3">
      <Form noValidate className="py-1 border rounded-2" onSubmit={formik.handleSubmit}>
        <fieldset disabled={formik.isSubmitting}>
          <InputGroup hasValidation>
            <Form.Control
              name="body"
              ref={inputRef}
              aria-label={t('messages.newMessage')}
              placeholder={t('messages.printMessage')}
              className="border-0 p-0 ps-2"
              value={formik.values.body}
              onChange={formik.handleChange}
            />
            <Button type="submit" variant="" className="button-group-vertical">
              <img alt={t('elements.send')} src={img} />
              <span className="visually-hidden">{t('elements.send')}</span>
            </Button>
          </InputGroup>
        </fieldset>
      </Form>
    </div>
  );
};

export default MessageArea;
