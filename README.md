## 使用 boundingClientRect 在 useReady 中获得元素的 rect 有时会为 null 的问题

```tsx
function GetRect() {
  const rootRef = useRef<TaroElement>()
  const {objects} = useContext(RectContext)

  useReady(() => {
    createSelectorQuery()
      .select("#" + rootRef.current?.uid)
      .boundingClientRect((rect) => {
        console.log(rootRef.current, rect)
      })
      .exec()
  })

  return (
    <View ref={rootRef}>
      {
        objects.map(num => (<Text key={num}>Num：{num}</Text>))
      }
    </View>
  )
}

```

这个问题在微信小程序中会存在一定的随机性问题，大概率的发生方式是：

* 清空编译缓存再编译
* 创建多个组件

```tsx
export default function Index() {
  return (
    <RectContext.Provider
      value={{
        objects: [1, 2, 3, 4, 5, 6, 7]
      }}
    >
      <View className="index">
        <GetRect/>
        <GetRect/>
        <GetRect/>
        <GetRect/>
        <GetRect/>
        <GetRect/>
        <GetRect/>
        <GetRect/>
        <GetRect/>
      </View>
    </RectContext.Provider>
  )
}
```

### weapp 中的效果

![weapp](https://raw.githubusercontent.com/taroify/taro330-nexttick/main/images/weapp.gif)

期望的结果是在 useReady 获得 rect 不为 null。
