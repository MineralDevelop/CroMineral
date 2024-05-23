import Vue from 'vue';
import VueRouter from 'vue-router';
import ElementLoad from './components/ElementLoad.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/element/:id',
    name: 'element',
    component: ElementLoad,
    props: true // Pass route params as props to ElementLoad component
  }
];

const router = new VueRouter({
  routes
});

export default router;
