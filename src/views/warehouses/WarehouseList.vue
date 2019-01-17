<template>
  <div class="app-container">
    <div class="filter-container">

      <el-form ref="warehouseQuery" :model="warehouseQuery" :inline="true">
        <el-row>
          <el-col>
            <el-form-item :label=" $t('warehouse.code.label')+':' " prop="code">
              <el-input v-model="warehouseQuery.code" auto-complete="on"/>
            </el-form-item>
            <el-form-item :label=" $t('warehouse.name.label')+':' " prop="name">
              <el-input v-model="warehouseQuery.name" auto-complete="on"/>
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
      <el-table-column :label="$t('general.index')" type="index" />
      <el-table-column :label="$t('warehouse.code.label')" prop="code" />
      <el-table-column :label="$t('warehouse.name.label')" prop="name" />
      <el-table-column :label="$t('warehouse.active.label')" prop="active" />
      <el-table-column :label="$t('warehouse.posId.label')" prop="posId" />
      <el-table-column :label="$t('warehouse.posAddress.label')" prop="posAddress" />
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
import { getWarehouses } from '@/api/warehouse'

export default {
  name: 'WarehouseList',
  data() {
    return {
      warehouseQuery: {
        code: '',
        name: '',
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
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    resetQuery() {
      this.$refs['warehouseQuery'].resetFields()
    },
    handleSizeChange(val) {
      this.warehouseQuery.limit = val
      this.getData()
    },
    handleCurrentChange(val) {
      this.warehouseQuery.page = val
      this.getData()
    },
    getData() {
      this.table.loading = true
      console.log(this.warehouseQuery)
      getWarehouses(this.warehouseQuery).then(response => {
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
