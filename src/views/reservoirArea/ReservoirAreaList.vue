<template>
  <div class="app-container">
    <div class="filter-container">

      <ElForm ref="storeQuery" :model="storeQuery" :inline="true">
        <ElRow>
          <ElCol>
            <ElFormItem label="大仓名称:" prop="name">
              <ElInput v-model="storeQuery.name" />
            </ElFormItem>
            <ElFormItem label="大仓编号:" prop="code">
              <ElInput v-model="storeQuery.code"/>
            </ElFormItem>
          </ElCol>
          <ElCol>
            <el-form-item label="大仓分类:" prop="classification">
              <el-select v-model="storeQuery.classification" auto-complete="on">
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"/>
              </el-select>
            </el-form-item>

            <el-form-item label="大仓状态:" prop="status">
              <el-select v-model="storeQuery.status" auto-complete="on">
                <el-option
                  v-for="item in optionsStatus"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"/>
              </el-select>
            </el-form-item>

            <ElFormItem label="负责人员:" prop="people">
              <ElInput v-model="storeQuery.people"/>
            </ElFormItem>
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
      <ElButton type="primary" class="blue-btn" size="small" @click="handleCreate">新建大仓</ElButton>
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
      @selection-change="handleSelectionChange"
    >

      <ElTableColumn type="selection"/>

      <ElTableColumn label="大仓名称" prop="name">
        <template slot-scope="scope">
          <el-input v-if="scope.row.edit" v-model="scope.row.name" class="edit-input" size="mini"/>
          <template v-else>
            <router-link :to="{name:'ReservoirAreaDetail',params: {id: scope.row.id ,name:scope.row.name,paddress:scope.row.paddress,contact:scope.row.contact}}" class="link-type"> {{ scope.row.name }}</router-link>
          </template>
        </template>
      </ElTableColumn>
      <ElTableColumn label="大仓地址" prop="paddress" min-width="200px" position="absolute" >
        <template slot-scope="scope">
          <address-select v-if="scope.row.edit" v-model="scope.row.paddress" class="edit-input"/>
          <el-input v-if="scope.row.edit" v-model="scope.row.detailaddress" class="edit-input" size="mini"/>
          <el-input v-if="scope.row.edit" v-model="scope.row.id" class="edit-input" size="mini" style="display:none"/>
          <el-input v-if="scope.row.edit" v-model="scope.row.contact" class="edit-input" size="mini" style="display:none"/>
          <template v-else>
            <address-line v-model="scope.row.paddress"/>
            <span style="margin-left: 10px">{{ scope.row.detailaddress }}</span>
            <span style="display:none">{{ scope.row.id }}</span>
            <span style="display:none">{{ scope.row.contact }}</span>
          </template>
        </template>
      </ElTableColumn>
      <ElTableColumn label="大仓状态" prop="pstatus">
        <template slot-scope="scope">
          <el-select v-if="scope.row.edit" v-model="scope.row.status" auto-complete="on" size="mini">
            <el-option
              v-for="item in optionsStatus"
              :key="item.id"
              :label="item.name"
              :value="item.id"/>
          </el-select>
          <template v-else>
            {{ scope.row.pstatus }}
            <span style="display:none">{{ scope.row.status }}</span>
          </template>
        </template>
      </ElTableColumn>
      <ElTableColumn label="负责人" prop="owner">
        <template slot-scope="scope">
          <el-input v-if="scope.row.edit" v-model="scope.row.owner" class="edit-input" size="mini"/>
          <template v-else>
            {{ scope.row.owner }}
          </template>
        </template>
      </ElTableColumn>
      <ElTableColumn label="操作" >
        <template slot-scope="scope">
          <div>
            <template v-if="scope.row.edit">
              <ElButton type="primary" size="mini" icon="el-icon-circle-check-outline" @click="confirmEdit(scope.row)">
                保存
              </ElButton>
              <ElButton
                class="cancel-btn"
                size="mini"
                icon="el-icon-refresh"
                type="warning"
                @click="cancelEdit(scope.row)"
              >
                取消
              </ElButton>
            </template>
            <template v-else>
              <ElButton type="primary" size="mini" icon="el-icon-edit" @click="scope.row.edit=!scope.row.edit">
                编辑
              </ElButton>
            </template>
          </div>

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
      @current-change="handleCurrentChange"/>

    <ElDialog :visible.sync="storeCreate.visible" :title="$t('store.create.title')">
      <ElForm
        ref="createStoreForm"
        :rules="storeCreate.rules"
        :model="storeCreate.form"
        label-position="left"
        label-width="100px"
        style="width: 400px; margin-left:50px;"
      >
        <ElFormItem label="大仓名字" prop="name">
          <ElInput
            v-model="storeCreate.form.name"
            :placeholder="$t('reservoirArea.create.name.placeholder')"
          />
        </ElFormItem>
        <ElFormItem label="大仓编码" prop="code">
          <ElInput
            v-model="storeCreate.form.code"
            :placeholder="$t('reservoirArea.create.code.placeholder')"
          />
        </ElFormItem>

        <ElFormItem label="大仓地址" prop="address">
          <address-select v-model="storeCreate.form.paddress" />
        </ElFormItem>

        <ElFormItem label="详细地址" prop="detailaddress">
          <ElInput
            v-model="storeCreate.form.detailaddress"
            :placeholder="$t('reservoirArea.create.detailaddress.placeholder')"
          />
        </ElFormItem>

        <ElFormItem label="联系方式" prop="contact">
          <ElInput
            v-model="storeCreate.form.contact"
            :placeholder="$t('reservoirArea.create.contact.placeholder')"
          />
        </ElFormItem>

        <ElFormItem label="负责人" prop="owner">
          <ElInput
            v-model="storeCreate.form.owner"
            :placeholder="$t('store.create.owner.placeholder')"
          />
        </ElFormItem>

        <el-form-item label="大仓分类" prop="classification">
          <el-select v-model="storeCreate.form.classification" auto-complete="on">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item.id"/>
          </el-select>
        </el-form-item>

        <el-form-item label="大仓状态" prop="status">
          <el-select v-model="storeCreate.form.status" auto-complete="on">
            <el-option
              v-for="item in optionsStatus"
              :key="item.id"
              :label="item.name"
              :value="item.id"/>
          </el-select>
        </el-form-item>

      </ElForm>
      <div slot="footer" class="dialog-footer">
        <ElButton @click="storeCreate.visible = false">
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
import { getStores, getClassifyData, getStatusData, createStore, updateStore } from '@/api/reservoirArea'
import AddressSelect from '@/components/Address/addressSelect'
import AddressLine from '../../components/Address/addressLine'
import { isEmpty } from '@/utils/validate'

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
      storeQuery: {
        code: '',
        name: '',
        classification: '',
        pstatus: '',
        people: '',
        status: '',
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
      options: [],
      optionsStatus: [],
      paddress: [],
      storeCreate: {
        visible: false,
        rules: {
          name: [{ required: true, message: '大仓名称不能为空', trigger: 'change' }],
          code: [{ required: true, message: '编码不能为空', trigger: 'change' }],
          status: [{ required: true, message: '大仓状态不能为空', trigger: 'change' }],
          classification: [{ required: true, message: '大仓分类不能为空', trigger: 'change' }],
          detailaddress: [{ required: true, message: '大仓详细地址不能为空', trigger: 'change' }],
          contact: [{ required: true, message: '联系方式不能为空', trigger: 'change' }],
          owner: [{ required: true, message: '负责人不能为空', trigger: 'change' }]
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
    this.getClassifysData()
    this.getStatusListData()
  },

  methods: {
    resetQuery() {
      this.$refs['storeQuery'].resetFields()
    },
    handleSizeChange(val) {
      this.storeQuery.pageSize = val
      this.getData()
      this.getClassifysData()
      this.getStatusListData()
    },
    handleCurrentChange(val) {
      this.storeQuery.pageNum = val
      this.getData()
      this.getClassifysData()
      this.getStatusListData()
    },

    handleCreate() {
      this.storeCreate.form = {
        code: '',
        name: '',
        status: '',
        classification: '',
        paddress: [],
        owner: '',
        detailaddress: '',
        contact: ''
      }
      this.storeCreate.visible = true
      this.$nextTick(() => {
        this.$refs['createStoreForm'].clearValidate()
      })
    },

    createData() {
      this.$refs['createStoreForm'].validate((valid) => {
        if (valid) {
          createStore(this.storeCreate.form).then((response) => {
            this.table.data.unshift(response.data)
            this.pagination.total = this.pagination.total + 1
            this.getData()
            this.storeCreate.visible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          }).catch(() => {
            this.$notify({
              title: '失败',
              message: '库区创建失败',
              type: 'error',
              duration: 2000
            })
          })
        }
      })
    },

    getData() {
      this.table.loading = true
      getStores(this.storeQuery).then(response => {
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

    getClassifysData() {
      this.table.loading = true
      getClassifyData().then(response => {
        this.options = response.data
        console.log(this.options)
        this.table.loading = false
        this.search.loading = false
      }).catch(() => {
        this.table.loading = false
        this.search.loading = false
      })
    },

    getStatusListData() {
      this.table.loading = true
      getStatusData().then(response => {
        this.optionsStatus = response.data
        console.log(this.optionsStatus)
        this.table.loading = false
        this.search.loading = false
      }).catch(() => {
        this.table.loading = false
        this.search.loading = false
      })
    },

    setSearchLoading() {
      // this.search.loading = false
    },
    handleSelectionChange(val) {
      this.table.select = val
    },

    query() {
      this.search.loading = true
      this.storeQuery.pageNum = 1
      this.getData()
      this.getClassifysData()
      this.getStatusListData()
    },
    cancelEdit(row) {
      const originRow = JSON.parse(row.original)
      row.name = originRow.name
      row.paddress = originRow.paddress
      row.detailaddress = originRow.detailaddress
      row.pstatus = originRow.pstatus
      row.owner = originRow.owner
      row.edit = false
    },
    confirmEdit(row) {
      if (isEmpty(row.owner)) {
        this.$message({
          message: '负责人不能为空',
          type: 'error',
          duration: 5 * 1000
        })
        return
      }

      if (isEmpty(row.detailaddress)) {
        this.$message({
          message: '库区详细地址不能为空',
          type: 'error',
          duration: 5 * 1000
        })
        return
      }
      if (isEmpty(row.name)) {
        this.$message({
          message: '库区名字不能为空',
          type: 'error',
          duration: 5 * 1000
        })
        return
      }
      updateStore(row).then(response => {
        this.$message({
          message: response.data,
          type: 'success'
        })
        this.getData()
        row.original = JSON.stringify(row)
        row.edit = false
      }).catch(e => {
        this.$notify({
          title: '失败',
          message: '登录名已存在',
          type: 'error',
          duration: 2000
        })
        this.cancelEdit(row)
      })
    },
    handleExport() {
      if (this.table.select.length <= 0) {
        this.$message({
          message: '请选择大仓',
          type: 'error',
          duration: 2 * 1000
        })
        return
      }
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['大仓名称', '大仓地址', '大仓状态', '负责人']
        const filterVal = ['name', 'detailaddress', 'pstatus', 'owner']

        const data = this.table.select.map(u => filterVal.map(field => {
          return u[field]
        }))
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '大仓列表'
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

</style>
