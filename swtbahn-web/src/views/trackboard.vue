<template>
  <div class="animated fadeIn">
    <div class="row">
      <!--/.col-->
      <div class="col">
        <div class="card">
          <div class="card-body">
            <div class="clearfix">
              <i class="fa fa-train bg-info p-3 font-2xl mr-3 float-left text-light"></i>
              <div
                class="h5 text-secondary mb-0 mt-1"
              >{{Object.keys(this.monitor.trainArray).length}}</div>
              <div class="text-muted text-uppercase font-weight-bold font-xs small">Active trains</div>
            </div>
          </div>
        </div>
      </div>
      <!--/.col-->
      <div class="col">
        <div class="card">
          <div class="card-body">
            <div class="clearfix">
              <i class="fa fa-signal bg-primary p-3 font-2xl mr-3 float-left text-light"></i>
              <div
                class="h5 text-secondary mb-0 mt-1"
              >{{Object.keys(this.monitor.signalArray).length}}</div>
              <div class="text-muted text-uppercase font-weight-bold font-xs small">Signals</div>
            </div>
          </div>
        </div>
      </div>
      <!--/.col-->
      <div class="col">
        <div class="card">
          <div class="card-body">
            <div class="clearfix">
              <i class="fa fa-puzzle-piece bg-warning p-3 font-2xl mr-3 float-left text-light"></i>
              <div
                class="h5 text-secondary mb-0 mt-1"
              >{{Object.keys(this.monitor.segmentArray).length}}</div>
              <div class="text-muted text-uppercase font-weight-bold font-xs small">Segments</div>
            </div>
          </div>
        </div>
      </div>
      <!--/.col-->
      <div class="col">
        <div class="card">
          <div class="card-body">
            <div class="clearfix">
              <i class="fa fa-location-arrow bg-danger p-3 font-2xl mr-3 float-left text-light"></i>
              <div
                class="h5 text-secondary mb-0 mt-1"
              >{{Object.keys(this.monitor.pointArray).length}}</div>
              <div class="text-muted text-uppercase font-weight-bold font-xs small">Points</div>
            </div>
          </div>
        </div>
      </div>
      <!--/.col-->
      <div class="col">
        <section class="card">
          <div class="card-body text-secondary">
            <span>{{alert.message}}</span>
            <br>
            <input class="btn btn-success" type="submit" value="Start" @click="SwitchServer(true)">
            <input class="btn btn-danger" type="submit" value="Stop" @click="SwitchServer(false)">
          </div>
        </section>
      </div>
      <!--/.col-->
    </div>
    <div class="row">
      <Trackpanel/>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import appConfig from "../../config/appConfig";
import Trackpanel from "./trackpanel.vue";

export default {
  name: "trackboard",
  components: {
    Trackpanel
  },
  mounted() {
    this.GetCurrentServerSessionId(this.system.sessionID);
    setTimeout(
      function() {
        this.LoadStatistics();
      }.bind(this),
      5000
    );

    this.system.systemStatisticsRequestInterval = setInterval(() => {
      this.LoadStatistics();
    }, appConfig.system_trackstatistics_RequestInterval);
  },
  created() {},
  beforeDestroy() {
    clearInterval(this.system.systemStatisticsRequestInterval);
  },
  computed: {
    ...mapState({
      system: state => state.system,
      alert: state => state.alert,
      monitor: state => state.monitor
    })
  },
  methods: {
    ...mapActions("system", ["GetCurrentServerSessionId", "StopServer"]),
    ...mapActions("monitor", [
      "GetTrainsArray",
      "GetPointsArray",
      "GetSegmentsArray",
      "GetSignalsArray"
    ]),
    LoadStatistics() {
      this.GetTrainsArray();
      this.GetSignalsArray();
      this.GetSegmentsArray();
      this.GetPointsArray();
    },
    SwitchServer(e) {
      if (e == true) {
        this.GetCurrentServerSessionId(this.system.sessionID);
        setTimeout(
          function() {
            this.LoadStatistics();
          }.bind(this),
          5000
        );
      } else {
        this.StopServer();
      }
    }
  }
};
</script>

<style>
</style>