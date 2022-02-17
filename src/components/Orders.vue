<template>
  <div class="orders pa-4">
    <div class="text-h6">Orders</div>
    <v-data-table
      :headers="getHeaders"
      :items="orders"
      :search="search"
      :single-expand="singleExpand"
      :expanded.sync="expanded"
      item-key="orderNumber"
      show-expand
      class="elevation-1 mt-3"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-row>
            <v-col cols="12" md="3" lg="4">
              <v-text-field
                label="search"
                hide-details
                v-model="search"
                append-icon="mdi-magnify"
              ></v-text-field>
            </v-col>
          </v-row>
          <!--  <v-dialog v-model="dialog" max-width="20%">
            <v-card>
              <v-card-title>Inner Data Dialog</v-card-title>
              <v-card-text>
                <v-text-field
                  label="Change status"
                  v-model="statusVal"
                ></v-text-field>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="update" color="primary">Save</v-btn>
                <v-btn @click="dialog = !dialog" color="secondary">Close</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog> -->
        </v-toolbar>
      </template>

      <template v-slot:[`item.paymentStatus`]="{ item }">
        <v-chip
          small
          text-color="white"
          :color="getColor(item.paymentStatus)"
          >{{ item.paymentStatus }}</v-chip
        >
      </template>

      <template v-slot:[`item.total`]="{ item }">
        <span> ₹ &nbsp;{{ item.total }}</span>
      </template>

      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length" class="ma-0 pa-1">
          <v-data-table
            :headers="subHeaders"
            :items="item.chefOrSellerOrders"
            :single-expand="subsingleExpand"
            :expanded.sync="subexpanded"
            item-key="name"
            show-expand
            hide-default-footer
          >
            <template v-slot:[`item.status`]="{ item }">
              <v-chip
                small
                text-color="white"
                :color="getSubStatusColor(item.status)"
                >{{ item.status }}</v-chip
              >
              <!--   @click="change(item)" -->
            </template>

            <template v-slot:[`item.deliveryCharge`]="{ item }">
              <span> ₹&nbsp;{{ item.deliveryCharge }}</span>
            </template>

            <template v-slot:[`item.totalAmount`]="{ item }">
              <span> ₹&nbsp;{{ item.totalAmount }}</span>
            </template>

            <template v-slot:expanded-item="{ headers, item }">
              <td :colspan="headers.length" class="ma-0 pa-1">
                <v-data-table
                  :headers="megaHeaders"
                  :items="item.dishesOrProducts"
                  hide-default-footer
                >
                  <template v-slot:[`item.basePrice`]="{ item }">
                    <span> ₹&nbsp;{{ item.basePrice }}</span>
                  </template>

                  <template v-slot:[`item.amountPayable`]="{ item }">
                    <span> ₹&nbsp;{{ item.amountPayable }}</span>
                  </template>
                </v-data-table>
              </td>
            </template>
          </v-data-table>
        </td>
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
      expanded: [],
      singleExpand: true,
      subexpanded: [],
      subsingleExpand: true,
      dialog: false,
      statusVal: "",
      item: "",
      orders: [],
    };
  },

  computed: {
    getHeaders() {
      let headers = [
        { text: "order No.", value: "orderNumber" },
        { text: "Customer Name", value: "customerName" },
        { text: "Dilivery Address", value: "address" },
        { text: "Total Value", value: "total" },
        { text: "Payment Status", value: "paymentStatus" },
      ];

      return headers;
    },
    subHeaders() {
      let subHeaders = [
        { text: "Ref No.", value: "" },
        { text: "Chef/Seller Name", value: "name" },
        { text: "Order Status", value: "status" },
        { text: "No. of Items", value: "totalItems" },
        { text: "Quantity", value: "quantity" },
        { text: "Ordered On", value: "orderedOn" },
        { text: "Dilivery Charges", value: "deliveryCharge" },
        { text: "Mode", value: "orderType" },
        { text: "My Points Used", value: "" },
        { text: "Total Amount", value: "totalAmount" },
        { text: "Payment Mode", value: "paymentMode" },
      ];
      return subHeaders;
    },
    megaHeaders() {
      let megaOrders = [
        { text: "Dish/Product", value: "name" },
        { text: "Base Price", value: "basePrice" },
        { text: "Quantity", value: "quantity" },
        { text: "Discount(%)", value: "discount" },
        { text: "Amount Payable", value: "amountPayable" },
      ];
      return megaOrders;
    },
  },

  beforeDestroy() {
    this.unsubscribe();
  },

  created() {
    this.unsubscribe = this.$store.subscribe((mutation) => {
      if (mutation.type === "setOrders" && mutation.payload) {
        this.orders = JSON.parse(mutation.payload);
      }
    });
    this.getAllOrders();
  },

  methods: {
    ...mapActions(["getAllOrders"]),
    getColor(val) {
      if (val == "Settled" || val == "Fulfilled") return "green";
      else if (val == "Pending") return "red";
      else return "yellow";
    },
    getSubStatusColor(val) {
      if (val === "ACTIVE") return "warning";
      else if (val === "DELIVERED") return "success";
      else if (val === "DISPATCHED") return "green lighten-2";
      else if (val === "REPORTED") return "deep-orange lighten-3";
      else return "red";
    },

    change(v) {
      console.log("se", v);
      this.item = v;
      this.dialog = true;
    },

    update() {
      this.items.filter((x) => {
        if (x.subOrder) {
          x.subOrder.filter((y) => {
            if (y.refNo == this.item.refNo) {
              y.orderStatus = this.statusVal;
              return y;
            }
          });
          console.log("item", x);
          return x;
        }
      });
      //console.log("hd", status)
      //if(this.items.subOrder.orderStatus == this.item.orderStatus){
      // status.subOrder.orderStatus = this.statusVal;
      //}
      this.statusVal = "";
      this.dialog = false;
    },
  },
};
</script>