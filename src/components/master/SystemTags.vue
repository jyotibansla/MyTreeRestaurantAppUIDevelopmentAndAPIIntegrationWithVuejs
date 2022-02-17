<template>
    <v-card class="systemtags">
      <v-data-table
        :headers="getheaders"
        :items="systemtags"
        sort-by="id"
        class="elevation-1 pa-2"
        :search="search"
        :items-per-page="5"
        height="50vh"
      >
        <template v-slot:top>
          <v-toolbar flat prominent>
            <v-row>
              <v-col cols="12" md="3" lg="8">
                <div class="text-h6">System Tags</div>
              </v-col>
              <v-spacer></v-spacer>
              <v-col cols="12" md="3" lg="8">
                <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Search"
                  hide-details
                ></v-text-field>
              </v-col>
            </v-row>
            <v-dialog v-model="dialog" max-width="30%" persistent>
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="pink mybtn" dark class="mb-2" v-bind="attrs" v-on="on">
                  Add New
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
                          v-model="editedItem.tagName"
                          label="Tag Name"
                          :rules="[!!editedItem.tagName || 'This field cann`t Be empty']"
                          required
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">
                    Cancel
                  </v-btn>
                  <v-btn color="blue darken-1" text type="submit" @click.prevent="save"> Save </v-btn>
                </v-card-actions>
                </v-form>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="35%" persistent>
              <v-card>
                <v-card-title class="text-h6"
                  >Are you sure you want to delete this item?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete">
                    Cancel</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm">
                    OK</v-btn
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
    </v-card>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      search: "",
      systemtags: [],
      dialog: false,
      dialogDelete: false,
      editedIndex: -1,
      editedItem: {},
      itemName: "",
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New System Tag" : "Edit System Tag";
    },
    getheaders() {
      let headers = [
        { text: "Id", value: "id" },
        { text: "SystemTag", value: "tagName" },
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
    this.unsubscribe =this.$store.subscribe((mutation) => {
      if (mutation.type === "setSystemTags" && mutation.payload) {
        this.systemtags = JSON.parse(mutation.payload);
      }
    });

    this.getSystemtags();
  },
  methods: {
    ...mapActions([
      "getSystemtags",
      "addSystemtag",
      "editSystemtag",
      "deleteSystemtag",
    ]),
    editItem(val) {
      this.editedIndex = this.systemtags.indexOf(val);
      this.dialog = true;
      this.editedItem =Object.assign({}, val);
      this.itemName = val.tagName;
    },
    deleteItem(val) {
      this.editedIndex = this.systemtags.indexOf(val);
      this.editedItem = Object.assign({},val);
      this.dialogDelete = true;
    },
    deleteItemConfirm() { 
      let param = {
       name: this.editedItem.tagName
     };
     this.deleteSystemtag(param);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = {};
        this.editedIndex = -1;
        this.$refs.form.reset();
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = {};
        this.editedIndex = -1; 
      });
    },

    save() {
      if(this.$refs.form.validate()){
      if (this.editedIndex > -1) {      
        let param = {
          newName: this.editedItem.tagName,
          oldName: this.itemName,
        };       
        this.editSystemtag(param);
      } else {  
         let param1 = {
          name: this.editedItem.tagName,
        };
        this.addSystemtag(param1);
      }
      this.close();
      }
    },
  },
};
</script>

<style scoped>
.mybtn:focus::before{
  opacity: 0 !important;
}
</style>