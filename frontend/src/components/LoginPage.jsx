import axios from 'axios';
import React, { useRef, useEffect, useState } from 'react';
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
import avatar from '../assets/login.jpg';
import routes from '../routes.js';

const LoginPage = () => {
  const auth = useAuthContext();
  const userNameInput = useRef(null);
  const { t } = useTranslation();

  const [authFailed, setAuthFailed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object().shape({
      username: Yup.string()
        .required(t('validators.required')),
      password: Yup.string()
        .required(t('validators.required')),
    }),
    onSubmit: async (values) => {
      setAuthFailed(false);
      try {
        const res = await axios.post(routes.loginPath(), values);
        localStorage.setItem('userId', JSON.stringify(res.data));
        auth.logIn();
        const { from } = location.state || { from: { pathname: '/' } };
        navigate(from);
      } catch (err) {
        if (err.message === 'Network Error') {
          notifiers.networkError(t);
        }
        if (err.isAxiosError && err.response.status === 401) {
          setAuthFailed(true);
        }
      } finally {
        formik.setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    if (!formik.isSubmitting) {
      userNameInput.current.select();
    }
  }, [formik.isSubmitting]);
  return (
    <PageTemplate>
      <Card className="shadow-sm">
        <Card.Body className="row p-5">
          <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
            <img
              src={avatar}
              className="rounded-circle"
              alt={t('elements.toLogin')}
            />
          </div>
          <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
            <fieldset disabled={formik.isSubmitting}>
              <h1 className="text-center mb-4">{t('elements.toLogin')}</h1>
              <FloatingLabel
                label={t('elements.nickname')}
                className="mb-3"
              >
                <Form.Control
                  ref={userNameInput}
                  id="username"
                  name="username"
                  autoComplete="username"
                  required
                  placeholder={t('elements.nickname')}
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  isInvalid={authFailed}
                />
              </FloatingLabel>
              <FloatingLabel
                label={t('elements.password')}
                className="mb-4"
              >
                <Form.Control
                  id="password"
                  name="password"
                  autoComplete="current-password"
                  required
                  placeholder={t('elements.password')}
                  type="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  isInvalid={authFailed}
                />
                <Form.Control.Feedback
                  type="invalid"
                  tooltip={authFailed}
                >
                  {t('validators.incorrectInputs')}
                </Form.Control.Feedback>
              </FloatingLabel>
              <Button
                variant="outline-primary"
                type="submit"
                className="w-100 mb-3"
              >
                {t('elements.toLogin')}
              </Button>
            </fieldset>
          </Form>
        </Card.Body>
        <Card.Footer className="p-4">
          <div className="text-center">
            {' '}
            <span>{t('elements.noAccount')}</span>
            {' '}
            <a href="/signup">{t('elements.signup')}</a>
          </div>
        </Card.Footer>
      </Card>
    </PageTemplate>
  );
};

export default LoginPage;
