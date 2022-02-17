<template>
  <div class="masterdata pa-4">
    <div class="text-h6">Master Data</div>
    <v-row class="mt-1">
      <v-col>
        <MealType />
      </v-col>

      <v-col>
        <SystemTag />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <Stamps />
      </v-col>
      <v-col>
        <ChefAward />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import MealType from "./MealType.vue";
import SystemTag from "./SystemTags.vue";
import Stamps from "./Stamps.vue";
import ChefAward from "./ChefAward.vue";
export default {
  components: {
    MealType,
    SystemTag,
    Stamps,
    ChefAward,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped>
</style>