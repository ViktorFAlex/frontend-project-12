import { useTranslation } from 'react-i18next';
import filter from '../../../../../../../assets/profanityFilter';

const ChannelName = ({ name, messages }) => {
  const { t } = useTranslation();
  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
        <b>
          {'# '}
          {filter.clean(name)}
        </b>
      </p>
      <span className="text-muted">
        {t('messages.total', { count: messages.length })}
      </span>
    </div>
  );
};

export default ChannelName;
