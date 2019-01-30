<template>
  <div class="order-detail">
    <ElForm ref="createForm" :model="form" :inline="true">
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
          <span class="title">备注信息</span>
        </div>
        <ElRow>
          <ElCol :span="6">
            <ElFormItem :label="$t('order.detail.remark.label')">
              111
            </ElFormItem>
          </ElCol>
          <ElCol :span="6">
            <ElFormItem :label="$t('order.detail.sellerRemark.label')" >
              111
            </ElFormItem>
          </ElCol>
        </ElRow>
      </ElCard>
      <ElCard shadow="never" style="margin: 10px">
        <div slot="header" class="clearfix">
          <span class="title">平台发票信息</span>
        </div>
        <ElRow>
          <ElCol :span="6">
            <ElFormItem :label="$t('order.detail.invoice.label')" >
              111
            </ElFormItem>
          </ElCol>
          <ElCol :span="6">
            <ElFormItem :label="$t('order.detail.invoiceType.label')">
              1111
            </ElFormItem>
          </ElCol>
          <ElCol :span="6">
            <ElFormItem :label="$t('order.detail.invoiceTitle.label')">
              111
            </ElFormItem>
          </ElCol>
        </ElRow>
      </ElCard>
      <ElTabs type="border-card" style="margin: 10px;box-shadow: none" >
        <ElTabPane label="商品信息">
          <ElRow>
            <ElTable
              v-loading="sku.table.loading"
              :data="sku.table.data"
              :header-cell-style="valueHeaderStyle"
              max-height="300"
              border
              fit
              stripe
              highlight-current-row>
              <ElTableColumn type="selection" width="50px"/>
              <ElTableColumn :label="$t('order.detail.entries.sku.label')" prop="code" />
              <ElTableColumn :label="$t('order.detail.entries.name.label')" prop="name" />
              <ElTableColumn v-for="item in skuSpec.options" :label="item.name" :prop="item.id" :key="item.id" />
              <ElTableColumn :label="$t('order.detail.entries.quantity.label')" prop="quantity" />
              <ElTableColumn :label="$t('order.detail.entries.shippedQuantity.label')" prop="shippedQuantity" />
              <ElTableColumn :label="$t('order.detail.entries.basePrice.label')" prop="basePrice" />
              <ElTableColumn :label="$t('order.detail.entries.discount.label')" prop="discount" />
              <ElTableColumn :label="$t('order.detail.entries.price.label')" prop="price" />
              <ElTableColumn :label="$t('order.detail.entries.totalPrice.label')" prop="totalPrice" />
            </ElTable>
          </ElRow>
        </ElTabPane>
        <ElTabPane label="支付信息">
          <ElRow>
            <ElTable
              v-loading="payment.table.loading"
              :data="payment.table.data"
              :header-cell-style="valueHeaderStyle"
              max-height="300"
              border
              fit
              stripe
              highlight-current-row>
              <ElTableColumn type="selection" width="50px"/>
              <ElTableColumn :label="$t('general.index')" type="index" width="55px"/>
              <ElTableColumn :label="$t('order.detail.payment.type.label')" prop="type.name" />
              <ElTableColumn :label="$t('order.detail.payment.amount.label')" prop="amount" />
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
  name: 'OrderCreate',
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
      sku: {
        table: {
          loading: false,
          data: [],
          select: []
        }
      },
      payment: {
        table: {
          loading: false,
          data: [],
          select: []
        }
      },
      skuSpec: {
        options: []
      }
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
</style>
