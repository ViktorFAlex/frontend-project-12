import axios from 'axios';
import { useFormik } from 'formik';
import React, { useRef, useEffect, useState } from 'react';
import {
  Card, Form, Button, FloatingLabel,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import PageTemplate from '../common-components/PageTemplate';
import img from '../../assets/login.jpg';
import { useAuthContext } from '../../hooks/index';
import routes from '../../routes/index';
import notifiers from '../../toasts/index';

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
    onSubmit: async (values) => {
      setAuthFailed(false);
      try {
        const res = await axios.post(routes.api.loginRoute(), values);
        auth.logIn(res.data);

        const { from } = location.state || { from: { pathname: routes.app.mainRoute() } };
        navigate(from);
      } catch (error) {
        if (error.isAxiosError && error?.response?.status === 401) {
          setAuthFailed(true);
          notifiers.error(t, error.response.statusText);
        } else {
          notifiers.error(t, 'networkError');
        }
      } finally {
        formik.setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    userNameInput.current.select();
  }, [formik.isSubmitting]);
  return (
    <PageTemplate>
      <Card className="shadow-sm">
        <Card.Body className="row p-5">
          <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
            <img
              src={img}
              className="rounded-circle"
              alt={t('elements.toLogin')}
            />
          </div>
          <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
            <fieldset disabled={formik.isSubmitting}>
              <h1 className="text-center mb-4">{t('elements.toLogin')}</h1>
              <FloatingLabel
                label={t('elements.nickname')}
                controlId="username"
                className="mb-3"
              >
                <Form.Control
                  ref={userNameInput}
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
                controlId="password"
                className="mb-4"
              >
                <Form.Control
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
                  {t('errors.incorrectInputs')}
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
            <a href={routes.app.signupRoute()}>{t('elements.signup')}</a>
          </div>
        </Card.Footer>
      </Card>
    </PageTemplate>
  );
};

export default LoginPage;
