<template>
  <div style="padding-left: 15px">
    <el-card>
      <el-form ref="formCom" :model="form">
        <el-row>
          <el-col :span="4" class="mr16">
            <el-form-item label="用户手机号" prop="phone">
              <el-input v-model="form.phone" class="input" />
            </el-form-item>
          </el-col>
          <el-col :span="4" class="mr16">
            <el-form-item label="用户邮箱" prop="email">
              <el-input v-model="form.email" class="input" />
            </el-form-item>
          </el-col>
          <el-col :span="4" class="mr16">
            <el-form-item label="用户昵称" prop="username">
              <el-input v-model="form.username" class="input" />
            </el-form-item>
          </el-col>
          <el-col :span="4" class="mr16">
            <el-form-item label="用户角色" prop="right">
              <el-select v-model="form.right" placeholder="请选择用户角色">
                <el-option
                  v-for="item in rightOp"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="margin-left: 64px">
            <el-form-item>
              <el-button type="primary" @click="search">搜索</el-button>
              <el-button @click="clear">清空搜索条件</el-button>
              <el-button type="primary" @click="add">新增用户</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card v-if="userlist" class="table">
      <el-table :data="userlist" style="width: 100%">
        <el-table-column prop="phone" label="用户手机号" width="150">
          <template v-slot="scope">
            <div v-if="editObject.index == scope.$index">
              <el-input v-model="editObject.phone" />
            </div>
            <div v-else>{{ scope.row.phone }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="email" label="用户邮箱" width="200">
          <template v-slot="scope">
            <div v-if="editObject.index == scope.$index">
              <el-input v-model="editObject.email" />
            </div>
            <div v-else>{{ scope.row.email }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="userName" label="用户昵称" width="150">
          <template v-slot="scope">
            <div v-if="editObject.index == scope.$index">
              <el-input v-model="editObject.userName" />
            </div>
            <div v-else>{{ scope.row.userName }}</div>
          </template>
        </el-table-column>

        <el-table-column prop="coser" label="用户角色" width="260">
          <template v-slot="scope">
            <div v-if="editObject.index == scope.$index">
              <el-select
                v-model="editObject.coser"
                placeholder="请配置用户角色"
              >
                <el-option
                  v-for="item in rightOp"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
            <div v-else>{{ scope.row.coser }}</div>
          </template>
        </el-table-column>

        <el-table-column prop="right" label="用户权限" width="260">
          <template v-slot="scope">
            <div v-if="editObject.index == scope.$index">
              <el-select
                v-model="editObject.right"
                placeholder="请配置用户权限"
              >
                <el-option
                  v-for="item in rightOp"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
            <div v-else>{{ scope.row.right }}</div>
          </template>
        </el-table-column>

        <el-table-column prop="passWord" label="用户密码" width="150">
          <template v-slot="scope">
            <div v-if="editObject.index == scope.$index">
              <el-input v-model="editObject.passWord" />
            </div>
            <div v-else>{{ scope.row.passWord }}</div>
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
import { rightOp } from '@/views/admin/util.js'
const listItem = {
  phone: '15589098907',
  email: '123@qq.com',
  userName: '笑笑老师',
  coser: '老师',
  right: '老师',
  passWord: '123456'
}
export default {
  components: {},
  data() {
    return {
      rightOp,
      addFlag: false,
      editObject: {},
      pagination: {
        currentPage: 1,
        size: 5,
        total: 0
      },
      form: {
        right: '',
        phone: '',
        username: '',
        email: ''
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
        phone: '',
        email: '',
        userName: '',
        coser: '',
        right: '',
        passWord: ''
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
    del(id) {
      // $confirm('确认删除?', '温馨提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning'
      // }).then(() => {
      //   del({ id }).then(() => {
      //     $message({
      //       type: 'success',
      //       message: '删除成功!'
      //     })
      // 如果删除的是最后一条数据,判断当前页是否还有数据,没有的则请求前一页的数据,
      // 或者直接调用search接口让它返回第一页
      const sumcurrent = Math.ceil(
        (this.pagination.total - 1) / this.pagination.size
      )

      if (this.pagination.currentPage > sumcurrent) {
        --this.pagination.currentPage
      }
      this.getuserlist()
    },

    // 修改功能| 保存
    edit(data) {
      if (this.editObject.index === data.$index) {
        if (
          !this.editObject.phone ||
          !this.editObject.passWord ||
          !this.editObject.studentName ||
          !this.editObject.coser
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
