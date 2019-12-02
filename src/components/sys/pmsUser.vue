<template>
  <div>
    <div style="margin-bottom: 20px;display:flex;align-items: center;">
      <el-form label-width="80px" style="height: 38px;margin-right: 20px;">
        <el-form-item label="手机号：" class="iptHeight">
          <el-input v-model="phone"></el-input>
        </el-form-item>
      </el-form>
      <el-button
        type="primary"
        icon="el-icon-search"
        size="mini"
        @click="search"
        >查询</el-button
      >
      <el-button icon="el-icon-refresh" size="mini" @click="reset"
        >重置</el-button
      >
      <el-button
        type="primary"
        icon="el-icon-circle-plus-outline"
        size="mini"
        @click="addUserShow"
        >添加</el-button
      >
    </div>
    <template>
      <el-table
        class="listTable"
        :data="pmsUser.list"
        border
        style="width: 100%;"
      >
        <el-table-column
          type="index"
          label="序号"
          width="50"
          min-width="50"
        ></el-table-column>
        <el-table-column
          prop="mobile"
          label="手机号"
          width="150"
          min-width="100"
        ></el-table-column>
        <el-table-column
          prop="realName"
          label="名称"
          width="150"
          min-width="100"
        ></el-table-column>
        <el-table-column
          prop="sort"
          label="排序"
          width="150"
          min-width="100"
        ></el-table-column>
        <el-table-column
          prop="statusId"
          label="状态"
          width="150"
          min-width="100"
        >
          <template slot-scope="scope">
            <el-switch
              style="display: block"
              v-model="scope.row.statusId"
              :active-value="0"
              :inactive-value="1"
              @change="open(scope.row)"
              active-color="#ff4949"
              inactive-color="#13ce66"
              active-text="禁用"
              inactive-text="正常"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注"
          width="150"
        ></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="danger" size="mini" @click="del(scope.row)"
              >删除</el-button
            >
            <el-button type="success" size="mini">修改</el-button>
            <el-button type="primary" size="mini">设置角色</el-button>
            <el-button type="success" size="mini">密码修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <div class="block" style="text-align: right;margin-top:20px">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pmsUser.pageCurrent"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pmsUser.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pmsUser.totalCount"
      ></el-pagination>
    </div>
    <!-- 选择用户模态框 -->
    <el-dialog
      class="diaList"
      title="用户列表"
      :visible.sync="addDialog"
      :modal-append-to-body="false"
    >
      <div style="margin: 20px;margin-left: 0;display: flex;">
        <el-form label-width="80px" style="height: 38px;">
          <el-form-item label="手机号：">
            <el-input v-model="addUserPhone"></el-input>
          </el-form-item>
        </el-form>
        <el-button
          style="margin-left: 20px;"
          type="primary"
          size="mini"
          @click="addSearch"
          >查询</el-button
        >
        <el-button size="mini" @click="addReset">重置</el-button>
      </div>
      <template>
        <el-table :data="addUserList.list" border style="width: 100%;">
          <el-table-column
            type="index"
            label="序号"
            width="80"
            min-width="150"
          ></el-table-column>
          <el-table-column
            prop="mobile"
            label="电话"
            min-width="100"
          ></el-table-column>
          <el-table-column
            prop="userNo"
            label="用户编号"
            min-width="100"
          ></el-table-column>
          <el-table-column
            prop="gmtCreate"
            label="注册时间"
            min-width="100"
          ></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="success" size="mini" @click="choose(scope.row)"
                >选择</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </template>
      <div class="block" style="text-align: right;margin-top:20px">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pmsUser.pageCurrent"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pmsUser.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pmsUser.totalCount"
        ></el-pagination>
      </div>
    </el-dialog>
    <!-- 添加模态框 -->
    <el-dialog
      title="添加用户"
      :visible.sync="dialogFormVisible"
      :modal-append-to-body="false"
      class="addDlog"
    >
      <el-form :model="form">
        <el-form-item label="手机" :label-width="formLabelWidth" class="must">
          <el-input
            placeholder="请选择手机号"
            v-model="choosePhone.mobile"
            readonly
            class="input-with-select"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="addDialoShow"
            ></el-button>
          </el-input>
        </el-form-item>
        <el-form-item label="名称" :label-width="formLabelWidth" class="must">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="form.remark"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { SysList, SysUserList, SetUser, addUserList, DelUser } from "@/api/sys";
export default {
  data() {
    return {
      // 分页器
      pageCurrent: 1,
      pageSize: 20,
      pageCurrent2: 1,
      pageSize2: 20,
      // 表格数据
      pmsUser: {},
      // 搜索手机号
      phone: "",
      dialogFormVisible: false,
      // 添加用户模态框数据
      form: {
        name: "",
        remark: ""
      },
      formLabelWidth: "60px",
      // 选择用户模态框列表
      addDialog: false,
      addUserList: [],
      addUserPhone: "",
      choosePhone: ""
    };
  },
  created() {
    // 调用获取用户管理列表
    this.getSysList();
    this.getAddSysList();
  },
  methods: {
    // 获取用户管理列表
    async getSysList() {
      let obj = { pageCurrent: this.pageCurrent, pageSize: this.pageSize };
      let res = await SysList(obj);
      if (res.code == 200) {
        this.pmsUser = res.data;
        console.log(res);
      }
    },
    // 获取用户添加列表
    async getAddSysList() {
      let obj = { pageCurrent: this.pageCurrent2, pageSize: this.pageSize2 };
      let res = await SysUserList(obj);
      if (res.code == 200) {
        console.log(res);
        this.addUserList = res.data;
      }
    },
    // 查询用户
    async search() {
      let obj = {
        pageCurrent: this.pageCurrent,
        pageSize: this.pageSize,
        mobile: this.phone
      };
      let res = await SysList(obj);
      if (res.code == 200) {
        this.pmsUser = res.data;
      }
    },
    // 查询添加用户
    async addSearch() {
      let obj = {
        pageCurrent: this.pageCurrent2,
        pageSize: this.pageSize2,
        mobile: this.addUserPhone
      };
      let res = await SysUserList(obj);
      if (res.code == 200) {
        this.addUserList = res.data;
      }
    },
    // 选择用户
    choose(item) {
      console.log(item);
      this.choosePhone = item;
      this.addDialog = false;
    },
    addReset() {
      this.addUserPhone = "";
      this.getAddSysList();
    },
    // 重置
    async reset() {
      this.phone = "";
      this.getSysList();
    },
    // 添加用户模态框显示
    addUserShow() {
      this.dialogFormVisible = true;
    },
    // 添加用户模态框内 搜索按钮点击事件
    addDialoShow() {
      this.dialogFormVisible = false;
      this.addDialog = true;
    },
    // 添加用户
    async addUser() {
      let obj = {
        adminUserNo: this.choosePhone.userNo,
        mobile: this.choosePhone.mobile,
        realName: this.form.name,
        remark: this.form.remark
      };
      let res = await addUserList(obj);
      if (res.code == 200) {
        this.dialogFormVisible = false;
        this.getSysList();
      }
    },
    // 设置用户状态的提示框
    async open(item) {
      let obj = {
        id: item.id,
        statusId: item.statusId == 1 ? "1" : "0"
      };
      this.$confirm("确定禁用吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let res = await SetUser(obj);
          if (res.code == 200) {
            this.getSysList();
            this.$message({
              type: "success",
              message: "修改成功"
            });
          } else {
            this.getSysList();
          }
        })
        .catch(() => {
          this.getSysList();
          this.$message({
            type: "info",
            message: "用户已取消"
          });
        });
    },
    // 删除用户
    async del(item) {
      this.$confirm("确定删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let obj = {
            id: item.id
          };
          let res = await DelUser(obj);
          if (res.code == 200) {
            this.getSysList();
            this.$message({
              type: "success",
              message: "删除成功"
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "用户已取消"
          });
        });
    },
    // 分页器
    handleSizeChange() {},
    handleCurrentChange() {}
  },
  computed: {
    loading() {
      return this.$store.state.loading;
    }
  },
  watch: {
    addDialog() {
      if (this.addDialog == false) {
        console.log(this.dialogFormVisible);
        this.dialogFormVisible = true;
      }
    }
  }
};
</script>

<style>
/* 列表表格样式 */
.listTable {
  min-width: 1200px !important;
}
.el-table--medium td {
  padding: 10px 0 !important;
}
/* *号 */
.must > .el-form-item__label:before {
  content: "*";
  color: #f56c6c;
  margin-right: 4px;
}
/* input的高度 */
.iptHeight .el-input__inner {
  line-height: 28px;
  height: 28px;
}
/* 添加用户模态框样式 */
.addDlog > .el-dialog {
  width: 30%;
}
/* 添加用户表格 */
.diaList > .el-dialog {
  width: 80%;
}
</style>
