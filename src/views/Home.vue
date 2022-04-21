<template>
  <div class="home">
    <ZqInput
      :value="value"
      @input="
      (val)=>{

        value = val;
      }
      "

      placeholder="nihao"
      width="100"
      clearable
    ></ZqInput>
  </div>
</template>

<script>



import '../../lib/element-ui/theme/index.css'
import '../../lib/fonts/iconfont.css'
import '../../lib/index.css'
import { ZqInput, ZqIcon, ZqButton} from '../../lib/index.js';


export default {
  name: "Home",
  data(){
    return {
      value: '22222',
      value2: '44444'
    }
  },
  components: {
    ZqInput,
  },
};
</script>
