<template>
  <div class="row">
    <div class="col-xs-12 col-md-12">
      <card header-text="Points">
        <div class="table-responsive">
          <table class="table table-striped first-td-padding">
            <thead>
              <tr>
                <td>ID</td>
                <td>Status(Normal/Reverse)</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Point1</td>
                <td>
                  <basix-switch
                    type="text"
                    on="On"
                    off="Off"
                    variant="success"
                    :pill="true"
                    :checked="true"
                    size="lg"
                  />
                </td>
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
export default {
  name: "setpoints",
  components: {}
};
