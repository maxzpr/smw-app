import WasherCard from "@/components/WasherCard"
import { useRealtime } from "@/contexts/RealtimeContext"
import { FC, useEffect, useState } from "react"

const Home: FC = () => {
  const realtime = useRealtime()
  const [washers, setWasher] = useState<Washer[]>([]);

  const onWasherList = (washerList: Washer[]) => {
    if (Array.isArray(washerList)) {
      setWasher(washerList)
    }
  }

  const onWasherUpdate = (washer: Washer) => {
    if (washer?._id) {
      setWasher((washers: Washer[]) => {
        let washerIndex = washers.findIndex(w => w._id === washer._id);
        let newWashers = washers.slice()

        if (washerIndex >= 0) {
          newWashers[washerIndex] = { ...washer }
        }

        return newWashers
      })
    }
  }

  useEffect(() => {
    if (realtime.socket) {
      realtime.socket.on("washer-list", onWasherList.bind(this))
      realtime.socket.on("washer-update", onWasherUpdate.bind(this))
    }
  }, [realtime.socket])

  return (
    <div className="washer-list">
      {
        washers.map((w) => (
          <WasherCard washer={w} key={w._id} />
        ))
      }
    </div>
  )
}

export default Home