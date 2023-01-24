import { Nav } from 'react-bootstrap';
import renderButtons from '../utils/renderButtons';

const ChannelList = ({ showModal, channels, activeChannel }) => {
  const renderChannels = () => (
    channels.map((channel) => {
      const { id } = channel;
      const isActive = activeChannel.id === id;
      const btnVariant = isActive ? 'secondary' : '';
      return (
        <Nav.Item key={id} as="li" className="w-100">
          {renderButtons(channel, btnVariant, showModal)}
        </Nav.Item>
      );
    })
  );

  return (
    <Nav className="flex-column nav-pills nav-fill px-2" as="ul">
      {renderChannels()}
    </Nav>
  );
};

export default ChannelList;
