import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import filter from '../assets/profanityFilter';
import { selectors } from '../slices/messagesSlice';
import img from '../assets/arrow-right-square.svg';

const ChatField = ({ channel, handler }) => {
  const { t } = useTranslation();
  const scrollRef = useRef();
  const inputRef = useRef();
  useEffect(() => {
    scrollRef.current?.scrollIntoView();
    inputRef.current.focus();
  });
  const { id: channelId, name } = channel;
  const messages = useSelector(selectors.selectAll);
  const currentChannelMessages = messages.filter((message) => message.channelId === channelId);
  const currentUserId = localStorage.getItem('userId');
  const currentUser = JSON.parse(currentUserId);
  const { username: currentUserName } = currentUser;
  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: async ({ body }) => {
      try {
        await handler({ message: body, channelId, author: currentUserName });
        formik.values.body = '';
        inputRef.current.focus();
      } catch (e) {
        console.error(e.message);
        throw e;
      } finally {
        formik.setSubmitting(false);
      }
    },
  });

  const renderChannelName = () => (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
        <b>
          {'# '}
          {filter.clean(name)}
        </b>
      </p>
      <span className="text-muted">
        {t('messages.total', { count: currentChannelMessages.length })}
      </span>
    </div>
  );

  const renderMessages = () => (
    currentChannelMessages.map(({ message, id, author }) => (
      <div className="text-break mb-2" key={id} ref={scrollRef}>
        <b>{author}</b>
        {': '}
        {filter.clean(message)}
      </div>
    ))
  );

  const renderMessageArea = () => (
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
              <span className="visually-hidden">Отправить</span>
            </Button>
          </InputGroup>
        </fieldset>
      </Form>
    </div>
  );

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        {renderChannelName()}
        <div id="messages-box" className="chat-messages overflow-auto px-5">
          {renderMessages()}
        </div>
        {renderMessageArea()}
      </div>
    </div>
  );
};

export default ChatField;
