import BtnGroup from './BtnGroup';
import DefaultButton from './DefaultButton';

const Buttons = ({ channel }) => {
  const { removable } = channel;
  const CurrentComponent = removable ? BtnGroup : DefaultButton;

  return <CurrentComponent channel={channel} />;
};

export default Buttons;
