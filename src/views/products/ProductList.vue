<template>
  <div class="app-container">
    <div class="filter-container">

      <el-form ref="productQuery" :model="productQuery" :inline="true">
        <el-row>
          <el-col>
            <el-form-item :label=" $t('product.name.name')+':' " prop="name">
              <el-input v-model="productQuery.name" :placeholder="$t('product.name.placeholder')" auto-complete="on"/>
            </el-form-item>
            <el-form-item :label=" $t('product.code.name')+':' " prop="code">
              <el-input v-model="productQuery.code" :placeholder="$t('product.code.placeholder')" auto-complete="on"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item :label=" $t('product.category.name')+':' " prop="name">
              <el-input v-model="productQuery.category" :placeholder="$t('product.category.placeholder')" auto-complete="on"/>
            </el-form-item>
            <el-form-item :label=" $t('product.channel.name')+':' " prop="code">
              <el-input v-model="productQuery.channel" :placeholder="$t('product.channel.placeholder')" auto-complete="on"/>
            </el-form-item>
            <el-form-item :label=" $t('product.approvalStatus.name')+':' " prop="code">
              <el-input v-model="productQuery.approvalStatus" :placeholder="$t('product.approvalStatus.placeholder')" auto-complete="on"/>
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
      <el-button type="primary" class="blue-btn" size="small">创建商品</el-button>
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
      <el-table-column :label="$t('product.code.name')" prop="code" >
        <template slot-scope="scope">
          <router-link :to="{name:'ProductDetail',params: {code: scope.row.code }}" class="link-type"> {{ scope.row.code }}</router-link>
        </template>
      </el-table-column>
      <el-table-column label="库存单位" prop="unit" />
      <el-table-column label="商品分类" prop="category"/>
      <el-table-column label="销售渠道" prop="channel"/>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" class="green-btn" size="mini">编辑</el-button>
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
import { getProducts } from '@/api/product'

export default {
  name: 'ProductList',
  filters: {
    statusFilter(status) {
      const statusMap = {
        'APPROVED': 'approved',
        'UNAPPROVED': 'unapproved'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      productQuery: {
        code: '',
        name: '',
        category: '',
        channel: '',
        approvalStatus: []
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
      this.$refs['productQuery'].resetFields()
    },
    handleSizeChange(val) {
      this.productQuery.limit = val
      this.getData()
    },
    handleCurrentChange(val) {
      this.productQuery.page = val
      this.getData()
    },
    getData() {
      this.table.loading = true
      getProducts(this.productQuery).then(response => {
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
