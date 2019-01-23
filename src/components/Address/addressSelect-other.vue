<template>
  <el-cascader
    :options="options"
    v-model="selectedOptions"
    size="small"/>
</template>

<script>
import { regionData } from 'taobao-element-china-area-data'
export default {
  name: 'AddressSelect',
  props: {
    model: {
      type: Array,
      default: function() {
        return ['110000', '110100', '110101']
      }
    }
  },
  data() {
    return {
      options: regionData,
      selectedOptions: this.model
    }
  }
}
</script>
