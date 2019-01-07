<template>
  <div class="app-container">
    <div class="filter-container">
      <ElButton type="primary" size="small">
        新增路由
      </ElButton>
      <ElButton type="primary" size="small">
        导入路由
      </ElButton>
      <ElButton type="primary" size="small">
        导出路由
      </ElButton>
    </div>
    <ElRow>
      <ElCol span="8">
        <ElCard style="margin-right:10px" shadow="never">
          <ElTree :data="data" :props="defaultProps" default-expand-all="true" @node-click="handleNodeClick" />
        </ElCard>
      </ElCol>
      <ElCol span="16">
        <ElCard shadow="never">
          <div />
        </ElCard>
      </ElCol>
    </ElRow>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      data: [{
        label: '一级 1',
        children: [{
          label: '二级 1-1',
          children: [{
            label: '三级 1-1-1'
          }]
        }]
      }, {
        label: '一级 2',
        children: [{
          label: '二级 2-1',
          children: [{
            label: '三级 2-1-1'
          }]
        }, {
          label: '二级 2-2',
          children: [{
            label: '三级 2-2-1'
          }]
        }]
      }, {
        label: '一级 3',
        children: [{
          label: '二级 3-1',
          children: [{
            label: '三级 3-1-1'
          }]
        }, {
          label: '二级 3-2',
          children: [{
            label: '三级 3-2-1'
          }]
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    handleNodeClick(data) {
      console.log(data)
    }
  }
}
</script>

<style scoped>

</style>
