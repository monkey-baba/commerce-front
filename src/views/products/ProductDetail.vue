<template>
  <ElDialog :visible.sync="visible" :title="$t('product.create.title')">
    <div class="app-container">
      <el-tabs type="border-card">
        <el-tab-pane label="基本信息">
          <ElForm
            ref="updateProductForm"
            :rules="productEdit.rules"
            :model="productEdit.form"
            :inline="true"
            label-position="left"
            label-width="120px"
          >
            <ElRow>
              <ElFormItem :label="$t('product.name.name')" prop="name">
                <ElInput
                  v-model="productEdit.form.name"
                  :placeholder="$t('product.name.placeholder')"
                />
              </ElFormItem>
              <ElFormItem :label="$t('product.code.name')" prop="code">
                <ElInput
                  v-model="productEdit.form.code"
                  :placeholder="$t('product.code.placeholder')"
                />
              </ElFormItem>
            </ElRow>
            <ElRow>
              <ElFormItem :label="$t('product.categoryId.name')" prop="categoryId">
                <ElInput
                  v-model="productEdit.form.categoryId"
                  :placeholder="$t('product.categoryId.placeholder')"
                />
              </ElFormItem>
              <ElFormItem :label="$t('product.channelId.name')" prop="channelId">
                <ElSelect v-model="productEdit.form.channelId" auto-complete="on">
                  <el-option
                    v-for="item in channel"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"/>
                </ElSelect>
              </ElFormItem>
            </ElRow>
            <ElRow>
              <ElFormItem :label="$t('product.unitId.name')" prop="unitId">
                <ElSelect v-model="productEdit.form.unitId" auto-complete="on">
                  <el-option
                    v-for="item in unit"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"/>
                </ElSelect>
              </ElFormItem>
              <ElFormItem :label="$t('product.approvedId.name')" prop="approvedId">
                <ElSelect v-model="productEdit.form.approvedId" auto-complete="on">
                  <el-option
                    v-for="item in approvedStatus"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"/>
                </ElSelect>
              </ElFormItem>
            </ElRow>
            <ElRow>
              <ElTable border>
                <ElFormItem :label="$t('product.attribute.name')" prop="attribute">
                  <ElInput
                    v-model="productEdit.form.attribute"
                    :placeholder="$t('product.attribute.placeholder')"
                    label="product.unitId.name"
                  />
                  <ElInput
                    v-model="productEdit.form.attribute"
                    :placeholder="$t('product.attribute.placeholder')"
                    label="product.attribute.name"
                  />
                </ElFormItem>
              </ElTable>
            </ElRow>
            <ElRow>
              <ElFormItem :label="$t('product.images.name')" prop="images">
                <el-upload
                  ref="upload"
                  :limit="limitNum"
                  :auto-upload="false"
                  :on-exceed="handleExceed"
                  :before-upload="handleBeforeUpload"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemove"
                  action="#"
                  accept="image/png,image/gif,image/jpg,image/jpeg"
                  list-type="picture-card">
                  <i class="el-icon-plus"/>
                </el-upload>
                <ElDialog :visible.sync="dialogVisible">
                  <img :src="dialogImageUrl" width="100%" alt="">
                </ElDialog>
              </ElFormItem>
            </ElRow>
            <ElRow >
              <ElCol align="center">
                <ElButton type="primary" size="mini" icon="el-icon-circle-check-outline" @click="saveBasic">
                  保存
                </ElButton>
                <ElButton
                  class="cancel-btn"
                  size="mini"
                  icon="el-icon-refresh"
                  type="warning"
                  @click="cancelEdit"
                >
                  取消
                </ElButton>
              </ElCol>
            </ElRow>
          </ElForm>
        </el-tab-pane>
        <el-tab-pane label="SKU设置">
          <ElForm
            ref="updateSkuForm"
            :rules="skuEdit.rules"
            :model="skuEdit.form"
            :inline="true"
            label-position="left"
            label-width="120px"
          >
            <ElRow>
              <ElFormItem :label="$t('sku.spec.name')" prop="name">
                <ElSelect v-model="skuEdit.form.name" auto-complete="on">
                  <el-option
                    v-for="item in spec"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"/>
                </ElSelect>
              </ElFormItem>
            </ElRow>
            <ElRow>
              <ElTable border>
                <ElTableColumn :label="$t('sku.attributecode.name')" prop="endTime">
                  <template slot-scope="scope">
                    <template>
                      {{ scope.row.attibutecode }}
                    </template>
                  </template>
                </ElTableColumn>
                <ElTableColumn :label="$t('sku.attributename.name')" prop="active">
                  <template slot-scope="scope">
                    <template >
                      {{ scope.row.attibutename }}
                    </template>
                  </template>
                </ElTableColumn>
                <ElTableColumn :label="$t('sku.code.name')" prop="code">
                  <template slot-scope="scope">
                    <ElInput v-model="scope.row.code" class="edit-input" size="mini" />
                  </template>
                </ElTableColumn>
                <ElTableColumn :label="$t('sku.code.name')" prop="name">
                  <template slot-scope="scope">
                    <ElInput v-model="scope.row.name" class="edit-input" size="mini"/>
                  </template>
                </ElTableColumn>
              </ElTable>
            </ElRow>
            <ElRow >
              <ElCol align="center">
                <ElButton type="primary" size="mini" icon="el-icon-circle-check-outline" @click="saveSku">
                  保存
                </ElButton>
                <ElButton
                  class="cancel-btn"
                  size="mini"
                  icon="el-icon-refresh"
                  type="warning"
                  @click="cancelEdit"
                >
                  取消
                </ElButton>
              </ElCol>
            </ElRow>
          </ElForm>
        </el-tab-pane>
        <el-tab-pane label="价格维护">
          <ElForm ref="priceRowQuery" :model="priceQuery" :inline="true">
            <ElRow>
              <ElFormItem :label=" $t('price.name.name')+':' " prop="name">
                <ElInput v-model="priceQuery.name" :placeholder="$t('price.name.placeholder')" auto-complete="on"/>
              </ElFormItem>
              <ElFormItem :label=" $t('price.channelId.name')+':' " prop="channelId">
                <ElSelect v-model="priceQuery.channelId" auto-complete="on">
                  <el-option
                    v-for="item in channel"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"/>
                </ElSelect>
              </ElFormItem>
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
          <hr>
          <div class="filter-container" style="margin: 0 10px">
            <ElButton type="primary" class="blue-btn" size="small" @click="handleCreate(undefined,0)">
              创建
            </ElButton>
          </div>
          <el-table
            border
            fit
            stripe
            highlight-current-row>
            <el-table-column label="sku编码" prop="skuId" />
            <el-table-column label="规格信息" prop="" />
            <el-table-column label="价格类型" prop="priceTypeId" />
            <el-table-column label="价格" prop="price" />
            <el-table-column label="有效期起" prop="startTime" type="date"/>
            <el-table-column label="有效期止" prop="endTime" type="date"/>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="库存信息">
          <el-table
            border
            fit
            stripe
            highlight-current-row>
            <el-table-column label="SKU" prop="" />
            <el-table-column label="SKU名称" prop="" />
            <el-table-column label="仓库" prop="" />
            <el-table-column label="可用量" prop="" />
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
  </ElDialog>
</template>
<script>
import { getPrice } from '@/api/price'
import { getApprovedStatus, getChannel, getUnit, getSpec } from '@/api/product'

export default {
  name: 'ProductDetail',
  filters: {
    stepFilter: (value) => {
      const stepMap = {
      }
      return stepMap[value]
    }
  },
  data() {
    return {
      visible: true,
      priceQuery: {
        name: '',
        channelId: ''
      },
      search: {
        loading: false
      },
      table: {
        loading: false,
        data: undefined,
        select: []
      },
      productEdit: {
        visible: true,
        rules: {
        },
        form: {}
      },
      skuEdit: {
        visible: true,
        rules: {
        },
        form: {}
      },
      channel: [],
      channelMap: {},
      approvedStatus: [],
      approvedStatusMap: {},
      unit: [],
      unitMap: {},
      spec: [],
      specMap: {},
      dialogVisible: false,
      dialogImageUrl: '',
      limitNum: 5
    }
  },
  methods: {
    init(id) {
      this.visible = true
      this.initChannel()
      this.initApprovedStatus()
      this.initUnit()
      this.initSpec()
    },
    initApprovedStatus() {
      getApprovedStatus().then(response => {
        this.approvedStatus = response.data
        this.approvedStatus.forEach(v => {
          this.approvedStatusMap[v.id] = v.name
        })
      }).catch(() => {
        console.log('查询失败')
      })
    },
    initSpec() {
      getSpec().then(response => {
        this.spec = response.data
        this.spec.forEach(v => {
          this.specMap[v.id] = v.name
        })
      }).catch(() => {
        console.log('查询失败')
      })
    },
    initChannel() {
      getChannel().then(response => {
        this.channel = response.data
        this.channel.forEach(v => {
          this.channelMap[v.id] = v.name
        })
      }).catch(() => {
        console.log('查询失败')
      })
    },
    initUnit() {
      getUnit().then(response => {
        this.unit = response.data
        this.unit.forEach(v => {
          this.unitMap[v.id] = v.name
        })
      }).catch(() => {
        console.log('查询失败')
      })
    },
    resetQuery() {
      this.$refs['priceQuery'].resetFields()
    },
    handleSizeChange(val) {
      this.priceQuery.limit = val
      this.getData()
    },
    handleCurrentChange(val) {
      this.priceQuery.pageNum = val
      this.getData()
    },
    getData() {
      this.table.loading = true
      getPrice(this.priceQuery).then(response => {
        const items = response.data.list
        this.table.data = items.map(v => {
          this.$set(v, 'edit', false) // https://vuejs.org/v2/guide/reactivity.html
          v.original = JSON.stringify(v) //  will be used when price click the cancel botton
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
    saveBasic() {

    },
    saveSku() {

    },
    // 上传文件之前的钩子
    handleBeforeUpload(file) {
      console.log('before')
      if (!(file.type === 'image/png' || file.type === 'image/gif' || file.type === 'image/jpg' || file.type === 'image/jpeg')) {
        this.$notify.warning({
          title: '警告',
          message: '请上传格式为image/png, image/gif, image/jpg, image/jpeg的图片'
        })
      }
      const size = file.size / 1024 / 1024 / 2
      if (size > 2) {
        this.$notify.warning({
          title: '警告',
          message: '图片大小必须小于2M'
        })
      }
    },
    // 文件超出个数限制时的钩子
    handleExceed(files, fileList) {

    },
    // 文件列表移除文件时的钩子
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    // 点击文件列表中已上传的文件时的钩子
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    uploadFile() {
      this.$refs.upload.submit()
    },
    cancelEdit() {
      this.visible = false
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
