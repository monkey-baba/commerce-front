<template>
  <div class="app-container">
    <el-tabs type="border-card">
      <el-tab-pane label="基本信息">
        <ElForm
          ref="basicForm"
          :rules="basicEdit.rules"
          :model="basicEdit.form"
          :inline="true"
          label-position="left"
          label-width="120px"
        >
          <ElRow>
            <ElFormItem :label="$t('product.name.name')" prop="name">
              <ElInput
                v-model="basicEdit.form.name"
                :placeholder="$t('product.name.placeholder')"
              />
            </ElFormItem>
            <ElFormItem :label="$t('product.code.name')" prop="code">
              <ElInput
                v-model="basicEdit.form.code"
                :placeholder="$t('product.code.placeholder')"
              />
            </ElFormItem>
          </ElRow>
          <ElRow>
            <ElFormItem :label="$t('product.categoryId.name')" prop="categoryId">
              <ElInput
                v-model="basicEdit.form.categoryId"
                :placeholder="$t('product.categoryId.placeholder')"
              />
            </ElFormItem>
            <ElFormItem :label="$t('product.channelId.name')" prop="channelId">
              <ElSelect v-model="basicEdit.form.channelId" auto-complete="on">
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
              <ElSelect v-model="basicEdit.form.unitId" auto-complete="on">
                <el-option
                  v-for="item in unit"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"/>
              </ElSelect>
            </ElFormItem>
            <ElFormItem :label="$t('product.approvedId.name')" prop="approvedId">
              <ElSelect v-model="basicEdit.form.approvedId" auto-complete="on">
                <el-option
                  v-for="item in approvedStatus"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"/>
              </ElSelect>
            </ElFormItem>
          </ElRow>
          <ElRow>
            <ElFormItem :label="$t('product.attr.name')" prop="attribute.key">
              <ElSelect v-model="basicEdit.form.attrKey" auto-complete="on">
                <el-option
                  v-for="item in attrList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"/>
              </ElSelect>
            </ElFormItem>
            <ElFormItem :label="$t('product.attr.name')" prop="attribute.value">
              <ElInput
                v-model="basicEdit.form.attrValue"
              />
            </ElFormItem>
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
            </ElCol>
          </ElRow>
        </ElForm>
      </el-tab-pane>
      <el-tab-pane label="价格维护">
        <ElForm ref="priceQuery" :model="priceQuery" :inline="true">
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
        </ElForm>
        <hr>
        <div class="filter-container" style="margin: 0 10px">
          <ElButton type="primary" class="blue-btn" size="small" @click="handlePriceRowCreate">创建</ElButton>
          <el-button type="primary" size="small" class="el-icon-delete" @click="handlePriceRowDeletes">删除</el-button>
        </div>
        <ElTable>
          <ElTableColumn type="selection"/>
          <ElTableColumn :label="$t('general.index')" type="index"/>
          <ElTableColumn label="sku编码" prop="skuId">
            <template slot-scope="scope">
              <template>
                {{ scope.row.skuId }}
              </template>
            </template>
          </ElTableColumn>
          <ElTableColumn label="规格信息" prop="spec">
            <template slot-scope="scope">
              <template>
                {{ scope.row.spec }}
              </template>
            </template>
          </ElTableColumn>
          <ElTableColumn label="价格类型" prop="priceType">
            <template slot-scope="scope">
              <template>
                {{ scope.row.priceType }}
              </template>
            </template>
          </ElTableColumn>
          <ElTableColumn label="价格" prop="price">
            <template slot-scope="scope">
              <template>
                {{ scope.row.price }}
              </template>
            </template>
          </ElTableColumn>
          <ElTableColumn label="有效期起" prop="startTime">
            <template slot-scope="scope">
              <template>
                {{ scope.row.startTime }}
              </template>
            </template>
          </ElTableColumn>
          <ElTableColumn label="有效期止" prop="endTime">
            <template slot-scope="scope">
              <template>
                {{ scope.row.endTime }}
              </template>
            </template>
          </ElTableColumn>
          <ElTableColumn label="操作" min-width="200px">
            <template slot-scope="scope">
              <router-link :to="'./ProductDetail/'+scope.row.id">
                <el-button type="primary" size="small" icon="el-icon-edit">Edit</el-button>
              </router-link>
            </template>
          </ElTableColumn>
        </ElTable>

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
</template>
<script>
import { getPrice } from '@/api/price'
import { getPriceRows } from '@/api/pricerow'
import { getApprovedStatus, getChannel, getUnit, getSpec, getBaicData, updateBasic, getAttr } from '@/api/product'

export default {
  name: 'ProductDetail',
  props: {
    isEdit: {
      type: Boolean,
      default: false
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
      basicEdit: {
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
      attrList: [],
      attrMap: {},
      unit: [],
      unitMap: {},
      spec: [],
      specMap: {},
      dialogVisible: false,
      dialogImageUrl: '',
      limitNum: 5,
      tempRoute: {}
    }
  },
  created() {
    const id = this.$route.params && this.$route.params.id
    this.fetchData(id)

    // Why need to make a copy of this.$route here?
    // Because if you enter this page and quickly switch tag, may be in the execution of the setTagsViewTitle function, this.$route is no longer pointing to the current page
    // https://github.com/PanJiaChen/vue-element-admin/issues/1221
    this.tempRoute = Object.assign({}, this.$route)
  },
  methods: {
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
    initAttr() {
      getAttr().then(response => {
        this.attrList = response.data
        this.attrList.forEach(v => {
          this.attrMap[v.id] = v.name
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
    fetchData(id) {
      this.initChannel()
      this.initApprovedStatus()
      this.initUnit()
      this.initSpec()
      this.initAttr()
      this.fetchBaicData(id)
      this.fetchPriceData(id)
    },
    fetchBaicData(id) {
      getBaicData(id).then(response => {
        this.basicEdit.form = response.data
      })
    },
    fetchPriceData(id) {
      getPrice(id).then(response => {
        const items = response.data.list
        this.table.data = items.map(v => {
          this.$set(v, 'edit', false) // https://vuejs.org/v2/guide/reactivity.html
          v.original = JSON.stringify(v) //  will be used when price click the cancel botton
          if (v.index === 0) {
            this.fetchPriceRowData(v.id)
          }
          return v
        })
      }).catch((e) => {
      })
    },
    handlePriceRowCreate() {

    },
    handlePriceRowDeletes() {

    },
    fetchPriceRowData(priceId) {
      getPriceRows(priceId).then(response => {
        const items = response.data.list
        this.table.data = items.map(v => {
          this.$set(v, 'edit', false) // https://vuejs.org/v2/guide/reactivity.html
          v.original = JSON.stringify(v) //  will be used when price click the cancel botton
          return v
        })
      }).catch((e) => {
      })
    },
    saveBasic() {
      updateBasic(this.basicEdit.form).then(response => {
        alert(this.basicEdit.form)
        this.$message({
          message: response.data,
          type: 'success'
        })
      }).catch(e => {
        const response = e.response
        this.$message({
          message: response !== undefined ? response.data : e.message,
          type: 'error',
          duration: 5 * 1000
        })
      })
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
