import { createSlice } from '@reduxjs/toolkit';

const initialState = { modalType: null, modalHandler: null, modalItem: null };

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    showModal: (state, { payload }) => {
      state.modalType = payload.type;
      state.modalItem = payload.item;
    },
    hideModal: (state) => {
      state.modalType = null;
      state.modalItem = null;
    },
  },
});

export const { actions } = modalsSlice;
export default modalsSlice.reducer;
