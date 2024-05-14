export default defineNuxtPlugin({
  async setup() {
    const { load } = useOrderStore();
    const { currentSymbol } = useSymbolStore();
    await load(currentSymbol);
  }
});