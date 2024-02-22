<template>
  <div class="question">
    <el-card>
      <el-form ref="formCom" :model="form" label-width="100px">
        <el-row>
          <el-col :span="5">
            <el-form-item label="考试时间" prop="examTime">
              <el-date-picker
                v-model="form.examTime"
                type="date"
                placeholder="选择日期"
                size="default"
              />
            </el-form-item>
          </el-col>

          <el-col :span="5">
            <el-form-item label="考试批次" prop="examName">
              <el-select v-model="form.examName" placeholder="请选择考试批次">
                <el-option
                  v-for="item in examinationOp"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="2" />
          <el-col :span="5">
            <el-form-item label-width="10px">
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
        <el-table-column prop="grade" label="年级" width="300">
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
        <el-table-column prop="class" label="班级" width="300">
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

        <el-table-column prop="starTime" label="考试开始时间" width="300">
          <template v-slot="scope">
            <div v-if="editObject.index == scope.$index">
              <el-date-picker
                v-model="editObject.starTime"
                type="date"
                placeholder="选择日期"
                size="default"
              />
            </div>
            <div v-else>
              {{ dayjs(scope.row.starTime).format("YYYY-MM-DD") }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="endTime" label="考试结束时间" width="300">
          <template v-slot="scope">
            <div v-if="editObject.index == scope.$index">
              <el-date-picker
                v-model="editObject.endTime"
                type="date"
                placeholder="选择日期"
                size="default"
              />
            </div>
            <div v-else>
              {{ dayjs(scope.row.endTime).format("YYYY-MM-DD") }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="examName" label="考试批次" width="300">
          <template v-slot="scope">
            <div v-if="editObject.index == scope.$index">
              <el-input
                v-model="editObject.examName"
                placeholder="请输入考试批次"
              />
            </div>
            <div v-else>{{ scope.row.examName }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="examObject" label="考试科目" width="300">
          <template v-slot="scope">
            <div v-if="editObject.index == scope.$index">
              <el-select
                v-model="editObject.examObject"
                multiple
                placeholder="请选择考试的科目名称"
                style="width: 260px"
              >
                <el-option
                  v-for="item in object"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
            <div v-else>{{ scope.row.examObject.join(",") }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="schoolName" label="学期名称" width="300">
          <template v-slot="scope">
            <div v-if="editObject.index == scope.$index">
              <el-select
                v-model="editObject.schoolName"
                placeholder="请选择学期"
              >
                <el-option
                  v-for="item in semesterOp"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
            <div v-else>{{ scope.row.schoolName }}</div>
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
import {
  object,
  examinationOp,
  semesterOp,
  classOp,
  gradeOp
} from '@/views/admin/util.js'
export default {
  components: {},
  data() {
    return {
      dayjs,
      object,
      examinationOp,
      semesterOp,
      classOp,
      gradeOp,
      editObject: {},
      pagination: {
        current: 1,
        size: 1,
        total: ''
      },
      addFlag: false,
      form: {
        examTime: '',
        examName: ''
      },

      list: [
        {
          grade: '七年级',
          class: '一班',
          starTime: new Date('2022-1-15'),
          endTime: new Date('2022-1-16'),
          examName: '入学考试',
          examObject: ['语文', '数学', '英语'],
          schoolName: '2022-2023第一学期'
        }
      ] // 题库列表数
    }
  },
  created() {
    this.getlist()
  },

  methods: {
    // fengzhuan封装 获取题库列表
    getlist() {
      // const param = {
      //   ...this.form,
      //   page: this.pagination.current,
      //   limit: this.pagination.size,
      // };
    },
    handleSizeChange(page) {
      this.pagination.size = page
      this.pagination.current = 1
      this.getlist()
    },
    handleCurrentChange(page) {
      this.pagination.current = page
      this.getlist()
    },
    // 上面表单的三个按钮
    search() {
      if (!this.form.examTime && !this.form.examName) {
        return
      }
      this.pagination.current = 1
      this.getlist()
    },
    // 清除
    clear() {
      this.$refs.formCom.resetFields()
      this.search()
    },
    cancel() {
      if (this.addFlag) {
        this.addFlag = false
        this.list.pop()
      }
      this.editObject = {}
    },
    // 新增学期
    add() {
      if (this.addFlag) return
      this.addFlag = true
      this.list.push({
        grade: '',
        class: '',
        starTime: new Date(),
        endTime: new Date(),
        examName: '',
        examObject: [],
        schoolName: ''
      })

      this.editObject = {
        grade: '',
        class: '',
        starTime: new Date(),
        endTime: new Date(),
        examName: '',
        examObject: [],
        schoolName: '',

        index: String(this.list.length - 1)
      }
    },
    // 修改功能| 保存
    edit(data) {
      if (this.editObject.index === data.$index) {
        const keys = Object.keys(this.editObject)
        const hasVal = keys.filter((key) => this.editObject[key])
        if (hasVal.length < 2 || !this.editObject.examName) {
          return
        }
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

    delet(id) {
      // $confirm('确认删除?', '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning'
      // }).then(() => {
      //   del({ id }).then(() => {
      //     $message.success('删除成功')
      //     search()
      //     console.log('删除')
      //   })
      // })
    }
  }
}
</script>

<style lang="scss">
.question {
  padding-left: 15px;
  .table {
    margin-top: 20px;
  }
  .pagination {
    margin-top: 20px;
    text-align: center;
  }
  .red {
    color: red;
  }
}
</style>
