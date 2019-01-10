<template>
  <div class="app-container">
    <div class="filter-container">

      <el-form ref="orderQuery" :model="orderQuery" :inline="true">
        <el-row>
          <el-col>
            <el-form-item :label=" '商品编码:' " prop="code">
              <el-input v-model="orderQuery.code" :placeholder="'请输入商品编码'" auto-complete="on"/>
            </el-form-item>
            <el-form-item :label=" '商品名称:' " prop="code">
              <el-input v-model="orderQuery.code" :placeholder="'请输入商品名称'" auto-complete="on"/>
            </el-form-item>
            <el-form-item :label=" '仓库编码:' " prop="code">
              <el-input v-model="orderQuery.code" :placeholder="'请输入仓库编码'" auto-complete="on"/>
            </el-form-item>
            <el-form-item :label=" '仓库名称:' " prop="code">
              <el-input v-model="orderQuery.code" :placeholder="'请输入仓库名称'" auto-complete="on"/>
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
      <el-button type="primary" class="blue-btn" size="small">新建</el-button>
      <el-button type="info" size="small">删除</el-button>
      <el-button type="primary" class="green-btn" size="small">保存</el-button>
      <el-button type="primary" class="green-btn" size="small">导出</el-button>
    </div>
    <el-table
      v-loading="table.loading"
      :data="table.data"
      border
      fit
      stripe
      highlight-current-row>
      <el-table-column type="selection" width="50px"/>
      <el-table-column label="序号" prop="code" />
      <el-table-column label="商品编码" prop="code" >
        <template slot-scope="scope">
          <router-link :to="{name:'OrderDetail',params: {code: scope.row.code }}" class="link-type"> {{ scope.row.code }}</router-link>
        </template>
      </el-table-column>
      <el-table-column label="商品名称" prop="type" />
      <el-table-column label="仓库" prop="code" >
        <template slot-scope="scope">
          <router-link :to="{name:'OrderDetail',params: {code: scope.row.code }}" class="link-type"> {{ scope.row.code }}</router-link>
        </template>
      </el-table-column>
      <el-table-column label="可用量" prop="totalPrice"/>
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
