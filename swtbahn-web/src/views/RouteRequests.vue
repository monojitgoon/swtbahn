routerequests<template>
  <div class="row">
    <div class="col-xs-12 col-md-12">
      <card header-text="Route Requests">
        <div class="table-responsive">
          <table class="table table-striped first-td-padding">
            <thead>
              <tr>
                <td>Train Name</td>
                <td>Starting Segment</td>
                <td>Ending Segment</td>
                <td>Path Details</td>
                <td>Status</td>
                <td>Accept</td>
                <td>Reject</td>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="route_request in this.controller.controllerRouteRequestArray"
                :key="route_request.grabid"
              >
                <td>{{ route_request.trainid }}</td>
                <td>{{ route_request.startingsegment }}</td>
                <td>{{ route_request.endingsegment }}</td>
                <td>{{ route_request.path }}</td>
                <td>{{ route_request.status }}</td>
                <td>
                  <input
                    class="btn btn-success"
                    type="submit"
                    value="Accept Route"
                    @click="AcceptRouteHandler(route_request.grabid,route_request.trainid )"
                  >
                </td>
                <td>
                  <input
                    class="btn btn-success"
                    type="submit"
                    value="Reject Route"
                    @click="RejectRouteHandler(route_request.grabid)"
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </card>
    </div>
    <basix-modal v-show="showModal">
      <h4 slot="title">Train Name :{{this.selectedtrainID}}</h4>
      <form @submit.prevent="handleSubmit">
        <card header-text="Path Details">
          <div v-if="alert.message" :class="`alert ${alert.type}`">{{alert.message}}</div>
          <div class="form-group">
            <div class="input-group">
              <div class="input-group-addon">
                <i class="fa fa-puzzle-piece"></i>
              </div>

              <textarea
                name="textarea-input"
                v-model="routerequest.path"
                id="textarea-input"
                v-validate="'required'"
                rows="9"
                placeholder="Path Details..."
                class="form-control"
                :class="{ 'is-invalid': submitted && errors.has('path') }"
              ></textarea>
              <div
                v-if="submitted && errors.has('path')"
                class="invalid-feedback"
              >{{ errors.first('path') }}</div>
            </div>
          </div>
        </card>
        <div class="form-actions form-group">
          <button type="submit" class="btn btn-primary btn-sm" @click="showModal = false">
            <i class="fa fa-dot-circle-o"></i> Accept
          </button>
          <button type="reset" class="btn btn-danger btn-sm" @click="showModal = false">
            <i class="fa fa-ban"></i> Exit
          </button>
        </div>
      </form>
      <div slot="footer" v-show="false"></div>
    </basix-modal>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import appConfig from "../../config/appConfig";

export default {
  name: "routerequests",
  components: {},
  data() {
    return {
      routerequest: {
        grabid: null,
        path: "",
        status: ""
      },
      submitted: false,
      showModal: false,
      selectedtrainID: null
    };
  },
  computed: {
    ...mapState({
      controller: state => state.controller,
      alert: state => state.alert
    })
  },
  beforeDestroy() {
    clearInterval(this.controller.controllerRequestInterval);
  },
  mounted() {
    this.GetControllerRouteRequest();
    this.controller.controllerRequestInterval = setInterval(() => {
      this.GetControllerRouteRequest();
    }, appConfig.controller_routes_RequestInterval);
  },
  methods: {
    ...mapActions("controller", [
      "GetControllerRouteRequest",
      "updateRouteRequest"
    ]),
    ...mapActions("alert", ["error", "clear"]),
    AcceptRouteHandler(grabid, trainid) {
      this.selectedtrainID = trainid;
      this.showModal = true;
      this.routerequest.grabid = grabid;
      this.routerequest.path = "";
    },
    handleSubmit(e) {
      this.submitted = true;
      this.$validator.validate().then(valid => {
        if (valid) {
          this.routerequest.status = "Accepted";
          this.updateRouteRequest({
            routerequest: this.routerequest
          });
        }
      });
    },
    RejectRouteHandler(grabid) {
      var r = confirm("Are you sure to reject this route?");
      if (r == true) {
        this.routerequest.grabid = grabid;
        this.routerequest.path = "";
        this.routerequest.status = "Rejected";
        this.updateRouteRequest({
          routerequest: this.routerequest
        });
      }
    }
  }
};
</script>