import { PostWakeWindows } from "@/app/_types/apiRequests/dashboard/wakeWindows/postRequest";
import { SleepPrepTime } from "@/app/_types/apiRequests/dashboard/wakeWindows/postRequest";
export interface WakeWindowsData {
  activityTime: PostWakeWindows[];
  sleepPrepTime: SleepPrepTime;
}
