<template>
  <div style="padding-left: 15px">
    <el-card>
      <el-form ref="formCom" :model="form" label-width="100px">
        <el-row>
          <el-col :span="5">
            <el-form-item label="教师名称" prop="teacherName">
              <el-input
                v-model="form.teacherName"
                placeholder="请输入教师名称"
              />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="教师工号" prop="teacherId">
              <el-input v-model="form.teacherId" placeholder="请输入教师工号" />
            </el-form-item>
          </el-col>
          <el-col :span="5" class="mr16">
            <el-form-item label="年级" prop="grade">
              <el-select v-model="form.grade" placeholder="请选择年级">
                <el-option
                  v-for="item in gradeOp"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5" class="mr16">
            <el-form-item label="班级" prop="class">
              <el-select v-model="form.class" placeholder="请选择班级">
                <el-option
                  v-for="item in classOp"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="学科名称" prop="objectName">
              <el-select v-model="form.objectName" placeholder="请选择学科">
                <el-option
                  v-for="item in object"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item>
              <el-button type="primary" @click="search">搜索</el-button>
              <el-button @click="clear">清空搜索条件</el-button>
              <el-button type="primary" @click="add">新增</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>

    <el-card v-if="list" class="table">
      <el-table :data="list" style="width: 100%" class="table">
        <el-table-column prop="teacherName" label="教师名称" width="150">
          <template v-slot="scope">
            <div v-if="editObject.index == scope.$index">
              <el-input v-model="editObject.teacherName" />
            </div>
            <div v-else>{{ scope.row.teacherName }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="teacherNumber" label="教师工号" width="150">
          <template v-slot="scope">
            <div v-if="editObject.index == scope.$index">
              <el-input v-model="editObject.teacherNumber" />
            </div>
            <div v-else>{{ scope.row.teacherNumber }}</div>
          </template>
        </el-table-column>

        <el-table-column prop="objectName" label="现任教学科" width="150">
          <template v-slot="scope">
            <div v-if="editObject.index == scope.$index">
              <el-select
                v-model="editObject.objectName"
                placeholder="请选择学科"
              >
                <el-option
                  v-for="item in object"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
            <div v-else>{{ objectExcel[scope.row.objectName] }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="teachGrade" label="现任教年级" width="150">
          <template v-slot="scope">
            <div v-if="editObject.index == scope.$index">
              <el-select
                v-model="editObject.teachGrade"
                placeholder="请选择年级"
              >
                <el-option
                  v-for="item in gradeOp"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
            <div v-else>{{ scope.row.teachGrade }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="teachClass" label="现任教班级" width="150">
          <template v-slot="scope">
            <div v-if="editObject.index == scope.$index">
              <el-select
                v-model="editObject.teachClass"
                placeholder="请选择班级"
              >
                <el-option
                  v-for="item in classOp"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
            <div v-else>{{ scope.row.teachClass }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="gender" label="性别" width="80">
          <template v-slot="scope">
            <div v-if="editObject.index == scope.$index">
              <el-input v-model="editObject.gender" />
            </div>
            <div v-else>{{ scope.row.gender }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="enterTime" label="入职时间" width="300">
          <template v-slot="scope">
            <div v-if="editObject.index == scope.$index">
              <el-date-picker
                v-model="editObject.enterTime"
                type="date"
                placeholder="选择日期"
                size="default"
              />
            </div>
            <div v-else>
              {{ dayjs(scope.row.enterTime).format("YYYY-MM-DD") }}
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="yearOld" label="年龄" width="80">
          <template v-slot="scope">
            <div v-if="editObject.index == scope.$index">
              <el-input v-model="editObject.yearOld" />
            </div>
            <div v-else>{{ scope.row.yearOld }}</div>
          </template>
        </el-table-column>

        <el-table-column prop="IDCard" label="身份证号" width="200">
          <template v-slot="scope">
            <div v-if="editObject.index == scope.$index">
              <el-input v-model="editObject.IDCard" />
            </div>
            <div v-else>{{ scope.row.IDCard }}</div>
          </template>
        </el-table-column>

        <el-table-column prop="home" label="家庭住址" width="350">
          <template v-slot="scope">
            <div v-if="editObject.index == scope.$index">
              <el-input v-model="editObject.home" />
            </div>
            <div v-else>{{ scope.row.home }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="teacherPhone" label="联系电话" width="150">
          <template v-slot="scope">
            <div v-if="editObject.index == scope.$index">
              <el-input v-model="editObject.teacherPhone" />
            </div>
            <div v-else>{{ scope.row.teacherPhone }}</div>
          </template>
        </el-table-column>

        <el-table-column prop="honoraryTitle" label="荣誉称号" width="450">
          <template v-slot="scope">
            <div v-if="editObject.index == scope.$index">
              <el-input v-model="editObject.honoraryTitle" />
            </div>
            <div v-else>{{ scope.row.honoraryTitle }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="bio" label="简介" width="450">
          <template v-slot="scope">
            <div v-if="editObject.index == scope.$index">
              <el-input v-model="editObject.bio" />
            </div>
            <div v-else>{{ scope.row.bio }}</div>
          </template>
        </el-table-column>

        <el-table-column prop="contactPerson" label="联系人" width="450">
          <template v-slot="scope">
            <div v-if="editObject.index == scope.$index">
              <el-input v-model="editObject.contactPerson" />
            </div>
            <div v-else>{{ scope.row.contactPerson }}</div>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="150">
          <template v-slot="scope">
            <el-button type="primary" link @click="edit(scope)">{{
              editObject.index == scope.$index ? "保存" : "编辑"
            }}</el-button>
            <el-button
              v-if="editObject.index == scope.$index"
              link
              @click="cancel"
            >取消</el-button>
            <el-button
              type="primary"
              link
              @click="delet(scope.$index)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 页码 -->
      <el-pagination
        v-if="pagination.total"
        class="pagination"
        :current-page="pagination.current"
        :page-sizes="[1, 5, 10, 20, 30, 40]"
        :page-size="pagination.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
  </div>
</template>

<script>
import * as dayjs from 'dayjs'
import { object, classOp, gradeOp, objectExcel } from '@/views/admin/util.js'

const listItem = {
  teacherName: '张晓娟',
  teacherNumber: '800987',
  gender: '女',
  enterTime: new Date('2022-12-02'),
  yearOld: '35',
  IDCard: '311726200202989876',
  home: '静安区帽胡同街道红魔区12栋一单元1202',
  teacherPhone: '13256888765',
  objectName: 'math',
  teachGrade: '七年级',
  teachClass: '二班',
  honoraryTitle: '优秀班主任',
  contactPerson: '12345678987',
  bio: '浙江大学研究生毕业，连续五年评得优秀教师称号'
}
export default {
  components: {},
  data() {
    return {
      dayjs,
      object,
      classOp,
      gradeOp,
      objectExcel,
      editObject: {},
      addFlag: false,

      pagination: {
        current: 1,
        size: 1,
        total: ''
      },
      form: {
        grade: '',
        teacherId: '',
        class: '', //	否	string	学科编号
        objectName: '', //	否	string	学科名称
        teacherName: '' //	否	string	创建者用户名
      },
      list: [listItem]
    }
  },

  created() {
    this.getdata()
  },

  methods: {
    cancel() {
      if (this.addFlag) {
        this.addFlag = false
        this.list.pop()
      }
      this.editObject = {}
    },
    // 新增学科
    add() {
      if (this.addFlag) return
      this.addFlag = true
      this.list.push({
        contactPerson: '',
        teacherName: '',
        teacherNumber: '',
        gender: '',
        enterTime: new Date(),
        yearOld: '',
        IDCard: '',
        home: '',
        teacherPhone: '',
        objectName: '',
        teachGrade: '',
        teachClass: '',
        honoraryTitle: '',
        bio: ''
      })

      this.editObject = {
        contactPerson: '',
        teacherName: '',
        teacherNumber: '',
        gender: '',
        enterTime: new Date(),
        yearOld: '',
        IDCard: '',
        home: '',
        teacherPhone: '',
        objectName: '',
        teachGrade: '',
        teachClass: '',
        honoraryTitle: '',
        bio: '',
        index: String(this.list.length - 1)
      }
    },
    // 搜索
    search() {
      this.pagination.current = 1
      this.getdata()
    },
    // 清除
    clear() {
      // 进行重置时必须表单项绑定prop
      this.$refs.formCom.resetFields()
      this.getdata()
    },
    // 定义获取列数据方法
    getdata() {
      // const param = {
      //   ...this.form,
      //   page: this.pagination.current,
      //   limit: this.pagination.size,
      // };
    },
    // 修改功能| 保存
    edit(data) {
      if (this.editObject.index === data.$index) {
        if (!this.editObject.teacherName || !this.editObject.teacherNumber) { return }
        // 保存
        this.list.splice(
          Number(this.editObject.index),
          1,
          JSON.parse(JSON.stringify(this.editObject))
        )
        this.editObject = {}
        this.addFlag = false
      } else {
        if (this.addFlag) {
          this.list.pop()
        }
        this.addFlag = false

        // 修改
        this.editObject = JSON.parse(JSON.stringify(data.row))
        this.editObject.index = data.$index
      }
    },

    // 删除功能
    delet(id) {
      //  $confirm('确认删除?', '温馨提示', {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //   }).then(() => {
      //     delet({ id }).then(() => {
      //      $message({
      //         type: 'success',
      //         message: '删除成功!'
      //       })
      //       // 如果删除的是最后一条数据,判断当前页是否还有数据,没有的则请求前一页的数据,
      //       //或者直接调用search接口让它返回第一页
      //       const sumcurrent = Math.ceil((this.pagination.total - 1) /pagination.size)
      //       console.log('总条数',pagination.total)
      //       console.log('页容量',pagination.size)
      //       // console.log('sumcurrent', sumcurrent)
      //       if (this.pagination.current> sumcurrent) {
      //        this.pagination.current=this.pagination.current- 1
      //       }
      //       // console.log(this.pagination.current)
      //       // console.log(this.pagination.size)
      //      getdata()
      //     })
      //   })
    },
    // 页容量改变
    handleSizeChange(page) {
      this.pagination.size = page
      this.pagination.current = 1
      this.getdata()
    },
    // 页码改变
    handleCurrentChange(page) {
      this.pagination.current = page
      this.getdata()
    }
  }
}
</script>

<style lang="scss" scoped>
.input {
  width: 155px;
}
.red {
  color: red;
}
.table {
  margin-top: 20px;
}
.pagination {
  margin-top: 20px;
  text-align: center;
}
</style>
