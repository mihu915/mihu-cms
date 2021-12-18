<template>
  <div class="outline" ref="outlineRef">
    <div
      v-for="(anchor, index) in titles"
      :id="anchor.lineIndex"
      :key="index"
      @click="handleAnchorClick(anchor)"
      class="outline-item"
    >
      <span :class="handleOutlineClassName(anchor)" class="outline-any">
        {{ anchor.title }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue'

export default defineComponent({
  props: {
    previewElement: {
      type: Element
    }
  },
  setup(props) {
    const titles = ref<any[]>([])
    const anchors = ref()
    const currentNode = ref()
    const currentNodeIndex = ref(0)
    // 处理点击大纲
    const handleAnchorClick = (anchor: any) => {
      const { lineIndex } = anchor
      const heading = props.previewElement!.querySelector(`[id="${lineIndex}"]`)

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
      anchors.value = props.previewElement!.querySelectorAll('h2,h3')
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

        if (el.tagName !== 'H2') {
          for (let i = 0; i < index; i++) {
            let nextIndex = index - i - 1
            if (nodeArray[nextIndex].tagName === 'H2') {
              result.parentLineIndex = nodeArray[nextIndex].id
              break
            }
          }
        }
        return result
      })
    }

    // 根据标记设置锚点class属性
    const handleOutlineClassName = (anchor: any) => {
      let className = ''
      switch (anchor.tagName) {
        case 'H2':
          className = 'outline-h2'
          break
        case 'H3':
          className = 'outline-h3'
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
      // 获取视口高度
      const viewportHeight = document.documentElement.clientHeight || document.body.clientHeight
      // console.log(viewportHeight)

      // 获取网页滚动的高度
      const windowScrollTop = document.documentElement.scrollTop

      if (windowScrollTop)
        if (windowScrollTop >= anchors.value[currentNodeIndex.value + 1].offsetTop) {
          // console.log(windowScrollTop)

          currentNodeIndex.value++

          // console.log(currentNodeIndex.value)
        }
      console.log(currentNodeIndex.value)
      console.log(viewportHeight - anchors.value[currentNodeIndex.value].offsetTop)
      currentNode.value = anchors.value[currentNodeIndex.value]
      // console.log(anchors.value[0].offsetTop)
      const currentScrollTop = document.documentElement.clientHeight || document.body.clientHeight
      // currentNode.value = Array.from<HTMLElement>(anchors.value).find(
      //   (item: HTMLElement, index: number, array) => {
      //     if (array.length <= 1) {
      //       return array[0]
      //     } else {
      //       let nextIndex: number = index + 1
      //       if (nextIndex >= array.length - 1) {
      //         nextIndex = array.length - 1
      //       }
      //       if (currentScrollTop! < array[nextIndex].offsetTop) {
      //         return item
      //       }
      //     }
      //   }
      // )

      // 标记锚点
      titles.value.forEach((item) => {
        item.current = false
        item.currentParent = false
        if (currentNode.value.id === item.lineIndex) {
          item.current = true
          if (item.tagName === 'H2') {
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

    watch(
      () => props.previewElement,
      () => {
        handlePreview()
        scrollToTop()
        window.addEventListener('scroll', () => {
          scrollToTop()
        })
      }
    )

    return {
      handleAnchorClick,
      handleOutlineClassName,
      scrollToTop,
      titles
    }
  }
})
</script>

<style scoped>
.current-outline {
  color: #3eaf7c;
}

.current-outline-parent {
  border-left: 3px #3eaf7c solid;
  color: #3eaf7c;
}

.outline {
  width: 200px;
  height: 100%;
  display: block;
  box-sizing: border-box;
  overflow-y: scroll;
  background-color: rgb(231, 231, 231);
  border-radius: 5px;
  position: fixed;
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

.outline-h2 {
  font-weight: bold;
  font-size: 18px;
}

.outline-h3 {
  font-size: 15px;
}
</style>
