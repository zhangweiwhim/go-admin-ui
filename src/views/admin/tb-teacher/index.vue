
<template>
  <BasicLayout>
    <template #wrapper>
      <el-card class="box-card">
        <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="68px">
          <el-form-item label="姓名" prop="name"><el-input
            v-model="queryParams.name"
            placeholder="请输入姓名"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
          </el-form-item>
          <el-form-item label="工号" prop="tecNo"><el-input
            v-model="queryParams.tecNo"
            placeholder="请输入工号"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
          </el-form-item>
          <el-form-item label="任职学科" prop="tecNowSub"><el-select
            v-model="queryParams.tecNowSub"
            placeholder="请选择"
            clearable
            size="small"
          >
            <el-option
              v-for="dict in tecNowSubOptions"
              :key="dict.key"
              :label="dict.value"
              :value="dict.key"
            />
          </el-select>
          </el-form-item>
          <el-form-item label="任职年级" prop="tecNowGrade">
            <el-select
              v-model="queryParams.tecNowGrade"
              placeholder="请选择"
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
            v-model="queryParams.tecNowGrade"
            placeholder="请输入任职年级"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          /> -->
          </el-form-item>
          <el-form-item label="任职班级" prop="tecNowClass">
            <el-select
              v-model="queryParams.tecNowClass"
              placeholder="请选择"
            >
              <el-option
                v-for="dict in classOptions"
                :key="dict.key"
                :label="dict.value"
                :value="dict.key"
              />
            </el-select>
            <!-- <el-input
            v-model="queryParams.tecNowClass"
            placeholder="请输入任职班级"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          /> -->
          </el-form-item>

          <el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
            <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
          </el-form-item>
        </el-form>

        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button
              v-permisaction="['admin:tbTeacher:add']"
              type="primary"
              icon="el-icon-plus"
              size="mini"
              @click="handleAdd"
            >新增
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              v-permisaction="['admin:tbTeacher:edit']"
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
              v-permisaction="['admin:tbTeacher:remove']"
              type="danger"
              icon="el-icon-delete"
              size="mini"
              :disabled="multiple"
              @click="handleDelete"
            >删除
            </el-button>
          </el-col>
        </el-row>

        <el-table v-loading="loading" :data="tbTeacherList" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center" /><el-table-column
            label="姓名"
            align="center"
            prop="name"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="工号"
            align="center"
            prop="tecNo"
            :show-overflow-tooltip="true"
          /><el-table-column label="任职学科" align="center" prop="tecNowSub" :formatter="tecNowSubFormat" width="100">
            <template slot-scope="scope">
              {{ tecNowSubFormat(scope.row) }}
            </template>
          </el-table-column><el-table-column
            label="任职年级"
            align="center"
            prop="tecNowGrade"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="任职班级"
            align="center"
            prop="tecNowClass"
            :show-overflow-tooltip="true"
          />

          <el-table-column label="性别" align="center" prop="sex" width="100">
            <template slot-scope="scope">
              {{ sexFormat[scope.row.sex] }}
            </template>
          </el-table-column>

          <!-- <el-table-column
            label="性别"
            align="center"
            prop="sex"
            :show-overflow-tooltip="true"
          /> -->
          <el-table-column
            label="入值时间"
            align="center"
            prop="inTime"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.inTime,'{y}-{m}-{d}') }}</span>
            </template>
          </el-table-column><el-table-column
            label="年龄"
            align="center"
            prop="age"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="身份证号"
            align="center"
            prop="idNo"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="地址"
            align="center"
            prop="address"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="电话"
            align="center"
            prop="tel"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="荣誉"
            align="center"
            prop="honorary"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="简介"
            align="center"
            prop="resume"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="其他联系方式"
            align="center"
            prop="otherTel"
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
                  v-permisaction="['admin:tbTeacher:edit']"
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
                  v-permisaction="['admin:tbTeacher:remove']"
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

            <el-form-item label="姓名" prop="name">
              <el-input
                v-model="form.name"
                placeholder="姓名"
              />
            </el-form-item>
            <el-form-item label="工号" prop="tecNo">
              <el-input
                v-model="form.tecNo"
                placeholder="工号"
              />
            </el-form-item>
            <el-form-item label="任职学科" prop="tecNowSub">
              <el-select
                v-model="form.tecNowSub"
                placeholder="请选择"
              >
                <el-option
                  v-for="dict in tecNowSubOptions"
                  :key="dict.key"
                  :label="dict.value"
                  :value="dict.key"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="任职年级" prop="tecNowGrade">
              <el-select
                v-model="form.tecNowGrade"
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

            </el-form-item>
            <el-form-item label="任职班级" prop="tecNowClass">
              <el-select
                v-model="form.tecNowClass"
                placeholder="请选择"
              >
                <el-option
                  v-for="dict in addformClassOp"
                  :key="dict.key"
                  :label="dict.value"
                  :value="dict.key"
                />
              </el-select>

            </el-form-item>
            <el-form-item label="性别" prop="sex">
              <el-select v-model="form.sex" placeholder="请选择">
                <el-option
                  v-for="dict in sexOptions"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
                />
              </el-select>

            </el-form-item>
            <el-form-item label="入值时间" prop="inTime">
              <el-date-picker
                v-model="form.inTime"
                type="date"
                placeholder="选择日期"
              />
            </el-form-item>
            <el-form-item label="年龄" prop="age">
              <el-input
                v-model="form.age"
                placeholder="年龄"
              />
            </el-form-item>
            <el-form-item label="身份证号" prop="idNo">
              <el-input
                v-model="form.idNo"
                placeholder="身份证号"
              />
            </el-form-item>
            <el-form-item label="地址" prop="address">
              <el-input
                v-model="form.address"
                placeholder="地址"
              />
            </el-form-item>
            <el-form-item label="电话" prop="tel">
              <el-input
                v-model="form.tel"
                placeholder="电话"
              />
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input
                v-model="form.email"
                placeholder="邮箱"
              />
            </el-form-item>
            <el-form-item label="荣誉" prop="honorary">
              <el-input
                v-model="form.honorary"
                placeholder="荣誉"
              />
            </el-form-item>
            <el-form-item label="简介" prop="resume">
              <el-input
                v-model="form.resume"
                placeholder="简介"
              />
            </el-form-item>
            <el-form-item label="其他联系方式" prop="otherTel">
              <el-input
                v-model="form.otherTel"
                placeholder="其他联系方式"
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
import { addTbTeacher, delTbTeacher, getTbTeacher, listTbTeacher, updateTbTeacher } from '@/api/admin/tb-teacher'
import { listTbClass } from '@/api/admin/tb-class'
import { listTbSub } from '@/api/admin/tb-sub'
import { addUser } from '@/api/admin/sys-user'
export default {
  name: 'TbTeacher',
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
      tbTeacherList: [],
      sexFormat: {},
      // 关系表类型
      sexOptions: [],
      tecNowSubOptions: [],
      gradeOptions: [],
      classOptions: [],
      addformClassOp: [],
      gradeAndClass: [],
      // 查询参数
      queryParams: {
        pageIndex: 1,
        pageSize: 10,
        name: undefined,
        tecNo: undefined,
        tecNowSub: undefined,
        tecNowGrade: undefined,
        tecNowClass: undefined

      },
      // 表单参数
      form: {
      },
      // 表单校验
      rules: {
        age: [{ required: true, message: '年龄不能为空', trigger: 'blur' }],
        sex: [{ required: true, message: '性别不能为空', trigger: 'blur' }],
        email: [{ required: true, message: '邮箱不能为空', trigger: 'blur' }],
        tel: [{ required: true, message: '手机号不能为空', trigger: 'blur' }],
        inTime: [{ required: true, message: '入职时间不能为空', trigger: 'blur' }],

        name: [{ required: true, message: '姓名不能为空', trigger: 'blur' }],
        tecNo: [{ required: true, message: '工号不能为空', trigger: 'blur' }],
        tecNowSub: [{ required: true, message: '任职学科不能为空', trigger: 'blur' }],
        tecNowGrade: [{ required: true, message: '任职年级不能为空', trigger: 'blur' }],
        tecNowClass: [{ required: true, message: '任职班级不能为空', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getList()
    this.getTbSubItems()
    this.getTbClassItems()
    this.getDicts('sys_user_sex').then(response => {
      this.sexOptions = response.data
      const newObj = []
      response.data.forEach(item => {
        newObj[item.value] = item.label
      })
      this.sexFormat = newObj
    })
  },
  methods: {
    changeSeachFormClassOp() {
      this.classOptions = this.gradeAndClass.filter(i => i.grade === this.queryParams.tecNowGrade).map(j => ({ value: j.class, key: j.class }))
      if (this.classOptions.every(i => i.value !== this.queryParams.tecNowClass)) {
        this.queryParams.tecNowClass = ''
      }
    },
    changeClassOp() {
      this.addformClassOp = this.gradeAndClass.filter(i => i.grade === this.form.tecNowGrade).map(j => ({ value: j.class, key: j.class }))
      if (this.addformClassOp.every(i => i.value !== this.form.tecNowClass)) {
        this.form.tecNowClass = ''
      }
    },
    getTbClassItems() {
      this.getItems(listTbClass, undefined).then(res => {
        this.gradeAndClass = res.data.list.map(i => ({ grade: i.grade, class: i.class }))
        const gradeList = res.data.list.map(i => i.grade)
        this.gradeOptions = [...new Set(gradeList)].map(j => ({ value: j, key: j }))
        this.classOptions = []
      })
    },
    /** 查询参数列表 */
    getList() {
      this.loading = true
      listTbTeacher(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
        this.tbTeacherList = response.data.list
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

        name: undefined,
        tecNo: undefined,
        tecNowSub: undefined,
        tecNowGrade: undefined,
        tecNowClass: undefined,
        sex: undefined,
        inTime: undefined,
        age: undefined,
        idNo: undefined,
        address: undefined,
        tel: undefined,
        email: undefined,
        honorary: undefined,
        resume: undefined,
        otherTel: undefined,
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
    tecNowSubFormat(row) {
      return this.selectItemsLabel(this.tecNowSubOptions, row.tecNowSub)
    },

    // 关系
    getTbSubItems() {
      this.getItems(listTbSub, undefined).then(res => {
        this.tecNowSubOptions = this.setItems(res, 'name', 'name')
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
      this.addformClassOp = []
      this.open = true
      this.title = '添加教师管理'
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
      getTbTeacher(id).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改教师管理'
        this.isEdit = true
        this.changeClassOp()
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id !== undefined) {
            updateTbTeacher(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess(response.msg)
                this.open = false
                this.getList()
              } else {
                this.msgError(response.msg)
              }
            })
          } else {
            //

            // addUser(saveParams).then(response => {
            //     if (response.code === 200) {

            //       listUser({ pageIndex: 1,
            //         pageSize: 10000,}).then(users => {
            //           const commonNameList = users.data.list.filter(d=>d.username==this.form.name&&d.nickName==this.form.name&&d.roleId==5).sort((a,b)=>new Date(b.createdAt).getTime()-new Date(a.createdAt).getTime())
            //           console.log(12333, '新增的用户',commonNameList );
            //           const createParams = JSON.parse(JSON.stringify(this.form))
            //           createParams.id = commonNameList[0]?.userId
            //           updateTbTeacher(createParams).then(res => {
            //               if (res.code === 200) {
            //                 this.msgSuccess('创建成功')
            //                 this.open = false
            //                 this.getList()
            //               } else {
            //                 this.msgError(res.msg)
            //               }
            //           })
            //       })
            //     } else {
            //       this.msgError(response.msg)
            //     }
            //   }).catch()

            addTbTeacher(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess(response.msg)
                this.open = false
                this.getList()

                const saveParams = {
                  deptId: 11,
                  email: this.form.email,
                  nickName: this.form.name,
                  password: '123456',
                  phone: this.form.tel,
                  postId: 1,
                  roleId: 5,
                  sex: this.form.sex,
                  status: '2',
                  username: this.form.name
                }
                addUser(saveParams).then(response => {
                  console.log(response)
                }).catch((err) => { console.log(err) })
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
        return delTbTeacher({ 'ids': Ids })
      }).then((response) => {
        if (response.code === 200) {
          this.msgSuccess(response.msg)
          this.open = false
          this.getList()
          // delUser({ 'ids': Ids }).then().catch(err=>console.log(err))
        } else {
          this.msgError(response.msg)
        }
      }).catch(function() {
      })
    }
  }
}
</script>
