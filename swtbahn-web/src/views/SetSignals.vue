<template>
  <div class="row">
    <div class="col-xs-12 col-md-12">
      <card header-text="Signals">
        <div class="table-responsive">
          <table class="table table-striped first-td-padding">
            <thead>
              <tr>
                <td>SignalName</td>
                <td>Current State</td>
                <td>Red</td>
                <td>Green</td>
                <td>Yellow</td>
              </tr>
            </thead>
            <tbody>
              <tr></tr>
              <tr v-for="signal in signalsArray" :key="signal.signalid">
                <td>{{ signal.signalid }}</td>
                <td>{{ signal.state }}</td>
                <td>
                  <input
                    class="btn btn-danger"
                    type="submit"
                    value="Turn Red"
                    @click="ChangeSignalState(signal.signalid,'red')"
                  >
                </td>
                <td>
                  <input
                    class="btn btn-success"
                    type="submit"
                    value="Turn Green"
                    @click="ChangeSignalState(signal.signalid,'green')"
                  >
                </td>
                <td>
                  <input
                    class="btn btn-warning"
                    type="submit"
                    value="Turn Yellow"
                    @click="ChangeSignalState(signal.signalid,'yellow')"
                  >
                </td>
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
  name: "setsignals",
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
      //this.signalsArray = { "0": { signalid: "signal1", state: "red" } };
      Api()
        .get("monitor/signals")
        .then(response => {
          if (response.status == 200) {
            this.signalsArray = response.data;
          }
        })
        .catch(e => {
          console.error(e);
        });
    },
    ChangeSignalState(id, stateValue) {
      let formData = new FormData();
      formData.append("signal", id);
      formData.append("state", stateValue);
      Api()
        .post("controller/set-signal", formData)
        .then(response => {
          if (response.status == 200) this.GetSignalsList();
        })
        .catch(e => {
          console.error(e);
        });
    }
  }
};
</script>
