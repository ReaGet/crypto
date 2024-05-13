<template>
  <v-container class="mt-10">
    <v-row>
      <v-select
        class="max-w-[320px]"
        label="Кол-во элементов в таблице"
        :items="[100, 500, 1000]"
        variant="outlined"
      ></v-select>
    </v-row>
    <v-row class="gap-1 sm:gap-4">
      <Table />
      <Table />
    </v-row>
  </v-container>
</template>