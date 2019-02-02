<template>
  <div class="row">
    <div class="col-xs-12 col-md-12">
      <card header-text="Segments">
        <div class="table-responsive">
          <table class="table table-striped first-td-padding">
            <thead>
              <tr>
                <td>Segement Name</td>
                <td>Occupied</td>
                <td>Trains</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="segment in this.monitor.segmentArray" :key="segment.segmentid">
                <td>{{ segment.segmentid }}</td>
                <td>{{ segment.occupied }}</td>
                <td>{{ segment.trains }}</td>
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
  name: "segments",
  components: {},
  computed: {
    ...mapState({
      monitor: state => state.monitor
    })
  },
  mounted() {
    this.GetSegmentsArray();
    this.monitor.monitorRequestInterval = setInterval(() => {
      this.GetSegmentsArray();
    }, appConfig.monitor_segment_RequestInterval);
  },
  methods: {
    ...mapActions("monitor", ["GetSegmentsArray"])
  },
  beforeDestroy() {
    clearInterval(this.monitor.monitorRequestInterval);
  }
};
</script>
