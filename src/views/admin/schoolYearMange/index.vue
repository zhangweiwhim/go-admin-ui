<template>
  <div class="educationPlan" style="padding-left: 15px">
    <div class="object">
      <el-card>
        <el-form ref="subFormCom" :model="subForm" label-width="100px">
          <el-row> 学科管理 </el-row>
          <el-row>
            <el-col :span="3" />
            <el-col :span="15">
              <el-form-item label="学科名称" prop="objectName">
                <el-input
                  v-model="subForm.objectName"
                  placeholder="请输入科目名称"
                />
              </el-form-item>
            </el-col>

            <el-col :span="3">
              <el-form-item label-width="10px">
                <el-button
                  type="primary"
                  :disabled="!subForm.objectName"
                  @click="enterSubject"
                >录入学科</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>

        <div v-if="subList" class="table">
          <el-table :data="subList" style="width: 100%" class="table">
            <el-table-column prop="objectName" label="学科名称" width="300">
              <template v-slot="scope">
                <div v-if="editSubject.index == scope.$index">
                  <el-input
                    v-model="editSubject.objectName"
                    placeholder="请输入学科名称"
                  />
                </div>
                <div v-else>{{ scope.row.objectName }}</div>
              </template>
            </el-table-column>

            <el-table-column label="操作">
              <template v-slot="scope">
                <el-button type="primary" link @click="editSub(scope)">{{
                  editSubject.index == scope.$index ? "保存" : "编辑"
                }}</el-button>
                <el-button
                  v-if="editSubject.index == scope.$index"
                  link
                  @click="cancelSub"
                >取消</el-button>
                <el-button
                  type="primary"
                  link
                  @click="deletSub(scope.$index)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 页码 -->
          <el-pagination
            v-if="subPage.total"
            class="pagination"
            :current-page="subPage.current"
            :page-sizes="[1, 5, 10, 20, 30, 40]"
            :page-size="subPage.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="subPage.total"
            @size-change="sizeChange"
            @current-change="currentChange"
          />
        </div>
      </el-card>
    </div>
    <div class="year" style="margin-left: 15px">
      <el-card>
        <el-form ref="formCom" :model="form" label-width="100px" :rules="rules">
          <el-row> 学年管理 </el-row>
          <el-row>
            <el-col :span="3" />
            <el-col :span="5">
              <el-form-item label="开始时间" prop="starTime">
                <el-date-picker
                  v-model="form.starTime"
                  type="date"
                  placeholder="选择日期"
                  size="default"
                />
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="结束时间" prop="endTime">
                <el-date-picker
                  v-model="form.endTime"
                  type="date"
                  placeholder="选择日期"
                  size="default"
                />
              </el-form-item>
            </el-col>

            <el-col :span="5">
              <el-form-item label="学期名称" prop="scoolName">
                <el-input v-model="form.scoolName" />
              </el-form-item>
            </el-col>

            <el-col :span="5">
              <el-form-item label-width="10px">
                <el-button
                  type="primary"
                  :disabled="!form.starTime || !form.endTime || !form.scoolName"
                  @click="add"
                >录入</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>

        <div v-if="list" class="table">
          <el-table :data="list" style="width: 100%" class="table">
            <el-table-column prop="starTime" label="开始时间" width="300">
              <template v-slot="scope">
                <div v-if="editObject.index == scope.$index">
                  <el-input v-model="editObject.starTime" />
                </div>
                <div v-else>{{ scope.row.starTime }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="endTime" label="结束时间" width="300">
              <template v-slot="scope">
                <div v-if="editObject.index == scope.$index">
                  <el-input v-model="editObject.endTime" />
                </div>
                <div v-else>{{ scope.row.endTime }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="scoolName" label="学期名称" width="300">
              <template v-slot="scope">
                <div v-if="editObject.index == scope.$index">
                  <el-input v-model="editObject.scoolName" />
                </div>
                <div v-else>{{ scope.row.scoolName }}</div>
              </template>
            </el-table-column>

            <el-table-column label="操作">
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
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import * as dayjs from 'dayjs'
import {
  object,
  classOp,
  gradeOp,
  examinationOp,
  semesterOp
} from '@/views/admin/util.js'
export default {
  components: {},
  data() {
    return {
      dayjs,
      object,
      classOp,
      gradeOp,
      examinationOp,
      semesterOp,
      editSubject: {},
      subPage: {
        current: 1,
        size: 1,
        total: ''
      },

      subForm: {
        objectName: ''
      },

      subList: [
        {
          objectName: '语文'
        }
      ], // 题库列表数

      editObject: {},
      pagination: {
        current: 1,
        size: 1,
        total: ''
      },
      rules: {
        starTime: [
          { required: true, message: '请选择学期开始时间', trigger: 'blur' }
        ],
        endTime: [
          { required: true, message: '请选择学期结束时间', trigger: 'blur' }
        ],
        scoolName: [
          { required: true, message: '请输入学期名称', trigger: 'blur' }
        ]
      },
      form: {
        starTime: '',
        endTime: '',
        scoolName: ''
      },

      list: [
        {
          starTime: '2022-1-15',
          endTime: '2022-6-17',
          scoolName: '2022年第一学期'
        }
      ] // 题库列表数
    }
  },

  created() {
    this.getsubList()
    this.getlist()
  },
  methods: {
    // fengzhuan封装 获取题库列表
    getsubList() {
      // const param = {
      //   ...this.subForm,
      //   page: this.subPage.current,
      //   limit: this.subPage.size,
      // };
    },
    sizeChange(page) {
      this.subPage.size = page
      this.subPage.current = 1
      this.getsubList()
    },
    currentChange(page) {
      this.subPage.current = page
      this.getsubList()
    },
    // 清除
    clearSub() {
      this.$refs.subFormCom.resetFields()
    },
    cancelSub() {
      this.editSubject = {}
    },

    enterSubject() {
      this.subList.push({
        objectName: this.subForm.objectName
      })
      this.clearSub()
    },
    // 修改功能| 保存
    editSub(data) {
      if (this.editSubject.index === data.$index) {
        if (!this.editSubject.objectName) {
          return
        }
        // 保存
        this.subList.splice(
          Number(this.editSubject.index),
          1,
          JSON.parse(JSON.stringify(this.editSubject))
        )
        this.editSubject = {}
      } else {
        const lastItem = this.subList[this.subList.length - 1]
        if (lastItem && !lastItem.objectName) {
          this.subList.pop()
        }
        // 修改
        this.editSubject = JSON.parse(JSON.stringify(data.row))
        this.editSubject.index = data.$index
      }
    },

    deletSub(id) {},

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
      if (!this.form.starTime && !this.form.endTime && !this.form.scoolName) {
        return
      }
      this.pagination.current = 1
      this.getlist()
    },
    // 清除
    clear() {
      this.$refs.formCom.resetFields()
    },
    cancel() {
      this.editObject = {}
    },
    // 新增学期
    add() {
      this.list.push({
        starTime: dayjs(this.form.starTime).format('YYYY-MM-DD'),
        endTime: dayjs(this.form.endTime).format('YYYY-MM-DD'),
        scoolName: this.form.scoolName
      })
      this.clear()
    },
    // 修改功能| 保存
    edit(data) {
      if (this.editObject.index === data.$index) {
        if (
          !this.editObject.starTime &&
          !this.editObject.endTime &&
          !this.editObject.scoolName
        ) {
          return
        }
        // 保存
        this.list.splice(
          Number(this.editObject.index),
          1,
          JSON.parse(JSON.stringify(this.editObject))
        )
        this.editObject = {}
      } else {
        const lastItem = this.list[this.list.length - 1]
        if (
          lastItem &&
          (!lastItem.starTime || !lastItem.endTime || !lastItem.scoolName)
        ) {
          this.list.pop()
        }
        // 修改
        this.editObject = JSON.parse(JSON.stringify(data.row))
        this.editObject.index = data.$index
      }
    },

    delet(id) {
      // $confirm('认删除?', '提示', {
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

<style lang="scss" scoped>
.educationPlan {
  display: flex;
  .object {
    width: 30%;
  }
  .year {
    flex: 1;
  }
  .table {
    margin-top: 20px;
    ::v-deep th {
      background-color: #f5f7fa;
      border-top: 1px solid #ebeef5;
    }
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
