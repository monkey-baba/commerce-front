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
              <el-input v-model="orderQuery.customerId" auto-complete="on"/>
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
              <el-checkbox-group v-model="orderQuery.statusId" @change="handleCheckedStatusChange">
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
      <el-table-column label="平台订单号" prop="ecsOrderId" />
      <el-table-column label="店铺" prop="storeName" />
      <el-table-column :label="$t('order.code.label')" prop="code" >
        <template slot-scope="scope">
          <router-link :to="{name:'OrderDetail',params: {code: scope.row.code }}" class="link-type"> {{ scope.row.code }}</router-link>
        </template>
      </el-table-column>
      <el-table-column label="下单门店" prop="wareId" />
      <el-table-column label="订单类型" prop="orderTypeName" />
      <el-table-column label="订单状态" prop="statusName" />
      <el-table-column label="订单金额" prop="totalPrice"/>
      <el-table-column label="手机号" prop="receiverPhone" />
      <el-table-column label="收件地址" prop="addressName" />
      <el-table-column label="下单时间" prop="date">
        <template slot-scope="scope">
          <i class="el-icon-date"/>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column label="支付时间" prop="paymentDate">
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
  </div>
</template>

<script>
import { getOrders, getOrderStatus, getOrderTypes, getBaseStores } from '@/api/order'

export default {
  name: 'OrderList',
  // filters: {
  //   statusFilter(status) {
  //     const statusMap = {
  //       'COMPLETED': 'success',
  //       'SHIPPED': 'success',
  //       'APPROVED': 'primary',
  //       'CREATED': 'warning',
  //       'PENDING': 'primary'
  //     }
  //     return statusMap[status]
  //   }
  // },
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
        newStatusId: [],
        orderTypeId: [],
        newOrderTypeId: [],
        pageNum: 1,
        pageSize: 10
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
        data: null
      },
      statuses: [],
      orderTypes: [],
      stores: [],
      checkAll: false,
      isIndeterminate: true,
      allStatusId: [],
      statusMap: {}
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
    handleSizeChange(val) {
      this.orderQuery.pageSize = val
      this.getData()
    },
    handleCurrentChange(val) {
      this.orderQuery.pageNum = val
      this.getData()
    },
    getData() {
      this.table.loading = true
      this.orderQuery.statusId.forEach(v => {
        this.orderQuery.newStatusId.unshift(this.statusMap[v])
      })
      console.log(this.orderQuery.newStatusId)
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
      console.log(this.orderQuery.statusId)
      console.log(this.allStatusId)
      this.orderQuery.statusId = this.isIndeterminate ? this.allStatusId : []
      if (this.orderQuery.statusId.length === 0) {
        this.isIndeterminate = true
      } else {
        this.isIndeterminate = false
      }
    },
    handleCheckedStatusChange() {
      const checkedCount = this.orderQuery.statusId.length
      this.checkAll = checkedCount === this.statuses.length
      this.isIndeterminate = checkedCount >= 0 && checkedCount < this.statuses.length
    },
    setSearchLoading() {
      // this.search.loading = false
    },
    query() {
      this.search.loading = true
      this.getData()
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
