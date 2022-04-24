// 组件管理器
class ComponentStore {
  constructor() {
    this.modules = {};
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new ComponentStore();
    }
    return this.instance;
  }

  // 通过id 获取组件
  getById(id) {
    if (this.isExist(id)) {
      return this.modules[id];
    } else {
      console.error("组件名为" + id + "不存在");
      return null;
    }
  }

  // 给组件设置id
  set(id, component) {
    if (this.isExist(id)) {
      console.error("组件id名" + id + "重复");
      return;
    }

    // 给组件加入id 属性
    component.selfId = id;
    this.modules[id] = component;

    // 注入子应用（用于调试）
    component.$sdk.setSubAppCase(this.modules, id);
  }

  // 通过id 清除组件
  clear(id) {
    if (!this.isExist(id)) {
      console.error("组件名为" + id + "不存在");
      return;
    }
    this.modules[id] = null;
    delete this.modules[id];
  }
  // 判断组件是否存在
  isExist(id) {
    return !!this.modules[id];
  }
}
const componentStoreCase = ComponentStore.getInstance();

export default componentStoreCase;
