import {
  selectChannelsByNames, selectChannels, selectActiveChannel, selectActiveChannelId,
} from './channelsSlice';
import { selectChannelMessages } from './messagesSlice';
import { selectModalInfo } from './modalsSlice';

export default {
  selectChannels,
  selectChannelsByNames,
  selectActiveChannel,
  selectActiveChannelId,
  selectChannelMessages,
  selectModalInfo,
};
