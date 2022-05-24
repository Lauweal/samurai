import { useContext, useEffect } from "react";
import { NatificationPlugin } from '@samurai/http-client'
import { NotificationContext } from "../components";
import { useStores } from "../models";


export function useNotification() {
  const { dispatch } = useContext(NotificationContext)
  const { environment } = useStores()

  function error(res: any) {
    console.log('======>', res)
  }

  useEffect(() => {
    const plugin = environment.api.getPlugin<NatificationPlugin>(NatificationPlugin) as NatificationPlugin;
    if (plugin) {
      plugin.addEventListener('error', error)
    }
    return () => {
      plugin.removeEventListener('error', error)
    }
  }, [])

}
