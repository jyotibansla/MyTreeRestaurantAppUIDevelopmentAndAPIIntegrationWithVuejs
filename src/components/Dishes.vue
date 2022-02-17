<template>
  <div class="dishes pa-4">
    <div class="text-h6">Dishes</div>
    <v-data-table
      :headers="headers"
      :items="dishproducts"
      sort-by="ProductName"
      class="elevation-1 mt-3"
      :search="search"
    >
    <template v-slot:[`item.tags`]="{ item }">
        <span v-for="t of item.tags" :key="t">{{ t }},</span>
      </template>
      
      <template v-slot:[`item.veg`]="{ item }">
        <span v-if="item.veg == true">Veg</span>
        <span v-if="item.veg == false">Non-Veg</span>
      </template>

       <template v-slot:[`item.dishImages`]="{ item }">
        <img  id="preview" width="50px" height="50px"
          :src="item.dishImages[0]"
          alt="Image"
        />
      </template>

      <template v-slot:[`item.status`]="{ item }">
        <v-chip
          color="success"
          small
          class="ma-1"
          text-color="white"
          v-if="item.status === true"
        >
          Active
        </v-chip>
        <v-chip
          color="red"
          small
          class="ma-1"
          text-color="white"
          v-if="item.status === false"
        >
          Inactive
        </v-chip>
      </template>

      <template v-slot:[`item.start`]="{ item }">
        <v-menu bottom right>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              @click="statusAction(item, 'Activate')"
              v-if="item.status == false"
            >
              Activate
            </v-list-item>
            <v-list-item
              @click="statusAction(item, 'Deactivate')"
              v-if="item.status == true"
            >
              Deactivate
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
      <template v-slot:top>
        <v-toolbar flat>
          <v-col cols="12" md="3" lg="4">
            <v-text-field
              v-model="search"
              label="Search"
              append-icon="mdi-magnify"
              hide-details
            ></v-text-field>
          </v-col>

          <v-dialog v-model="menuDialog" max-width="35%" persistent>
            <v-card>
              <v-card-title class="text-h6"
                >Are you sure want to Activate this Dish?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close('Activate')">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="activate"> OK </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog v-model="deactivateDialog" max-width="30%" persistent>
            <v-card>
              <v-form ref="form4">
                <v-toolbar flat>
                  <v-card-title> Deactivate the Dish</v-card-title>
                  <v-spacer></v-spacer>
                  <v-btn icon light @click="close('Deactivate')">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </v-toolbar>
                <v-card-text class="pa-5">
                  <div class="text-h6">Reason For Deactivation</div>
                  <v-text-field
                    label="Enter text here"
                    solo
                    class="mt-1"
                    maxlength="120"
                    :rules="[!!deactivateReason || 'This Field is Required']"
                    required
                    background-color="grey lighten-3"
                    v-model="deactivateReason"
                  >
                  </v-text-field>
                </v-card-text>
                <v-card-actions class="d-flex justify-center">
                  <v-btn
                    small
                    dark
                    depressed
                    class="mb-3 btn"
                    color="pink"
                    @click="deactivate"
                  >
                    Deactivate
                  </v-btn>
                </v-card-actions>
              </v-form>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>

      <template v-slot:[`item.dishPrice`]="{ item }">
        <span>₹&nbsp;{{item.dishPrice}}</span>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    deactivateDialog: false,
    deactivateReason: "",
    menuDialog: false,
    statusText: "",
    search: "",
    item: {},
    dishproducts: [],
  }),

  computed: {
    headers() {
      let headers = [
        { text: "Dish Id", value: "dishId", width: "80px" },
        { text: "Chef Id", value: "chefId", width: "80px" },
        { text: "Dish Name", value: "name", width: "150px" },
        { text: "Status", value: "status", width: "120px" },
        { text: "Dish Thumbnail", value: "dishImages", width: "150px" },
        { text: "Dish Rating", value: "rating", width: "120px" },
        { text: "Added On", value: "addedOn", width: "180px" },
        { text: "Dish Description", value: "description", width: "250px" },
        { text: "Meal Type", value: "mealType", width: "150px" },
        { text: "Veg/Non-Veg", value: "veg", width: "150px" },
        { text: "Taste Meter", value: "tasteMeter.name", width: "120px" },
        { text: "Special Instructions", value: "specialInstructions", width: "250px" },
        { text: "dish Tags", value: "dishTags", width: "180px" },
        { text: "Tags", value: "tags", width: "180px" },
        { text: "Serving size", value: "servingSize", width: "250px" },
        { text: "Dish Price", value: "dishPrice", width: "200px" },

        

        // { text: "SystemTags", value: "SystemTags", width: "150px" },
        // { text: "ChefTags", value: "ChefTags", width: "180px" },
      ];

      if (this.$store.state.Login.userDetails.admin === true) {
        headers.unshift({ text: "", value: "start", sortable: false });
      }

      return headers;
    },
  },

  beforeDestroy(){
    this.unsubscribe();
  },

  created() {
    this.unsubscribe = this.$store.subscribe((mutation) => {
      if (mutation.type === "setDishes" && mutation.payload) {
        this.dishproducts = JSON.parse(mutation.payload);
      }
    });

    this.getDish();
  },

  methods: {
    ...mapActions(["getDish", "activateDishes", "deactivateDishes"]),
    close(val) {
      this.item = {};
      if (val === "Deactivate") {
        this.deactivateDialog = false;
        this.$refs.form4.reset();
      } else if (val === "Activate") {
        this.menuDialog = false;
      }
    },

    statusAction(item, val) {
      if (val === "Activate") {
        this.item = item;
        this.menuDialog = true;
      } else if (val === "Deactivate") {
        this.item = item;
        this.deactivateDialog = true;
      }
    },
    activate() {
      this.menuDialog = false;
      let param = {
        dishId: this.item.dishId,
      };
      this.activateDishes(param);
      this.close("Activate");
    },

    deactivate() {
      if (this.$refs.form4.validate()) {
        this.deactivateDialog = false;
        let param = {
          dishId: this.item.dishId,
          reason: this.deactivateReason,
        };
        this.deactivateDishes(param);
        this.close("Deactivate");
      }
    },
  },
};
</script>

<style scoped>
</style>