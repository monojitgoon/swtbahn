<template>
  <div class="row">
    <div class="col-xs-12 col-md-12">
      <card header-text="Signals">
        <div class="table-responsive">
          <table class="table table-striped first-td-padding">
            <thead>
              <tr>
                <td>SignalName</td>
                <td>State</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="signal in signalsArray" :key="signal.signalid">
                <td>{{ signal.signalid }}</td>
                <td>{{ signal.state }}</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </card>
    </div>
  </div>
</template>

<script>
import Api from "../API";

export default {
  name: "signals",
  components: {},
  data() {
    return {
      signalsArray: []
    };
  },
  mounted() {
    this.GetSignalsList();
  },
  methods: {
    GetSignalsList() {
      Api()
        .post("monitor/signals")
        .then(response => {
          if (response.status == 200) {
            this.signalsArray = response.data;
          }
        })
        .catch(e => {
          console.error(e);
        });
    }
  }
};
</script>

