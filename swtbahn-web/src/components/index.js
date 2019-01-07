import Vue from "vue";

//Components
import Alert from "./Alert.vue";
import AnimateNumber from "./AnimateNumber.vue";

//Importing Custom Components
import SidebarCollapse from "./sidebar/SidebarCollapse.vue";
import CardTemplate from "./widgets/CardTemplate.vue";
import Switches from "./widgets/Switch.vue";

// Registered Components
Vue.component("basix-alert", Alert);
Vue.component("sidebar-collapse", SidebarCollapse);
Vue.component("card", CardTemplate);
Vue.component("basix-counter", AnimateNumber);
Vue.component("basix-switch", Switches);

export {
  Alert,
  SidebarCollapse,
  CardTemplate,
  AnimateNumber,
  Tables,
  Switches
};
