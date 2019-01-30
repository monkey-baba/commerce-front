<template>
  <div class="app-container">
    <div class="filter-container">

      <ElForm ref="storeQuery" :model="storePosQuery" :inline="true">
        <ElRow>
          <ElCol>
            <ElFormItem label="网店编码" prop="storecode">
              <ElInput v-model="storePosQuery.storecode"/>
            </ElFormItem>
            <ElFormItem label="网店名字" prop="storename">
              <ElInput v-model="storePosQuery.storename" />
            </ElFormItem>
          </ElCol>
          <ElCol>
            <ElFormItem label="供货点编码" prop="poscode">
              <ElInput v-model="storePosQuery.poscode"/>
            </ElFormItem>
            <ElFormItem label="供货点名字" prop="posname">
              <ElInput v-model="storePosQuery.posname" />
            </ElFormItem>
            <el-form-item label="供货点类型:" prop="classification">
              <el-select v-model="storePosQuery.classification" auto-complete="on">
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"/>
              </el-select>
            </el-form-item>
          </ElCol>
        </ElRow>
        <ElRow>
          <ElFormItem>
            <ElCol>
              <ElButton :loading="search.loading" type="primary" icon="el-icon-search" size="small" @click="query">查询
              </ElButton>
              <ElButton size="small" @click="resetQuery">重置</ElButton>
            </ElCol>
          </ElFormItem>
        </ElRow>

      </ElForm>
    </div>
    <hr>
    <div class="filter-container">
      <ElButton type="primary" class="blue-btn" size="small" @click="handleCreate">新建</ElButton>
      <ElButton :loading="downloadLoading" type="primary" class="el-icon-delete" size="small" @click="handleDeletes">
        删除
      </ElButton>
      <ElButton :loading="downloadLoading" type="primary" class="green-btn" size="small" @click="handleExport">
        导出
      </ElButton>
    </div>
    <ElTable
      v-loading="table.loading"
      :data="table.data"
      border
      fit
      stripe
      highlight-current-row
      @selection-change="handleSelectionChange">

      <ElTableColumn type="selection"/>
      <ElTableColumn :label="$t('general.index')" type="index"/>
      <ElTableColumn label="网店编码" prop="storeCode" />
      <ElTableColumn label="网店名称" prop="storeName"/>
      <ElTableColumn label="供货点编码" prop="posCode" />
      <ElTableColumn label="供货点名称" prop="posName"/>
      <ElTableColumn label="供货点类型" prop="posTypeName" />
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
      @current-change="handleCurrentChange"/>

    <ElDialog :visible.sync="storePosCreate.visible" :title="$t('store.create.title')">
      <ElForm
        ref="createStoreForm"
        :rules="storePosCreate.rules"
        :model="storePosCreate.form"
        label-position="left"
        label-width="100px"
        style="width: 400px; margin-left:50px;"
      >

        <el-form-item label="网店" prop="store">
          <el-select v-model="storePosCreate.form.store" auto-complete="on">
            <el-option
              v-for="item in optionStore"
              :key="item.id"
              :label="item.name"
              :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="供货点" prop="posId">
          <el-input :placeholder="$t('storePos.posId.placeholder')" :value="pos.name" readonly @click.native="handleSearchPos" >
            <i slot="suffix" class="el-icon-close" @click="deleteSelectPos" @click.stop/>
          </el-input>
        </el-form-item>
      </ElForm>
      <div slot="footer" class="dialog-footer">
        <ElButton @click="storePosCreate.visible = false">
          {{ $t('table.cancel') }}
        </ElButton>
        <ElButton type="primary" @click="createData">
          {{ $t('table.confirm') }}
        </ElButton>
      </div>
    </ElDialog>
    <el-dialog :visible.sync="posDialog.visible" :title="$t('pos.search.title')">
      <div class="filter-container">
        <el-form ref="posQuery" :model="posQuery" :inline="true">
          <el-row>
            <el-col>
              <el-form-item label="供货点编码： " prop="code">
                <el-input v-model="posQuery.code" auto-complete="on"/>
              </el-form-item>
              <el-form-item label=" 供货点名称：" prop="name">
                <el-input v-model="posQuery.name" auto-complete="on"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item>
              <el-col>
                <el-button :loading="posSearch.loading" type="primary" icon="el-icon-search" size="small" @click="queryPos">查询
                </el-button>
                <el-button size="small" @click="resetPosQuery">重置</el-button>
              </el-col>
            </el-form-item>
          </el-row>
        </el-form>
      </div>
      <el-table
        v-loading="posTable.loading"
        :data="posTable.data"
        border
        fit
        stripe
        highlight-current-row
        @current-change="selectPos">
        <el-table-column :label="$t('general.index')" type="index" />
        <el-table-column label="供货点编码" prop="code" />
        <el-table-column label="供货点名字" prop="name" />
      </el-table>

      <el-pagination
        :current-page="posPagination.page"
        :page-sizes="posPagination.pageSizes"
        :total="posPagination.total"
        :background="posPagination.backposground"
        align="right"
        layout="total, sizes, prev, pager, next, jumper"
        style="width: 100%"
        @size-change="handlePosSizeChange"
        @current-change="handlePosCurrentChange"/>
      <div slot="footer" class="dialog-footer">
        <el-button @click="posDialog.visible = false">
          {{ $t('table.cancel') }}
        </el-button>
        <el-button type="primary" @click="handleSelectPos">
          {{ $t('table.confirm') }}
        </el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
import AddressSelect from '@/components/Address/addressSelect'
import AddressLine from '../../components/Address/addressLine'
import { getPosList, getBaseStoreData, createStorePos, getPosTypeData, getStorePos, deleteStorePos } from '@/api/storePos'

export default {
  name: 'StoreList',
  components: { AddressLine, AddressSelect },
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
      storePosQuery: {
        storecode: '',
        storename: '',
        poscode: '',
        posname: '',
        posTypeName: '',
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
      pos: {
        name: ''
      },
      posQuery: {
        code: '',
        name: '',
        pageNum: 1,
        pageSize: 10
      },
      posDialog: {
        visible: false
      },
      posSearch: {
        loading: false
      },
      posTable: {
        loading: false,
        data: null
      },
      posPagination: {
        page: 0,
        total: 0,
        backposground: true,
        pageSizes: [10, 20, 50]
      },
      options: [],
      optionStore: [],
      optionsStatus: [],
      paddress: [],
      storePosCreate: {
        visible: false,
        rules: {
          store: [{ required: true, message: '用户姓名不能为空', trigger: 'change' }],
          pos: [{ required: true, message: '编码不能为空', trigger: 'change' }]
        },
        form: {}
      },
      downloadLoading: false,
      statuses: ['CREATED', 'PENDING', 'APPROVED', 'SHIPPED', 'COMPLETED'],
      platforms: ['TM', 'JD', 'DMS', 'LGT']
    }
  },
  created() {
    this.getData()
    this.getPosTypeData()
    this.getStoreData()
  },

  methods: {
    resetQuery() {
      this.$refs['storeQuery'].resetFields()
    },
    handleSizeChange(val) {
      this.storeQuery.pageSize = val
      this.getData()
      this.getStoreData()
    },
    handleCurrentChange(val) {
      this.storeQuery.pageNum = val
      this.getData()
      this.getStoreData()
    },

    handleCreate() {
      this.storePosCreate.form = {
        store: '',
        pos: ''
      }
      this.storePosCreate.visible = true
      this.$nextTick(() => {
        this.$refs['createStoreForm'].clearValidate()
      })
    },
    handleDeletes() {
      if (this.table.select.length <= 0) {
        this.$message({
          message: '请选择网店关联供货点',
          type: 'error',
          duration: 2 * 1000
        })
        return
      }
      deleteStorePos(this.table.select).then((response) => {
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
    createData() {
      this.$refs['createStoreForm'].validate((valid) => {
        if (valid) {
          createStorePos(this.storePosCreate.form).then((response) => {
            this.table.data.unshift(response.data)
            this.pagination.total = this.pagination.total + 1
            this.getData()
            this.storePosCreate.visible = false
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

    getData() {
      this.table.loading = true
      getStorePos(this.storePosQuery).then(response => {
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

    getPosTypeData() {
      this.table.loading = true
      getPosTypeData().then(response => {
        this.options = response.data
        this.table.loading = false
        this.search.loading = false
      }).catch(() => {
        this.table.loading = false
        this.search.loading = false
      })
    },

    getStoreData() {
      getBaseStoreData().then(response => {
        this.optionStore = response.data
        this.table.loading = false
        this.search.loading = false
      }).catch(() => {
        this.table.loading = false
        this.search.loading = false
      })
    },
    handlePosSizeChange(val) {
      this.posQuery.pageSize = val
      this.getPosData()
    },
    handlePosCurrentChange(val) {
      this.posQuery.pageNum = val
      this.getPosData()
    },
    resetPosQuery() {
      this.$refs['posQuery'].resetFields()
    },
    queryPos() {
      this.posSearch.loading = true
      this.posQuery.pageNum = 1
      this.getPosData()
    },
    handleSearchPos() {
      this.posDialog.visible = true
      this.posQuery.code = ''
      this.posQuery.name = ''
      this.posQuery.pageNum = 1
      this.getPosData()
    },
    deleteSelectPos() {
      this.pos.name = ''
      this.posQuery.posId = ''
    },
    selectPos(val) {
      this.currentRow = val
    },
    handleSelectPos() {
      if (this.currentRow == null) {
        this.$message({
          message: '请选择供货点',
          type: 'error',
          duration: 2 * 1000
        })
        return
      }
      this.pos.name = this.currentRow.name
      this.storePosCreate.form.pos = this.currentRow.id
      this.posDialog.visible = false
    },

    setSearchLoading() {
      // this.search.loading = false
    },
    handleSelectionChange(val) {
      this.table.select = val
    },
    getPosData() {
      this.posTable.loading = true
      getPosList(this.posQuery).then(response => {
        this.posTable.data = response.data.list
        this.posPagination.total = Number.parseInt(response.data.total)
        this.posTable.loading = false
        this.posSearch.loading = false
      }).catch(() => {
        this.posTable.loading = false
        this.posSearch.loading = false
      })
    },
    query() {
      this.search.loading = true
      this.storeQuery.pageNum = 1
      this.getData()
    },
    handleExport() {
      if (this.table.select.length <= 0) {
        this.$message({
          message: '请选择网店关联供货点',
          type: 'error',
          duration: 2 * 1000
        })
        return
      }
      this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['网店编码', '网店名称', '供货点编码', '供货点名称', '供货点类型']
          const filterVal = ['storeCode', 'storeName', 'posCode', 'posName', 'posTypeName']

          const data = this.table.select.map(u => filterVal.map(field => {
            return u[field]
          }))
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: '网店关联供货点列表'
          })
          this.downloadLoading = false
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
    height: 4px;
  }
  /*.v-modal {
    background: #000;
  }*/
  .cell,.el-table__body-wrapper,.el-table {
    overflow: visible !important;
  }

</style>
