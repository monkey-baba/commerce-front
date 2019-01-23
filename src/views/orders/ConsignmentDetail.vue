<template>
  <div class="app-container">
    <el-row>
      <el-col>
        <div class="order-basic" >
          <div class="order-basic-header clearfix">
            <span>配货单头信息</span>
          </div>
          <div class="order-basic-body">
            <el-row :gutter="20" class="row-bg">
              <el-col :span="6"><div>平台订单号：000001</div></el-col>
              <el-col :span="6"><div>配货单号：</div></el-col>
              <el-col :span="6"><div>配货单状态：</div></el-col>
              <el-col :span="6"><div>配送方式：</div></el-col>
            </el-row>
            <el-row :gutter="20" class="row-bg">
              <el-col :span="6"><div>客户ID：</div></el-col>
              <el-col :span="6"><div>平台：</div></el-col>
              <el-col :span="6"><div>店铺：</div></el-col>
              <el-col :span="6"><div>下单门店：</div></el-col>
            </el-row>
            <el-row :gutter="20" class="row-bg">
              <el-col :span="6"><div>下单日期：</div></el-col>
              <el-col :span="6"><div>付款日期：</div></el-col>
              <el-col :span="6"><div>订单金额：</div></el-col>
              <el-col :span="6"><div>运费金额：</div></el-col>
            </el-row>
            <el-row :gutter="20" class="row-bg">
              <el-col :span="6"><div>订单来源：</div></el-col>
              <el-col :span="6"><div>销售渠道：</div></el-col>
            </el-row>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <div class="order-basic" >
          <div class="order-basic-header clearfix">
            <span>收件人信息</span>
          </div>
          <div class="order-basic-body">
            <el-row :gutter="20" class="row-bg">
              <el-col :span="6"><div>收件人：000001</div></el-col>
              <el-col :span="6"><div>手机：</div></el-col>
              <el-col :span="6"><div>地址：</div></el-col>
              <el-col :span="6"><div>电话：</div></el-col>
            </el-row>
            <el-row :gutter="20" class="row-bg">
              <el-col :span="6"><div>指定发货点编码：</div></el-col>
              <el-col :span="6"><div>指定发货点名称：</div></el-col>
              <el-col :span="6"><div>地址：</div></el-col>
              <el-col :span="6"><div>联系电话：</div></el-col>
            </el-row>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <div class="order-basic" >
          <div class="order-basic-header clearfix">
            <span>备注信息</span>
          </div>
          <div class="order-basic-body">
            <el-row :gutter="20" class="row-bg">
              <el-col :span="12">
                <div>买家留言</div>
              </el-col>
              <el-col :span="12">
                <div class="order-basic" >
                  <div class="order-basic-header clearfix">
                    <span>客服信息</span>
                  </div>
                  <div class="order-basic-body">
                    <el-table
                      border
                      fit
                      stripe
                      highlight-current-row>
                      <el-table-column label="添加时间" prop="" />
                      <el-table-column label="添加人" prop="" />
                      <el-table-column label="备注" prop="" />
                    </el-table>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-tabs type="border-card">
      <el-tab-pane label="配货单行">
        <el-table
          border
          fit
          stripe
          highlight-current-row>
          <el-table-column label="行号" prop="" />
          <el-table-column label="SKU" prop="code" >
            <template slot-scope="scope">
              <router-link :to="{name:'OrderDetail',params: {code: scope.row.code }}" class="link-type"> {{ scope.row.code }}</router-link>
            </template>
          </el-table-column>
          <el-table-column label="商品名称" prop="" />
          <el-table-column label="颜色" prop="" />
          <el-table-column label="尺码" prop="" />
          <el-table-column label="数量" prop="" />
          <el-table-column label="已发货数量" prop=""/>
        </el-table>
      </el-tab-pane>
    </el-tabs>
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
      font-size: 16px;
      font-weight: 500;
      border-bottom: 1px solid #ebeef5;
    }
    .order-basic-body{
      font-size: 13px;
    }
  }
  .row-bg {
    padding: 10px 0;
  }
</style>
