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
          <!--          <ElRow>
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
          </ElRow>-->
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
        <!-- 高级规格 -->
        <div class="specification">
          <div class="title">产品规格设置</div>
          <ul class="spec-list">
            <li v-for="(item,index) in specification" :key="index" class="item">
              <div class="name">
                <ElSelect v-model="specs[index]" @change="handleSpecSelect(index)">
                  <el-option
                    v-for="s in spec"
                    :key="s.id"
                    :label="s.name"
                    :value="s.id"/>
                </ElSelect>
                <i class="icon el-icon-circle-close" @click="delSpec(index)"/>
              </div>
              <div class="values">
                <el-checkbox-group v-model="specvalues[index]" @change="handleSpecValueSelect(index)">
                  <el-checkbox-button
                    v-for="s in specValueList[index]"
                    :label="s.id"
                    :key="s.id"
                  >
                    {{ s.name }}
                  </el-checkbox-button>
                </el-checkbox-group>
                <div class="add-attr">
                  <!--
                  <el-input v-model="addValues[index]" size="small" placeholder="多个产品属性以空格隔开" icon="plus" @click="addSpecTag(index)" @keyup.native.enter="addSpecTag(index)"/>
-->
                </div>
              </div>
            </li>
          </ul>
          <div class="add-spec">
            <el-button :disabled="specification.length >= 5" size="small" type="info" @click="addSpec">添加规格项目</el-button>
          </div>
        </div>

        <table class="stock-table">
          <thead>
            <tr>
              <th v-for="item in specification" :key="item" >{{ item.name }}</th>
              <th>sku编码</th>
              <th>sku名称</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in countSum(0)" :key="index">
              <td
                v-for="(n, specIndex) in specification.length"
                v-if="showTd(specIndex, index)"
                :key="specIndex"
                :rowspan="countSum(n)">
                {{ getSpecAttr(specIndex, index) }}
              </td>
              <td>
                <ElInput v-model="skuEdit.form[index].skuId" class="edit-input" size="mini"/>
              </td>
              <td>
                <ElInput v-model="skuEdit.form[index].skuName" class="edit-input" size="mini" />
              </td>
            </tr>
          </tbody>
        </table>
        <ElRow >
          <ElCol align="center">
            <ElButton type="primary" size="mini" icon="el-icon-circle-check-outline" @click="saveSku">
              保存
            </ElButton>
          </ElCol>
        </ElRow>
      </el-tab-pane>
      <el-tab-pane label="价格维护">
        <ElForm ref="priceRowQuery" :model="priceRowQuery" :inline="true">
          <ElRow>
            <ElFormItem :label=" $t('price.name.name')+':' " prop="priceId">
              <ElSelect v-model="priceRowQuery.priceId" auto-complete="on">
                <el-option
                  v-for="item in priceList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"/>
              </ElSelect>
            </ElFormItem>
            <ElFormItem :label=" $t('price.channelId.name')+':' " prop="channelId">
              <ElInput v-model="priceRowQuery.channelId" class="edit-input" size="mini" contenteditable="false"/>
            </ElFormItem>
          </ElRow>
        </ElForm>
        <hr>
        <div class="filter-container" style="margin: 0 10px">
          <ElButton type="primary" class="blue-btn" size="small" @click="handlePriceRowCreate">创建</ElButton>
          <el-button type="primary" size="small" class="el-icon-delete" @click="handlePriceRowDeletes">删除</el-button>
        </div>
        <ElTable
          v-loading="priceRowTable.loading"
          :data="priceRowTable.data"
          border
          fit
          stripe
          highlight-current-row
          @selection-change="handleSelectionChange">
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
                {{ priceTypeMap[scope.row.priceType] }}
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

    <ElDialog :visible.sync="priceRowCreate.visible" :title="$t('pricerow.create.title')">
      <ElForm
        ref="createPriceRowForm"
        :rules="priceRowCreate.rules"
        :model="priceRowCreate.form"
        label-position="left"
        label-width="100px"
        style="width: 600px; margin-left:50px;"
      >
        <ElFormItem :label="$t('pricerow.priceTypeId.name')" prop="priceTypeId">
          <ElSelect v-model="priceRowCreate.form.priceTypeId" auto-complete="on">
            <el-option
              v-for="item in priceTypeList"
              :key="item.id"
              :label="item.name"
              :value="item.id"/>
          </ElSelect>
        </ElFormItem>
        <ElFormItem :label="$t('pricerow.skuId.name')" prop="skuId">
          <ElInput
            v-model="priceRowCreate.form.skuId"
            :placeholder="$t('pricerow.skuId.placeholder')"
          />
        </ElFormItem>
        <ElFormItem :label="$t('pricerow.price.name')" prop="price">
          <ElInput
            v-model="priceRowCreate.form.price"
            :placeholder="$t('pricerow.price.placeholder')"
          />
        </ElFormItem>
        <ElFormItem :label="$t('pricerow.startTime.name')" prop="startTime">
          <ElDatePicker
            v-model="priceRowCreate.form.startTime"
            :placeholder="$t('pricerow.startTime.placeholder')"
            type="datetime"
          />
        </ElFormItem>
        <ElFormItem :label="$t('pricerow.endTime.name')" prop="endTime">
          <ElDatePicker
            v-model="priceRowCreate.form.endTime"
            :placeholder="$t('pricerow.endTime.placeholder')"
            type="datetime"
          />
        </ElFormItem>
      </ElForm>
      <div slot="footer" class="dialog-footer">
        <ElButton @click="priceRowCreate.visible = false">
          {{ $t('table.cancel') }}
        </ElButton>
        <ElButton type="primary" @click="createPriceRowData">
          {{ $t('table.confirm') }}
        </ElButton>
      </div>
    </ElDialog>
  </div>
</template>
<script>
import { getPrice } from '@/api/price'
import { getPriceRows, getPriceType, createPriceRow } from '@/api/pricerow'
import { getApprovedStatus, getChannel, getUnit, getSpec, getBaicData, updateBasic, getAttr, getSkuMeta, saveSku, getSkus } from '@/api/product'

export default {
  name: 'ProductDetail',
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data: function() {
    return {
      visible: true,
      priceRowQuery: {
        priceId: '',
        channelId: ''
      },
      basicEdit: {
        visible: true,
        rules: {},
        form: {}
      },
      skuEdit: {
        visible: true,
        rules: {},
        form: [{
          skuId: '',
          skuName: '',
          meta: []
        }, {
          skuId: '',
          skuName: '',
          meta: []
        }, {
          skuId: '',
          skuName: '',
          meta: []
        }, {
          skuId: '',
          skuName: '',
          meta: []
        }, {
          skuId: '',
          skuName: '',
          meta: []
        }, {
          skuId: '',
          skuName: '',
          meta: []
        }, {
          skuId: '',
          skuName: '',
          meta: []
        }, {
          skuId: '',
          skuName: '',
          meta: []
        }
        ]
      },
      priceRowTable: {
        loading: false,
        data: undefined,
        select: []
      },
      priceRowCreate: {
        visible: false,
        rules: {},
        form: {}
      },
      channel: [],
      channelMap: {},
      priceList: [],
      specValueList: [],
      specValueMap: {},
      priceChannelList: '',
      approvedStatus: [],
      approvedStatusMap: {},
      attrList: [],
      attrMap: {},
      unit: [],
      unitMap: {},
      spec: [],
      specMap: {},
      priceTypeList: [],
      priceTypeMap: {},
      dialogVisible: false,
      dialogImageUrl: '',
      limitNum: 5,
      tempRoute: {},
      specification: [],
      addValues: [], // 用来存储要添加的规格属性
      specs: [],
      specvalues: [[], [], [], [], []],
      productid: ''
    }
  },
  created() {
    this.productid = this.$route.params && this.$route.params.id
    this.fetchData(this.productid)

    // Why need to make a copy of this.$route here?
    // Because if you enter this page and quickly switch tag, may be in the execution of the setTagsViewTitle function, this.$route is no longer pointing to the current page
    // https://github.com/PanJiaChen/vue-element-admin/issues/1221
    this.tempRoute = Object.assign({}, this.$route)
  },
  methods: {
    handleSelectionChange(val) {
      this.table.select = val
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
    initPriceType() {
      getPriceType().then(response => {
        this.priceTypeList = response.data
        this.priceTypeList.forEach(v => {
          this.priceTypeMap[v.id] = v.name
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
    fetchData(productId) {
      this.initChannel()
      this.initApprovedStatus()
      this.initUnit()
      this.initSpec()
      this.initAttr()
      this.initPriceType()
      this.fetchBaicData(productId)
      this.fetchPriceData(productId)
      this.fetchSkuData(productId)
    },
    fetchBaicData(id) {
      getBaicData(id).then(response => {
        this.basicEdit.form = response.data
      })
    },
    fetchSkuData() {
      getSkus(this.productid).then(response => {
        this.specification = response.data
        this.specification.forEach((item, index) => {
          this.specs[index] = item.name
          item.name = this.specMap[item.name]
          this.fetchMetaData(index)
          const specvalueid = []
          item.value.forEach((v, inde) => {
            specvalueid[inde] = v.specvalueid
            this.skuEdit.form[inde].skuId = v.spacVoc.skuId
            this.skuEdit.form[inde].skuName = v.spacVoc.skuName
          })
          this.specvalues[index] = specvalueid
          this.$forceUpdate()
        })
      }).catch((e) => {
      })
    },
    fetchPriceData(productId) {
      getPrice(productId).then(response => {
        const items = response.data
        this.priceList = items
        this.priceRowQuery.channelId = this.priceList[0].channelId[0]
        this.priceRowQuery.priceId = this.priceList[0].id
        this.fetchPriceRowData(this.priceList[0].id)
      }).catch((e) => {
      })
    },
    handlePriceRowCreate() {
      this.priceRowCreate.form = {
        priceId: this.priceRowQuery.priceId,
        skuId: '',
        price: 0.00,
        priceTypeId: '',
        startTime: '',
        endTime: ''
      }
      this.priceRowCreate.visible = true
      this.$nextTick(() => {
        this.$refs['createPriceRowForm'].clearValidate()
      })
    },
    handlePriceRowDeletes() {

    },
    fetchPriceRowData(priceId) {
      getPriceRows(priceId).then(response => {
        const items = response.data
        this.priceRowTable.data = items
      }).catch((e) => {
      })
    },
    createPriceRowData() {
      this.$refs['createPriceRowForm'].validate((valid) => {
        if (valid) {
          createPriceRow(this.priceRowCreate.form).then(() => {
            this.priceRowCreate.visible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          }).catch((e) => {
            this.$notify({
              title: '失败',
              message: '价格行创建失败' + e,
              type: 'error',
              duration: 2000
            })
          })
        }
      })
    },
    saveBasic() {
      updateBasic(this.basicEdit.form).then(response => {
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
      for (let i = 0; i < this.countSum(0); i++) {
        for (let j = 0; j < this.specification.length; j++) {
          this.skuEdit.form[i].meta[j] = {
            specId: this.specification[j].specid,
            metaId: this.specification[j].value[parseInt(i / this.countSum(j + 1)) % this.specification[j].value.length].specvalueid
          }
        }
      }
      saveSku(this.productid, this.skuEdit.form).then(() => {
        this.$notify({
          title: '成功',
          message: '创建成功',
          type: 'success',
          duration: 2000
        })
      }).catch((e) => {
        this.$notify({
          title: '失败',
          message: 'sku保存失败' + e,
          type: 'error',
          duration: 2000
        })
      })
    },
    handleSpecSelect(index) {
      if (this.specification[index] !== undefined) {
        this.specification[index].name = this.specMap[this.specs[index]]
        this.specification[index].specid = this.specs[index]
      }
      this.fetchMetaData(index)
    },
    fetchMetaData(index) {
      getSkuMeta(this.specs[index]).then(response => {
        const items = response.data
        this.specValueList[index] = items
        this.specValueList[index].forEach(v => {
          this.specValueMap[v.id] = v.name
        })
        this.$forceUpdate()
      }).catch((e) => {
      })
    },
    handleSpecValueSelect(index) {
      this.addSpecValue(index)
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
      this.$notify({
        title: '失败',
        message: '文件数目超出限制',
        type: 'error',
        duration: 2000
      })
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
    },
    // 添加规格项目
    addSpec() {
      if (this.specification.length < 5) {
        this.specification.push({
          name: '',
          value: []
        })
      }
    },

    // 删除规格项目
    delSpec(index) {
      this.specification.splice(index, 1)
      this.$forceUpdate()
    },
    // 添加规格属性
    addSpecValue(index) {
      this.$set(this.specification[index], 'value', [])
      const arr = this.specvalues[index]
      arr.forEach(item => {
        this.specification[index].value.push({
          specvalueid: item,
          specParamName: this.specValueMap[item],
          spacVoc: {
            skuId: '', // sku
            skuName: '' // sku名称
          }
        })
      })
      const res = new Map()
      const newArr = this.specification[index].value.filter(key => !res.has(key.specParamName) && res.set(key.specParamName, 1) && !res.has(key.specvalueid) && res.set(key.specvalueid, 1))
      this.$set(this.specification[index], 'value', newArr)
      this.clearAddValues(index)
      this.$forceUpdate()
    },

    // 清空 addValues
    clearAddValues(index) {
      this.$set(this.addValues, index, '')
    },

    /*
      根据传入的属性值，拿到相应规格的属性
      @params
        specIndex 规格项目在 advancedSpecification 中的序号
        index 所有属性在遍历时的序号
    */
    getSpecAttr(specIndex, index) {
      // 获取当前规格项目下的属性值
      const currentValues = this.specification[specIndex].value
      let indexCopy

      // 判断是否是最后一个规格项目
      if (this.specification[specIndex + 1] && this.specification[specIndex + 1].value.length) {
        indexCopy = index / this.countSum(specIndex + 1)
      } else {
        indexCopy = index
      }

      const i = indexCopy % currentValues.length
      if (i.toString() !== 'NaN' && i % 1 === 0) {
        return currentValues[i].specParamName
      } else {
        return ''
      }
    },

    /*
      计算属性的乘积
      @params
        specIndex 规格项目在 advancedSpecification 中的序号
    */
    countSum(specIndex) {
      let num = 1
      this.specification.forEach((item, index) => {
        if (index >= specIndex && item.value.length) {
          num *= item.value.length
        }
      })
      return num
    },

    // 根据传入的条件，来判断是否显示该td
    showTd(specIndex, index) {
      // 如果当前项目下没有属性，则不显示
      if (!this.specification[specIndex]) {
        return false

        // 自己悟一下吧
      } else if (index % this.countSum(specIndex + 1) === 0) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .title {
    padding: 0 12px;
    line-height: 1;
    font-size: 18px;
    border-left: 4px solid #50bfff;
    color: #666;
    margin: 0 0 16px 0;
    font-weight: 400;
  }
  .example {
    margin-top: 50px;
  }
  .specification {
    display: inline-block;
    vertical-align: top;
    width: 480px;
    .spec-list {
      background-color: #fff;
      border: 1px solid #d8d8d8;
      padding: 10px;
      .item {
        margin-top: 5px;
        &:first-child {
          margin-top: 0;
        }
        .name {
          background: #f3f6fb;
          padding: 2px 8px;
          overflow: hidden;
          .el-input {
            float: left;
            width: 150px;
          }
          .icon {
            display: none;
            color: #929292;
            cursor: pointer;
            &:hover {
              color: #880000;
            }
          }
          &:hover {
            .icon {
              display: inline-block;
            }
          }
        }
        .values {
          .el-tag {
            margin: 8px 0 0 8px;
          }
          .add-attr {
            display: inline-block;
            vertical-align: top;
            .el-input {
              width: 200px;
              margin: 2px 0 0 4px;
            }
          }
        }
      }
      .add-spec {
        font-size: 13px;
      }
    }
  }
  .stock-table {
    td,
    th {
      padding: 5px 10px;
      border: 1px solid #ddd;
      width: 100px;
      font-size: 14px;
    }
  }
</style>
