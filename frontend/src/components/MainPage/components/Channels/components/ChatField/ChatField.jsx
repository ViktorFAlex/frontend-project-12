import ChannelName from './components/ChannelName';
import ChannelMessages from './components/ChannelMessages';
import MessageArea from './components/MessageArea';

const ChatField = () => (
  <div className="col p-0 h-100">
    <div className="d-flex flex-column h-100">
      <ChannelName />
      <div id="messages-box" className="chat-messages overflow-auto px-5">
        <ChannelMessages />
      </div>
      <MessageArea />
    </div>
  </div>
);

export default ChatField;
