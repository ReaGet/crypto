type LogItem = {
  from: string
  to: string
  timestamp: string
}

export const useSymbolStore = defineStore("symbol", () => {
  const currentSymbol = ref<string>("BTCUSDT");
  const changeLog = ref<LogItem[]>([]);

  const addMessageToChangeLog = (symbol: string = "", prevSymbol: string = "") => {
    changeLog.value.unshift({
      from: prevSymbol,
      to: symbol,
      timestamp: Date(),
    });
  }

  return {
    currentSymbol,
    changeLog,
    setSymbol: (symbol: string, prevSymbol: string) => {
      console.log(symbol, prevSymbol)
      currentSymbol.value = symbol;
      addMessageToChangeLog(symbol, prevSymbol);
    }
  };
});