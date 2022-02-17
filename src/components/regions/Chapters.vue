<template>
  <div class="chapters pa-2">
    <!--  <v-breadcrumbs :items="values">
      <template v-slot:item="{ item }">
      <v-breadcrumbs-item
        :href="item.href"
        :disabled="item.disabled" class="textSize font-weight-bold"
      >
        {{ item.text}}
      </v-breadcrumbs-item>
    </template>
      <template v-slot:divider>
        <v-icon size="25px">mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs> -->

    <div>
      <div class="mt-2 ml-3 font-styling2">
        <a
          class="textSize font-weight-bold text-decoration-none"
          @click="goTo('cities')"
          ><span class="blue--text"><b>Cities </b> </span></a
        >
        <v-icon size="25px">mdi-chevron-right</v-icon>
        <a
          class="textSize font-weight-bold text-decoration-none"
          @click="goTo('clusters')"
          ><span class="blue--text"><b>Clusters </b> </span></a
        >
        <v-icon size="25px">mdi-chevron-right</v-icon>
        <a class="textSize font-weight-bold"
          ><span class="black--text"><b>Chapters </b> </span></a
        >
      </div>
    </div>

    <v-data-table
      :headers="headers"
      :items="chapters"
      sort-by="ProductName"
      class="elevation-1 pa-3"
      :search="search"
    >
      <template v-slot:[`item.consumerConvnFeeWaived`]="{ item }">
        <v-switch
          v-model="item.consumerConvnFeeWaived"
          color="indigo"
          class="ma-1 pa-1"
          hide-details disabled
        ></v-switch>
      </template>
      <template v-slot:[`item.chefConvnFeeWaived`]="{ item }">
        <v-switch
          v-model="item.chefConvnFeeWaived"
          color="warning"
          class="ma-1 pa-1"
          hide-details disabled
        ></v-switch>
      </template>

       <template v-slot:[`item.deliveryCharge`]="{item}">
        <span>₹&nbsp;{{item.deliveryCharge}}</span>
      </template>

      <template v-slot:[`item.active`]="{ item }">
        <v-chip
          color="success"
          small
          class="ma-1"
          text-color="white"
          v-if="item.active === true"
        >
          Yes
        </v-chip>
        <v-chip
          color="red"
          small
          class="ma-1"
          text-color="white"
          v-if="item.active === false"
        >
          No</v-chip
        >
      </template>

      <template v-slot:[`item.buildings`]="{ item }">
        <v-btn
          color="blue lighten-4"
          small
          depressed
          class="ma-1 blue--text btn"
          @click="moveToBuildings(item)"
        >
          View Buildings
        </v-btn>
      </template>

      <template v-slot:top>
        <v-toolbar flat>
          <v-col cols="12" md="3" lg="4">
            <v-text-field
              v-model="search"
              label="Search"
              append-icon="mdi-magnify"
              hide-details
            ></v-text-field>
          </v-col>
          <v-spacer></v-spacer>

          <v-btn @click="backToClusters" text color="primary" plain class="btn"
            >Back to Clusters</v-btn
          >

          <v-dialog v-model="dialog" max-width="40%" persistent>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="pink"
                dark
                class="mb-2 btn mybtn"
                v-bind="attrs"
                v-on="on"
              >
                Add New Chapter
              </v-btn>
            </template>
            <v-card>
              <v-form ref="form">
                <v-card-title>
                  <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="8" md="6">
                        <v-text-field
                          v-model="editedItem.name"
                          label="Chapter Name"
                          :rules="[!!editedItem.name || 'This field is required']" required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="8" md="6">
                        <v-text-field
                          v-model="editedItem.deliveryCharge"
                          label="Delivery Charge"
                          ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="8" md="6">
                        <v-checkbox 
                        input-value="false" value
                        label="Customer CF"
                          v-model="editedItem.consumerConvnFeeWaived"
                          color="indigo"
                          class="ma-1 pa-1">
                          </v-checkbox>
                      </v-col>
                      <v-col cols="12" sm="8" md="6">
                        <v-checkbox
                        label="Chef CF"
                          v-model="editedItem.chefConvnFeeWaived"
                          color="indigo"
                          class="ma-1 pa-1">
                          </v-checkbox>
                      </v-col>
                      <v-col cols="12" sm="8" md="6">
                        <v-checkbox
                          input-value="false"
                          value
                          label="Active/Inactive"
                          v-model="editedItem.active"
                          color="indigo"
                          class="ma-1 pa-1"
                          v-if="formTitle =='Edit Chapter'"
                        >
                        </v-checkbox>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">
                    Cancel
                  </v-btn>
                  <v-btn color="blue darken-1" text @click.prevent="save">
                    Save
                  </v-btn>
                </v-card-actions>
              </v-form>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="35%" persistent>
            <v-card>
              <v-card-title class="text-h6"
                >Are you sure you want to delete this Chapter?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" color="primary" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon small color="red" @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    search: "",
    values: [
      {
        text: "Cities",
        disabled: false,
        href: "/cities",
      },
      {
        text: "Clusters",
        disabled: false,
        href: "/cities",
      },
      {
        text: "Chapters",
        disabled: false,
        href: "",
      },
    ],
    chapters: [],
    editedIndex: -1,
    editedItem: { 
    active: true,
    addedBy: "",
    addedOn: "",
    buildings: [],
    chefConvnFeeWaived: false,
    clusterId: 0,
    consumerConvnFeeWaived: false,
    deliveryCharge: 0,
    id: 0,
    name: ""},
    defaultItem: {},
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Chapter" : "Edit Chapter";
    },
    headers() {
      let headers = [
        { text: "Chapter", value: "name", width: "120px" },
        { text: "Added On", value: "addedOn", width: "180px" },
        { text: "Added By", value: "addedBy", width: "120px" },
        { text: "Last Modified On", value: "LastModifiedOn", width: "150px" },
        { text: "Last Modified By", value: "LastModifiedBy", width: "150px" },
        { text: "InUse", value: "active", width: "100px" },
        { text: "Delivery Charge", value: "deliveryCharge", width: "140px" },
        {
          text: "Customer CF",
          value: "consumerConvnFeeWaived",
          width: "140px",
        },
        { text: "Chef CF", value: "chefConvnFeeWaived", width: "120px" },
        { text: "Buildings", value: "buildings", width: "120px" },
        { text: "Chapter Champion", value: "CC", width: "160px" },
      ];

      if (this.$store.state.Login.userDetails.admin === true) {
        headers.push({ text: "Actions", value: "actions", sortable: false });
      }

      return headers;
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  beforeDestroy(){
    this.unsubscribe();
  },

  created() {
    this.unsubscribe = this.$store.subscribe((mutation) => {
      if (mutation.type === "setAllChaptersByCluster" && mutation.payload) {
        this.chapters = JSON.parse(mutation.payload);
      }
    });
    this.getallChaptersByCluster({ clusterId: this.$route.params.id });
  },

  methods: {
    ...mapActions(["getallChaptersByCluster", "addNewChapter","editChapter","deleteChapter"]),
    editItem(item) {
      this.editedIndex = this.chapters.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.chapters.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      let obj = {
        chapterId:this.editedItem.id
      };
     this.deleteChapter({req:obj,id:this.editedItem.clusterId});
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
        this.$refs.form.reset();
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    goTo(v) {
      if (v === "cities") {
        this.$router.push("/cities");
      } else if (v === "clusters") {
        this.$router.go(-1);
      }
    },
    backToClusters() {
      //this.$router.push({path:`/cities/${this.$route.params.id}/clusters`})
      this.$router.go(-1);
    },

    moveToBuildings(item) {
      this.$router.push({ path: `/chapters/${item.id}/buildings` });
    },

    save() {
      if(this.$refs.form.validate()){
      if (this.editedIndex > -1) {
        let body ={
          id:this.editedItem.id,
          name: this.editedItem.name,
          chefConvnFeeWaived: this.editedItem.chefConvnFeeWaived,
          clusterId: this.$route.params.id,
          consumerConvnFeeWaived: this.editedItem.consumerConvnFeeWaived,
          deliveryCharge: this.editedItem.deliveryCharge,
          active:this.editedItem.active,
          addedBy:'',
          addedOn:'',
          buildings:[]
        };
        this.editChapter(body);
      } else {
        let arr =[];
          let obj ={
          chapterName: this.editedItem.name,
          chefConvnFeeWaived: this.editedItem.chefConvnFeeWaived,
          clusterId: this.$route.params.id,
          consumerConvnFeeWaived: this.editedItem.consumerConvnFeeWaived,
          deliveryCharge: this.editedItem.deliveryCharge,
        };
        arr.push(obj);
        this.addNewChapter(arr);
      }
      this.close();
      }
    },
  },
};
</script>

<style scoped>
.btn {
  text-transform: none !important;
}
.textSize {
  font-size: 1.25rem;
}
</style>