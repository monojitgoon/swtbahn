// Dynamic Loading Modules

// Views
const Trackboard = resolve => {
  require.ensure(["../views/trackboard.vue"], () => {
    resolve(require("../views/trackboard.vue"));
  });
};
const Trains = resolve => {
  require.ensure(["../views/trains.vue"], () => {
    resolve(require("../views/trains.vue"));
  });
};
const Signals = resolve => {
  require.ensure(["../views/signals.vue"], () => {
    resolve(require("../views/signals.vue"));
  });
};
const Segments = resolve => {
  require.ensure(["../views/segments.vue"], () => {
    resolve(require("../views/segments.vue"));
  });
};
const Points = resolve => {
  require.ensure(["../views/points.vue"], () => {
    resolve(require("../views/points.vue"));
  });
};
const Driverboard = resolve => {
  require.ensure(["../views/driverboard.vue"], () => {
    resolve(require("../views/driverboard.vue"));
  });
};
const SetPoints = resolve => {
  require.ensure(["../views/SetPoints.vue"], () => {
    resolve(require("../views/SetPoints.vue"));
  });
};
const SetSignals = resolve => {
  require.ensure(["../views/SetSignals.vue"], () => {
    resolve(require("../views/SetSignals.vue"));
  });
};
// UI Components
const Buttons = resolve => {
  require.ensure(["../components/Buttons.vue"], () => {
    resolve(require("../components/Buttons.vue"));
  });
};
const Switches = resolve => {
  require.ensure(["../components/switch/switches.vue"], () => {
    resolve(require("../components/switch/switches.vue"));
  });
};
const Alerts = resolve => {
  require.ensure(["../components/Alerts.vue"], () => {
    resolve(require("../components/Alerts.vue"));
  });
};

const BasicForms = resolve => {
  require.ensure(["../components/forms/BasicForms.vue"], () => {
    resolve(require("../components/forms/BasicForms.vue"));
  });
};
const Grids = resolve => {
  require.ensure(["../components/Grids.vue"], () => {
    resolve(require("../components/Grids.vue"));
  });
};
const Typography = resolve => {
  require.ensure(["../components/Typography.vue"], () => {
    resolve(require("../components/Typography.vue"));
  });
};
const Icons = resolve => {
  require.ensure(["../components/icons/Icons.vue"], () => {
    resolve(require("../components/icons/Icons.vue"));
  });
};
const SetsList = resolve => {
  require.ensure(["../components/icons/SetsList.vue"], () => {
    resolve(require("../components/icons/SetsList.vue"));
  });
};
const Sets = resolve => {
  require.ensure(["../components/icons/Set.vue"], () => {
    resolve(require("../components/icons/Set.vue"));
  });
};
const Tables = resolve => {
  require.ensure(["../components/tables/Tables.vue"], () => {
    resolve(require("../components/tables/Tables.vue"));
  });
};
// // User Info
// const User = resolve => { require.ensure(['../layouts/User.vue'], ()=>{ resolve(require('../layouts/User.vue')); }); };

//Pages
const Login = resolve => {
  require.ensure(["../pages/login/Login.vue"], () => {
    resolve(require("../pages/login/Login.vue"));
  });
};
const Register = resolve => {
  require.ensure(["../pages/register/Register.vue"], () => {
    resolve(require("../pages/register/Register.vue"));
  });
};
const Page404 = resolve => {
  require.ensure(["../pages/Page404.vue"], () => {
    resolve(require("../pages/Page404.vue"));
  });
};
const Page500 = resolve => {
  require.ensure(["../pages/Page500.vue"], () => {
    resolve(require("../pages/Page500.vue"));
  });
};

export const routes = [
  {
    path: "",
    name: "home",
    components: {
      default: Trackboard
    }
  },
  {
    path: "/trackboard",
    components: {
      default: Trackboard
    }
  },
  { path: "/trains", name: "trains", component: Trains },
  { path: "/signals", name: "signals", component: Signals },
  { path: "/segments", name: "segments", component: Segments },
  { path: "/points", name: "points", component: Points },
  { path: "/driverboard", name: "driverboard", component: Driverboard },
  { path: "/setpoints", name: "setpoints", component: SetPoints },
  { path: "/setsignals", name: "setsignals", component: SetSignals },

  // // UI Components
  { path: "/components/buttons", name: "buttons", component: Buttons },
  {
    path: "/components/switch/switches",
    name: "switches",
    component: Switches
  },
  { path: "/components/alerts", name: "alerts", component: Alerts },
  { path: "/components/basic-form", name: "basic-form", component: BasicForms },
  { path: "/components/grids", name: "grids", component: Grids },
  { path: "/components/typography", name: "typography", component: Typography },
  { path: "/components/tables", name: "tables", component: Tables },

  {
    path: "/components/icons",
    component: Icons,
    children: [
      {
        path: "",
        component: SetsList,
        name: "Icons"
      },
      {
        path: ":name",
        component: Sets,
        props: true
      }
    ]
  },

  {
    path: "/components/auth",
    name: "auth",
    component: {
      render(c) {
        return c("router-view");
      }
    },
    children: [
      {
        path: "/auth/login",
        component: Login,
        name: "login",
        meta: {
          default: false,
          title: "Login"
        }
      },
      {
        path: "/auth/register",
        component: Register,
        name: "Register"
      },
      {
        path: "/auth/Page404",
        component: Page404,
        name: "Page404"
      },
      {
        path: "/auth/Page500",
        component: Page500,
        name: "Page500"
      }
    ]
  },

  //Redirect to Home
  { path: "/redirect-me", redirect: { name: "home" } },

  // 404 redirect to home
  { path: "*", redirect: { name: "Page404", component: Page404 } }
];
