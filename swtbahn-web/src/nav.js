export default {
  items: [
    {
      name: "Trackboard",
      url: "/trackboard",
      icon: "fa fa-dashboard"
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
      url: "/components",
      icon: "fa fa-eye",
      children: [
        {
          name: "Buttons",
          url: "/components/buttons",
          icon: "fa fa-puzzle-piece"
        },
        {
          name: "Badges",
          url: "/components/badges",
          icon: "fa fa-id-badge"
        },
        {
          name: "Alerts",
          url: "/components/alerts",
          icon: "fa fa-exclamation-triangle"
        },
        {
          name: "Progress Bars",
          url: "/components/progressbars",
          icon: "fa fa-spinner"
        },
        {
          name: "Grids",
          url: "/components/grids",
          icon: "fa fa-th"
        },
        {
          name: "Typography",
          url: "/components/typography",
          icon: "fa fa-file-word-o"
        }
      ]
    },
    {
      name: "Tables",
      url: "/components/tables",
      icon: "fa fa-table"
    },
    {
      name: "Forms",
      url: "/components/basic-form",
      icon: "fa fa-pencil-square-o",
      badge: {
        variant: "warning",
        text: "NEW"
      }
    },
    {
      name: "Chart JS",
      url: "/components/chartjs",
      icon: "fa fa-pie-chart",
      badge: {
        variant: "info",
        text: "NEW"
      }
    },
    {
      name: "Maps",
      url: "/components/maps/",
      icon: "fa fa-map-marker",
      badge: {
        variant: "info",
        text: "NEW"
      },
      children: [
        {
          name: "Google Maps",
          url: "/components/maps/google-maps",
          icon: "fa fa-map-o"
        },
        {
          name: "Leaflet Maps",
          url: "/components/maps/leaflet-maps",
          icon: "fa fa-street-view"
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
