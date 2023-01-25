import { createSlice } from '@reduxjs/toolkit';
import { actions as channelsActions } from './channelsSlice.js';

const defaultChannelId = 1;

const initialState = { activeChannelId: defaultChannelId };
const activeChannelSlice = createSlice({
  name: 'activeChannel',
  initialState,
  reducers: {
    setActiveChannel: (state, action) => ({ ...state, activeChannelId: action.payload }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(channelsActions.removeChannel, (state, { payload }) => {
        if (state.activeChannelId === payload) {
          return { ...state, activeChannelId: defaultChannelId };
        }
        return state;
      });
  },
});

export const { actions } = activeChannelSlice;
export default activeChannelSlice.reducer;
