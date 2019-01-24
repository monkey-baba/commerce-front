<template>
  <div class="app-container">
    <div class="filter-container">
      <ElForm ref="priceQuery" :model="priceQuery" :inline="true">
        <ElRow>
          <ElCol>
            <ElFormItem :label=" $t('price.name.name')+':' " prop="name">
              <ElInput v-model="priceQuery.name" :placeholder="$t('price.name.placeholder')" auto-complete="on"/>
            </ElFormItem>
          </ElCol>
        </ElRow>
        <ElRow>
          <ElCol>
            <ElFormItem :label=" $t('price.channelId.name')+':' " prop="channelId">
              <ElSelect v-model="priceQuery.channelId" auto-complete="on">
                <el-option
                  v-for="item in channel"
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
      <ElButton type="primary" class="blue-btn" size="small" @click="handleCreate">创建</ElButton>
      <el-button type="primary" size="small" class="el-icon-delete" @click="handleDeletes">删除</el-button>
      <ElButton :loading="downloadLoading" type="primary" class="green-btn" size="small" @click="handleExport">导出</ElButton>
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
      <ElTableColumn :label="$t('price.name.name')" prop="name">
        <template slot-scope="scope">
          <ElInput v-if="scope.row.edit" v-model="scope.row.name" class="edit-input" size="mini"/>
          <template v-else>
            {{ scope.row.name }}
          </template>
        </template>
      </ElTableColumn>
      <ElTableColumn :label="$t('price.channelId.name')" prop="channelId">
        <template slot-scope="scope">
          <ElSelect v-if="scope.row.edit" v-model="scope.row.channelId" auto-complete="on">
            <el-option
              v-for="item in channel"
              :key="item.id"
              :label="item.name"
              :value="item.id"/>
          </ElSelect>
          <template v-else>
            {{ channelMap[scope.row.channelId] }}
          </template>
        </template>
      </ElTableColumn>
      <ElTableColumn :label="$t('price.priority.name')" prop="priority">
        <template slot-scope="scope">
          <ElInput v-if="scope.row.edit" v-model="scope.row.priority" class="edit-input" size="mini"/>
          <template v-else>
            {{ scope.row.priority }}
          </template>
        </template>
      </ElTableColumn>
      <ElTableColumn :label="$t('price.startTime.name')" prop="startTime">
        <template slot-scope="scope">
          <ElInput v-if="scope.row.edit" v-model="scope.row.startTime" class="edit-input" size="mini" type="datetime"/>
          <template v-else>
            {{ scope.row.startTime }}
          </template>
        </template>
      </ElTableColumn>
      <ElTableColumn :label="$t('price.endTime.name')" prop="endTime">
        <template slot-scope="scope">
          <ElInput v-if="scope.row.edit" v-model="scope.row.endTime" class="edit-input" size="mini" type="datetime"/>
          <template v-else>
            {{ scope.row.endTime }}
          </template>
        </template>
      </ElTableColumn>
      <ElTableColumn :label="$t('price.active.name')" prop="active">
        <template slot-scope="scope">
          <ElInput v-if="scope.row.edit" v-model="scope.row.active" class="edit-input" size="mini"/>
          <template v-else>
            {{ scope.row.active }}
          </template>
        </template>
      </ElTableColumn>
      <ElTableColumn label="操作" min-width="200px">
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
      @current-change="handleCurrentChange"
    />

    <ElDialog :visible.sync="priceCreate.visible" :title="$t('price.create.title')">
      <ElForm
        ref="createPriceForm"
        :rules="priceCreate.rules"
        :model="priceCreate.form"
        label-position="left"
        label-width="85px"
        style="width: 400px; margin-left:50px;"
      >
        <ElFormItem :label="$t('price.name.name')" prop="name">
          <ElInput
            v-model="priceCreate.form.name"
            :placeholder="$t('price.name.placeholder')"
          />
        </ElFormItem>
        <ElFormItem :label="$t('price.channelId.name')" prop="channelId">
          <ElSelect v-model="priceCreate.form.channelId" auto-complete="on">
            <el-option
              v-for="item in channel"
              :key="item.id"
              :label="item.name"
              :value="item.id"/>
          </ElSelect>
        </ElFormItem>
        <ElFormItem :label="$t('price.priority.name')" prop="priority">
          <ElInput
            v-model="priceCreate.form.priority"
            :placeholder="$t('price.priority.placeholder')"
          />
        </ElFormItem>
        <el-form-item :label="$t('price.active.name')" prop="active">
          <el-radio v-model="priceCreate.form.active" label="true">
            {{ $t('price.active.true') }}
          </el-radio>
          <el-radio v-model="priceCreate.form.active" label="false">
            {{ $t('price.active.false') }}
          </el-radio>
        </el-form-item>
        <ElFormItem :label="$t('price.startTime.name')" prop="startTime">
          <ElDatePicker
            v-model="priceCreate.form.startTime"
            :placeholder="$t('price.startTime.placeholder')"
            type="datetime"
          />
        </ElFormItem>
        <ElFormItem :label="$t('price.endTime.name')" prop="endTime">
          <ElDatePicker
            v-model="priceCreate.form.endTime"
            :placeholder="$t('price.endTime.placeholder')"
            type="datetime"
          />
        </ElFormItem>
      </ElForm>
      <div slot="footer" class="dialog-footer">
        <ElButton @click="priceCreate.visible = false">
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
import { getPrices, updatePrice, createPrice, deletePrice, getChannel } from '@/api/price'
import { isEmpty } from '@/utils/validate'

export default {
  name: 'Price',
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
      priceQuery: {
        name: '',
        channelId: [],
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
      priceCreate: {
        visible: false,
        rules: {
        },
        form: {}
      },
      downloadLoading: false,
      channel: [],
      channelMap: {}
    }
  },
  created() {
    this.getData()
    this.initChannel()
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
    getData() {
      this.table.loading = true
      getPrices(this.priceQuery).then(response => {
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
    },
    cancelEdit(row) {
      const originRow = JSON.parse(row.original)
      row.name = originRow.name
      row.channelId = originRow.channelId
      row.active = originRow.active
      row.priority = originRow.priority
      row.startTime = originRow.startTime
      row.endTime = originRow.endTime
      row.edit = false
    },
    confirmEdit(row) {
      if (isEmpty(row.name)) {
        this.$message({
          message: '价目表名称不能为空',
          type: 'error',
          duration: 5 * 1000
        })
        return
      }
      updatePrice(row).then(response => {
        this.$message({
          message: response.data,
          type: 'success'
        })
        row.original = JSON.stringify(row)
        row.edit = false
      }).catch(e => {
        const response = e.response
        this.$message({
          message: response !== undefined ? response.data : e.message,
          type: 'error',
          duration: 5 * 1000
        })
        this.cancelEdit(row)
      })
    },
    handleCreate() {
      this.priceCreate.form = {
        code: '',
        name: '',
        channelId: '',
        approvedId: ''
      }
      this.priceCreate.visible = true
      this.$nextTick(() => {
        this.$refs['createPriceForm'].clearValidate()
      })
    },
    handleDeletes() {
      if (this.table.select.length <= 0) {
        this.$message({
          message: '请选择价目表',
          type: 'error',
          duration: 2 * 1000
        })
        return
      }
      deletePrice(this.table.select).then((response) => {
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
      this.$refs['createPriceForm'].validate((valid) => {
        if (valid) {
          createPrice(this.priceCreate.form).then((response) => {
            this.table.data.unshift(response.data)
            this.priceCreate.visible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          }).catch(() => {
            this.$notify({
              title: '失败',
              message: '价目表创建失败',
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
          message: '请选择价目表',
          type: 'error',
          duration: 2 * 1000
        })
        return
      }
      this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['价目表名称', '应用渠道', '优先级', '开始时间', '结束时间', '是否启用']
          const filterVal = ['name', 'channelId', 'priority', 'startTime', 'endTime', 'active']

          const data = this.table.select.map(u => filterVal.map(field => {
            return u[field]
          }))
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: '价目表列表'
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
    height: 1px;
  }
  .el-transfer * {
    text-align: left;
  }

</style>
