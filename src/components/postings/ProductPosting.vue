<template>
  <div class="productPostings pa-4">
    <div class="text-h6">Product Postings</div>
    <v-data-table
      :headers="getheaders"
      :items="productpost"
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

      <template v-slot:[`item.tags`]="{ item }">
        <span v-for="t of item.tags" :key="t">{{ t }},</span>
      </template>

      <template v-slot:[`item.productImages`]="{ item }">
        <img  id="preview" width="50px" height="50px"
          :src="item.productImages[0]"
          alt="Image"
        />
      </template>

      <template v-slot:[`item.currentCities`]="{ item }">
        <v-btn
          color="blue lighten-4"
          small
          depressed
          class="ma-1 blue--text btn"
          @click="viewProductPostCities(item)"
        >
          View Cities
        </v-btn>
      </template>

      <template v-slot:[`item.veg`]="{item}">
        <span v-if="item.veg == true">Veg</span>
        <span v-if="item.veg == false">Non-Veg</span>
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
          <v-dialog v-model="cityDialog" max-width="60%" persistent>
            <v-card>
              <v-toolbar flat>
                <v-card-title> Current Cities</v-card-title>
                <v-spacer></v-spacer>
                <v-btn icon light @click="close('cities')">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-toolbar>
              <v-data-table
                :headers="getheaderss"
                :items="pcities"
                :items-per-page="5"
                class="elevation-1 pa-5"
              >
                <template v-slot:[`item.listed`]="{ item }">
                  <v-icon color="green" v-if="item.listed == true">
                    mdi-check-circle-outline</v-icon
                  >
                  <v-icon color="red" v-if="item.listed == false">
                    mdi-close-circle-outline</v-icon
                  >
                </template>
              </v-data-table>
            </v-card>
          </v-dialog>

          <v-dialog v-model="menuDialog" max-width="30%" persistent>
            <v-card>
              <v-card-title class="text-h6"
                >Are you sure want to Activate this Product Posting?</v-card-title
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

          <v-dialog v-model="deactivateDialog" max-width="40%" persistent>
            <v-card>
              <v-form ref="form7">
                <v-toolbar flat>
                  <v-card-title> Deactivate Product Posting</v-card-title>
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
    cityDialog: false,
    deactivateDialog: false,
    deactivateReason: "",
    productpost: [],
    pcities: [],
    productcities: "",
    menuDialog: false,
    statusText: "",
    item: {},
  }),
  computed: {
    getheaders() {
      let headers = [
        {
          text: "Product Post Id ",
          sortable: true,
          value: "productPostId",
          width: "80px",
        },
        { text: "Product Name", value: "name", width: "180px" },
        {
          text: "Product Thumbnail",
          value: "productImages",
          width: "180px",
        },
        { text: "Status", value: "status", width: "150px" },
        { text: "Product Rating", value: "rating", width: "150px" },
        {
          text: "Product Description",
          value: "description",
          width: "250px",
        },
        { text: "Seller Name", value: "sellerName", width: "180px" },
        { text: "Product AddedOn", value: "addedOn", width: "180px" },
        { text: "Product Type", value: "productType", width: "150px" },
       // { text: "Meal Type", value: "mealType", width: "120px" },
        { text: "Veg/NonVeg", value: "veg", width: "120px" },
        { text: "Taste Meter", value: "tasteMeter.name", width: "150px" },
        { text: "Serving Details", value: "servingSize", width: "150px" },
        // { text: 'ServingMeasurePieces', value: 'ServingMeasurePieces'},
        {
          text: "Special Instructions",
          value: "specialInstructions",
          width: "250px",
        },
        { text: "System Tags", value: "systemTags", width: "180px" },
        { text: "Seller Tags", value: "tags", width: "180px" },
        { text: "Posted On", value: "postedOn", width: "180px" },
        { text: "Available Qty", value: "availableQuantity", width: "150px" },
        { text: "Posting Chapter", value: "postingChapter", width: "150px" },
        { text: "Base Price", value: "basePrice", width: "120px" },
        {
          text: "Delievery Charge(Local)",
          value: "deliveryCharge",
          width: "180px",
        },
        {
          text: "Delievery Time(Days)",
          value: "deliveryTime",
          width: "180px",
        },
        { text: "CurrentCities", value: "currentCities", width: "180px" },
      ];
      if (this.$store.state.Login.userDetails.admin === true) {
        headers.unshift({ text: "", value: "start", width: "20px" });
      }
      return headers;
    },
    getheaderss() {
      let headerss = [
        { text: "City", sortable: false, value: "city" },
        { text: "Commission %", value: "commission" },
        { text: "Delievery Charge", value: "deliveryCharge" },
        { text: "Delivery Time (Days)", value: "deliveryTime" },
        { text: "Product Listed", value: "listed", align: "center" },
      ];
      return headerss;
    },
  },

  beforeDestroy(){
    this.unsubscribe();
  },

  created() {
    this.unsubscribe = this.$store.subscribe((mutation) => {
      if (mutation.type === "setProductPosting" && mutation.payload) {
        this.productpost = JSON.parse(mutation.payload);
      }
    });
    this.$store.subscribe((mutation) => {
      if (mutation.type === "setProductCities" && mutation.payload) {
        this.pcities = JSON.parse(mutation.payload);
      }
    });

    this.getProductPosting();
  },
  methods: {
    ...mapActions([
      "getProductPosting",
      "activateProductPostings",
      "deactivateProductPostings",
      "showProductPostCities",
    ]),

    close(val) {
      this.item = {};
      if (val === "Deactivate") {
        this.deactivateDialog = false;
        this.$refs.form7.reset();
      } else if (val === "Activate") {
        this.menuDialog = false;
      } else if (val === "cities") {
        this.cityDialog = false;
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
        productPostId: this.item.productPostId,
      };
      this.activateProductPostings(param);
      this.close('Activate');
    },

    deactivate() {
      if (this.$refs.form7.validate()) {
        this.deactivateDialog = false;
        let param = {
          productPostId: this.item.productPostId,
          reason: this.deactivateReason,
        };
        this.deactivateProductPostings(param);
        this.close('Deactivate');
      }
    },

    viewProductPostCities(val) {
      this.item = val;
      let param = {
        productPostId: this.item.productPostId,
      };
      this.showProductPostCities(param);
      this.cityDialog = true;
    },
  },
};
</script>

<style scoped>
.btn {
  text-transform: none;
}
</style>