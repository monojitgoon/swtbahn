<template>
  <v-card class="mx-auto" max-width="800">
    <v-toolbar card dense>
      <v-toolbar-title>
        <slot name="subheading"></slot>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-card-text>
      <v-layout justify-space-between mb-3>
        <v-flex text-xs-left>
          <span class="display-3 font-weight-light" v-text="speedValue"></span>
          <span class="subheading font-weight-light mr-1">SPEED</span>
          <v-fade-transition>
            <slot name="transition"></slot>
          </v-fade-transition>
        </v-flex>
        <v-flex text-xs-right>
          <slot name="playOrPauseButton"></slot>
        </v-flex>
      </v-layout>
      <slot name="sliderdiv"></slot>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "vue-slider",
  props: {
    speedValue: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {};
  },
  computed: {},
  methods: {}
};
</script>

<style>
@keyframes metronome-example {
  from {
    transform: scale(0.5);
  }
  to {
    transform: scale(1);
  }
}
.v-avatar--metronome {
  animation-name: metronome-example;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}
</style>
