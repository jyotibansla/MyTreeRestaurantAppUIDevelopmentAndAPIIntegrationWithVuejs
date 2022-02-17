<template>
  <div class="reportedOrders pa-4">
    <div class="text-h6">Reported Orders</div>
    <v-data-table
      :headers="headers"
      :items="reportedOrders"
      sort-by="id"
      class="elevation-1 mt-3"
      :search="search"
    >
      <template v-slot:[`item.settleBtn`]="{ item }">
        <v-btn
          color="blue lighten-4"
          small
          depressed
          class="ma-1 blue--text btn"
          @click="sellteOrder(item,'Pending')"
          v-if="item.settlementStatus == 'Pending'"
        >
          Settle
        </v-btn>
      </template>

      <template v-slot:[`item.status`]="{ item }">
        <v-btn color="red accent-2" class="btn" small depressed dark>
          {{ item.status }}
        </v-btn>
      </template>

      <!--<template v-slot:[`item.settlementStatus`]="{ item }">
        <v-chip
          color="success"
          small
          class="ma-1"
          text-color="white"
          v-if="item.settlementStatus === true"
        >
          closed
        </v-chip>
        <v-chip
          color="red"
          small
          class="ma-1"
          text-color="white"
          v-if="item.settlementStatus === false"
        >
          Pending
        </v-chip>
      </template>---->
      <template v-slot:[`item.settlementStatus`]="{ item }">
        <v-chip
          small
          text-color="white"
          :color="getColor(item.settlementStatus)"
          >{{ item.settlementStatus }}</v-chip
        >
      </template>

      <template v-slot:top>
        <v-toolbar flat>
          <v-row>
            <v-col cols="12" md="3" lg="4">
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                hide-details
              ></v-text-field>
            </v-col>
            <v-spacer></v-spacer>
          </v-row>

          <v-dialog v-model="dialog" max-width="30%" persistent>
            <v-card>
              <v-form ref="form">
                <v-toolbar flat>
                  <v-card-title>Settle</v-card-title>
                  <v-spacer></v-spacer>
                  <v-btn icon light @click="close('Pending')">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </v-toolbar>
                <v-card-text class="pa-6">
                  <div class="text-h6">Add Comments</div>
                  <v-text-field
                    label="Enter text here"
                    solo
                    class="mt-1"
                    maxlength="120"
                    :rules="[!!comments || 'This Field is Required']"
                    required
                    background-color="grey lighten-3"
                    v-model="comments"
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
                    @click="save"
                  >
                    Submit
                  </v-btn>
                </v-card-actions></v-form
              >
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
  data() {
    return {
      search: "",
      reportedOrders: [],
      dialog: false,
      subscribe:"",
      item: {},
      comments: "",
    };
  },
  computed: {
    headers() {
      let headers = [
        { text: "Order Num", value: "orderRefNum" , width:"150px"},
       // { text: "Status", value: "status" , width:"100px"},
       // { text: "ChefOrderId", value: "chefOrderId" , width:"100px"},
        //{ text: "SellerOrderId", value: "sellerOrderId" , width:"100px"},
        { text: "Customer Name", value: "customerName", width:"180px" },
        { text: "Product Name", value: "itemName", width:"180px" },
         { text: "Settlement Status", value: "settlementStatus" , width:"180px"},
        { text: "Total Amt. Due", value: "total" , width:"150px", align:"center"},
        { text: "Ordered On", value: "orderedOn", width:"180px" },
        { text: "Reported On", value: "reportedOn" , width:"180px"},
        { text: "Comments", value: "comments" , width:"200px"},
        { text: "", value: "settleBtn" , width:"100px", sortable:false},
      ];
      return headers;
    },
  },
  created() {
   this.subscribe = this.$store.subscribe((mutation) => {
      if (mutation.type === "setReportedOrders" && mutation.payload) {
        this.reportedOrders = JSON.parse(mutation.payload);
      }
    });

    this.getAllReportedOrders();
  },
  methods: {
    ...mapActions(["getAllReportedOrders","settleOrder"]),

  getColor(val) {
      if (val == "Settled" || val == "Fulfilled") return "green";
      else if (val == "Pending") return "red";
      else return "yellow";
    },
     close(val) {
      this.item = {};
      if (val === 'Pending') {
        this.dialog = false;
        this.$refs.form.reset();
     
      }
    },
    sellteOrder(item,val) {
      if (val === 'Pending') {
        this.item = item;
      this.dialog = true;
      
      }
    },
  save() {
    if (this.$refs.form.validate()) {
     this.dialog = false;
      let param = {
        chefOrderId: this.item.chefOrderId,
        sellerOrderId: this.item.sellerOrderId,
        reason: this.comments,
      };
      this.settleOrder(param);
      this.close('Pending')
    }
  },
 /* close() {
    this.dialog = false;
    this.item = {};
    this.$refs.form.reset();
  },*/
  }
};
</script>