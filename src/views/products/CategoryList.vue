<template>
  <div class="app-container">
    <div class="filter-container">

      <el-form ref="orderQuery" :model="orderQuery" :inline="true">
        <el-row>
          <el-col>
            <el-form-item label="渠道:" prop="platform">
              <el-checkbox-group v-model="orderQuery.platform" >
                <el-checkbox-button v-for="plat in platforms" :label="plat" :key="plat" checked>{{ $t('order.platform.'+plat) }}</el-checkbox-button>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item :label=" $t('order.code.name')+':' " prop="code">
              <el-input v-model="orderQuery.code" :placeholder="$t('order.code.placeholder')" auto-complete="on"/>
            </el-form-item>
            <el-form-item :label=" $t('order.status.name')+':' " prop="status">
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
      <el-button type="primary" class="blue-btn" size="small">创建订单</el-button>
      <el-button type="primary" class="green-btn" size="small">审核</el-button>
      <el-button type="primary" class="tiffany-btn" size="small">打印</el-button>
      <el-button type="info" size="small">取消</el-button>
    </div>
    <el-table
      v-loading="table.loading"
      :data="table.data"
      border
      fit
      stripe
      highlight-current-row>
      <el-table-column type="selection" width="50px"/>
      <el-table-column :label="$t('order.code.name')" prop="code" >
        <template slot-scope="scope">
          <router-link :to="{name:'OrderDetail',params: {code: scope.row.code }}" class="link-type"> {{ scope.row.code }}</router-link>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" prop="date">
        <template slot-scope="scope">
          <i class="el-icon-date"/>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单类型" prop="type" />
      <el-table-column label="订单金额" prop="totalPrice"/>
      <el-table-column label="订单状态" prop="status">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="订单来源" prop="platform">
        <template slot-scope="scope">
          <span>{{ $t('order.platform.'+scope.row.platform ) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户" prop="user"/>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" class="green-btn" size="mini">审核</el-button>
          <el-button type="info" size="mini">取消</el-button>
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
