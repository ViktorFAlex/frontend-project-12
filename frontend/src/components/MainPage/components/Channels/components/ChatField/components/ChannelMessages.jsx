import { useRef, useEffect } from 'react';
import filter from '../../../../../../../assets/profanityFilter';

const ChannelMessages = ({ messages }) => {
  const scrollRef = useRef(null);
  useEffect(() => {
    scrollRef.current?.scrollIntoView();
  });
  return (
    messages.map(({ message, id, author }) => (
      <div className="text-break mb-2" key={id} ref={scrollRef}>
        <b>{author}</b>
        {': '}
        {filter.clean(message)}
      </div>
    ))
  );
};

export default ChannelMessages;
