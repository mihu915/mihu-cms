<template>
  <div class="content-page">
    <mh-table
      :title="title"
      :pageSize="pageSize"
      v-model:currentPage="currentPage"
      v-model:pageSize="pageSize"
      :currentPage="currentPage"
      :tableConfig="contentConfig"
      :tableData="tableData.list"
      :totalCount="tableData.total_count"
      :showFooter="contentConfig.showFooter"
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
          {{ scope.row.enable ? '启用' : '禁用' }}
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
  </div>
</template>

<script lang="ts">
import { emitter } from '@/utils'

import MhTable from '@/base-ui/mh-table'

import { computed, defineComponent, ref, watch } from 'vue'
import { useStore } from '@/store/index'
import { ElMessageBox } from 'element-plus'
export default defineComponent({
  props: {
    title: {
      type: String,
      default: ''
    },
    contentConfig: {
      type: Object,
      default: () => ({})
    },
    pageName: {
      type: String,
      required: true
    },
    prefix: {
      type: String,
      default: ''
    }
  },
  components: {
    MhTable
  },

  emits: ['handleEdit', 'handleCreate'],
  setup(props, { emit }) {
    const store = useStore()
    const currentPage = ref(1)
    const pageSize = ref(10)
    const searchCondition = ref({})

    // 每次加载组件先清除之前所有的总线事件
    emitter.all.clear()

    // 请求数据
    getPageListData()

    // 监听pageSize改变则发送请求
    watch(pageSize, () => {
      getPageListData(searchCondition.value)
    })

    // 监听currentPage改变则发送请求
    watch(currentPage, () => {
      getPageListData(searchCondition.value)
    })

    // 监听总线事件
    emitter.on('updateBus', (data: any) => {
      if (data) {
        searchCondition.value = { ...data }
      } else {
        searchCondition.value = {}
      }

      getPageListData(data)
    })

    // 点击新建按钮
    const handleCreate = () => {
      emit('handleCreate', props.pageName)
    }

    // 点击编辑按钮
    const handleEdit = (row: any) => {
      emit('handleEdit', row, props.pageName)
    }

    // 定义请求contentPage数据方法
    function getPageListData(params?: any) {
      // 如果没开table-footer则传默认偏移和总条数
      let range = {
        offset: 0,
        limit: 100
      }
      if (props.contentConfig?.showFooter === undefined || props.contentConfig?.showFooter) {
        range = {
          offset: (currentPage.value - 1) * pageSize.value,
          limit: pageSize.value * currentPage.value
        }
      }

      store.dispatch('common/pageListDataAction', {
        pageName: props.pageName,
        prefix: props.prefix,
        queryInfo: {
          ...range,
          ...params
        }
      })
    }

    // 拿到响应式数据
    const tableData = computed(() =>
      store.getters['common/getPageListData'](props.pageName, props.prefix)
    )

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

    // 点击删除按钮
    const handleDelete = (row: any) => {
      openBox()
        .then(() => {
          store
            .dispatch('common/deleteListData', {
              id: row.id,
              prefix: props.prefix,
              pageName: props.pageName
            })
            .then(() => {
              getPageListData()
            })
            .catch((err) => {
              return err
            })
        })
        .catch(() => {
          return
        })
    }

    // 处理启用/禁用
    const handleEnable = (row: any) => {
      store
        .dispatch('common/switchEnable', {
          ...row,
          prefix: props.prefix,
          pageName: props.pageName
        })
        .then((res) => {
          row.enable = res
          getPageListData()
        })
        .catch((err) => {
          return err
        })
    }

    // listData数据发生变化发送请求更新数据
    const listDataUpdate = () => {
      getPageListData()
    }

    return {
      currentPage,
      pageSize,
      tableData,
      otherSlotName,
      listDataUpdate,
      handleDelete,
      handleEnable,
      handleCreate,
      handleEdit
    }
  }
})
</script>

<style scoped></style>
