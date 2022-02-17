<template>
  <v-card class="awards">
    <v-data-table
      :headers="getHeaders"
      :items="stamps"
      :search="search"
      sort-by="id"
      :items-per-page="5"
      class="elevation-1 pa-2"
      height="50vh"
    >
      <template v-slot:[`item.stampImage.name`]="{ item }">
        <img
          id="preview"
          width="50px"
          height="50px"
          class="d-flex justify-content-center align-item-center"
          :src="item.stampImage.url"
          :alt="item.stampImage.name"
        />
      </template>
      <template v-slot:top>
        <v-toolbar flat prominent>
          <v-row>
            <v-col cols="12" md="3" lg="8">
              <div class="text-h6">Stamps</div>
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
              <v-btn
                color="pink mybtn"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
              >
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
                    <v-row v-if="formTitle === 'Edit Stamp'">
                      <v-radio-group
                        v-model="ename"
                        @change="onchange($event)"
                        :rules="[(v) => !!v || 'Item is required']"
                        required
                      >
                        <v-radio label="Edit Name" value="0"></v-radio>
                        <v-radio label="Edit Image" value="1"></v-radio>
                      </v-radio-group>
                    </v-row>
                    <v-row>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          v-model="editedItem.name"
                          label=" Stamp Name"
                          :rules="[
                            !!editedItem.name || 'This field cann`t Be empty',
                          ]"
                          required
                          v-if="
                            formTitle === 'New Stamp' ||
                            (formTitle === 'Edit Stamp' && ename == 0)
                          "
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" sm="6" md="8">
                        <v-file-input
                          :rules="[
                            (value) => !!value || 'Please choose a file',
                          ]"
                          accept="image/png, image/jpeg, image/bmp"
                          placeholder="Pick an avatar"
                          label="Stamp Image"
                          v-model="editedItem.stampImage"
                          v-if="
                            formTitle === 'New Stamp' ||
                            (formTitle === 'Edit Stamp' && ename == 1)
                          "
                        ></v-file-input>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">
                    Cancel
                  </v-btn>
                  <v-btn
                    color="blue darken-1"
                    text
                    type="submit"
                    @click.prevent="save"
                  >
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
  </v-card>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      role: "",
      search: "",
      dialog: false,
      dialogDelete: false,
      editedIndex: -1,
      editedItem: {},
      stamps: [],
      ename: null,
      oldname: "",
    };
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Stamp" : "Edit Stamp";
    },
    getHeaders() {
      let headers = [
        { text: "Id", value: "id" },
        { text: "Stamp  Name", value: "name" },
        { text: "Stamp Image", value: "stampImage.name" },
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
      if (mutation.type === "setStamps" && mutation.payload) {
        this.stamps = JSON.parse(mutation.payload);
      }
    });
    this.getStamps();
  },
  methods: {
    ...mapActions([
      "getStamps",
      "addNewStamp",
      "editStampByName",
      "editStampByImage",
      "deleteStamp",
    ]),

    editItem(val) {
      this.editedIndex = this.stamps.indexOf(val);
      this.editedItem = Object.assign({}, val);
      this.dialog = true;
      this.oldname = this.editedItem.name;
    },
    deleteItem(val) {
      this.editedIndex = this.stamps.indexOf(val);
      this.editedItem = Object.assign({}, val);
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      let obj = {
        name: this.editedItem.name,
      };
      this.deleteStamp(obj);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = {};
        this.editedIndex = -1;
        this.$refs.form.reset();
        this.oldname = "";
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    onchange(e) {
      this.ename = e;
    },

    save() {
      if (this.$refs.form.validate()) {
        if (this.editedIndex > -1) {
          console.log(">-1", this.editedItem);
           if(this.ename == 0){
          let param = {
            newName: this.editedItem.name,
            oldName: this.oldname,
          };
          this.editStampByName(param);
          }else{
            let param1 = {
              name: this.editedItem.name
            };
            let formData = new FormData();
            formData.append('file', this.editedItem.stampImage)
            this.editStampByImage({ data: formData, req:param1});
          }
        } else {
          console.log(">-1 else", this.editedItem);
          let param = {
            name: this.editedItem.name,
          };
          let formdata = new FormData();
          formdata.append("file", this.editedItem.stampImage);
          this.addNewStamp({ data: formdata, req: param });
        }
        this.close();
      }
    },
  },
};
</script>

<style scoped>
.mybtn:focus::before {
  opacity: 0 !important;
}
</style>