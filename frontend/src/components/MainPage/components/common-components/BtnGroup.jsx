import { Dropdown, ButtonGroup } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import DefaultButton from './DefaultButton';
import selectors from '../../../../slices/selectors';
import { actions as modalsActions } from '../../../../slices/modalsSlice';
import { useModalContext } from '../../../../hooks/index';

const BtnGroup = ({ channel }) => {
  const { id } = channel;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { handleShow } = useModalContext();

  const handleClick = (type, item) => () => {
    handleShow();
    dispatch(modalsActions.showModal({ type, item }));
  };

  const activeChannelId = useSelector(selectors.selectActiveChannelId);
  const btnVariant = id === activeChannelId ? 'secondary' : '';

  return (
    <Dropdown as={ButtonGroup} className="d-flex">
      <DefaultButton channel={channel} />
      <Dropdown.Toggle variant={btnVariant} split id={id} className="flex-grow-0">
        <span className="visually-hidden">{t('channels.management')}</span>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item
          onClick={handleClick('remove', id)}
        >
          {t('elements.remove')}
        </Dropdown.Item>
        <Dropdown.Item
          onClick={handleClick('rename', channel)}
        >
          {t('elements.rename')}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default BtnGroup;
