<template>
  <div class="dashboard pa-1">
    <v-container fluid>
      <v-row>
        <v-col v-for="(item, i) in items" :key="i" sm6 md3>
          <v-card :color="item.color" light>
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title
                  class="text-h6"
                  v-text="item.title"
                ></v-card-title>

                <v-card-subtitle v-text="item.artist"></v-card-subtitle>

                <v-card-actions>
                  <v-btn class="ml-2 mt-5" outlined rounded small :to="item.to">
                    View
                    <v-icon light small
                      >mdi-arrow-right-thick<!-- -bold-circle-outline --></v-icon
                    >
                  </v-btn>
                </v-card-actions>
              </div>

              <v-avatar class="ma-1" size="100" tile>
                <!-- <v-img :src="item.src"></v-img> -->
                <v-icon light large :color="item.iconColor">{{
                  item.icon
                }}</v-icon>
              </v-avatar>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>


<script>
import {mapGetters} from 'vuex'
export default {
  data() {
    return {
      items: [
        {
          color: "white",
          src: "https://cdn.vuetifyjs.com/images/cards/foster.jpg",
          title: "Sellers",
          artist: "150",
          icon: "mdi-cart",
          iconColor: "green",
          to:"/sellers"
        },
        {
          color: "white",
          src: "https://cdn.vuetifyjs.com/images/cards/halcyon.png",
          title: "Dishes",
          artist: "14",
          icon: "mdi-food",
          iconColor: "red",
          to:"/manage-dishes"
        },
        {
          color: "white",
          src: "https://cdn.vuetifyjs.com/images/cards/foster.jpg",
          title: "Chefs",
          artist: "30",
          icon: "mdi-chef-hat",
          iconColor: "yellow",
          to:"/chefs"
        },
        {
          color: "white",
          src: "https://cdn.vuetifyjs.com/images/cards/halcyon.png",
          title: "Customers",
          artist: "120",
          icon: "mdi-food-fork-drink",
          iconColor: "blue",
          to:"/customers"
        },
      ],
      user:''
    }
  },
  created(){
    this.user = this.getUserDetails();
    console.log("user", this.user);
  },
  methods:{
    ...mapGetters(["getUserDetails"])
  }
};
</script>

<style scoped>
</style>

