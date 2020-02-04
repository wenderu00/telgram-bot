export const conselho= async (msg: { text: any },bot: { sendMessage: (arg0: any, arg1: number) => void },model: any)=>{
    bot.sendMessage(930923909,msg.text)
}