import { useSelector, useDispatch } from 'react-redux';
import ChatField from './components/ChatField/ChatField';
import { actions as modalsActions } from '../../../../slices/modalsSlice';
import { selectors as channelsSelectors } from '../../../../slices/channelsSlice';
import ChannelList from './components/ChannelList';
import Header from './components/Header';
import renderModal from './utils/renderModal';
import selectors from '../../../../selectors/index';

const Channels = () => {
  const dispatch = useDispatch();
  const channels = useSelector(channelsSelectors.selectAll);
  const channelNames = selectors.channelsNames(channels);
  const { activeChannelId } = useSelector((state) => state.activeChannel);
  const activeChannel = selectors.activeChannel(channels, activeChannelId);
  const handleHide = () => dispatch(modalsActions.hideModal());
  const modalInfo = useSelector((state) => {
    const { modalType, modalItem } = state.modals;
    return { modalType, modalItem, onHide: handleHide };
  });

  const showModal = (type, item = null) => {
    dispatch(modalsActions.showModal({ type, item }));
  };
  return (
    <>
      <div className="container h-100 my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white flex-md-row">
          <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
            <Header showModal={showModal} />
            <ChannelList showModal={showModal} channels={channels} activeChannel={activeChannel} />
          </div>
          <ChatField channel={activeChannel} />
        </div>
      </div>
      {renderModal({ modalInfo, channelNames })}
    </>
  );
};

export default Channels;
