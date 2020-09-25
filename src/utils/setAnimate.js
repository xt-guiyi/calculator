export const animateCSS = (vm, elementRef, animationName) => {
  const node = vm.$refs[elementRef]
  // console.log(node)
  node.classList.add('animated', animationName)
  // 动画结束后删除动画类
  function handleAnimationEnd() {
    node.classList.remove('animated', animationName)
    node.removeEventListener('animationend', handleAnimationEnd)
  }

  node.addEventListener('animationend', handleAnimationEnd)
}