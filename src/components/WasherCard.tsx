import { FC, useState } from "react"
import WasherInfo from "./WasherInfo"
import Countdown, { CountdownRendererFn } from 'react-countdown'
import "@/styles/washer.scss"

export const statusColor: Record<Washer["status"], string> = {
  "Available": "text-lime-500",
  "Maintain": "text-stone-500",
  "Payment": "text-yellow-500",
  "Washing": "text-sky-500"
}

const WasherCard: FC<{ washer: Washer }> = ({ washer }) => {
  const [open, setOpen] = useState<boolean>(false)

  const onClose = () => {
    setOpen(false)
  }

  const onOpen = () => {
    setOpen(true)
  }

  const countDownRenderer: CountdownRendererFn = ({ hours, minutes, seconds, completed }) => {
    const p = (num: string | number) => num.toString().padStart(2, '0')
    if (completed) {
      // Render a completed state
      return '';
    } else {
      // Render a countdown
      return <span>{p(hours)}:{p(minutes)}:{p(seconds)}</span>;
    }
  };

  const timeCounter = (
    washer.status === "Washing" && washer.stopTime ? <Countdown date={washer.stopTime} intervalDelay={0} renderer={countDownRenderer} /> : `${washer.processTime}`
  )

  const filter = washer.status === "Maintain" ? "grayscale(1)" : "grayscale(0)"

  const WasherDetail = (
    <div className="washer-card">
      <img src="/img/washing-machine1.png"
        alt="" style={{ filter }}
        className="max-w-[120px] w-2/6 object-contain"
      />
      <div className="washer-detail">
        <div className="font-bold">{washer.name}</div>
        <div className={statusColor[washer.status]}>
          {washer.status}
        </div>
        <div className={"text-sm text-opacity-80 " + statusColor["Washing"]}>
          Time: {timeCounter}
        </div>
        <div className="text-sm">
          Coin: {`(${washer.payCurrent}/${washer.payRequire})`}
        </div>
        <div className="text-gray-900 text-opacity-50 text-sm">{washer.description}</div>
      </div>
    </div>
  )

  return (
    <>
      <div onClick={onOpen} className="cursor-pointer">
        {WasherDetail}
      </div>

      <WasherInfo washer={washer} open={open} onClose={onClose}>
        {WasherDetail}
      </WasherInfo>
    </>
  )
}

export default WasherCard