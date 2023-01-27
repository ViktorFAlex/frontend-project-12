import { createSlice, createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { fetchChannels, selectActiveChannelId, actions as channelsActions } from './channelsSlice.js';

const messagesAdapter = createEntityAdapter();

const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: messagesAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannels.fulfilled, (state, { payload }) => {
        const { messages } = payload;
        messagesAdapter.setAll(state, messages);
      })
      .addCase(channelsActions.removeChannel, (state, { payload }) => {
        const idsToRemove = state.ids.filter((id) => state.entities[id].channelId === payload);
        messagesAdapter.removeMany(state, idsToRemove);
      });
  },
});

export const { actions } = messagesSlice;
const selectors = messagesAdapter.getSelectors((state) => state.messages);
const selectMessages = (state) => selectors.selectAll(state);
export const selectChannelMessages = createSelector(
  selectMessages,
  selectActiveChannelId,
  (messages, id) => messages.filter(({ channelId }) => channelId === id),
);

export default messagesSlice.reducer;
