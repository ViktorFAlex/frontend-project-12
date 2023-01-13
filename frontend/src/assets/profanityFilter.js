import LeoProfanity from 'leo-profanity';

const takeFilter = () => {
  const filter = LeoProfanity;
  filter.clearList();
  filter.add(filter.getDictionary('ru'));
  return filter;
};

const filter = takeFilter();

export default filter;
