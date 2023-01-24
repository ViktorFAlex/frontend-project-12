import { useFormik } from 'formik';
import { useRef, useEffect } from 'react';
import {
  Modal, FormGroup, FormControl, Button, Form,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import handlers from '../../utils/socket';

const Rename = ({ onHide, item, names }) => {
  const inputRef = useRef();
  const { t } = useTranslation();
  const { name: prevName, id } = item;
  const formik = useFormik({
    initialValues: {
      name: prevName,
    },
    validateOnChange: false,
    validationSchema: Yup.object().shape({
      name: Yup.string()
        .min(3, 'validators.name')
        .max(20, 'validators.name')
        .notOneOf(names, 'validators.unique')
        .required('validators.required'),
    }),
    onSubmit: async ({ name }) => {
      try {
        await handlers.renameChannel({ id, name });
        onHide();
      } catch (e) {
        console.error(e.message);
        throw e;
      } finally {
        formik.setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    inputRef.current.select();
  }, [formik.isSubmitting]);

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('channels.rename')}</Modal.Title>
      </Modal.Header>
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
                onClick={onHide}
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
    </Modal>
  );
};

export default Rename;
