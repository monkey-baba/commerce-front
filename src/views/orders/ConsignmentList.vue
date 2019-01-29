<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form ref="consignmentQuery" :model="consignmentQuery" :inline="true">
        <el-row>
          <el-col :span="6">
            <el-form-item label="配货单号:" prop="code">
              <el-input v-model="consignmentQuery.code" auto-complete="on"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="平台订单号" prop="ecsOrderId">
              <el-input v-model="consignmentQuery.ecsOrderId" auto-complete="on"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="订单编号:" prop="orderCode">
              <el-input v-model="consignmentQuery.orderCode" auto-complete="on"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="店铺:" prop="storeId">
              <el-select v-model="consignmentQuery.storeId" auto-complete="on">
                <el-option
                  v-for="item in stores"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="会员编号:" prop="customerId">
              <el-input :placeholder="'请选择客户'" :value="customer.name" readonly @click.native="handleSearchCustomer" >
                <i slot="suffix" class="el-icon-close" @click="deleteSelectCustomer" @click.stop/>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="收货人:" prop="receiver">
              <el-input v-model="consignmentQuery.receiver" auto-complete="on"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="收货手机号:" prop="receiverPhone">
              <el-input v-model="consignmentQuery.receiverPhone" auto-complete="on"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="门店:" prop="posId">
              <el-input :placeholder="'请选择门店'" :value="pos.name" readonly @click.native="handleSearchPos" >
                <i slot="suffix" class="el-icon-close" @click="deleteSelectPos" @click.stop/>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="订单金额:">
              <el-input v-model="consignmentQuery.totalPriceMin" class="total-price"/>
              ~
              <el-input v-model="consignmentQuery.totalPriceMax" class="total-price"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="承运商:" prop="carrierId">
              <el-select v-model="consignmentQuery.carrierId" auto-complete="on">
                <el-option
                  v-for="item in carriers"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="运单号:" prop="expressNum">
              <el-input v-model="consignmentQuery.expressNum" auto-complete="on"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="配送方式:" prop="deliveryTypeId">
              <el-select v-model="consignmentQuery.deliveryTypeId" auto-complete="on">
                <el-option
                  v-for="item in deliveryTypes"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="发货日期:">
              <el-date-picker
                v-model="consignmentQuery.deliveryStartDate"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择开始日期"/>
              ~
              <el-date-picker
                v-model="consignmentQuery.deliveryEndDate"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择结束日期"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="下单日期:">
              <el-date-picker
                v-model="consignmentQuery.startDate"
                type="date"
                placeholder="选择开始日期"/>
              ~
              <el-date-picker
                v-model="consignmentQuery.endDate"
                type="date"
                placeholder="选择结束日期"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="配货单状态" prop="consignmentStatusId">
              <el-checkbox :indeterminate="consignmentStatus.isIndeterminate" v-model="checkAllConsignmentStatus" border @change="handleCheckAllConsignmentStatusChange">全选</el-checkbox>
              <el-checkbox-group v-model="temp.consignmentStatusId" @change="handleCheckedConsignmentStatusChange">
                <el-checkbox v-for="item in consignmentStatuses" :label="item.name" :key="item.id" :value="item.id" border/>
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
      <el-button type="primary" class="green-btn" size="small" @click="handleExport">导出列表</el-button>
    </div>
    <el-table
      v-loading="table.loading"
      :data="table.data"
      border
      fit
      stripe
      highlight-current-row
      @selection-change="handleSelectionChange">
      <el-table-column type="selection"/>
      <el-table-column label="平台订单号" prop="ecsOrderId"/>
      <el-table-column label="配货单号" prop="code"/>
      <el-table-column label="配货单状态" prop="consignmentStatusName"/>
      <el-table-column label="店铺" prop="storeName"/>
      <el-table-column label="下单门店" prop="posName"/>
      <el-table-column label="运单编号" prop="expressNum"/>
      <el-table-column label="收件人" prop="receiver"/>
      <el-table-column label="手机号" prop="receiverPhone"/>
      <el-table-column label="收件地址" prop="receiverAddress"/>
      <el-table-column label="下单时间" prop="date"/>
      <el-table-column label="发货时间" prop="deliveryDate"/>
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
import { getConsignments, getConsignmentStatus } from '@/api/consignment'
import { getBaseStores, getPosList, getCustomers, getDeliveryTypes, getCarriers } from '@/api/order'

export default {
  name: 'ConsignmentList',
  data() {
    return {
      consignmentQuery: {
        code: '',
        ecsOrderId: '',
        orderCode: '',
        storeId: '',
        customerId: '',
        receiver: '',
        receiverPhone: '',
        posId: '',
        totalPriceMin: '',
        totalPriceMax: '',
        carrierId: '',
        expressNum: '',
        deliveryTypeId: '',
        deliveryStartDate: null,
        deliveryEndDate: null,
        startDate: null,
        endDate: null,
        consignmentStatusId: [],
        pageNum: 1,
        pageSize: 10
      },
      temp: {
        consignmentStatusId: []
      },
      search: {
        loading: false
      },
      pagination: {
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
      stores: [],
      carriers: [],
      deliveryTypes: [],
      consignmentStatuses: [],
      checkAllConsignmentStatus: false,
      consignmentStatus: {
        isIndeterminate: true
      },
      allConsignmentStatusId: [],
      consignmentStatusMap: {},
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
      customerSearch: {
        loading: false
      },
      posSearch: {
        loading: false
      }
    }
  },
  created() {
    this.getData()
    this.initConsignmentStatus()
    this.initBaseStore()
    this.initCarriers()
    this.initDeliveryTypes()
  },
  methods: {
    resetQuery() {
      this.$refs['consignmentQuery'].resetFields()
    },
    handleSizeChange(val) {
      this.consignmentQuery.pageSize = val
      this.getData()
    },
    handleCurrentChange(val) {
      this.consignmentQuery.pageNum = val
      this.getData()
    },
    getData() {
      this.table.loading = true
      this.temp.consignmentStatusId.forEach((v, index) => {
        this.consignmentQuery['consignmentStatusId[' + index + ']'] = this.consignmentStatusMap[v]
      })
      getConsignments(this.consignmentQuery).then(response => {
        this.table.data = response.data.list
        this.pagination.total = Number.parseInt(response.data.total)
        this.table.loading = false
        this.search.loading = false
      }).catch(() => {
        this.table.loading = false
      })
    },
    initBaseStore() {
      getBaseStores().then(response => {
        this.stores = response.data
      }).catch(() => {
        console.log('查询失败')
      })
    },
    query() {
      this.search.loading = true
      this.consignmentQuery.pageNum = 1
      this.getData()
    },
    handleSelectionChange(val) {
      this.table.select = val
    },
    handleExport() {
      if (this.table.select.length <= 0) {
        this.$message({
          message: '请选择配货单',
          type: 'error',
          duration: 2 * 1000
        })
        return
      }
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['平台订单号', '配货单号', '配货单状态', '店铺', '下单门店', '运单编号', '收件人', '手机号', '收件地址', '下单时间', '发货时间']
        const filterVal = ['ecsOrderId', 'code', 'consignmentStatusName', 'storeName', 'posName', 'expressNum', 'receiver', 'receiverPhone', 'receiverAddress', 'date', 'deliveryDate']
        const data = this.table.select.map(u => filterVal.map(field => {
          return u[field]
        }))
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '配货单列表'
        })
        this.downloadLoading = false
      })
    },
    initConsignmentStatus() {
      getConsignmentStatus().then(response => {
        this.consignmentStatuses = response.data
        this.consignmentStatuses.forEach(v => {
          this.allConsignmentStatusId.unshift(v.name)
          this.consignmentStatusMap[v.name] = v.id
        })
      }).catch(() => {
        console.log('查询失败')
      })
    },
    handleCheckAllConsignmentStatusChange() {
      this.temp.consignmentStatusId = this.consignmentStatus.isIndeterminate ? this.allConsignmentStatusId : []
      if (this.temp.consignmentStatusId.length === 0) {
        this.consignmentStatus.isIndeterminate = true
      } else {
        this.consignmentStatus.isIndeterminate = false
      }
    },
    handleCheckedConsignmentStatusChange() {
      const checkedCount = this.temp.consignmentStatusId.length
      this.checkAllConsignmentStatus = checkedCount === this.consignmentStatuses.length
      this.consignmentStatus.isIndeterminate = checkedCount >= 0 && checkedCount < this.consignmentStatuses.length
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
    resetCustomerQuery() {
      this.$refs['customerQuery'].resetFields()
    },
    resetPosQuery() {
      this.$refs['posQuery'].resetFields()
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
    initDeliveryTypes() {
      getDeliveryTypes().then((response) => {
        this.deliveryTypes = response.data
      })
    },
    initCarriers() {
      getCarriers().then((response) => {
        this.carriers = response.data
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
    height: 1px;
  }
  body .el-table th.gutter{
    display: table-cell!important;
  }
  .total-price{
    width: 100px;
  }
</style>
