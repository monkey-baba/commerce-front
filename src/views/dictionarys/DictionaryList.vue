<template>
  <div class="app-container">
    <div class="filter-container">

      <el-form ref="dictForm" :model="dictQuery" :inline="true">
        <el-row>
          <el-col>
            <el-form-item :label="$t('dict.code.label')" prop="code">
              <el-input v-model="dictQuery.code" :placeholder="$t('dict.code.placeholder')" auto-complete="on"/>
            </el-form-item>
            <el-form-item :label="$t('dict.name.label')" prop="name">
              <el-input v-model="dictQuery.name" :placeholder="$t('dict.name.placeholder')" auto-complete="on"/>
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
      <el-button type="primary" class="blue-btn" size="small" @click="handleCreate" >新建</el-button>
      <el-button type="danger" size="small" >删除</el-button>
    </div>
    <el-table
      v-loading="table.loading"
      :data="table.data"
      border
      fit
      stripe
      highlight-current-row
      @selection-change="handleSelectionChange">
      <el-table-column :selectable="selectable" type="selection" width="50px"/>
      <el-table-column :label="$t('dict.code.label')" prop="code">
        <template slot-scope="scope">{{ scope.row.code }}</template>
      </el-table-column>
      <el-table-column :label="$t('dict.name.label')" prop="name">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column label="编辑" width="150px">
        <template slot-scope="scope">
          <el-button type="primary" size="mini">编辑</el-button>
          <el-button v-if="scope.row.editable" type="danger" size="mini">删除</el-button>
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

    <ElDialog :visible.sync="dictCreate.visible" :title="$t('dict.create.title')">
      <ElForm
        ref="createDictForm"
        :rules="dictCreate.rules"
        :model="dictCreate.form"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left:50px;"
      >
        <ElFormItem :label="$t('dict.create.code.label')" prop="code">
          <ElInput
            v-model="dictCreate.form.code"
            :placeholder="$t('dict.create.code.placeholder')"
          />
        </ElFormItem>
        <ElFormItem :label="$t('dict.create.name.label')" prop="name">
          <ElInput
            v-model="dictCreate.form.name"
            :placeholder="$t('dict.create.name.placeholder')"
          />
        </ElFormItem>
      </ElForm>
      <div slot="footer" class="dialog-footer">
        <ElButton @click="dictCreate.visible = false">
          {{ $t('table.cancel') }}
        </ElButton>
        <ElButton type="primary" @click="createData">
          {{ $t('table.confirm') }}
        </ElButton>
      </div>
    </ElDialog>
  </div>
</template>

<script>
import { getDicts, createDict } from '@/api/dictionary'

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
      dictQuery: {
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
        data: null,
        select: []
      },
      dictCreate: {
        visible: false,
        rules: {
          code: [{
            type: 'string',
            pattern: '^[a-zA-Z0-9\_]+$',
            required: true,
            message: '代码为字母与数字或下划线',
            trigger: 'change'
          }],
          name: [{ required: true, message: '描述不能为空', trigger: 'change' }]
        },
        form: {}
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    resetQuery() {
      this.$refs['dictForm'].resetFields()
    },
    handleSizeChange(val) {
      this.dictQuery.pageSize = val
      this.getData()
    },
    handleCurrentChange(val) {
      this.dictQuery.pageNum = val
      this.getData()
    },
    getData() {
      this.table.loading = true
      getDicts(this.dictQuery).then(response => {
        this.table.data = response.data.list
        this.pagination.total = Number.parseInt(response.data.total)
        this.table.loading = false
        this.search.loading = false
      }).catch(() => {
        this.table.loading = false
        this.search.loading = false
      })
    },
    query() {
      this.search.loading = true
      this.dictQuery.pageNum = 1
      this.getData()
    },
    handleSelectionChange(val) {
      this.table.select = val
    },
    selectable(row) {
      return row.editable
    },
    handleCreate() {
      this.dictCreate.form = {
        code: '',
        name: ''
      }
      this.dictCreate.visible = true
      this.$nextTick(() => {
        this.$refs['createDictForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['createDictForm'].validate((valid) => {
        if (valid) {
          createDict(this.dictCreate.form).then((response) => {
            this.table.data.unshift(response.data)
            this.pagination.total = this.pagination.total + 1
            this.dictCreate.visible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          }).catch(() => {
            this.$notify({
              title: '失败',
              message: '代码已存在',
              type: 'error',
              duration: 2000
            })
          })
        }
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
