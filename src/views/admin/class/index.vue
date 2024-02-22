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
            <el-form-item label="班主任" prop="classLeader">
              <el-input v-model="form.classLeader" class="input" />
            </el-form-item>
          </el-col>

          <el-col :span="4" class="mr16">
            <el-form-item label="往届" prop="previousEditions">
              <el-select
                v-model="form.previousEditions"
                placeholder="请选择学期"
              >
                <el-option
                  v-for="item in semesterOp"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="5" style="margin-left: 64px">
            <el-form-item>
              <el-button type="primary" @click="search">搜索</el-button>
              <el-button @click="clear">清除</el-button>
              <el-button type="primary" @click="add">+新增班级</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card class="table">
      <el-table :data="classList" style="width: 100%" class="table">
        <el-table-column prop="semester" label="学期" width="200">
          <template v-slot="scope">
            <div v-if="editObject.index == scope.$index">
              <el-input v-model="editObject.semester" />
            </div>
            <div v-else>{{ scope.row.semester }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="grade" label="年级" width="150">
          <template v-slot="scope">
            <div v-if="editObject.index == scope.$index">
              <el-input v-model="editObject.grade" />
            </div>
            <div v-else>{{ scope.row.grade }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="classRoom" label="班级" width="150">
          <template v-slot="scope">
            <div v-if="editObject.index == scope.$index">
              <el-input v-model="editObject.classRoom" />
            </div>
            <div v-else>{{ scope.row.classRoom }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="classLeader" label="班主任" width="150">
          <template v-slot="scope">
            <div v-if="editObject.index == scope.$index">
              <el-input v-model="editObject.classLeader" />
            </div>
            <div v-else>{{ scope.row.classLeader }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="language" label="语文老师" width="150">
          <template v-slot="scope">
            <div v-if="editObject.index == scope.$index">
              <el-input v-model="editObject.language" />
            </div>
            <div v-else>{{ scope.row.language }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="math" label="数学老师" width="150">
          <template v-slot="scope">
            <div v-if="editObject.index == scope.$index">
              <el-input v-model="editObject.math" />
            </div>
            <div v-else>{{ scope.row.math }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="english" label="英语老师" width="150">
          <template v-slot="scope">
            <div v-if="editObject.index == scope.$index">
              <el-input v-model="editObject.english" />
            </div>
            <div v-else>{{ scope.row.english }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="politics" label="政治老师" width="150">
          <template v-slot="scope">
            <div v-if="editObject.index == scope.$index">
              <el-input v-model="editObject.politics" />
            </div>
            <div v-else>{{ scope.row.politics }}</div>
          </template>
        </el-table-column>

        <el-table-column prop="history" label="历史老师" width="150">
          <template v-slot="scope">
            <div v-if="editObject.index == scope.$index">
              <el-input v-model="editObject.history" />
            </div>
            <div v-else>{{ scope.row.history }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="geography" label="地理老师" width="150">
          <template v-slot="scope">
            <div v-if="editObject.index == scope.$index">
              <el-input v-model="editObject.geography" />
            </div>
            <div v-else>{{ scope.row.geography }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="physical" label="物理老师" width="150">
          <template v-slot="scope">
            <div v-if="editObject.index == scope.$index">
              <el-input v-model="editObject.physical" />
            </div>
            <div v-else>{{ scope.row.physical }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="chemistry" label="化学老师" width="150">
          <template v-slot="scope">
            <div v-if="editObject.index == scope.$index">
              <el-input v-model="editObject.chemistry" />
            </div>
            <div v-else>{{ scope.row.chemistry }}</div>
          </template>
        </el-table-column>

        <el-table-column prop="biology" label="生物老师" width="150">
          <template v-slot="scope">
            <div v-if="editObject.index == scope.$index">
              <el-input v-model="editObject.biology" />
            </div>
            <div v-else>{{ scope.row.biology }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="sumPeople" label="班级总人数" width="150">
          <template v-slot="scope">
            <div v-if="editObject.index == scope.$index">
              <el-input v-model="editObject.sumPeople" />
            </div>
            <div v-else>{{ scope.row.sumPeople }}</div>
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
import { object, classOp, gradeOp, semesterOp } from '@/views/admin/util.js'

const listItem = {
  classRoom: '一班',
  classLeader: '杜晓健',
  sumPeople: '56',
  language: '章三',
  math: '王武',
  english: '马六',
  politics: '张望',
  history: '林夕',
  geography: '曾建',
  physical: '王建军',
  chemistry: '张爱国',
  biology: '杜晓健',
  grade: '七年级',
  semester: '2022-2023-2'
}
export default {
  components: {},
  data() {
    return {
      object,
      classOp,
      gradeOp,
      semesterOp,
      addFlag: false,

      pagination: {
        currentPage: 1,
        size: 5,
        total: 0
      },
      form: {
        grade: '',
        classLeader: '',
        class: '',
        previousEditions: ''
      },

      classList: [listItem],
      editObject: {}
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
        this.classList.pop()
      }
      this.editObject = {}
    },
    // 新增学科
    add() {
      if (this.addFlag) return
      this.addFlag = true
      const newItem = {
        classRoom: '',
        classLeader: '',
        sumPeople: '',
        language: '',
        math: '',
        english: '',
        politics: '',
        history: '',
        geography: '',
        physical: '',
        chemistry: '',
        biology: '',
        grade: '',
        semester: ''
      }
      this.classList.push(newItem)

      this.editObject = JSON.parse(JSON.stringify(newItem))
      this.editObject.index = String(this.classList.length - 1)
    },
    // 修改功能| 保存
    edit(data) {
      if (this.editObject.index === data.$index) {
        if (!this.editObject.classRoom || !this.editObject.classLeader) return
        // 保存
        this.classList.splice(
          Number(this.editObject.index),
          1,
          JSON.parse(JSON.stringify(this.editObject))
        )
        this.editObject = {}
        this.addFlag = false
      } else {
        if (this.addFlag) {
          this.classList.pop()
        }
        this.addFlag = false
        // 修改
        this.editObject = JSON.parse(JSON.stringify(data.row))
        this.editObject.index = data.$index
      }
    },
    // 封装获取用户列表数据
    getuserlist() {
      // const data = {
      //   ...this.form,
      //   page: this.pagination.currentPage,
      //   limit: this.pagination.size,
      // };
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
    delet(id) {
      const sumcurrent = Math.ceil(
        (this.pagination.total - 1) / this.pagination.size
      )

      if (this.pagination.currentPage > sumcurrent) {
        --this.pagination.currentPage
      }
      this.getuserlist()
    }
  }
}
</script>

<style lang="scss">
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
.input {
  width: 150px;
}
</style>
