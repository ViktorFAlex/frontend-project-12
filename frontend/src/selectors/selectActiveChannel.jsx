export default (state, activeChannelId) => state.find(({ id }) => id === activeChannelId);
