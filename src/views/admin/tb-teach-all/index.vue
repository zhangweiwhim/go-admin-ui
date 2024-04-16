
<template>
  <BasicLayout>
    <template #wrapper>
      <el-card class="box-card">
        <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="68px">
          <el-form-item label="任教年级" prop="grade">
            <el-select
              v-model="queryParams.grade"
              placeholder="请选择"
              clearable
              size="small"
              @change="changeSeachFormClassOp"
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
            placeholder="请输入任教年级"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          /> -->
          </el-form-item>
          <el-form-item label="任教班级" prop="class">
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
            placeholder="请输入任教班级"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          /> -->
          </el-form-item>
          <el-form-item label="任教学科" prop="subject">

            <el-select
              v-model="queryParams.subject"
              placeholder="请选择"
              clearable
              size="small"
            >
              <el-option
                v-for="dict in subjectOptions"
                :key="dict.key"
                :label="dict.value"
                :value="dict.key"
              />
            </el-select>

            <!-- <el-input
            v-model="queryParams.subject"
            placeholder="请输入任教学科"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          /> -->
          </el-form-item>
          <el-form-item label="教师名称" prop="techName"><el-select
            v-model="queryParams.techName"
            filterable
            placeholder="请选择"
            clearable
            size="small"
          >
            <el-option
              v-for="dict in techNameOptions"
              :key="dict.key"
              :label="dict.value"
              :value="dict.key"
            />
          </el-select>
          </el-form-item>
          <el-form-item label="教师工号" prop="techNo"><el-select
            v-model="queryParams.techNo"
            filterable
            placeholder="请选择"
            clearable
            size="small"
          >
            <el-option
              v-for="dict in techNoOptions"
              :key="dict.key"
              :label="dict.value"
              :value="dict.key"
            />
          </el-select>
          </el-form-item>
          <el-form-item label="任教学期" prop="techTerm"><el-select
            v-model="queryParams.techTerm"
            placeholder="请选择"
            clearable
            size="small"
          >
            <el-option
              v-for="dict in techTermOptions"
              :key="dict.key"
              :label="dict.value"
              :value="dict.key"
            />
          </el-select>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
            <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
          </el-form-item>
        </el-form>

        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button
              v-permisaction="['admin:tbTeachAll:add']"
              type="primary"
              icon="el-icon-plus"
              size="mini"
              @click="handleAdd"
            >新增
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              v-permisaction="['admin:tbTeachAll:edit']"
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
              v-permisaction="['admin:tbTeachAll:remove']"
              type="danger"
              icon="el-icon-delete"
              size="mini"
              :disabled="multiple"
              @click="handleDelete"
            >删除
            </el-button>
          </el-col>
        </el-row>

        <el-table v-loading="loading" :data="tbTeachAllList" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center" /><el-table-column
            label="任教年级"
            align="center"
            prop="grade"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="任教班级"
            align="center"
            prop="class"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="任教学科"
            align="center"
            prop="subject"
            :show-overflow-tooltip="true"
          /><el-table-column label="教师名称" align="center" prop="techName" :formatter="techNameFormat" width="200">
            <template slot-scope="scope">
              {{ techNameFormat(scope.row) }}
            </template>
          </el-table-column><el-table-column label="教师工号" align="center" prop="techNo" :formatter="techNoFormat" width="100">
            <template slot-scope="scope">
              {{ techNoFormat(scope.row) }}
            </template>
          </el-table-column><el-table-column label="任教学期" align="center" prop="techTerm" :formatter="techTermFormat">
            <template slot-scope="scope">
              {{ techTermFormat(scope.row) }}
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
                  v-permisaction="['admin:tbTeachAll:edit']"
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
                  v-permisaction="['admin:tbTeachAll:remove']"
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

            <el-form-item label="任教年级" prop="grade">
              <el-select
                v-model="form.grade"
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
                v-model="form.grade"
                placeholder="任教年级"  />-->

            </el-form-item>
            <el-form-item label="任教班级" prop="class">
              <el-select
                v-model="form.class"
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
                v-model="form.class"
                placeholder="任教班级"
              /> -->
            </el-form-item>
            <el-form-item label="任教学科" prop="subject">
              <el-select
                v-model="form.subject"
                placeholder="请选择"
                clearable
                size="small"
              >
                <el-option
                  v-for="dict in subjectOptions"
                  :key="dict.key"
                  :label="dict.value"
                  :value="dict.key"
                />
              </el-select>
              <!-- <el-input
                v-model="form.subject"
                placeholder="任教学科"
              /> -->
            </el-form-item>
            <el-form-item label="教师名称" prop="techName">
              <el-input
                v-model="form.techName"
                placeholder="教师名称"
              />
            </el-form-item>
            <el-form-item label="教师工号" prop="techNo">
              <el-input
                v-model="form.techNo"
                placeholder="教师工号"
              />
            </el-form-item>
            <el-form-item label="任教学期" prop="techTerm">
              <el-select
                v-model="form.techTerm"
                placeholder="请选择"
              >
                <el-option
                  v-for="dict in techTermOptions"
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
import { addTbTeachAll, delTbTeachAll, getTbTeachAll, listTbTeachAll, updateTbTeachAll } from '@/api/admin/tb-teach-all'
import { listTbClass } from '@/api/admin/tb-class'
import { listTbSub } from '@/api/admin/tb-sub'
import { listTbTeacher } from '@/api/admin/tb-teacher'
import { listTbTerm } from '@/api/admin/tb-term'
export default {
  name: 'TbTeachAll',
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
      tbTeachAllList: [],

      // 关系表类型
      techNameOptions: [],
      techNoOptions: [],
      techTermOptions: [],
      addformClassOp: [],
      classOptions: [],
      gradeAndClass: [],
      gradeOptions: [],
      subjectOptions: [],
      // 查询参数
      queryParams: {
        pageIndex: 1,
        pageSize: 10,
        grade: undefined,
        class: undefined,
        subject: undefined,
        techName: undefined,
        techNo: undefined,
        techTerm: undefined

      },
      // 表单参数
      form: {
      },
      // 表单校验
      rules: { grade: [{ required: true, message: '任教年级不能为空', trigger: 'blur' }],
        class: [{ required: true, message: '任教班级不能为空', trigger: 'blur' }],
        subject: [{ required: true, message: '任教学科不能为空', trigger: 'blur' }],
        techName: [{ required: true, message: '教师名称不能为空', trigger: 'blur' }],
        techNo: [{ required: true, message: '教师工号不能为空', trigger: 'blur' }],
        techTerm: [{ required: true, message: '任教学期不能为空', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getList()
    this.getTbTeacherItems()
    this.getTbTeacherItems()
    this.getTbTermItems()
    this.getTbClassItems()
    this.getSubList()
  },
  methods: {
    getSubList() {
      listTbSub({
        pageIndex: 1,
        pageSize: 10000
      }).then(response => {
        const subList = response.data.list.map(i => i.name)
        this.subjectOptions = [...new Set(subList)].map(i => ({ key: i, value: i }))
      })
    },
    getTbClassItems() {
      this.getItems(listTbClass, undefined).then(res => {
        this.gradeAndClass = res.data.list.map(i => ({ grade: i.grade, class: i.class }))

        const gradeList = res.data.list.map(i => i.grade)
        this.gradeOptions = [...new Set(gradeList)].map(j => ({ value: j, key: j }))
        this.classOptions = []
      })
    },
    changeSeachFormClassOp() {
      this.classOptions = this.gradeAndClass.filter(i => i.grade === this.queryParams.grade).map(j => ({ value: j.class, key: j.class }))
      if (this.classOptions.every(i => i.value !== this.queryParams.class)) {
        this.queryParams.class = ''
      }
    },
    changeClassOp() {
      this.addformClassOp = this.gradeAndClass.filter(i => i.grade === this.form.grade).map(j => ({ value: j.class, key: j.class }))
      if (this.addformClassOp.every(i => i.value !== this.form.class)) {
        this.form.class = ''
      }
    },
    /** 查询参数列表 */
    getList() {
      this.loading = true
      listTbTeachAll(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
        this.tbTeachAllList = response.data.list
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

        grade: undefined,
        class: undefined,
        subject: undefined,
        techName: undefined,
        techNo: undefined,
        techTerm: undefined,
        id: undefined
      }
      this.resetForm('form')
    },
    getImgList: function() {
      this.form[this.fileIndex] = this.$refs['fileChoose'].resultList[0].fullUrl
    },
    fileClose: function() {
      this.fileOpen = false
    },
    techNameFormat(row) {
      return this.selectItemsLabel(this.techNameOptions, row.techName)
    },
    techNoFormat(row) {
      return this.selectItemsLabel(this.techNoOptions, row.techNo)
    },
    techTermFormat(row) {
      return this.selectItemsLabel(this.techTermOptions, row.techTerm)
    },
    // 关系
    getTbTeacherItems() {
      this.getItems(listTbTeacher, undefined).then(res => {
        this.techNameOptions = this.setItems(res, 'name', 'name')
        this.techNoOptions = this.setItems(res, 'tecNo', 'tecNo')
      })
    },
    getTbTermItems() {
      this.getItems(listTbTerm, undefined).then(res => {
        this.techTermOptions = this.setItems(res, 'name', '')
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
      this.addformClassOp = []
      this.reset()
      this.open = true
      this.title = '添加任教管理'
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
      getTbTeachAll(id).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改任教管理'
        this.isEdit = true
        this.changeClassOp()
      })
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id !== undefined) {
            updateTbTeachAll(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess(response.msg)
                this.open = false
                this.getList()
              } else {
                this.msgError(response.msg)
              }
            })
          } else {
            addTbTeachAll(this.form).then(response => {
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
        return delTbTeachAll({ 'ids': Ids })
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
