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
              <tr v-for="signal in this.monitor.signalArray" :key="signal.signalid">
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
import { mapState, mapActions } from "vuex";
import appConfig from "../../config/appConfig";

export default {
  name: "signals",
  components: {},
  computed: {
    ...mapState({
      monitor: state => state.monitor
    })
  },
  mounted() {
    this.GetSignalsArray();
    this.monitor.monitorRequestInterval = setInterval(() => {
      this.GetSignalsArray();
    }, appConfig.monitor_signal_RequestInterval);
  },
  methods: {
    ...mapActions("monitor", ["GetSignalsArray"])
  },
  beforeDestroy() {
    clearInterval(this.monitor.monitorRequestInterval);
  }
};
</script>

