<template>
  <div class="question" style="padding-left: 15px">
    <el-card>
      <el-form ref="formCom" :model="form" label-width="100px" :rules="rules">
        <el-row>
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
            <el-form-item label="考试时间" prop="time">
              <el-select v-model="form.time" placeholder="请选择考试期次">
                <el-option
                  v-for="item in examinationOp"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="5">
            <el-form-item label="学生学号" prop="studentId">
              <el-input v-model="form.studentId" />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="学生姓名" prop="username">
              <el-input v-model="form.username" />
            </el-form-item>
          </el-col>

          <el-col :span="5" style="margin-left: 100px">
            <el-form-item label-width="10px">
              <el-button
                type="primary"
                :disabled="!form.class || !form.time"
                @click="search"
              >调出表格</el-button>
              <el-button type="primary" @click="add">保存</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card class="table">
      <el-table :data="list" border style="width: 100%">
        <el-table-column
          prop="grade"
          label="年级"
          width="150"
        />
        <el-table-column
          prop="class"
          label="班级"
          width="150"
        />
        <el-table-column label="姓名" prop="username" width="150" />
        <el-table-column prop="candidateNumber" label="考号" width="150" />

        <el-table-column label="语文" width="150">
          <template v-slot="scope">
            <el-input v-model="scope.row.scorce" />
            <!-- <span>{{ scope.row.subject_name }}.{{ step[scope.row.step] }}</span> -->
          </template>
        </el-table-column>
        <el-table-column label="数学" width="150">
          <template v-slot="scope">
            <el-input v-model="scope.row.scorce" />
          </template>
        </el-table-column>
        <el-table-column label="英语" width="150">
          <template v-slot="scope">
            <el-input v-model="scope.row.scorce" />
          </template>
        </el-table-column>
        <el-table-column label="政治" width="150">
          <template v-slot="scope">
            <el-input v-model="scope.row.scorce" />
          </template>
        </el-table-column>
        <el-table-column label="历史" width="150">
          <template v-slot="scope">
            <el-input v-model="scope.row.scorce" />
          </template>
        </el-table-column>
        <el-table-column label="地理" width="150">
          <template v-slot="scope">
            <el-input v-model="scope.row.scorce" />
          </template>
        </el-table-column>
        <el-table-column label="物理" width="150">
          <template v-slot="scope">
            <el-input v-model="scope.row.scorce" />
          </template>
        </el-table-column>
        <el-table-column label="化学" width="150">
          <template v-slot="scope">
            <el-input v-model="scope.row.scorce" />
          </template>
        </el-table-column>
        <el-table-column label="生物" width="150">
          <template v-slot="scope">
            <el-input v-model="scope.row.scorce" />
          </template>
        </el-table-column>

        <el-table-column label="考试时间" prop="time" />
      </el-table>
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
import { object, classOp, gradeOp, examinationOp } from '@/views/admin/util.js'
export default {
  components: {},
  data() {
    return {
      object,
      classOp,
      gradeOp,
      examinationOp,
      mode: 'Edd',
      pagination: {
        current: 1,
        size: 1,
        total: ''
      },

      form: {
        grade: '',
        class: '',
        studentId: '',
        username: '',
        time: ''
      },
      rules: {
        time: [{ required: true, message: '请选择考试日期', trigger: 'blur' }],
        class: [{ required: true, message: '请选择班级', trigger: 'blur' }]
      },
      subjectlist: [],
      companylist: [],
      list: [
        {
          grade: '七年级',
          time: '2023-12-12',
          class: '一班',
          username: '张三',
          candidateNumber: '20221212'
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
      this.pagination.current = 1
      this.getlist()
    },
    // 清除
    clear() {
      this.$refs.formCom.resetFields()
      this.search()
    },
    // 新增
    add() {
      this.mode.value = 'add'
    },
    // 表格中的编辑状态
    editstatus(id) {
      // editstatus({ id }).then(() => {
      //   $message.success('修改成功')
      //   getlist()
      // })
    },
    // 删除
    del(id) {
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
    },
    // 编辑
    edit(id) {
      // one({ id }).then((res) => {
      //   console.log(res.data.data)
      //   let item = res.data.data
      //   item.select_options = item.options
      //   item.multiple_select_answer = item.multiple_select_answer.split(',')
      //   item.city = item.city.split(',')
      //   mode.value = 'edit'
      // })
    }

    // list({ limit: 1000 }).then((res) => {
    //   // console.log(res)
    //   subjectlist = res.data.data.items
    // })
    // userlist({ limit: 1000 }).then((res) => {
    //   //huo获取企业列表,  渲染到筛选表单中
    //   // console.log(res)
    //   companylist = res.data.data.items
    // })

    // 进入页面获取题库列表渲染表格
  }
}
</script>

<style lang="scss">
.question {
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
