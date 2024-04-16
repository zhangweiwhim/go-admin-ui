
<template>
  <BasicLayout>
    <template #wrapper>
      <el-card class="box-card">
        <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="68px">
          <el-form-item label="学期" prop="xueqi"><el-select
            v-model="queryParams.xueqi"
            placeholder="请选择"
            clearable
            size="small"
          >
            <el-option
              v-for="dict in xueqiOptions"
              :key="dict.key"
              :label="dict.value"
              :value="dict.key"
            />
          </el-select>
          </el-form-item>
          <el-form-item label="年级" prop="grade">

            <el-select
              v-model="queryParams.grade"
              placeholder="请选择"
              clearable
              size="small"
              @change="changeClassOp"
            >
              <el-option
                v-for="dict in gradeOptions"
                :key="dict.key"
                :label="dict.value"
                :value="dict.key"
              />
            </el-select>

            <!-- <el-input
            v-model="queryParams.grade"
            placeholder="请输入年级"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          /> -->
          </el-form-item>
          <el-form-item label="班级" prop="class">
            <el-select
              v-model="queryParams.class"
              placeholder="请选择"
              clearable
              size="small"
            >
              <el-option
                v-for="dict in classOptions"
                :key="dict.key"
                :label="dict.value"
                :value="dict.key"
              />
            </el-select>
            <!-- <el-input
            v-model="queryParams.class"
            placeholder="请输入班级"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          /> -->
          </el-form-item>
          <el-form-item label="班主任" prop="headTeacher"><el-input
            v-model="queryParams.headTeacher"
            placeholder="请输入班主任"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
          </el-form-item>

          <el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
            <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
          </el-form-item>
        </el-form>

        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button
              v-permisaction="['admin:tbClass:add']"
              type="primary"
              icon="el-icon-plus"
              size="mini"
              @click="handleAdd"
            >新增
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              v-permisaction="['admin:tbClass:edit']"
              type="success"
              icon="el-icon-edit"
              size="mini"
              :disabled="single"
              @click="handleUpdate"
            >修改
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              v-permisaction="['admin:tbClass:remove']"
              type="danger"
              icon="el-icon-delete"
              size="mini"
              :disabled="multiple"
              @click="handleDelete"
            >删除
            </el-button>
          </el-col>
        </el-row>

        <el-table v-loading="loading" :data="tbClassList" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center" /><el-table-column label="学期" align="center" prop="xueqi" :formatter="xueqiFormat" width="100">
            <template slot-scope="scope">
              {{ xueqiFormat(scope.row) }}
            </template>
          </el-table-column><el-table-column
            label="年级"
            align="center"
            prop="grade"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="班级"
            align="center"
            prop="class"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="班主任"
            align="center"
            prop="headTeacher"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="语文老师"
            align="center"
            prop="yuwenTeacher"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="数学老师"
            align="center"
            prop="shuxueTeacher"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="英语老师"
            align="center"
            prop="yingyuTeacher"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="政治老师"
            align="center"
            prop="zhengzhiTeacher"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="历史老师"
            align="center"
            prop="lishiTeacher"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="地理老师"
            align="center"
            prop="diliTeacher"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="物理老师"
            align="center"
            prop="wuliTeacher"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="化学老师"
            align="center"
            prop="huaxueTeacher"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="生物老师"
            align="center"
            prop="shengwuTeacher"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="人数"
            align="center"
            prop="nums"
            :show-overflow-tooltip="true"
          />
          <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-popconfirm
                class="delete-popconfirm"
                title="确认要修改吗?"
                confirm-button-text="修改"
                @confirm="handleUpdate(scope.row)"
              >
                <el-button
                  slot="reference"
                  v-permisaction="['admin:tbClass:edit']"
                  size="mini"
                  type="text"
                  icon="el-icon-edit"
                >修改
                </el-button>
              </el-popconfirm>
              <el-popconfirm
                class="delete-popconfirm"
                title="确认要删除吗?"
                confirm-button-text="删除"
                @confirm="handleDelete(scope.row)"
              >
                <el-button
                  slot="reference"
                  v-permisaction="['admin:tbClass:remove']"
                  size="mini"
                  type="text"
                  icon="el-icon-delete"
                >删除
                </el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>

        <pagination
          v-show="total>0"
          :total="total"
          :page.sync="queryParams.pageIndex"
          :limit.sync="queryParams.pageSize"
          @pagination="getList"
        />

        <!-- 添加或修改对话框 -->
        <el-dialog :title="title" :visible.sync="open" width="500px">
          <el-form ref="form" :model="form" :rules="rules" label-width="80px">

            <el-form-item label="学期" prop="xueqi">
              <el-select
                v-model="form.xueqi"
                placeholder="请选择"
              >
                <el-option
                  v-for="dict in xueqiOptions"
                  :key="dict.key"
                  :label="dict.value"
                  :value="dict.key"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="年级" prop="grade">
              <el-input
                v-model="form.grade"
                placeholder="年级"
              />
            </el-form-item>
            <el-form-item label="班级" prop="class">
              <el-input
                v-model="form.class"
                placeholder="班级"
              />
            </el-form-item>
            <el-form-item label="班主任" prop="headTeacher">
              <el-input
                v-model="form.headTeacher"
                placeholder="班主任"
              />
            </el-form-item>
            <el-form-item label="语文老师" prop="yuwenTeacher">
              <el-input
                v-model="form.yuwenTeacher"
                placeholder="语文老师"
              />
            </el-form-item>
            <el-form-item label="数学老师" prop="shuxueTeacher">
              <el-input
                v-model="form.shuxueTeacher"
                placeholder="数学老师"
              />
            </el-form-item>
            <el-form-item label="英语老师" prop="yingyuTeacher">
              <el-input
                v-model="form.yingyuTeacher"
                placeholder="英语老师"
              />
            </el-form-item>
            <el-form-item label="政治老师" prop="zhengzhiTeacher">
              <el-input
                v-model="form.zhengzhiTeacher"
                placeholder="政治老师"
              />
            </el-form-item>
            <el-form-item label="历史老师" prop="lishiTeacher">
              <el-input
                v-model="form.lishiTeacher"
                placeholder="历史老师"
              />
            </el-form-item>
            <el-form-item label="地理老师" prop="diliTeacher">
              <el-input
                v-model="form.diliTeacher"
                placeholder="地理老师"
              />
            </el-form-item>
            <el-form-item label="物理老师" prop="wuliTeacher">
              <el-input
                v-model="form.wuliTeacher"
                placeholder="物理老师"
              />
            </el-form-item>
            <el-form-item label="化学老师" prop="huaxueTeacher">
              <el-input
                v-model="form.huaxueTeacher"
                placeholder="化学老师"
              />
            </el-form-item>
            <el-form-item label="生物老师" prop="shengwuTeacher">
              <el-input
                v-model="form.shengwuTeacher"
                placeholder="生物老师"
              />
            </el-form-item>
            <el-form-item label="人数" prop="nums">
              <el-input
                v-model="form.nums"
                placeholder="人数"
              />
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitForm">确 定</el-button>
            <el-button @click="cancel">取 消</el-button>
          </div>
        </el-dialog>
      </el-card>
    </template>
  </BasicLayout>
</template>

<script>
import { addTbClass, delTbClass, getTbClass, listTbClass, updateTbClass } from '@/api/admin/tb-class'

import { listTbTerm } from '@/api/admin/tb-term'
export default {
  name: 'TbClass',
  components: {
  },
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 总条数
      total: 0,
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      isEdit: false,
      // 类型数据字典
      typeOptions: [],
      tbClassList: [],

      // 关系表类型
      xueqiOptions: [],
      gradeOptions: [],
      classOptions: [],
      gradeAndClass: [],
      // 查询参数
      queryParams: {
        pageIndex: 1,
        pageSize: 10,
        xueqi: undefined,
        grade: undefined,
        class: undefined,
        headTeacher: undefined

      },
      // 表单参数
      form: {
      },
      // 表单校验
      rules: { xueqi: [{ required: true, message: '学期不能为空', trigger: 'blur' }],
        grade: [{ required: true, message: '年级不能为空', trigger: 'blur' }],
        class: [{ required: true, message: '班级不能为空', trigger: 'blur' }],
        headTeacher: [{ required: true, message: '班主任不能为空', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getList(true)
    this.getTbTermItems()
  },
  methods: {

    changeClassOp() {
      this.classOptions = this.gradeAndClass.filter(i => i.grade === this.queryParams.grade).map(j => ({ value: j.class, key: j.class }))
      if (this.classOptions.every(i => i.value !== this.queryParams.class)) {
        this.queryParams.class = ''
      }
    },

    /** 查询参数列表 */
    getList(flag) {
      this.loading = true
      listTbClass(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
        this.tbClassList = response.data.list
        this.total = response.data.count
        this.loading = false

        if (flag) {
          this.gradeAndClass = response.data.list.map(i => ({ grade: i.grade, class: i.class }))
          const gradeList = response.data.list.map(i => i.grade)
          this.gradeOptions = [...new Set(gradeList)].map(j => ({ value: j, key: j }))
          this.classOptions = []
        }
      }
      )
    },
    // 取消按钮
    cancel() {
      this.open = false
      this.reset()
    },
    // 表单重置
    reset() {
      this.form = {

        id: undefined,
        name: undefined,
        xueqi: undefined,
        grade: undefined,
        class: undefined,
        headTeacher: undefined,
        yuwenTeacher: undefined,
        shuxueTeacher: undefined,
        yingyuTeacher: undefined,
        zhengzhiTeacher: undefined,
        lishiTeacher: undefined,
        diliTeacher: undefined,
        wuliTeacher: undefined,
        huaxueTeacher: undefined,
        shengwuTeacher: undefined,
        nums: undefined
      }
      this.resetForm('form')
    },
    getImgList: function() {
      this.form[this.fileIndex] = this.$refs['fileChoose'].resultList[0].fullUrl
    },
    fileClose: function() {
      this.fileOpen = false
    },
    xueqiFormat(row) {
      return this.selectItemsLabel(this.xueqiOptions, row.xueqi)
    },
    // 关系
    getTbTermItems() {
      this.getItems(listTbTerm, undefined).then(res => {
        this.xueqiOptions = this.setItems(res, 'name', '')
      })
    },
    // 文件
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageIndex = 1
      this.getList()
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = []
      this.resetForm('queryForm')
      this.queryParams.pageIndex = 1
      this.getList(true)
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset()
      this.open = true
      this.title = '添加班级管理'
      this.isEdit = false
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id =
                row.id || this.ids
      getTbClass(id).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改班级管理'
        this.isEdit = true
      })
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id !== undefined) {
            updateTbClass(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess(response.msg)
                this.open = false
                this.resetQuery()
              } else {
                this.msgError(response.msg)
              }
            })
          } else {
            addTbClass(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess(response.msg)
                this.open = false
                this.resetQuery()
              } else {
                this.msgError(response.msg)
              }
            })
          }
          this.getclassInfo()
        }
      })
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      var Ids = (row.id && [row.id]) || this.ids

      this.$confirm('是否确认删除编号为"' + Ids + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return delTbClass({ 'ids': Ids })
      }).then((response) => {
        if (response.code === 200) {
          this.msgSuccess(response.msg)
          this.open = false
          this.resetQuery()
        } else {
          this.msgError(response.msg)
        }
      }).catch(function() {
      })
    }
  }
}
</script>
