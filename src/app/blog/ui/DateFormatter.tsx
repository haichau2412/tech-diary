"use client";

import { parseISO, format } from "date-fns";

type Props = {
  dateString: string;
  formatString?: string;
  includeDay?: boolean;
};

const DateFormatter = ({ dateString, formatString = "LLLL	d, yyyy" }: Props) => {
  const date = parseISO(dateString);
  const dateText = `${format(date, formatString)}`;

  return (
    <time
      dateTime={dateString}
      dangerouslySetInnerHTML={{ __html: dateText }}
    ></time>
  );
};

export default DateFormatter;
