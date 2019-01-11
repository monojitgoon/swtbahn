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
              <div class="h5 text-secondary mb-0 mt-1">20</div>
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
              <div class="h5 text-secondary mb-0 mt-1">30</div>
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
              <div class="h5 text-secondary mb-0 mt-1">7</div>
              <div class="text-muted text-uppercase font-weight-bold font-xs small">Points</div>
            </div>
          </div>
        </div>
      </div>
      <!--/.col-->
      <div class="col">
        <section class="card">
          <div class="card-body text-secondary">
            {{ ServerStatus }}&nbsp;&nbsp;
            <basix-switch
              type="text"
              on="On"
              off="Off"
              variant="success"
              :pill="true"
              :checked="false"
              size="lg"
              @change="SwitchChange"
            />
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
    testvalue: false;
    return {
      ServerStatus: null,
      ActiveTrains: null,
      trainsArray: []
    };
  },
  mounted() {
    this.checkServerState();
  },
  created() {},
  computed: {},
  methods: {
    checkServerState() {
      if (localStorage.getItem("serverState") == "true") {
      }
    },
    SwitchChange(e) {
      if (e == true) {
        // this.$emit("change", data.unit);
        localStorage.setItem("serverState", "true");
        this.StartServer();
      } else {
        localStorage.setItem("serverState", "false");
        this.StopServer();
      }
    },
    StartServer() {
      Api()
        .post("admin/startup")
        .then(response => {
          if (response.status == 200) this.ServerStatus = "starting";
          else this.ServerStatus = "running";
        })
        .catch(e => {
          console.error(e);
        });
      this.GetTrainCount();
    },
    StopServer() {
      Api()
        .post("admin/shutdown")
        .then(response => {
          if (response.status == 200) this.ServerStatus = "stopping";
          else this.ServerStatus = "not running";
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
          } else this.ActiveTrains = "0";
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