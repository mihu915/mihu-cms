<template>
  <div class="mh-vditor-preview">
    <div class="outline">
      <div
        v-for="(anchor, index) in titles"
        :style="{ paddingLeft: `${anchor.indent * 20}px` }"
        :key="index"
        @click="handleAnchorClick(anchor)"
        class="outline-item"
      >
        <a :class="handleOutlineClassName(anchor.tagName)" class="outline-any">
          {{ anchor.title }}
        </a>
      </div>
    </div>

    <div class="preview" ref="previewRef" @scroll="handleScroll"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import Vditor from 'vditor'
import 'vditor/dist/index.css'
import { number } from 'echarts'
export default defineComponent({
  props: {
    markdownText: {
      type: String,
      default: ''
    }
  },
  setup() {
    const previewRef = ref<HTMLDivElement>()

    const markdown = ref('')
    const titles = ref<any[]>([])
    const anchors = ref()

    // 处理点击大纲
    const handleAnchorClick = (anchor: any) => {
      const { lineIndex } = anchor
      const heading = previewRef.value!.querySelector(`[id="${lineIndex}"]`)
      if (heading) {
        heading.scrollIntoView(true)
      }
    }

    // 扫描页面节点，获取锚点
    const handlePreview = () => {
      anchors.value = previewRef.value!.querySelectorAll('h1,h2')
      const titleArray = Array.from(anchors.value).filter((title: any) => !!title.innerText.trim())
      if (!titleArray.length) {
        titles.value = []
        return
      }
      console.log(titleArray)

      const hTags = Array.from(new Set(titleArray.map((title: any) => title.tagName))).sort()
      console.log(hTags)
      titles.value = titleArray.map((el: any, index: number) => {
        const titles = {
          title: el.innerText,
          lineIndex: el.getAttribute('id'),
          indent: hTags.indexOf(el.tagName),
          tagName: el.tagName
        }

        return titles
      })
    }

    // 监听预览页面的滚动
    const handleScroll = (e: any) => {
      const currentNode = scrollToTop()
    }

    // 获取锚点class属性
    const handleOutlineClassName = (tagName: string) => {
      let className = ''
      switch (tagName) {
        case 'H1':
          className = 'outline-h1'
          break
        case 'H2':
          className = 'outline-h2'
          break
      }
      return className
    }

    // 根据页面滚动改变当前大纲索引
    const scrollToTop = () => {
      const currentScrollTop = previewRef.value?.scrollTop
      const currentNode = Array.from<HTMLElement>(anchors.value).find(
        (item: HTMLElement, index: number, array) => {
          let nextIndex: number = index + 1
          if (nextIndex >= array.length) {
            nextIndex = array.length
          }
          if (currentScrollTop! < array[nextIndex].offsetTop) {
            return item
          }
        }
      )

      console.log(currentNode)
      return currentNode
    }

    onMounted(async () => {
      markdown.value = `# 教程

这是一篇讲解如何正确使用 **Markdown** 的排版示例
这是一篇讲解如何正确使用 **Markdown** 的排版示例
这是一篇讲解如何正确使用 **Markdown** 的排版示例
这是一篇讲解如何正确使用 **Markdown** 的排版示例
这是一篇讲解如何正确使用 **Markdown** 的排版示例
# 语法指导

## 普通内容

这段内容展示了在内容里面一些排版格式

## 提及用户
这是一篇讲解如何正确使用 **Markdown** 的排版示例
这是一篇讲解如何正确使用 **Markdown** 的排版示例
这是一篇讲解如何正确使用 **Markdown** 的排版示例
这是一篇讲解如何正确使用 **Markdown** 的排版示例
这是一篇讲解如何正确使用 **Markdown** 的排版示例
这是一篇讲解如何正确使用 **Markdown** 的排版示例
这是一篇讲解如何正确使用 **Markdown** 的排版示例
这是一篇讲解如何正确使用 **Markdown** 的排版示例
这是一篇讲解如何正确使用 **Markdown** 的排版示例
这是一篇讲解如何正确使用 **Markdown** 的排版示例
@Vanessa 通过 @User 可以在内容中提及用户，被提及的用户将会收到系统通知。

## 表情符号 Emoji

这是一篇讲解如何正确使用 **Markdown** 的排版示例
这是一篇讲解如何正确使用 **Markdown** 的排版示例
这是一篇讲解如何正确使用 **Markdown** 的排版示例
这是一篇讲解如何正确使用 **Markdown** 的排版示例
这是一篇讲解如何正确使用 **Markdown** 的排版示例
支持大部分标准的表情符号，可使用输入法直接输入，也可手动输入字符格式。

### 一些表情例子
这是一篇讲解如何正确使用 **Markdown** 的排版示例
这是一篇讲解如何正确使用 **Markdown** 的排版示例
这是一篇讲解如何正确使用 **Markdown** 的排版示例
这是一篇讲解如何正确使用 **Markdown** 的排版示例
这是一篇讲解如何正确使用 **Markdown** 的排版示例
这是一篇讲解如何正确使用 **Markdown** 的排版示例
这是一篇讲解如何正确使用 **Markdown** 的排版示例
这是一篇讲解如何正确使用 **Markdown** 的排版示例
这是一篇讲解如何正确使用 **Markdown** 的排版示例
这是一篇讲解如何正确使用 **Markdown** 的排版示例
# test
123123
123
这是一篇讲解如何正确使用 **Markdown** 的排版示例
这是一篇讲解如何正确使用 **Markdown** 的排版示例
这是一篇讲解如何正确使用 **Markdown** 的排版示例
这是一篇讲解如何正确使用 **Markdown** 的排版示例
这是一篇讲解如何正确使用 **Markdown** 的排版示例
这是一篇讲解如何正确使用 **Markdown** 的排版示例
这是一篇讲解如何正确使用 **Markdown** 的排版示例
这是一篇讲解如何正确使用 **Markdown** 的排版示例
这是一篇讲解如何正确使用 **Markdown** 的排版示例
这是一篇讲解如何正确使用 **Markdown** 的排版示例
123123
这是一篇讲解如何正确使用 **Markdown** 的排版示例
这是一篇讲解如何正确使用 **Markdown** 的排版示例
这是一篇讲解如何正确使用 **Markdown** 的排版示例
这是一篇讲解如何正确使用 **Markdown** 的排版示例
这是一篇讲解如何正确使用 **Markdown** 的排版示例
123123

# 语法指导
这是一篇讲解如何正确使用 **Markdown** 的排版示例
这是一篇讲解如何正确使用 **Markdown** 的排版示例
这是一篇讲解如何正确使用 **Markdown** 的排版示例
这是一篇讲解如何正确使用 **Markdown** 的排版示例
这是一篇讲解如何正确使用 **Markdown** 的排版示例
adasdasd
这是一篇讲解如何正确使用 **Markdown** 的排版示例
这是一篇讲解如何正确使用 **Markdown** 的排版示例
这是一篇讲解如何正确使用 **Markdown** 的排版示例
这是一篇讲解如何正确使用 **Markdown** 的排版示例
这是一篇讲解如何正确使用 **Markdown** 的排版示例
# 语法指导456
这是一篇讲解如何正确使用 **Markdown** 的排版示例
这是一篇讲解如何正确使用 **Markdown** 的排版示例
这是一篇讲解如何正确使用 **Markdown** 的排版示例
这是一篇讲解如何正确使用 **Markdown** 的排版示例
这是一篇讲解如何正确使用 **Markdown** 的排版示例
asdhiasdh
这是一篇讲解如何正确使用 **Markdown** 的排版示例
这是一篇讲解如何正确使用 **Markdown** 的排版示例
这是一篇讲解如何正确使用 **Markdown** 的排版示例
这是一篇讲解如何正确使用 **Markdown** 的排版示例
这是一篇讲解如何正确使用 **Markdown** 的排版示例
这是一篇讲解如何正确使用 **Markdown** 的排版示例
这是一篇讲解如何正确使用 **Markdown** 的排版示例
这是一篇讲解如何正确使用 **Markdown** 的排版示例
这是一篇讲解如何正确使用 **Markdown** 的排版示例
这是一篇讲解如何正确使用 **Markdown** 的排版示例
# werwerwer
这是一篇讲解如何正确使用 **Markdown** 的排版示例
这是一篇讲解如何正确使用 **Markdown** 的排版示例
这是一篇讲解如何正确使用 **Markdown** 的排版示例
这是一篇讲解如何正确使用 **Markdown** 的排版示例
这是一篇讲解如何正确使用 **Markdown** 的排版示例
这是一篇讲解如何正确使用 **Markdown** 的排版示例
这是一篇讲解如何正确使用 **Markdown** 的排版示例
这是一篇讲解如何正确使用 **Markdown** 的排版示例
这是一篇讲解如何正确使用 **Markdown** 的排版示例
这是一篇讲解如何正确使用 **Markdown** 的排版示例
这是一篇讲解如何正确使用 **Markdown** 的排版示例
这是一篇讲解如何正确使用 **Markdown** 的排版示例
这是一篇讲解如何正确使用 **Markdown** 的排版示例
这是一篇讲解如何正确使用 **Markdown** 的排版示例
这是一篇讲解如何正确使用 **Markdown** 的排版示例

# 语法指导
这是一篇讲解如何正确使用 **Markdown** 的排版示例
这是一篇讲解如何正确使用 **Markdown** 的排版示例
这是一篇讲解如何正确使用 **Markdown** 的排版示例
这是一篇讲解如何正确使用 **Markdown** 的排版示例
这是一篇讲解如何正确使用 **Markdown** 的排版示例
`

      Vditor.preview(previewRef.value!, markdown.value!, {
        mode: 'dark',
        theme: {
          current: 'dark'
        },
        after() {
          handlePreview()
          scrollToTop()
        }
      })
    })
    return {
      markdown,
      previewRef,
      titles,
      handleScroll,
      handleAnchorClick,
      handleOutlineClassName
    }
  }
})
</script>

<style scoped>
.mh-vditor-preview {
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
}

.preview {
  background-color: #2f363d;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
}
.current-outline {
  color: #3eaf7c;
}
.mh-vditor-preview::-webkit-scrollbar {
  display: none;
}

.preview::-webkit-scrollbar {
  display: none;
}

.outline {
  width: 200px;
  flex-shrink: 0;
  height: 100%;
  display: block;
  overflow-y: scroll;
  box-sizing: border-box;
  cursor: pointer;
  padding: 10px;
  position: sticky;
  top: 0;
}
.outline-any {
  line-height: 30px;
  display: inline-block;
  width: 100%;
}
.outline-any:hover {
  color: #3eaf7c;
}
.outline-h1 {
  font-weight: bold;
  font-size: 18px;
}
.outline-h2 {
  font-size: 16px;
}
</style>
