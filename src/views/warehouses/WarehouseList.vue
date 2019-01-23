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
      <el-button type="primary" class="blue-btn" size="small" @click="handleCreate">新建</el-button>
      <el-button type="info" size="small" class="gray-btn" @click="handleDeletes">删除</el-button>
      <el-button type="success" size="small" @click="handleEnables(true)">启用</el-button>
      <el-button type="danger" size="small" @click="handleEnables(false)">禁用</el-button>
      <el-button type="primary" class="green-btn" size="small" @click="handleExport">导出</el-button>
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
      <el-table-column :label="$t('warehouse.code.label')" prop="code" >
        <template slot-scope="scope">
          <template>
            {{ scope.row.code }}
          </template>
        </template>
      </el-table-column>
      <el-table-column :label="$t('warehouse.name.label')" prop="name" >
        <template slot-scope="scope">
          <el-input v-if="scope.row.edit" v-model="scope.row.name" class="edit-input" size="mini"/>
          <template v-else>
            {{ scope.row.name }}
          </template>
        </template>
      </el-table-column>
      <el-table-column :label="$t('warehouse.enabled.label')" prop="enabled">
        <template slot-scope="scope">
          <el-tag :type="scope.row.enabled | enableFilter">
            {{ scope.row.enabled ? '启用' : '禁用' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="$t('warehouse.posId.label')" prop="posId" >
        <template slot-scope="scope">
          <el-input v-if="scope.row.edit" v-model="scope.row.posId" class="edit-input" size="mini"/>
          <template v-else>
            {{ scope.row.posId }}
          </template>
        </template>
      </el-table-column>
      <el-table-column :label="$t('warehouse.posAddress.label')" prop="posAddress" />
      <el-table-column label="操作" min-width="100px">
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
              <el-button v-if="!scope.row.enabled" type="success" size="mini" @click="handleEnable(scope.row, true)">
                启用
              </el-button>
              <el-button v-else type="danger" size="mini" @click="handleEnable(scope.row, false)">
                禁用
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

    <el-dialog :visible.sync="warehouseCreate.visible" :title="$t('warehouse.create.title')">
      <el-form
        ref="createWarehouseForm"
        :rules="warehouseCreate.rules"
        :model="warehouseCreate.form"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item :label="$t('warehouse.create.code.label')" prop="code">
          <el-input
            v-model="warehouseCreate.form.code"
            :placeholder="$t('warehouse.create.code.placeholder')"
          />
        </el-form-item>
        <el-form-item :label="$t('warehouse.create.name.label')" prop="name">
          <el-input
            v-model="warehouseCreate.form.name"
            :placeholder="$t('warehouse.create.name.placeholder')"
          />
        </el-form-item>
        <el-form-item :label="$t('warehouse.create.enabled.label')" prop="enabled">
          <el-radio v-model="warehouseCreate.form.enabled" label="true">
            {{ $t('warehouse.create.enabled.yes') }}
          </el-radio>
          <el-radio v-model="warehouseCreate.form.enabled" label="false">
            {{ $t('warehouse.create.enabled.no') }}
          </el-radio>
        </el-form-item>
        <el-form-item :label="$t('warehouse.create.posId.label')" prop="posId">
          <el-input
            v-model="warehouseCreate.form.posId"
            :placeholder="$t('warehouse.create.posId.placeholder')"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="warehouseCreate.visible = false">
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
import { getWarehouses, createWarehouse, deleteWarehouse, enableWarehouse, updateWarehouse } from '@/api/warehouse'
import { isEmpty } from '@/utils/validate'

export default {
  name: 'WarehouseList',
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
        data: null,
        select: []
      },
      warehouseCreate: {
        visible: false,
        rules: {
          code: [{ required: true, message: '编码不能为空', trigger: 'change' }],
          name: [{ required: true, message: '名称不能为空', trigger: 'change' }],
          enabled: [{ required: true, message: '是否启用不能为空', trigger: 'change' }]
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
      this.$refs['warehouseQuery'].resetFields()
    },
    handleSizeChange(val) {
      this.warehouseQuery.pageSize = val
      this.getData()
    },
    handleCurrentChange(val) {
      this.warehouseQuery.pageNum = val
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
        this.search.loading = false
      })
    },
    cancelEdit(row) {
      const originRow = JSON.parse(row.original)
      row.code = originRow.code
      row.name = originRow.name
      row.enabled = originRow.email
      row.edit = false
    },
    handleCreate() {
      this.warehouseCreate.form = {
        code: '',
        name: '',
        enabled: 'true',
        posId: ''
      }
      this.warehouseCreate.visible = true
      this.$nextTick(() => {
        this.$refs['createWarehouseForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['createWarehouseForm'].validate((valid) => {
        if (valid) {
          createWarehouse(this.warehouseCreate.form).then((response) => {
            response.data.edit = false
            this.table.data.unshift(response.data)
            response.data.original = JSON.stringify(response.data)
            this.pagination.total = this.pagination.total + 1
            this.warehouseCreate.visible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          }).catch(() => {
            this.$notify({
              title: '失败',
              message: '编码已存在',
              type: 'error',
              duration: 2000
            })
          })
        }
      })
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
      deleteWarehouse(this.table.select).then((response) => {
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
    handleSelectionChange(val) {
      this.table.select = val
    },
    handleEnable(row, enable) {
      const warehouseEnableForm = Object.assign({}, row)
      warehouseEnableForm.enabled = enable
      enableWarehouse([warehouseEnableForm]).then(
        () => {
          for (const v of this.table.data) {
            if (v.id === warehouseEnableForm.id) {
              const index = this.table.data.indexOf(v)
              this.table.data.splice(index, 1, warehouseEnableForm)
              break
            }
          }
          this.$notify({
            title: '成功',
            message: '更新成功',
            type: 'success',
            duration: 2000
          })
        }
      ).catch(() => {
        this.$notify({
          title: '失败',
          message: '更新失败',
          type: 'error',
          duration: 2000
        })
      })
    },
    handleEnables(enable) {
      if (this.table.select.length <= 0) {
        this.$message({
          message: '请选择用户',
          type: 'error',
          duration: 2 * 1000
        })
        return
      }
      this.table.select.forEach((v) => {
        v.enabled = enable
      })
      enableWarehouse(this.table.select).then(
        this.$notify({
          title: '成功',
          message: '更新成功',
          type: 'success',
          duration: 2000
        })
      ).catch(() => {
        this.$notify({
          title: '失败',
          message: '更新失败',
          type: 'error',
          duration: 2000
        })
      })
    },
    confirmEdit(row) {
      if (isEmpty(row.name)) {
        this.$message({
          message: '仓库名称不能为空',
          type: 'error',
          duration: 5 * 1000
        })
        return
      }
      updateWarehouse(row).then(response => {
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
          message: '请选择仓库',
          type: 'error',
          duration: 2 * 1000
        })
        return
      }
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['仓库编码', '仓库名称', '是否启用', '所属供货点', '仓库地址']
        const filterVal = ['code', 'name', 'enabled', 'posId', 'posAddress']

        const data = this.table.select.map(u => filterVal.map(field => {
          return u[field]
        }))
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '仓库列表'
        })
        this.downloadLoading = false
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
