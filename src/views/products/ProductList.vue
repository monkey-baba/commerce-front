<template>
  <div class="app-container">
    <div class="filter-container">
      <ElForm ref="productQuery" :model="productQuery" :inline="true">
        <ElRow>
          <ElCol>
            <ElFormItem :label=" $t('product.code.name')+':' " prop="code">
              <ElInput v-model="productQuery.code" :placeholder="$t('product.code.placeholder')" auto-complete="on"/>
            </ElFormItem>
            <ElFormItem :label=" $t('product.name.name')+':' " prop="name">
              <ElInput v-model="productQuery.name" :placeholder="$t('product.name.placeholder')" auto-complete="on"/>
            </ElFormItem>
          </ElCol>
        </ElRow>
        <ElRow>
          <ElCol>
            <ElFormItem :label=" $t('product.channelId.name')+':' " prop="channelId">
              <ElSelect v-model="productQuery.channelId" auto-complete="on">
                <el-option
                  v-for="item in channel"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"/>
              </ElSelect>
            </ElFormItem>
            <ElFormItem :label=" $t('product.approvedId.name')+':' " prop="approvedId">
              <ElSelect v-model="productQuery.approvedId" auto-complete="on">
                <el-option
                  v-for="item in approvedStatus"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"/>
              </ElSelect>
            </ElFormItem>
          </ElCol>
        </ElRow>
        <ElRow>
          <ElFormItem>
            <ElCol>
              <ElButton :loading="search.loading" type="primary" icon="el-icon-search" size="small" @click="query">
                查询
              </ElButton>
              <ElButton size="small" @click="resetQuery">
                重置
              </ElButton>
            </ElCol>
          </ElFormItem>
        </ElRow>
      </ElForm>
    </div>
    <hr>
    <div class="filter-container" style="margin: 0 10px">
      <ElButton type="primary" class="blue-btn" size="small" @click="handleCreate">
        创建
      </ElButton>
      <ElButton :loading="downloadLoading" type="primary" class="green-btn" size="small" @click="handleExport">
        导出
      </ElButton>
      <ElButton :loading="downloadLoading" type="primary" class="el-icon-delete" size="small" @click="handleDeletes">
        删除
      </ElButton>
      <ElButton :loading="downloadLoading" type="primary" class="green-btn" size="small" @click="handleApproved">
        批量上架
      </ElButton>
      <ElButton :loading="downloadLoading" type="primary" class="gray-btn" size="small" @click="handleUnApproved">
        批量下架
      </ElButton>
    </div>
    <ElTable
      v-loading="table.loading"
      :data="table.data"
      border
      fit
      stripe
      highlight-current-row
      @selection-change="handleSelectionChange"
    >
      <ElTableColumn type="selection"/>
      <ElTableColumn :label="$t('general.index')" type="index"/>
      <ElTableColumn :label="$t('product.code.name')" prop="code">
        <template slot-scope="scope">
          <template>
            {{ scope.row.code }}
          </template>
        </template>
      </ElTableColumn>
      <ElTableColumn :label="$t('product.name.name')" prop="name">
        <template slot-scope="scope">
          <template>
            {{ scope.row.name }}
          </template>
        </template>
      </ElTableColumn>
      <ElTableColumn :label="$t('product.unitId.name')" prop="unitId">
        <template slot-scope="scope">
          <template>
            {{ unitMap[scope.row.unitId] }}
          </template>
        </template>
      </ElTableColumn>
      <ElTableColumn :label="$t('product.channelId.name')" prop="channelId">
        <template slot-scope="scope">
          <template>
            {{ channelMap[scope.row.channelId] }}
          </template>
        </template>
      </ElTableColumn>
      <ElTableColumn :label="$t('product.approvedId.name')" prop="approvedId">
        <template slot-scope="scope">
          <template>
            {{ approvedStatusMap[scope.row.approvedId] }}
          </template>
        </template>
      </ElTableColumn>
      <ElTableColumn label="操作" min-width="200px">
        <template slot-scope="scope">
          <router-link :to="'./ProductDetail/'+scope.row.id">
            <el-button type="primary" size="small" icon="el-icon-edit">Edit</el-button>
          </router-link>
        </template>
      </ElTableColumn>
    </ElTable>

    <ElPagination
      :current-page="pagination.page"
      :page-sizes="pagination.pageSizes"
      :total="pagination.total"
      :background="pagination.background"
      align="right"
      layout="total, sizes, prev, pager, next, jumper"
      style="width: 100%"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />

    <ElDialog :visible.sync="productCreate.visible" :title="$t('product.create.title')">
      <ElForm
        ref="createProductForm"
        :rules="productCreate.rules"
        :model="productCreate.form"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left:50px;"
      >
        <ElFormItem :label="$t('product.code.name')" prop="code">
          <ElInput
            v-model="productCreate.form.code"
            :placeholder="$t('product.code.placeholder')"
          />
        </ElFormItem>
        <ElFormItem :label="$t('product.name.name')" prop="name">
          <ElInput
            v-model="productCreate.form.name"
            :placeholder="$t('product.name.placeholder')"
          />
        </ElFormItem>
        <ElFormItem :label="$t('product.channelId.name')" prop="channelId">
          <ElSelect v-model="productCreate.form.channelId" auto-complete="on">
            <el-option
              v-for="item in channel"
              :key="item.id"
              :label="item.name"
              :value="item.id"/>
          </ElSelect>
        </ElFormItem>
        <ElFormItem :label="$t('product.unitId.name')" prop="unitId">
          <ElSelect v-model="productCreate.form.unitId" auto-complete="on">
            <el-option
              v-for="item in unit"
              :key="item.id"
              :label="item.name"
              :value="item.id"/>
          </ElSelect>
        </ElFormItem>
      </ElForm>
      <div slot="footer" class="dialog-footer">
        <ElButton @click="productCreate.visible = false">
          {{ $t('table.cancel') }}
        </ElButton>
        <ElButton type="primary" @click="createData">
          {{ $t('table.confirm') }}
        </ElButton>
      </div>
    </ElDialog>
    <ProductDetail v-if="productDetailVisible" ref="ProductDetail" @RefreshDataList="getData"/>
  </div>
</template>

<script>
import { getProducts, createProduct, getApprovedStatus, getChannel, getUnit, deleteProduct, approvedProduct, unApprovedProduct } from '@/api/product'
import ProductDetail from './ProductDetail'

export default {
  name: 'Product',
  filters: {
    enableFilter(status) {
      const statusMap = {
        'true': 'success',
        'false': 'info'
      }
      return statusMap[status]
    }
  },
  components: {
    ProductDetail
  },
  data() {
    return {
      productQuery: {
        code: '',
        name: '',
        channelId: '',
        approvedId: '',
        pageNum: 1,
        pageSize: 10
      },
      search: {
        loading: false
      },
      pagination: {
        page: 1,
        total: 0,
        background: false,
        pageSizes: [10, 20, 50]
      },
      table: {
        loading: false,
        data: undefined,
        select: []
      },
      productCreate: {
        visible: false,
        rules: {
        },
        form: {}
      },
      downloadLoading: false,
      productDetailVisible: false,
      channel: [],
      channelMap: {},
      unit: [],
      unitMap: {},
      approvedStatus: [],
      approvedStatusMap: {}
    }
  },
  created() {
    this.initChannel()
    this.initApprovedStatus()
    this.initUnit()
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
      this.productQuery.pageNum = val
      this.getData()
    },
    initApprovedStatus() {
      getApprovedStatus().then(response => {
        this.approvedStatus = response.data
        this.approvedStatus.forEach(v => {
          this.approvedStatusMap[v.id] = v.name
        })
      }).catch(() => {
        console.log('查询失败')
      })
    },
    initChannel() {
      getChannel().then(response => {
        this.channel = response.data
        this.channel.forEach(v => {
          this.channelMap[v.id] = v.name
        })
      }).catch(() => {
        console.log('查询失败')
      })
    },
    initUnit() {
      getUnit().then(response => {
        this.unit = response.data
        this.unit.forEach(v => {
          this.unitMap[v.id] = v.name
        })
      }).catch(() => {
        console.log('查询失败')
      })
    },
    getData() {
      this.table.loading = true
      getProducts(this.productQuery).then(response => {
        const items = response.data.list
        this.table.data = items.map(v => {
          this.$set(v, 'edit', false) // https://vuejs.org/v2/guide/reactivity.html
          v.original = JSON.stringify(v) //  will be used when product click the cancel botton
          return v
        })
        this.pagination.total = Number.parseInt(response.data.total)
        this.table.loading = false
        this.search.loading = false
      }).catch((e) => {
        this.table.loading = false
        this.search.loading = false
      })
    },
    query() {
      this.search.loading = true
      this.getData()
    },
    handleDeletes() {
      if (this.table.select.length <= 0) {
        this.$message({
          message: '请选择商品',
          type: 'error',
          duration: 2 * 1000
        })
        return
      }
      deleteProduct(this.table.select).then((response) => {
        this.getData()
        this.$notify({
          title: '成功',
          message: '删除成功',
          type: 'success',
          duration: 2000
        })
      }).catch(() => {
        this.$notify({
          title: '失败',
          message: '删除失败',
          type: 'error',
          duration: 2000
        })
      })
    },
    handleApproved() {
      if (this.table.select.length <= 0) {
        this.$message({
          message: '请选择商品',
          type: 'error',
          duration: 2 * 1000
        })
        return
      }
      approvedProduct(this.table.select).then((response) => {
        this.getData()
        this.$notify({
          title: '成功',
          message: '上架成功',
          type: 'success',
          duration: 2000
        })
      }).catch(() => {
        this.$notify({
          title: '失败',
          message: '下架失败',
          type: 'error',
          duration: 2000
        })
      })
    },
    handleUnApproved() {
      if (this.table.select.length <= 0) {
        this.$message({
          message: '请选择商品',
          type: 'error',
          duration: 2 * 1000
        })
        return
      }
      unApprovedProduct(this.table.select).then((response) => {
        this.getData()
        this.$notify({
          title: '成功',
          message: '下架成功',
          type: 'success',
          duration: 2000
        })
      }).catch(() => {
        this.$notify({
          title: '失败',
          message: '下架失败',
          type: 'error',
          duration: 2000
        })
      })
    },
    handleCreate() {
      this.productCreate.form = {
        code: '',
        name: '',
        channelId: ''
      }
      this.productCreate.visible = true
      this.$nextTick(() => {
        this.$refs['createProductForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['createProductForm'].validate((valid) => {
        if (valid) {
          createProduct(this.productCreate.form).then((response) => {
            this.table.data.unshift(response.data)
            this.productCreate.visible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          }).catch(() => {
            this.$notify({
              title: '失败',
              message: '产品创建失败',
              type: 'error',
              duration: 2000
            })
          })
        }
      })
    },
    handleSelectionChange(val) {
      this.table.select = val
    },
    handleExport() {
      if (this.table.select.length <= 0) {
        this.$message({
          message: '请选择产品',
          type: 'error',
          duration: 2 * 1000
        })
        return
      }
      this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['产品编码', '产品名称', '产品渠道', '审批状态']
          const filterVal = ['code', 'name', 'channelId', 'approvedId']

          const data = this.table.select.map(u => filterVal.map(field => {
            return u[field]
          }))
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: '产品列表'
          })
          this.downloadLoading = false
        })
    },
    handleEdit(row) {
      this.productDetailVisible = true
      this.$nextTick(function() {
        this.$refs.ProductDetail.init(row.id)
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
  .el-transfer * {
    text-align: left;
  }

</style>
