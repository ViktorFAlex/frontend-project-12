import axios from 'axios';
import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import routes from '../utils/routes';

export const fetchChannels = createAsyncThunk(
  'channels/fetchChannels',
  async (header) => {
    const response = await axios.get(routes.dataPath(), { headers: header });
    return response.data;
  },
);

const channelsAdapter = createEntityAdapter();

const initialState = channelsAdapter.getInitialState();

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: (state, { payload }) => channelsAdapter.addOne(state, payload),
    removeChannel: channelsAdapter.removeOne,
    renameChannel: channelsAdapter.upsertOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannels.rejected, () => {
        throw new Error('network Error');
      })
      .addCase(fetchChannels.fulfilled, (state, { payload }) => {
        const { channels } = payload;
        channelsAdapter.setAll(state, channels);
      });
  },
});

export const { actions } = channelsSlice;
export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export default channelsSlice.reducer;
