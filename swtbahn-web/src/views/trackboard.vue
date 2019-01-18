<template>
  <div class="animated fadeIn">
    <div class="row">
      <!--/.col-->
      <div class="col">
        <div class="card">
          <div class="card-body">
            <div class="clearfix">
              <i class="fa fa-train bg-info p-3 font-2xl mr-3 float-left text-light"></i>
              <div class="h5 text-secondary mb-0 mt-1">{{Object.keys(trainsArray).length}}</div>
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
              <div class="h5 text-secondary mb-0 mt-1">{{Object.keys(signalsArray).length}}</div>
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
              <div class="h5 text-secondary mb-0 mt-1">{{Object.keys(segmentsArray).length}}</div>
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
              <div class="h5 text-secondary mb-0 mt-1">{{Object.keys(pointsArray).length}}</div>
              <div class="text-muted text-uppercase font-weight-bold font-xs small">Points</div>
            </div>
          </div>
        </div>
      </div>
      <!--/.col-->
      <div class="col">
        <section class="card">
          <div class="card-body text-secondary">
            <span>Server State : {{ ServerStatus }}</span>
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
import Trackpanel from "./trackpanel.vue";
import Api from "../API";

export default {
  name: "trackboard",
  components: {
    Trackpanel
  },
  data() {
    return {
      checkedServerSwitch: false,
      serverStatus: null,
      trainsArray: [],
      pointsArray: [],
      signalsArray: [],
      segmentsArray: []
    };
  },
  mounted() {
    this.CheckServerState();
  },
  created() {},
  computed: {},
  methods: {
    UpdatelocalStorage(session_id, grab_id) {
      localStorage.setItem("session_id", session_id);
      localStorage.setItem("grab_id", grab_id);
    },
    UpdateGrabbedTrainInLocalStorage(grab_train) {
      localStorage.setItem("grab_train", grab_train);
    },
    LoadStatistics() {
      this.GetTrainCount();
      this.GetSignalCount();
      this.GetSegmentCount();
      this.GetPointCount();
    },
    CheckServerState() {
      if (localStorage.getItem("serverState") == "true") {
        this.checkedServerSwitch = true;
        this.LoadStatistics();
      } else {
        this.checkedServerSwitch = false;
      }
    },
    SwitchServer(e) {
      if (e == true) {
        localStorage.setItem("serverState", "true");
        this.StartServer();
        this.LoadStatistics();
      } else {
        localStorage.setItem("serverState", "false");
        this.StopServer();
        this.LoadStatistics();
      }
    },
    StartServer() {
      Api()
        .post("admin/startup")
        .then(response => {
          if (response.status == 200) {
            this.UpdatelocalStorage(0, -1);
            this.UpdateGrabbedTrainInLocalStorage("");
            this.ServerStatus = "starting";
          } else this.ServerStatus = "running";
        })
        .catch(e => {
          console.error(e);
        });
    },
    StopServer() {
      Api()
        .post("admin/shutdown")
        .then(response => {
          if (response.status == 200) {
            this.UpdatelocalStorage(0, -1);
            this.UpdateGrabbedTrainInLocalStorage("");
            this.ServerStatus = "stopping";
          } else this.ServerStatus = "not running";
        })
        .catch(e => {
          console.error(e);
        });
    },
    GetTrainCount() {
      Api()
        .post("monitor/trains")
        .then(response => {
          if (response.status == 200) {
            this.trainsArray = response.data;
          }
        })
        .catch(e => {
          console.error(e);
        });
    },
    GetSignalCount() {
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
    },
    GetSegmentCount() {
      Api()
        .post("monitor/segments")
        .then(response => {
          if (response.status == 200) {
            this.segmentsArray = response.data;
          }
        })
        .catch(e => {
          console.error(e);
        });
    },
    GetPointCount() {
      Api()
        .post("monitor/points")
        .then(response => {
          if (response.status == 200) {
            this.pointsArray = response.data;
          }
        })
        .catch(e => {
          console.error(e);
        });
    }
  }
};
</script>

<style>
</style>