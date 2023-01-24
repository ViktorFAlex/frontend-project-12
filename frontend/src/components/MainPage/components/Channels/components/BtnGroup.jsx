import { Dropdown, ButtonGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import DefaultButton from './DefaultButton';

const BtnGroup = ({ channel, btnVariant, showModal }) => {
  const { id } = channel;
  const { t } = useTranslation();
  return (
    <Dropdown as={ButtonGroup} className="d-flex">
      <DefaultButton channel={channel} btnVariant={btnVariant} />
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
};

export default BtnGroup;
