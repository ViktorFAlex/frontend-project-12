import { createSlice } from '@reduxjs/toolkit';

const initialState = { modalType: null, modalItem: null };

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    showModal: (_, { payload }) => ({ modalType: payload.type, modalItem: payload?.item ?? null }),
    hideModal: () => ({ modalType: null, modalItem: null }),
  },
});

export const selectModalInfo = (state) => state.modals;

export const { actions } = modalsSlice;
export default modalsSlice.reducer;
