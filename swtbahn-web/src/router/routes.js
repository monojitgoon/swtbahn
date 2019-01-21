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

//User Info
const User = resolve => {
  require.ensure(["../layouts/User.vue"], () => {
    resolve(require("../layouts/User.vue"));
  });
};

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

  { path: "/users", name: "users", component: User },
  {
    path: "/auth/login",
    component: Login,
    name: "login"
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
  //Redirect to Home
  { path: "/redirect-me", redirect: { name: "home" } },

  // 404 redirect to home
  { path: "*", redirect: { name: "Page404", component: Page404 } }
];
