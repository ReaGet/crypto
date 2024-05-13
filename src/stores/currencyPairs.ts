type Option = {
  value: number
  title: string
}

type LogItem = {
  from: string
  to: string
  timestamp: string
}

export const useCurrencyStore = defineStore('currency', () => {
  const currencyPairs: Option[] = [
    { value: 1, title: 'BTCUSDT' },
    { value: 2, title: 'BNBBTC' },
    { value: 3, title: 'ETHBTC' }
  ];

  const selectedCurrency = ref(currencyPairs[0].value);
  const currencyChangeLog = ref<LogItem[]>([]);

  const addMessageToChangeLog = (from: number, to: number) => {
    currencyChangeLog.value.unshift({
      from: currencyPairs.find((c) => c.value === from)?.title || "",
      to: currencyPairs.find((c) => c.value === to)?.title || "",
      timestamp: Date(),
    });
  }

  return {
    currencyPairs,
    selectedCurrency,
    currencyChangeLog,
    update: (value: number, oldValue: number) => {
      selectedCurrency.value = value;
      addMessageToChangeLog(oldValue, value);
    }
  };
});
