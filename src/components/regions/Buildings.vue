<template>
  <div class="buildings pa-2">
    <!-- <v-breadcrumbs :items="values" large>
      <template v-slot:item="{ item }">
        <v-breadcrumbs-item
          :href="item.href"
          :disabled="item.disabled"
          class="textSize font-weight-bold"
        >
          {{ item.text }}
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
          @click="goTo('cities')"><span class="blue--text"><b>Cities </b></span></a>
        <v-icon size="25px">mdi-chevron-right</v-icon>
        <a
          class="textSize font-weight-bold text-decoration-none"
          @click="goTo('clusters')"><span class="blue--text"><b>clusters </b></span></a>
        <v-icon size="25px">mdi-chevron-right</v-icon>
        <a 
        class="textSize font-weight-bold text-decoration-none"
        @click="goTo('chapters')"><span class="blue--text"><b>Chapters</b> </span></a>
      <v-icon size="25px">mdi-chevron-right</v-icon>
        <a 
        class="textSize font-weight-bold"><span class="black--text"><b>Buildings </b></span></a>
      </div>
    </div>

    <v-data-table
      :headers="headers"
      :items="buildings"
      sort-by="ProductName"
      class="elevation-1 pa-3"
      :search="search"
    >
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

      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title> </v-toolbar-title>
          <v-col cols="12" md="3" lg="4">
            <v-text-field
              v-model="search"
              label="Search"
              append-icon="mdi-magnify"
              hide-details
            ></v-text-field>
          </v-col>
          <v-spacer></v-spacer>
          <v-btn @click="backToChapters" text color="primary" plain class="btn"
            >Back to Chapters</v-btn
          >
          <v-dialog v-model="dialog" max-width="35%" persistent>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="pink"
                dark
                class="mb-2 btn mybtn"
                v-bind="attrs"
                v-on="on"
              >
                Add New Building
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
                        label="Building"
                        :rules="[!!editedItem.name || 'This field is required']" 
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="8" md="6">
                        <v-checkbox
                          input-value="false"
                          value
                          label="Active/Inactive"
                          v-model="editedItem.active"
                          color="indigo"
                          class="ma-1 pa-1"
                          v-if="formTitle =='Edit Building'"
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
                <v-btn color="blue darken-1" text @click.prevent="save"> Save </v-btn>
              </v-card-actions>
              </v-form>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="35%" persistent>
            <v-card>
              <v-card-title class="text-h6"
                >Are you sure you want to delete this Building?</v-card-title
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
        <v-icon small class="mr-2" color="blue" @click="editItem(item)">
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
        href: "/clusters",
      },
      {
        text: "Chapters",
        disabled: false,
        href: "/chapters",
      },
      {
        text: "Buildings",
        disabled: false,
        href: "",
      },
    ],

    buildings: [],
    editedIndex: -1,
    editedItem: {},
    defaultItem: {},
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Building" : "Edit Building";
    },
    headers() {
      let headers = [
        { text: "Building", value: "name" },
        { text: "Added On", value: "addedOn" },
        { text: "Added By", value: "addedBy" },
        { text: "In Use", value: "active" },
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
      if (mutation.type === "setAllBuildingsByChapter" && mutation.payload) {
        this.buildings = JSON.parse(mutation.payload);
      }
    });
    this.getallBuildingsByChapter({ chapterId: this.$route.params.id });
  },

  methods: {
    ...mapActions(["getallBuildingsByChapter","addNewBuilding","editBuilding","deleteBuilding"]),
    editItem(item) {
      this.editedIndex = this.buildings.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.buildings.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
       console.log("s",this.editedItem);
      let obj = {
        buildingId:this.editedItem.id
      };
     this.deleteBuilding({req:obj,id:this.editedItem.chapterId});
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
        this.$router.go(-2);
      }else if (v === "chapters") {
        this.$router.go(-1);
      }
    },

    backToChapters() {
      //this.$router.push({path:`/clusters/${this.$route.params.id}/chapters`})
      this.$router.go(-1)
    },

    save() {
      if(this.$refs.form.validate()){
      if (this.editedIndex > -1) {
        let body ={
           active: this.editedItem.active,
          addedBy:'',
          addedOn: '',
          chapterId: this.editedItem.chapterId,
          id: this.editedItem.id,
          name: this.editedItem.name
        };
        this.editBuilding(body);
      } else {
        let params = {
          chapterId: this.$route.params.id,
          buildingNames:this.editedItem.name
        }
        this.addNewBuilding(params);
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
.textSize{
  font-size: 1.25rem;
}
</style>