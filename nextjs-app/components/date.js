import { format } from 'date-fns';


const DateDisplay = ({ timestamp }) => {
  const date = new Date(timestamp);

  return (
      <time dateTime={date.toISOString()}>{format(date, 'LLLL d, yyyy')}</time>
  );
};


export default DateDisplay;
