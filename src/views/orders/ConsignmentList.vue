<template>
  <div class="app-container">
    <div class="filter-container">

      <el-form ref="orderQuery" :model="orderQuery" :inline="true">
        <el-row>
          <el-col>
            <el-form-item label="配货单号:" prop="code">
              <el-select v-model="orderQuery.platformNumber" auto-complete="on">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"/>
              </el-select>
            </el-form-item>
            <el-form-item label="平台订单号" prop="code">
              <el-input v-model="orderQuery.platformNumber" auto-complete="on"/>
            </el-form-item>
            <el-form-item label="订单编号:" prop="">
              <el-input v-model="orderQuery.orderCode" auto-complete="on"/>
            </el-form-item>
            <el-form-item label="店铺:" prop="">
              <el-select v-model="orderQuery.store" auto-complete="on">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="会员编号:" prop="">
              <el-input v-model="orderQuery.customerId" auto-complete="on"/>
            </el-form-item>
            <el-form-item label="收货人:" prop="">
              <el-input v-model="orderQuery.delivery" auto-complete="on"/>
            </el-form-item>
            <el-form-item label="收货手机号:" prop="">
              <el-input v-model="orderQuery.deliveryPhone" auto-complete="on"/>
            </el-form-item>
            <el-form-item label="门店:" prop="">
              <el-input v-model="orderQuery.store" auto-complete="on"/>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="订单金额:" prop="">
              <el-form-item prop="min">
                <el-input v-model="orderQuery.min" />
              </el-form-item>
              ~
              <el-form-item prop="max">
                <el-input v-model="orderQuery.max" />
              </el-form-item>
            </el-form-item>
            <el-form-item label="承运商:" prop="">
              <el-select v-model="orderQuery.carrier" auto-complete="on">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"/>
              </el-select>
            </el-form-item>
            <el-form-item label="运单号:" prop="">
              <el-input v-model="orderQuery.wayBillNum" auto-complete="on"/>
            </el-form-item>
            <el-form-item label="配送方式:" prop="">
              <el-input v-model="orderQuery.deliveryMethod" auto-complete="on"/>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="发货日期:" prop="">
              <el-date-picker
                v-model="orderQuery.deliveryStartDate"
                type="date"
                placeholder="选择开始日期"/>
              ~
              <el-date-picker
                v-model="orderQuery.deliveryEndDate"
                type="date"
                placeholder="选择结束日期"/>
            </el-form-item>
            <el-form-item label="下单日期:" prop="">
              <el-date-picker
                v-model="orderQuery.startDate"
                type="date"
                placeholder="选择开始日期"/>
              ~
              <el-date-picker
                v-model="orderQuery.endDate"
                type="date"
                placeholder="选择结束日期"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="配货单状态" prop="status">
              <el-checkbox-group v-model="orderQuery.status">
                <el-checkbox v-for="sta in statuses" :label="sta" :key="sta" border checked>{{ $t(sta) }}</el-checkbox>
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
      <el-table-column label="平台订单号" prop="" />
      <el-table-column label="配货单号" prop="code" />
      <el-table-column label="配货单状态" prop="status">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="店铺" prop="" />
      <el-table-column label="下单门店" prop="" />
      <el-table-column label="运单编号" prop="" />
      <el-table-column label="收件人" prop="" />
      <el-table-column label="手机号" prop="" />
      <el-table-column label="收件地址" prop="" />
      <el-table-column label="下单时间" prop="date">
        <template slot-scope="scope">
          <i class="el-icon-date"/>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column label="发货时间" prop="date">
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
import { getOrders } from '@/api/order'

export default {
  name: 'OrderList',
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
      orderQuery: {
        code: '',
        status: [],
        page: 1,
        limit: 10,
        platform: []
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
      statuses: ['CREATED', 'PENDING', 'APPROVED', 'SHIPPED', 'COMPLETED'],
      platforms: ['TM', 'JD', 'DMS', 'LGT']
    }
  },
  created() {
    this.getData()
  },
  methods: {
    resetQuery() {
      this.$refs['orderQuery'].resetFields()
    },
    handleSizeChange(val) {
      this.orderQuery.limit = val
      this.getData()
    },
    handleCurrentChange(val) {
      this.orderQuery.page = val
      this.getData()
    },
    getData() {
      this.table.loading = true
      getOrders(this.orderQuery).then(response => {
        this.table.data = response.data.items
        this.pagination.total = response.data.total
        this.table.loading = false
        this.search.loading = false
      }).catch(() => {
        this.table.loading = false
      })
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
