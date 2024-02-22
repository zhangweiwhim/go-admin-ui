<template>
  <div style="padding-left: 15px">
    <el-card>
      <el-form ref="formCom" :model="form">
        <el-row>
          <el-col :span="4" class="mr16">
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
          <el-col :span="4" class="mr16">
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
          <el-col :span="4" class="mr16">
            <el-form-item label="学生名称" prop="username">
              <el-input v-model="form.username" />
            </el-form-item>
          </el-col>
          <el-col :span="4" class="mr16">
            <el-form-item label="学生学号" prop="userId">
              <el-input v-model="form.userId" />
            </el-form-item>
          </el-col>

          <el-col :span="5" style="margin-left: 64px">
            <el-form-item>
              <el-button type="primary" @click="search">查询</el-button>
              <el-button @click="clear">清空搜索条件</el-button>
              <el-button type="primary" @click="add">新增</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card v-if="userlist" class="table">
      <el-table :data="userlist" style="width: 100%">
        <el-table-column prop="grade" label="年级" width="150">
          <template v-slot="scope">
            <div v-if="editObject.index == scope.$index">
              <el-select v-model="editObject.grade" placeholder="请选择年级">
                <el-option
                  v-for="item in gradeOp"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
            <div v-else>{{ scope.row.grade }}</div>
          </template>
        </el-table-column>

        <el-table-column prop="class" label="班级" width="150">
          <template v-slot="scope">
            <div v-if="editObject.index == scope.$index">
              <el-select v-model="editObject.class" placeholder="请选择班级">
                <el-option
                  v-for="item in classOp"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
            <div v-else>{{ scope.row.class }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="classLeader" label="班主任" width="150" />
        <el-table-column prop="studentName" label="姓名" width="150">
          <template v-slot="scope">
            <div v-if="editObject.index == scope.$index">
              <el-input v-model="editObject.studentName" />
            </div>
            <div v-else>{{ scope.row.studentName }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="studentId" label="学号" width="150">
          <template v-slot="scope">
            <div v-if="editObject.index == scope.$index">
              <el-input v-model="editObject.studentId" />
            </div>
            <div v-else>{{ scope.row.studentId }}</div>
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

        <el-table-column prop="enterTime" label="入学时间" width="300">
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
        <el-table-column prop="studentPhone" label="联系电话" width="150">
          <template v-slot="scope">
            <div v-if="editObject.index == scope.$index">
              <el-input v-model="editObject.studentPhone" />
            </div>
            <div v-else>{{ scope.row.studentPhone }}</div>
          </template>
        </el-table-column>

        <el-table-column prop="parentName" label="家长姓名" width="150">
          <template v-slot="scope">
            <div v-if="editObject.index == scope.$index">
              <el-input v-model="editObject.parentName" />
            </div>
            <div v-else>{{ scope.row.parentName }}</div>
          </template>
        </el-table-column>

        <el-table-column prop="parentPhone" label="家长联系方式" width="150">
          <template v-slot="scope">
            <div v-if="editObject.index == scope.$index">
              <el-input v-model="editObject.parentPhone" />
            </div>
            <div v-else>{{ scope.row.parentPhone }}</div>
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
              @click="del(scope.$index)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-if="pagination.total"
        class="pagination"
        :current-page="pagination.currentPage"
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
import { object, classOp, gradeOp } from '@/views/admin/util.js'
// import { userlist, editstatus, del } from '@/api/user.js'
import * as dayjs from 'dayjs'
const listItem = {
  grade: '七年级',
  class: '一班',
  studentName: '张晓雅',
  studentId: '20221202',
  gender: '女',
  enterTime: new Date('2022-12-02'),
  yearOld: '15',
  IDCard: '311726200202989876',
  home: '静安区帽胡同街道红魔区12栋一单元1202',
  studentPhone: '13256888765',
  parentName: '张志刚',
  parentPhone: '13256888765',
  classLeader: '钱鹏程'
}
export default {
  components: {},
  data() {
    return {
      dayjs,
      object,
      classOp,
      gradeOp,
      editObject: {},
      addFlag: false,
      pagination: {
        currentPage: 1,
        size: 5,
        total: ''
      },
      form: {
        username: '',
        userId: '',
        grade: '',
        class: ''
      },

      userlist: [listItem]
    }
  },
  created() {
    this.getuserlist()
  },
  methods: {
    // 上边表单中的三个按钮,查询
    search() {
      this.pagination.currentPage = 1
      this.getuserlist()
    },
    // 清除表单,表单中一定要设置prop属性
    clear() {
      this.$refs.formCom.resetFields()
      this.getuserlist()
    },
    cancel() {
      if (this.addFlag) {
        this.addFlag = false
        this.userlist.pop()
      }
      this.editObject = {}
    },
    // 新增
    add() {
      if (this.addFlag) return
      this.addFlag = true
      const newItem = {
        classLeader: '',
        grade: '',
        class: '',
        studentName: '',
        studentId: '',
        gender: '',
        enterTime: new Date(),
        yearOld: '',
        IDCard: '',
        home: '',
        studentPhone: '',
        parentName: '',
        parentPhone: ''
      }
      this.userlist.push(newItem)
      this.editObject = JSON.parse(JSON.stringify(newItem))
      this.editObject.index = String(this.userlist.length - 1)
    },
    // 封装获取用户列表数据
    getuserlist() {
      // const data = {
      //   ...this.form,
      //   page: this.pagination.currentPage,
      //   limit: this.pagination.size,
      // };
      // userlist(data).then((res) => {
      //   userlist = res.data.data.items
      //   pagination.total = res.data.data.pagination.total
      // })
    },
    // 页容量改变
    handleSizeChange(page) {
      this.pagination.size = page
      this.pagination.currentPage = 1
      this.getuserlist()
    },
    // 页码改变
    handleCurrentChange(num) {
      this.pagination.currentPage = num
      this.getuserlist()
    },
    // 表格中的三个按钮
    del(id) {},

    // 修改功能| 保存
    edit(data) {
      if (this.editObject.index === data.$index) {
        if (
          !this.editObject.grade ||
          !this.editObject.class ||
          !this.editObject.studentName ||
          !this.editObject.studentId
        ) { return }
        // 保存
        this.userlist.splice(
          Number(this.editObject.index),
          1,
          JSON.parse(JSON.stringify(this.editObject))
        )
        this.editObject = {}
        this.addFlag = false
      } else {
        if (this.addFlag) {
          this.userlist.pop()
        }
        this.addFlag = false

        // 修改
        this.editObject = JSON.parse(JSON.stringify(data.row))
        this.editObject.index = data.$index
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.red {
  color: red;
}
.table {
  margin-top: 20px;
}
.pagination {
  text-align: center;
  margin-top: 20px;
}
</style>
