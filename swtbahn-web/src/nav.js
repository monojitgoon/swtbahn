export default {
  items: [
    {
      name: "Trackboard",
      url: "/trackboard",
      icon: "fa fa-road"
    },
    {
      title: true,
      name: "User Options",
      class: "",
      wrapper: {
        element: "",
        attributes: {}
      }
    },

    {
      name: "Aspects",
      url: "/",
      icon: "fa fa-eye",
      children: [
        {
          name: "Trains",
          url: "/trains",
          icon: "fa fa-train"
        },
        {
          name: "Signals",
          url: "/trains",
          icon: "fa fa-signal"
        },
        {
          name: "Segments",
          url: "/trains",
          icon: "fa fa-puzzle-piece"
        },
        {
          name: "Points",
          url: "/trains",
          icon: "fa fa-location-arrow"
        }
      ]
    },
    {
      name: "Driver",
      url: "/",
      icon: "fa fa-train",
      children: [
        {
          name: "DriverBoard",
          url: "/driverboard",
          icon: "fa fa-train"
        }
      ]
    },
    {
      name: "Stellwerk",
      url: "/",
      icon: "fa fa-compass",
      children: [
        {
          name: "Stellwerk",
          url: "/trains",
          icon: "fa fa-compass"
        }
      ]
    },
    {
      divider: true
    },
    {
      title: true,
      name: "Administritive"
    },
    {
      name: "Pages",
      url: "/auth",
      icon: "fa fa-paperclip",
      children: [
        {
          name: "Login",
          url: "/auth/login",
          icon: "fa fa-sign-in"
        },
        {
          name: "Register",
          url: "/auth/register",
          icon: "fa fa-sign-in"
        },
        {
          name: "Error 404",
          url: "/auth/Page404",
          icon: "fa fa-paper-plane"
        },
        {
          name: "Error 500",
          url: "/auth/Page500",
          icon: "fa fa-paper-plane"
        }
      ]
    }
  ]
};
