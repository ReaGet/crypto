type DateFormatter = (date: Date | string) => string;

const useDateFormatter = (options: Intl.DateTimeFormatOptions): DateFormatter => {
  const _options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    ...options,
  };
  return (date: Date | string) => {
    return new Intl.DateTimeFormat('ru-RU', _options).format(
      new Date(date),
    );
  }
}

export default useDateFormatter;