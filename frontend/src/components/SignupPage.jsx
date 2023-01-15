import axios from 'axios';
import React, { useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import {
  Card, Form, Button, FloatingLabel,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import notifiers from '../toasts/index';
import useAuthContext from '../hooks/useCustomContext.jsx';
import PageTemplate from './PageTemplate';
import avatar from '../assets/signup.jpg';
import routes from '../routes.js';

const SignupPage = () => {
  const auth = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const userNameInput = useRef();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object().shape({
      username: Yup.string()
        .min(3, t('validators.name'))
        .max(20, t('validators.name'))
        .required(t('validators.required')),
      password: Yup.string()
        .min(6, t('validators.password'))
        .required(t('validators.required')),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], t('validators.confirmPassword'))
        .required(t('validators.confirmPassword')),
    }),
    onSubmit: async (values) => {
      try {
        const res = await axios.post(routes.signupPath(), values);
        localStorage.setItem('userId', JSON.stringify(res.data));
        auth.logIn();
        const { from } = location.state || { from: { pathname: '/' } };
        navigate(from);
        notifiers.signedUp(t);
      } catch (err) {
        if (err.isAxiosError && err.response.status === 409) {
          formik.errors.form = t('validators.userExists');
          notifiers.userExists(t);
          userNameInput.current.select();
          return;
        }
        throw err;
      }
    },
  });

  useEffect(() => {
    userNameInput.current.focus();
  }, []);

  return (
    <PageTemplate>
      <Card className="shadow-sm">
        <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
          <div>
            <img
              src={avatar}
              className="rounded-circle"
              alt={t('elements.signup')}
            />
          </div>
          <Form className="w-50" onSubmit={formik.handleSubmit}>
            <h1 className="text-center mb-4">Регистрация</h1>
            <FloatingLabel
              label={t('elements.username')}
              className="mb-3"
            >
              <Form.Control
                id="username"
                name="username"
                autoComplete="username"
                required
                placeholder={t('elements.username')}
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
                {formik.errors.username}
              </Form.Control.Feedback>
            </FloatingLabel>
            <FloatingLabel
              label={t('elements.password')}
              className="mb-3"
            >
              <Form.Control
                id="password"
                name="password"
                autoComplete="new-password"
                required
                aria-describedby="passwordHelp"
                placeholder={t('elements.password')}
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
                {formik.errors.password}
              </Form.Control.Feedback>
            </FloatingLabel>
            <FloatingLabel
              label={t('elements.confirmPassword')}
              className="mb-4"
            >
              <Form.Control
                id="confirmPassword"
                name="confirmPassword"
                autoComplete="new-password"
                required
                aria-describedby="passwordHelp"
                placeholder={t('elements.confirmPassword')}
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
                {formik.errors.confirmPassword || formik.errors.form}
              </Form.Control.Feedback>
            </FloatingLabel>
            <Button variant="outline-primary" type="submit" className="w-100">{t('elements.toSignup')}</Button>
          </Form>
        </Card.Body>
        <Card.Footer className="p-4">
          <div className="text-center">
            {' '}
            <span>{t('elements.signedUp')}</span>
            {' '}
            <a href="/login">{t('elements.toLogin')}</a>
          </div>
        </Card.Footer>
      </Card>
    </PageTemplate>
  );
};

export default SignupPage;
