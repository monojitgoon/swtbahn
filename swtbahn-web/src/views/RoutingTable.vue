<template>
  <v-app id="inspire">
    <v-card>
      <v-card-title>Interlocking Table
        <v-spacer></v-spacer>
        <v-text-field v-model="search" label="Search" single-line hide-details></v-text-field>
      </v-card-title>
      <v-data-table :headers="headers" :items="this.controller.routingTable" :search="search">
        <template slot="items" slot-scope="props">
          <td>{{ props.item.startseg }}</td>
          <td>{{ props.item.endseg }}</td>
          <td>{{ props.item.path }}</td>
          <td>{{ props.item.points }}</td>
          <td>{{ props.item.signals }}</td>
          <td>{{ props.item.conflicts }}</td>
        </template>
        <v-alert
          slot="no-results"
          :value="true"
          color="error"
          icon="warning"
        >Your search for "{{ search }}" found no results.</v-alert>
      </v-data-table>
    </v-card>
  </v-app>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "routingtable",
  data() {
    return {
      search: "",
      headers: [
        {
          text: "Start Segment",
          value: "startseg"
        },
        { text: "End Segment", value: "endseg" },
        { text: "Path", value: "path" },
        { text: "Points", value: "points" },
        { text: "Signals", value: "signals" },
        { text: "Conflicts", value: "conflicts" }
      ]
    };
  },
  components: {},
  computed: {
    ...mapState({
      controller: state => state.controller
    })
  },
  mounted() {
    this.GetRoutingTable();
  },
  methods: {
    ...mapActions("controller", ["GetRoutingTable"])
  }
};
</script>