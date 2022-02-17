<template>
  <div class="chefs pa-4">
    <div class="text-h6">Sellers</div>
    <v-data-table
      :headers="headers"
      :items="sellers"
      sort-by="id"
      class="elevation-1 mt-3"
      :search="search"
    >
      <template v-slot:[`item.addressProof`]="{ item }">
        <span class="d-flex justify-content-center align-center" no-gutters>
          <v-img
            src="https://tse4.mm.bing.net/th?id=OIP.MCbqdNh6g0IT15DW-jHOZgHaHe&pid=Api&P=0&w=300&h=300"
            height="30px"
            width="30px"
          ></v-img>
          <a @click="download(item.addressProof)">{{ item.addressProof }}</a>
        </span>
      </template>

      <template v-slot:[`item.cancelledCheque`]="{ item }">
        <span class="d-flex justify-content-center align-center" no-gutters>
          <v-img
            src="https://tse4.mm.bing.net/th?id=OIP.MCbqdNh6g0IT15DW-jHOZgHaHe&pid=Api&P=0&w=300&h=300"
            height="30px"
            width="30px"
          ></v-img>
          <a @click="download(item.cancelledCheque)">{{ item.cancelledCheque }}</a>
        </span>
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
        </v-toolbar>

        <v-dialog v-model="activateDialog" max-width="35%" persistent>
          <v-card>
            <v-card-title
              >Are you sure want to Activate this Seller?</v-card-title
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
            <v-form ref="form3">
              <v-toolbar flat>
                <v-card-title> Deactivate Seller</v-card-title>
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

        <v-dialog v-model="cityDialog" max-width="60%" persistent>
          <v-card v-model="viewCities">
            <v-toolbar flat>
              <v-card-title> Current Cities</v-card-title>
              <v-spacer></v-spacer>
              <v-btn icon light @click="close('cities')">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-toolbar>
            <v-data-table
              :headers="citiesHeaders"
              :items="scities"
              :items-per-page="5"
              class="elevation-1 pa-5"
            >
              <template v-slot:[`item.deliveryPeriod`]="{ item }">
                <span
                  >{{ item.deliveryPeriod }}&nbsp;&nbsp;{{
                    item.deliveryChronograph
                  }}</span
                >
              </template>
            </v-data-table>
          </v-card>
        </v-dialog>
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

      <template v-slot:[`item.champion`]="{ item }">
        <v-icon v-if="item.champion == true" color="orange"
          >mdi-star-circle</v-icon
        >
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

      <template v-slot:[`item.email`]="{ item }">
        <span
          >{{ item.email }}
          <v-icon v-if="item.isEmailRegestered == true" color="success"
            >mdi-check-circle-outline</v-icon
          >
          <v-icon v-if="item.isEmailRegestered == false" color="red"
            >mdi-information-outline</v-icon
          >
        </span>
      </template>

      <template v-slot:[`item.cityStatus`]="{ item }">
        <v-btn
          color="blue lighten-4"
          small
          depressed
          class="ma-1 blue--text btn"
          @click="viewCities(item)"
        >
          View Cities
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data: () => ({
    search: "",
    deactivateDialog: false,
    activateDialog: false,
    deactivateReason: "",
    cityDialog: false,
    championDialog: false,
    championText: "",
    sellercities: "",
    item: {},
    scities: [],
    sellers: [],
  }),

  computed: {
    headers() {
      let headers = [
        // { text: "Parent ID", value: "parentID" },
        { text: "", value: "champion", width: "50px", sortable: false },
        { text: "Seller ID", value: "sellerId", width: "100px" },
        { text: "Name", value: "name", width: "200px", align: "start" },
        {
          text: "Company Name",
          value: "establishmentName",
          width: "200px",
          align: "start",
        },
        //{ text: "UserName", value: "userName", width:'150px' },
        { text: "Status", value: "status", width: "120px", align: "center" },

        { text: "Mobile Number", value: "mobileNumber", width: "150px" },
        { text: "Email Address", value: "email", width: "250px" },
        //{ text: "Date Of Birth", value: "dob" ,width:'120px'},
        { text: "Approved On", value: "approvedOn", width: "200px" },
        { text: "Address", value: "address", width: "250px" },
        { text: "City", value: "city", width: "150px" },
        { text: "Pincode", value: "zipcode", width: "100px" },
        { text: "Address Proof", value: "addressProof", width: "180px" },
        {
          text: "Bank Account No.",
          value: "bankAccountNumber",
          width: "200px",
        },
        {
          text: "Bank Account Holders Name",
          value: "bankAccountHolderName",
          width: "250px",
        },
        { text: "Bank IFSC", value: "ifsc", width: "120px" },
        { text: "Cancelled Cheque", value: "cancelledCheque", width: "200px" },
        { text: "FSSAI Number", value: "fssaiNumber", width: "150px" },
        { text: "GST Number", value: "gstNumber", width: "150px" },
        { text: "Orders Count", value: "totalOrders", width: "160px" },
        {
          text: "Orders Amount",
          value: "totalOrdersAmount",
          width: "180px",
        },
        // { text: "Total  Amount", value: "ttlCODAmt", width: "150px" },
        { text: "Open Orders Count", value: "openOrders", width: "160px" },
        {
          text: "Cancelled Orders Count",
          value: "cancelledOrders",
          width: "120px",
        },
        { text: "Reported Orders", value: "reportedOrders", width: "100px" },
        { text: "City Status", value: "cityStatus", sortable: false },
      ];

      if (this.$store.state.Login.userDetails.admin === true) {
        headers.unshift({ text: "", value: "start", sortable: false });
      }
      return headers;
    },

    citiesHeaders() {
      let headers = [
        { text: "City", align: "start", value: "cityName" },
        {
          text: "Delivery Time (Days)",
          value: "deliveryPeriod",
          align: "center",
        },
        { text: "Delievery Charge", value: "deliveryCharge", align: "center" },
        { text: "Commission %", value: "commission", align: "center" },
      ];
      return headers;
    },
  },

  beforeDestroy() {
    this.unsubscribe();
  },

  created() {
    this.unsubscribe = this.$store.subscribe((mutation) => {
      if (mutation.type === "setAllApprovedSellers" && mutation.payload) {
        this.sellers = JSON.parse(mutation.payload);
      }
      if (mutation.type === "setSellerCities" && mutation.payload) {
        this.scities = JSON.parse(mutation.payload);
      }
    });
    this.getApprovedSellers();
  },

  methods: {
    ...mapActions([
      "getApprovedSellers",
      "activateSeller",
      "deactivateSeller",
      "showCities",
    ]),

    close(val) {
      this.item = {};
      if (val === "Deactivate") {
        this.deactivateReason = "";
        this.deactivateDialog = false;
        this.$refs.form3.reset();
      } else if (val === "cities") {
        this.cityDialog = false;
      } else if (val === "Activate") {
        this.activateDialog = false;
      }
    },

    statusAction(item, val) {
      if (val === "Activate") {
        this.item = item;
        this.activateDialog = true;
      } else if (val === "Deactivate") {
        this.item = item;
        this.deactivateDialog = true;
      }
    },
    activate() {
      this.activateDialog = false;
      let param = {
        sellerId: this.item.sellerId,
      };
      this.activateSeller(param);
      this.item = {};
    },

    deactivate() {
      if (this.$refs.form3.validate()) {
        this.deactivateDialog = false;
        let param = {
          sellerId: this.item.sellerId,
          reason: this.deactivateReason,
        };
        this.deactivateSeller(param);
        this.item = {};
        this.$refs.form3.reset();
      }
    },

    viewCities(val) {
      this.item = val;
      let param = {
        sellerId: this.item.sellerId,
      };
      this.showCities(param);
      this.cityDialog = true;
    },

    download(link){
      window.open(link, "_self");
    }
  },
};
</script>

<style scoped>
.btn {
  text-transform: capitalize;
}
</style>