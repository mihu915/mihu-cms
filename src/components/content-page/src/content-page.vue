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
          @click="handleEnable(scope.row)"
          :type="scope.row.enable ? 'success' : 'danger'"
          plain
          size="mini"
        >
          {{ scope.row.enable ? '开启' : '禁用' }}
        </el-button>
      </template>

      <template #typeTag="scope">
        <span v-if="scope.row.type === 1">父级菜单</span>
        <span v-else-if="scope.row.type === 2">子菜单</span>
      </template>

      <!-- 创建时间 -->
      <template #created="scope">
        <span v-if="scope.row.created">
          {{ $filters.formatTime(scope.row.created) }}
        </span>
        <span v-else>—</span>
      </template>

      <!-- 更新时间 -->
      <template #updated="scope">
        <span v-if="scope.row.updated">
          {{ $filters.formatTime(scope.row.updated) }}
        </span>
        <span v-else>—</span>
      </template>

      <!-- 最后登录时间 -->
      <template #lastLoginTime="scope">
        <span v-if="scope.row.last_login_time">
          {{ $filters.formatTime(scope.row.last_login_time) }}
        </span>
        <span v-else>—</span>
      </template>

      <!-- 最近操作时间 -->
      <template #operatorTime="scope">
        <span v-if="scope.row.operator_time">
          {{ $filters.formatTime(scope.row.operator_time) }}
        </span>
        <span v-else>—</span>
      </template>

      <!-- 动态插入其他自定义插槽 -->
      <template v-for="item of otherSlotName" :key="item.prop" #[item.slotName]="scope">
        <template v-if="item.slotName">
          <slot :row="scope.row" :name="item.slotName"></slot>
        </template>
      </template>
    </mh-table>

    <div class="dialog" v-if="dialogConfig">
      <form-dialog
        :dialogWidth="dialogWidth"
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
    dialogWidth: {
      type: Number
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
      type: String,
      required: true
    }
  },
  components: {
    FormDialog,
    MhTable
  },
  emits: ['handleEdit', 'handleDelete', 'handleCreate'],
  setup(props) {
    const store = useStore()
    const showDialog = ref(false)
    const dialogTitle = ref('')
    const dialogType = ref<'new' | 'edit'>('new')
    const editData = ref({})

    // 拿到响应式数据
    const tableData = computed(() => store.getters['system/getPageListData'](props.pageName))

    // 加载排除在外的其他slot（插槽）
    const otherSlotName = props.contentConfig?.propList.filter((item: any) => {
      const excludeSlot = [
        'statusBtn',
        'actionBtn',
        'typeTag',
        'created',
        'updated',
        'lastLoginTime',
        'operatorTime'
      ]
      if (excludeSlot.includes(item.slotName)) return false

      return true
    })

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
    const handleEnable = (row: any) => {
      store
        .dispatch('system/switchUserEnable', row)
        .then((res) => {
          row.enable = res
        })
        .catch((err) => {
          return err
        })
    }

    return {
      dialogType,
      tableData,
      showDialog,
      dialogTitle,
      editData,
      otherSlotName,
      handleEdit,
      handleDelete,
      handleEnable,
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
