<template>
  <div class="row">
    <div class="col-xs-12 col-md-12">
      <card header-text="Trains">
        <div>{{Object.keys(results).length}}</div>
        <div v-for="(result, index) in results">
          <div class="card">
            <div class="card-section">
              <p>{{ index }}</p>
            </div>
            <div class="card-divider">
              <p>$ {{ result.USD }}</p>
            </div>
            <div class="card-section">
              <p>{{ result.EUR }}</p>
            </div>
          </div>
        </div>
        <!-- <table class="table table-hover">
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
        </table>-->
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
      trains: [],
      results: [],
      numberOfContacts: 0
    };
  },
  mounted() {
    this.GetTrainStatus();
  },
  created() {
    this.GetTrainStatus();
  },
  methods: {
    GetTrainStatus() {
      Api()
        .get(
          "https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH&tsyms=USD,EUR"
        )
        .then(response => {
          if (response.status == 200) {
            // this.trains = response.data;
            this.results = response.data;
            this.numberOfContacts = response.data.length;
            console.log(response.data);
          }
        })
        .catch(e => {
          console.error(e);
        });
    }
  }
};
</script>