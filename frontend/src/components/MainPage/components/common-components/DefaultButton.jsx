import cn from 'classnames';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { actions as channelsActions } from '../../../../slices/channelsSlice';
import filter from '../../../../assets/profanityFilter';
import selectors from '../../../../slices/selectors';

const DefaultButton = ({ channel }) => {
  const { id, name, removable } = channel;
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const activeChannelId = useSelector(selectors.selectActiveChannelId);
  const btnVariant = activeChannelId === id ? 'secondary' : '';

  const classNames = cn('w-100', 'rounded-0', 'text-start', {
    'text-truncate': removable,
  });

  return (
    <Button
      variant={btnVariant}
      className={classNames}
      onClick={() => dispatch(channelsActions.setActiveChannel(id))}
    >
      <span className="me-1">{t('elements.hash')}</span>
      {filter.clean(name)}
    </Button>
  );
};

export default DefaultButton;
