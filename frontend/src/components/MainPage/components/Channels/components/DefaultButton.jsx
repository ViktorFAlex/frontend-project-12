import cn from 'classnames';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { actions as activeChannelActions } from '../../../../../slices/activeChannelSlice';
import filter from '../../../../../assets/profanityFilter';

const DefaultButton = ({ channel, btnVariant }) => {
  const { id, name, removable } = channel;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const classNames = cn('w-100', 'rounded-0', 'text-start', {
    'text-truncate': removable,
  });
  return (
    <Button
      variant={btnVariant}
      className={classNames}
      onClick={() => dispatch(activeChannelActions.setActiveChannel(id))}
    >
      <span className="me-1">{t('elements.hash')}</span>
      {filter.clean(name)}
    </Button>
  );
};

export default DefaultButton;
