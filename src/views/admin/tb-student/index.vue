
<template>
  <BasicLayout>
    <template #wrapper>
      <el-card class="box-card">
        <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="68px">
          <!--  <el-form-item label="名称" prop="name"><el-select
            v-model="queryParams.name"
            placeholder="请选择"
            clearable
            size="small"
          >
            <el-option
              v-for="dict in nameOptions"
              :key="dict.key"
              :label="dict.value"
              :value="dict.key"
            />
          </el-select>
          </el-form-item> -->
          <el-form-item label="年级" prop="grade">
            
            <el-select
                v-model="queryParams.grade"
                placeholder="请选择"
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
                v-model="queryParams.class"
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
            v-model="queryParams.class"
            placeholder="请输入班级"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          /> -->
          </el-form-item>
          <el-form-item label="学号" prop="stuNo"><el-input
            v-model="queryParams.stuNo"
            placeholder="请输入学号"
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
              v-permisaction="['admin:tbStudent:add']"
              type="primary"
              icon="el-icon-plus"
              size="mini"
              @click="handleAdd"
            >新增
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              v-permisaction="['admin:tbStudent:edit']"
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
              v-permisaction="['admin:tbStudent:remove']"
              type="danger"
              icon="el-icon-delete"
              size="mini"
              :disabled="multiple"
              @click="handleDelete"
            >删除
            </el-button>
          </el-col>
        </el-row>

        <el-table v-loading="loading" :data="tbStudentList" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column label="名称" align="center" prop="name"  width="100"/>
          <el-table-column
            label="年级"
            align="center"
            prop="grade"
            :show-overflow-tooltip="true"
          />
          <el-table-column
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
            label="学号"
            align="center"
            prop="stuNo"
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
            label="年龄"
            align="center"
            prop="age"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="身份证"
            align="center"
            prop="idNo"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="家庭地址"
            align="center"
            prop="address"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="电话"
            align="center"
            prop="tel"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="家长姓名"
            align="center"
            prop="parentsName"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="家长电话"
            align="center"
            prop="parentsTel"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="入学时间"
            align="center"
            prop="inTime"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.inTime) }}</span>
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
                  v-permisaction="['admin:tbStudent:edit']"
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
                  v-permisaction="['admin:tbStudent:remove']"
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

            <el-form-item label="名称" prop="name">
              <el-input
                v-model="form.name"
                placeholder="名称"
              />
            </el-form-item>
            <el-form-item label="年级" prop="grade">
             
              <el-select
                v-model="form.grade"
                placeholder="请选择"
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
              >
                <el-option
                  v-for="dict in classOptions"
                  :key="dict.key"
                  :label="dict.value"
                  :value="dict.key"
                />
            </el-select>
            
            </el-form-item>
            <el-form-item label="班主任" prop="headTeacher">
              <el-input
                v-model="form.headTeacher"
                placeholder="班主任"
              />
            </el-form-item>
            <el-form-item label="学号" prop="stuNo">
              <el-input
                v-model="form.stuNo"
                placeholder="学号"
              />
            </el-form-item>
            <el-form-item label="性别" prop="sex">

              <el-select  v-model="form.sex" placeholder="请选择">
                  <el-option
                    v-for="dict in sexOptions"
                    :key="dict.value"
                    :label="dict.label"
                    :value="dict.value"
                  />
                </el-select>

            
            </el-form-item>
            <el-form-item label="年龄" prop="age">
              <el-input
                v-model="form.age"
                placeholder="年龄"
              />
            </el-form-item>
            <el-form-item label="身份证" prop="idNo">
              <el-input
                v-model="form.idNo"
                placeholder="身份证"
              />
            </el-form-item>
            <el-form-item label="家庭地址" prop="address">
              <el-input
                v-model="form.address"
                placeholder="家庭地址"
              />
            </el-form-item>
            <el-form-item label="电话" prop="tel">
              <el-input
                v-model="form.tel"
                placeholder="电话"
              />
            </el-form-item>
            <el-form-item label="家长姓名" prop="parentsName">
              <el-input
                v-model="form.parentsName"
                placeholder="家长姓名"
              />
            </el-form-item>
            <el-form-item label="家长电话" prop="parentsTel">
              <el-input
                v-model="form.parentsTel"
                placeholder="家长电话"
              />
            </el-form-item>
            <el-form-item label="入学时间" prop="inTime">
              <el-date-picker
                v-model="form.inTime"
                type="datetime"
                placeholder="选择日期"
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
import { addTbStudent, delTbStudent, getTbStudent, listTbStudent, updateTbStudent } from '@/api/admin/tb-student'
import { listTbClass } from '@/api/admin/tb-class'
import { delUser, addUser,listUser } from '@/api/admin/sys-user'
// import { listSysUser } from '@/api/admin/sys-user'
export default {
  name: 'TbStudent',
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
      tbStudentList: [],

      // 关系表类型
      nameOptions: [],
      gradeOptions:[],
      classOptions:[],
      sexOptions: [],
      sexFormat:{},
      // 查询参数
      queryParams: {
        pageIndex: 1,
        pageSize: 10,
        name: undefined,
        grade: undefined,
        class: undefined,
        stuNo: undefined

      },
      // 表单参数
      form: {
      },
      // 表单校验
      rules: { name: [{ required: true, message: '名称不能为空', trigger: 'blur' }],
        grade: [{ required: true, message: '年级不能为空', trigger: 'blur' }],
        class: [{ required: true, message: '班级不能为空', trigger: 'blur' }],
        stuNo: [{ required: true, message: '学号不能为空', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getList()
    // this.getSysUserItems()
    this.getTbClassItems()
    this.getDicts('sys_user_sex').then(response => {
      this.sexOptions = response.data
      const newObj = []
      response.data.forEach(item => {
        newObj[item.value] = item.label
      })
      this.sexFormat= newObj
    })
  },
  methods: {
       // 关系
    getTbClassItems() {
      this.getItems(listTbClass, undefined).then(res => {
        this.gradeOptions = this.setItems(res, 'grade', 'grade')
        this.classOptions = this.setItems(res, 'class', 'class')
      })
    },
    /** 查询参数列表 */
    getList() {
      this.loading = true
      listTbStudent(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
        this.tbStudentList = response.data.list
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
        headTeacher: undefined,
        stuNo: undefined,
        sex: undefined,
        age: undefined,
        idNo: undefined,
        address: undefined,
        tel: undefined,
        parentsName: undefined,
        parentsTel: undefined,
        inTime: undefined
      }
      this.resetForm('form')
    },
    getImgList: function() {
      this.form[this.fileIndex] = this.$refs['fileChoose'].resultList[0].fullUrl
    },
    fileClose: function() {
      this.fileOpen = false
    },
   
    nameFormat(row) {
      return this.selectItemsLabel(this.nameOptions, row.name)
    },
    // 关系
    // getSysUserItems() {
    //   this.getItems(listSysUser, undefined).then(res => {
    //     this.nameOptions = this.setItems(res, 'username', 'username')
    //   })
    // },
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
      this.title = '添加学生管理'
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
      getTbStudent(id).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改学生管理'
        this.isEdit = true
      })
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id !== undefined) {
            updateTbStudent(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess(response.msg)
                this.open = false
                this.getList()
              } else {
                this.msgError(response.msg)
              }
            })
          } else {

            const saveParams = {
                deptId:11,
              // email:"270@qq.com",
              nickName: this.form.name,
              password:"123456",
              phone:this.form.tel,
              postId:1,
              roleId:4,
              sex:this.form.sex,
              status:"2",
              username: this.form.name,
            }
         
          addUser(saveParams).then(response => {
              if (response.code === 200) {
               
                listUser({ pageIndex: 1,
                  pageSize: 10000,}).then(users => {
                    const commonNameList = users.data.list.filter(d=>d.username==this.form.name&&d.nickName==this.form.name&&d.roleId==4).sort((a,b)=>new Date(b.createdAt).getTime()-new Date(a.createdAt).getTime())
                    console.log(12333, '新增的用户',commonNameList );
                    const createParams = JSON.parse(JSON.stringify(this.form))
                    createParams.id = commonNameList[0]?.userId
                    updateTbStudent(createParams).then(res => {
                        if (res.code === 200) {
                          this.msgSuccess('创建成功')
                          this.open = false
                          this.getList()
                        } else {
                          this.msgError(res.msg)
                        }
                    })
                })
              } else {
                this.msgError(response.msg)
              }
            }).catch()
            // addTbStudent(this.form).then(response => {
            //   if (response.code === 200) {
            //     this.msgSuccess(response.msg)
            //     this.open = false
            //     this.getList()
                
            //     const saveParams = {
            //         deptId:11,
            //         // email:"270@qq.com",
            //         nickName: this.form.name,
            //         password:"123456",
            //         phone:this.form.tel,
            //         postId:1,
            //         roleId:4,
            //         sex:this.form.sex,
            //         status:"2",
            //         username: this.form.name,
            //     }
            //     addUser(saveParams).then(response => {
            //       console.log(response);
            //     }).catch((err)=>{console.log(err);})
            //   } else {
            //     this.msgError(response.msg)
            //   }
            // })
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
        return delTbStudent({ 'ids': Ids })
      }).then((response) => {
        if (response.code === 200) {
          this.msgSuccess(response.msg)
          this.open = false
          this.getList()

          delUser({ 'ids': Ids }).then().catch(err=>console.log(err))
        } else {
          this.msgError(response.msg)
        }
      }).catch(function() {
      })
    }
  }
}
</script>
