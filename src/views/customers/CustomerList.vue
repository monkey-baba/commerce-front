<template>
  <div class="app-container">
    <div class="filter-container">

      <el-form ref="customerQuery" :model="customerQuery" :inline="true">
        <el-row>
          <el-col>
            <el-form-item :label=" $t('customer.queryCode.label')+':' " prop="code">
              <el-input v-model="customerQuery.code" auto-complete="on"/>
            </el-form-item>
            <el-form-item :label=" $t('customer.queryName.label')+':' " prop="name">
              <el-input v-model="customerQuery.name" auto-complete="on"/>
            </el-form-item>
            <el-form-item :label=" $t('customer.phone.label')+':' " prop="phone">
              <el-input v-model="customerQuery.phone" auto-complete="on"/>
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
      <el-button type="primary" class="blue-btn" size="small" @click="handleCreate">新建</el-button>
      <el-button type="info" size="small" class="gray-btn" @click="handleDeletes">删除</el-button>
      <el-button type="primary" class="green-btn" size="small">保存</el-button>
      <el-button :loading="downloadLoading" type="primary" class="green-btn" size="small" @click="handleExport">导出</el-button>
    </div>
    <el-table
      v-loading="table.loading"
      :data="table.data"
      border
      fit
      stripe
      highlight-current-row
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="50px"/>
      <el-table-column :label="$t('general.index')" type="index" />
      <el-table-column :label="$t('customer.code.label')" prop="code" >
        <template slot-scope="scope">
          <template>
            {{ scope.row.code }}
          </template>
        </template>
      </el-table-column>
      <el-table-column :label="$t('customer.name.label')" prop="name" >
        <template slot-scope="scope">
          <el-input v-if="scope.row.edit" v-model="scope.row.name" class="edit-input" size="mini"/>
          <template v-else>
            {{ scope.row.name }}
          </template>
        </template>
      </el-table-column>
      <el-table-column :label="$t('customer.phone.label')" prop="phone" >
        <template slot-scope="scope">
          <el-input v-if="scope.row.edit" v-model="scope.row.phone" class="edit-input" size="mini"/>
          <template v-else>
            {{ scope.row.phone }}
          </template>
        </template>
      </el-table-column>
      <el-table-column :label="$t('customer.email.label')" prop="email">
        <template slot-scope="scope">
          <el-input v-if="scope.row.edit" v-model="scope.row.email" class="edit-input" size="mini"/>
          <template v-else>
            {{ scope.row.email }}
          </template>
        </template>
      </el-table-column>
      <el-table-column :label="$t('customer.statusId.label')" prop="statusId">
        <template slot-scope="scope">
          <el-input v-if="scope.row.edit" v-model="scope.row.statusId" class="edit-input" size="mini"/>
          <template v-else>
            {{ scope.row.statusId }}
          </template>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="200px">
        <template slot-scope="scope">
          <div>
            <template v-if="scope.row.edit">
              <el-button type="primary" size="mini" icon="el-icon-circle-check-outline" @click="confirmEdit(scope.row)">
                保存
              </el-button>
              <el-button
                class="cancel-btn"
                size="mini"
                icon="el-icon-refresh"
                type="warning"
                @click="cancelEdit(scope.row)"
              >
                取消
              </el-button>
            </template>
            <template v-else>
              <el-button type="primary" size="mini" icon="el-icon-edit" @click="scope.row.edit=!scope.row.edit">
                编辑
              </el-button>
            </template>
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

    <el-dialog :visible.sync="customerCreate.visible" :title="$t('customer.create.title')">
      <el-form
        ref="createCustomerForm"
        :rules="customerCreate.rules"
        :model="customerCreate.form"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item :label="$t('customer.create.code.label')" prop="code">
          <el-input
            v-model="customerCreate.form.code"
            :placeholder="$t('customer.create.code.placeholder')"
          />
        </el-form-item>
        <el-form-item :label="$t('customer.create.name.label')" prop="name">
          <el-input
            v-model="customerCreate.form.name"
            :placeholder="$t('customer.create.name.placeholder')"
          />
        </el-form-item>
        <el-form-item :label="$t('customer.create.phone.label')" prop="phone">
          <el-input
            v-model="customerCreate.form.phone"
            :placeholder="$t('customer.create.phone.placeholder')"
          />
        </el-form-item>
        <el-form-item :label="$t('customer.create.email.label')" prop="email">
          <el-input
            v-model="customerCreate.form.email"
            :placeholder="$t('customer.create.email.placeholder')"
          />
        </el-form-item>
        <el-form-item :label="$t('customer.create.statusId.label')" prop="statusId">
          <el-input
            v-model="customerCreate.form.statusId"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="customerCreate.visible = false">
          {{ $t('table.cancel') }}
        </el-button>
        <el-button type="primary" @click="createData">
          {{ $t('table.confirm') }}
        </el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { getCustomers, createCustomer, deleteCustomer, updateCustomer } from '@/api/customer'
import { isEmpty, isEmail, isMobilePhone } from '@/utils/validate'

export default {
  name: 'CustomerList',
  data() {
    const validateMobileNumber = (rule, value, callback) => {
      if (!isEmpty(value) && !isMobilePhone(value)) {
        callback(new Error('请输入正确的手机号'))
      } else {
        callback()
      }
    }
    const validateEmail = (rule, value, callback) => {
      if (!isEmpty(value) && !isEmail(value)) {
        callback(new Error('请输入正确的邮箱'))
      } else {
        callback()
      }
    }
    return {
      customerQuery: {
        code: '',
        name: '',
        phone: '',
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
      customerCreate: {
        visible: false,
        rules: {
          phone: [{ required: false, validator: validateMobileNumber, trigger: 'change' }],
          email: [{ required: false, validator: validateEmail, trigger: 'change' }]
        },
        form: {}
      },
      downloadLoading: false
    }
  },
  created() {
    this.getData()
  },
  methods: {
    resetQuery() {
      this.$refs['customerQuery'].resetFields()
    },
    handleSizeChange(val) {
      this.customerQuery.pageSize = val
      this.getData()
    },
    handleCurrentChange(val) {
      this.customerQuery.pageNum = val
      this.getData()
    },
    getData() {
      this.table.loading = true
      getCustomers(this.customerQuery).then(response => {
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
        this.search.loading = false
      })
    },
    handleCreate() {
      this.customerCreate.form = {
        code: '',
        name: '',
        phone: '',
        email: '',
        statusId: ''
      }
      this.customerCreate.visible = true
      this.$nextTick(() => {
        this.$refs['createCustomerForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['createCustomerForm'].validate((valid) => {
        if (valid) {
          createCustomer(this.customerCreate.form).then((response) => {
            response.data.edit = false
            this.table.data.unshift(response.data)
            this.pagination.total = this.pagination.total + 1
            this.customerCreate.visible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          }).catch(() => {
            this.$notify({
              title: '失败',
              message: '创建失败',
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
    handleDeletes() {
      if (this.table.select.length <= 0) {
        this.$message({
          message: '请选择客户',
          type: 'error',
          duration: 2 * 1000
        })
        return
      }
      deleteCustomer(this.table.select).then((response) => {
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
    cancelEdit(row) {
      const originRow = JSON.parse(row.original)
      row.code = originRow.code
      row.name = originRow.name
      row.phone = originRow.phone
      row.email = originRow.email
      row.statusId = originRow.statusId
      row.edit = false
    },
    confirmEdit(row) {
      if (isEmpty(row.name)) {
        this.$message({
          message: '客户姓名不能为空',
          type: 'error',
          duration: 5 * 1000
        })
        return
      }
      if (!isEmpty(row.phone) && !isMobilePhone(row.phone)) {
        this.$message({
          message: '请输入正确的手机号',
          type: 'error',
          duration: 5 * 1000
        })
        return
      }
      if (!isEmpty(row.email) && !isEmail(row.email)) {
        this.$message({
          message: '请输入正确的邮箱',
          type: 'error',
          duration: 5 * 1000
        })
        return
      }
      updateCustomer(row).then(response => {
        this.$message({
          message: response.data,
          type: 'success'
        })
        row.original = JSON.stringify(row)
        row.edit = false
      })
    },
    handleExport() {
      if (this.table.select.length <= 0) {
        this.$message({
          message: '请选择用户',
          type: 'error',
          duration: 2 * 1000
        })
        return
      }
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['客户编号', '客户姓名', '手机号', '邮箱', '状态']
        const filterVal = ['code', 'name', 'phone', 'email', 'statusId']

        const data = this.table.select.map(u => filterVal.map(field => {
          return u[field]
        }))
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '客户列表'
        })
        this.downloadLoading = false
      })
    },
    setSearchLoading() {
      // this.search.loading = false
    },
    query() {
      this.search.loading = true
      this.customerQuery.pageNum = 1
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
