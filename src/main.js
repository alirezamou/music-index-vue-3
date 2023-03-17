import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
  ssr: true,
  components,
  directives,
});

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faChevronUp,
  faChevronDown,
  faBook,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

library.add(faChevronUp);
library.add(faChevronDown);
library.add(faBook);
library.add(faPlus);

createApp(App)
  .use(store)
  .use(router)
  .use(vuetify)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
