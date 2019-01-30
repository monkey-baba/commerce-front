<template>

  <div class="app-container">
    <span style=""><strong>大仓信息</strong></span>
    <hr>
    <div class="filter-container">
      <ElForm ref="storedetail" :model="storedetail" :inline="true">
        <ElRow>
          <ElCol>
            <ElFormItem label=" 大仓编码:" prop="code" class="code">
              <ElInput v-model="storedetail.code" readonly="true" size="medium" style="width:500px;"/>
            </ElFormItem>
            <ElFormItem label=" 大仓名称:" prop="name" class="name">
              <ElInput v-model="storedetail.name" readonly="true" size="medium" style="width:500px;"/>
            </ElFormItem>
          </ElCol>
        </ElRow>
        <ElRow>
          <ElCol>
            <ElFormItem label=" 大仓分类:" prop="classifyId" class="classifyId">
              <ElInput v-model="storedetail.classifyId" readonly="true" size="medium" style="width:500px;"/>
            </ElFormItem>
            <ElFormItem label=" 大仓状态:" prop="pstatus" class="pstatus">
              <ElInput v-model="storedetail.pstatus" readonly="true" size="medium" style="width:500px;"/>
            </ElFormItem>
          </ElCol>
        </ElRow>
        <ElRow>
          <ElCol>
            <ElFormItem label=" 负责人:" prop="owner" class="owner">
              <ElInput v-model="storedetail.owner" readonly="true" size="medium" class="detailowner" style="width:500px;"/>
            </ElFormItem>
            <ElFormItem label=" 联系方式:" prop="contact" class="contact">
              <ElInput v-model="storedetail.contact" readonly="true" size="medium" style="width:500px;"/>
            </ElFormItem>
          </ElCol>
        </ElRow>
        <ElRow>
          <ElCol>
            <ElFormItem label="大仓地址:" prop="address" class="address">
              <address-select v-model="storedetail.paddress" class="detailpaddress" disabled="disabled" size="medium" style="width:500px;"/>
            </ElFormItem>
          </ElCol>
        </ElRow>
        <ElRow>
          <ElCol>
            <ElFormItem label=" " prop="detailaddress" class="detailaddress">
              <ElInput v-model="storedetail.detailaddress" readonly="true" size="medium" style="width:1000px;"/>
            </ElFormItem>
          </ElCol>
        </ElRow>
      </ElForm>
    </div>
  </div>
</template>

<script>
import { getStoresDetail } from '@/api/reservoirArea'
import AddressSelect from '@/components/Address/addressSelect'
import AddressLine from '../../components/Address/addressLine'

export default {
  name: 'StoreList',
  components: { AddressLine, AddressSelect },
  filters: {
    statusFilter(status) {
      const statusMap = {
        'COMPLETED': 'success',
        'SHIPPED': 'success',
        'APPROVED': 'primary',
        'CREATED': 'warning',
        'PENDING': 'primary'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      storedetail: {
        code: this.$route.params.id,
        name: '',
        classifyId: '',
        paddress: [],
        pstatus: '',
        owner: '',
        contact: '',
        detailaddress: ''
      },

      options: [],
      optionsStatus: [],
      paddress: [],
      storeid: ''

    }
  },
  watch: {
    '$route'(to, from) {
      this.getStoredetailData(this.$route.params.id)
    }
  },
  created() {
    this.getStoredetailData(this.$route.params.id)
  },
  methods: {
    getStoredetailData(val) {
      this.storeid = val
      getStoresDetail(this.storeid).then(response => {
        this.storedetail = response.data
      })
    }
  }
}
</script>
<style>
  hr {
    display: block;
    border: 0;
    border-bottom: 1px solid #eaeaea;
    height: 4px;
  }
.name{
  position: relative;
  left: 100px;
  top: 20px;
}
  .code{
    position: relative;
    left: 30px;
    top: 20px;
  }
  .classifyId{
    position: relative;
    left: 30px;
    top: 20px;
  }
  .pstatus{
    position: relative;
    left: 100px;
    top: 20px;
  }
  .owner{
    position: relative;
    left: 40px;
    top: 20px;
  }
  .contact{
    position: relative;
    left: 114px;
    top: 20px;
  }
  .address{
    position: relative;
    left: 30px;
    top: 20px;
  }
  .detailaddress{
    position: relative;
    left: 90px;
  }
  .detailowner{
    position: relative;
    left: 3px;
  }
  .detailpaddress{
    disabled:disabled;
  }
</style>
