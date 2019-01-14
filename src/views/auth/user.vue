<template>
  <div class="app-container">
    <div class="filter-container">
      <ElForm ref="userQuery" :model="userQuery" :inline="true">
        <ElRow>
          <ElCol>
            <ElFormItem :label=" $t('user.username.label')+':' " prop="username">
              <ElInput v-model="userQuery.username" auto-complete="on" />
            </ElFormItem>
            <ElFormItem :label=" $t('user.name.label')+':' " prop="name">
              <ElInput v-model="userQuery.name" auto-complete="on" />
            </ElFormItem>
            <ElFormItem :label=" $t('user.mobileNumber.label')+':' " prop="mobileNumber">
              <ElInput v-model="userQuery.mobileNumber" auto-complete="on" />
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
      <ElButton type="primary" class="gray-btn" size="small" @click="handleEnables(true)">
        删除
      </ElButton>
      <ElButton type="primary" class="green-btn" size="small" @click="handleEnables(false)">
        保存
      </ElButton>
      <ElButton type="primary" class="green-btn" size="small" @click="handleEnables(false)">
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
      <ElTableColumn type="selection" width="50px" />
      <ElTableColumn :label="$t('user.username.label')" prop="username" width="100px" />
      <ElTableColumn :label="$t('user.nick.label')" prop="nick" />
      <ElTableColumn :label="$t('user.roles.label')" prop="roles" />
      <ElTableColumn :label="$t('user.enabled.label')" prop="enabled">
        <template slot-scope="scope">
          <ElTag :type="scope.row.enabled | enableFilter">
            {{ scope.row.enabled ? '启用' : '禁用' }}
          </ElTag>
        </template>
      </ElTableColumn>
      <ElTableColumn :label="$t('user.encodePassword.label')" prop="encodePassword">
        <template slot-scope="scope">
          <ElTag
            v-if="scope.row.roles.indexOf('ROLE_CLIENT') !== -1"
            type="primary"
            @click.native="showPassword(scope.row.encodePassword)"
          >
            点击查看密码
          </ElTag>
        </template>
      </ElTableColumn>
      <ElTableColumn label="操作">
        <template slot-scope="scope">
          <ElButton type="primary" size="mini" @click="handleChangePwd(scope.row.username)">
            修改密码
          </ElButton>
          <ElButton type="success" size="mini" @click="handleEnable(scope.row, true)">
            启用
          </ElButton>
          <ElButton type="danger" size="mini" @click="handleEnable(scope.row, false)">
            禁用
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
        <ElFormItem :label="$t('user.create.roles.label')">
          <ElTag type="success">
            ROLE_CLIENT
          </ElTag>
        </ElFormItem>
        <ElFormItem :label="$t('user.create.enabled.label')">
          <ElRadio v-model="userCreate.form.enabled" label="true">
            {{ $t('user.create.enabled.yes')
            }}
          </ElRadio>
          <ElRadio v-model="userCreate.form.enabled" label="false">
            {{ $t('user.create.enabled.no')
            }}
          </ElRadio>
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
        label-width="70px"
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
  </div>
</template>

<script>
// import { getUsers, getUserTotal, createUser, enableUser, passwordUser } from '@/api/user'

export default {
  name: 'User',
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
        callback(new Error('The confirm password must equals password '))
      } else {
        callback()
      }
    }
    return {
      userQuery: {
        username: '',
        name: '',
        mobileNumber: '',
        pageNum: 0,
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
        data: undefined,
        select: []
      },
      userCreate: {
        visible: false,
        rules: {
          username: [{
            type: 'string',
            pattern: '[0-9]+',
            required: true,
            message: 'username is number',
            trigger: 'change'
          }],
          password: [{ required: true, message: 'password is required', trigger: 'change' }],
          enable: [{ required: true, message: 'enable is required', trigger: 'blur' }]
        },
        form: {
          username: '',
          password: '',
          enabled: true
        }
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
            min: 8,
            max: 16,
            required: true,
            message: 'The password required 8 to 16 digits '
          }],
          confirmPassword: [{
            type: 'string',
            required: true,
            validator: validatePassword
          }]
        }
      }
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
      this.userQuery.limit = val
      this.getData()
    },
    handleCurrentChange(val) {
      this.userQuery.page = val
      this.getData()
    },
    getData() {
      this.table.loading = true
      // let userLoading = true
      // let totalLoading = true
      // getUsers(this.userQuery).then(response => {
      //   this.table.data = response.data
      //
      //   userLoading = false
      //   this.table.loading = userLoading || totalLoading
      //   this.search.loading = userLoading || totalLoading
      // }).catch(() => {
      //   userLoading = false
      //   this.table.loading = userLoading || totalLoading
      //   this.search.loading = userLoading || totalLoading
      // })
      // getUserTotal(this.userQuery).then(response => {
      //   this.pagination.total = response.data
      //   totalLoading = false
      //   this.table.loading = userLoading || totalLoading
      //   this.search.loading = userLoading || totalLoading
      // }).catch(() => {
      //   totalLoading = false
      //   this.table.loading = userLoading || totalLoading
      //   this.search.loading = userLoading || totalLoading
      // })
    },
    query() {
      this.search.loading = true
      this.getData()
    },
    handleCreate() {
      this.userCreate.form = {
        username: '',
        password: '',
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
          // createUser(this.userCreate.form).then((response) => {
          //   this.table.data.unshift(response.data)
          //   this.userCreate.visible = false
          //   this.$notify({
          //     title: '成功',
          //     message: '创建成功',
          //     type: 'success',
          //     duration: 2000
          //   })
          // }).catch(() => {
          //   this.$notify({
          //     title: '失败',
          //     message: '用户名已存在',
          //     type: 'error',
          //     duration: 2000
          //   })
          // })
        }
      })
    },
    handleEnable(row, enable) {
      this.userCreate.form = Object.assign({}, row)
      this.userCreate.form.enabled = enable
      // enableUser(this.userCreate.form).then(
      //   () => {
      //     for (const v of this.table.data) {
      //       if (v.username === this.userCreate.form.username) {
      //         const index = this.table.data.indexOf(v)
      //         this.table.data.splice(index, 1, this.userCreate.form)
      //         break
      //       }
      //     }
      //     this.$notify({
      //       title: '成功',
      //       message: '更新成功',
      //       type: 'success',
      //       duration: 2000
      //     })
      //   }
      // ).catch(() => {
      //   this.$notify({
      //     title: '失败',
      //     message: '更新失败',
      //     type: 'error',
      //     duration: 2000
      //   })
      // })
    },
    handleSelectionChange(val) {
      this.table.select = val
    },
    handleEnables(enable) {
      this.table.select.forEach((v) => {
        v.enabled = enable
      })
      // enableUser(this.table.select).then(
      //   this.$notify({
      //     title: '成功',
      //     message: '更新成功',
      //     type: 'success',
      //     duration: 2000
      //   })
      // ).catch(() => {
      //   this.$notify({
      //     title: '失败',
      //     message: '更新失败',
      //     type: 'error',
      //     duration: 2000
      //   })
      // })
    },
    handleChangePwd(username) {
      this.changePwd.form.username = username
      this.changePwd.visible = true
      this.$nextTick(() => {
        this.$refs['changePwdForm'].clearValidate()
      })
    },
    changePassword() {
      // passwordUser(this.changePwd.form).then(() => {
      //   this.changePwd.visible = false
      //   this.$notify({
      //     title: '成功',
      //     message: '更新成功',
      //     type: 'success',
      //     duration: 2000
      //   })
      // }).catch(() => {
      //   this.$notify({
      //     title: '失败',
      //     message: '更新失败',
      //     type: 'error',
      //     duration: 2000
      //   })
      // })
    },
    showPassword(password) {
      this.$alert(password, '客户端密码')
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
