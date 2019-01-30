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
            <el-form-item :label="$t('order.posId.label')+':'" prop="posId">
              <el-input :placeholder="$t('order.posId.placeholder')" :value="pos.name" readonly @click.native="handleSearchPos" >
                <i slot="suffix" class="el-icon-close" @click="deleteSelectPos" @click.stop/>
              </el-input>
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
              <el-checkbox :indeterminate="status.isIndeterminate" v-model="checkAllStatus" border @change="handleCheckAllStatusChange">全选</el-checkbox>
              <el-checkbox-group v-model="temp.statusId" @change="handleCheckedStatusChange">
                <el-checkbox v-for="item in statuses" :label="item.name" :key="item.id" :value="item.id" border/>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item :label="$t('order.orderTypeId.label')+':'" prop="orderTypeId">
              <el-checkbox :indeterminate="orderType.isIndeterminate" v-model="checkAllType" border @change="handleCheckAllTypeChange">全选</el-checkbox>
              <el-checkbox-group v-model="temp.orderTypeId" @change="handleCheckedOrderTypeChange">
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
      <el-button type="primary" class="blue-btn" size="small" @click="toOrderCreate" >创建订单</el-button>
      <el-button :loading="downloadLoading" type="primary" class="green-btn" size="small" @click="handleExport">导出列表</el-button>
    </div>
    <el-table
      v-loading="table.loading"
      :data="table.data"
      border
      fit
      stripe
      highlight-current-row
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="50px"/>
      <el-table-column :label="$t('order.list.ecsOrderId.label')" prop="ecsOrderId" />
      <el-table-column :label="$t('order.list.storeName.label')" prop="storeName" />
      <el-table-column :label="$t('order.list.code.label')" prop="code" >
        <template slot-scope="scope">
          <router-link :to="{name:'OrderDetail',params: {id: scope.row.id }}" class="link-type"> {{ scope.row.code }}</router-link>
        </template>
      </el-table-column>
      <el-table-column :label="$t('order.list.posId.label')" prop="posName" />
      <el-table-column :label="$t('order.list.orderTypeName.label')" prop="orderTypeName" />
      <el-table-column :label="$t('order.list.statusName.label')" prop="statusName" />
      <el-table-column :label="$t('order.list.totalPrice.label')" prop="totalPrice"/>
      <el-table-column :label="$t('order.list.receiver.label')" prop="receiver" />
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
                <el-button :loading="posSearch.loading" type="primary" icon="el-icon-search" size="small" @click="queryCustomer">查询
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

    <el-dialog :visible.sync="posDialog.visible" :title="$t('pos.search.title')">
      <div class="filter-container">
        <el-form ref="posQuery" :model="posQuery" :inline="true">
          <el-row>
            <el-col>
              <el-form-item :label=" $t('pos.code.label')+':' " prop="code">
                <el-input v-model="posQuery.code" auto-complete="on"/>
              </el-form-item>
              <el-form-item :label=" $t('pos.name.label')+':' " prop="name">
                <el-input v-model="posQuery.name" auto-complete="on"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item>
              <el-col>
                <el-button :loading="posSearch.loading" type="primary" icon="el-icon-search" size="small" @click="queryPos">查询
                </el-button>
                <el-button size="small" @click="resetPosQuery">重置</el-button>
              </el-col>
            </el-form-item>
          </el-row>
        </el-form>
      </div>
      <el-table
        v-loading="posTable.loading"
        :data="posTable.data"
        border
        fit
        stripe
        highlight-current-row
        @current-change="selectPos">
        <el-table-column :label="$t('general.index')" type="index" />
        <el-table-column :label="$t('pos.code.label')" prop="code" />
        <el-table-column :label="$t('pos.name.label')" prop="name" />
      </el-table>

      <el-pagination
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
        <el-button @click="posDialog.visible = false">
          {{ $t('table.cancel') }}
        </el-button>
        <el-button type="primary" @click="handleSelectPos">
          {{ $t('table.confirm') }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getOrders, getOrderStatus, getOrderTypes, getBaseStores, getCustomers, getPosList } from '@/api/order'

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
        posId: '',
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
        statusId: [],
        orderTypeId: []
      },
      search: {
        loading: false
      },
      customerSearch: {
        loading: false
      },
      posSearch: {
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
      posPagination: {
        page: 0,
        total: 0,
        background: false,
        pageSizes: [10, 20, 50]
      },
      table: {
        loading: false,
        data: null,
        select: []
      },
      customerTable: {
        loading: false,
        data: null
      },
      posTable: {
        loading: false,
        data: null
      },
      customerDialog: {
        visible: false
      },
      posDialog: {
        visible: false
      },
      customerQuery: {
        code: '',
        name: '',
        pageNum: 1,
        pageSize: 10
      },
      posQuery: {
        code: '',
        name: '',
        pageNum: 1,
        pageSize: 10
      },
      customer: {
        name: ''
      },
      pos: {
        name: ''
      },
      statuses: [],
      orderTypes: [],
      stores: [],
      checkAllStatus: false,
      checkAllType: false,
      status: {
        isIndeterminate: false
      },
      orderType: {
        isIndeterminate: false
      },
      allStatusId: [],
      allOrderTypeId: [],
      statusMap: {},
      orderTypeMap: {},
      currentRow: null,
      downloadLoading: false
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
    resetPosQuery() {
      this.$refs['posQuery'].resetFields()
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
    handlePosSizeChange(val) {
      this.posQuery.pageSize = val
      this.getData()
    },
    handlePosCurrentChange(val) {
      this.posQuery.pageNum = val
      this.getData()
    },
    getData() {
      this.table.loading = true
      this.statuses.forEach((v, index) => {
        this.orderQuery['statusId[' + index + ']'] = null
      })
      this.temp.statusId.forEach((v, index) => {
        this.orderQuery['statusId[' + index + ']'] = this.statusMap[v]
      })
      this.orderTypes.forEach((v, index) => {
        this.orderQuery['orderTypeId[' + index + ']'] = null
      })
      this.temp.orderTypeId.forEach((v, index) => {
        this.orderQuery['orderTypeId[' + index + ']'] = this.orderTypeMap[v]
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
        this.customerTable.data = response.data.list
        this.customerPagination.total = Number.parseInt(response.data.total)
        this.customerTable.loading = false
        this.customerSearch.loading = false
      }).catch(() => {
        this.customerTable.loading = false
        this.customerSearch.loading = false
      })
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
        this.orderTypes.forEach(v => {
          this.allOrderTypeId.unshift(v.name)
          this.orderTypeMap[v.name] = v.id
        })
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
    handleCheckAllStatusChange(val) {
      this.temp.statusId = val ? this.allStatusId : []
      this.status.isIndeterminate = false
    },
    handleCheckAllTypeChange(val) {
      this.temp.orderTypeId = val ? this.allOrderTypeId : []
      this.orderType.isIndeterminate = false
    },
    handleCheckedStatusChange(value) {
      const checkedCount = value.length
      this.checkAllStatus = checkedCount === this.statuses.length
      this.status.isIndeterminate = checkedCount > 0 && checkedCount < this.statuses.length
    },
    handleCheckedOrderTypeChange(value) {
      const checkedCount = value.length
      this.checkAllType = checkedCount === this.orderTypes.length
      this.orderType.isIndeterminate = checkedCount > 0 && checkedCount < this.orderTypes.length
    },
    handleSearchCustomer() {
      this.customerDialog.visible = true
      this.customerQuery.code = ''
      this.customerQuery.name = ''
      this.customerQuery.pageNum = 1
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
    handleSearchPos() {
      this.posDialog.visible = true
      this.posQuery.code = ''
      this.posQuery.name = ''
      this.posQuery.pageNum = 1
      this.getPosData()
    },
    deleteSelectPos() {
      this.pos.name = ''
      this.posQuery.posId = ''
    },
    selectPos(val) {
      this.currentRow = val
    },
    handleSelectPos() {
      if (this.currentRow == null) {
        this.$message({
          message: '请选择客户',
          type: 'error',
          duration: 2 * 1000
        })
        return
      }
      this.pos.name = this.currentRow.name
      this.orderQuery.posId = this.currentRow.id
      this.posDialog.visible = false
    },
    setSearchLoading() {
      // this.search.loading = false
    },
    query() {
      this.search.loading = true
      this.orderQuery.pageNum = 1
      this.getData()
    },
    queryCustomer() {
      this.customerSearch.loading = true
      this.customerQuery.pageNum = 1
      this.getCustomerData()
    },
    queryPos() {
      this.posSearch.loading = true
      this.posQuery.pageNum = 1
      this.getPosData()
    },
    handleSelectionChange(val) {
      this.table.select = val
    },
    handleExport() {
      if (this.table.select.length <= 0) {
        this.$message({
          message: '请选择订单',
          type: 'error',
          duration: 2 * 1000
        })
        return
      }
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['平台订单号', '店铺', '订单号', '下单门店', '订单类型', '订单金额', '收件人', '手机号', '收件地址', '下单时间', '支付时间']
        const filterVal = ['ecsOrderId', 'storeName', 'code', 'posName', 'orderTypeName', 'statusName', 'totalPrice', 'receiverPhone', 'receiverPhone', 'date', 'paymentDate']

        const data = this.table.select.map(u => filterVal.map(field => {
          return u[field]
        }))
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '订单列表'
        })
        this.downloadLoading = false
      })
    },
    toOrderCreate() {
      this.$router.push({ path: '/order/create' })
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
