import ZqButton from './src/button.vue';

/* istanbul ignore next */
ZqButton.install = function (Vue) {
  Vue.component(ZqButton.name, ZqButton);
};

export default ZqButton;
