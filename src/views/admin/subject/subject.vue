<template>
  <div style="padding-left: 15px">
    <el-card>
      <el-form ref="formCom" :model="form" label-width="100px">
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
            <el-form-item label="学期" prop="semester">
              <el-select v-model="form.semester" placeholder="请选择学期">
                <el-option
                  v-for="item in semesterOp"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="教师名称" prop="teacherName">
              <el-input v-model="form.teacherName" />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="学科名称" prop="objectName">
              <el-select v-model="form.objectName" placeholder="请选择班级">
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
              <el-button type="primary" @click="add">+新增教师</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>

    <el-card v-if="list" class="table">
      <el-table :data="list" style="width: 100%" class="table">
        <el-table-column prop="teachGrade" label="任教年级" width="150">
          <template v-slot="scope">
            <div v-if="editObject.index == scope.$index">
              <el-input v-model="editObject.teachGrade" />
            </div>
            <div v-else>{{ scope.row.teachGrade }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="teachClass" label="任教班级" width="150">
          <template v-slot="scope">
            <div v-if="editObject.index == scope.$index">
              <el-input v-model="editObject.teachClass" />
            </div>
            <div v-else>{{ scope.row.teachClass }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="objectName" label="任教学科" width="150">
          <template v-slot="scope">
            <div v-if="editObject.index == scope.$index">
              <el-input v-model="editObject.objectName" />
            </div>
            <div v-else>{{ scope.row.objectName }}</div>
          </template>
        </el-table-column>

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

        <el-table-column prop="semester" label="任教学期" width="260">
          <template v-slot="scope">
            <div v-if="editObject.index == scope.$index">
              <el-input v-model="editObject.semester" />
            </div>
            <div v-else>{{ scope.row.semester }}</div>
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
    </el-card>
  </div>
</template>

<script>
import { object, classOp, gradeOp, semesterOp } from '@/views/admin/util.js'
// import { list, editstatus, delet } from '@/api/subject.js'

const listItem = {
  teacherName: '张晓娟',
  teacherNumber: '800987',
  objectName: '英语',
  teachClass: '二班',
  teachGrade: '七年级',
  semester: '2022-2023第一学期'
}
export default {
  data() {
    return {
      object,
      classOp,
      gradeOp,
      semesterOp,
      addFlag: false,
      editObject: {},
      form: {
        semester: '',
        grade: '',
        class: '',
        objectName: '',
        teacherName: ''
      },
      pagination: {
        current: 1,
        size: 1,
        total: ''
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
        teacherName: '',
        teacherNumber: '',
        objectName: '',
        teachClass: '',
        teachGrade: '',
        semester: ''
      })

      this.editObject = {
        teacherName: '',
        teacherNumber: '',
        objectName: '',
        teachClass: '',
        teachGrade: '',
        semester: '',
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
        if (
          !this.editObject.teacherName ||
          !this.editObject.teacherNumber ||
          !this.editObject.objectName ||
          !this.editObject.teachClass
        ) { return }
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
    delet(id) {},
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
