<template>
  <div class="clusters pa-2">
     <!-- <v-breadcrumbs :items="values">
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
        <a class="textSize font-weight-bold text-decoration-none" @click="backToCities"><span class="blue--text text-h6"><b>Cities </b> </span></a>
        <v-icon size="25px">mdi-chevron-right</v-icon>
        <a class="textSize font-weight-bold" style="text-decoration:none;"><span class="black--text text-h6"><b>Clusters </b> </span></a>
      </div>
    </div>

    <v-data-table
      :headers="headers"
      :items="clusters"
      sort-by="ProductName"
      class="elevation-1 pa-3"
      :search="search"
    >
      <template v-slot:[`item.active`]="{ item }">
        <v-chip color="success"  small  class="ma-1" text-color="white"
          v-if="item.active === true" >
          Yes
        </v-chip>
        <v-chip color="red" small class="ma-1"  text-color="white"
          v-if="item.active === false" >
          No</v-chip>
      </template>
      <template v-slot:[`item.Clusters`]="{ item }">
        <v-btn color="blue lighten-4"
          small
          depressed
          class="ma-1 blue--text btn"
          @click="moveToChapters(item)">
          View Chapters
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
            ></v-text-field
          ></v-col>
          <v-spacer></v-spacer>

          <v-btn @click="backToCities" text color="primary" plain class="btn">
            Back to Cities</v-btn>

          <v-dialog v-model="dialog" max-width="35%" persistent>
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="pink" dark class="mb-2 btn mybtn" v-bind="attrs" v-on="on">
                Add New Cluster
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
                    <v-col cols="12" sm="8" md="8">
                      <v-text-field
                        v-model="editedItem.name"
                        label="Cluster"
                        :rules="[!!editedItem.name || 'This field is required']" required
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
                          v-if="formTitle =='Edit Cluster'"
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
                >Are you sure you want to delete this Cluster?</v-card-title>
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
import { mapActions } from 'vuex'
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
        href: "",
      },
      /* {
          text: 'Chapters',
          disabled: true,
          href: '',
        },*/
    ],
    clusters: [],
    editedIndex: -1,
    editedItem: {},
    defaultItem: {},
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Cluster" : "Edit Cluster";
    },
    headers() {
      let headers = [
        { text: "Cluster", align: "start", value: "name" },
        { text: "Added On", value: "addedOn" },
        { text: "Added By", value: "addedBy" },
        { text: "In Use", value: "active" },
        { text: "Chapters", value: "Clusters" },
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
   this.unsubscribe=this.$store.subscribe((mutation) => {
      if (mutation.type === "setAllClustersByCity" && mutation.payload) {
        this.clusters = JSON.parse(mutation.payload);
      }
    });
    this.getallClusterByCity({cityId:this.$route.params.id});
  },

  methods: {
    ...mapActions(['getallClusterByCity','addNewCluster','editCluster','deleteCluster']),
    editItem(item) {
      this.editedIndex = this.clusters.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.clusters.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      let obj = {
        clusterId:this.editedItem.id
      };      
      console.log("object", obj)
      this.deleteCluster({req:obj,id:this.editedItem.cityId});
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

    moveToChapters(item){
      this.$router.push({path:`/clusters/${item.id}/chapters`});
    },

    backToCities(){
      //this.$router.push({path:`/cities/${this.$router.params.id}/clusters`})
      //this.$router.push('/cities');
      this.$router.go(-1);
    },

    save() {
      if(this.$refs.form.validate()){
      if (this.editedIndex > -1) {
        let body ={
          id:this.editedItem.id,
          name:this.editedItem.name,
          cityId:this.editedItem.cityId,
          active:this.editedItem.active,
          addedBy:'',
          addedOn:'',
          chapters:[]
        };
        this.editCluster(body);
      } else {
        let arr =[];
        arr.push(this.editedItem.name);
        console.log(arr);
        let params = {
          cityId: this.$route.params.id,
          clusterNames:this.editedItem.name
        }
        this.addNewCluster(params);
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