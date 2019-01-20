<template>
  <div class="app-container">
    <el-table
      v-loading="table.loading"
      :data="table.data"
      border
      fit
      stripe
      highlight-current-row>
      <el-table-column :label="$t('routerRule.index.label')" type="index" />
      <el-table-column :label="$t('routerRule.code.label')" prop="code" />
      <el-table-column :label="$t('routerRule.name.label')" prop="name" />
      <el-table-column :label="$t('routerRule.enabled.label')">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.enabled" @change="change(scope.row)"/>
        </template>
      </el-table-column>
      <el-table-column :label="$t('routerRule.priority.label')">
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.priority"
            type="number"
            @change="change(scope.row)"/>
        </template>
      </el-table-column>
      <el-table-column :label="$t('routerRule.type.label')" prop="" />
      <el-table-column :label="$t('routerRule.modifyUserId.label')" prop=""/>
      <el-table-column :label="$t('routerRule.modifyDate.label')" prop="modifyDate"/>
    </el-table>

    <el-pagination
      v-show="false"
      :current-page="pagination.page"
      :page-sizes="pagination.pageSizes"
      :total="pagination.total"
      :background="pagination.background"
      align="right"
      layout="total, sizes, prev, pager, next, jumper"
      style="width: 100%"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"/>
    <el-button type="primary" class="tiffany-btn" size="small" style="display:block;margin:0 auto" @click="update">保存</el-button>
  </div>
</template>

<script>
import { search, update } from '@/api/routerRule'
import store from '../../store'

export default {
  name: 'OrderList',
  data() {
    return {
      routerRuleQuery: {
        pageNum: 1,
        pageSize: 100
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
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    handleSizeChange(val) {
      this.routerRuleQuery.pageSize = val
      this.getData()
    },
    handleCurrentChange(val) {
      this.routerRuleQuery.pageNum = val
      this.getData()
    },
    getData() {
      this.table.loading = true
      search(this.routerRuleQuery).then(response => {
        this.table.data = response.data.list
        this.pagination.total = Number.parseInt(response.data.total)
        this.table.loading = false
      }).catch(() => {
        this.table.loading = false
      })
    },
    update() {
      const arr = []
      const items = []
      for (const i in this.table.data) {
        const item = this.table.data[i]
        if (item.modify) {
          const datum = { 'id': item.id, 'enabled': item.enabled, 'priority': item.priority }
          arr.push(datum)
          items.push(item)
        }
      }
      const data = { 'data': arr, 'modifyUserId': store.getters.currentUserId }
      console.log(data)
      update(data).then(response => {
        this.$message({
          message: response.data,
          type: 'success'
        })
        this.updateItem(items, false)
      }).catch(e => {
        this.$notify({
          title: '失败',
          message: '操作失败，请刷新后重新操作',
          type: 'error',
          duration: 2000
        })
      })
    },
    updateItem(items, value) {
      for (const i in items) {
        items[i].modify = value
      }
    },
    change(row) {
      row.modify = true
    }
  }
}
</script>
