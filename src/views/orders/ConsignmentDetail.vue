<template>
  <div class="consignment-detail">
    <ElForm :inline="true">
      <ElCard shadow="never" style="margin: 10px">
        <div slot="header" class="clearfix">
          <span class="title">配货单头信息</span>
        </div>
        <ElRow>
          <ElCol :span="6">
            <ElFormItem :label="$t('consignment.detail.ecsOrderId.name')+':'" >
              {{ consignment.ecsOrderId }}
            </ElFormItem>
          </ElCol>
          <ElCol :span="6">
            <ElFormItem :label="$t('consignment.detail.consignmentCode.name')+':'" >
              {{ consignment.consignmentCode }}
            </ElFormItem>
          </ElCol>
          <ElCol :span="6">
            <ElFormItem :label="$t('consignment.detail.consignmentStatus.name')+':'">
              {{ consignment.consignmentStatusName }}
            </ElFormItem>
          </ElCol>
          <ElCol :span="6">
            <ElFormItem :label="$t('consignment.detail.deliveryType.name')+':'">
              {{ consignment.deliveryTypeName }}
            </ElFormItem>
          </ElCol>
        </ElRow>
        <ElRow>
          <ElCol :span="6">
            <ElFormItem :label="$t('consignment.detail.customer.name')+':'" >
              {{ consignment.customer }}
            </ElFormItem>
          </ElCol>
          <ElCol :span="6">
            <ElFormItem :label="$t('consignment.detail.deliveryPos.name')+':'" >
              {{ consignment.posName }}
            </ElFormItem>
          </ElCol>
          <ElCol :span="6">
            <ElFormItem :label="$t('consignment.detail.carrier.name')+':'" >
              {{ consignment.carrierName }}
            </ElFormItem>
          </ElCol>
          <ElCol :span="6">
            <ElFormItem :label="$t('consignment.detail.expressNum.name')+':'">
              {{ consignment.expressNum }}
            </ElFormItem>
          </ElCol>
        </ElRow>
        <ElRow>
          <ElCol :span="6">
            <ElFormItem :label="$t('consignment.detail.date.name')+':'" >
              {{ consignment.date }}
            </ElFormItem>
          </ElCol>
          <ElCol :span="6">
            <ElFormItem :label="$t('consignment.detail.deliveryDate.name')+':'" >
              {{ consignment.deliveryDate }}
            </ElFormItem>
          </ElCol>
          <ElCol :span="6">
            <ElFormItem :label="$t('consignment.detail.consignmentTotalPrice.name')+':'" >
              {{ consignment.totalPrice }}
            </ElFormItem>
          </ElCol>
          <ElCol :span="6">
            <ElFormItem :label="$t('consignment.detail.deliveryCost.name')+':'">
              {{ consignment.deliveryCost }}
            </ElFormItem>
          </ElCol>
        </ElRow>
      </ElCard>
      <ElCard shadow="never" style="margin: 10px;overflow: visible">
        <div slot="header" class="clearfix">
          <span class="title">收件人信息</span>
        </div>
        <ElRow>
          <ElCol :span="6">
            <ElFormItem :label="$t('consignment.detail.receiver.name')+':'">
              {{ consignment.receiver }}
            </ElFormItem>
          </ElCol>
          <ElCol :span="6">
            <ElFormItem :label="$t('consignment.detail.receiverPhone.name')+':'">
              {{ consignment.receiverPhone }}
            </ElFormItem>
          </ElCol>
          <ElCol :span="6">
            <ElFormItem :label="$t('consignment.detail.receiverAddress.name')+':'">
              <div v-if="consignment.address">
                <address-line v-model="consignment.address.address"/> {{ consignment.address.detail }}
              </div>
            </ElFormItem>
          </ElCol>
        </ElRow>
      </ElCard>
      <ElCard shadow="never" style="margin: 10px">
        <div slot="header" class="clearfix">
          <span class="title">备注信息</span>
        </div>
        <ElRow>
          <ElCol :span="12">
            <ElFormItem :label="$t('consignment.detail.remark.name')+':'">
              <div class="remark">
                {{ consignment.remark }}
              </div>
            </ElFormItem>
          </ElCol>
          <ElCol :span="12">
            <ElFormItem :label="$t('consignment.detail.sellRemark.name')+':'" >
              <ElTable
                v-loading="loading"
                :data="consignment.sellerRemarks"
                :header-cell-style="valueHeaderStyle"
                border
                fit
                stripe
                highlight-current-row
                max-height="200"
                style="width: 600px">
                <ElTableColumn :label="$t('consignment.detail.sellRemark.date.name')" prop="date" />
                <ElTableColumn :label="$t('consignment.detail.sellRemark.userName.name')" prop="user" />
                <ElTableColumn :label="$t('consignment.detail.sellRemark.remark.name')" prop="remark" />
              </ElTable>
              <ElRow>
                <ElCol :span="20">
                  <ElInput v-model="remark" style="margin-top: 5px " />
                </ElCol>
                <ElCol :span="1">
                  <blockquote />
                </ElCol>
                <ElCol :span="3">
                  <ElButton style="margin-top: 5px" type="primary" @click="handleRemark">添加备注</ElButton>
                </ElCol>
              </ElRow>
            </ElFormItem>
          </ElCol>
        </ElRow>
      </ElCard>

      <ElTabs type="border-card" style="margin: 10px;box-shadow: none" >
        <ElTabPane label="配货单行">
          <ElRow>
            <ElTable
              v-loading="loading"
              :data="consignment.entries"
              :header-cell-style="valueHeaderStyle"
              max-height="300"
              border
              fit
              stripe
              highlight-current-row>
              <ElTableColumn :label="$t('consignment.detail.entries.skuCode.name')" prop="skuCode" />
              <ElTableColumn :label="$t('consignment.detail.entries.skuName.name')" prop="skuName" />
              <ElTableColumn v-for="item in skuSpec.options" :label="item.name" :prop="'meta.'+[item.id]" :key="item.id" />
              <ElTableColumn :label="$t('consignment.detail.entries.quantity.name')" prop="quantity" />
              <ElTableColumn :label="$t('consignment.detail.entries.shippedQuantity.name')" prop="shippedQuantity" />
            </ElTable>
          </ElRow>
        </ElTabPane>
      </ElTabs>
    </ElForm>
  </div>
</template>
<script>
import { getConsignmentDetail } from '@/api/consignment'
import { getSkuSpecs, addRemark } from '@/api/order'
import AddressLine from '@/components/Address/addressLine'
import { isEmpty } from '@/utils/validate'
export default {
  name: 'ConsignmentDetail',
  components: { AddressLine },
  data() {
    return {
      consignment: {
        orderId: '',
        ecsOrderId: '',
        consignmentCode: '',
        consignmentStatusName: '',
        deliveryTypeName: '',
        customer: '',
        posId: '',
        posName: '',
        carrierName: '',
        expressNum: '',
        date: '',
        deliveryDate: '',
        totalPrice: '',
        deliveryCost: '',
        receiver: '',
        receiverPhone: '',
        address: {},
        remark: '',
        sellerRemarks: [],
        entries: []
      },
      loading: true,
      skuSpec: {
        options: []
      },
      remark: ''
    }
  },
  created() {
    this.getOptions()
    this.getDetails()
  },
  methods: {
    getOptions() {
      getSkuSpecs().then((response) => {
        this.skuSpec.options = response.data
      })
    },
    getDetails() {
      getConsignmentDetail(this.$route.params.consignmentId).then((response) => {
        this.consignment = response.data
        this.loading = false
        console.log(this.consignment)
      }).catch(() => {
        this.$notify({
          title: '失败',
          message: '获取配货单详情失败，请稍后再试',
          type: 'error',
          duration: 2000
        })
      })
    },
    valueHeaderStyle() {
      return 'padding:5px'
    },
    handleRemark() {
      if (isEmpty(this.remark)) {
        return
      }
      addRemark(this.consignment.orderId, this.remark).then((response) => {
        this.consignment.sellerRemarks.push(response.data)
        this.remark = ''
      }).catch(() => {
        this.$notify({
          title: '失败',
          message: '创建失败，请稍后再试',
          type: 'error',
          duration: 2000
        })
      })
    }
  }
}
</script>
<style>
  .consignment-detail .el-form-item__label{
    font-weight: 400;
  }
  .consignment-detail .el-form-item{
    margin-bottom: 0 !important;
  }
  hr {
    display: block;
    border: 0;
    border-bottom: 1px solid #eaeaea;
    height: 1px;
  }
  .remark{
    border: 1px solid #cccccc;
    border-radius: 4px;
    display: block;
    width: 400px;
    min-height: 100px;
    padding-left: 10px;
  }
</style>
