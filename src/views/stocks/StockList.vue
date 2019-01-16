<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form ref="stockQuery" :model="stockQuery" :inline="true">
        <el-row>
          <el-col>
            <el-form-item :label=" $t('stock.skuId.label')+':' " prop="code">
              <el-input v-model="stockQuery.skuId" auto-complete="on"/>
            </el-form-item>
            <el-form-item :label=" $t('stock.skuName.label')+':' " prop="code">
              <el-input v-model="stockQuery.skuName" auto-complete="on"/>
            </el-form-item>
            <el-form-item :label=" $t('stock.warehouseId.label')+':' " prop="code">
              <el-input v-model="stockQuery.warehouseId" auto-complete="on"/>
            </el-form-item>
            <el-form-item :label=" $t('stock.warehouseName.label')+':' " prop="code">
              <el-input v-model="stockQuery.warehouseName" auto-complete="on"/>
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
      <el-table-column label="序号" prop="skuId" />
      <el-table-column label="商品编码" prop="skuId" />
      <el-table-column label="商品名称" prop="skuName" />
      <el-table-column label="仓库" prop="warehouseId" />
      <el-table-column label="可用量" prop="available"/>
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
import { getStocks } from '@/api/stock'

export default {
  name: 'StockList',
  data() {
    return {
      stockQuery: {
        skuId: '',
        skuName: '',
        warehouseId: '',
        warehouseName: '',
        page: 1,
        limit: 10
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
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    resetQuery() {
      this.$refs['stockQuery'].resetFields()
    },
    handleSizeChange(val) {
      this.stockQuery.limit = val
      this.getData()
    },
    handleCurrentChange(val) {
      this.stockQuery.page = val
      this.getData()
    },
    getData() {
      this.table.loading = true
      console.log(this.stockQuery)
      getStocks(this.stockQuery).then(response => {
        console.log(response)
        this.table.data = response.data.item
        this.pagination.total = Number.parseInt(response.data.total)
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
