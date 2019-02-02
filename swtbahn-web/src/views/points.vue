<template>
  <div class="row">
    <div class="col-xs-12 col-md-12">
      <card header-text="Points">
        <div class="table-responsive">
          <table class="table table-striped first-td-padding">
            <thead>
              <tr>
                <td>Point name</td>
                <td>State</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="point in this.monitor.pointArray" :key="point.pointid">
                <td>{{ point.pointid }}</td>
                <td>{{ point.state }}</td>
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
  name: "points",
  components: {},
  computed: {
    ...mapState({
      monitor: state => state.monitor
    })
  },
  mounted() {
    this.GetPointsArray();
    this.monitor.monitorRequestInterval = setInterval(() => {
      this.GetPointsArray();
    }, appConfig.monitor_point_RequestInterval);
  },
  methods: {
    ...mapActions("monitor", ["GetPointsArray"])
  },
  beforeDestroy() {
    clearInterval(this.monitor.monitorRequestInterval);
  }
};
</script>