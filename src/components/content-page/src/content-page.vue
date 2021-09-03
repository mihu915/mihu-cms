<template>
  <div class="content-page">
    <mh-table :tableConfig="contentConfig" :tableData="tableData"></mh-table>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import MhTable from '@/base-ui/mh-table'
import { useStore } from '@/store/index'
export default defineComponent({
  props: {
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
  setup(props) {
    const store = useStore()
    store.dispatch('system/pageListDataAction', {
      url: `/${props.pageName}/list`
    })

    const tableData = computed(() => store.getters['system/getPageListData'](props.pageName))

    return {
      tableData
    }
  }
})
</script>

<style scoped></style>
