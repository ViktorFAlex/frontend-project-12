import { createSlice } from '@reduxjs/toolkit';
import { actions as channelsActions } from './channelsSlice.js';

const defaultChannelId = 1;

const initialState = { activeChannelId: defaultChannelId, byActiveUser: false };
const activeChannelSlice = createSlice({
  name: 'activeChannel',
  initialState,
  reducers: {
    setActiveChannel: (state, action) => {
      state.activeChannelId = action.payload;
    },
    setByActiveUser: (state, { payload }) => {
      state.byActiveUser = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(channelsActions.removeChannel, (state, { payload }) => {
        if (state.activeChannelId === payload) {
          state.activeChannelId = defaultChannelId;
        }
      })
      .addCase(channelsActions.addChannel, (state, { payload }) => {
        if (state.byActiveUser) {
          state.activeChannelId = payload.id;
        }
      });
  },
});

export const { actions } = activeChannelSlice;
export default activeChannelSlice.reducer;
