
<template>
  <BasicLayout>
    <template #wrapper>
      <el-card class="box-card">
        <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="68px">
          <el-form-item label="开始时间" prop="examStart">
            <el-date-picker
              v-model="queryParams.examStart"
              type="date"
              placeholder="选择日期"
            />
            <!-- <el-input
            v-model="queryParams.examStart"
            placeholder="请输入开始时间"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          /> -->
          </el-form-item>
          <el-form-item label="考试批次" prop="examType"><el-input
            v-model="queryParams.examType"
            placeholder="请输入考试批次"
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
              v-permisaction="['admin:tbExam:add']"
              type="primary"
              icon="el-icon-plus"
              size="mini"
              @click="handleAdd"
            >新增
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              v-permisaction="['admin:tbExam:edit']"
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
              v-permisaction="['admin:tbExam:remove']"
              type="danger"
              icon="el-icon-delete"
              size="mini"
              :disabled="multiple"
              @click="handleDelete"
            >删除
            </el-button>
          </el-col>
        </el-row>

        <el-table v-loading="loading" :data="tbExamList" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center" /><el-table-column
            label="年级"
            align="center"
            prop="examGrade"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="班级"
            align="center"
            prop="examClass"
            :show-overflow-tooltip="true"
          />
          <!-- <el-table-column
            label="开始时间"
            align="center"
            prop="examStart"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="结束时间"
            align="center"
            prop="examEnd"
            :show-overflow-tooltip="true"
          /> -->
          <el-table-column
            label="开始时间"
            align="center"
            prop="examStart"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.examStart,'{y}-{m}-{d}') }}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="结束时间"
            align="center"
            prop="examEnd"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.examEnd,'{y}-{m}-{d}') }}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="考试批次"
            align="center"
            prop="examType"
            :show-overflow-tooltip="true"
          />
          <!-- <el-table-column label="考试科目" align="center" prop="examSub" :formatter="examSubFormat" width="100">
            <template slot-scope="scope">
              {{ examSubFormat(scope.row) }}
            </template>
          </el-table-column> -->
          <el-table-column
            label="考试科目"
            align="center"
            prop="examSub"
            :show-overflow-tooltip="true"
          />
          <el-table-column label="学期名称" align="center" prop="termName" :formatter="termNameFormat">
            <template slot-scope="scope">
              {{ termNameFormat(scope.row) }}
            </template>
          </el-table-column>
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
                  v-permisaction="['admin:tbExam:edit']"
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
                  v-permisaction="['admin:tbExam:remove']"
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

            <el-form-item label="年级" prop="examGrade">

              <el-select
                v-model="form.examGrade"
                placeholder="请选择"
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
                v-model="form.examGrade"
                placeholder="年级"
              /> -->
            </el-form-item>
            <el-form-item label="班级" prop="examClass">
              <el-select
                v-model="form.examClass"
                placeholder="请选择"
              >
                <el-option
                  v-for="dict in addformClassOp"
                  :key="dict.key"
                  :label="dict.value"
                  :value="dict.key"
                />
              </el-select>
              <!-- <el-input
                v-model="form.examClass"
                placeholder="班级"
              /> -->
            </el-form-item>
            <el-form-item label="开始时间" prop="examStart">
              <el-date-picker
                v-model="form.examStart"
                type="date"
                placeholder="选择日期"
              />
              <!-- <el-input
                v-model="form.examStart"
                placeholder="开始时间"
              /> -->
            </el-form-item>
            <el-form-item label="结束时间" prop="examEnd">
              <el-date-picker
                v-model="form.examEnd"
                type="date"
                placeholder="选择日期"
              />
              <!-- <el-input
                v-model="form.examEnd"
                placeholder="结束时间"
              /> -->
            </el-form-item>
            <el-form-item label="考试批次" prop="examType">
              <el-input
                v-model="form.examType"
                placeholder="考试批次"
              />
            </el-form-item>
            <el-form-item label="考试科目" prop="examSub">
              <el-select
                v-model="form.examSub"
                multiple
                placeholder="请选择"
              >
                <el-option
                  v-for="dict in examSubOptions"
                  :key="dict.key"
                  :label="dict.value"
                  :value="dict.key"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="学期名称" prop="termName">
              <el-select
                v-model="form.termName"
                placeholder="请选择"
              >
                <el-option
                  v-for="dict in termNameOptions"
                  :key="dict.key"
                  :label="dict.value"
                  :value="dict.key"
                />
              </el-select>
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
import { addTbExam, delTbExam, getTbExam, listTbExam, updateTbExam } from '@/api/admin/tb-exam'
import { listTbClass } from '@/api/admin/tb-class'
import { listTbSub } from '@/api/admin/tb-sub'
import { listTbTerm } from '@/api/admin/tb-term'
export default {
  name: 'TbExam',
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
      tbExamList: [],

      // 关系表类型
      examSubOptions: [],
      termNameOptions: [],

      gradeOptions: [],

      addformClassOp: [],
      gradeAndClass: [],

      // 查询参数
      queryParams: {
        pageIndex: 1,
        pageSize: 10,
        examStart: undefined,
        examType: undefined

      },
      // 表单参数
      form: {
      },
      // 表单校验
      rules: { examStart: [{ required: true, message: '开始时间不能为空', trigger: 'blur' }],
        examType: [{ required: true, message: '考试批次不能为空', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getList()
    this.getTbSubItems()
    this.getTbTermItems()
    this.getTbClassItems()
  },
  methods: {
    changeClassOp() {
      this.addformClassOp = this.gradeAndClass.filter(i => i.grade === this.form.examGrade).map(j => ({ value: j.class, key: j.class }))
      if (this.addformClassOp.every(i => i.value !== this.form.examClass)) {
        this.form.examClass = ''
      }
    },
    getTbClassItems() {
      this.getItems(listTbClass, undefined).then(res => {
        this.gradeAndClass = res.data.list.map(i => ({ grade: i.grade, class: i.class }))
        const gradeList = res.data.list.map(i => i.grade)
        this.gradeOptions = [...new Set(gradeList)].map(j => ({ value: j, key: j }))
      })
    },
    /** 查询参数列表 */
    getList() {
      this.loading = true
      listTbExam(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
        this.tbExamList = response.data.list
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
        examGrade: undefined,
        examClass: undefined,
        examStart: undefined,
        examEnd: undefined,
        examType: undefined,
        examSub: [],
        termName: undefined
      }
      this.resetForm('form')
    },
    getImgList: function() {
      this.form[this.fileIndex] = this.$refs['fileChoose'].resultList[0].fullUrl
    },
    fileClose: function() {
      this.fileOpen = false
    },
    // examSubFormat(row) {
    //   return this.selectItemsLabel(this.examSubOptions, row.examSub)
    // },
    termNameFormat(row) {
      return this.selectItemsLabel(this.termNameOptions, row.termName)
    },
    // 关系
    getTbSubItems() {
      this.getItems(listTbSub, undefined).then(res => {
        this.examSubOptions = this.setItems(res, 'name', 'name')
      })
    },
    getTbTermItems() {
      this.getItems(listTbTerm, undefined).then(res => {
        this.termNameOptions = this.setItems(res, 'name', 'name')
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
      this.title = '添加考试管理'
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
      getTbExam(id).then(response => {
        this.form = response.data
        this.form.examSub = response.data.examSub ? response.data.examSub.split(',') : []
        this.open = true
        this.title = '修改考试管理'
        this.isEdit = true
      })
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          const saveParams = JSON.parse(JSON.stringify(this.form))
          saveParams.examSub = saveParams.examSub.join(',') || undefined
          if (this.form.id !== undefined) {
            updateTbExam(saveParams).then(response => {
              if (response.code === 200) {
                this.msgSuccess(response.msg)
                this.open = false
                this.getList()
              } else {
                this.msgError(response.msg)
              }
            })
          } else {
            addTbExam(saveParams).then(response => {
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
        return delTbExam({ 'ids': Ids })
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
