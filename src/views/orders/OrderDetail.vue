<template>
  <div class="order-detail">
    <ElForm ref="createForm" :inline="true">
      <ElCard shadow="never" style="margin: 10px">
        <div slot="header" class="clearfix">
          <span class="title">订单头信息</span>
        </div>
        <ElRow>
          <ElCol :span="6">
            <ElFormItem :label="$t('order.detail.ecsOrderId.label')+':'" >
              {{ data.ecsOrderId }}
            </ElFormItem>
          </ElCol>
          <ElCol :span="6">
            <ElFormItem :label="$t('order.detail.status.label')+':'" >
              {{ data.status }}
            </ElFormItem>
          </ElCol>
          <ElCol :span="6">
            <ElFormItem :label="$t('order.detail.orderType.label')+':'">
              {{ data.orderType }}
            </ElFormItem>
          </ElCol>
          <ElCol :span="6">
            <ElFormItem :label="$t('order.detail.deliveryType.label')+':'">
              {{ data.deliveryType }}
            </ElFormItem>
          </ElCol>
        </ElRow>
        <ElRow>
          <ElCol :span="6">
            <ElFormItem :label="$t('order.detail.customer.label')+':'" >
              {{ data.customer }}
            </ElFormItem>
          </ElCol>
          <ElCol :span="6">
            <ElFormItem :label="$t('order.detail.platform.label')+':'" >
              {{ data.platform }}
            </ElFormItem>
          </ElCol>
          <ElCol :span="6">
            <ElFormItem :label="$t('order.detail.store.label')+':'" >
              {{ data.platform }}
            </ElFormItem>
          </ElCol>
          <ElCol :span="6">
            <ElFormItem :label="$t('order.detail.pos.label')+':'">
              {{ data.pos }}
            </ElFormItem>
          </ElCol>
        </ElRow>
        <ElRow>
          <ElCol :span="6">
            <ElFormItem :label="$t('order.detail.date.label')+':'" >
              {{ data.date }}
            </ElFormItem>
          </ElCol>
          <ElCol :span="6">
            <ElFormItem :label="$t('order.detail.paymentDate.label')+':'" >
              {{ data.paymentDate }}
            </ElFormItem>
          </ElCol>
          <ElCol :span="6">
            <ElFormItem :label="$t('order.detail.totalPrice.label')+':'" >
              {{ data.totalPrice }}
            </ElFormItem>
          </ElCol>
          <ElCol :span="6">
            <ElFormItem :label="$t('order.detail.deliveryCost.label')+':'">
              {{ data.deliveryCost }}
            </ElFormItem>
          </ElCol>
        </ElRow>
        <ElRow>
          <ElCol :span="6">
            <ElFormItem :label="$t('order.detail.orderSource.label')+':'" >
              {{ data.orderSource }}
            </ElFormItem>
          </ElCol>
          <ElCol :span="6">
            <ElFormItem :label="$t('order.detail.channel.label')+':'" >
              {{ data.channel }}
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
            <ElFormItem :label="$t('order.detail.receiver.label')+':'">
              {{ data.receiver }}
            </ElFormItem>
          </ElCol>
          <ElCol :span="6">
            <ElFormItem :label="$t('order.detail.receiverPhone.label')+':'">
              {{ data.receiverPhone }}
            </ElFormItem>
          </ElCol>
          <ElCol :span="6">
            <ElFormItem :label="$t('order.detail.address.label')+':'">
              <div v-if="data.address">
                <address-line v-model="data.address.address"/> {{ data.address.detail }}
              </div>
            </ElFormItem>
          </ElCol>
        </ElRow>
        <ElRow style="display: none">
          <ElCol :span="6">
            <ElFormItem :label="$t('order.detail.pointPos.code.label')+':'">
              <div v-if="data.pointPos">
                {{ data.pointPos.code }}
              </div>
            </ElFormItem>
          </ElCol>
          <ElCol :span="6">
            <ElFormItem :label="$t('order.detail.pointPos.name.label')+':'">
              <div v-if="data.pointPos">
                {{ data.pointPos.name }}
              </div>
            </ElFormItem>
          </ElCol>
          <ElCol :span="6">
            <ElFormItem :label="$t('order.detail.pointPos.address.label')+':'">
              <div v-if="data.pointPos">
                <address-line v-model="data.pointPos.pcd"/> {{ data.pointPos.detailAddress }}
              </div>
            </ElFormItem>
          </ElCol>
          <ElCol :span="6">
            <ElFormItem :label="$t('order.detail.pointPos.phone.label')+':'">
              <div v-if="data.pointPos">
                {{ data.pointPos.contact }}
              </div>
            </ElFormItem>
          </ElCol>
        </ElRow>
      </ElCard>
      <ElCard shadow="never" style="margin: 10px">
        <div slot="header" class="clearfix">
          <span class="title">发票信息</span>
        </div>
        <ElRow>
          <ElCol :span="6">
            <ElFormItem :label="$t('order.detail.invoice.label')+':'" >
              <div v-if="data.invoice">
                <!-- TODO -->
                {{ data.invoice.applied }}
              </div>
              <div v-else>
                否
              </div>
            </ElFormItem>
          </ElCol>
          <ElCol :span="6">
            <ElFormItem :label="$t('order.detail.invoiceType.label')+':'">
              <div v-if="data.invoice">
                {{ data.invoice.type }}
              </div>
            </ElFormItem>
          </ElCol>
          <ElCol :span="6">
            <ElFormItem :label="$t('order.detail.invoiceTitle.label')+':'">
              <div v-if="data.invoice">
                {{ data.invoice.title }}
              </div>
            </ElFormItem>
          </ElCol>
          <ElCol :span="6">
            <ElFormItem :label="$t('order.detail.invoiceAmount.label')+':'">
              <div v-if="data.invoice">
                {{ data.invoice.amount }}
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
            <ElFormItem :label="$t('order.detail.remark.label')+':'">
              <div class="remark">
                {{ data.remark }}
              </div>
            </ElFormItem>
          </ElCol>
          <ElCol :span="12">
            <ElFormItem :label="$t('order.detail.sellerRemark.label')+':'" >
              <ElTable
                v-loading="loading"
                :data="data.sellerRemarks"
                :header-cell-style="valueHeaderStyle"
                border
                fit
                stripe
                highlight-current-row
                max-height="300"
                style="width: 600px">
                <ElTableColumn :label="$t('order.detail.sellerRemark.date.label')" prop="date" />
                <ElTableColumn :label="$t('order.detail.sellerRemark.user.label')" prop="user" />
                <ElTableColumn :label="$t('order.detail.sellerRemark.remark.label')" prop="remark" />
              </ElTable>
            </ElFormItem>
          </ElCol>
        </ElRow>
      </ElCard>

      <ElTabs type="border-card" style="margin: 10px;box-shadow: none" >
        <ElTabPane label="商品信息">
          <ElRow>
            <ElTable
              v-loading="loading"
              :data="data.entries"
              :header-cell-style="valueHeaderStyle"
              max-height="300"
              border
              fit
              stripe
              highlight-current-row>
              <ElTableColumn :label="$t('order.detail.entries.sku.label')" prop="code" />
              <ElTableColumn :label="$t('order.detail.entries.name.label')" prop="name" />
              <ElTableColumn v-for="item in skuSpec.options" :label="item.name" :prop="'meta.'+[item.id]" :key="item.id" />
              <ElTableColumn :label="$t('order.detail.entries.quantity.label')" prop="quantity" />
              <ElTableColumn :label="$t('order.detail.entries.shippedQuantity.label')" prop="shippedQuantity" />
              <ElTableColumn :label="$t('order.detail.entries.basePrice.label')" prop="basePrice" />
              <ElTableColumn :label="$t('order.detail.entries.discount.label')" prop="discount" />
              <ElTableColumn :label="$t('order.detail.entries.price.label')" prop="sellPrice" />
              <ElTableColumn :label="$t('order.detail.entries.totalPrice.label')" prop="totalPrice" />
            </ElTable>
          </ElRow>
        </ElTabPane>
        <ElTabPane label="支付信息">
          <ElRow>
            <ElTable
              v-loading="loading"
              :data="data.payments"
              :header-cell-style="valueHeaderStyle"
              max-height="300"
              border
              fit
              stripe
              highlight-current-row>
              <ElTableColumn :label="$t('general.index')" type="index" width="55px"/>
              <ElTableColumn :label="$t('order.detail.payment.type.label')" prop="type" />
              <ElTableColumn :label="$t('order.detail.payment.amount.label')" prop="amount" />
            </ElTable>
          </ElRow>
        </ElTabPane>
        <ElTabPane label="配货信息">
          <ElRow>
            <ElTable
              v-loading="loading"
              :data="data.consignments"
              :header-cell-style="valueHeaderStyle"
              max-height="300"
              border
              fit
              stripe
              highlight-current-row>
              <ElTableColumn :label="$t('order.detail.consignment.code.label')" prop="code" />
              <ElTableColumn :label="$t('order.detail.consignment.status.label')" prop="status" />
              <ElTableColumn :label="$t('order.detail.consignment.carrier.label')" prop="carrier" />
              <ElTableColumn :label="$t('order.detail.consignment.expressNum.label')" prop="expressNum" />
            </ElTable>
          </ElRow>
        </ElTabPane>
      </ElTabs>
    </ElForm>
  </div>
</template>
<script>
import { getSkuSpecs, getOrderDetail } from '@/api/order'
import AddressLine from '@/components/Address/addressLine'
export default {
  name: 'OrderDetail',
  components: { AddressLine },
  filters: {
    numFilter(value) {
      // 截取当前数据到小数点后两位
      const realVal = parseFloat(value).toFixed(2)
      // num.toFixed(2)获取的是字符串
      return realVal
    }
  },
  data() {
    return {
      data: {},
      skuSpec: {
        options: []
      },
      loading: true
    }
  },
  created() {
    this.getOptions()
    this.getOrderData()
  },
  methods: {
    getOptions() {
      getSkuSpecs().then((response) => {
        this.skuSpec.options = response.data
      })
    },
    getOrderData() {
      getOrderDetail(this.$route.params.id).then((response) => {
        this.data = response.data
        this.loading = false
      }).catch(() => {
        this.$notify({
          title: '失败',
          message: '获取订单详情失败，请稍后再试',
          type: 'error',
          duration: 2000
        })
      })
    },
    valueHeaderStyle() {
      return 'padding:5px'
    }
  }
}
</script>
<style>
  .order-detail .el-form-item__label{
    font-weight: 400;
  }
  .order-detail .el-form-item{
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
