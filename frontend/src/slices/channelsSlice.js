/* eslint no-param-reassign: ["error", { "props": false }] */

import axios from 'axios';
import {
  createSlice, createAsyncThunk, createEntityAdapter, createSelector,
} from '@reduxjs/toolkit';
import routes from '../routes/index';

export const fetchChannels = createAsyncThunk(
  'channels/fetchChannels',
  async (headers) => {
    try {
      const response = await axios.get(routes.api.dataRoute(), { headers });
      return response.data;
    } catch (error) {
      if (error.isAxiosError && error.response.status === 401) {
        throw new Error('Unauthorized');
      }
      throw new Error('Something wrong');
    }
  },
);

const defaultChannelId = 1;

const channelsAdapter = createEntityAdapter();

const initialState = channelsAdapter.getInitialState({ activeChannelId: defaultChannelId });

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: (state, { payload }) => channelsAdapter.addOne(state, payload),
    setActiveChannel: (state, action) => ({ ...state, activeChannelId: action.payload }),
    removeChannel: (state, { payload }) => {
      channelsAdapter.removeOne(state, payload);
      if (state.activeChannelId === payload) {
        state.activeChannelId = defaultChannelId;
      }
    },
    renameChannel: channelsAdapter.upsertOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannels.rejected, (_, { error }) => {
        throw error;
      })
      .addCase(fetchChannels.fulfilled, (state, { payload }) => {
        const { channels } = payload;
        channelsAdapter.setAll(state, channels);
      });
  },
});

const selectors = channelsAdapter.getSelectors((state) => state.channels);

export const selectChannels = (state) => selectors.selectAll(state);
export const selectActiveChannelId = (state) => state.channels.activeChannelId;

export const selectChannelsByNames = createSelector(
  selectChannels,
  (channels) => channels.map(({ name }) => name),
);

export const selectActiveChannel = createSelector(
  selectChannels,
  selectActiveChannelId,
  (channels, channelId) => channels.find(({ id }) => id === channelId),
);

export const { actions } = channelsSlice;
export default channelsSlice.reducer;
