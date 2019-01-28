<template>
  <div class="app-container">
    <div class="filter-container">
      <ElForm ref="categoryQuery" :model="categoryQuery" :inline="true">
        <ElRow>
          <ElCol>
            <ElFormItem :label=" $t('category.name.name')+':' " prop="name">
              <ElInput v-model="categoryQuery.name" :placeholder="$t('category.name.placeholder')" auto-complete="on"/>
            </ElFormItem>
          </ElCol>
        </ElRow>
        <ElRow>
          <ElCol>
            <ElFormItem :label=" $t('category.code.name')+':' " prop="code">
              <ElInput v-model="categoryQuery.code" :placeholder="$t('category.code.placeholder')" auto-complete="on"/>
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
      <ElButton type="primary" class="blue-btn" size="small" @click="handleCreate(undefined,0)">
        创建
      </ElButton>
      <ElButton :loading="downloadLoading" type="primary" class="green-btn" size="small" @click="handleExport">
        导出
      </ElButton>
    </div>
    <tree-table
      v-loading="table.loading"
      :data="table.data"
      :eval-func="func"
      :eval-args="args"
      :expand-all="expandAll"
      border
      @selection-change="handleSelectionChange"
    >
      <el-table-column label="分类">
        <template slot-scope="scope">
          <span style="color:sandybrown">{{ scope.row.code }}</span>
        </template>
      </el-table-column>
      <el-table-column label="编码">
        <template slot-scope="scope">
          <span style="color:sandybrown">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="290">
        <template slot-scope="scope">
          <ElButton type="primary" size="mini" icon="" @click="handleCreate(scope.row,1)">新增子分类</ElButton>
          <ElButton type="primary" size="mini" icon="el-icon-edit" @click="handleUpdate(scope.row)">编辑</ElButton>
          <ElButton type="primary" size="mini" class="el-icon-delete" @click="handleDelete(scope.row)">删除</ElButton>
        </template>
      </el-table-column>
    </tree-table>

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

    <ElDialog :visible.sync="categoryCreate.visible" :title="$t('category.create.title')">
      <ElForm
        ref="createCategoryForm"
        :rules="categoryCreate.rules"
        :model="categoryCreate.form"
        label-position="left"
        label-width="85px"
        style="width: 400px; margin-left:50px;"
      >
        <ElFormItem :label="$t('category.name.name')" prop="name">
          <ElInput
            v-model="categoryCreate.form.name"
            :placeholder="$t('category.name.placeholder')"
          />
        </ElFormItem>
      </ElForm>
      <div slot="footer" class="dialog-footer">
        <ElButton @click="categoryCreate.visible = false">
          {{ $t('table.cancel') }}
        </ElButton>
        <ElButton type="primary" @click="createData">
          {{ $t('table.confirm') }}
        </ElButton>
      </div>
    </ElDialog>

    <ElDialog :visible.sync="categoryUpdate.visible" :title="$t('category.update.title')">
      <ElForm
        ref="updateCategoryForm"
        :rules="categoryUpdate.rules"
        :model="categoryUpdate.form"
        label-position="left"
        label-width="85px"
        style="width: 400px; margin-left:50px;"
      >
        <ElFormItem :label="$t('category.name.name')" prop="name">
          <ElInput
            v-model="categoryUpdate.form.name"
            :placeholder="$t('category.name.placeholder')"
          />
        </ElFormItem>
      </ElForm>
      <div slot="footer" class="dialog-footer">
        <ElButton @click="categoryUpdate.visible = false">
          {{ $t('table.cancel') }}
        </ElButton>
        <ElButton type="primary" @click="updateData">
          {{ $t('table.confirm') }}
        </ElButton>
      </div>
    </ElDialog>

    <ElDialog :visible.sync="subCategoryCreate.visible" :title="$t('subCategory.create.title')">
      <ElForm
        ref="createSubCategoryForm"
        :rules="subCategoryCreate.rules"
        :model="subCategoryCreate.form"
        label-position="left"
        label-width="85px"
        style="width: 400px; margin-left:50px;"
      >
        <ElFormItem :label="$t('category.name.name')" prop="name">
          <ElInput
            v-model="subCategoryCreate.form.name"
            :placeholder="$t('category.name.placeholder')"
          />
        </ElFormItem>
      </ElForm>
      <div slot="footer" class="dialog-footer">
        <ElButton @click="subCategoryCreate.visible = false">
          {{ $t('table.cancel') }}
        </ElButton>
        <ElButton type="primary" @click="createSubData">
          {{ $t('table.confirm') }}
        </ElButton>
      </div>
    </ElDialog>

  </div>
</template>
<script>

import TreeTable from '@/components/TreeTable'
import { getCategories, createCategory, createSubCategory, updateCategory, deleteCategory } from '@/api/category'
import treeToArray from './customEval'

export default {
  name: 'Category',
  components: { TreeTable },
  filters: {
    enableFilter(status) {
      const statusMap = {
        'true': 'success',
        'false': 'info'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      categoryQuery: {
        code: '',
        name: '',
        pageNum: 1,
        pageSize: 2
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
      categoryCreate: {
        visible: false,
        rules: {},
        form: {}
      },
      categoryUpdate: {
        visible: false,
        rules: {},
        form: {}
      },
      subCategoryCreate: {
        visible: false,
        rules: {},
        form: {}
      },
      func: treeToArray,
      expandAll: false,
      table: {
        loading: false,
        data: [],
        select: []
      },
      downloadLoading: false
    }
  },
  created() {
    this.getData()
  },
  methods: {
    resetQuery() {
      this.$refs['categoryQuery'].resetFields()
    },
    handleSizeChange(val) {
      this.categoryQuery.limit = val
      this.getData()
    },
    handleCurrentChange(val) {
      this.categoryQuery.pageNum = val
      this.getData()
    },
    getData() {
      this.table.loading = true
      getCategories(this.categoryQuery).then(response => {
        console.log(response.data)
        const items = response.data.list
        this.table.data = items.map(v => {
          this.$set(v, 'edit', false) // https://vuejs.org/v2/guide/reactivity.html
          v.original = JSON.stringify(v) //  will be used when category click the cancel botton
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
    handleCreate(category, type) {
      if (type === 0) {
        this.categoryCreate.form = {
          name: ''
        }
        this.categoryCreate.visible = true
        this.$nextTick(() => {
          this.$refs['createCategoryForm'].clearValidate()
        })
      } else {
        this.subCategoryCreate.form = {
          name: '',
          parentId: category.id
        }
        this.subCategoryCreate.visible = true
        this.$nextTick(() => {
          this.$refs['createSubCategoryForm'].clearValidate()
        })
      }
    },
    handleUpdate(category) {
      this.categoryUpdate.form = {
        name: '',
        id: category.id
      }
      this.categoryUpdate.visible = true
      this.$nextTick(() => {
        this.$refs['updateCategoryForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['createCategoryForm'].validate((valid) => {
        if (valid) {
          createCategory(this.categoryCreate.form).then((response) => {
            this.table.data.unshift(response.data)
            this.categoryCreate.visible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          }).catch((e) => {
            console.log(e)
            this.$notify({
              title: '失败',
              message: '类目创建失败',
              type: 'error',
              duration: 2000
            })
          })
        }
      })
    },
    updateData() {
      this.$refs['updateCategoryForm'].validate((valid) => {
        if (valid) {
          updateCategory(this.categoryUpdate.form).then((response) => {
            this.table.data.unshift(response.data)
            this.categoryUpdate.visible = false
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          }).catch((e) => {
            this.$notify({
              title: '失败',
              message: '类目更新失败',
              type: 'error',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(category) {
      const item = {
        id: category.id
      }
      deleteCategory(item).then((response) => {
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
    createSubData() {
      this.$refs['createSubCategoryForm'].validate((valid) => {
        if (valid) {
          createSubCategory(this.subCategoryCreate.form).then((response) => {
            this.table.data.unshift(response.data)
            this.subCategoryCreate.visible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          }).catch((e) => {
            this.$notify({
              title: '失败',
              message: '子类目创建失败',
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
          message: '请选择类目',
          type: 'error',
          duration: 2 * 1000
        })
        return
      }
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['类目编码', '类目名称', '父类目编码']
        const filterVal = ['code', 'name', 'parentId']

        const data = this.table.select.map(u => filterVal.map(field => {
          return u[field]
        }))
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '分类列表'
        })
        this.downloadLoading = false
      })
    }
  }
}
</script>
<style/>

