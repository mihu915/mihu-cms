<template>
  <div class="technology-stack">
    <mh-card>
      <template #title>
        <div class="skill-header">技术栈：</div>
      </template>
      <template #default>
        <el-tabs class="skill-content" type="border-card" v-model="activeName">
          <el-tab-pane label="前端" name="frontEnd" class="tab-pane">
            <div class="skill-list" v-for="(item, index) of skillConfig.frontEnd" :key="index">
              <div class="skill-list-content">
                <span class="skill-item-title">{{ item.title }}：</span>
                <el-link href="javascript:;" type="primary">{{ item.desp }}</el-link>
              </div>
            </div>
          </el-tab-pane>

          <el-tab-pane label="后端" name="rearEnd" class="tab-pane">
            <div class="skill-list" v-for="(item, index) of skillConfig.rearEnd" :key="index">
              <div class="skill-list-content">
                <span class="skill-item-title">{{ item.title }}：</span>
                <el-link href="javascript:;" type="primary">{{ item.desp }}</el-link>
              </div>
            </div>
          </el-tab-pane>

          <el-tab-pane label="项目规范" name="standard" class="tab-pane">
            <el-descriptions title="文件命名规范：" direction="vertical" :column="4" border>
              <el-descriptions-item label="文件夹">
                统一小写, 多个单词使用-分割
              </el-descriptions-item>
              <el-descriptions-item label="文件(.ts .vue .json .d.ts)">
                统一小写, 多个单词使用-分割
              </el-descriptions-item>
            </el-descriptions>

            <el-divider></el-divider>

            <el-descriptions title="编写组件规范：" direction="vertical" :column="4" border>
              <template v-for="(item, index) of unitStandard" :key="index">
                <el-descriptions-item :label="item.name">
                  {{ item.description }}
                </el-descriptions-item>
              </template>
            </el-descriptions>

            <el-divider></el-divider>

            <el-descriptions title="Git提交规范：" direction="vertical" :column="4" border>
              <template v-for="(item, index) of gitStandard" :key="index">
                <el-descriptions-item :label="item.name">
                  {{ item.description }}
                </el-descriptions-item>
              </template>
            </el-descriptions>
          </el-tab-pane>

          <el-tab-pane label="开发时依赖" name="dependencies" class="tab-pane">
            <el-descriptions direction="vertical" :column="4" border>
              <template v-for="(item, index) of skillConfig.dependencies" :key="index">
                <el-descriptions-item :label="item.name">
                  <el-tag>{{ item.description }}</el-tag>
                </el-descriptions-item>
              </template>
            </el-descriptions>
          </el-tab-pane>

          <el-tab-pane label="生产时依赖" name="devDependencies" class="tab-pane">
            <el-descriptions direction="vertical" :column="4" border>
              <template v-for="(item, index) of skillConfig.devDependencies" :key="index">
                <el-descriptions-item :label="item.name">
                  <el-tag>{{ item.description }}</el-tag>
                </el-descriptions-item>
              </template>
            </el-descriptions>
          </el-tab-pane>
        </el-tabs>
      </template>
    </mh-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import MhCard from '@/base-ui/mh-card'

import * as skillConfig from '../config'

export default defineComponent({
  components: {
    MhCard
  },
  setup() {
    const activeName = ref('frontEnd')
    const unitStandard = ref([
      { name: '组件的文件', description: '统一小写, 多个单词使用-分割' },
      {
        name: '组件的目录结构',
        description: '例如 button 组件：button/src/index.vue, 统一在button/index.ts导出'
      },
      {
        name: '组件导包顺序',
        description: '导vue技术栈的包 , 导第三方的工具函数 , 导本地的组件, 导本地的工具函数'
      },
      { name: '组件的名称', description: '统一大写开头，驼峰命名' },
      { name: '组件属性顺序', description: 'name, components, props, emits, setup ...' },
      { name: 'template标签', description: '小写加 - ( 例如：<case-panel/> )' },
      {
        name: 'template标签属性顺序',
        description: 'v-if , v-for , ref, class, style, ... ,事件'
      },
      { name: '组件的props', description: '小写开头，驼峰命名，必须编写类型默认值' },
      {
        name: '组件的样式',
        description: '作用域：scoped, lang = scss / less  ; 类名：统一小写, 多个单词使用-分割'
      }
    ])
    const gitStandard = ref([
      { name: 'add 操作', description: 'git add ' },
      { name: 'commit 操作', description: 'yarn commit ' },
      { name: 'pull 操作', description: 'git pull ' },
      { name: 'push 操作', description: 'git push ' }
    ])

    return {
      skillConfig,
      activeName,
      unitStandard,
      gitStandard
    }
  }
})
</script>

<style scoped lang="less">
.skill-content {
  height: 400px;
}
.skill-list-content {
  display: flex;
  font-size: 15px;
  line-height: 26px;
  .skill-item-title {
    font-size: 16px;
    font-weight: bold;
  }
}
.tab-pane {
  overflow-y: scroll;
  height: 330px;
}
.el-descriptions {
  padding-bottom: 20px;
}
</style>
