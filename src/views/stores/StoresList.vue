<template>
  <div class="app-container">
    <div class="filter-container">

      <ElForm ref="storeQuery" :model="storeQuery" :inline="true">
        <ElRow>
          <ElCol>
            <ElFormItem :label=" $t('store.name.name')+':' " prop="name">
              <ElInput v-model="storeQuery.name" />
            </ElFormItem>
            <ElFormItem :label=" $t('store.code.code')+':' " prop="code">
              <ElInput v-model="storeQuery.code"/>
            </ElFormItem>
          </ElCol>
          <ElCol>

            <el-form-item label="门店分类:" prop="classification">
              <el-select v-model="storeQuery.classification" auto-complete="on">
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"/>
              </el-select>
            </el-form-item>

            <el-form-item label="门店状态:" prop="status">
              <el-select v-model="storeQuery.status" auto-complete="on">
                <el-option
                  v-for="item in optionsStatus"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"/>
              </el-select>
            </el-form-item>

            <ElFormItem :label=" $t('store.people.name')+':' " prop="people">
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
      <ElButton type="primary" class="blue-btn" size="small" @click="handleCreate">新建门店</ElButton>
      <ElButton type="primary" class="green-btn" size="small">导出列表</ElButton>
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

      <ElTableColumn type="selection" width="50px"/>
      <ElTableColumn label="门店名称" prop="name" />
      <ElTableColumn label="门店地址" prop="detailaddress"/>
      <ElTableColumn label="操作" prop="paddress">
        <template slot-scope="scope">
          <address-line v-model="paddress"/>
        </template>

        <template>
          <span class="address-line">{{ paddress }}</span>
        </template>

      </ElTableColumn>
      <ElTableColumn label="门店状态" prop="pstatus"/>
      <ElTableColumn label="负责人" prop="owner"/>
      <ElTableColumn label="操作">
        <template slot-scope="scope">
          <ElButton type="primary" class="green-btn" size="mini">编辑</ElButton>
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
        <ElFormItem :label="$t('store.create.name.label')" prop="name">
          <ElInput
            v-model="storeCreate.form.name"
            :placeholder="$t('store.create.name.placeholder')"
          />
        </ElFormItem>
        <ElFormItem :label="$t('store.create.code.label')" prop="code">
          <ElInput
            v-model="storeCreate.form.code"
            :placeholder="$t('store.create.code.placeholder')"
          />
        </ElFormItem>

        <ElFormItem :label="$t('store.create.address.label')" prop="address">
          <address-select v-model="storeCreate.form.paddress" />
        </ElFormItem>

        <ElFormItem :label="$t('store.create.detailaddress.label')" prop="detailaddress">
          <ElInput
            v-model="storeCreate.form.detailaddress"
            :placeholder="$t('store.create.detailaddress.placeholder')"
          />
        </ElFormItem>

        <ElFormItem :label="$t('store.create.contact.label')" prop="contact">
          <ElInput
            v-model="storeCreate.form.contact"
            :placeholder="$t('store.create.contact.placeholder')"
          />
        </ElFormItem>

        <ElFormItem :label="$t('store.create.owner.label')" prop="owner">
          <ElInput
            v-model="storeCreate.form.owner"
            :placeholder="$t('store.create.owner.placeholder')"
          />
        </ElFormItem>

        <el-form-item label="门店分类" prop="classification">
          <el-select v-model="storeCreate.form.classification" auto-complete="on">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item.id"/>
          </el-select>
        </el-form-item>

        <el-form-item label="门店状态" prop="status">
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
import { getStores, getClassifyData, getStatusData, createStore } from '@/api/store'
import AddressSelect from '@/components/Address/addressSelect'
import AddressLine from '../../components/Address/addressLine'

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
        data: null
      },
      options: [],
      optionsStatus: [],

      storeCreate: {
        visible: false,
        rules: {
          name: [{ required: true, message: '用户姓名不能为空', trigger: 'change' }],
          code: [{ required: true, message: '编码不能为空', trigger: 'change' }],
          status: [{ required: true, message: '门店状态不能为空', trigger: 'change' }],
          classification: [{ required: true, message: '门店分类不能为空', trigger: 'change' }],
          detailaddress: [{ required: true, message: '门店详细地址不能为空', trigger: 'change' }],
          contact: [{ required: true, message: '联系方式不能为空', trigger: 'change' }],
          owner: [{ required: true, message: '负责人不能为空', trigger: 'change' }]
        },
        form: {}
      },

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
              message: '门店创建失败',
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
      this.getData()
      this.getClassifysData()
      this.getStatusListData()
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
