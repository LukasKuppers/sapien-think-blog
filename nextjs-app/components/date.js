import { format } from 'date-fns';
import { montserrat } from '../lib/fonts';


const DateDisplay = ({ timestamp }) => {
  const date = new Date(timestamp);

  return (
      <time
        className={montserrat.className} 
        dateTime={date.toISOString()}>
          {format(date, 'LLLL d, yyyy')}
      </time>
  );
};


export default DateDisplay;
