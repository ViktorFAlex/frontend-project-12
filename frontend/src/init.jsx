import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './components/App/App';
import resources from './locales/index.js';
import store from './slices/index.js';
import { connectSocket } from './utils/socket';

const init = async () => {
  const i18n = i18next.createInstance();
  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
    });
  connectSocket(i18n);
  const rollbarConfig = {
    accessToken: process.env.REACT_APP_NOT_SECRET_CODE,
    environment: 'production',
  };

  return (
    <I18nextProvider i18n={i18n}>
      <RollbarProvider config={rollbarConfig}>
        <ErrorBoundary>
          <Provider store={store}>
            <App />
            <ToastContainer />
          </Provider>
        </ErrorBoundary>
      </RollbarProvider>
    </I18nextProvider>
  );
};

export default init;
