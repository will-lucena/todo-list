import rcDefaults from '@/assets/remote_config_todo-list.json';
import { fetchAndActivate, getRemoteConfig, getValue } from "firebase/remote-config";
import { app } from "./setup";


const remoteConfig = getRemoteConfig(app);
remoteConfig.settings.minimumFetchIntervalMillis = 3600000;
remoteConfig.defaultConfig = rcDefaults;

fetchAndActivate(remoteConfig)
  
function getConfig(key: string) {
  return getValue(remoteConfig, key)?.asBoolean()
}

export { getConfig };

