type Item = [number, number];


export const useOrderBook = () => {
  const asks = reactive(new Map());
  const bids = reactive(new Map());
  const lastUpdateId = ref<number>();

  const load = async (symbol: string, limit: number = 100) => {
    const { data: { value } } = await useFetch<{
      asks: Item[]
      bids: Item[]
      lastUpdateId: number
    }>(`https://api.binance.com/api/v3/depth?symbol=${symbol}&limit=${limit}`);

    asks.clear();
    bids.clear();

    (value?.asks || []).forEach(([price, quantity]) => asks.set(price, quantity));
    (value?.bids || []).forEach(([price, quantity]) => bids.set(price, quantity));
    lastUpdateId.value = value?.lastUpdateId || 0;
  }

  return {
    asks,
    bids,
    load,
  };
};
