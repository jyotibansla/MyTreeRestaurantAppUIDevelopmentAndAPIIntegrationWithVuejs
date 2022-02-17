<template>
  <div class="global pa-4">
    <div class="text-h6 mb-2">Global Parameters</div>
    <v-row class="mt-1">

      <v-col>
        <v-card class="pa-4">
          <v-card-title class="text-h5">
            {{gp1.name}} (%)</v-card-title
          >
          <v-card-text>
            <v-row class="mt-2">
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  type="number"
                  solo
                  dense
                  v-model="gp1.value"
                  :disabled="disabled1"
                  :rules="[!!gp1.value || 'This Field can`t be empty']"
                  min="0"
                  step="1"
                  required
                ></v-text-field>
              </v-col>
              <v-col>
                <v-icon
                  color="blue"
                  @click="editDisable(1)"
                  class="mt-2"
                >
                  mdi-pencil
                </v-icon>
              </v-col>
            </v-row>
            <div class="text-h6 font-weight-bolder mt-1">
              Last Changed On: <span v-if="gp1.lastModifiedAt !== null">{{ gp1.lastModifiedAt }}</span>
            </div>
            <div class="text-h6 font-weight-bolder mt-1">
              Last Changed By:
              <span v-if="gp1.lastModifiedBy !== null">{{
                gp1.lastModifiedBy
              }}</span>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              :color="disabled1 ? 'grey lighten-1' : 'pink'"
              dark
              class="btn"
              @click="editItem(gp1, 1)">
              Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col>
        <v-card class="pa-4">
          <v-card-title>{{gp2.name}} (%)</v-card-title>
          <v-card-text>
            <v-row class="mt-2">
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  type="number"
                  solo
                  dense
                  v-model="gp2.value"
                  :disabled="disabled2"
                  :rules="[!!gp2.value || 'This Field can`t be empty']"
                  min="0"
                  step="1"
                  required
                >
                </v-text-field>
              </v-col>
              <v-col>
                <v-icon color="blue" @click="editDisable(2)" class="mt-2"
                  >mdi-pencil</v-icon
                >
              </v-col>
            </v-row>
            <div class="text-h6 font-weight-bolder mt-1">
              Last Changed On: <span v-if="gp2.lastModifiedAt !== null">{{ gp2.lastModifiedAt }}</span>
            </div>
            <div class="text-h6 font-weight-bolder mt-1">
              Last Changed By:
              <span v-if="gp2.lastModifiedBy !== null">{{
                gp2.lastModifiedBy
              }}</span>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              :color="disabled2 ? 'grey lighten-1' : 'pink'"
              dark
              class="btn"
              @click="editItem(gp2, 2)"
              >Save</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card class="pa-4">
          <v-card-title>{{gp3.name}} (%)</v-card-title>
          <v-card-text>
            <v-row class="mt-2">
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  type="number"
                  solo
                  dense
                  v-model="gp3.value"
                  :disabled="disabled3"
                  :rules="[!!gp3.value || 'This Field can`t be empty']"
                  min="0"
                  step="1"
                  required
                >
                </v-text-field>
              </v-col>
              <v-col>
                <v-icon color="blue" @click="editDisable(3)" class="mt-2"
                  >mdi-pencil</v-icon>
              </v-col>
            </v-row>
           <div class="text-h6 font-weight-bolder mt-1">
              Last Changed On: <span v-if="gp3.lastModifiedAt !== null">{{ gp3.lastModifiedAt }}</span>
            </div>
            <div class="text-h6 font-weight-bolder mt-1">
              Last Changed By:
              <span v-if="gp3.lastModifiedBy !== null">{{
                gp3.lastModifiedBy
              }}</span>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              :color="disabled3 ? 'grey lighten-1' : 'pink'"
              dark
              class="btn"
              @click="editItem(gp3, 3)"
              >Save</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col>
        <v-card class="pa-4">
          <v-card-title>{{gp4.name}} (%)</v-card-title>
          <v-card-text>
            <v-row class="mt-2">
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  type="number"
                  solo
                  dense
                  v-model="gp4.value"
                  :disabled="disabled4"
                  :rules="[!!gp4.value || 'This Field can`t be empty']"
                  min="0"
                  step="1"
                  required
                >
                </v-text-field>
              </v-col>
              <v-col>
                <v-icon color="blue" @click="editDisable(4)" class="mt-2"
                  >mdi-pencil</v-icon>
              </v-col>
            </v-row>
           <div class="text-h6 font-weight-bolder mt-1">
              Last Changed On: <span v-if="gp4.lastModifiedAt !== null">{{ gp4.lastModifiedAt }}</span>
            </div>
            <div class="text-h6 font-weight-bolder mt-1">
              Last Changed By:
              <span v-if="gp4.lastModifiedBy !== null">{{
                gp4.lastModifiedBy
              }}</span>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              :color="disabled4 ? 'grey lighten-1' : 'pink'"
              dark
              class="btn"
              @click="editItem(gp4, 4)"
              >Save</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      disabled1: true,
      disabled2: true,
      disabled3: true,
      disabled4: true,
      gp1: {},
      gp2: {},
      gp3: {},
      gp4: {},
      globalParams: null,
    };
  },

  beforeDestroy(){
    this.unsubscribe();
  },

  created() {
    this.unsubscribe = this.$store.subscribe((mutation) => {
      if (mutation.type === "setAllGlobalParams" && mutation.payload) {
        this.globalParams = JSON.parse(mutation.payload);
        this.gp1 = this.globalParams[0];
        this.gp2 = this.globalParams[1];
        this.gp3 = this.globalParams[2];
        this.gp4 = this.globalParams[3];
      }
    });
    this.getallGlobalParameters();
  },
  methods: {
    ...mapActions(["getallGlobalParameters", "editItemByName"]),

    editDisable(val) {
      if (val === 1) {
        this.disabled1 = false;
      } else if (val === 2) {
        this.disabled2 = false;
      } else if (val === 3) {
        this.disabled3 = false;
      } else if (val === 4) {
        this.disabled4 = false;
      }
    },
    editItem(item, val) {
      let param = {
        name: item.name,
        value: item.value,
      };
      this.editItemByName(param);
      if (val === 1) {
        this.disabled1 = true;
      } else if (val === 2) {
        this.disabled2 = true;
      } else if (val === 3) {
        this.disabled3 = true;
      } else if (val === 4) {
        this.disabled4 = true;
      }
    },
  },
};
</script>

<style scoped>
.btn {
  text-transform: none !important;
}
</style>