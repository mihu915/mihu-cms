<template>
  <div class="content-page">
    <mh-table
      :title="title"
      :tableConfig="contentConfig"
      :tableData="tableData"
      @handleCreate="handleCreate"
    >
      <template #actionBtn="scope">
        <el-button @click="handleEdit(scope.row)" type="text"
          ><i class="el-icon-edit"></i> 编辑</el-button
        >
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

      <template #typeTag="scope">
        <span v-if="scope.row.type === 1">父菜单</span>
        <span v-else-if="scope.row.type === 2">子菜单</span>
      </template>

      <template #[otherSlotName]="scope">
        <slot :row="scope.row"></slot>
      </template>
    </mh-table>

    <div class="dialog" v-if="dialogConfig">
      <form-dialog
        v-model="showDialog"
        :type="dialogType"
        :pageName="pageName"
        :dialogConfig="dialogConfig"
        :title="dialogTitle"
        :editData="editData"
      ></form-dialog>
    </div>
  </div>
</template>

<script lang="ts">
import MhTable from '@/base-ui/mh-table'
import FormDialog from '@/components/form-dialog'

import { computed, defineComponent, ref } from 'vue'
import { useStore } from '@/store/index'
import { ElMessageBox } from 'element-plus'
export default defineComponent({
  props: {
    otherSlotName: {
      type: String
    },
    title: {
      type: String,
      default: ''
    },

    dialogConfig: {
      type: Object
    },

    contentConfig: {
      type: Object
    },

    pageName: {
      type: String
    }
  },
  components: {
    FormDialog,
    MhTable
  },
  emits: ['handleEdit', 'handleDelete', 'handleCreate'],
  setup(props) {
    console.log(props.dialogConfig)
    const store = useStore()
    const showDialog = ref(false)
    const dialogTitle = ref('')
    const dialogType = ref<'new' | 'edit'>('new')
    const editData = ref({})

    // 拿到响应式数据
    const tableData = computed(() => store.getters['system/getPageListData'](props.pageName))
    console.log('[ tableData ]-77', tableData)

    // 打开确认对话框方法
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

    // 打开对话框，新建数据
    const handleCreate = () => {
      showDialog.value = true
      dialogType.value = 'new'
      switch (props.pageName) {
        case 'menu':
          dialogTitle.value = '新建菜单'
          break
      }
    }

    // 编辑按钮
    const handleEdit = (row: any) => {
      showDialog.value = true
      dialogType.value = 'edit'
      editData.value = row
      switch (props.pageName) {
        case 'menu':
          dialogTitle.value = '编辑菜单'
          break
      }
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
      dialogType,
      tableData,
      showDialog,
      dialogTitle,
      editData,
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
</style>
