<template>
  <v-card class="mealtypes">
    <v-data-table
      :headers="headers"
      :items="mealTypes"
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
              <div class="text-h6">Meal Types</div>
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
              <v-btn color="pink" dark class="mb-2 mybtn" v-bind="attrs" v-on="on">
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
                        v-model="editedItem.mealType"
                        label="Meal Types"
                        :rules ="[!!editedItem.mealType || 'This Field cann`t be empty']"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="close"
                >
                  Cancel
                </v-btn>
                <v-btn type="submit" color="blue darken-1" text @click.prevent="save">
                  Save
                </v-btn>
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
                <v-btn
                  color="blue darken-1"
                  text
                  @click="closeDelete"
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
  </v-card>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      search: "",
      mealTypes: [],
      dialog: false,
      dialogDelete: false,
      editedIndex: -1,
      editedItem: {},
      itemName:''
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Meal Type" : "Edit Meal Type";
    },
    headers() {
      let headers = [
        { text: "Id", value: "id" },
        { text: "MealType", value: "mealType" },
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
      if (mutation.type === "setMealTypes" && mutation.payload) {
        this.mealTypes = JSON.parse(mutation.payload);
      }
    });
    
    this.getMealtypes();
  },
  methods: {
    ...mapActions(['getMealtypes','addMealtype','editMealtype','deleteMealtype']),
    editItem(val) {
      this.editedIndex = this.mealTypes.indexOf(val);
      this.editedItem =  Object.assign({},val);
      this.itemName = val.mealType;
      this.dialog = true;
      console.log(this.editedIndex);
    },
    deleteItem(val) {
      this.editedIndex = this.mealTypes.indexOf(val);
      this.editedItem =Object.assign({}, val);
      this.dialogDelete = true;
      console.log(val);
    },
    deleteItemConfirm() {
      let param = { 
        type: this.editedItem.mealType 
      };
      this.deleteMealtype(param);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = {};
        this.editedIndex = -1;
        this.itemName='';
        this.$refs.form.reset()
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
        console.log("sd", this.$refs.form.validate())
      if (this.editedIndex > -1) {
        let param1 = {
          newType: this.editedItem.mealType,
          oldType: this.itemName,
        };
        this.editMealtype(param1);
      } else {
        let param = {
          type: this.editedItem.mealType,
        };
        this.addMealtype(param);
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