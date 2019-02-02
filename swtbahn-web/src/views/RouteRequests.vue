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
                <td>Status</td>
                <td>Accept</td>
                <td>Reject</td>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="routerequest in this.controller.controllerRouteRequestArray"
                :key="routerequest.trainid"
              >
                <td>{{ routerequest.trainid }}</td>
                <td>{{ routerequest.startingsegment }}</td>
                <td>{{ routerequest.endingsegment }}</td>
                <td>{{ routerequest.status }}</td>
                <td>
                  <input
                    class="btn btn-success"
                    type="submit"
                    value="Accept Route"
                    @click="AcceptRouteHandler(routerequest.trainid)"
                  >
                </td>
                <td>
                  <input
                    class="btn btn-success"
                    type="submit"
                    value="Reject Route"
                    @click="RejectRouteHandler(routerequest.trainid)"
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
        <card header-text="Route Request">
          <div v-if="alert.message" :class="`alert ${alert.type}`">{{alert.message}}</div>
          <div class="form-group">
            <div class="input-group">
              <div class="input-group-addon">
                <i class="fa fa-puzzle-piece"></i>
              </div>

              <textarea
                name="textarea-input"
                v-model="routerequest.routedetails"
                id="textarea-input"
                v-validate="'required'"
                rows="9"
                placeholder="Route details..."
                class="form-control"
                :class="{ 'is-invalid': submitted && errors.has('routedetails') }"
              ></textarea>
              <div
                v-if="submitted && errors.has('routedetails')"
                class="invalid-feedback"
              >{{ errors.first('routedetails') }}</div>
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
        routedetails: ""
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
    ...mapActions("controller", ["GetControllerRouteRequest"]),
    ...mapActions("alert", ["error", "clear"]),
    AcceptRouteHandler(trainid) {
      this.selectedtrainID = trainid;
      this.showModal = true;
    }
  }
};
</script>