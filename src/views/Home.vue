<template>
  <div class="home">
    <EaInput
      :value="value"
      @input="
      (val)=>{

        value = val;
      }
      "

      placeholder="nihao"
      width="100"
      clearable
    ></EaInput>

    <EaInput2
      :value="value2"
      @input="
      (val)=>{

        value2 = val;
      }
      "

      placeholder="nihao"
      width="100"
      clearable
    ></EaInput2>
  </div>
</template>

<script>


// 单独引入
//import '../../lib/button/index.css';
//import EaInput from '../../lib/button/index.js';

// 联合引入
import '../../lib/ea/index.css';
import { EaInput, EaInput2 } from '../../lib/ea/index.js';


export default {
  name: "Home",
  data(){
    return {
      value: '22222',
      value2: '44444'
    }
  },
  components: {
    EaInput,
    EaInput2
  },
};
</script>
