import ChatField from './components/ChatField/ChatField';
import ChannelList from './components/ChannelList/ChannelList';
import Header from './components/common-components/Header';
import ModalLayout from '../../../modals/ModalLayout';
import ModalProvider from './components/common-components/ModalProvider';

const Channels = () => (
  <ModalProvider>
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
          <Header />
          <ChannelList />
        </div>
        <ChatField />
      </div>
    </div>
    <ModalLayout />
  </ModalProvider>
);

export default Channels;
