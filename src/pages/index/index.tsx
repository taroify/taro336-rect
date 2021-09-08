import {createContext, useContext, useRef} from "react"
import {Text, View} from "@tarojs/components"
import {createSelectorQuery, useReady} from "@tarojs/taro";

interface TaroElement extends HTMLElement {
  uid: string
}

interface RectContextValue {
  objects: number[]
}

const RectContext = createContext<RectContextValue>({
  objects: []
})

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
