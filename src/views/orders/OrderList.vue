<template>
  <div class="app-container">
    <div class="filter-container">

      <el-form ref="orderQuery" :model="orderQuery" :inline="true">
        <el-row>
          <el-col>
            <el-form-item :label="$t('order.ecsOrderId.label')+':'" prop="ecsOrderId">
              <el-input v-model="orderQuery.ecsOrderId" auto-complete="on"/>
            </el-form-item>
            <el-form-item :label=" $t('order.code.label')+':' " prop="code">
              <el-input v-model="orderQuery.code" auto-complete="on"/>
            </el-form-item>
            <el-form-item :label="$t('order.consignmentCode.label')+':'" prop="consignmentCode">
              <el-input v-model="orderQuery.consignmentCode" auto-complete="on"/>
            </el-form-item>
            <el-form-item :label="$t('order.storeId.label')+':'" prop="storeId">
              <el-select v-model="orderQuery.storeId" auto-complete="on">
                <el-option
                  v-for="item in stores"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item :label="$t('order.customerId.label')+':'" prop="customerId">
              <el-input :placeholder="$t('order.customerId.placeholder')" :value="customer.name" readonly @click.native="handleSearchCustomer" >
                <i slot="suffix" class="el-icon-close" @click="deleteSelectCustomer" @click.stop/>
              </el-input>
            </el-form-item>
            <el-form-item :label="$t('order.receiver.label')+':'" prop="receiver">
              <el-input v-model="orderQuery.receiver" auto-complete="on"/>
            </el-form-item>
            <el-form-item :label="$t('order.receiverPhone.label')+':'" prop="receiverPhone">
              <el-input v-model="orderQuery.receiverPhone" auto-complete="on"/>
            </el-form-item>
            <el-form-item :label="$t('order.wareId.label')+':'" prop="wareId">
              <el-input v-model="orderQuery.wareId" auto-complete="on"/>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item :label="$t('order.totalPrice.label')+':'" prop="totalPrice">
              <el-form-item prop="min">
                <el-input v-model="orderQuery.totalPriceMin" />
              </el-form-item>
              ~
              <el-form-item prop="max">
                <el-input v-model="orderQuery.totalPriceMax" />
              </el-form-item>
            </el-form-item>
            <el-form-item :label="$t('order.date.label')+':'" prop="date">
              <el-date-picker
                v-model="orderQuery.startDate"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择开始日期"/>
              ~
              <el-date-picker
                v-model="orderQuery.endDate"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择结束日期"/>
            </el-form-item>
            <el-form-item :label="$t('order.paymentDate.label')+':'" prop="paymentDate">
              <el-date-picker
                v-model="orderQuery.paymentStartDate"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择开始日期"/>
              ~
              <el-date-picker
                v-model="orderQuery.paymentEndDate"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择结束日期"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item :label=" $t('order.statusId.label')+':' " prop="statusId">
              <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" border @change="handleCheckAllChange">全选</el-checkbox>
              <el-checkbox-group v-model="temp.statusId" @change="handleCheckedStatusChange">
                <el-checkbox v-for="item in statuses" :label="item.name" :key="item.id" :value="item.id" border/>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item :label="$t('order.orderTypeId.label')+':'" prop="orderTypeId">
              <el-checkbox-group v-model="orderQuery.orderTypeId">
                <el-checkbox v-for="item in orderTypes" :label="item.name" :key="item.id" border>{{ $t(item.name) }}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item>
            <el-col>
              <el-button :loading="search.loading" type="primary" icon="el-icon-search" size="small" @click="query">查询
              </el-button>
              <el-button size="small" @click="resetQuery">重置</el-button>
            </el-col>
          </el-form-item>
        </el-row>

      </el-form>
    </div>
    <hr>
    <div class="filter-container">
      <el-button type="primary" class="blue-btn" size="small">创建订单</el-button>
      <el-button type="primary" class="green-btn" size="small">导出列表</el-button>
    </div>
    <el-table
      v-loading="table.loading"
      :data="table.data"
      border
      fit
      stripe
      highlight-current-row>
      <el-table-column type="selection" width="50px"/>
      <el-table-column :label="$t('order.list.ecsOrderId.label')" prop="ecsOrderId" />
      <el-table-column :label="$t('order.list.storeName.label')" prop="storeName" />
      <el-table-column :label="$t('order.list.code.label')" prop="code" >
        <template slot-scope="scope">
          <router-link :to="{name:'OrderDetail',params: {code: scope.row.code }}" class="link-type"> {{ scope.row.code }}</router-link>
        </template>
      </el-table-column>
      <el-table-column :label="$t('order.list.wareId.label')" prop="wareId" />
      <el-table-column :label="$t('order.list.orderTypeName.label')" prop="orderTypeName" />
      <el-table-column :label="$t('order.list.statusName.label')" prop="statusName" />
      <el-table-column :label="$t('order.list.totalPrice.label')" prop="totalPrice"/>
      <el-table-column :label="$t('order.list.receiverPhone.label')" prop="receiverPhone" />
      <el-table-column :label="$t('order.list.addressName.label')" prop="addressName" />
      <el-table-column :label="$t('order.list.date.label')" prop="date">
        <template slot-scope="scope">
          <i class="el-icon-date"/>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('order.list.paymentDate.label')" prop="paymentDate">
        <template slot-scope="scope">
          <i class="el-icon-date"/>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      :current-page="pagination.page"
      :page-sizes="pagination.pageSizes"
      :total="pagination.total"
      :background="pagination.background"
      align="right"
      layout="total, sizes, prev, pager, next, jumper"
      style="width: 100%"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"/>

    <el-dialog :visible.sync="customerDialog.visible" :title="$t('customer.search.title')">
      <div class="filter-container">
        <el-form ref="customerQuery" :model="customerQuery" :inline="true">
          <el-row>
            <el-col>
              <el-form-item :label=" $t('customer.queryCode.label')+':' " prop="">
                <el-input v-model="customerQuery.code" auto-complete="on"/>
              </el-form-item>
              <el-form-item :label=" $t('customer.queryName.label')+':' " prop="">
                <el-input v-model="customerQuery.name" auto-complete="on"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item>
              <el-col>
                <el-button :loading="customerSearch.loading" type="primary" icon="el-icon-search" size="small" @click="queryCustomer">查询
                </el-button>
                <el-button size="small" @click="resetCustomerQuery">重置</el-button>
              </el-col>
            </el-form-item>
          </el-row>
        </el-form>
      </div>
      <el-table
        v-loading="customerTable.loading"
        :data="customerTable.data"
        border
        fit
        stripe
        highlight-current-row
        @current-change="selectCustomer">
        <el-table-column :label="$t('general.index')" type="index" />
        <el-table-column :label="$t('customer.code.label')" prop="code" />
        <el-table-column :label="$t('customer.name.label')" prop="name" />
      </el-table>

      <el-pagination
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
        <el-button @click="customerDialog.visible = false">
          {{ $t('table.cancel') }}
        </el-button>
        <el-button type="primary" @click="handleSelectCustomer">
          {{ $t('table.confirm') }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getOrders, getOrderStatus, getOrderTypes, getBaseStores, getCustomers } from '@/api/order'

export default {
  name: 'OrderList',
  data() {
    return {
      orderQuery: {
        ecsOrderId: '',
        code: '',
        consignmentCode: '',
        storeId: '',
        customerId: '',
        receiver: '',
        receiverPhone: '',
        wareId: '',
        totalPriceMin: '',
        totalPriceMax: '',
        startDate: null,
        endDate: null,
        paymentStartDate: null,
        paymentEndDate: null,
        statusId: [],
        orderTypeId: [],
        pageNum: 1,
        pageSize: 10
      },
      temp: {
        statusId: []
      },
      search: {
        loading: false
      },
      customerSearch: {
        loading: false
      },
      pagination: {
        page: 0,
        total: 0,
        background: false,
        pageSizes: [10, 20, 50]
      },
      customerPagination: {
        page: 0,
        total: 0,
        background: false,
        pageSizes: [10, 20, 50]
      },
      table: {
        loading: false,
        data: null
      },
      customerTable: {
        loading: false,
        data: null
      },
      customerDialog: {
        visible: false
      },
      customerQuery: {
        code: '',
        name: '',
        pageNum: 1,
        pageSize: 10
      },
      customer: {
        name: ''
      },
      statuses: [],
      orderTypes: [],
      stores: [],
      checkAll: false,
      isIndeterminate: true,
      allStatusId: [],
      statusMap: {},
      currentRow: null
    }
  },
  created() {
    this.getData()
    this.initOrderStatus()
    this.initOrderTypes()
    this.initBaseStore()
  },
  methods: {
    resetQuery() {
      this.$refs['orderQuery'].resetFields()
    },
    resetCustomerQuery() {
      this.$refs['customerQuery'].resetFields()
    },
    handleSizeChange(val) {
      this.orderQuery.pageSize = val
      this.getData()
    },
    handleCurrentChange(val) {
      this.orderQuery.pageNum = val
      this.getData()
    },
    handleCusSizeChange(val) {
      this.customerQuery.pageSize = val
      this.getData()
    },
    handleCusCurrentChange(val) {
      this.customerQuery.pageNum = val
      this.getData()
    },
    getData() {
      this.table.loading = true
      this.temp.statusId.forEach((v, index) => {
        this.orderQuery['statusId[' + index + ']'] = this.statusMap[v]
      })
      getOrders(this.orderQuery).then(response => {
        console.log(response.data)
        const items = response.data.list
        this.table.data = items.map(v => {
          this.$set(v, 'edit', false) // https://vuejs.org/v2/guide/reactivity.html
          v.original = JSON.stringify(v) //  will be used when user click the cancel botton
          return v
        })
        this.pagination.total = Number.parseInt(response.data.total)
        this.table.loading = false
        this.search.loading = false
      }).catch(() => {
        this.table.loading = false
        this.search.loading = false
      })
    },
    getCustomerData() {
      this.customerTable.loading = true
      getCustomers(this.customerQuery).then(response => {
        const items = response.data.list
        this.customerTable.data = items.map(v => {
          this.$set(v, 'edit', false) // https://vuejs.org/v2/guide/reactivity.html
          v.original = JSON.stringify(v) //  will be used when user click the cancel botton
          return v
        })
        this.customerPagination.total = Number.parseInt(response.data.total)
        this.customerTable.loading = false
        this.customerSearch.loading = false
      }).catch(() => {
        this.customerTable.loading = false
        this.customerSearch.loading = false
      })
    },
    initOrderStatus() {
      getOrderStatus().then(response => {
        this.statuses = response.data
        this.statuses.forEach(v => {
          this.allStatusId.unshift(v.name)
          this.statusMap[v.name] = v.id
        })
      }).catch(() => {
        console.log('查询失败')
      })
    },
    initOrderTypes() {
      getOrderTypes().then(response => {
        this.orderTypes = response.data
      }).catch(() => {
        console.log('查询失败')
      })
    },
    initBaseStore() {
      getBaseStores().then(response => {
        this.stores = response.data
      }).catch(() => {
        console.log('查询失败')
      })
    },
    handleCheckAllChange() {
      console.log(this.temp.statusId)
      console.log(this.allStatusId)
      this.temp.statusId = this.isIndeterminate ? this.allStatusId : []
      if (this.temp.statusId.length === 0) {
        this.isIndeterminate = true
      } else {
        this.isIndeterminate = false
      }
    },
    handleCheckedStatusChange() {
      const checkedCount = this.temp.statusId.length
      this.checkAll = checkedCount === this.statuses.length
      this.isIndeterminate = checkedCount >= 0 && checkedCount < this.statuses.length
    },
    handleSearchCustomer() {
      this.customerDialog.visible = true
      this.customerQuery.code = ''
      this.customerQuery.name = ''
      this.getCustomerData()
    },
    deleteSelectCustomer() {
      this.customer.name = ''
      this.orderQuery.customerId = ''
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
      this.orderQuery.customerId = this.currentRow.id
      this.customerDialog.visible = false
    },
    setSearchLoading() {
      // this.search.loading = false
    },
    query() {
      this.search.loading = true
      this.getData()
    },
    queryCustomer() {
      this.customerSearch.loading = true
      this.getCustomerData()
    }
  }
}
</script>
<style>
  hr {
    display: block;
    border: 0;
    border-bottom: 1px solid #eaeaea;
    height: 1px;
  }

</style>
