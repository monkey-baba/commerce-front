<template>
  <div class="app-container">
    <div class="filter-container">
      <ElForm ref="groupQuery" :model="groupQuery" :inline="true">
        <ElRow>
          <ElCol>
            <ElFormItem :label=" $t('group.code.label')+':' " prop="code">
              <ElInput v-model="groupQuery.code" auto-complete="on" />
            </ElFormItem>
            <ElFormItem :label=" $t('group.name.label')+':' " prop="name">
              <ElInput v-model="groupQuery.name" auto-complete="on" />
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
      <ElButton type="danger" size="small" @click="handleDeletes">
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
      @selection-change="handleSelectionChange"
    >
      <ElTableColumn type="selection" />
      <ElTableColumn :label="$t('general.index')" type="index" />
      <ElTableColumn :label="$t('group.code.label')" prop="code">
        <template slot-scope="scope">
          <el-input v-if="scope.row.edit" v-model="scope.row.code" class="edit-input" size="mini" />
          <template v-else>
            {{ scope.row.code }}
          </template>
        </template>
      </ElTableColumn>
      <ElTableColumn :label="$t('group.name.label')" prop="name">
        <template slot-scope="scope">
          <el-input v-if="scope.row.edit" v-model="scope.row.name" class="edit-input" size="mini" />
          <template v-else>
            {{ scope.row.name }}
          </template>
        </template>
      </ElTableColumn>
      <ElTableColumn :label="$t('group.description.label')" prop="description">
        <template slot-scope="scope">
          <el-input v-if="scope.row.edit" v-model="scope.row.description" class="edit-input" size="mini" />
          <template v-else>
            {{ scope.row.description }}
          </template>
        </template>
      </ElTableColumn>
      <ElTableColumn :label="$t('group.roles.label')" prop="roles">
        <template slot-scope="scope">
          <ElTag v-for="r in scope.row.roles" :key="r" type="primary">
            {{ r }}
          </ElTag>
        </template>
      </ElTableColumn>
      <ElTableColumn label="操作" min-width="200px">
        <template slot-scope="scope">
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
          <ElButton type="success" size="mini" @click="handleRole(scope.row)">
            角色分配
          </ElButton>
          <ElButton type="danger" size="mini" @click="handleDelete(scope.row)">
            删除
          </ElButton>
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

    <ElDialog :visible.sync="groupCreate.visible" :title="$t('group.create.title')">
      <ElForm
        ref="createGroupForm"
        :rules="groupCreate.rules"
        :model="groupCreate.form"
        label-position="left"
        label-width="100px"
        style="width: 400px; margin-left:50px;"
      >
        <ElFormItem :label="$t('group.create.code.label')" prop="code">
          <ElInput
            v-model="groupCreate.form.code"
            :placeholder="$t('group.create.code.placeholder')"
          />
        </ElFormItem>
        <ElFormItem :label="$t('group.create.name.label')" prop="name">
          <ElInput
            v-model="groupCreate.form.name"
            :placeholder="$t('group.create.name.placeholder')"
          />
        </ElFormItem>
        <ElFormItem :label="$t('group.create.description.label')" prop="description">
          <ElInput
            v-model="groupCreate.form.description"
            :placeholder="$t('group.create.description.placeholder')"
          />
        </ElFormItem>
      </ElForm>
      <div slot="footer" class="dialog-footer">
        <ElButton @click="groupCreate.visible = false">
          {{ $t('table.cancel') }}
        </ElButton>
        <ElButton type="primary" @click="createData">
          {{ $t('table.confirm') }}
        </ElButton>
      </div>
    </ElDialog>
    <ElDialog :visible.sync="changeRole.visible" :title="$t('group.changeRole.title')" width="750px">
      <ElTransfer v-model="changeRole.value" :data="changeRole.data" :titles="['可选角色','已选角色']" filterable />
      <div slot="footer" class="dialog-footer">
        <ElButton @click="changeRole.visible = false">
          {{ $t('table.cancel') }}
        </ElButton>
        <ElButton type="primary" @click="changeGroupRole">
          {{ $t('table.confirm') }}
        </ElButton>
      </div>
    </ElDialog>
  </div>
</template>

<script>
import { getGroups, updateGroup, createGroup, deleteGroup } from '@/api/group'
import { groupRole, updateGroupRole } from '@/api/role'
import { isCharOrNumber, isEmpty } from '@/utils/validate'
import store from '../../store'

export default {
  name: 'Group',
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
    const validateGroupCode = (rule, value, callback) => {
      if (!isCharOrNumber(value)) {
        callback(new Error('编码为字母数字组成'))
      } else {
        callback()
      }
    }
    return {
      groupQuery: {
        code: '',
        name: '',
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
      groupCreate: {
        visible: false,
        rules: {
          name: [{ required: true, message: '用户组名称不能为空', trigger: 'change' }],
          code: [{ required: true, validator: validateGroupCode, trigger: 'change' }]
        },
        form: {}
      },
      changeRole: {
        visible: false,
        groupId: undefined,
        data: [],
        value: []
      },
      downloadLoading: false
    }
  },
  created() {
    this.getData()
  },
  methods: {
    resetQuery() {
      this.$refs['groupQuery'].resetFields()
    },
    handleSizeChange(val) {
      this.groupQuery.pageSize = val
      this.getData()
    },
    handleCurrentChange(val) {
      this.groupQuery.pageNum = val
      this.getData()
    },
    getData() {
      this.table.loading = true
      getGroups(this.groupQuery).then(response => {
        const items = response.data.list
        this.table.data = items.map(v => {
          this.$set(v, 'edit', false) // https://vuejs.org/v2/guide/reactivity.html
          v.original = JSON.stringify(v) //  will be used when group click the cancel botton
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
      row.code = originRow.code
      row.name = originRow.name
      row.description = originRow.description
      row.edit = false
    },
    confirmEdit(row) {
      if (!isCharOrNumber(row.code)) {
        this.$message({
          message: '编码为字母数字组成',
          type: 'error',
          duration: 5 * 1000
        })
        return
      }
      if (isEmpty(row.name)) {
        this.$message({
          message: '用户组名称不能为空',
          type: 'error',
          duration: 5 * 1000
        })
        return
      }
      updateGroup(row).then(response => {
        this.$message({
          message: response.data,
          type: 'success'
        })
        if (JSON.parse(row.original).id === store.getters.currentgroupId &&
            JSON.parse(row.original).username !== row.username) {
          setTimeout(() => {
            store.dispatch('FedLogOut').then(() => {
              this.$message({
                message: '登录已过期，请重新登录',
                type: 'error',
                duration: 5 * 1000
              })
              this.$router.push({ path: '/login' })
            })
          }, 1000)
        }
        row.original = JSON.stringify(row)
        row.edit = false
      }).catch(e => {
        this.$notify({
          title: '失败',
          message: '用户组编码已存在',
          type: 'error',
          duration: 2000
        })
        this.cancelEdit(row)
      })
    },
    handleCreate() {
      this.groupCreate.form = {
        code: '',
        name: '',
        description: ''
      }
      this.groupCreate.visible = true
      this.$nextTick(() => {
        this.$refs['createGroupForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['createGroupForm'].validate((valid) => {
        if (valid) {
          createGroup(this.groupCreate.form).then((response) => {
            this.table.data.unshift(response.data)
            this.pagination.total = this.pagination.total + 1
            this.groupCreate.visible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          }).catch(() => {
            this.$notify({
              title: '失败',
              message: '用户组编码已存在',
              type: 'error',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row) {
      this.$confirm('确认删除？', '提示', {
        type: 'warning'
      }).then(() => {
        deleteGroup([{ id: row.id }]).then(
          () => {
            for (const v of this.table.data) {
              if (v.id === row.id) {
                const index = this.table.data.indexOf(v)
                this.table.data.splice(index, 1)
                break
              }
            }
            this.$notify({
              title: '成功',
              message: '删除成功',
              type: 'success',
              duration: 2000
            })
          }
        ).catch(() => {
          this.$notify({
            title: '失败',
            message: '删除失败',
            type: 'error',
            duration: 2000
          })
        })
      }).catch((e) => {})
    },
    handleSelectionChange(val) {
      this.table.select = val
    },
    handleDeletes() {
      if (this.table.select.length <= 0) {
        this.$message({
          message: '请选择用户组',
          type: 'error',
          duration: 2 * 1000
        })
        return
      }
      this.$confirm('确认删除？', '提示', {
        type: 'warning'
      }).then(() => {
        deleteGroup(this.table.select).then(() => {
          for (const v of this.table.select) {
            const index = this.table.data.indexOf(v)
            this.table.data.splice(index, 1)
          }
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
      }).catch((e) => {})
    },
    handleRole(row) {
      this.changeRole.groupId = row.id
      groupRole(row.id).then(response => {
        const data = response.data
        this.changeRole.data = data
        this.changeRole.value = data.filter(r => r.exists).map(r => r.key)
        this.changeRole.visible = true
      }).catch(() => {
        this.$notify({
          title: '失败',
          message: '获取用户组失败，请稍后再试',
          type: 'error',
          duration: 2000
        })
      })
    },
    changeGroupRole() {
      updateGroupRole(this.changeRole.groupId, this.changeRole.value).then(response => {
        this.changeRole.visible = false
        for (const v of this.table.data) {
          if (v.id === this.changeRole.groupId) {
            console.log(JSON.stringify(v))
            v.roles = response.data.roleNames
            console.log(JSON.stringify(v))
            break
          }
        }
        this.$notify({
          title: '成功',
          message: '更新成功',
          type: 'success',
          duration: 2000
        })
      }).catch(() => {
        this.$notify({
          title: '失败',
          message: '更新角色失败，请稍后再试',
          type: 'error',
          duration: 2000
        })
        this.changeRole.visible = false
      }
      )
    },
    handleExport() {
      if (this.table.select.length <= 0) {
        this.$message({
          message: '请选择用户组',
          type: 'error',
          duration: 2 * 1000
        })
        return
      }
      this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['编码', '用户组名称', '描述', '角色']
          const filterVal = ['code', 'name', 'description', 'roles']

          const data = this.table.select.map(u => filterVal.map(field => {
            return u[field]
          }))
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: '用户组列表'
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

  .el-transfer {
    text-align: center;
  }

  .el-transfer * {
    text-align: left;
  }

  .el-transfer .el-transfer-panel {
    width: 250px;
  }
</style>
