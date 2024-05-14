type Item = [number, number];

export const useOrderStore = defineStore("orders", () => {
  const asks = reactive<Item[]>([]);
  const bids = reactive<Item[]>([]);
  const lastUpdateId = ref<number>();

  const load = async (symbol: string, limit: number = 100) => {
    const { data: { value } } = await useFetch<{
      asks: Item[]
      bids: Item[]
      lastUpdateId: number
    }>(`https://api.binance.com/api/v3/depth?symbol=${symbol}&limit=${limit}`);

    asks.unshift(...(value?.asks || []));
    bids.unshift(...(value?.bids || []));

    lastUpdateId.value = value?.lastUpdateId || 0;
  }

  return {
    asks,
    bids,
    load,
  };
});
