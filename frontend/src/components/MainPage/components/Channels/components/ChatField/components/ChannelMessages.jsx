import { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import selectors from '../../../../../../../slices/selectors';

const ChannelMessages = () => {
  const scrollRef = useRef(null);
  useEffect(() => {
    scrollRef.current?.scrollIntoView();
  });

  const messages = useSelector(selectors.selectChannelMessages);

  return (
    messages.map(({ message, id, author }) => (
      <div className="text-break mb-2" key={id} ref={scrollRef}>
        <b>{author}</b>
        {': '}
        {message}
      </div>
    ))
  );
};

export default ChannelMessages;
