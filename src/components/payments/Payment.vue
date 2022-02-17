<template>
  <div class="payments pa-4">
    <div class="text-h6">Payments</div>
    <v-data-table
      :headers="getHeaders"
      :items="items"
      :search="search"
      sort-by="order_no"
      class="elevation-1 mt-3 pa-1"
    >
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
export default {
  data() {
    return {
      search: "",
      items: [
        {
          transaction_type: "Payment/Reciept",
          order_no: "MTORD001001",
          payment_amt: "Rs. 250",
          transaction_amt: "Rs. 250",
          basePrice: "Rs. 250",
          deliveryCharge:"Rs. 20",
          bhukkadCF: "Rs. 10",
          bhukkadCGST: "Rs. 2",
          bhukkadSGST: "Rs. 10",
          chefCF: "Rs. 20",
          chefCGST: "Rs. 2",
          chefSGST: "Rs. 2",
          sellerCommission: "Rs. 20",
          sellerCommissionCGST: "Rs. 2",
          sellerCommissionSGST:"Rs. 2",
          bank_utr:"12345678"
        },
        {
          transaction_type: "Payment/Reciept",
          order_no: "MTORD003848",
          payment_amt: "Rs. 280",
          transaction_amt: "Rs. 280",
          basePrice: "Rs. 280",
          deliveryCharge:"Rs. 20",
          bhukkadCF: "Rs. 10",
          bhukkadCGST: "Rs. 2",
          bhukkadSGST: "Rs. 10",
          chefCF: "Rs. 20",
          chefCGST: "Rs. 2",
          chefSGST: "Rs. 2",
          sellerCommission: "Rs. 20",
          sellerCommissionCGST: "Rs. 2",
          sellerCommissionSGST:"Rs. 2",
          bank_utr:"12837475"
        },
        {
          transaction_type: "Payment/Reciept",
          order_no: "MTORD082391",
          payment_amt: "Rs. 250",
          transaction_amt: "Rs. 250",
          basePrice: "Rs. 250",
          deliveryCharge:"Rs. 20",
          bhukkadCF: "Rs. 10",
          bhukkadCGST: "Rs. 2",
          bhukkadSGST: "Rs. 10",
          chefCF: "Rs. 20",
          chefCGST: "Rs. 2",
          chefSGST: "Rs. 2",
          sellerCommission: "Rs. 20",
          sellerCommissionCGST: "Rs. 2",
          sellerCommissionSGST:"Rs. 2",
          bank_utr:"83749563"
        },
        {
          transaction_type: "Payment/Reciept",
          order_no: "MTORD083743",
          payment_amt: "Rs. 250",
          transaction_amt: "Rs. 250",
          basePrice: "Rs. 250",
          deliveryCharge:"Rs. 20",
          bhukkadCF: "Rs. 10",
          bhukkadCGST: "Rs. 2",
          bhukkadSGST: "Rs. 10",
          chefCF: "Rs. 20",
          chefCGST: "Rs. 2",
          chefSGST: "Rs. 2",
          sellerCommission: "Rs. 20",
          sellerCommissionCGST: "Rs. 2",
          sellerCommissionSGST:"Rs. 2",
          bank_utr:"83792732"
        },
        {
          transaction_type: "Payment/Reciept",
          order_no: "MTORD003324",
          payment_amt: "Rs. 250",
          transaction_amt: "Rs. 250",
          basePrice: "Rs. 250",
          deliveryCharge:"Rs. 20",
          bhukkadCF: "Rs. 10",
          bhukkadCGST: "Rs. 2",
          bhukkadSGST: "Rs. 10",
          chefCF: "Rs. 20",
          chefCGST: "Rs. 2",
          chefSGST: "Rs. 2",
          sellerCommission: "Rs. 20",
          sellerCommissionCGST: "Rs. 2",
          sellerCommissionSGST:"Rs. 2",
          bank_utr:"12234848"
        },
        {
          transaction_type: "Payment/Reciept",
          order_no: "MTORD003373",
          payment_amt: "Rs. 250",
          transaction_amt: "Rs. 250",
          basePrice: "Rs. 250",
          deliveryCharge:"Rs. 20",
          bhukkadCF: "Rs. 10",
          bhukkadCGST: "Rs. 2",
          bhukkadSGST: "Rs. 10",
          chefCF: "Rs. 20",
          chefCGST: "Rs. 2",
          chefSGST: "Rs. 2",
          sellerCommission: "Rs. 20",
          sellerCommissionCGST: "Rs. 2",
          sellerCommissionSGST:"Rs. 2",
          bank_utr:"12392739"
        },
      ],
    };
  },
  computed: {
    getHeaders() {
      let headers = [
        { text: "Transaction Type", value: "transaction_type", width:'150px' },
        { text: "Order No.", value: "order_no" , width:'120px'},
        { text: "Payment Amt", value: "payment_amt" , width:'150px'},
        { text: "Transaction Amt", value: "transaction_amt", width:'150px' },
        { text: "Base Price", value: "basePrice" , width:'150px'},
        { text: "Dilivery Charge", value: "diliveryCharge", width:'150px' },
        { text: "Bhukkad CF", value: "bhukkadCF", width:'150px' },
        { text: "CGST on Bhukkad CF", value: "bhukkadCGST", width:'180px' },
        { text: "Chef CF", value: "chefCF", width:'150px' },
        { text: "CGST on Chef CF", value: "chefCGST", width:'150px' },
        { text: "SGST on Chef CF", value: "chefSGST" ,width:'150px'},
        { text: "Seller Commisiion", value: "sellerCommission", width:'150px' },
        { text: "CGST on Seller Commisiion", value: "sellerCommissionCGST", width:'180px' },
        { text: "SGST on Seller Commisiion", value: "sellerCommissionSGST", width:'180px' },
        { text: "Bank's UTR", value: "bank_utr", width:'150px' },
      ];
      return headers;
    },
  },
  methods: {},
};
</script>