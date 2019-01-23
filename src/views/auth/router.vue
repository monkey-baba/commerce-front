<template>
  <div class="app-container">
    <div class="filter-container">
      <ElRow>
        <ElCol>
          <ElButton :loading="search.loading" type="primary" icon="el-icon-refresh" size="small" style="margin-right: 10px" @click="refresh">
            刷新
          </ElButton>
          <ElDropdown @command="handleCommand">
            <el-button >
              更多操作
              <i class="el-icon-arrow-down el-icon--right"/>
            </el-button>
            <ElDropdownMenu slot="dropdown">
              <ElDropdownItem command="a">展开一级</ElDropdownItem>
              <ElDropdownItem command="b">展开二级</ElDropdownItem>
              <ElDropdownItem command="c">全部展开</ElDropdownItem>
              <ElDropdownItem command="e" divided>全部关闭</ElDropdownItem>
            </ElDropdownMenu>
          </ElDropdown>
        </ElCol>
      </ElRow>
      <ElRow/>
    </div>
    <hr>
    <ElRow>
      <ElCol :span="8">
        <ElInput
          v-model="tree.filterText"
          placeholder="输入关键字进行过滤"/>

        <el-tree
          ref="tree"
          :data="tree.data"
          :filter-node-method="filterNode"
          node-key="id"
          class="filter-tree"
          highlight-current
          @node-click="handleNodeClick"/>
      </ElCol>
    </ElRow>

  </div>
</template>

<script>
import { roleTree } from '@/api/role'

export default {
  name: 'AuthRouter',
  data() {
    return {
      roleQuery: {
        value: undefined,
        options: []
      },
      search: {
        loading: false
      },
      tree: {
        data: undefined,
        filterText: ''
      }
    }
  },
  computed: {
    filterText() {
      return this.tree.filterText
    }
  },
  watch: {
    // 借用computed监听filterText
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  created() {
    this.getData()
  },
  methods: {
    resetQuery() {
      this.$refs['roleQuery'].resetFields()
      this.roleQuery.options = []
      this.roleQuery.value = undefined
    },
    getData() {
      roleTree().then((response) => {
        this.tree.data = response.data
        this.search.loading = false
      }).catch(() =>
        this.$notify({
          title: '失败',
          message: '更新失败',
          type: 'error',
          duration: 2000
        })
      )
    },
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    handleNodeClick(data) {
      console.log(data)
    },
    handleCommand(command) {
      this.$message('click on item ' + command)
    },
    refresh() {
      this.search.loading = true
      this.getData()
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
