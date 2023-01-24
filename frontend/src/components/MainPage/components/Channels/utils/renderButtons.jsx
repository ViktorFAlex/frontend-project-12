import BtnGroup from '../components/BtnGroup';
import DefaultButton from '../components/DefaultButton';

const renderButtons = (channel, btnVariant, showModal) => {
  const { removable } = channel;
  const CurrentComponent = removable ? BtnGroup : DefaultButton;
  return <CurrentComponent channel={channel} btnVariant={btnVariant} showModal={showModal} />;
};

export default renderButtons;
