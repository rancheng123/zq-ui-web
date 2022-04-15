import './index.scss';
import { Input } from "element-ui";
export default {
  name: "EaInput",
  components: {
    Input,
  },
  mounted(){
    window.inputThat = this;
  },
  render(h){
    return (
      <Input
        class="inputWrap"
        attrs={{
          ...this.$attrs
        }}
        on={{
          ...this.$listeners
        }}
      />
    )
  }
};

