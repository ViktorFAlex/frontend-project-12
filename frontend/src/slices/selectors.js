import {
  selectChannelsByNames, selectChannels, selectActiveChannel,
  selectActiveChannelId, selectAuthError,
} from './channelsSlice';
import { selectChannelMessages } from './messagesSlice';
import { selectModalInfo } from './modalsSlice';

export default {
  selectChannels,
  selectAuthError,
  selectChannelsByNames,
  selectActiveChannel,
  selectActiveChannelId,
  selectChannelMessages,
  selectModalInfo,
};
