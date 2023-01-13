import {
  Nav,
  Button,
  ButtonGroup,
  Dropdown,
} from 'react-bootstrap';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import useChannelsContext from '../hooks/useCustomContext';
import svg from '../assets/plus-square.svg';
import ChatField from './ChatField';
import getModal from './modals/index.js';
import filter from '../assets/profanityFilter';

const renderModal = ({ modalInfo, hideModal, channelNames }) => {
  const { type, handler, item } = modalInfo;
  if (!type) {
    return null;
  }
  const Component = getModal(type);
  return <Component handler={handler} onHide={hideModal} item={item} names={channelNames} />;
};

const ChannelsList = ({ channels }) => {
  const { t } = useTranslation();
  const channelNames = channels.map(({ name }) => name);
  const channelsContext = useChannelsContext();

  const {
    channelHandlers, activeChannelId, setActiveChannelId, messageHandlers,
  } = channelsContext;

  const activeChannel = channels.find(({ id }) => id === activeChannelId);
  const handlers = {
    adding: channelHandlers.addChannel,
    removing: channelHandlers.removeChannel,
    renaming: channelHandlers.renameChannel,
  };

  const [modalInfo, setModalInfo] = useState({ type: null, handler: null, item: null });
  const hideModal = () => setModalInfo({ type: null, handler: null, item: null });
  const showModal = (type, item = null) => setModalInfo({ type, handler: handlers[type], item });

  const renderHeader = () => (
    <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
      <span>Каналы </span>
      <button type="button" className="text-primary btn btn-group-vertical p-0" onClick={() => showModal('adding')}>
        <img src={svg} alt={t('elements.add')} />
        <span className="visually-hidden">+</span>
      </button>
    </div>
  );

  const renderChannels = () => channels.map((channel) => {
    const { id, name } = channel;
    const isActive = activeChannelId === id;
    const isDefaultChannel = id === 1 || id === 2;
    const btnVariant = isActive ? 'secondary' : '';
    const renderDefaultButton = () => {
      const classNames = cn('w-100', 'rounded-0', 'text-start', {
        'text-truncate': !isDefaultChannel,
      });
      return (
        <Button
          variant={btnVariant}
          className={classNames}
          onClick={() => setActiveChannelId(id)}
        >
          <span className="me-1">#</span>
          {filter.clean(name)}
        </Button>
      );
    };

    const renderButtonGroup = () => (
      <Dropdown as={ButtonGroup} className="d-flex">
        {renderDefaultButton()}
        <Dropdown.Toggle variant={btnVariant} split id={id} className="flex-grow-0">
          <span className="visually-hidden">{t('channels.management')}</span>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() => showModal('removing', id)}
          >
            {t('elements.remove')}
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => showModal('renaming', channel)}
          >
            {t('elements.rename')}
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );

    return (
      <Nav.Item key={id} as="li" className="w-100">
        {isDefaultChannel ? renderDefaultButton() : renderButtonGroup()}
      </Nav.Item>
    );
  });
  return (
    <>
      <div className="container h-100 my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white flex-md-row">
          <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
            {renderHeader()}
            <Nav className="flex-column nav-pills nav-fill px-2" as="ul">
              {renderChannels()}
            </Nav>
          </div>
          {activeChannel && <ChatField channel={activeChannel} handlers={messageHandlers} />}
        </div>
      </div>
      {renderModal({ modalInfo, hideModal, channelNames })}
    </>
  );
};

export default ChannelsList;
