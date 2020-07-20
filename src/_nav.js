export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-home',
      // allowed: "dash"
    },
    {
      name: 'e-Menu',
      url: "/emenu",
      icon: "icon-notebook",
      children: [
        {
          name: 'Food Items',
          url: '/emenu/food-items',
          icon: 'fa fa-utensils',
          // allowed: "list-roles"
        },
        {
          name: 'Food Category',
          url: '/emenu/food-category',
          icon: 'fa fa-utensil-spoon',
          // allowed: "list-users"
        }
      ]
    },
    {
      name: "Customers",
      icon: "icon-user",
      url: '/customers',
    },
    {
      name: "Settings",
      icon: "icon-settings",
      url: '/settings',
    }
    // {
    //   title: true,
    //   name: 'Theme',
    //   wrapper: {            // optional wrapper object
    //     element: '',        // required valid HTML5 element tag
    //     attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
    //   },
    //   class: ''             // optional class names space delimited list for title item ex: "text-center"
    // },
    // {
    //   name: 'Try CoreUI PRO',
    //   url: 'https://coreui.io/pro/react/',
    //   icon: 'icon-layers',
    //   variant: 'danger',
    //   attributes: { target: '_blank', rel: "noopener" },
    // },
  ],
};
