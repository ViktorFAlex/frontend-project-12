import selectChannelMessages from './selectChannelMessages';
import selectActiveChannel from './selectActiveChannel';
import selectCurrentUser from './selectCurrentUser';
import selectChannelsByNames from './selectChannelsByNames';

export default {
  messages: selectChannelMessages,
  activeChannel: selectActiveChannel,
  activeUser: selectCurrentUser,
  channelsNames: selectChannelsByNames,
};
