<template>
  <div>
    <ElForm ref="createForm" :model="form" :rules="rules" :inline="true">
      <ElCard shadow="never" style="margin: 10px">
        <div slot="header" class="clearfix">
          <span class="title">订单头信息</span>
        </div>
        <ElRow>
          <ElCol :span="6">
            <ElFormItem :label="$t('order.create.type.label')" prop="orderType">
              <ElSelect v-model="form.orderType" :placeholder="$t('order.create.type.placeholder')">
                <ElOption
                  v-for="item in orderType.options"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"/>
              </ElSelect>
            </ElFormItem>
          </ElCol>
          <ElCol :span="6">
            <ElFormItem :label="$t('order.create.code.label')" prop="code">
              <ElInput v-model="form.code" :placeholder="$t('order.create.code.placeholder')" />
            </ElFormItem>
          </ElCol>
          <ElCol :span="6">
            <ElFormItem :label="$t('order.create.platform.label')" prop="platform">
              <ElSelect v-model="form.platform" :placeholder="$t('order.create.platform.placeholder')">
                <ElOption
                  v-for="item in platform.options"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"/>
              </ElSelect>
            </ElFormItem>
          </ElCol>
          <ElCol :span="6">
            <ElFormItem :label="$t('order.create.store.label')" prop="store">
              <ElSelect v-model="form.store" :placeholder="$t('order.create.store.placeholder')">
                <ElOption
                  v-for="item in store.options"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"/>
              </ElSelect>
            </ElFormItem>
          </ElCol>
        </ElRow>
        <ElRow>
          <ElCol :span="6">
            <ElFormItem :label="$t('order.create.deliveryType.label')" prop="deliveryType">
              <ElSelect v-model="form.deliveryType" :placeholder="$t('order.create.deliveryType.placeholder')">
                <ElOption
                  v-for="item in deliveryType.options"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"/>
              </ElSelect>
            </ElFormItem>
          </ElCol>
          <ElCol :span="6">
            <ElFormItem :label="$t('order.create.carrier.label')" prop="carrier">
              <ElSelect v-model="form.carrier" :placeholder="$t('order.create.carrier.placeholder')">
                <ElOption
                  v-for="item in carrier.options"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"/>
              </ElSelect>
            </ElFormItem>
          </ElCol>
          <ElCol :span="6">
            <ElFormItem :label="$t('order.create.customer.label')" prop="customer">
              <ElInput :placeholder="$t('order.create.customer.placeholder')" :value="customer.value" suffix-icon="el-icon-search" readonly @click.native="handleCustomer" >
                <i slot="suffix" class="el-icon-search" @click="handleIcon"/>
              </ElInput>

            </ElFormItem>
          </ElCol>
          <ElCol :span="6">
            <ElFormItem :label="$t('order.create.pos.label')" prop="pos">
              <ElInput :placeholder="$t('order.create.pos.placeholder')" :value="pos.value" suffix-icon="el-icon-search" readonly @click.native="handlePos" />
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
            <ElFormItem :label="$t('order.create.receiver.label')" prop="receiver">
              <ElInput v-model="form.receiver" :placeholder="$t('order.create.receiver.placeholder')" />
            </ElFormItem>
          </ElCol>
          <ElCol :span="6">
            <ElFormItem :label="$t('order.create.receiverPhone.label')" prop="receiverPhone">
              <ElInput v-model="form.receiverPhone" :placeholder="$t('order.create.receiverPhone.placeholder')" />
            </ElFormItem>
          </ElCol>
          <ElCol :span="6">
            <ElFormItem :label="$t('order.create.pcd.label')" prop="pcd">
              <address-select v-model="form.pcd" />
            </ElFormItem>
          </ElCol>
          <ElCol :span="6">
            <ElFormItem :label="$t('order.create.address.label')" prop="address">
              <ElInput v-model="form.address" :placeholder="$t('order.create.address.placeholder')" />
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
            <ElFormItem :label="$t('order.create.remark.label')" prop="remark">
              <ElInput
                v-model="form.remark"
                :placeholder="$t('order.create.remark.placeholder')"
                :autosize="{ minRows: 2, maxRows: 6 }"
                type="textarea" />
            </ElFormItem>
          </ElCol>
          <ElCol :span="6">
            <ElFormItem :label="$t('order.create.buyerRemark.label')" prop="buyerRemark">
              <ElInput
                v-model="form.buyerRemark"
                :placeholder="$t('order.create.buyerRemark.placeholder')"
                :autosize="{ minRows: 2, maxRows: 6 }"
                type="textarea" />
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
            <ElFormItem :label="$t('order.create.invoice.label')" prop="invoice">
              <el-checkbox v-model="form.invoice"/>
            </ElFormItem>
          </ElCol>
          <ElCol :span="6">
            <ElFormItem :label="$t('order.create.invoiceType.label')" prop="invoiceType">
              <ElSelect v-model="form.invoiceType" :placeholder="$t('order.create.invoiceType.placeholder')">
                <ElOption
                  v-for="item in invoiceType.options"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"/>
              </ElSelect>
            </ElFormItem>
          </ElCol>
          <ElCol :span="6">
            <ElFormItem :label="$t('order.create.invoiceTitle.label')" prop="invoiceTitle">
              <ElInput v-model="form.invoiceTitle" :placeholder="$t('order.create.invoiceTitle.placeholder')" />
            </ElFormItem>
          </ElCol>
        </ElRow>
      </ElCard>
      <ElTabs type="border-card" style="margin: 10px;box-shadow: none" >
        <ElTabPane label="商品信息">
          <ElRow>
            <ElCol :span="6">
              <ElFormItem :label="$t('order.create.totalPrice.label')" prop="totalPrice">
                <ElInput v-model="form.totalPrice" :placeholder="$t('order.create.totalPrice.placeholder')" disabled />
              </ElFormItem>
            </ElCol>
            <ElCol :span="6">
              <ElFormItem :label="$t('order.create.deliveryCost.label')" prop="deliveryCost">
                <ElInput v-model="form.deliveryCost" :placeholder="$t('order.create.deliveryCost.placeholder')" />
              </ElFormItem>
            </ElCol>
          </ElRow>
          <ElRow>
            <el-button type="primary" class="blue-btn" size="mini" icon="el-icon-circle-plus" @click="handleSkuCreate" >新建</el-button>
            <el-button type="primary" class="red-btn" size="mini">删除</el-button>
            <el-table
              v-loading="sku.table.loading"
              :data="sku.table.data"
              :header-cell-style="valueHeaderStyle"
              max-height="300"
              border
              fit
              stripe
              highlight-current-row
              @selection-change="handleSkuChange">
              <el-table-column type="selection" width="50px"/>
              <el-table-column :label="$t('order.create.entries.sku.label')" prop="sku" />
              <el-table-column :label="$t('order.create.entries.name.label')" prop="name" />
              <el-table-column v-for="item in skuSpec.options" :label="item.name" :prop="item.id" :key="item.id" />
              <el-table-column :label="$t('order.create.entries.quantity.label')" prop="quantity" />
              <el-table-column :label="$t('order.create.entries.shippedQuantity.label')" prop="shippedQuantity" />
              <el-table-column :label="$t('order.create.entries.basePrice.label')" prop="basePrice" />
              <el-table-column :label="$t('order.create.entries.discount.label')" prop="discount" />
              <el-table-column :label="$t('order.create.entries.price.label')" prop="price" />
              <el-table-column :label="$t('order.create.entries.totalPrice.label')" prop="totalPrice" />
            </el-table>
          </ElRow>
        </ElTabPane>
        <ElTabPane label="支付信息">支付信息</ElTabPane>
      </ElTabs>
    </ElForm>
    <ElDialog :visible.sync="entry.visible" :title="$t('order.create.entries.title')">
      <ElForm
        ref="createEntryForm"
        :rules="entry.rules"
        :model="entry.form"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left:50px;"
      >
        <ElFormItem :label="$t('order.create.entries.sku.label')" prop="sku">
          <ElInput
            v-model="entry.form.sku"
            :placeholder="$t('order.create.entries.sku.placeholder')"
          />
        </ElFormItem>
        <ElFormItem :label="$t('order.create.entries.name.label')" prop="name">
          <ElInput
            v-model="entry.form.name"
            disabled
          />
        </ElFormItem>
        <ElFormItem v-for="item in skuSpec.options" :label="item.name" :prop="item.id" :key="item.id">
          <ElInput v-model="entry.form[item.id]" disabled />
        </ElFormItem>
        <ElFormItem :label="$t('order.create.entries.quantity.label')" prop="quantity">
          <ElInput v-model="entry.form.quantity" :placeholder="$t('order.create.entries.quantity.placeholder')" />
        </ElFormItem>
        <ElFormItem :label="$t('order.create.entries.shippedQuantity.label')" prop="shippedQuantity">
          <ElInput v-model="entry.form.shippedQuantity" :placeholder="$t('order.create.entries.shippedQuantity.placeholder')"/>
        </ElFormItem>
        <ElFormItem :label="$t('order.create.entries.basePrice.label')" prop="basePrice">
          <ElInput v-model="entry.form.basePrice" :placeholder="$t('order.create.entries.basePrice.placeholder')"/>
        </ElFormItem>
        <ElFormItem :label="$t('order.create.entries.discount.label')" prop="discount">
          <ElInput v-model="entry.form.discount" :placeholder="$t('order.create.entries.discount.placeholder')" />
        </ElFormItem>
      </ElForm>
      <div slot="footer" class="dialog-footer">
        <ElButton @click="entry.visible = false">
          {{ $t('table.cancel') }}
        </ElButton>
        <ElButton type="primary" @click="createValueData">
          {{ $t('table.confirm') }}
        </ElButton>
      </div>
    </ElDialog>
  </div>
</template>
<script>
import { getOrderTypes, getPlatforms, getBaseStores, getDeliveryTypes, getCarriers, getInvoiceTypes, getSkuSpecs } from '@/api/order'
import AddressSelect from '@/components/Address/addressSelect'
import { isEmpty } from '@/utils/validate'

export default {
  name: 'OrderCreate',
  components: { AddressSelect },
  data() {
    const invoiceType = (rule, value, callback) => {
      if (this.form.invoice && isEmpty(value)) {
        callback(new Error('发票类型不能为空'))
      } else {
        callback()
      }
    }
    const invoiceTitle = (rule, value, callback) => {
      if (this.form.invoice && isEmpty(value)) {
        callback(new Error('发票抬头不能为空'))
      } else {
        callback()
      }
    }
    return {
      form: {
        orderType: '',
        code: '',
        platform: '',
        store: '',
        deliveryType: '',
        carrier: '',
        customer: '',
        pos: '',
        receiver: '',
        receiverPhone: '',
        address: '',
        pcd: [],
        remark: '',
        buyerRemark: '',
        invoice: false,
        invoiceType: '',
        invoiceTitle: '',
        totalPrice: '0.00',
        deliveryCost: ''
      },
      rules: {
        orderType: [{ required: true, message: '订单类型不能为空', trigger: 'change' }],
        code: [{
          type: 'string',
          pattern: '^[a-zA-Z0-9]+$',
          required: true,
          message: '订单号必须是字母或数字',
          trigger: 'change'
        }],
        platform: [{ required: true, message: '平台不能为空', trigger: 'change' }],
        deliveryType: [{ required: true, message: '配送方式不能为空', trigger: 'change' }],
        carrier: [{ required: true, message: '承运商不能为空', trigger: 'change' }],
        customer: [{ required: true, message: '客户不能为空', trigger: 'change' }],
        receiver: [{ required: true, message: '收件人不能为空', trigger: 'change' }],
        receiverPhone: [{ required: true, message: '联系电话不能为空', trigger: 'change' }],
        address: [{ required: true, message: '地址不能为空', trigger: 'change' }],
        pcd: [{ required: true, message: '省市区不能为空', trigger: 'change' }],
        invoiceType: [{ required: false, validator: invoiceType, trigger: 'change' }],
        invoiceTitle: [{ required: false, validator: invoiceTitle, trigger: 'change' }],
        deliveryCost: [{ required: true, message: '运费金额不能为空', trigger: 'change' }]
      },
      orderType: {
        options: []
      },
      platform: {
        options: []
      },
      store: {
        options: []
      },
      deliveryType: {
        options: []
      },
      carrier: {
        options: []
      },
      customer: {
        value: ''
      },
      pos: {
        value: ''
      },
      invoiceType: {
        options: []
      },
      sku: {
        table: {
          loading: false,
          data: null,
          select: []
        }
      },
      skuSpec: {
        options: []
      },
      entry: {
        visible: false,
        rules: {},
        form: {}
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      // 获取订单类型
      getOrderTypes().then((response) => {
        this.orderType.options = response.data
      })
      getPlatforms().then((response) => {
        this.platform.options = response.data
      })
      getBaseStores().then((response) => {
        this.store.options = response.data
      })
      getDeliveryTypes().then((response) => {
        this.deliveryType.options = response.data
      })
      getCarriers().then((response) => {
        this.carrier.options = response.data
      })
      getInvoiceTypes().then((response) => {
        this.invoiceType.options = response.data
      })
      getSkuSpecs().then((response) => {
        this.skuSpec.options = response.data
      })
    },
    handleCustomer() {
      alert('TODO')
    },
    handlePos() {
      alert('TODO')
    },
    handleSkuChange(val) {
      this.sku.table.select = val
    },
    valueHeaderStyle() {
      return 'padding:5px'
    },
    handleIcon() {
      alert(11)
    },
    handleSkuCreate() {
      this.entry.form = {}
      this.entry.visible = true
      this.$nextTick(() => {
        this.$refs['createEntryForm'].clearValidate()
      })
    }
  }
}
</script>
<style>
  .el-card__header{
    padding: 10px 10px;
  }
</style>
