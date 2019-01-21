<template>
  <div class="app-container">
    <div class="filter-container">

      <el-form ref="dictionaryQuery" :model="dictionaryQuery" :inline="true">
        <el-row>
          <el-col>
            <el-form-item :label=" '代码:' " prop="code">
              <el-input v-model="dictionaryQuery.code" :placeholder="'请输入代码'" auto-complete="on"/>
            </el-form-item>
            <el-form-item :label=" '描述:' " prop="name">
              <el-input v-model="dictionaryQuery.name" :placeholder="'请输入描述'" auto-complete="on"/>
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
      <el-button type="info" size="small" @click="handleDeletes()">删除</el-button>
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
      <el-table-column :label="$t('dictionary.code.label')" prop="code">
        <template slot-scope="scope">{{ scope.row.code }}</template>
      </el-table-column>
      <el-table-column :label="$t('dictionary.name.label')" prop="name">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column label="编辑" min-width="200px">
        <template slot-scope="scope">
          <div style="margin-top: 10px">
            <el-button type="info" size="mini" @click="handleEdit(scope.row)">编辑</el-button>
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
    //字典创建对话框
    <el-dialog :visible.sync="dictionaryCreate.visible" :title="$t('dictionary.create.title')">
      <el-form
        ref="createDictionaryForm"
        :rules="dictionaryCreate.rules"
        :model="dictionaryCreate.form"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item :label="$t('dictionary.create.code.label')" prop="code">
          <el-input
            v-model="dictionaryCreate.form.code"
            :placeholder="$t('dictionary.create.code.placeholder')"
          />
        </el-form-item>
        <el-form-item :label="$t('dictionary.create.name.label')" prop="name">
          <el-input
            v-model="dictionaryCreate.form.name"
            :placeholder="$t('dictionary.create.name.placeholder')"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dictionaryCreate.visible = false">
          {{ $t('table.cancel') }}
        </el-button>
        <el-button type="primary" @click="createData">
          {{ $t('table.confirm') }}
        </el-button>
      </div>
    </el-dialog>
    //字典编辑对话框
    <el-dialog :visible.sync="dictionaryEdit.visible" :title="$t('dictionary.edit.label')">
      <el-form
        ref="editDictionaryForm"
        :rules="dictionaryEdit.rules"
        :model="dictionaryEdit.form"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item :label="$t('dictionary.code.label')" prop="code">
          <el-input
            v-model="dictionaryEdit.form.code"
            :placeholder="$t('dictionary.edit.code.placeholder')"
          />
        </el-form-item>
        <el-form-item :label="$t('dictionary.name.label')" prop="name">
          <el-input
            v-model="dictionaryEdit.form.name"
            :placeholder="$t('dictionary.edit.name.placeholder')"
          />
        </el-form-item>
        <el-form-item :label="$t('dictionary.edit.dicList.label')" prop="dicValueList">
          <el-button @click="createDicValue()">
            新建
          </el-button>
          <el-button type="primary" @click="deleteDicValue()">
            删除
          </el-button>
        </el-form-item>
        <el-form-item>
          <el-table
            v-loading="table.loading"
            :data="table.dicdata"
            border
            fit
            stripe
            highlight-current-row
            @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="50px"/>
            <el-table-column :label="$t('dictionaryvalue.label.code')" prop="code">
              <template slot-scope="scope">{{ scope.row.code }}</template>
            </el-table-column>
            <el-table-column :label="$t('dictionaryvalue.label.name')" prop="name">
              <template slot-scope="scope">{{ scope.row.name }}</template>
            </el-table-column>
            <el-table-column :label="$t('dictionaryvalue.label.description')" prop="code">
              <template slot-scope="scope">{{ scope.row.description }}</template>
            </el-table-column>
            <el-table-column :label="$t('dictionaryvalue.label.type_id')" prop="name">
              <template slot-scope="scope">{{ scope.row.type_id }}</template>
            </el-table-column>
            <el-table-column :label="$t('dictionaryvalue.label.attribute1')" prop="code">
              <template slot-scope="scope">{{ scope.row.attribute1 }}</template>
            </el-table-column>
            <el-table-column :label="$t('dictionaryvalue.label.attribute2')" prop="name">
              <template slot-scope="scope">{{ scope.row.attribute2 }}</template>
            </el-table-column>
            <el-table-column :label="$t('dictionaryvalue.label.attribute3')" prop="code">
              <template slot-scope="scope">{{ scope.row.attribute3 }}</template>
            </el-table-column>
            <el-table-column :label="$t('dictionaryvalue.label.active')" prop="name">
              <template slot-scope="scope">{{ scope.row.active }}</template>
            </el-table-column>

          </el-table>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleEdit()">
          {{ $t('table.confirm') }}
        </el-button>
        <el-button @click="dictionaryEdit.visible = false">
          {{ $t('table.cancel') }}
        </el-button>
      </div>
    </el-dialog>
    //字典值创建对话框
    <el-dialog :visible.sync="dictionaryValueCreate.visible" :title="$t('dictionaryvalue.create.title')">
      <el-form
        ref="createDictionaryForm"
        :rules="dictionaryValueCreate.rules"
        :model="dictionaryValueCreate.form"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item :label="$t('dictionaryValue.create.label.code')" prop="code">
          <el-input
            v-model="dictionaryValueCreate.form.code"
            :placeholder="$t('dictionaryValue.create.code.placeholder')"
          />
        </el-form-item>
        <el-form-item :label="$t('dictionaryValue.create.label.name')" prop="name">
          <el-input
            v-model="dictionaryValueCreate.form.name"
            :placeholder="$t('dictionaryValue.create.name.placeholder')"
          />
        </el-form-item>
        <el-form-item :label="$t('dictionaryValue.create.label.description')" prop="code">
          <el-input
            v-model="dictionaryValueCreate.form.description"
            :placeholder="$t('dictionaryValue.create.description.placeholder')"
          />
        </el-form-item>
        <el-form-item :label="$t('dictionaryValue.create.label.type_id')" prop="name">
          <el-input
            v-model="dictionaryValueCreate.form.type_id"
            :placeholder="$t('dictionaryValue.create.type_id.placeholder')"
          />
        </el-form-item>
        <el-form-item :label="$t('dictionaryValue.create.label.attribute1')" prop="code">
          <el-input
            v-model="dictionaryValueCreate.form.attribute1"
            :placeholder="$t('dictionaryValue.create.attribute1.placeholder')"
          />
        </el-form-item>
        <el-form-item :label="$t('dictionaryValue.create.label.attribute2')" prop="name">
          <el-input
            v-model="dictionaryValueCreate.form.attribute2"
            :placeholder="$t('dictionaryValue.create.name.placeholder')"
          />
        </el-form-item>
        <el-form-item :label="$t('dictionaryValue.create.label.attribute3')" prop="code">
          <el-input
            v-model="dictionaryValueCreate.form.attribute3"
            :placeholder="$t('dictionaryValue.create.attribute13.placeholder')"
          />
        </el-form-item>
        <el-form-item :label="$t('dictionaryValue.create.label.active')" prop="name">
          <el-input
            v-model="dictionaryValueCreate.form.active"
            :placeholder="$t('dictionaryValue.create.active.placeholder')"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveDicValueData">
          {{ $t('table.confirm') }}
        </el-button>
        <el-button @click="dictionaryValueCreate.visible = false">
          {{ $t('table.cancel') }}
        </el-button>

      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getDictionarys, editDictionaryAndValue, createDictionary, deleteDictionarys, getDictionaryValues } from '@/api/dictionary'

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
      dictionaryQuery: {
        code: '',
        name: '',
        page: 1,
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
      statuses: ['CREATED', 'PENDING', 'APPROVED', 'SHIPPED', 'COMPLETED'],
      platforms: ['TM', 'JD', 'DMS', 'LGT'],
      dictionaryCreate: {
        visible: false,
        rules: {
          code: [{ required: true, message: '请输入代码' }],
          name: [{ required: true, message: '请输入描述' }]
        },
        form: {}
      },
      dictionaryEdit: {
        visible: false,
        rules: {
          code: [{ required: true, message: '请输入代码' }]
        },
        form: {}
      },
      dictionaryValueCreate: {
        rules: {
          name: [{ required: true, message: '请输入描述' }]
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
      this.$refs['dictionaryQuery'].resetFields()
    },
    handleSizeChange(val) {
      this.dictionaryQuery.limit = val
      this.getData()
    },
    handleCurrentChange(val) {
      this.dictionaryQuery.page = val
      this.getData()
    },
    getData() {
      this.table.loading = true
      getDictionarys(this.dictionaryQuery).then(response => {
        this.table.data = response.data.list
        this.pagination.total = Number.parseInt(response.data.total)
        this.table.loading = false
        this.search.loading = false
      }).catch(() => {
        this.table.loading = false
      })
    },
    setSearchLoading() {
      // this.search.loading = false
    },
    query() {
      this.search.loading = true
      this.getData()
    },
    handleCreate() {
      this.dictionaryCreate.form = {
        code: '',
        name: ''
      }
      this.dictionaryCreate.visible = true
      this.$nextTick(() => {
        this.$refs['createDictionaryForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['createDictionaryForm'].validate((valid) => {
        if (valid) {
          createDictionary(this.dictionaryCreate.form).then((response) => {
            this.table.data.unshift(response.data)
            this.pagination.total = this.pagination.total + 1
            this.dictionaryCreate.visible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          }).catch((e) => {
            console.log(e)
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
    handleDeletes() {
      if (this.table.select.length <= 0) {
        this.$message({
          message: '请选择枚举',
          type: 'error',
          duration: 2 * 1000
        })
        return
      }
      deleteDictionarys(this.table.select).then((response) => {
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
    createDicValue() {

    },
    saveDicValueData() {

    },
    handleSelectionChange(val) {
      this.table.select = val
    },
    handleEdit(dictionary) {
      getDictionaryValues(dictionary.code).then(response => {
        const items = response.data.list
        this.table.dicdata = items.map(v => {
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

      this.dictionaryEdit.form = {
        code: dictionary.code,
        name: dictionary.name
      }
      this.dictionaryEdit.visible = true
    },
    saveEditData() {
      this.table.loading = true

      editDictionaryAndValue(this.dictionaryQuery).then(response => {
        const items = response.data.list
        this.table.data = items.map(v => {
          this.$set(v, 'edit', false) // https://vuejs.org/v2/guide/reactivity.html
          v.original = JSON.stringify(v) //  will be used when user click the cancel botton
          return v
        })
        this.pagination.total = response.data.total
        this.table.loading = false
        this.search.loading = false
      }).catch((e) => {
        this.table.loading = false
        this.search.loading = false
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
</style>
