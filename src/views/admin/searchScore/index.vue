<template>
  <div style="padding-left: 15px">
    <el-card>
      <el-form ref="formCom" :model="form" label-width="120px">
        <el-row>
          <el-col :span="5">
            <el-form-item label="姓名" prop="username">
              <el-input v-model="form.username" />
            </el-form-item>
          </el-col>

          <el-col :span="5">
            <el-form-item label="考号" prop="candidateNumber">
              <el-input v-model="form.candidateNumber" />
            </el-form-item>
          </el-col>

          <el-col :span="5">
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

          <el-col :span="5">
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
            <el-form-item label="考试科目" prop="object">
              <el-input v-model="form.object" />
            </el-form-item>
          </el-col>

          <el-col :span="5">
            <el-form-item label="考试时间" prop="time">
              <el-date-picker
                v-model="form.time"
                type="daterange"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                size="default"
              />
            </el-form-item>
          </el-col>

          <el-col :span="5">
            <el-form-item>
              <el-button type="primary" @click="search">查询</el-button>
              <el-button @click="clear">清空搜索条件</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card v-if="studentResult && studentResult.length" class="table">
      <h5>默认展示这个表格</h5>

      <el-table :data="studentResult" style="width: 100%">
        <el-table-column prop="grade" label="年级" width="150" />
        <el-table-column prop="class" label="班级" width="150" />
        <el-table-column label="姓名" prop="username" width="150" />
        <el-table-column prop="candidateNumber" label="考号" width="150" />
        <el-table-column prop="language" label="语文" width="80" />
        <el-table-column prop="math" label="数学" width="80" />
        <el-table-column
          prop="english"
          label="英语"
          width="80"
        />
        <el-table-column
          prop="politics"
          label="政治"
          width="80"
        />
        <el-table-column
          prop="history"
          label="历史"
          width="80"
        />
        <el-table-column
          prop="geography"
          label="地理"
          width="80"
        />
        <el-table-column
          prop="physical"
          label="物理"
          width="80"
        />
        <el-table-column
          prop="chemistry"
          label="化学"
          width="80"
        />
        <el-table-column
          prop="biology"
          label="生物"
          width="80"
        />
        <el-table-column
          prop="sumScore"
          label="总分"
          width="80"
        />
        <el-table-column
          prop="ranking"
          label="总分排名"
          width="150"
        />
        <el-table-column prop="time" label="考试时间" />
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
    <el-card v-if="resultList && resultList.length" class="table">
      <h5>当搜索‘某位学生 & 某科目’ 成绩时展示这个表格</h5>
      <el-table :data="resultList" style="width: 100%">
        <el-table-column prop="grade" label="年级" width="150" />
        <el-table-column prop="class" label="班级" width="150" />
        <el-table-column label="姓名" prop="username" width="150" />
        <el-table-column prop="candidateNumber" label="考号" width="150" />
        <el-table-column prop="object" label="科目" width="100" />
        <el-table-column prop="score" label="成绩" width="80" />
        <el-table-column
          prop="highest"
          label="当前科目最高得分"
          width="150"
        />
        <el-table-column
          prop="minimum"
          label="当前科目最低得分"
          width="150"
        />
        <el-table-column
          prop="ranking"
          label="排名"
          width="80"
        />
        <el-table-column
          prop="sumPerson"
          label="当次考试总人数"
          width="150"
        />
        <el-table-column prop="time" label="考试时间" />
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
const listItem = {
  grade: '九年级',
  class: '五班',
  username: '杜晓俊',
  candidateNumber: '20220212',
  language: '121',

  math: '120',

  english: '117',

  politics: '81',

  history: '91',

  geography: '91',

  physical: '98',

  chemistry: '89',

  biology: '78',
  sumScore: '656',
  ranking: '45',
  time: '2023-12-12'
}
const searchItem = {
  username: '张三',
  candidateNumber: '20221202',
  object: '英语',
  time: '2023-12-12',
  grade: '九年级',
  class: '一班',
  score: '98',
  ranking: '76',
  highest: '98',
  minimum: '0',
  sumPerson: '178'
}
export default {
  data() {
    return {
      object,
      classOp,
      gradeOp,

      mode: 'add',
      pagination: {
        currentPage: 1,
        size: 5,
        total: ''
      },
      form: {
        grade: '',
        username: '',
        class: '',
        object: '',
        time: '',
        candidateNumber: ''
      },
      studentResult: [listItem],
      resultList: [searchItem]
    }
  },

  created() {
    this.getuserlist()
  },

  methods: {
    // 上边表单中的三个按钮,查询
    search() {
      this.pagination.currentPage = 1

      this.studentResult.value = []
      // this.getuserlist()
    },
    // 清除表单,表单中一定要设置prop属性
    clear() {
      this.$refs.formCom.resetFields()
      this.getuserlist()
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
