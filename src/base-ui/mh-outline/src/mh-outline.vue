<template>
  <div class="outline" ref="outlineRef" :style="outlineStyle">
    <div class="outline-contents"><i class="iconfont mihu-unorderedlist"></i> 目录：</div>
    <div
      v-for="anchor in titles"
      :id="anchor.lineIndex"
      :key="anchor.lineIndex"
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
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
  props: {
    height: {
      type: Number,
      default: 500
    },
    previewElement: {
      type: Element
    }
  },
  setup(props) {
    const titles = ref<any[]>([])
    const anchors = ref()
    const currentNode = ref()
    const PreviewHtml = ref<HTMLElement>()
    const outlineStyle = {
      height: props.height + 'px'
    }
    // 处理点击大纲
    const handleAnchorClick = (anchor: any) => {
      const { lineIndex } = anchor
      const heading = PreviewHtml.value!.querySelector(`[id="${lineIndex}"]`)
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
      anchors.value = PreviewHtml.value!.querySelectorAll('h2,h3')
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
      if (!anchors.value) return

      // 获取视口高度
      // const viewportHeight = document.documentElement.clientHeight || document.body.clientHeight

      // 获取网页滚动的高度
      const windowScrollTop = document.documentElement.scrollTop

      Array.from<HTMLElement>(anchors.value).forEach((item) => {
        if (windowScrollTop >= item.offsetTop - 5) {
          currentNode.value = item
        } else if (windowScrollTop <= 0) {
          currentNode.value = anchors.value[0]
        }
      })

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
      async (newVal: any) => {
        window.removeEventListener('scroll', () => {
          scrollToTop()
        })

        PreviewHtml.value = newVal

        await setTimeout(() => {
          handlePreview()
          scrollToTop()
        }, 0)

        window.addEventListener('scroll', () => {
          scrollToTop()
        })
      }
    )

    return {
      handleAnchorClick,
      handleOutlineClassName,
      scrollToTop,
      outlineStyle,
      PreviewHtml,
      currentNode,
      titles
    }
  }
})
</script>

<style scoped lang="less">
// 滚动条外边框样式
::-webkit-scrollbar {
  // display: none; /* Chrome Safari */
  width: 10px;
  height: 1px;
}
::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  background-color: skyblue;
  background-image: -webkit-linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.2) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(255, 255, 255, 0.2) 75%,
    transparent 75%,
    transparent
  );
}
::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #ededed;
  border-radius: 10px;
}

.outline-contents {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #444;
}

.outline {
  color: #666;
  display: block;
  box-sizing: border-box;
  overflow-y: scroll;
  padding: 30px;

  // 滚动条外边框样式
  ::-webkit-scrollbar {
    // display: none; /* Chrome Safari */
    width: 10px;
    height: 1px;
  }
  ::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 10px;
    background-color: skyblue;
    background-image: -webkit-linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.2) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.2) 50%,
      rgba(255, 255, 255, 0.2) 75%,
      transparent 75%,
      transparent
    );
  }
  ::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #ededed;
    border-radius: 10px;
  }
}

.outline-any {
  line-height: 30px;
  margin-bottom: 10px;
  padding-left: 10px;
  box-sizing: border-box;
  display: inline-block;
  width: 100%;
}

.outline-any:hover {
  color: #3eaf7c;
}

.outline-h2 {
  border-left: solid 3px rgba(0, 0, 0, 0);
  font-weight: bold;
  font-size: 17px;
}

.outline-h3 {
  padding-left: 30px;
  box-sizing: border-box;
  font-size: 15px;
}

.current-outline {
  color: #3eaf7c;
}

.current-outline-parent {
  border-left: 3px #3eaf7c solid;
  color: #3eaf7c;
  box-sizing: border-box;
}
</style>
