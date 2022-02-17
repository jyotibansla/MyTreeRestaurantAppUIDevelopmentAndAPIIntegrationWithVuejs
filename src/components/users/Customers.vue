<template>
  <div class="bhukkads pa-4">
    <div class="text-h6">Customer</div>
    <v-data-table
      :headers="headers"
      :items="customers"
      sort-by="id"
      class="elevation-1 mt-3"
      :search="search"
    >
      <template v-slot:[`item.email`]="{ item }">
        <span
          >{{ item.email }}
          <v-icon v-if="item.emailVerified == true" color="success"
            >mdi-check-circle-outline</v-icon
          >
          <v-icon v-if="item.emailVerified == false" color="red"
            >mdi-information-outline</v-icon
          >
        </span>
      </template>

      <template v-slot:[`item.active`]="{ item }">
        <v-chip
          color="success"
          small
          class="ma-1"
          text-color="white"
          v-if="item.active === true"
        >
          Active
        </v-chip>
        <v-chip
          color="red"
          small
          class="ma-1"
          text-color="white"
          v-if="item.active === false"
        >
          Inactive
        </v-chip>
      </template>

      <template v-slot:[`item.MyPoints`]="{ item }">
        <div class="d-flex justify-space-between align-center" no-gutters>
          <v-btn
            color="blue lighten-4"
            small
            depressed
            class="ma-1 blue--text btn"
            @click="myPoints(item, 'Add')"
          >
            Add
          </v-btn>
          <v-btn
            color="blue lighten-4"
            small
            depressed
            class="ma-1 blue--text btn"
            @click="myPoints(item, 'Subtract')"
          >
            Subtract
          </v-btn>
          <v-btn
            color="blue lighten-4"
            small
            depressed
            class="ma-1 blue--text btn"
            @click="viewHist(item)"
          >
            History
          </v-btn>
        </div>
      </template>

      <template v-slot:[`item.action`]="{ item }">
        <v-menu bottom right>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              @click="statusAction(item, 'activate')"
              v-if="item.active == false"
            >
              Activate
            </v-list-item>
            <v-list-item
              @click="statusAction(item, 'deactivate')"
              v-if="item.active == true"
            >
              Deactivate
            </v-list-item>
            <v-list-item
              @click="championStatus(item, 'Assign')"
              v-if="item.champion == false && item.active == true"
            >
              Make CC</v-list-item
            >
            <v-list-item
              @click="championStatus(item, 'Remove')"
              v-if="item.champion == true"
            >
              Remove CC</v-list-item
            >
          </v-list>
        </v-menu>
      </template>

      <template v-slot:[`item.champion`]="{ item }">
        <v-icon v-if="item.champion == true" color="orange"
          >mdi-star-circle</v-icon
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

          <v-dialog v-model="menuDialog" max-width="30%" persistent>
            <v-card>
              <v-card-title class="text-h6"
                >{{ championText }} User as Chapter Champion</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="close('champion')"
                >
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="updateChampion">
                  OK
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog v-model="mypointsHistoryDialog" max-width="60%" persistent>
            <v-card>
              <v-toolbar flat>
                <v-card-title> MyPoints History</v-card-title>
                <v-spacer></v-spacer>
                <v-btn
                  icon
                  light
                  @click="close('history')"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-toolbar>
              <v-card-subtitle class="red--text text-h6">
                Current Balance : {{item.pointsBalance}} Points
              </v-card-subtitle>
              <v-data-table
                :headers="headers2"
                :items="mypointsdata"
                :items-per-page="5"
                class="elevation-1 pa-4"
              >
                <template v-slot:[`item.amount`]="{ item }">
                  <span class="amount" v-bind:class="item.action =='CREDIT' ? 'green--text' : 'red--text'">{{ item.action =='CREDIT' ? '+'+item.amount : '-'+item.amount }}</span>
                </template>
              </v-data-table>
            </v-card>
          </v-dialog>

          <v-dialog v-model="mypointsDialog" max-width="30%" persistent>
            <v-card>
              <v-form ref="form">
              <v-toolbar flat>
                <v-card-title>{{ pointsText }} My Points</v-card-title>
                <v-spacer></v-spacer>
                <v-btn icon light @click="close('points')">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-toolbar>
              <v-card-text class="pa-5">
                <div class="text-h6">Points</div>
                <v-text-field
                  label="Enter points here.."
                  solo
                  background-color="grey lighten-3"
                  v-model="points"
                  :rules="[!!points || 'Points field can`t be empty']" 
                  required></v-text-field>
                <div class="text-h6">Reason to {{ pointsText }} MyPoints</div>
                <v-text-field
                  label="Enter text here.."
                  maxlength="120"
                  class="mt-2"
                  solo
                  background-color="grey lighten-3"
                   v-model="pointsreason"
                   :rules="[!!pointsreason || 'Points field can`t be empty']" 
                  required>
                </v-text-field>
              </v-card-text>
              <v-card-actions class="d-flex justify-center">
                <v-btn
                  color="pink"
                  large
                  dark
                  depressed
                  class="mb-2 btn"
                  @click.prevent="updatePoints"
                >
                  Submit
                </v-btn>
              </v-card-actions>
              </v-form>
            </v-card>
          </v-dialog>

          <v-dialog v-model="deactivate1Dialog" max-width="30%" persistent>
            <v-card>
              <v-toolbar flat>
                <v-spacer></v-spacer>
                <v-btn
                  icon
                  light
                  @click="deactivate1Dialog = false"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-toolbar>
              <div class="d-flex justify-center">
                <v-img
                  src="../../assets/img/myTree.png"
                  max-height="50"
                  max-width="50"
                >
                </v-img>
              </div>
              <v-card-title
                class="d-flex justify-center red--text font-weight-bolder"
                >Cannot Deactive</v-card-title
              >
              <v-card-text
                class="
                  d-flex
                  justify-center
                  font-weight-bold
                  text-center
                  grey-darken-4--text
                "
              >
                User has Active Orders.He/She must complete or cancel their
                Orders
              </v-card-text>
              <v-card-actions class="d-flex justify-center">
                <v-btn
                  dark
                  depressed
                  class="mb-2"
                  color="pink"
                  @click="deact = false"
                >
                  OK
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog v-model="deactivateDialog" max-width="30%" persistent>
            <v-card>
              <v-form ref="form1"> 
              <v-toolbar flat>
                <v-card-title> Deactivate User</v-card-title>
                <v-spacer></v-spacer>
                <v-btn icon light @click="close('deactivate')">
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
              </v-card-actions></v-form>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data: () => ({
    deactivateDialog: false,
    deactivate1Dialog: false,
    mypointsDialog: false,
    mypointsHistoryDialog: false,
    menuDialog: false,
    search: "",
    pointsText: "",
    championText: "",
    points: "",
    pointsreason:"",
    item:{},
    mypointsdata: [],
    customers: [],
    deactivateReason:""
  }),

  computed: {
    headers() {
      let headers = [
        // { text: "Parent Id", value: "parentId", width: '120px'  },
        { text: "Name", value: "name", width: "200px" },
        { text: "UserName", value: "userName", width: "150px" },
        { text: "Status", value: "active", width: "120px" },
        { text: "Customer Id", value: "consumerId", width: "120px" },
        { text: "MobileNo.", value: "mobileNumber", width: "150px" },
        { text: "Email Address", value: "email", width: "250px" },
       // { text: "Date of Birth", value: "DateOfBirth", width: "150px" },
        { text: "Registered on", value: "registeredOn", width: "220px" },
        { text: "City", value: "city", width: "150px" },
        { text: "Chapter", value: "chapter", width: "150px" },
        { text: "Building", value: "building", width: "200px" },
        { text: "Flat No.", value: "flatNumber", width: "150px" },
        { text: "Orders Count", value: "totalOrders", width: "150px" },
        { text: "Orders Amount ", value: "ordersAmount", width: "150px" },
        { text: "COD Amount", value: "TotalCODAmount", width: "150px" },
        { text: "Online Amount", value: "TotalOnlineAmount", width: "150px" },
        { text: "MyPoints Awarded", value: "pointsAwarded", width: "160px" },
        { text: "MyPoints Used", value: "pointsUsed", width: "150px" },
        { text: "MyPoints Balance", value: "pointsBalance", width: "150px" },
        { text: "Reported", value: "reported", sortable: false },
        { text: "MyPoints", value: "MyPoints", sortable: false },
      ];

      if (this.$store.state.Login.userDetails.admin === true) {
        headers.unshift(
          { text: "Action", value: "action", sortable: false },
          { text: "", value: "champion", sortable: false }
        );
      }
      return headers;
    },

    headers2() {
      let headers2 = [
        { text: "Date", align: "start", value: "transactionDate", width: "180px" },
        { text: "Points", value: "amount", width: "90px" },
        { text: "Transaction Details", value: "transactionDetail", width: "180px" },
        { text: "Reason", value: "reason" },
      ];
      return headers2;
    },
  },

  beforeDestroy(){
    this.unsubscribe();
  },

  created() {
    this.unsubscribe = this.$store.subscribe((mutation) => {
      if (mutation.type === "setAllCustomers" && mutation.payload) {
        this.customers = JSON.parse(mutation.payload);
      }
      if (mutation.type === "setMyPoints" && mutation.payload) {
        this.mypointsdata = JSON.parse(mutation.payload);
      }
    });
    
    this.getCustomers();
  },

  methods: {
    ...mapGetters(["getAllCustomers", "getMyPoints"]),
    ...mapActions([
      "getCustomers",
      "activateCustomer",
      "deactivateCustomer",
      "removeCC",
      "assignCC",
      "addMyPoints",
      "subtractMyPoints",
      "pointsHistory"
    ]),

    close(val){
      this.item={};
      if(val=== 'champion'){        
        this.championText="";
        this.menuDialog= false;
      }else if(val === 'points'){
        this.pointsText="";
        this.points="";
        this.pointsreason="";
        this.mypointsDialog = false;
        this.$refs.form.reset();
      }else if(val === 'deactivate'){
        this.deactivateReason="";
        this.deactivateDialog = false;
        this.$refs.form1.reset();
      }else if(val === 'history'){
        this.mypointsHistoryDialog = false;
      }
    },

    myPoints(val, e) {
      this.item = val;
      this.pointsText = e;
      this.mypointsDialog = true;
    },

    updatePoints() {
      if(this.$refs.form.validate()){
      let param = {
        consumerId: this.item.consumerId,
        points: this.points,
        reason: this.pointsreason
      };
      if (this.pointsText === "Add") {
        this.addMyPoints(param);
      } else {
        this.subtractMyPoints(param);
      }
      this.points = "";
      this.pointsreason = "";
      this.item = {};
      this.mypointsDialog = false;
      this.$refs.form.reset();
      }
    },

    viewHist(val) { 
      this.item= val;
      let param = {
        consumerId: this.item.consumerId
      }; 
      this.pointsHistory(param);
      this.mypointsHistoryDialog = true;
      
    },

    statusAction(item, val) {      
      if (val === "activate") {
        let param = {
        userName: item.userName
      };
        this.activateCustomer(param);
      } else if (val === "deactivate") {
        this.item = item;
       this.deactivateDialog = true;
      }
    },

    deactivate(){
      if(this.$refs.form1.validate()){
this.deactivateDialog = false;
      let param = {
        userName: this.item.userName,
        reason: this.deactivateReason
      };
        this.deactivateCustomer(param);
        this.item = {};
        this.$refs.form1.reset();
    }
      },

      
      

    championStatus(item, val) {
      this.championText = val;
      this.item = item;
      this.menuDialog = true;
    },

    updateChampion() {
      let param = {
        consumerId: this.item.consumerId,
      };
      if (this.championText === "Remove") {
        this.removeCC(param);
        this.item = {};
        this.championText = "";
      } else {
        this.assignCC(param);
        this.item = {};
        this.championText = "";
      }
      this.menuDialog = false;
    }
  },
};
</script>

<style scoped>
.btn {
  text-transform: capitalize;
}