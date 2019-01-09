<template>
  <div class="row">
    <div class="col-xs-12 col-md-12">
      <card header-text="Trains">
        <table class="table table-hover">
          <thead>
            <tr>
              <td>Train Name</td>
              <td>Grab Status</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="train in trains" :key="train.trainid">
              <td>{{ train.trainid }}</td>
              <td>{{ train.grabbed }}</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </card>
    </div>
  </div>
</template>



<script>
import Api from "../API";
export default {
  name: "trains",
  data() {
    return {
      ActiveTrains: null,
      thirdbracketdata: [],
      trains: []
    };
  },
  mounted() {
    //this.GetTrainStatus();
  },
  created() {
    this.GetTrainStatus();
  },
  methods: {
    GetTrainStatus() {
      Api()
        .post("monitor/trains")
        .then(response => {
          if (response.status == 200) {
            this.trains = response.data;
          }
        })
        .catch(e => {
          console.error(e);
        });
    }
  }
};
</script>