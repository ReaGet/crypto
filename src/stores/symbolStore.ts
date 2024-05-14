type LogItem = {
  from: string
  to: string
  timestamp: string
}

export const useSymbolStore = defineStore("symbol", () => {
  const symbols = [
    "BTCUSDT",
    "BNBBTC",
    "ETHBTC",
  ];
  
  const currentSymbol = ref<string>(symbols[0]);
  const changeLog = ref<LogItem[]>([]);

  const addMessageToChangeLog = (symbol: string = "", prevSymbol: string = "") => {
    changeLog.value.unshift({
      from: prevSymbol,
      to: symbol,
      timestamp: Date(),
    });
  }

  return {
    symbols,
    currentSymbol,
    changeLog,
    setSymbol: (symbol: string, prevSymbol: string) => {
      console.log(symbol, prevSymbol)
      currentSymbol.value = symbol;
      addMessageToChangeLog(symbol, prevSymbol);
    }
  };
});