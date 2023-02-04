import { useFormik } from 'formik';
import { useRef, useEffect } from 'react';
import {
  Modal, FormGroup, FormControl, Button, Form,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import selectors from '../../../slices/selectors';
import { useChatApiContext, useModalContext } from '../../../hooks/index';
import filter from '../../../assets/profanityFilter';

const Add = () => {
  const { t } = useTranslation();
  const chatApi = useChatApiContext();
  const { handleHide } = useModalContext();

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  });

  const channelNames = useSelector(selectors.selectChannelsByNames);
  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validateOnChange: false,
    validationSchema: Yup.object().shape({
      name: Yup.string()
        .min(3, 'errors.name')
        .max(20, 'errors.name')
        .notOneOf(channelNames, 'errors.unique')
        .required('errors.required'),
    }),
    onSubmit: async ({ name }) => {
      try {
        const cleanName = filter.clean(name); // can send two equal dirty words;
        await chatApi.addChannel({ name: cleanName }, t);
        handleHide();
      } catch (e) {
        console.error(e.message);
        throw e;
      } finally {
        formik.setSubmitting(false);
      }
    },
  });

  return (
    <Modal.Body>
      <Form onSubmit={formik.handleSubmit}>
        <fieldset disabled={formik.isSubmitting}>
          <FormGroup>
            <FormControl
              ref={inputRef}
              id="name"
              className="mb-2"
              onChange={formik.handleChange}
              name="name"
              value={formik.values.name}
              isInvalid={formik.touched.name && formik.errors.name}
            />
            <Form.Label visuallyHidden htmlFor="name">{t('channels.name')}</Form.Label>
            <Form.Control.Feedback type="invalid">{t(formik.errors.name)}</Form.Control.Feedback>
          </FormGroup>
          <div className="d-flex justify-content-end">
            <Button
              type="button"
              variant="secondary"
              className="me-2"
              onClick={handleHide}
            >
              {t('elements.cancel')}
            </Button>
            <Button
              type="submit"
              variant="primary"
            >
              {t('elements.send')}
            </Button>
          </div>
        </fieldset>
      </Form>
    </Modal.Body>
  );
};

export default Add;
