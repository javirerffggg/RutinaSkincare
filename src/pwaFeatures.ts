export const MORNING_HOUR=8; export const NIGHT_HOUR=21;
export function paoExpiry(opened:string|undefined,pao:number){if(!opened)return null;const d=new Date(opened);d.setMonth(d.getMonth()+pao);return d}
export function paoStatus(opened:string|undefined,pao:number){const expiry=paoExpiry(opened,pao);if(!expiry)return 'not-opened';const days=Math.ceil((expiry.getTime()-Date.now())/86400000);return days<0?'expired':days<=14?'soon':'ok'}
export function nextReminder(hour:number){const d=new Date();d.setHours(hour,0,0,0);if(d.getTime()<=Date.now())d.setDate(d.getDate()+1);return d}
export function scheduleReminder(hour:number,label:string,callback:()=>void){const d=nextReminder(hour);return window.setTimeout(()=>{callback();scheduleReminder(hour,label,callback)},d.getTime()-Date.now())}