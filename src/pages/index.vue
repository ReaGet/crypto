<script setup lang="ts">
import { io } from "socket.io-client";

const { socketPort } = useRuntimeConfig();

const limits = [10, 50, 100];
const currentLimit = ref(limits[0]);
const book = useOrderBook();
const { currentSymbol } = useSymbolStore();

const mapToArray = (map: Map<string, string>): [string, string, string][] => {
  return Array.from(map).map(([key, value]): [string, string, string] => {
    const [price, qty] = [Number(key), Number(value)];
    return [
      price.toFixed(2),
      qty.toFixed(5),
      (price * qty).toFixed(5),
    ]
  });
};

await book.load(currentSymbol);

const computedAsks = computed(() => {
  return mapToArray(book.asks).slice(0, currentLimit.value);
});

const computedBids = computed(() => {
  return mapToArray(book.bids).slice(0, currentLimit.value);
});

onMounted(() => {
  const socket = socketPort ? io(":" + socketPort) : io();
  
  console.log(socket)
  
  socket.on("connected", () => {
    console.log(2113123)
  });
  
  socket.emit("stream", {
    symbol: "BNBUSDT",
  });
});

</script>

<template>
  <v-container class="mt-10">
    <v-row>
      <v-select
        v-model="currentLimit"
        class="max-w-[320px]"
        label="Кол-во элементов в таблице"
        :items="limits"
        variant="outlined"
      ></v-select>
    </v-row>
    <v-row class="flex-nowrap gap-1 sm:gap-4">
      <TableOrder :data="computedAsks"/>
      <TableOrder :data="computedBids" />
    </v-row>
  </v-container>
</template>