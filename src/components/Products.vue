<template>
  <div class="products pa-4">
    <div class="text-h6">Products</div>
    <v-data-table
      :headers="getheaders"
      :items="products"
      :search="search"
      sort-by="id"
      class="elevation-1 mt-3"
    >
      <template v-slot:[`item.productImages`]="{ item }">
        <img
          id="preview"
          width="50px"
          height="50px"
          :src="item.productImages[0]"
          alt="Image"
        />
      </template>

      <template v-slot:[`item.productPrice`]="{item}">
        <span>₹&nbsp;{{item.productPrice}}</span>
      </template>

      <template v-slot:[`item.tags`]="{ item }">
        <span v-for="t of item.tags" :key="t">{{ t }},</span>
      </template>

      <template v-slot:[`item.status`]="{ item }">
        <v-chip
          color="success"
          small
          class="ma-1"
          text-color="white"
          v-if="item.status == true"
        >
          Active
        </v-chip>
        <v-chip
          color="red"
          small
          class="ma-1"
          text-color="white"
          v-if="item.status == false"
        >
          Inactive
        </v-chip>
      </template>

       <template v-slot:[`item.veg`]="{item}">
        <span v-if="item.veg == true">Veg</span>
        <span v-if="item.veg == false">Non-Veg</span>
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
              append-icon="mdi-magnify"
              label="Search"
              hide-details
              class="ma-auto mr-2"
            ></v-text-field>
          </v-col>

          <v-dialog v-model="menuDialog" max-width="35%" persistent>
            <v-card>
              <v-card-title class="text-h6"
                >Are You sure want to Activate this Product?</v-card-title
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
              <v-form ref="form5">
                <v-toolbar flat>
                  <v-card-title> Deactivate the Product</v-card-title>
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
    products: [],
    menuDialog: false,
    deactivateDialog: false,
    deactivateReason: "",
    statusText: "",
    item: {}
  }),
  computed: {
    getheaders() {
      let headers = [
        { text: "Product Id ", value: "productId", width: "80px" },
        { text: "Seller Id", value: "sellerId", width: "100px" },
        { text: "Seller Name", value: "sellerName", width: "180px" },
        { text: "ProductName", value: "name", width: "180px" },
        { text: "ProductThumbnail", value: "productImages", width: "150px" },
        { text: "Status", value: "status", width: "120px" },
        { text: "Prod Rating", value: "rating", width: "150px" },
        { text: "Prod Description", value: "description", width: "250px" },

        { text: "Product Added On", value: "addedOn", width: "180px" },
        { text: "Product Type", value: "productType", width: "150px" },
       // { text: "Meal Type", value: "mealType", width: "120px" },
        { text: "Veg/NonVeg", value: "veg", width: "120px" },
        { text: "TasteMeter", value: "tasteMeter.name", width: "150px" },
        { text: "Serving Details", value: "servingSize", width: "150px" },
        {
          text: "Special Instructions",
          value: "specialInstructions",
          width: "250px",
        },
        {
          text: "Available Quantity",
          value: "availableQuantity",
          width: "150px",
        },
       // { text: "Product Tags", value: "productTags", width: "150px" },
        { text: "Product Price", value: "productPrice", width: "150px" },
        { text: "Tags", value: "tags", width: "200px" },
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
      if (mutation.type === "setProducts" && mutation.payload) {
        this.products = JSON.parse(mutation.payload);
      }
    });

    this.getProduct();
  },
  methods: {
    ...mapActions(["getProduct", "activateProducts", "deactivateProducts"]),
    close(val) {
      this.item = {};
      if (val === "Deactivate") {
        this.deactivateDialog = false;
        this.$refs.form5.reset();
      } else if (val === "Activate") {
        this.menuDialog = false;
      }
    },

    statusAction(item, val) {
      if (val === 'Activate') {
        this.item = item;
        this.menuDialog = true;
      } else if (val === 'Deactivate') {
        this.item = item;
        this.deactivateDialog = true;
      }
    },
    activate() {
      this.menuDialog = false;
      let param = {
        productId: this.item.productId,
      };
      this.activateProducts(param);
      this.close('Activate')
    },

    deactivate() {
      if (this.$refs.form5.validate()) {
        this.deactivateDialog = false;
        let param = {
          productId: this.item.productId,
          reason: this.deactivateReason,
        };
        this.deactivateProducts(param);
        this.close('Deactivate')
      }
    },

  },
};
</script>

<style scoped>
</style>