import BtnGroup from './common-components/BtnGroup';
import DefaultButton from './common-components/DefaultButton';

const Buttons = ({ channel }) => {
  const { removable } = channel;
  const CurrentComponent = removable ? BtnGroup : DefaultButton;

  return <CurrentComponent channel={channel} />;
};

export default Buttons;
