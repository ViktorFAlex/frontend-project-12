import Add from './Add';
import Remove from './Remove';
import Rename from './Rename';

const modals = {
  add: Add,
  remove: Remove,
  rename: Rename,
};

export default (modalName) => modals[modalName];
