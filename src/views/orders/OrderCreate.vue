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
              <ElInput :placeholder="$t('order.create.customer.placeholder')" :value="customer.name" readonly @click.native="handleSearchCustomer" >
                <i slot="suffix" class="el-icon-close" @click="deleteSelectCustomer" @click.stop/>
              </ElInput>
            </ElFormItem>
          </ElCol>
          <ElCol :span="6">
            <ElFormItem :label="$t('order.create.pos.label')" prop="pos">
              <ElInput :placeholder="$t('order.create.pos.placeholder')" :value="pos.name" readonly @click.native="handleSearchPos" >
                <i slot="suffix" class="el-icon-close" @click="deleteSelectPos" @click.stop/>
              </ElInput>
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
                <ElInput :value="totalPrice | numFilter" :placeholder="$t('order.create.totalPrice.placeholder')" disabled />
              </ElFormItem>
            </ElCol>
            <ElCol :span="6">
              <ElFormItem :label="$t('order.create.deliveryCost.label')" prop="deliveryCost">
                <ElInput v-model="form.deliveryCost" :placeholder="$t('order.create.deliveryCost.placeholder')" />
              </ElFormItem>
            </ElCol>
          </ElRow>
          <ElRow>
            <ElButton type="primary" class="blue-btn" size="mini" icon="el-icon-circle-plus" @click="handleSkuCreate" >新建</ElButton>
            <ElButton type="primary" class="red-btn" size="mini">删除</ElButton>
            <ElTable
              v-loading="sku.table.loading"
              :data="sku.table.data"
              :header-cell-style="valueHeaderStyle"
              max-height="300"
              border
              fit
              stripe
              highlight-current-row
              @selection-change="handleSkuChange">
              <ElTableColumn type="selection" width="50px"/>
              <ElTableColumn :label="$t('order.create.entries.sku.label')" prop="sku" />
              <ElTableColumn :label="$t('order.create.entries.name.label')" prop="name" />
              <ElTableColumn v-for="item in skuSpec.options" :label="item.name" :prop="item.id" :key="item.id" />
              <ElTableColumn :label="$t('order.create.entries.quantity.label')" prop="quantity" />
              <ElTableColumn :label="$t('order.create.entries.shippedQuantity.label')" prop="shippedQuantity" />
              <ElTableColumn :label="$t('order.create.entries.basePrice.label')" prop="basePrice" />
              <ElTableColumn :label="$t('order.create.entries.discount.label')" prop="discount" />
              <ElTableColumn :label="$t('order.create.entries.price.label')" prop="price" />
              <ElTableColumn :label="$t('order.create.entries.totalPrice.label')" prop="totalPrice" />
            </ElTable>
          </ElRow>
        </ElTabPane>
        <ElTabPane label="支付信息">
          <ElRow>
            <ElCol :span="6">
              <ElFormItem :label="$t('order.create.totalPrice.label')" prop="totalPrice">
                <ElInput :value="totalPrice | numFilter" :placeholder="$t('order.create.totalPrice.placeholder')" disabled />
              </ElFormItem>
            </ElCol>
            <ElCol :span="6">
              <ElFormItem :label="$t('order.create.paymentTotal.label')" prop="paymentTotal">
                <ElInput :value="paymentTotal | numFilter" :placeholder="$t('order.create.paymentTotal.placeholder')" disabled />
              </ElFormItem>
            </ElCol>
            <ElCol :span="6">
              <ElFormItem :label="$t('order.create.totalDiff.label')" prop="totalDiff">
                <ElInput :value="totalDiff | numFilter" :placeholder="$t('order.create.totalDiff.placeholder')" disabled/>
              </ElFormItem>
            </ElCol>
          </ElRow>
          <ElRow>
            <ElButton type="primary" class="blue-btn" size="mini" icon="el-icon-circle-plus" @click="handlePaymentCreate" >新建</ElButton>
            <ElButton type="primary" class="red-btn" size="mini" @click="handlePaymentDeletes">删除</ElButton>
            <ElTable
              v-loading="payment.table.loading"
              :data="payment.table.data"
              :header-cell-style="valueHeaderStyle"
              max-height="300"
              border
              fit
              stripe
              highlight-current-row
              @selection-change="handlePaymentChange">
              <ElTableColumn type="selection" width="50px"/>
              <ElTableColumn :label="$t('general.index')" type="index" width="55px"/>
              <ElTableColumn :label="$t('order.create.payment.type.label')" prop="type.name" />
              <ElTableColumn :label="$t('order.create.payment.amount.label')" prop="amount" />
            </ElTable>
          </ElRow>
        </ElTabPane>
      </ElTabs>
    </ElForm>
    <ElDialog :visible.sync="sku.visible" :title="$t('order.create.entries.title')">
      <ElForm
        ref="createEntryForm"
        :rules="sku.rules"
        :model="sku.form"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left:50px;"
      >
        <ElFormItem :label="$t('order.create.entries.sku.label')" prop="sku">
          <ElInput :placeholder="$t('order.create.entries.sku.placeholder')" :value="sku.name" readonly @click.native="handleSearchSku" >
            <i slot="suffix" class="el-icon-close" @click="deleteSelectSku" @click.stop/>
          </ElInput>
        </ElFormItem>
        <ElFormItem :label="$t('order.create.entries.name.label')" prop="name">
          <ElInput
            v-model="sku.form.name"
            disabled
          />
        </ElFormItem>
        <ElFormItem v-for="item in skuSpec.options" :label="item.name" :prop="item.id" :key="item.id">
          <ElInput v-model="sku.form[item.id]" disabled />
        </ElFormItem>
        <ElFormItem :label="$t('order.create.entries.quantity.label')" prop="quantity">
          <ElInput v-model="sku.form.quantity" :placeholder="$t('order.create.entries.quantity.placeholder')" />
        </ElFormItem>
        <ElFormItem :label="$t('order.create.entries.shippedQuantity.label')" prop="shippedQuantity">
          <ElInput v-model="sku.form.shippedQuantity" :placeholder="$t('order.create.entries.shippedQuantity.placeholder')"/>
        </ElFormItem>
        <ElFormItem :label="$t('order.create.entries.basePrice.label')" prop="basePrice">
          <ElInput v-model="sku.form.basePrice" :placeholder="$t('order.create.entries.basePrice.placeholder')"/>
        </ElFormItem>
        <ElFormItem :label="$t('order.create.entries.discount.label')" prop="discount">
          <ElInput v-model="sku.form.discount" :placeholder="$t('order.create.entries.discount.placeholder')" />
        </ElFormItem>
      </ElForm>
      <div slot="footer" class="dialog-footer">
        <ElButton @click="sku.visible = false">
          {{ $t('table.cancel') }}
        </ElButton>
        <ElButton type="primary" >
          {{ $t('table.confirm') }}
        </ElButton>
      </div>
    </ElDialog>

    <ElDialog :visible.sync="payment.visible" :title="$t('order.create.payment.title')">
      <ElForm
        ref="createPaymentForm"
        :rules="payment.rules"
        :model="payment.form"
        label-position="left"
        label-width="100px"
        style="width: 400px; margin-left:50px;"
      >
        <ElFormItem :label="$t('order.create.payment.type.label')" prop="type">
          <ElSelect v-model="payment.form.type" :placeholder="$t('order.create.payment.type.placeholder')">
            <ElOption
              v-for="item in paymentType.options"
              :key="item.id"
              :label="item.name"
              :value="item"/>
          </ElSelect>
        </ElFormItem>
        <ElFormItem :label="$t('order.create.payment.amount.label')" prop="amount">
          <ElInput v-model="payment.form.amount" :placeholder="$t('order.create.payment.amount.placeholder')" />
        </ElFormItem>
      </ElForm>
      <div slot="footer" class="dialog-footer">
        <ElButton @click="payment.visible = false">
          {{ $t('table.cancel') }}
        </ElButton>
        <ElButton type="primary" @click="paymentCreate">
          {{ $t('table.confirm') }}
        </ElButton>
      </div>
    </ElDialog>

    <ElDialog :visible.sync="customerDialog.visible" :title="$t('customer.search.title')">
      <div class="filter-container">
        <ElForm ref="customerQuery" :model="customerQuery" :inline="true">
          <ElRow>
            <ElCol>
              <ElFormItem :label=" $t('customer.queryCode.label')+':' " >
                <ElInput v-model="customerQuery.code" auto-complete="on"/>
              </ElFormItem>
              <ElFormItem :label=" $t('customer.queryName.label')+':' ">
                <ElInput v-model="customerQuery.name" auto-complete="on"/>
              </ElFormItem>
            </ElCol>
          </ElRow>
          <ElRow>
            <ElFormItem>
              <ElCol>
                <ElButton :loading="customerSearch.loading" type="primary" icon="el-icon-search" size="small" @click="queryCustomer">查询
                </ElButton>
                <ElButton size="small" @click="resetCustomerQuery">重置</ElButton>
              </ElCol>
            </ElFormItem>
          </ElRow>
        </ElForm>
      </div>
      <ElTable
        v-loading="customerTable.loading"
        :data="customerTable.data"
        border
        fit
        stripe
        highlight-current-row
        @current-change="selectCustomer">
        <ElTableColumn :label="$t('general.index')" type="index" />
        <ElTableColumn :label="$t('customer.code.label')" prop="code" />
        <ElTableColumn :label="$t('customer.name.label')" prop="name" />
      </ElTable>

      <ElPagination
        :current-page="customerPagination.page"
        :page-sizes="customerPagination.pageSizes"
        :total="customerPagination.total"
        :background="customerPagination.background"
        align="right"
        layout="total, sizes, prev, pager, next, jumper"
        style="width: 100%"
        @size-change="handleCusSizeChange"
        @current-change="handleCusCurrentChange"/>
      <div slot="footer" class="dialog-footer">
        <ElButton @click="customerDialog.visible = false">
          {{ $t('table.cancel') }}
        </ElButton>
        <ElButton type="primary" @click="handleSelectCustomer">
          {{ $t('table.confirm') }}
        </ElButton>
      </div>
    </ElDialog>
    <ElDialog :visible.sync="posDialog.visible" :title="$t('pos.search.title')">
      <div class="filter-container">
        <ElForm ref="posQuery" :model="posQuery" :inline="true">
          <ElRow>
            <ElCol>
              <ElFormItem :label=" $t('pos.code.label')+':' " prop="code">
                <ElInput v-model="posQuery.code" auto-complete="on"/>
              </ElFormItem>
              <ElFormItem :label=" $t('pos.name.label')+':' " prop="name">
                <ElInput v-model="posQuery.name" auto-complete="on"/>
              </ElFormItem>
            </ElCol>
          </ElRow>
          <ElRow>
            <ElFormItem>
              <ElCol>
                <ElButton :loading="posSearch.loading" type="primary" icon="el-icon-search" size="small" @click="queryPos">查询
                </ElButton>
                <ElButton size="small" @click="resetPosQuery">重置</ElButton>
              </ElCol>
            </ElFormItem>
          </ElRow>
        </ElForm>
      </div>
      <ElTable
        v-loading="posTable.loading"
        :data="posTable.data"
        border
        fit
        stripe
        highlight-current-row
        @current-change="selectPos">
        <ElTableColumn :label="$t('general.index')" type="index" />
        <ElTableColumn :label="$t('pos.code.label')" prop="code" />
        <ElTableColumn :label="$t('pos.name.label')" prop="name" />
      </ElTable>

      <ElPagination
        :current-page="posPagination.page"
        :page-sizes="posPagination.pageSizes"
        :total="posPagination.total"
        :background="posPagination.background"
        align="right"
        layout="total, sizes, prev, pager, next, jumper"
        style="width: 100%"
        @size-change="handlePosSizeChange"
        @current-change="handlePosCurrentChange"/>
      <div slot="footer" class="dialog-footer">
        <ElButton @click="posDialog.visible = false">
          {{ $t('table.cancel') }}
        </ElButton>
        <ElButton type="primary" @click="handleSelectPos">
          {{ $t('table.confirm') }}
        </ElButton>
      </div>
    </ElDialog>

    <ElDialog :visible.sync="skuDialog.visible" :title="$t('sku_search.search.title')">
      <div class="filter-container">
        <ElForm ref="skuQuery" :model="skuQuery" :inline="true">
          <ElRow>
            <ElCol>
              <ElFormItem :label=" $t('sku_search.code.label')+':' " prop="code">
                <ElInput v-model="skuQuery.code" auto-complete="on"/>
              </ElFormItem>
              <ElFormItem :label=" $t('sku_search.name.label')+':' " prop="name">
                <ElInput v-model="skuQuery.name" auto-complete="on"/>
              </ElFormItem>
            </ElCol>
          </ElRow>
          <ElRow>
            <ElFormItem>
              <ElCol>
                <ElButton :loading="skuSearch.loading" type="primary" icon="el-icon-search" size="small" @click="querySku">查询
                </ElButton>
                <ElButton size="small" @click="resetSkuQuery">重置</ElButton>
              </ElCol>
            </ElFormItem>
          </ElRow>
        </ElForm>
      </div>
      <ElTable
        v-loading="skuTable.loading"
        :data="skuTable.data"
        border
        fit
        stripe
        highlight-current-row
        @current-change="selectSku">
        <ElTableColumn :label="$t('general.index')" type="index" />
        <ElTableColumn :label="$t('sku_search.code.label')" prop="code" />
        <ElTableColumn :label="$t('sku_search.name.label')" prop="name" />
      </ElTable>

      <ElPagination
        :current-page="skuPagination.page"
        :page-sizes="skuPagination.pageSizes"
        :total="skuPagination.total"
        :background="skuPagination.background"
        align="right"
        layout="total, sizes, prev, pager, next, jumper"
        style="width: 100%"
        @size-change="handleSkuSizeChange"
        @current-change="handleSkuCurrentChange"/>
      <div slot="footer" class="dialog-footer">
        <ElButton @click="skuDialog.visible = false">
          {{ $t('table.cancel') }}
        </ElButton>
        <ElButton type="primary" @click="handleSelectSku">
          {{ $t('table.confirm') }}
        </ElButton>
      </div>
    </ElDialog>
  </div>
</template>
<script>
import { getOrderTypes, getPlatforms, getBaseStores, getDeliveryTypes, getCarriers, getInvoiceTypes, getSkuSpecs, getPaymentTypes } from '@/api/order'
import { getPosList, getCustomers } from '@/api/order'
import AddressSelect from '@/components/Address/addressSelect'
import { isEmpty, isDecimal } from '@/utils/validate'

export default {
  name: 'OrderCreate',
  components: { AddressSelect },
  filters: {
    numFilter(value) {
      // 截取当前数据到小数点后两位
      const realVal = parseFloat(value).toFixed(2)
      // num.toFixed(2)获取的是字符串
      return realVal
    }

  },
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
    const deliveryCost = (rule, value, callback) => {
      if (isEmpty(value) || !isDecimal(value, 2, 2)) {
        callback(new Error('运费为两位小数'))
      } else {
        callback()
      }
    }
    const paymentAmount = (rule, value, callback) => {
      if (isEmpty(value) || !isDecimal(value, 2, 2)) {
        callback(new Error('支付金额为两位小数'))
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
        totalPrice: 0.00,
        deliveryCost: '',
        paymentTotal: 0.00,
        payments: [],
        entries: []
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
        deliveryCost: [{ required: true, validator: deliveryCost, trigger: 'change' }]
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
        name: ''
      },
      pos: {
        name: ''
      },
      invoiceType: {
        options: []
      },
      sku: {
        name: '',
        table: {
          loading: false,
          data: [],
          select: []
        },
        visible: false,
        rules: {},
        form: {}
      },
      skuSpec: {
        options: []
      },
      entry: {

      },
      // customer dialog start
      customerQuery: {
        code: '',
        name: '',
        pageNum: 1,
        pageSize: 10
      },
      customerPagination: {
        page: 0,
        total: 0,
        background: false,
        pageSizes: [10, 20, 50]
      },
      customerSearch: {
        loading: false
      },
      customerTable: {
        loading: false,
        data: null
      },
      customerDialog: {
        visible: false
      },
      // customer dialog end
      totalDiff: 0.00,
      payment: {
        table: {
          loading: false,
          data: [],
          select: []
        },
        visible: false,
        rules: {
          type: [{ required: true, message: '支付方式不能为空', trigger: 'change' }],
          amount: [{ required: true, validator: paymentAmount, trigger: 'change' }]
        },
        form: {}
      },
      paymentType: {
        options: []
      },
      // pos dialog start
      posQuery: {
        code: '',
        name: '',
        pageNum: 1,
        pageSize: 10
      },
      posPagination: {
        page: 0,
        total: 0,
        background: false,
        pageSizes: [10, 20, 50]
      },
      posSearch: {
        loading: false
      },
      posTable: {
        loading: false,
        data: null
      },
      posDialog: {
        visible: false
      },
      // pos dialog end
      // sku dialog start
      skuQuery: {
        code: '',
        name: '',
        pageNum: 1,
        pageSize: 10
      },
      skuPagination: {
        page: 0,
        total: 0,
        background: false,
        pageSizes: [10, 20, 50]
      },
      skuSearch: {
        loading: false
      },
      skuTable: {
        loading: false,
        data: null
      },
      skuDialog: {
        visible: false
      }
      // sku dialog end
    }
  },
  computed: {
    totalPrice() {
      return this.form.totalPrice
    },
    paymentTotal() {
      return this.form.paymentTotal
    },
    paymentTableData() {
      return this.payment.table.data
    }
  },
  watch: {
    totalPrice(val) {
      this.totalDiff = val - this.form.paymentTotal
    },
    paymentTotal(val) {
      this.totalDiff = this.form.totalPrice - val
    },
    paymentTableData: {
      deep: true,
      handler(val) {
        let total = 0
        val.forEach((item) => {
          total += parseFloat(item.amount)
        })
        this.form.paymentTotal = total
      }
    }
  },
  mounted() {
    this.totalDiff = this.form.totalPrice - this.form.paymentTotal
  },
  created() {
    this.getOptions()
  },
  methods: {
    getOptions() {
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
      getPaymentTypes().then((response) => {
        this.paymentType.options = response.data
      })
    },
    handleSkuChange(val) {
      this.sku.table.select = val
    },
    handlePaymentChange(val) {
      this.payment.table.select = val
    },
    valueHeaderStyle() {
      return 'padding:5px'
    },
    // customer dialog start
    handleSearchCustomer() {
      this.customerDialog.visible = true
      this.customerQuery.code = ''
      this.customerQuery.name = ''
      this.getCustomerData()
    },
    deleteSelectCustomer() {
      this.customer.name = ''
      this.form.customer = ''
    },
    selectCustomer(val) {
      this.currentRow = val
    },
    handleSelectCustomer() {
      if (this.currentRow == null) {
        this.$message({
          message: '请选择客户',
          type: 'error',
          duration: 2 * 1000
        })
        return
      }
      this.customer.name = this.currentRow.name
      this.form.customer = this.currentRow.id
      this.customerDialog.visible = false
    },
    handleCusSizeChange(val) {
      this.customerQuery.pageSize = val
      this.getCustomerData()
    },
    handleCusCurrentChange(val) {
      this.customerQuery.pageNum = val
      this.getCustomerData()
    },
    getCustomerData() {
      this.customerTable.loading = true
      getCustomers(this.customerQuery).then(response => {
        this.customerTable.data = response.data.list
        this.customerPagination.total = Number.parseInt(response.data.total)
        this.customerTable.loading = false
        this.customerSearch.loading = false
      }).catch(() => {
        this.customerTable.loading = false
        this.customerSearch.loading = false
      })
    },
    resetCustomerQuery() {
      this.$refs['customerQuery'].resetFields()
    },
    queryCustomer() {
      this.customerSearch.loading = true
      this.customerQuery.pageNum = 1
      this.getCustomerData()
    },
    // customer dialog end
    handleSkuCreate() {
      this.sku.form = {}
      this.sku.visible = true
      this.$nextTick(() => {
        this.$refs['createEntryForm'].clearValidate()
      })
    },
    handlePaymentCreate() {
      this.payment.form = {
        type: '',
        amount: ''
      }
      this.payment.visible = true
      this.$nextTick(() => {
        this.$refs['createPaymentForm'].clearValidate()
      })
    },
    paymentCreate() {
      this.$refs['createPaymentForm'].validate((valid) => {
        if (valid) {
          // 添加到表格里面
          this.payment.table.data.push(this.payment.form)
          this.payment.visible = false
        }
      })
    },
    handlePaymentDeletes() {
      if (this.payment.table.select.length <= 0) {
        this.$message({
          message: '请选择要删除的支付信息',
          type: 'error',
          duration: 2 * 1000
        })
        return
      }
      for (const v of this.payment.table.select) {
        const index = this.payment.table.data.indexOf(v)
        this.payment.table.data.splice(index, 1)
      }
    },
    // pos dialog start
    handleSearchPos() {
      this.posDialog.visible = true
      this.posQuery.code = ''
      this.posQuery.name = ''
      this.getPosData()
    },
    deleteSelectPos() {
      this.pos.name = ''
      this.form.pos = ''
    },
    selectPos(val) {
      this.currentRow = val
    },
    handleSelectPos() {
      if (this.currentRow == null) {
        this.$message({
          message: '请选择门店',
          type: 'error',
          duration: 2 * 1000
        })
        return
      }
      this.pos.name = this.currentRow.name
      this.form.pos = this.currentRow.id
      this.posDialog.visible = false
    },
    handlePosSizeChange(val) {
      this.posQuery.pageSize = val
      this.getCustomerData()
    },
    handlePosCurrentChange(val) {
      this.posQuery.pageNum = val
      this.getCustomerData()
    },
    getPosData() {
      this.posTable.loading = true
      getPosList(this.posQuery).then(response => {
        this.posTable.data = response.data.list
        this.posPagination.total = Number.parseInt(response.data.total)
        this.posTable.loading = false
        this.posSearch.loading = false
      }).catch(() => {
        this.posTable.loading = false
        this.posSearch.loading = false
      })
    },
    resetPosQuery() {
      this.$refs['posQuery'].resetFields()
    },
    queryPos() {
      this.posSearch.loading = true
      this.posSearch.pageNum = 1
      this.getPosData()
    },
    // pos dialog end
    // sku dialog start
    handleSearchSku() {
      this.skuDialog.visible = true
      this.skuQuery.code = ''
      this.skuQuery.name = ''
      this.getSkuData()
    },
    deleteSelectSku() {
      this.sku.name = ''
      // TODO
    },
    selectSku(val) {
      this.currentRow = val
    },
    handleSelectSku() {
      if (this.currentRow == null) {
        this.$message({
          message: '请选择SKU',
          type: 'error',
          duration: 2 * 1000
        })
        return
      }
      this.sku.name = this.currentRow.name
      // TODO
      // this.form.pos = this.currentRow.id
      this.skuDialog.visible = false
    },
    handleSkuSizeChange(val) {
      this.skuQuery.pageSize = val
      this.getSkuData()
    },
    handleSkuCurrentChange(val) {
      this.skuQuery.pageNum = val
      this.getSkuData()
    },
    getSkuData() {
      this.skuTable.loading = true
      getPosList(this.skuQuery).then(response => {
        this.skuTable.data = response.data.list
        this.skuPagination.total = Number.parseInt(response.data.total)
        this.skuTable.loading = false
        this.skuSearch.loading = false
      }).catch(() => {
        this.skuTable.loading = false
        this.skuSearch.loading = false
      })
    },
    resetSkuQuery() {
      this.$refs['skuQuery'].resetFields()
    },
    querySku() {
      this.skuSearch.loading = true
      this.skuSearch.pageNum = 1
      this.getSkuData()
    }
    // pos dialog end
  }
}
</script>
<style>
  .el-card__header{
    padding: 10px 10px;
  }
</style>
