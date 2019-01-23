<template>
  <div class="app-container">
    <el-tabs type="border-card">
      <el-tab-pane label="基本信息">
        <ElForm
          ref="updateProductForm"
          :rules="productEdit.rules"
          :model="productEdit.form"
          label-position="left"
          label-width="70px"
          style="width: 400px; margin-left:50px;"
        >
          <el-row>
            <ElFormItem :label="$t('product.code.name')" prop="code">
              <ElInput
                v-model="productEdit.form.code"
                :placeholder="$t('product.code.placeholder')"
              />
            </ElFormItem>
            <ElFormItem :label="$t('product.name.name')" prop="name">
              <ElInput
                v-model="productEdit.form.name"
                :placeholder="$t('product.name.placeholder')"
              />
            </ElFormItem>
          </el-row>
          <el-row>
            <ElFormItem :label="$t('product.channelId.name')" prop="channelId">
              <ElInput
                v-model="productEdit.form.channelId"
                :placeholder="$t('product.channelId.placeholder')"
              />
            </ElFormItem>
            <ElFormItem :label="$t('product.approvedId.name')" prop="approvedId">
              <ElInput
                v-model="productEdit.form.approvedId"
                :placeholder="$t('product.approvedId.placeholder')"
              />
            </ElFormItem>
          </el-row>
        </ElForm>
      </el-tab-pane>
      <el-tab-pane label="SKU设置"/>
      <el-tab-pane label="价格维护">
        <ElForm ref="priceRowQuery" :model="priceQuery" :inline="true">
          <ElRow>
            <ElFormItem :label=" $t('price.name.name')+':' " prop="name">
              <ElInput v-model="priceQuery.name" :placeholder="$t('price.name.placeholder')" auto-complete="on"/>
            </ElFormItem>
            <ElFormItem :label=" $t('price.channelId.name')+':' " prop="channelId">
              <ElInput v-model="priceQuery.channelId" :placeholder="$t('price.channelId.placeholder')" auto-complete="on"/>
            </ElFormItem>
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
        <hr>
        <div class="filter-container" style="margin: 0 10px">
          <ElButton type="primary" class="blue-btn" size="small" @click="handleCreate(undefined,0)">
            创建
          </ElButton>
        </div>
        <el-table
          border
          fit
          stripe
          highlight-current-row>
          <el-table-column label="sku编码" prop="skuId" />
          <el-table-column label="规格信息" prop="" />
          <el-table-column label="价格类型" prop="priceTypeId" />
          <el-table-column label="价格" prop="price" />
          <el-table-column label="有效期起" prop="startTime" type="date"/>
          <el-table-column label="有效期止" prop="endTime" type="date"/>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="库存信息">
        <el-table
          border
          fit
          stripe
          highlight-current-row>
          <el-table-column label="SKU" prop="" />
          <el-table-column label="SKU名称" prop="" />
          <el-table-column label="仓库" prop="" />
          <el-table-column label="可用量" prop="" />
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { getPrice } from '@/api/price'

export default {
  name: 'ProductDetail',
  filters: {
    stepFilter: (value) => {
      const stepMap = {
      }
      return stepMap[value]
    }
  },
  data() {
    return {
      priceQuery: {
        name: '',
        channelId: ''
      },
      search: {
        loading: false
      },
      table: {
        loading: false,
        data: undefined,
        select: []
      },
      productEdit: {
        visible: true,
        rules: {
        },
        form: {}
      }
    }
  },
  methods: {
    resetQuery() {
      this.$refs['priceQuery'].resetFields()
    },
    handleSizeChange(val) {
      this.priceQuery.limit = val
      this.getData()
    },
    handleCurrentChange(val) {
      this.priceQuery.pageNum = val
      this.getData()
    },
    getData() {
      this.table.loading = true
      getPrice(this.priceQuery).then(response => {
        const items = response.data.list
        this.table.data = items.map(v => {
          this.$set(v, 'edit', false) // https://vuejs.org/v2/guide/reactivity.html
          v.original = JSON.stringify(v) //  will be used when price click the cancel botton
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
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .order-basic {
    border: 1px solid #ebeef5;
    margin: 10px auto;
    border-radius: 4px;
    .order-basic-header{
      padding: 10px;
      font-size: 16px;
      font-weight: 500;
      border-bottom: 1px solid #ebeef5;
    }
    .order-basic-body{
      font-size: 13px;
    }
  }
  .row-bg {
    padding: 10px 0;
  }
</style>
