<template>
  <div class="app-container">
    <div class="filter-container">
      <ElForm ref="userQuery" :model="userQuery" :inline="true">
        <ElRow>
          <ElCol>
            <ElFormItem :label=" $t('user.username.label')+':' " prop="username">
              <ElInput v-model="userQuery.username" auto-complete="on"/>
            </ElFormItem>
            <ElFormItem :label=" $t('user.name.label')+':' " prop="name">
              <ElInput v-model="userQuery.name" auto-complete="on"/>
            </ElFormItem>
            <ElFormItem :label=" $t('user.mobileNumber.label')+':' " prop="mobileNumber">
              <ElInput v-model="userQuery.mobileNumber" auto-complete="on"/>
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
      <ElButton type="success" size="small" @click="handleEnables(true)">
        启用
      </ElButton>
      <ElButton type="danger" size="small" @click="handleEnables(false)">
        禁用
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
      <ElTableColumn type="selection"/>
      <ElTableColumn :label="$t('general.index')" type="index"/>
      <ElTableColumn :label="$t('user.username.label')" prop="username">
        <template slot-scope="scope">
          <el-input v-if="scope.row.edit" v-model="scope.row.username" class="edit-input" size="mini"/>
          <template v-else>
            {{ scope.row.username }}
          </template>
        </template>
      </ElTableColumn>
      <ElTableColumn :label="$t('user.name.label')" prop="name">
        <template slot-scope="scope">
          <el-input v-if="scope.row.edit" v-model="scope.row.name" class="edit-input" size="mini"/>
          <template v-else>
            {{ scope.row.name }}
          </template>
        </template>
      </ElTableColumn>
      <ElTableColumn :label="$t('user.mobileNumber.label')" prop="mobileNumber">
        <template slot-scope="scope">
          <el-input v-if="scope.row.edit" v-model="scope.row.mobileNumber" class="edit-input" size="mini"/>
          <template v-else>
            {{ scope.row.mobileNumber }}
          </template>
        </template>
      </ElTableColumn>
      <ElTableColumn :label="$t('user.email.label')" prop="email">
        <template slot-scope="scope">
          <el-input v-if="scope.row.edit" v-model="scope.row.email" class="edit-input" size="mini"/>
          <template v-else>
            {{ scope.row.email }}
          </template>
        </template>
      </ElTableColumn>
      <ElTableColumn :label="$t('user.enabled.label')" prop="enabled">
        <template slot-scope="scope">
          <ElTag :type="scope.row.enabled | enableFilter">
            {{ scope.row.enabled ? '启用' : '禁用' }}
          </ElTag>
        </template>
      </ElTableColumn>
      <ElTableColumn :label="$t('user.groups.label')" prop="groups">
        <template slot-scope="scope">
          <ElTag v-for="g in scope.row.groups" :key="g" type="primary">
            {{ g }}
          </ElTag>
        </template>
      </ElTableColumn>
      <ElTableColumn :label="$t('user.roles.label')" prop="roles">
        <template slot-scope="scope">
          <ElTag v-for="r in scope.row.roles" :key="r" type="primary">
            {{ r }}
          </ElTag>
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
              <ElButton type="success" size="mini" @click="handleGroup(scope.row)">
                用户组分配
              </ElButton>
              <ElButton type="success" size="mini" @click="handleRole(scope.row)">
                角色分配
              </ElButton>
            </template>
          </div>
          <div style="margin-top: 10px">
            <ElButton type="info" size="mini" @click="handleChangePwd(scope.row)">
              修改密码
            </ElButton>
            <ElButton v-if="!scope.row.enabled" type="success" size="mini" @click="handleEnable(scope.row, true)">
              启用
            </ElButton>
            <ElButton v-else type="danger" size="mini" @click="handleEnable(scope.row, false)">
              禁用
            </ElButton>
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

    <ElDialog :visible.sync="userCreate.visible" :title="$t('user.create.title')">
      <ElForm
        ref="createUserForm"
        :rules="userCreate.rules"
        :model="userCreate.form"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left:50px;"
      >
        <ElFormItem :label="$t('user.create.username.label')" prop="username">
          <ElInput
            v-model="userCreate.form.username"
            :placeholder="$t('user.create.username.placeholder')"
          />
        </ElFormItem>
        <ElFormItem :label="$t('user.create.password.label')" prop="password">
          <ElInput
            v-model="userCreate.form.password"
            :placeholder="$t('user.create.password.placeholder')"
            type="password"
          />
        </ElFormItem>
        <ElFormItem :label="$t('user.create.enabled.label')">
          <ElRadio v-model="userCreate.form.enabled" label="true">
            {{ $t('user.create.enabled.yes') }}
          </ElRadio>
          <ElRadio v-model="userCreate.form.enabled" label="false">
            {{ $t('user.create.enabled.no') }}
          </ElRadio>
        </ElFormItem>
        <ElFormItem :label="$t('user.create.name.label')" prop="name">
          <ElInput
            v-model="userCreate.form.name"
            :placeholder="$t('user.create.name.placeholder')"
          />
        </ElFormItem>
        <ElFormItem :label="$t('user.create.mobileNumber.label')" prop="mobileNumber">
          <ElInput
            v-model="userCreate.form.mobileNumber"
            :placeholder="$t('user.create.mobileNumber.placeholder')"
          />
        </ElFormItem>
        <ElFormItem :label="$t('user.create.email.label')" prop="email">
          <ElInput
            v-model="userCreate.form.email"
            :placeholder="$t('user.create.email.placeholder')"
          />
        </ElFormItem>
      </ElForm>
      <div slot="footer" class="dialog-footer">
        <ElButton @click="userCreate.visible = false">
          {{ $t('table.cancel') }}
        </ElButton>
        <ElButton type="primary" @click="createData">
          {{ $t('table.confirm') }}
        </ElButton>
      </div>
    </ElDialog>

    <ElDialog :visible.sync="changePwd.visible" :title="$t('user.changePwd.title')">
      <ElForm
        ref="changePwdForm"
        :rules="changePwd.rules"
        :model="changePwd.form"
        label-position="left"
        label-width="100px"
        style="width: 400px; margin-left:50px;"
      >
        <ElFormItem :label="$t('user.changePwd.username.label')" prop="username">
          <ElInput
            v-model="changePwd.form.username"
            :placeholder="$t('user.changePwd.username.placeholder')"
            :readonly="true"
          />
        </ElFormItem>
        <ElFormItem :label="$t('user.changePwd.password.label')" prop="password">
          <ElInput
            v-model="changePwd.form.password"
            :placeholder="$t('user.changePwd.password.placeholder')"
            type="password"
          />
        </ElFormItem>
        <ElFormItem :label="$t('user.changePwd.confirmPassword.label')" prop="confirmPassword">
          <ElInput
            v-model="changePwd.form.confirmPassword"
            :placeholder="$t('user.changePwd.confirmPassword.placeholder')"
            type="password"
          />
        </ElFormItem>
      </ElForm>
      <div slot="footer" class="dialog-footer">
        <ElButton @click="changePwd.visible = false">
          {{ $t('table.cancel') }}
        </ElButton>
        <ElButton type="primary" @click="changePassword">
          {{ $t('table.confirm') }}
        </ElButton>
      </div>
    </ElDialog>

    <ElDialog :visible.sync="changeGroup.visible" :title="$t('user.changeGroup.title')" width="750px">
      <ElTransfer v-model="changeGroup.value" :data="changeGroup.data" :titles="['可选用户组','已选用户组']" filterable/>
      <div slot="footer" class="dialog-footer">
        <ElButton @click="changeGroup.visible = false">
          {{ $t('table.cancel') }}
        </ElButton>
        <ElButton type="primary" @click="changeUserGroup">
          {{ $t('table.confirm') }}
        </ElButton>
      </div>
    </ElDialog>
    <ElDialog :visible.sync="changeRole.visible" :title="$t('user.changeRole.title')" width="750px">
      <ElTransfer v-model="changeRole.value" :data="changeRole.data" :titles="['可选角色','已选角色']" filterable/>
      <div slot="footer" class="dialog-footer">
        <ElButton @click="changeRole.visible = false">
          {{ $t('table.cancel') }}
        </ElButton>
        <ElButton type="primary" @click="changeUserRole">
          {{ $t('table.confirm') }}
        </ElButton>
      </div>
    </ElDialog>
  </div>
</template>

<script>
import { getUsers, updateUser, passwordUser, enableUser, createUser } from '@/api/user'
import { userGroup, updateUserGroup } from '@/api/group'
import { userRole, updateUserRole } from '@/api/role'
import { isvalidUsername, isEmpty, isEmail, isMobilePhone } from '@/utils/validate'
import store from '../../store'

export default {
  name: 'AuthUser',
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
    const validatePassword = (rule, value, callback) => {
      if (value !== this.changePwd.form.password) {
        callback(new Error('确认新密码必须与新密码相同'))
      } else {
        callback()
      }
    }
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
      userQuery: {
        username: '',
        name: '',
        mobileNumber: '',
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
      userCreate: {
        visible: false,
        rules: {
          username: [{
            type: 'string',
            pattern: '^[a-zA-Z0-9]{5,20}$',
            required: true,
            message: '用户名必须是5-20位字母与数字',
            trigger: 'change'
          }],
          password: [{ type: 'string', min: 5, max: 16, required: true, message: '密码必须在5-16位', trigger: 'change' }],
          enable: [{ required: true, message: '是否启用不能为空', trigger: 'change' }],
          name: [{ required: true, message: '用户姓名不能为空', trigger: 'change' }],
          mobileNumber: [{ required: false, validator: validateMobileNumber, trigger: 'change' }],
          email: [{ required: false, validator: validateEmail, trigger: 'change' }]
        },
        form: {}
      },
      changePwd: {
        visible: false,
        form: {
          username: undefined,
          password: undefined,
          confirmPassword: undefined
        },
        rules: {
          password: [{
            type: 'string',
            min: 5,
            max: 16,
            required: true,
            message: '密码必须在5-16位'
          }],
          confirmPassword: [{
            type: 'string',
            required: true,
            validator: validatePassword
          }]
        }
      },
      changeGroup: {
        visible: false,
        userId: undefined,
        data: [],
        value: []
      },
      changeRole: {
        visible: false,
        userId: undefined,
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
      this.$refs['userQuery'].resetFields()
    },
    handleSizeChange(val) {
      this.userQuery.pageSize = val
      this.getData()
    },
    handleCurrentChange(val) {
      this.userQuery.pageNum = val
      this.getData()
    },
    getData() {
      this.table.loading = true
      getUsers(this.userQuery).then(response => {
        const items = response.data.list
        this.table.data = items.map(v => {
          this.$set(v, 'edit', false) // https://vuejs.org/v2/guide/reactivity.html
          v.original = JSON.stringify(v) //  will be used when user click the cancel botton
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
      row.username = originRow.username
      row.name = originRow.name
      row.email = originRow.email
      row.mobileNumber = originRow.mobileNumber
      row.edit = false
    },
    confirmEdit(row) {
      if (!isvalidUsername(row.username)) {
        this.$message({
          message: '请输入正确的登录名',
          type: 'error',
          duration: 5 * 1000
        })
        return
      }
      if (isEmpty(row.name)) {
        this.$message({
          message: '用户姓名不能为空',
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
      if (!isEmpty(row.mobileNumber) && !isMobilePhone(row.mobileNumber)) {
        this.$message({
          message: '请输入正确的手机号',
          type: 'error',
          duration: 5 * 1000
        })
        return
      }
      updateUser(row).then(response => {
        this.$message({
          message: response.data,
          type: 'success'
        })
        if (JSON.parse(row.original).id === store.getters.currentUserId &&
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
          message: '登录名已存在',
          type: 'error',
          duration: 2000
        })
        this.cancelEdit(row)
      })
    },
    handleCreate() {
      this.userCreate.form = {
        username: '',
        password: '',
        name: '',
        email: '',
        mobileNumber: '',
        enabled: 'true'
      }
      this.userCreate.visible = true
      this.$nextTick(() => {
        this.$refs['createUserForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['createUserForm'].validate((valid) => {
        if (valid) {
          createUser(this.userCreate.form).then((response) => {
            response.data.edit = false
            response.data.original = JSON.stringify(response.data)
            this.table.data.unshift(response.data)
            this.pagination.total = this.pagination.total + 1
            this.userCreate.visible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          }).catch(() => {
            this.$notify({
              title: '失败',
              message: '登录名已存在',
              type: 'error',
              duration: 2000
            })
          })
        }
      })
    },
    handleEnable(row, enable) {
      const userEnableForm = Object.assign({}, row)
      userEnableForm.enabled = enable
      enableUser([userEnableForm]).then(
        () => {
          for (const v of this.table.data) {
            if (v.id === userEnableForm.id) {
              const index = this.table.data.indexOf(v)
              this.table.data.splice(index, 1, userEnableForm)
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
    handleSelectionChange(val) {
      this.table.select = val
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
      enableUser(this.table.select).then(
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
    handleChangePwd(row) {
      this.changePwd.form = {
        password: undefined,
        confirmPassword: undefined
      }
      this.changePwd.form.username = row.username
      this.changePwd.visible = true
      this.$nextTick(() => {
        this.$refs['changePwdForm'].clearValidate()
      })
    },
    changePassword() {
      this.$refs['changePwdForm'].validate((valid) => {
        if (valid) {
          passwordUser(this.changePwd.form).then(() => {
            this.changePwd.visible = false
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          }).catch(() => {
            this.$notify({
              title: '失败',
              message: '更新失败',
              type: 'error',
              duration: 2000
            })
          })
        }
      })
    },
    handleGroup(row) {
      this.changeGroup.userId = row.id
      userGroup(row.id).then(response => {
        const data = response.data
        this.changeGroup.data = data
        this.changeGroup.value = data.filter(g => g.exists).map(g => g.key)
        this.changeGroup.visible = true
      }).catch(() => {
        this.$notify({
          title: '失败',
          message: '获取用户组失败，请稍后再试',
          type: 'error',
          duration: 2000
        })
      })
    },
    changeUserGroup() {
      updateUserGroup(this.changeGroup.userId, this.changeGroup.value).then(response => {
        this.changeGroup.visible = false
        for (const v of this.table.data) {
          if (v.id === this.changeGroup.userId) {
            v.roles = response.data.roleNames
            v.groups = response.data.groupNames
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
          message: '更新用户组失败，请稍后再试',
          type: 'error',
          duration: 2000
        })
        this.changeGroup.visible = false
      }
      )
    },
    handleRole(row) {
      this.changeRole.userId = row.id
      userRole(row.id).then(response => {
        const data = response.data
        this.changeRole.data = data
        this.changeRole.value = data.filter(r => r.exists).map(r => r.key)
        this.changeRole.visible = true
      }).catch(() => {
        this.$notify({
          title: '失败',
          message: '获取角色失败，请稍后再试',
          type: 'error',
          duration: 2000
        })
      })
    },
    changeUserRole() {
      updateUserRole(this.changeRole.userId, this.changeRole.value).then(response => {
        this.changeRole.visible = false
        for (const v of this.table.data) {
          if (v.id === this.changeRole.userId) {
            v.roles = response.data.roleNames
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
          message: '请选择用户',
          type: 'error',
          duration: 2 * 1000
        })
        return
      }
      this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['登录名', '用户姓名', '手机号', '邮箱', '是否启用', '用户组', '角色']
          const filterVal = ['username', 'name', 'mobileNumber', 'email', 'enabled', 'groups', 'roles']

          const data = this.table.select.map(u => filterVal.map(field => {
            return u[field]
          }))
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: '用户列表'
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
