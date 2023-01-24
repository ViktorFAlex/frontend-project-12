import { useSelector } from 'react-redux';
import { selectors as messageSelectors } from '../../../../../../slices/messagesSlice';
import ChannelName from './components/ChannelName';
import ChannelMessages from './components/ChannelMessages';
import MessageArea from './components/MessageArea';
import selectors from '../../../../../../selectors/index';
import useAuthContext from '../../../../../../hooks/useCustomContext';

const ChatField = ({ channel }) => {
  const auth = useAuthContext();
  const { id: channelId, name } = channel;
  const messages = useSelector((messageSelectors.selectAll));
  const currentChannelMessages = selectors.messages(messages, channelId);
  const currentUserName = auth.loggedIn.user;

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <ChannelName name={name} messages={currentChannelMessages} />
        <div id="messages-box" className="chat-messages overflow-auto px-5">
          <ChannelMessages messages={currentChannelMessages} />
        </div>
        <MessageArea id={channelId} author={currentUserName} />
      </div>
    </div>
  );
};

export default ChatField;
