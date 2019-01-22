<template>
  <span class="address-line">{{ addressLine }}</span>
</template>

<script>
import { pcaa } from 'area-data' // v5 or higher
import '@/components/Address/addressSelect.scss'
import propsync from 'vue-propsync'

export default {
  name: 'AddressLine',
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
      addressLine: ''
    }
  },
  watch: {
    sync_value(val) {
      if (val.length > 0) {
        console.log(val[0])
        const pro = pcaa['86'][val[0]]
        const city = pcaa[val[0]][val[1]]
        const dis = pcaa[val[1]][val[2]]
        console.log(pro + city)
        this.addressLine = pro + city + dis
      }
    }
  }
}
</script>
