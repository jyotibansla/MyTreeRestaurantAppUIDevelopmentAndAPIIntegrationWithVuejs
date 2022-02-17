<template>
    <div class="mealtype pa-6">
         <v-data-table
            :headers="getheaders"
            :items="items"
            :search="search"
            sort-by="id"
            class="elevation-1">
            <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>CGST</v-toolbar-title>
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
            max-width="30%"
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
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                    >
                      <v-text-field
                        v-model="editedItem.cgst"
                        label="CGST in %"
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
          <v-dialog v-model="dialogDelete" max-width="350px">
            <v-card>
              <v-card-title class="subtitle-2">Are you sure you want to delete this CGST?</v-card-title>
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
       editedItem:{}

        }
    },
    computed:{
        formTitle () {
        return this.editedIndex === -1 ? 'New CGST' : 'Edit CGST'
      },
        getheaders(){
            //this.role = '';
            let headers= [
                {text:'Id', value: 'id'},
                {text:'CGST', value: 'cgst'},
                {text:'Last Modified D/T', value:'lastModifyD_T'},
                {text:'Last Modified By User', value:'lastModifyByUser'},
                
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
        this.items = this.getCGST();
    },
    methods:{
      ...mapGetters(['getCGST']),
      ...mapActions(['addNewCGST']),
        editItem(val){
            console.log(this.editedIndex);
            console.log(val);
        this.editedIndex = this.items.indexOf(val)
        this.editedItem = Object.assign({}, val)
        this.dialog = true
            
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
             "cgst":this.editedItem.cgst,
             "lastModifyD_T": new Date(),
             "lastModifyByUser":this.role
           };
          //this.items.push(obj);
          this.addNewCGST(obj);
          this.items=this.getCGST();
        }
        this.close()
      },
    }
}
</script>