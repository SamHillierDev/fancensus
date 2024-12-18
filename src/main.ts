import { VueQueryPlugin } from "@tanstack/vue-query";
import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";
import "./assets/main.css";
import router from "./router";

const app = createApp(App);

app.use(VueQueryPlugin);
app.use(createPinia());
app.use(router);

app.mount("#app");
