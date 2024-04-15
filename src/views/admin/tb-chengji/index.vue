
<template>
  <BasicLayout>
    <template #wrapper>
      <el-card class="box-card">
        <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="68px">
          <el-form-item label="学生姓名" prop="name"><el-input
            v-model="queryParams.name"
            placeholder="请输入学生姓名"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
          </el-form-item>
          <el-form-item label="年级" prop="grade"><el-select
            v-model="queryParams.grade"
            placeholder="请选择"
            clearable
            size="small"
          >
            <el-option
              v-for="dict in gradeOptions"
              :key="dict.key"
              :label="dict.value"
              :value="dict.key"
            />
          </el-select>
          </el-form-item>
          <el-form-item label="考号" prop="kaoNo"><el-input
            v-model="queryParams.kaoNo"
            placeholder="请输入考号"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
          </el-form-item>
          <el-form-item label="考试时间" prop="kaoshiTime"><el-input
            v-model="queryParams.kaoshiTime"
            placeholder="请输入考试时间"
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
              v-permisaction="['admin:tbChengji:add']"
              type="primary"
              icon="el-icon-plus"
              size="mini"
              @click="handleAdd"
            >新增
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              v-permisaction="['admin:tbChengji:edit']"
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
              v-permisaction="['admin:tbChengji:remove']"
              type="danger"
              icon="el-icon-delete"
              size="mini"
              :disabled="multiple"
              @click="handleDelete"
            >删除
            </el-button>
          </el-col>
        </el-row>

        <el-table v-loading="loading" :data="tbChengjiList" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center" /><el-table-column
            label="学生姓名"
            align="center"
            prop="name"
            :show-overflow-tooltip="true"
          /><el-table-column label="年级" align="center" prop="grade" :formatter="gradeFormat" width="100">
            <template slot-scope="scope">
              {{ gradeFormat(scope.row) }}
            </template>
          </el-table-column><el-table-column label="班级" align="center" prop="class" :formatter="classFormat" width="100">
            <template slot-scope="scope">
              {{ classFormat(scope.row) }}
            </template>
          </el-table-column><el-table-column
            label="学期"
            align="center"
            prop="xueqi"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="考号"
            align="center"
            prop="kaoNo"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="语文"
            align="center"
            prop="yuwenScore"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="数学"
            align="center"
            prop="shuxueScore"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="英语"
            align="center"
            prop="yingyuScore"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="政治"
            align="center"
            prop="zhengzhiScore"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="历史"
            align="center"
            prop="lishiScore"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="地理"
            align="center"
            prop="diliScore"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="物理"
            align="center"
            prop="wuliScore"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="化学"
            align="center"
            prop="huaxueScore"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="生物"
            align="center"
            prop="shengwuScore"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="考试时间"
            align="center"
            prop="kaoshiTime"
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
                  v-permisaction="['admin:tbChengji:edit']"
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
                  v-permisaction="['admin:tbChengji:remove']"
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

            <el-form-item label="年级" prop="grade">
              <el-select
                v-model="form.grade"
                placeholder="请选择"
                @change="getStudengtOp"
              >
                <el-option
                  v-for="dict in gradeOptions"
                  :key="dict.key"
                  :label="dict.value"
                  :value="dict.key"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="班级" prop="class">
              <el-select
                v-model="form.class"
                placeholder="请选择"
                @change="getStudengtOp"
              >
                <el-option
                  v-for="dict in classOptions"
                  :key="dict.key"
                  :label="dict.value"
                  :value="dict.key"
                />
              </el-select>
            </el-form-item>
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
            <el-form-item label="学生姓名" prop="name">
              <el-select
                v-model="form.name"
                filterable
                :disabled="!studentOptions.length"
                placeholder="请选择"
              >
                <el-option
                  v-for="dict in studentOptions"
                  :key="dict.key"
                  :label="dict.value"
                  :value="dict.key"
                />
              </el-select>

            </el-form-item>
            <el-form-item label="考号" prop="kaoNo">
              <el-input
                v-model="form.kaoNo"
                placeholder="考号"
              />
            </el-form-item>
            <el-form-item label="语文" prop="yuwenScore">
              <el-input
                v-model="form.yuwenScore"
                placeholder="语文"
              />
            </el-form-item>
            <el-form-item label="数学" prop="shuxueScore">
              <el-input
                v-model="form.shuxueScore"
                placeholder="数学"
              />
            </el-form-item>
            <el-form-item label="英语" prop="yingyuScore">
              <el-input
                v-model="form.yingyuScore"
                placeholder="英语"
              />
            </el-form-item>
            <el-form-item label="政治" prop="zhengzhiScore">
              <el-input
                v-model="form.zhengzhiScore"
                placeholder="政治"
              />
            </el-form-item>
            <el-form-item label="历史" prop="lishiScore">
              <el-input
                v-model="form.lishiScore"
                placeholder="历史"
              />
            </el-form-item>
            <el-form-item label="地理" prop="diliScore">
              <el-input
                v-model="form.diliScore"
                placeholder="地理"
              />
            </el-form-item>
            <el-form-item label="物理" prop="wuliScore">
              <el-input
                v-model="form.wuliScore"
                placeholder="物理"
              />
            </el-form-item>
            <el-form-item label="化学" prop="huaxueScore">
              <el-input
                v-model="form.huaxueScore"
                placeholder="化学"
              />
            </el-form-item>
            <el-form-item label="生物" prop="shengwuScore">
              <el-input
                v-model="form.shengwuScore"
                placeholder="生物"
              />
            </el-form-item>
            <el-form-item label="考试时间" prop="kaoshiTime">
              <el-input
                v-model="form.kaoshiTime"
                placeholder="考试时间"
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
import { addTbChengji, delTbChengji, getTbChengji, listTbChengji, updateTbChengji } from '@/api/admin/tb-chengji'
import { listTbStudent } from '@/api/admin/tb-student'
import { listTbClass } from '@/api/admin/tb-class'
export default {
  name: 'TbChengji',
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
      tbChengjiList: [],

      // 关系表类型
      gradeOptions: [],
      classOptions: [],
      xueqiOptions: [],
      studentOptions: [],

      // 查询参数
      queryParams: {
        pageIndex: 1,
        pageSize: 10,
        name: undefined,
        grade: undefined,
        kaoNo: undefined,
        kaoshiTime: undefined

      },
      // 表单参数
      form: {
      },
      // 表单校验
      rules: { name: [{ required: true, message: '学生姓名不能为空', trigger: 'blur' }],
        xueqi: [{ required: true, message: '学期不能为空', trigger: 'blur' }],
        class: [{ required: true, message: '班级不能为空', trigger: 'blur' }],
        grade: [{ required: true, message: '年级不能为空', trigger: 'blur' }],
        kaoNo: [{ required: true, message: '考号不能为空', trigger: 'blur' }],
        kaoshiTime: [{ required: true, message: '考试时间不能为空', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getList()
    this.getTbClassItems()
  },
  methods: {
    /** 查询参数列表 */
    // 获取班级学生的信息
    getStudengtOp() {
      this.studentOptions = []
      if (!this.form.grade || !this.form.class) {
        return
      }
      listTbStudent({ pageIndex: 1,
        pageSize: 10000,
        grade: this.form.grade,
        class: this.form.class,
        beginTime: '',
        endTime: '' }).then(response => {
        this.studentOptions = this.setItems(response, 'name', 'name')
      })
    },
    getList() {
      this.loading = true
      listTbChengji(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
        this.tbChengjiList = response.data.list
        this.total = response.data.count
        this.loading = false
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
        grade: undefined,
        class: undefined,
        xueqi: undefined,
        kaoNo: undefined,
        yuwenScore: undefined,
        shuxueScore: undefined,
        yingyuScore: undefined,
        zhengzhiScore: undefined,
        lishiScore: undefined,
        diliScore: undefined,
        wuliScore: undefined,
        huaxueScore: undefined,
        shengwuScore: undefined,
        kaoshiTime: undefined
      }
      this.resetForm('form')
    },
    getImgList: function() {
      this.form[this.fileIndex] = this.$refs['fileChoose'].resultList[0].fullUrl
    },
    fileClose: function() {
      this.fileOpen = false
    },
    gradeFormat(row) {
      return this.selectItemsLabel(this.gradeOptions, row.grade)
    },
    classFormat(row) {
      return this.selectItemsLabel(this.classOptions, row.class)
    },
    // 关系
    getTbClassItems() {
      this.getItems(listTbClass, undefined).then(res => {
        this.gradeOptions = this.setItems(res, 'grade', 'grade')
        this.classOptions = this.setItems(res, 'class', 'class')
        this.xueqiOptions = this.setItems(res, 'xueqi', 'xueqi')
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
      this.handleQuery()
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset()
      this.open = true
      this.title = '添加成绩管理'
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
      getTbChengji(id).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改成绩管理'
        this.isEdit = true
      })
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id !== undefined) {
            updateTbChengji(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess(response.msg)
                this.open = false
                this.getList()
              } else {
                this.msgError(response.msg)
              }
            })
          } else {
            addTbChengji(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess(response.msg)
                this.open = false
                this.getList()
              } else {
                this.msgError(response.msg)
              }
            })
          }
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
        return delTbChengji({ 'ids': Ids })
      }).then((response) => {
        if (response.code === 200) {
          this.msgSuccess(response.msg)
          this.open = false
          this.getList()
        } else {
          this.msgError(response.msg)
        }
      }).catch(function() {
      })
    }
  }
}
</script>
