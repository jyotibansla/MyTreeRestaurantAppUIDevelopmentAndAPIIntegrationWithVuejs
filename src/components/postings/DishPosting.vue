<template>
  <div class="dishePostings pa-4">
    <div class="text-h6">Dishes Postings</div>
    <v-data-table
      :headers="getheaders"
      :items="dishpost"
      :search="search"
      sort-by="id"
      class="elevation-1 mt-3"
    >
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

      <template v-slot:[`item.status`]="{ item }">
        <v-chip
          color="success"
          small
          text-color="white"
          v-if="item.status === true"
        >
          Active
        </v-chip>
        <v-chip
          color="red"
          small
          text-color="white"
          v-if="item.status === false"
        >
          Inactive
        </v-chip>
      </template>

      <template v-slot:[`item.dishImages`]="{ item }">
        <img  id="preview" width="50px" height="50px"
          :src="item.dishImages[0]"
          alt="Image"
        />
      </template>

       <template v-slot:[`item.veg`]="{item}">
        <span v-if="item.veg == true">Veg</span>
        <span v-if="item.veg == false">Non-Veg</span>
      </template>

      <template v-slot:[`item.deliveryAvailable`]="{ item }">
        <v-icon color="green" v-if="item.deliveryAvailable === true"
          >mdi-check-circle-outline</v-icon>
        <v-icon color="red" v-if="item.deliveryAvailable === false"
          >mdi-close-circle-outline</v-icon>
      </template>

      <template v-slot:[`item.dishPrice`]="{item}">
        <span>₹&nbsp;{{item.dishPrice}}</span>
      </template>

      <template v-slot:[`item.basePrice`]="{item}">
        <span>₹&nbsp;{{item.basePrice}}</span>
      </template>

      <template v-slot:[`item.deliveryCharge`]="{item}">
        <span>₹&nbsp;{{item.deliveryCharge}}</span>
      </template>

      <template v-slot:top>
        <v-toolbar flat>
          <v-col cols="12" md="3" lg="4">
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              hide-details
            ></v-text-field>
          </v-col>

          <v-dialog v-model="menuDialog" max-width="30%" persistent>
            <v-card>
              <v-card-title class="text-h6"
                >Are You sure want to Activate this Dish Posting?</v-card-title
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

          <v-dialog v-model="deactivateDialog" max-width="35%" persistent>
            <v-card>
              <v-form ref="form6">
                <v-toolbar flat>
                  <v-card-title> Deactivate Dish Posting</v-card-title>
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
    </v-data-table>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data: () => ({
    search: "",
    dishpost: [],
    menuDialog: false,
    deactivateDialog: false,
    deactivateReason: "",
    statusText: "",
    item: {},
  }),
  computed: {
    getheaders() {
      let headers = [
        { text: "Dish  Post Id ", value: "dishPostId", width: "120px" },

        { text: "Chef Name", value: "chefName", width: "150px" },
        { text: "Dish Name", value: "name", width: "180px" },
        { text: "Status", value: "status", width: "150px" },
        {
          text: "Dish Thumbnail",
          value: "dishImages",
          width: "180px",
        },
        { text: "Dish Rating", value: "rating", width: "120px" },
        { text: "Dish Description", value: "description", width: "250px" },
        { text: "Dish Added On", value: "addedOn", width: "180px" },
        { text: "Meal Type", value: "mealType", width: "120px" },
        { text: "Taste Meter", value: "tasteMeter.name", width: "120px" },
        { text: "Veg/NonVeg", value: "veg", width: "120px" },
        {
          text: "Special Instructions",
          value: "specialInstructions",
          width: "250px",
        },
        // { text: "SystemTags", value: "SystemTags", width: "180px" },
        // { text: "ChefTags", value: "ChefTags", width: "180px" },
        { text: "DishTags", value: "dishTags", width: "180px" },
        { text: "Posted on", value: "postedOn", width: "180px" },
        { text: "Available Qty", value: "availableQuantity", width: "150px" },
        { text: "Posting Chapter", value: "postingChapter", width: "150px" },
        { text: "Posting City", value: "postingCity", width: "150px" },
        { text: "Dish Price", value: "dishPrice", width: "120px" },
        { text: "Base  Price", value: "basePrice", width: "120px" },
        {
          text: "Delievery Available",
          value: "deliveryAvailable",
          width: "180px",
          align: "center",
        },
        { text: "Delievery Charge", value: "deliveryCharge", width: "150px" },
        { text: "Order By date", value: "orderByDate", width: "180px" },
        { text: "Ready By date", value: "readyByDate", width: "180px" },
        { text: "OrderByTimeSlot", value: "orderByTimeSlot", width: "180px" },

        // { text: "Pickup/Delievery", value: "PD", width: "200px" },
      ];
      if (this.$store.state.Login.userDetails.admin === true) {
        headers.unshift({ text: "", value: "start", width: "20px" });
      }
      return headers;
    },
  },

  beforeDestroy(){
    this.unsubscribe();
  },
  
  created() {
    this.unsubscribe = this.$store.subscribe((mutation) => {
      if (mutation.type === "setDishPosting" && mutation.payload) {
        this.dishpost = JSON.parse(mutation.payload);
      }
    });

    this.getDishPosting();
  },
  methods: {
    ...mapActions([
      "getDishPosting",
      "activateDishPostings",
      "deactivateDishPostings",
    ]),
    close(val) {
      this.item = {};
      if (val === "Deactivate") {
        this.deactivateDialog = false;
        this.$refs.form6.reset();
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
        dishPostId: this.item.dishPostId,
      };
      this.activateDishPostings(param);
      this.close("Activate");
    },

    deactivate() {
      if (this.$refs.form6.validate()) {
        this.deactivateDialog = false;
        let param = {
          dishPostId: this.item.dishPostId,
          reason: this.deactivateReason,
        };
        this.deactivateDishPostings(param);
        this.close("Deactivate");
      }
    },
  },
};
</script>

<style scoped>
</style>