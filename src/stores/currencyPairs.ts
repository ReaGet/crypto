type Ask = [number, number];
type Bid = [number, number];

export const useCurrencyStore = defineStore('currency', () => {

  const asks = ref<Ask[]>();
  const bids = ref<Bid[]>();
  const lastUpdateId = ref<number>();

  const loadDeals = async (symbol: string, limit: number = 100) => {
    const { data: { value } } = await useFetch<{
      asks: Ask[]
      bids: Bid[]
      lastUpdateId: number
    }>(`https://api.binance.com/api/v3/depth?symbol=${symbol}&limit=${limit}`);

    asks.value = value?.asks || [];
    bids.value = value?.bids || [];
    lastUpdateId.value = value?.lastUpdateId || 0;

    console.log(value);
  }

  return {
    asks,
    bids,
    loadDeals,
  };
});
