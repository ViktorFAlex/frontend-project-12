import { Suspense, lazy } from 'react';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import resources from './locales/index.js';
import store from './slices/index.js';
import Preloader from './components/common-components/Preloader';
import buildChatApi from './chatApi/buildChatApi.js';
import AuthProvider from './components/Providers/AuthProvider.jsx';
import ChatApiProvider from './components/Providers/ChatApiProvider.jsx';

const App = lazy(() => import('./components/App/App'));

const init = async (socket) => {
  const i18n = i18next.createInstance();
  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
    });
  const chatApi = buildChatApi(socket);

  return (
    <Suspense fallback={<Preloader />}>
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <AuthProvider>
            <ChatApiProvider chatApi={chatApi}>
              <App />
            </ChatApiProvider>
          </AuthProvider>
          <ToastContainer />
        </Provider>
      </I18nextProvider>
    </Suspense>
  );
};

export default init;
