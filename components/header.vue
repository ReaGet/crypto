<script setup lang="ts">
const links = [
  { to: "/", title: "Order Book", icon: "mdi-monitor" },
  { to: "/settings", title: "Settings", icon: "mdi-cog" }
];
</script>

<template>
  <header class="border-b">
    <v-container>
      <v-row class="align-center">
        <v-col cols="1">
          <v-icon color="warning" icon="$vuetify"></v-icon>
        </v-col>
        <v-col class="flex justify-end ml-auto">
          <v-menu location="bottom end">
            <template v-slot:activator="{ props }">
              <button
                v-bind="props"
                class="w-10 h-10 border rounded-full"
              >
                <v-icon icon="mdi-account"></v-icon>
              </button>
            </template>
            <v-list class="mt-2 px-2">
              <v-list-item
                v-for="{ to, title, icon } in links"
                :key="to"
                class="hover:bg-gray-100 rounded-md"
              >
                <NuxtLink :to="to" class="flex items-center gap-2">
                  <v-icon :icon="icon" size="small"></v-icon>
                  <v-list-item-title>{{ title }}</v-list-item-title>
                </NuxtLink>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
      </v-row>
    </v-container>
  </header>
</template>