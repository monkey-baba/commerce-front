<template>
  <area-cascader ref="area-cascader" v-model="sync_value" :level="1" :data="data"/>
</template>

<script>
import Vue from 'vue'
import { pcaa } from 'area-data' // v5 or higher
import '@/components/Address/addressSelect.scss' // v2 or higher
import VueAreaLinkage from 'vue-area-linkage'
import propsync from 'vue-propsync'
Vue.use(VueAreaLinkage)

export default {
  name: 'AddressSelect',
  mixins: [propsync],
  props: {
    value: {
      type: Array,
      default: function() {
        return []
      },
      isSync: true // 需要开启双向绑定的一定要写这句话，默认不会将所有的 prop 开启双向绑定
    }
  },
  data() {
    return {
      data: pcaa
    }
  },
  watch: {
    sync_value: {
      deep: true,
      handler(val) {
        if (val.length === 0) {
          // 清空input
          this.$refs['area-cascader'].$vnode.elm.firstChild.childNodes[0].innerText = '请选择'
        }
      }
    }
  }
}
</script>
