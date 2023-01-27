import { Nav } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Buttons from './components/Buttons/Buttons';
import selectors from '../../../../../../slices/selectors';

const ChannelList = () => {
  const channels = useSelector(selectors.selectChannels);

  return (
    <Nav className="flex-column nav-pills nav-fill px-2" as="ul">
      {channels.map((channel) => (
        <Nav.Item key={channel.id} as="li" className="w-100">
          <Buttons channel={channel} />
        </Nav.Item>
      ))}
    </Nav>
  );
};

export default ChannelList;
