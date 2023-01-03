import { createContext, FC, PropsWithChildren, useContext, useEffect, useState } from "react";
import { io, Socket } from 'socket.io-client'

type RealtimeContext = {
  socket?: Socket
}

const context = createContext<RealtimeContext>({

})


interface RealtimeProviderProps extends PropsWithChildren {
  url: string
}


const RealtimeProvider: FC<RealtimeProviderProps> = ({ url, children }) => {
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    if (!socket) {
      setSocket(io(url))
    }
  }, [socket])

  return (
    <context.Provider value={{ socket }}>
      {children}
    </context.Provider>
  )
}


const useRealtime = () => {
  return useContext(context)
}

export { RealtimeProvider, useRealtime }