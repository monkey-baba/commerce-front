<template>
  <div class="app-container">
    <div class="filter-container">
      <ElForm ref="roleQuery" :model="roleQuery" :inline="true">
        <ElRow>
          <ElCol>
            <ElFormItem :label=" $t('router.roleName.label')+':' " prop="name" >
              <ElSelect v-model="roleQuery.value" :placeholder="$t('router.roleName.placeholder')" :remote-method="filterRoleNames" remote filterable>
                <ElOption
                  v-for="item in roleQuery.options"
                  :key="item.key"
                  :label="item.label"
                  :value="item.key"/>
              </ElSelect>
            </ElFormItem>
          </ElCol>
        </ElRow>
        <ElRow>
          <ElFormItem>
            <ElCol>
              <ElButton :loading="search.loading" type="primary" size="small" @click="confirm">
                确认
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
    <div class="filter-container" style="margin: 0 10px"/>

  </div>
</template>

<script>
import { findRoleByName } from '@/api/role'

export default {
  name: 'AuthRole',
  data() {
    return {
      roleQuery: {
        value: undefined,
        options: []
      },
      search: {
        loading: false
      }
    }
  },
  created() {
    // this.getData()
  },
  methods: {
    resetQuery() {
      this.$refs['roleQuery'].resetFields()
      this.roleQuery.options = []
      this.roleQuery.value = undefined
    },
    filterRoleNames(str) {
      findRoleByName(str).then(response => {
        this.roleQuery.options = response.data
      }).catch(() => {
        // console.log(JSON.stringify(e))
        this.$notify({
          title: '失败',
          message: '查询角色失败',
          type: 'error',
          duration: 2000
        })
      }
      )
    },
    confirm() {
      alert(this.roleQuery.value)
      if (this.roleQuery.value === undefined) {
        return
      }
      // 生成路由树
      console.log(JSON.stringify(this.$router.options))
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
