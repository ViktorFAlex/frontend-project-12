import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import selectors from '../../../../../../../slices/selectors';

const ChannelName = () => {
  const { t } = useTranslation();
  const { name } = useSelector(selectors.selectActiveChannel);
  const messages = useSelector(selectors.selectChannelMessages);

  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
        <b>
          {'# '}
          {name}
        </b>
      </p>
      <span className="text-muted">
        {t('messages.total', { count: messages.length })}
      </span>
    </div>
  );
};

export default ChannelName;
