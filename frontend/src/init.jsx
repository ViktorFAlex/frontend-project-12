import { Suspense, lazy } from 'react';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import resources from './locales/index.js';
import store from './slices/index.js';
import { actions as channelsActions } from './slices/channelsSlice.js';
import { actions as messagesActions } from './slices/messagesSlice.js';
import Preloader from './components/common-components/Preloader';
import notifiers from './toasts/index';

const App = lazy(() => import('./components/App/App'));

const init = async (socket) => {
  const i18n = i18next.createInstance();
  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
    });
  const socketTimeout = 4000;

  socket.on('newChannel', (data) => {
    store.dispatch(channelsActions.addChannel(data));
  })
    .on('removeChannel', ({ id }) => {
      store.dispatch(channelsActions.removeChannel(id));
    })
    .on('renameChannel', (data) => {
      store.dispatch(channelsActions.renameChannel(data));
    })
    .on('newMessage', (message) => {
      store.dispatch(messagesActions.addMessage(message));
    })
    .on('disconnect', () => {
      notifiers.error(i18n.t, 'networkError');
    });

  const socketPromise = (action, cb = null) => (data, t) => new Promise((resolve, reject) => {
    socket.timeout(socketTimeout).emit(action, data, (error, response) => {
      if (error) {
        reject(error);
      } else {
        if (cb) {
          cb(t, response);
        }
        resolve(response);
      }
    });
  });

  const socketHandlers = {
    addMessage: socketPromise('newMessage'),
    addChannel: socketPromise('newChannel', (t, { data }) => {
      store.dispatch(channelsActions.addChannel(data));
      store.dispatch(channelsActions.setActiveChannel(data.id));
      notifiers.addChannel(t);
    }),
    removeChannel: socketPromise('removeChannel', (t) => notifiers.removeChannel(t)),
    renameChannel: socketPromise('renameChannel', (t) => notifiers.renameChannel(t)),
  };

  const rollbarConfig = {
    accessToken: process.env.REACT_APP_NOT_SECRET_CODE,
    environment: 'production',
  };

  return (
    <Suspense fallback={<Preloader />}>
      <I18nextProvider i18n={i18n}>
        <RollbarProvider config={rollbarConfig}>
          <ErrorBoundary>
            <Provider store={store}>
              <App socketHandlers={socketHandlers} />
              <ToastContainer />
            </Provider>
          </ErrorBoundary>
        </RollbarProvider>
      </I18nextProvider>
    </Suspense>
  );
};

export default init;
