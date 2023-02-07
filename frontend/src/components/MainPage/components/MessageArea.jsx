import { useRef, useEffect } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import filter from '../../../assets/profanityFilter';
import img from '../../../assets/arrow-right-square.svg';
import notifiers from '../../../toasts/index';
import selectors from '../../../slices/selectors';
import { useChatApiContext, useAuthContext } from '../../../hooks/index';

const MessageArea = () => {
  const { t } = useTranslation();
  const auth = useAuthContext();
  const chatApi = useChatApiContext();
  const author = auth.loginStatus.username;

  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  });

  const id = useSelector(selectors.selectActiveChannelId);

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    validationSchema: Yup.object().shape({
      message: Yup.string()
        .required()
        .matches(/\S+/),
    }),
    onSubmit: async ({ message }) => {
      try {
        await chatApi.addMessage({ message: filter.clean(message), channelId: id, author });
        formik.values.message = '';
      } catch (e) {
        notifiers.error(t, 'networkError');
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
              name="message"
              ref={inputRef}
              aria-label={t('messages.newMessage')}
              placeholder={t('messages.printMessage')}
              className="border-0 p-0 ps-2"
              value={formik.values.message}
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
