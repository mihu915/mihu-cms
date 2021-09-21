<template>
  <div class="mh-vditor-preview">
    <div class="test">
      <div
        v-for="(anchor, index) in titles"
        :style="{ padding: `10px 0 10px ${anchor.indent * 20}px` }"
        :key="index"
        @click="handleAnchorClick(anchor)"
      >
        <a style="cursor: pointer">{{ anchor.title }}</a>
      </div>
    </div>

    <v-md-preview :text="markdown" ref="previewRef" class="preview"></v-md-preview>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch, nextTick, watchEffect } from 'vue'

export default defineComponent({
  props: {},
  setup(props) {
    const previewRef: any = ref<HTMLDivElement>()
    const markdown = ref('')
    const titles = ref<any[]>([])
    const anchors = ref()

    const handleAnchorClick = (anchor: any) => {
      const { lineIndex } = anchor

      const heading = previewRef.value!.$el.querySelector(`[data-v-md-line="${lineIndex}"]`)

      if (heading) {
        previewRef.value!.scrollToTarget({
          target: heading,
          scrollContainer: window,
          top: 0
        })
      }
    }

    const testPreview = async () => {
      await nextTick(() => {
        anchors.value = previewRef.value!.$el.querySelectorAll('h1,h2,h3,h4,h5,h6')

        const titleArray = Array.from(anchors.value).filter(
          (title: any) => !!title.innerText.trim()
        )
        console.log(titleArray)
        if (!titleArray.length) {
          titles.value = []
          return
        }

        const hTags = Array.from(new Set(titleArray.map((title: any) => title.tagName))).sort()

        titles.value = titleArray.map((el: any) => ({
          title: el.innerText,
          lineIndex: el.getAttribute('data-v-md-line'),
          indent: hTags.indexOf(el.tagName)
        }))
      })
    }

    onMounted(async () => {
      testPreview()

      console.log(previewRef.value.$el)

      markdown.value = `# 教程

这是一篇讲解如何正确使用 **Markdown** 的排版示例

# 语法指导

## 普通内容

这段内容展示了在内容里面一些排版格式

## 提及用户

@Vanessa 通过 @User 可以在内容中提及用户，被提及的用户将会收到系统通知。

## 表情符号 Emoji

支持大部分标准的表情符号，可使用输入法直接输入，也可手动输入字符格式。

### 一些表情例子

# test
123123
123


123123

123123

# 语法指导adasdasd

# 语法指导456456456

asdhiasdh


# werwerwer
`
      testPreview()
    })
    return {
      markdown,
      previewRef,
      titles,
      handleAnchorClick
    }
  }
})
</script>

<style scoped>
.mh-vditor-preview {
  display: flex;
}
.test {
  width: 200px;
  height: 100%;
  display: block;
  position: fixed;
  top: 0;
}
.preview {
  margin-left: 200px;
}
</style>
