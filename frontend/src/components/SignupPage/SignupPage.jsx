import axios from 'axios';
import { useFormik } from 'formik';
import React, { useRef, useEffect } from 'react';
import {
  Card, Form, Button, FloatingLabel,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import PageTemplate from '../common-components/PageTemplate';
import img from '../../assets/signup.jpg';
import useAuthContext from '../../hooks/useAuthContext';
import routes from '../../routes/routes';
import notifiers from '../../toasts/index';

const SignupPage = () => {
  const { apiRoutes, appRoutes } = routes;
  const auth = useAuthContext();
  const { t } = useTranslation();

  const location = useLocation();
  const navigate = useNavigate();

  const userNameInput = useRef();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object().shape({
      username: Yup.string()
        .min(3, 'errors.name')
        .max(20, 'errors.name')
        .required('errors.required'),
      password: Yup.string()
        .min(6, 'errors.password')
        .required('errors.required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'errors.confirmPassword')
        .required('errors.confirmPassword'),
    }),
    onSubmit: async (values) => {
      try {
        const res = await axios.post(apiRoutes.signupPath(), values);
        auth.logIn(res.data);

        const { from } = location.state || { from: { pathname: appRoutes.main } };
        navigate(from);

        notifiers.loggedIn(t);
      } catch (error) {
        if (error.isAxiosError && error?.response?.status === 409) {
          const { response: { statusText } } = error;
          formik.errors.form = statusText;
          notifiers.error(t, statusText);
        } else {
          notifiers.error(t, 'networkError');
        }
      }
    },
  });

  useEffect(() => {
    userNameInput.current.select();
  }, [formik.isSubmitting]);

  return (
    <PageTemplate>
      <Card className="shadow-sm">
        <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
          <div>
            <img
              src={img}
              className="rounded-circle"
              alt={t('elements.signup')}
            />
          </div>
          <Form className="w-50" onSubmit={formik.handleSubmit}>
            <fieldset disabled={formik.isSubmitting}>
              <h1 className="text-center mb-4">Регистрация</h1>
              <FloatingLabel
                label={t('elements.username')}
                controlId="username"
                className="mb-3"
              >
                <Form.Control
                  name="username"
                  autoComplete="username"
                  required
                  placeholder={t('errors.name')}
                  value={formik.values.username}
                  ref={userNameInput}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={
                  (formik.touched.username
                  && formik.errors.username)
                  || formik.errors.form
                }
                />
                <Form.Control.Feedback
                  placement="right"
                  type="invalid"
                  tooltip={!!formik.errors.username || !!formik.errors.form}
                >
                  {t(formik.errors.username)}
                </Form.Control.Feedback>
              </FloatingLabel>
              <FloatingLabel
                label={t('elements.password')}
                controlId="password"
                className="mb-3"
              >
                <Form.Control
                  name="password"
                  autoComplete="new-password"
                  required
                  aria-describedby="passwordHelpBlock"
                  placeholder={t('errors.password')}
                  type="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={
                  (formik.touched.password
                  && formik.errors.password)
                  || formik.errors.form
                  }
                />
                <Form.Control.Feedback
                  type="invalid"
                  tooltip={!!formik.errors.password || !!formik.errors.form}
                >
                  {t(formik.errors.password)}
                </Form.Control.Feedback>
              </FloatingLabel>
              <FloatingLabel
                label={t('elements.confirmPassword')}
                className="mb-4"
                controlId="confirmPassword"
              >
                <Form.Control
                  name="confirmPassword"
                  autoComplete="new-password"
                  required
                  placeholder={t('errors.confirmPassword')}
                  type="password"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={
                  (formik.errors.confirmPassword
                  && formik.values.password
                  && formik.touched.confirmPassword)
                  || formik.errors.form
                }
                />
                <Form.Control.Feedback
                  type="invalid"
                  tooltip={!!formik.errors.confirmPassword || !!formik.errors.form}
                >
                  {t(formik.errors.confirmPassword) || t(`errors.${formik.errors.form}`)}
                </Form.Control.Feedback>
              </FloatingLabel>
              <Button variant="outline-primary" type="submit" className="w-100">{t('elements.toSignup')}</Button>
            </fieldset>
          </Form>
        </Card.Body>
        <Card.Footer className="p-4">
          <div className="text-center">
            {' '}
            <span>{t('elements.signedUp')}</span>
            {' '}
            <a href={appRoutes.main}>{t('elements.toLogin')}</a>
          </div>
        </Card.Footer>
      </Card>
    </PageTemplate>
  );
};

export default SignupPage;
