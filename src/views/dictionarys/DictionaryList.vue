<template>
  <div class="app-container">
    <div class="filter-container">

      <el-form ref="dictionaryQuery" :model="dictionaryQuery" :inline="true">
        <el-row>
          <el-col>
            <el-form-item :label=" '代码:' " prop="code">
              <el-input v-model="dictionaryQuery.code" :placeholder="'请输入代码'" auto-complete="on"/>
            </el-form-item>
            <el-form-item :label=" '描述:' " prop="name">
              <el-input v-model="dictionaryQuery.name" :placeholder="'请输入描述'" auto-complete="on"/>
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
    </div>
    <el-table
      v-loading="table.loading"
      :data="table.data"
      border
      fit
      stripe
      highlight-current-row>
      <el-table-column type="selection" width="50px"/>
      <el-table-column label="代码" prop="code" />
      <el-table-column label="描述" prop="name" />
      <el-table-column label="编辑" min-width="200px">
        <template slot-scope="scope">
          <div style="margin-top: 10px">
            <el-button type="info" size="mini" @click="editDictionary(scope.row.code)">编辑</el-button>
          </div>
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
import { getDictionarys, getDictionary } from '@/api/dictionary'

export default {
  name: 'DictionaryList',
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
      dictionaryQuery: {
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
      this.$refs['dictionaryQuery'].resetFields()
    },
    handleSizeChange(val) {
      this.dictionaryQuery.limit = val
      this.getData()
    },
    handleCurrentChange(val) {
      this.dictionaryQuery.page = val
      this.getData()
    },
    getData() {
      this.table.loading = true
      getDictionarys(this.dictionaryQuery).then(response => {
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
    },
    editDictionary(code) {
      this.table.loading = true

      this.dictionaryVauleQuery.code = code

      getDictionary(this.dictionaryVauleQuery).then(response => {
        const items = response.data.list
        this.table.data = items.map(v => {
          this.$set(v, 'edit', false) // https://vuejs.org/v2/guide/reactivity.html
          v.original = JSON.stringify(v) //  will be used when user click the cancel botton
          return v
        })
        this.pagination.total = response.data.total
        this.table.loading = false
        this.search.loading = false
      }).catch((e) => {
        this.table.loading = false
        this.search.loading = false
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

</style>
