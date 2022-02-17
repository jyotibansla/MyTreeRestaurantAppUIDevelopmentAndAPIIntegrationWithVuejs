<template>
  <div class="chefs pa-4">
    <div class="text-h6">Chef</div>
    <v-data-table
      :headers="headers"
      :items="chefs"
      sort-by="id"
      class="elevation-1 mt-3"
      :search="search"
    >
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

        <v-dialog v-model="deactivateDialog" max-width="30%" persistent>
          <v-card>
            <v-form ref="form2">
              <v-toolbar flat>
                <v-card-title> Deactivate Chef</v-card-title>
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
                  :rules="[!!deactivateReason || 'This Field is Required']"
                  required
                  maxlength="120"
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

        <v-dialog v-model="awardDialog" max-width="30%" persistent>
          <v-card>
            <v-form ref="awardForm">
              <v-toolbar flat>
                <v-card-title> Update Chef Award And Chef Level</v-card-title>
                <v-spacer></v-spacer>
                <v-btn icon light @click="close('award')">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-toolbar>
              <v-card-text class="pa-5">
                <v-row>
                  <v-col md="6" sm="12" cols="12">
                    <v-select
                      item-text="name"
                      v-model="item.chefAward"
                      :items="awards"
                      :value="item.chefAward"
                    > <!-- 
                      @input="onchange($event)" -->
                    </v-select>
                  </v-col>
                  <v-col md="6" sm="12" cols="12">
                    <v-select
                      label="Select"
                      item-text="name"
                      v-model="item.chefLevel"
                      :items="cheflevels"
                    ></v-select> <!-- 
                      @input="changeLevel($event)" -->
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-actions class="d-flex justify-center">
                <v-btn
                  small
                  dark
                  depressed
                  class="mb-3 btn"
                  color="pink"
                  @click="UpdateAwardLevel"
                >
                  Update
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-dialog>

        <v-dialog v-model="activateDialog" max-width="30%" persistent>
          <v-card>
            <v-card-title
              >Are you sure want to Activate this Chef?</v-card-title
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
            <v-list-item
              @click="openAwardLevelDialog(item)"
              v-if="item.status == true"
            >
              Assign Award and Level
            </v-list-item>
          </v-list>
        </v-menu>
      </template>

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
          <v-icon v-if="item.isEmailRegestered == true" color="success">
            mdi-check-circle-outline</v-icon
          >
          <v-icon v-if="item.isEmailRegestered == false" color="red">
            mdi-information-outline</v-icon
          >
        </span>
      </template>

      <!-- <template v-slot:[`item.chefAward`]="{ item }">
        <v-select
          v-model="item.chefAward"
          :items="awards"
          dense
          class="ma-1"
          hide-details="auto"
          background-color="blue lighten-4"
        ></v-select>
        <select>
          <option
            v-for="(i, index) in awards"
            v-bind:key="index"
            :selected="i.name"
          >
            {{ i.name }} <span class="d-none">{{ item.chefAward }}</span>
          </option>
        </select>
      </template> -->

      <!-- <template v-slot:[`item.chefAward`]="props">
        <v-edit-dialog
          :return-value.sync="props.item.chefAward"
          large
          persistent
          @save="saveAward(props.item)"
          @cancel="cancel"
        >
          <div background-color="blue lighten-4" class="ma-1 blue--text">
            {{ props.item.chefAward }}
          </div>
          <template v-slot:input>
            <div class="mt-4 text-h6">Update Chef Award</div>
            <v-select
              item-text="name"
              v-model="props.item.chefAward"
              :items="awards"
              :value="props.item.chefAward"
              @input="onchange($event)"
            >
            </v-select>
          </template>
        </v-edit-dialog>
      </template>

      <template v-slot:[`item.chefLevel`]="props">
        <v-edit-dialog
          large
          persistent
          @save="saveAward(props.item)"
          @cancel="cancel"
        >
          <div background-color="blue lighten-4" class="ma-1 blue--text">
            {{ props.item.chefLevel }}
          </div>
          <template v-slot:input>
            <div class="mt-4 text-h6">Update Chef Level</div>
            <v-select
              label="Select"
              item-text="name"
              v-model="props.item.chefLevel"
              :items="cheflevels"
              @input="changeLevel($event)"
            >
            </v-select>
          </template>
        </v-edit-dialog>
      </template> -->
    </v-data-table>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data: () => ({
    search: "",
    awardDialog: false,
    deactivateDialog: false,
    activateDialog: false,
    deactivateReason: "",
    championDialog: false,
    championText: "",
    item: {},
    awards: [],
    cheflevels: [{ name: "city chef" }, { name: "chapter chef" }],
    select: "Award-0",
    selectLevel: "city chef",
    chefs: [],
  }),

  computed: {
    headers() {
      let headers = [
        { text: "", value: "champion", width: "50px", sortable: false },
        { text: "Chef ID", value: "chefId", width: "120px" },
        { text: "Name", value: "name", width: "200px", align: "start" },

        { text: "UserName", value: "userName", width: "150px" },
        { text: "Status", value: "status", width: "120px", align: "center" },
        { text: "Mobile Number", value: "mobileNumber", width: "150px" },
        { text: "Email Address", value: "email", width: "250px" },
        // { text: "DOB", value: "dob", width: "120px" },
        { text: "Approved On", value: "approvedOn", width: "250px" },
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
        { text: "Bank IFSC", value: "ifsc", width: "150px" },
        { text: "Cancelled Cheque", value: "cancelledCheque", width: "200px" },
        { text: "FSSAI Number", value: "fssaiNumber", width: "150px" },
        { text: "Orders Count", value: "totalOrders", width: "160px" },
        {
          text: "Orders Amount",
          value: "totalOrdersAmount",
          width: "180px",
        },
        { text: "COD Amount", value: "ttlCODAmt", width: "150px" },
        {
          text: "Online Amount",
          value: "ttlOnlineAmount",
          width: "160px",
        },
        { text: "Open Orders Count", value: "openOrders", width: "160px" },
        {
          text: "Cancelled Orders Count",
          value: "cancelledOrders",
          width: "120px",
        },
        { text: "Reported", value: "reportedOrders", width: "100px" },
        { text: "Chef Award", value: "chefAward", width: "160px" },
        { text: "Chef Level", value: "chefLevel", width: "180px" },
      ];

      if (this.$store.state.Login.userDetails.admin === true) {
        headers.unshift({ text: "", value: "start", sortable: false });
        // headers.push(
        //   { text: "Chef Award", value: "chefAward", width: "160px" },
        //   { text: "Chef Level", value: "chefLevel", width: "180px" }
        // );
      }
      return headers;
    },
  },

  beforeDestroy(){
    this.unsubscribe();
  },

  created() {
    this.unsubscribe = this.$store.subscribe((mutation) => {
      if (mutation.type === "setAllApprovedChefs" && mutation.payload) {
        this.chefs = JSON.parse(mutation.payload);
      }
      if (mutation.type === "setChefAwards" && mutation.payload) {
        this.awards = JSON.parse(mutation.payload);
      }
    });
    this.getApprovedChefs();
    this.getChefAwards();
  },

  methods: {
    ...mapActions([
      "getApprovedChefs",
      "activateChef",
      "deactivateChef",
      "getChefAwards",
      "addAwardLevel",
    ]),

    close(val) {
      this.item = {};
      if (val === "Deactivate") {
        this.deactivateDialog = false;
        this.$refs.form2.reset();
      } else if (val === "Activate") {
        this.activateDialog = false;
      } else if (val === "award") {
        this.awardDialog = false;
        this.$refs.awardForm.reset();
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
        chefId: this.item.chefId,
      };
      this.activateChef(param);
      this.close("Activate");
    },

    deactivate() {
      if (this.$refs.form2.validate()) {
        this.deactivateDialog = false;
        let param = {
          chefId: this.item.chefId,
          reason: this.deactivateReason,
        };
        this.deactivateChef(param);
        this.close("Deactivate");
      }
    },
    /* onchange(e) {
      console.log("dsf", e);
    },
    changeLevel(e) {
      console.log("sa", e);
    }, */
    saveAward(val) {
      console.log(val);
    },
    cancel() {
      console.log("object");
    },
    openAwardLevelDialog(item) {
      this.item = item;
      this.awardDialog = true;
    },

    UpdateAwardLevel() {
      if (this.$refs.awardForm.validate()) {
        let param = {
          award: this.item.chefAward,
          chefId: this.item.chefId,
          level: this.item.chefLevel,
        };
        this.addAwardLevel(param);
      }
      this.close("award");
    },

    download(link){
      window.open(link, "_self");
    }
  },
};
</script>

<style scoped>
.v-data-table > .v-data-table__wrapper > table > thead > tr > th {
  white-space: normal;
}
.btn {
  text-transform: capitalize;
}
</style>