import Vue from "vue";

//Components
import Alert from "./widgets/Alert.vue";

//Importing Custom Components
import SidebarCollapse from "./sidebar/SidebarCollapse.vue";
import CardTemplate from "./widgets/CardTemplate.vue";
import BasixModal from "./widgets/BasixModal.vue";
import VueSlider from "./widgets/VueSlider.vue";

// Registered Components
Vue.component("basix-alert", Alert);
Vue.component("sidebar-collapse", SidebarCollapse);
Vue.component("card", CardTemplate);
Vue.component("basix-modal", BasixModal);
Vue.component("vue-slider", VueSlider);

export { Alert, SidebarCollapse, CardTemplate, Tables, BasixModal, VueSlider };
