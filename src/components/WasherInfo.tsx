import { API } from "@/api"
import { FC, PropsWithChildren } from "react"
import { FaTimes } from 'react-icons/fa'

interface Props extends PropsWithChildren {
  washer: Washer
  open?: boolean
  onClose?: () => void
}

const WasherInfo: FC<Props> = ({ washer, open = false, children = '', onClose = () => { } }) => {

  const addCoin = async () => {
    let coin = washer.payCurrent + 10
    if (coin <= washer.payRequire) {
      await API.washerService.update({
        id: washer._id,
        name: washer.name,
        coin,
        status: coin === washer.payRequire ? "Washing" : "Payment",
        processTime: washer.processTime
      })
    }
  }

  const maintain = async () => {
    await API.washerService.update({
      id: washer._id,
      status: "Maintain"
    })
  }

  const available = async () => {
    await API.washerService.update({
      id: washer._id,
      status: "Available"
    })
  }

  const payDisabled = (
    !(['Available', 'Payment'].includes(washer.status)) || washer.payCurrent >= washer.payRequire
  )

  return (
    <div className={`washer-info ${open ? 'open' : ''}`}>
      <div className="container">
        <FaTimes className="btn-close cursor-pointer" onClick={() => onClose()} />

        {children}

        <div className="border rounded-sm p-4">
          <div className="text-base">Simulate machine</div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-2 mt-4">
            <button className="btn text-green-500" disabled={payDisabled} onClick={() => addCoin()}>
              + 10 coin
            </button>
            <button className="btn text-red-600" disabled={washer.status !== 'Washing'} onClick={() => maintain()}>
              Machine broken
            </button>
            <button className="btn" disabled={washer.status !== 'Maintain'} onClick={() => available()}>
              Available
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WasherInfo