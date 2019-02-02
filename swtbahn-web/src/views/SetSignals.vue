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
              <tr v-for="signal in this.monitor.signalArray" :key="signal.signalid">
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
import { mapState, mapActions } from "vuex";
import appConfig from "../../config/appConfig";

export default {
  name: "setsignals",
  components: {},
  computed: {
    ...mapState({
      monitor: state => state.monitor,
      controller: state => state.controller
    })
  },
  mounted() {
    this.GetSignalsArray();
    this.controller.controllerRequestInterval = setInterval(() => {
      this.GetSignalsArray();
    }, appConfig.controller_set_signal_RequestInterval);
  },
  beforeDestroy() {
    clearInterval(this.controller.controllerRequestInterval);
  },
  methods: {
    ...mapActions("monitor", ["GetSignalsArray"]),
    ...mapActions("controller", ["SetSignalState"]),
    ChangeSignalState(id, stateValue) {
      this.SetSignalState({
        signalid: id,
        state: stateValue
      });
    }
  }
};
</script>
