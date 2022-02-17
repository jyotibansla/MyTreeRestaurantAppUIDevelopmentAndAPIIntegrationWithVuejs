<template>
  <div class="orders pa-6">
    
    <v-data-table
      :headers="headers"
      :items="orders"
      :search="search"
      sort-by="orderStatus"
      class="elevation-1">
      <template v-slot:[`item.orderStatus`]="{ item }">
      <v-chip  :color="getColor(item.orderStatus)" dark>
        {{ item.orderStatus }}
      </v-chip>
    </template>

     <template v-slot:[`item.dpImg`]="{ item }">
     <v-img
  lazy-src="https://picsum.photos/id/11/10/6"
  max-height="50"
  max-width="50"
  :src="item.dpImg"
></v-img>
    </template>

      <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>ORDERS</v-toolbar-title>
          <!-- <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider> -->
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
            max-width="80%"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
              >
                New Item
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
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.dpName"
                        label="Dish/Product Name"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.orderStatus"
                        label="Order Status"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.csName"
                        label="Chef/Seller Name"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.city"
                        label="City"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.cluster"
                        label="Cluster"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.chapter"
                        label="Chapter"
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
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
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
      <template v-slot:no-data>
        <v-btn
          color="primary"
          @click="initialize"
        >
          Reset
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
  export default {
    data: () => ({
      loading:false,
      search: '',
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'Order No.',
          align: 'start',
          sortable: false,
          value: 'orderNo',
        },
        { text: 'Order Status', value: 'orderStatus'},
        { text: 'Dish/Product Thumbnail', value: 'dpImg' },
        { text: 'Dish/Product Name', value: 'dpName' },
        { text: 'Chef/Seller Name', value: 'csName' },
        { text: 'City Name', value: 'city' },
        { text: 'Cluster Name', value: 'cluster' },
        { text: 'Chapter Name', value: 'chapter' },
        { text: 'Order Created On', value: 'orderCreatedOn' },
        { text: 'Order Created By', value: 'orderCreatedBy' },
        { text: 'Pickup/Delivery', value: 'pickUpDelivery' },
        { text: 'Base Price', value: 'basePrice' },
        { text: 'Bhukkad Convenience Price', value: 'bcPrice' },
        { text: 'Delivery Charge', value: 'deliveryCharge' },
        { text: 'Order Amount', value: 'orderAmt' },
        { text: 'MyTree Points Used', value: 'points' },
        { text: 'Amount Payable/Paid', value: 'amtPaid' },
        { text: 'Payment Mode', value: 'paymentMode' },
        { text: 'Transaction Number', value: 'transNo' },
        { text: 'Cancellation Reason', value: 'cancellation' },
        { text: 'Last Modified On', value: 'lastModifiedOn' },
        { text: 'Last Modified By', value: 'lastModifiedBy' },
        { text: 'Actions', value: 'actions', sortable: false},
      ],
      orders: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
      defaultItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.orders = [
          {
            orderNo: '1',
            orderStatus: 'InActive',
            dpImg: 'https://picsum.photos/id/11/500/300',
            dpName: 'Malai Kofta',
            csName: 'Suman Mehra',
            city: 'Bangalore',
            cluster: 'Skyline',
            chapter: 'Sewri',
            orderCreatedOn: '08/08/2021, 12:46:00',
            orderCreatedBy: 'Bhavik R',
            pickUpDelivery: '08/08-2021, 02:12:00',
            basePrice: '250.00',
            bcPrice: '30.00',
            deliveryCharge: '50.00',
            orderAmt: '300.00',
            points: '50',
            amtPaid: '250.00',
            paymentMode: 'Online',
            transNo: '123456',
            cancellation: 'NA',
            lastModifiedOn: '08/08/2021, 12:46:00',
            lastModifiedBy: 'John Smith'
          },
          {
            orderNo: '2',
            orderStatus: 'Active',
            dpImg: 'https://i.picsum.photos/id/810/350/165.jpg?hmac=gzApSXDk2T8EuRvdTn1Fh8MMl64xBhkG4hpoNekss2s',
            dpName: 'Paneer Butter Masala',
            csName: 'Suman Mehra',
            city: 'Bangalore',
            cluster: 'Skyline',
            chapter: 'Sewri',
            orderCreatedOn: '08/08/2021, 12:46:00',
            orderCreatedBy: 'Bhavik R',
            pickUpDelivery: '08/08-2021, 02:12:00',
            basePrice: '250.00',
            bcPrice: '30.00',
            deliveryCharge: '50.00',
            orderAmt: '300.00',
            points: '50',
            amtPaid: '250.00',
            paymentMode: 'Online',
            transNo: '123456',
            cancellation: 'NA',
            lastModifiedOn: '08/08/2021, 12:46:00',
            lastModifiedBy: 'John Smith'
          },
          {
            orderNo: '3',
            orderStatus: 'Active',
            dpImg: 'https://i.picsum.photos/id/781/350/165.jpg?hmac=Yl_QYkm3uzd02fqVl6yFe0PYlEy58u8wV_MxKhMPGJc',
            dpName: 'Veg Kofta',
            csName: 'Suman Mehra',
            city: 'Bangalore',
            cluster: 'Skyline',
            chapter: 'Sewri',
            orderCreatedOn: '08/08/2021, 12:46:00',
            orderCreatedBy: 'Bhavik R',
            pickUpDelivery: '08/08-2021, 02:12:00',
            basePrice: '250.00',
            bcPrice: '30.00',
            deliveryCharge: '50.00',
            orderAmt: '300.00',
            points: '50',
            amtPaid: '250.00',
            paymentMode: 'Online',
            transNo: '123456',
            cancellation: 'NA',
            lastModifiedOn: '08/08/2021, 12:46:00',
            lastModifiedBy: 'John Smith'
          },
          {
            orderNo: '4',
            orderStatus: 'Active',
            dpImg: 'https://i.picsum.photos/id/722/350/165.jpg?hmac=-HWYm4Xvo7PI5MBCQVjwnOvh9gZIAVAiADYSB0qMfM8',
            dpName: 'Chicken Masala',
            csName: 'Suman Mehra',
            city: 'Bangalore',
            cluster: 'Skyline',
            chapter: 'Sewri',
            orderCreatedOn: '08/08/2021, 12:46:00',
            orderCreatedBy: 'Bhavik R',
            pickUpDelivery: '08/08-2021, 02:12:00',
            basePrice: '250.00',
            bcPrice: '30.00',
            deliveryCharge: '50.00',
            orderAmt: '300.00',
            points: '50',
            amtPaid: '250.00',
            paymentMode: 'Online',
            transNo: '123456',
            cancellation: 'NA',
            lastModifiedOn: '08/08/2021, 12:46:00',
            lastModifiedBy: 'John Smith'
          },
          {
            orderNo: '5',
            orderStatus: 'Active',
            dpImg: 'https://i.picsum.photos/id/91/350/165.jpg?hmac=yvHx7Sac0925XASVBNFjWFa1Y0hwqJIwUStuNkpH1IM',
            dpName: 'Gobi Masala',
            csName: 'Suman Mehra',
            city: 'Bangalore',
            cluster: 'Skyline',
            chapter: 'Sewri',
            orderCreatedOn: '08/08/2021, 12:46:00',
            orderCreatedBy: 'Bhavik R',
            pickUpDelivery: '08/08-2021, 02:12:00',
            basePrice: '250.00',
            bcPrice: '30.00',
            deliveryCharge: '50.00',
            orderAmt: '300.00',
            points: '50',
            amtPaid: '250.00',
            paymentMode: 'Online',
            transNo: '123456',
            cancellation: 'NA',
            lastModifiedOn: '08/08/2021, 12:46:00',
            lastModifiedBy: 'John Smith'
          },
          {
            orderNo: '6',
            orderStatus: 'Active',
            dpImg: 'https://i.picsum.photos/id/91/350/165.jpg?hmac=yvHx7Sac0925XASVBNFjWFa1Y0hwqJIwUStuNkpH1IM',
            dpName: 'Kaju Khurma',
            csName: 'Suman Mehra',
            city: 'Bangalore',
            cluster: 'Skyline',
            chapter: 'Sewri',
            orderCreatedOn: '08/08/2021, 12:46:00',
            orderCreatedBy: 'Bhavik R',
            pickUpDelivery: '08/08-2021, 02:12:00',
            basePrice: '250.00',
            bcPrice: '30.00',
            deliveryCharge: '50.00',
            orderAmt: '300.00',
            points: '50',
            amtPaid: '250.00',
            paymentMode: 'Online',
            transNo: '123456',
            cancellation: 'NA',
            lastModifiedOn: '08/08/2021, 12:46:00',
            lastModifiedBy: 'John Smith'
          },
          {
            orderNo: '7',
            orderStatus: 'Active',
            dpImg: 'https://i.picsum.photos/id/810/350/165.jpg?hmac=gzApSXDk2T8EuRvdTn1Fh8MMl64xBhkG4hpoNekss2s',
            dpName: 'Palak Paneer',
            csName: 'Suman Mehra',
            city: 'Bangalore',
            cluster: 'Skyline',
            chapter: 'Sewri',
            orderCreatedOn: '08/08/2021, 12:46:00',
            orderCreatedBy: 'Bhavik R',
            pickUpDelivery: '08/08-2021, 02:12:00',
            basePrice: '250.00',
            bcPrice: '30.00',
            deliveryCharge: '50.00',
            orderAmt: '300.00',
            points: '50',
            amtPaid: '250.00',
            paymentMode: 'Online',
            transNo: '123456',
            cancellation: 'NA',
            lastModifiedOn: '08/08/2021, 12:46:00',
            lastModifiedBy: 'John Smith'
          },
          {
            orderNo: '8',
            orderStatus: 'Active',
            dpImg: 'https://i.picsum.photos/id/781/350/165.jpg?hmac=Yl_QYkm3uzd02fqVl6yFe0PYlEy58u8wV_MxKhMPGJc',
            dpName: 'Dal Tadka',
            csName: 'Suman Mehra',
            city: 'Bangalore',
            cluster: 'Skyline',
            chapter: 'Sewri',
            orderCreatedOn: '08/08/2021, 12:46:00',
            orderCreatedBy: 'Bhavik R',
            pickUpDelivery: '08/08-2021, 02:12:00',
            basePrice: '250.00',
            bcPrice: '30.00',
            deliveryCharge: '50.00',
            orderAmt: '300.00',
            points: '50',
            amtPaid: '250.00',
            paymentMode: 'Online',
            transNo: '123456',
            cancellation: 'NA',
            lastModifiedOn: '08/08/2021, 12:46:00',
            lastModifiedBy: 'John Smith'
          },
          {
            orderNo: '9',
            orderStatus: 'Active',
            dpImg: 'https://i.picsum.photos/id/722/350/165.jpg?hmac=-HWYm4Xvo7PI5MBCQVjwnOvh9gZIAVAiADYSB0qMfM8',
            dpName: 'Dal Fry',
            csName: 'Suman Mehra',
            city: 'Bangalore',
            cluster: 'Skyline',
            chapter: 'Sewri',
            orderCreatedOn: '08/08/2021, 12:46:00',
            orderCreatedBy: 'Bhavik R',
            pickUpDelivery: '08/08-2021, 02:12:00',
            basePrice: '250.00',
            bcPrice: '30.00',
            deliveryCharge: '50.00',
            orderAmt: '300.00',
            points: '50',
            amtPaid: '250.00',
            paymentMode: 'Online',
            transNo: '123456',
            cancellation: 'NA',
            lastModifiedOn: '08/08/2021, 12:46:00',
            lastModifiedBy: 'John Smith'
          },
          {
            orderNo: '10',
            orderStatus: 'Active',
            dpImg: 'https://i.picsum.photos/id/91/350/165.jpg?hmac=yvHx7Sac0925XASVBNFjWFa1Y0hwqJIwUStuNkpH1IM',
            dpName: 'Veg Kholapuri',
            csName: 'Suman Mehra',
            city: 'Bangalore',
            cluster: 'Skyline',
            chapter: 'Sewri',
            orderCreatedOn: '08/08/2021, 12:46:00',
            orderCreatedBy: 'Bhavik R',
            pickUpDelivery: '08/08-2021, 02:12:00',
            basePrice: '250.00',
            bcPrice: '30.00',
            deliveryCharge: '50.00',
            orderAmt: '300.00',
            points: '50',
            amtPaid: '250.00',
            paymentMode: 'Online',
            transNo: '123456',
            cancellation: 'NA',
            lastModifiedOn: '08/08/2021, 12:46:00',
            lastModifiedBy: 'John Smith'
          },
        ]
      },
      

      editItem (item) {
        this.editedIndex = this.orders.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.orders.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.orders.splice(this.editedIndex, 1)
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
          Object.assign(this.orders[this.editedIndex], this.editedItem)
        } else {
          this.orders.push(this.editedItem)
        }
        this.close()
      },
      getColor (calories) {
        if (calories === 'InActive') return 'red'
        else if (calories === 'Active') return 'orange'
        else return 'green'
      },
    },
  }
</script>

<style scoped>
.theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr:last-child > th {
    white-space: nowrap;
}
/* .v-text-field{
      width: 30px;
} */
</style>