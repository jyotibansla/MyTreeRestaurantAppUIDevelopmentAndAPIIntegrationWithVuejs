<template>
  <div class="sellerRequest pa-4">
    <div class="text-h6">Seller Approval</div>
    <v-data-table
      :headers="headers"
      :items="requestedsellers"
      sort-by="ProductName"
      class="elevation-1 mt-3"
      :search="search"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <div class="d-flex justify-space-between" no-gutters>
          <v-btn
            color="success"
            small
            dark
            class="ma-1 btn"
            @click="approve(item)"
          >
            Approve
          </v-btn>
          <v-btn color="red" small dark class="ma-1 btn" @click="reject(item)">
            Reject
          </v-btn>
        </div>
      </template>

      <template v-slot:[`item.addressProof`]="{ item }">
        <span class="d-flex justify-content-center align-center" no-gutters>
          <v-img
            src="https://tse4.mm.bing.net/th?id=OIP.MCbqdNh6g0IT15DW-jHOZgHaHe&pid=Api&P=0&w=300&h=300"
            height="30px"
            width="30px"
          ></v-img>
          <a @click="download(item.addressProof)">{{
            item.addressProof
          }}</a>
        </span>
      </template>

      <template v-slot:[`item.cancelledCheque`]="{ item }">
        <span class="d-flex justify-content-center align-center" no-gutters>
          <v-img
            src="https://tse4.mm.bing.net/th?id=OIP.MCbqdNh6g0IT15DW-jHOZgHaHe&pid=Api&P=0&w=300&h=300"
            height="30px"
            width="30px"
          ></v-img>
          <a @click="download(item.cancelledCheque)">{{
            item.cancelledCheque
          }}</a>
        </span>
      </template>

      <template v-slot:[`item.cities`]="{ item }">
        <span v-for="c in item.cities" :key="c">{{ c }},</span>
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
      dialog: false,
      dialogDelete: false,
      search: "",
      requestedsellers: [],
    };
  },
  computed: {
    headers() {
      let headers = [
        { text: "Seller Id", value: "sellerId", width: "100px" },
        { text: "Name", value: "name", width: "180px" },
        { text: "Company Name", value: "establishmentName", width: "200px"},
        { text: "EmailAddress", value: "email", width: "180px" },
        { text: "Address", value: "address", width: "250px" },
        { text: "City", value: "city", width: "120px" },
        { text: "Pincode", value: "zipcode", width: "120px" },
        { text: "Contact No.", value: "mobileNumber", width: "180px" },
        { text: "Selected Cities", value: "cities", width: "180px" },
        { text: "AddressProof", value: "addressProof", width: "180px" },
        { text: "Bank Account No.", value: "bankAccountNumber",width: "180px"},
        { text: "Bank Account Holder Name", value: "bankAccountHolderName",width: "200px"},
        { text: "Bank IFSC", value: "ifsc", width: "180px" },
        { text: "Cancelled Cheque", value: "cancelledCheque", width: "200px" },
        { text: "FSSAI Number", value: "fssaiNumber", width: "180px" },
        { text: "GST Number", value: "gstNumber", width: "180px" },
      ];
      if (this.$store.state.Login.userDetails.admin === true) {
        headers.push({text: "Actions",value: "actions", sortable: false, width: "200px"});
      }
      return headers;
    },
  },

  beforeDestroy(){
    this.unsubscribe();
  },

  created() {
    this.unsubscribe = this.$store.subscribe((mutation) => {
      if (mutation.type === "setAllRequestedSellers" && mutation.payload) {
        this.requestedsellers = JSON.parse(mutation.payload);
      }
    });
    this.getRequestedSellers();
  },
  methods: {
    ...mapActions([
      "getRequestedSellers",
      "approveRequestedSeller",
      "rejectRequestedSeller",
    ]),
    approve(item) {
      let param = {
        sellerId: item.sellerId,
      };
      this.approveRequestedSeller(param);
    },
    reject(item) {
      let param = {
        sellerId: item.sellerId,
      };
      this.rejectRequestedSeller(param);
    },

    download(link) {
      // var fileURL = window.URL.createObjectURL(new Blob([link]));
      // var fURL = document.createElement("a");
      // fURL.href = fileURL;
      // fURL.setAttribute("download", val+".pdf");
      // document.body.appendChild(fURL);
      // fURL.click();
      window.open(link, "_self");
    },
  },
};
</script>

<style scoped>
.btn {
  text-transform: capitalize;
}
</style>