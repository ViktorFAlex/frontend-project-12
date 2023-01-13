import { useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import {
  Modal, FormGroup, FormControl, Button, Form,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

const Rename = ({
  onHide, handler, item, names,
}) => {
  const inputRef = useRef();
  const { t } = useTranslation();
  useEffect(() => {
    inputRef.current.focus();
    inputRef.current.select();
  }, []);
  const { name: prevName, id } = item;
  const formik = useFormik({
    initialValues: {
      name: prevName,
    },
    validateOnChange: false,
    validationSchema: Yup.object().shape({
      name: Yup.string()
        .min(3, t('validators.name'))
        .max(20, t('validators.name'))
        .notOneOf(names, t('validators.unique'))
        .required(t('validators.required')),
    }),
    onSubmit: ({ name }) => {
      handler({ name, id });
      onHide();
    },
  });

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('channels.rename')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <FormControl
              ref={inputRef}
              id="name"
              className="mb-2"
              onChange={formik.handleChange}
              name="name"
              value={formik.values.name}
              isInvalid={formik.touched.name && formik.errors.name}
              disabled={formik.isSubmitting}
            />
            <Form.Label visuallyHidden htmlFor="name">{t('channels.name')}</Form.Label>
            <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
          </FormGroup>
          <div className="d-flex justify-content-end">
            <Button
              disabled={formik.isSubmitting}
              type="button"
              variant="secondary"
              className="me-2"
              onClick={onHide}
            >
              {t('elements.cancel')}
            </Button>
            <Button
              disabled={formik.isSubmitting}
              type="submit"
              variant="primary"
            >
              {t('elements.send')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Rename;
