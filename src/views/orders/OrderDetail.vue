<template>
  <div class="app-container">
    <el-row>
      <el-col>
        <div align="right" style="margin-bottom: 10px">
          <el-button type="primary" class="green-btn" size="small">审核</el-button>
          <el-button type="primary" class="tiffany-btn" size="small">打印</el-button>
          <el-button type="info" size="small">取消</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-card shadow="never">
          <el-steps :active="order.status | stepFilter" align-center>
            <el-step :title="$t('order.status.CREATED')"/>
            <el-step :title="$t('order.status.PENDING')"/>
            <el-step :title="$t('order.status.APPROVED')"/>
            <el-step :title="$t('order.status.SHIPPED')"/>
            <el-step :title="$t('order.status.COMPLETED')"/>
          </el-steps>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <div class="order-basic" >
          <div class="order-basic-header clearfix">
            <span>基本信息</span>
          </div>
          <div class="order-basic-body"/>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'OrderDetail',
  filters: {
    stepFilter: (value) => {
      const stepMap = {
        'CREATED': '1',
        'PENDING': '2',
        'APPROVED': '3',
        'SHIPPED': '4',
        'COMPLETED': '5'
      }
      return stepMap[value]
    }
  },
  data() {
    return {
      order: {
        status: 'COMPLETED'
      }
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .order-basic {
    border: 1px solid #ebeef5;
    margin: 10px auto;
    border-radius: 4px;
    .order-basic-header{
      padding: 10px;
      font-size: 14px;
      font-weight: 500;
      border-bottom: 1px solid #ebeef5;
    }
  }
</style>
