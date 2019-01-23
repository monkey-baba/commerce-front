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
      <el-button type="danger" size="small" @click="handleDeletes">删除</el-button>
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
          <el-button type="primary" size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button v-if="scope.row.editable" type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
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

    <ElDialog :visible.sync="dictEdit.visible" :title="$t('dict.edit.title')">
      <ElForm
        ref="editDictForm"
        :rules="dictEdit.rules"
        :model="dictEdit.form"
        label-position="left"
        label-width="70px"
        style="min-width: 600px; margin-left:50px;"
      >
        <ElFormItem :label="$t('dict.edit.code.label')" prop="code">
          <ElInput
            v-model="dictEdit.form.code"
            :disabled="true"
            :placeholder="$t('dict.edit.code.placeholder')"
          />
        </ElFormItem>
        <ElFormItem :label="$t('dict.edit.name.label')" prop="name">
          <ElInput
            v-model="dictEdit.form.name"
            :placeholder="$t('dict.edit.name.placeholder')"
          />
        </ElFormItem>
        <ElFormItem :label="$t('dict.edit.values.label')" prop="values">
          <el-button type="primary" class="blue-btn" size="mini" icon="el-icon-circle-plus" @click="handleValueCreate" >新建</el-button>
          <el-button type="primary" class="red-btn" size="mini" @click="handleValueDeletes">删除</el-button>
          <el-table
            v-loading="dictEdit.table.loading"
            :data="dictEdit.table.data"
            :header-cell-style="valueHeaderStyle"
            max-height="300"
            border
            fit
            stripe
            highlight-current-row
            @selection-change="handleValueChange">
            <el-table-column type="selection" width="50px"/>
            <el-table-column :label="$t('dict.edit.values.code.label')" prop="code" />
            <el-table-column :label="$t('dict.edit.values.name.label')" prop="name" />
            <el-table-column :label="$t('dict.edit.values.description.label')" prop="description" />
            <el-table-column :label="$t('dict.edit.values.attribute1.label')" prop="attribute1" />
            <el-table-column :label="$t('dict.edit.values.attribute2.label')" prop="attribute2" />
            <el-table-column :label="$t('dict.edit.values.attribute3.label')" prop="attribute3" />
            <el-table-column :label="$t('dict.edit.values.active.label')" prop="active">
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.active"
                  @change="handleValueActive(scope.row)"/>
              </template>
            </el-table-column>
          </el-table>
        </ElFormItem>
      </ElForm>
      <div slot="footer" class="dialog-footer">
        <ElButton @click="dictEdit.visible = false">
          {{ $t('table.cancel') }}
        </ElButton>
        <ElButton type="primary" @click="editData">
          {{ $t('table.confirm') }}
        </ElButton>
      </div>
    </ElDialog>

    <ElDialog :visible.sync="dictValueCreate.visible" :title="$t('dict.value.create.title')">
      <ElForm
        ref="createDictValueForm"
        :rules="dictValueCreate.rules"
        :model="dictValueCreate.form"
        label-position="left"
        label-width="100px"
        style="width: 400px; margin-left:50px;"
      >
        <ElFormItem :label="$t('dict.value.create.code.label')" prop="code">
          <ElInput
            v-model="dictValueCreate.form.code"
            :placeholder="$t('dict.value.create.code.placeholder')"
          />
        </ElFormItem>
        <ElFormItem :label="$t('dict.value.create.name.label')" prop="name">
          <ElInput
            v-model="dictValueCreate.form.name"
            :placeholder="$t('dict.value.create.name.placeholder')"
          />
        </ElFormItem>
        <ElFormItem :label="$t('dict.value.create.description.label')" prop="description">
          <ElInput
            v-model="dictValueCreate.form.description"
            :placeholder="$t('dict.value.create.description.placeholder')"
          />
        </ElFormItem>
        <ElFormItem :label="$t('dict.value.create.attribute1.label')" prop="attribute1">
          <ElInput
            v-model="dictValueCreate.form.attribute1"
          />
        </ElFormItem>
        <ElFormItem :label="$t('dict.value.create.attribute2.label')" prop="attribute2">
          <ElInput
            v-model="dictValueCreate.form.attribute2"
          />
        </ElFormItem>
        <ElFormItem :label="$t('dict.value.create.attribute3.label')" prop="attribute3">
          <ElInput
            v-model="dictValueCreate.form.attribute3"
          />
        </ElFormItem>
        <ElFormItem :label="$t('dict.value.create.active.label')" prop="active">
          <ElRadio v-model="dictValueCreate.form.active" label="true">
            {{ $t('dict.value.create.active.yes') }}
          </ElRadio>
          <ElRadio v-model="dictValueCreate.form.active" label="false">
            {{ $t('dict.value.create.active.no') }}
          </ElRadio>
        </ElFormItem>
      </ElForm>
      <div slot="footer" class="dialog-footer">
        <ElButton @click="dictValueCreate.visible = false">
          {{ $t('table.cancel') }}
        </ElButton>
        <ElButton type="primary" @click="createValueData">
          {{ $t('table.confirm') }}
        </ElButton>
      </div>
    </ElDialog>

  </div>
</template>

<script>
import { getDicts, createDict, getDictValues, editDict, deleteDict } from '@/api/dictionary'

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
      },
      dictEdit: {
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
        form: {},
        table: {
          loading: false,
          data: null,
          select: []
        }
      },
      dictValueCreate: {
        visible: false,
        rules: {
          code: [{
            type: 'string',
            pattern: '^[a-zA-Z0-9\_]+$',
            required: true,
            message: '代码为字母与数字或下划线',
            trigger: 'change'
          }],
          name: [{ required: true, message: '值名称不能为空', trigger: 'change' }]
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
    },
    handleEdit(row) {
      this.dictEdit.form = {
        id: row.id,
        code: row.code,
        name: row.name,
        editable: row.editable,
        add: [],
        update: [],
        delete: []
      }
      this.dictEdit.visible = true
      this.dictEdit.table.loading = true
      this.$nextTick(() => {
        this.$refs['editDictForm'].clearValidate()
      })
      getDictValues(row.code).then(response => {
        this.dictEdit.table.data = response.data
        this.dictEdit.table.loading = false
      }).catch(() =>
        this.$notify({
          title: '失败',
          message: '获取值失败',
          type: 'error',
          duration: 2000
        })
      )
    },
    handleValueChange(val) {
      this.dictEdit.table.select = val
    },
    valueHeaderStyle() {
      return 'padding:0px'
    },
    handleValueActive(row) {
      row.update = true
    },
    handleValueDeletes() {
      if (this.dictEdit.table.select.length <= 0) {
        this.$message({
          message: '请选择要删除的值',
          type: 'error',
          duration: 2 * 1000
        })
        return
      }
      for (const v of this.dictEdit.table.select) {
        const index = this.dictEdit.table.data.indexOf(v)
        this.dictEdit.form.delete.push(this.dictEdit.table.data.splice(index, 1)[0])
      }
    },
    handleValueCreate() {
      this.dictValueCreate.form = {
        code: '',
        name: '',
        description: '',
        attribute1: '',
        attribute2: '',
        attribute3: '',
        active: 'true'
      }
      this.dictValueCreate.visible = true
      this.$nextTick(() => {
        this.$refs['createDictValueForm'].clearValidate()
      })
    },
    createValueData() {
      this.$refs['createDictValueForm'].validate((valid) => {
        if (valid) {
          // 先判断代码唯一性
          for (const v of this.dictEdit.table.data) {
            console.log(JSON.stringify(v))
            if (v.code === this.dictValueCreate.form.code) {
              this.$message({
                message: '值代码已存在',
                type: 'error',
                duration: 2 * 1000
              })
              return
            }
          }
          this.dictValueCreate.form.add = true
          this.dictValueCreate.form.active = this.dictValueCreate.form.active === 'true'
          this.dictEdit.table.data.unshift(this.dictValueCreate.form)
          this.dictValueCreate.visible = false
        }
      })
    },
    editData() {
      this.$refs['editDictForm'].validate((valid) => {
        if (valid) {
          // 先处理table.data  把add和update的拉出来
          for (const v of this.dictEdit.table.data) {
            if (v.add) {
              this.dictEdit.form.add.push(v)
              continue
            }
            if (v.update) {
              this.dictEdit.form.update.push(v)
            }
          }
          // 把delete的没有id的从form里面踢掉
          for (const v of this.dictEdit.form.delete) {
            if (v.id === undefined) {
              const index = this.dictEdit.form.delete.indexOf(v)
              this.dictEdit.form.delete.splice(index, 1)
            }
          }
          editDict(this.dictEdit.form).then(() => {
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
            this.dictEdit.visible = false
          }).catch(() => {
            this.$message({
              message: '值代码已存在，请刷新重试',
              type: 'error',
              duration: 2 * 1000
            })
          })
        }
      })
    },
    handleDelete(row) {
      this.$confirm('确认删除？', '提示', {
        type: 'warning'
      }).then(() => {
        deleteDict([{ id: row.id }]).then(
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
    handleDeletes() {
      if (this.table.select.length <= 0) {
        this.$message({
          message: '请选择枚举',
          type: 'error',
          duration: 2 * 1000
        })
        return
      }
      this.$confirm('确认删除？', '提示', {
        type: 'warning'
      }).then(() => {
        deleteDict(this.table.select).then(() => {
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
