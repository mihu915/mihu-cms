<template>
  <div class="mh-vditor-preview">
    <div
      class="outline"
      v-if="isShowOutline"
      :style="{ width: outlineWidth + 'px' }"
      ref="outlineRef"
    >
      <div
        v-for="(anchor, index) in titles"
        :id="anchor.lineIndex"
        :style="{ paddingLeft: `${anchor.indent * 20}px` }"
        :key="index"
        @click="handleAnchorClick(anchor)"
        class="outline-item"
      >
        <a :class="handleOutlineClassName(anchor)" class="outline-any">
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

export default defineComponent({
  props: {
    markdownText: {
      type: String,
      default: ''
    },
    isShowOutline: {
      type: Boolean,
      default: true
    },
    outlineWidth: {
      type: Number,
      default: 200
    }
  },
  setup(props) {
    const previewRef = ref<HTMLDivElement>()
    const markdown = ref('')
    const titles = ref<any[]>([])
    const anchors = ref()
    const outlineRef = ref<HTMLElement>()

    onMounted(async () => {
      Vditor.preview(previewRef.value!, props.markdownText, {
        mode: 'dark',
        theme: {
          current: 'dark'
        },
        hljs: {
          style: 'solarized-dark'
        },
        after() {
          handlePreview()
          scrollToTop()
        }
      })
    })

    // 处理点击大纲
    const handleAnchorClick = (anchor: any) => {
      const { lineIndex } = anchor
      const heading = previewRef.value!.querySelector(`[id="${lineIndex}"]`)
      if (heading) {
        heading.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest'
        })
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

      const hTags = Array.from(new Set(titleArray.map((title: any) => title.tagName))).sort()
      titles.value = titleArray.map((el: any, index: number, nodeArray: any) => {
        const result = {
          title: el.innerText,
          lineIndex: el.getAttribute('id'),
          indent: hTags.indexOf(el.tagName),
          tagName: el.tagName,
          parentLineIndex: ''
        }

        if (el.tagName !== 'H1') {
          for (let i = 0; i < index; i++) {
            let nextIndex = index - i - 1
            if (nodeArray[nextIndex].tagName === 'H1') {
              result.parentLineIndex = nodeArray[nextIndex].id
              break
            }
          }
        }
        return result
      })
    }

    // 监听预览页面的滚动
    const handleScroll = () => {
      if (!props.isShowOutline) return
      scrollToTop()
    }

    // 根据标记设置锚点class属性
    const handleOutlineClassName = (anchor: any) => {
      let className = ''
      switch (anchor.tagName) {
        case 'H1':
          className = 'outline-h1'
          break
        case 'H2':
          className = 'outline-h2'
          break
      }
      if (anchor.current) {
        className += ' current-outline'
      }
      if (anchor.currentParent) {
        className += ' current-outline-parent'
      }

      return className
    }

    // 根据页面滚动改变当前大纲索引
    const scrollToTop = () => {
      const currentScrollTop = previewRef.value?.scrollTop
      const currentNode = Array.from<HTMLElement>(anchors.value).find(
        (item: HTMLElement, index: number, array) => {
          if (array.length <= 1) {
            return array[0]
          } else {
            let nextIndex: number = index + 1
            if (nextIndex >= array.length - 1) {
              nextIndex = array.length - 1
            }
            if (currentScrollTop! < array[nextIndex].offsetTop) {
              return item
            }
          }
        }
      )

      // 标记锚点
      titles.value.forEach((item) => {
        item.current = false
        item.currentParent = false
        if (currentNode!.id === item.lineIndex) {
          item.current = true
          if (item.tagName === 'H1') {
            item.currentParent = true
          } else {
            titles.value.forEach((content) => {
              if (content.lineIndex === item.parentLineIndex) {
                content.currentParent = true
              }
            })
          }
        }
      })
    }

    return {
      markdown,
      previewRef,
      outlineRef,
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
  overflow: hidden;
}

.preview {
  background-color: #2f363d;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 5px;
}
.current-outline {
  color: #3eaf7c;
}

.current-outline-parent {
  border-left: 3px #3eaf7c solid;
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
  box-sizing: border-box;
  cursor: pointer;
  position: sticky;
  overflow-y: scroll;
  background-color: rgb(231, 231, 231);
  border-radius: 5px;
  top: 0;
  padding: 10px;
}
.outline-any {
  line-height: 30px;
  padding-left: 10px;
  box-sizing: border-box;
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
  font-size: 15px;
}
</style>
