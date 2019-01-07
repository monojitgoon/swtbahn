<template>
  <div class="row">
    <div class="col-xs-12 col-md-12">
      <card header-text="Signals">
        <div class="table-responsive">
          <table class="table table-striped first-td-padding">
            <thead>
              <tr>
                <td>ID</td>
                <td>Red</td>
                <td>Green</td>
                <td>Yellow</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>signal1</td>
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
  name: "setsignals",
  components: {}
};
