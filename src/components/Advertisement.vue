<template>
    <div class="addvertise pa-6">
        <v-data-table
            :headers="getheaders"
            :items="items"
            :search="search"
            sort-by="id"
            class="elevation-1">
            <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Advertisements</v-toolbar-title>
          <v-spacer></v-spacer>
     <v-text-field
        v-model="search"
        prepend-inner-icon="mdi-magnify"
        label="Search"
        solo
        hide-details
        class="ma-auto mr-2"
      ></v-text-field>
      <v-dialog
            v-model="dialog"
            max-width="40%"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
              >
                Add New 
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.advertiserName"
                        label="Advertiser name">
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.advertiserType"
                        label="Advertiser Type">
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.advertisementType"
                        label="Advertisement Type">
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.advertisementContent"
                        label="Advertisement Content">
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.city"
                        label="City">
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.cluster"
                        label="Cluster">
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.chapter"
                        label="Chapter">
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                     <v-select
                        :items="options"
                        label="Standard"
                        v-model="editedItem.active_inActive"
                        dense>
                    </v-select>
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
                <v-btn
                  color="blue darken-1"
                  text
                  @click="save"
                >
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="320px">
            <v-card>
              <v-card-title class="text-subtitle-1">Are you sure you want to delete this Advertisement?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
      </v-toolbar>
    </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
         </v-data-table>
    </div>
</template>


<script>
import {mapGetters, mapActions} from 'vuex';
export default {
    data(){
        return{
            search:'',
            role:'',
            items:[],
            dialog: false,
            dialogDelete: false,
            editedIndex: -1,
            editedItem:{},
            options:['Active', 'InActive']
        }
    },
    computed:{
        formTitle () {
        return this.editedIndex === -1 ? 'New Advertisement' : 'Edit Advertisement'
      },
        getheaders(){
            //this.role = '';
            let headers= [
                {text:'Id', value: 'id'},
                {text:'Advertiser Name', value: 'advertiserName'},
                {text:'Advertiser Type', value: 'advertiserType'},
                {text:'Advertisement Type', value: 'advertisementType'},
                {text:'Advertisement Content', value: 'advertisementContent'},
                {text:'City Name', value: 'city'},
                {text:'Cluster Name', value: 'cluster'},
                {text:'Chapter Name', value: 'chapter'},
                {text:'Active/ In-Active', value: 'active_inActive'},
                {text:'Added D/T', value: 'addDateTime'},
                {text:'Added By UserName', value: 'addByUser'},
                {text:'Last Modified D/T', value: 'lastModifyDateTime'},
                {text:'Last Modified By UserName', value: 'lastModifyByUser'},
            ];
            if(this.role === 'admin'){
                headers.push({text:'Actions', value: 'actions', sortable: false})
            }
            return headers;
        }
    },
     watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created(){
        this.role ='admin'; 
        this.items = this.getAdvertisement();
    },
    methods:{
      ...mapGetters(['getAdvertisement']),
      ...mapActions(['addNewAd']),
        editItem(val){
        this.editedIndex = this.items.indexOf(val)
        this.editedItem = Object.assign({}, val)
        this.dialog = true
            console.log(this.editedIndex);
        },
        deleteItem(val){
        this.editedIndex = this.items.indexOf(val)
        this.editedItem = Object.assign({}, val)
        this.dialogDelete = true
            console.log(val);
        },
         deleteItemConfirm () {
        this.items.splice(this.editedIndex, 1)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          console.log(">-1",this.editedItem );
          console.log(">-1item",this.items[this.editedIndex] );
          Object.assign(this.items[this.editedIndex], this.editedItem)
        } else {
           console.log(">-1 else",this.editedItem);
           console.log("index", this.items.length)
           let obj = {
             "id":this.items.length+1,
             "advertiserName":this.editedItem.advertiserName,
             "advertiserType": this.editedItem.advertiserType,
             "advertisementType":this.editedItem.advertisementType,
             "advertisementContent": this.editedItem.advertisementContent,
             "city": this.editedItem.city,
             "cluster": this.editedItem.cluster,
             "chapter": this.editedItem.chapter,
             "active_inActive": this.editedItem.active_inActive
           };
          this.items.push(obj);
          console.log("shsd", this.items);
        }
        this.close()
      },
    }
}
</script>