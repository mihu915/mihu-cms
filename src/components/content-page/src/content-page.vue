<template>
  <div class="content-page">
    <div class="content-header">
      <div class="title">{{ title }}</div>
      <div class="header-btn">
        <el-button size="mini" @click="handleCreate" type="primary">新建</el-button>
      </div>
    </div>

    <mh-table :tableConfig="contentConfig" :tableData="tableData">
      <template #actionBtn="scope">
        <el-button @click="handleEdit" type="text"><i class="el-icon-edit"></i> 编辑</el-button>
        <el-button @click="handleDelete(scope.row)" type="text"
          ><i class="el-icon-delete"></i> 删除</el-button
        >
      </template>

      <template #statusBtn="scope">
        <el-button
          @click="handleStatus"
          :type="scope.row.enable ? 'success' : 'danger'"
          plain
          size="mini"
          >{{ scope.row.enable ? '开启' : '禁用' }}</el-button
        >
      </template>
    </mh-table>

    <div class="content-footer"></div>
  </div>
</template>

<script lang="ts">
import MhTable from '@/base-ui/mh-table'

import { computed, defineComponent } from 'vue'
import { useStore } from '@/store/index'
import { ElMessageBox } from 'element-plus'
export default defineComponent({
  props: {
    title: {
      type: String,
      default: ''
    },
    contentConfig: {
      type: Object
    },
    pageName: {
      type: String
    }
  },
  components: {
    MhTable
  },
  emits: ['handleEdit', 'handleDelete', 'handleCreate'],
  setup(props, { emit }) {
    const store = useStore()

    // 打开确认对话框
    const openBox = () => {
      return ElMessageBox.confirm('将删除该条数据，是否确认？', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
    }

    // 请求contentPage数据
    store.dispatch('system/pageListDataAction', {
      pageName: props.pageName
    })

    // 创建数据
    const handleCreate = () => {
      emit('handleCreate')
    }
    // 拿到响应式数据
    const tableData = computed(() => store.getters['system/getPageListData'](props.pageName))

    // 编辑按钮
    const handleEdit = () => {
      emit('handleEdit')
    }

    // 点击删除按钮
    const handleDelete = (row: any) => {
      openBox()
        .then(() => {
          store.dispatch('system/deleteListData', {
            id: row.id,
            pageName: props.pageName
          })
        })
        .catch(() => {
          return
        })
    }

    // 切换用户状态
    const handleStatus = () => {
      console.log('切换状态')
    }

    return {
      tableData,
      handleEdit,
      handleDelete,
      handleStatus,
      handleCreate
    }
  }
})
</script>

<style scoped>
.content-page {
  padding: 20px;
  background-color: #fff;
  border-radius: 5px;
  overflow: hidden;
}
.content-header {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  font-size: 20px;
  align-items: center;
  line-height: 40px;
  margin-bottom: 10px;
}
</style>
