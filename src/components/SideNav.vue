<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list-item>
        <v-list-item-avatar tile>
          <v-img
            max-height="50"
            max-width="50"
            src="../assets/img/myTree.png"
          ></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="text-h6"> MyTree Admin </v-list-item-title>
          <v-list-item-subtitle> Kaho Khilao Kamao! </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.to"
          @click="item.action && item.action()"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-group prepend-icon="mdi-account-group">
          <template v-slot:activator>
            <v-list-item-title>Users</v-list-item-title>
          </template>

          <v-list-item
            v-for="item in users"
            :key="item.title"
            :to="item.to"
            link
          >
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>

        <v-list-item
          v-for="item in items2"
          :key="item.title"
          :to="item.to"
          @click="item.action && item.action()"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-group prepend-icon="mdi-cog">
          <template v-slot:activator>
            <v-list-item-title>Manage Postings</v-list-item-title>
          </template>

          <v-list-item
            v-for="item in postings"
            :key="item.title"
            :to="item.to"
            link
          >
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>

        <v-list-item v-for="item in items1" :key="item.title" :to="item.to">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="pink" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <!--  <v-toolbar-title>Dashboard</v-toolbar-title> -->
      <!-- <v-spacer></v-spacer>
      <v-badge color="green" :content="content" class="mr-4">
          <v-icon>mdi-bell</v-icon>
      </v-badge>

        <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn light icon v-bind="attrs" v-on="on">
                <v-img max-width="30px" max-height="30px" src="../assets/img/myTree.png"></v-img>
                <v-icon dark>mdi-chevron-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item > LogOut </v-list-item>
            </v-list>
        </v-menu> -->

      <v-spacer></v-spacer>

      <!--       <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn> -->

      <span>
        <v-avatar>
          <!-- <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" /> -->
          <v-icon size="40">mdi-account-circle</v-icon>
        </v-avatar>
        <span v-text="this.$store.state.Login.userDetails.userName" class="ml-2"></span>
        <v-menu left bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="goTo">
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
            <!-- <v-list-item>
              <v-list-item-title>Profile Setting</v-list-item-title>
            </v-list-item> -->
          </v-list>
        </v-menu>
      </span>

      <!--  <div class="d-flex justify-space-between align-center">
        <v-icon size="40">mdi-account-circle</v-icon>
        <span>Lavanya H S</span>
      </div> -->
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: null,
      content: 232,
      items: [
        /* { title: "Dashboard", icon: "mdi-view-dashboard", to: "/dashboard" }, */
        { title: "Orders", icon: "mdi-cart", to: "/orders" },
        {title: "Reported Orders", icon:"mdi-package", to:"/reported-orders"}
      ],
      users: [
        { title: "Customer", icon: "mdi-account-supervisor", to: "/customers" },
        { title: "Chef", icon: "mdi-chef-hat", to: "/chefs" },
        { title: "Seller",icon: "mdi-account-tie",to: "/sellers"},
      ],
      items1: [
        { title: "Master Data", icon: "mdi-database", to: "/master-data" },
        { title: "Global Paramaters", icon: "mdi-database-sync", to: "/global-params" },
        //{ title: "Payments", icon: "mdi-briefcase", to: "/payments" },
        /* { title: "Advertisement", icon: "mdi-bullhorn", to: "/advertisements" }, */
        { title: "Cities", icon: "mdi-home-city", to: "/cities" },
      ],
      items2: [
        { title: "Chef Approval", icon: "mdi-account-arrow-right", to: "/chef-approval" },
        { title: "Seller Approval",icon: "mdi-account-arrow-right",to: "/seller-approval"},
        { title: "Manage Dishes", icon: "mdi-content-save-cog", to: "/manage-dishes" },
        { title: "Manage Products", icon: "mdi-content-save-cog",to: "/manage-products"},
      ],
      postings: [
        { title: "Dish Postings", icon: "mdi-content-save-edit", to: "/dishPostings" },
        { title: "Product Postings",icon: "mdi-content-save-edit",to: "/productPostings"},
      ]
    };
  },
  methods: {
    goTo() {
      //console.log("logoutt");
      // if (val === "/login") {
      this.$store.commit("setLogout", false);
      // } else {
      //   this.$router.push(val);
      // }
    },
  },
};
</script>