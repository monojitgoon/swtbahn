<template>
  <div class="row">
    <div class="col-xs-12 col-md-12">
      <card header-text="Trains">
        <div class="card-body card-block">
          <table class="table table-hover">
            <thead>
              <tr>
                <td>Train Name</td>
                <td>Grab Status</td>
                <td>Details</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="train in trainsArray" :key="train.trainid">
                <td>{{ train.trainid }}</td>
                <td>{{ train.grabbed }}</td>
                <td>
                  <button
                    id="show-modal"
                    type="button"
                    class="btn btn-secondary mb-1"
                    @click="GetTrainStatus(train.trainid)"
                  >Details</button>
                </td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </card>
    </div>
    <basix-modal large="true" v-show="showModal">
      <h4 slot="title">{{trainname}}</h4>
      <div>{{detailsData}}</div>
      <div slot="footer">
        <button class="btn btn-primary" @click="showModal = false">Close</button>
      </div>
    </basix-modal>
  </div>
</template>



<script>
import Api from "../API";
export default {
  name: "trains",
  components: {},
  data() {
    return {
      showModal: false,
      trainsArray: [],
      trainname: null,
      detailsData: null
    };
  },
  mounted() {
    this.GetTrainList();
  },
  created() {},
  methods: {
    GetTrainStatus: function(id) {
      this.trainname = id;
      let formData = new FormData();
      formData.append("train", id);
      Api()
        .post("monitor/train-state", formData)
        .then(response => {
          this.detailsData = response.data;
        })
        .catch(e => {
          console.error(e);
        });
      this.showModal = true;
    },
    GetTrainList() {
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
    }
  }
};
</script>