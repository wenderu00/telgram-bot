export const view= async (
    msg: { 
        from: { id: number } 
    },
    bot: { 
        sendMessage: (arg0: number, arg1: string) => void 
    },
    model: { 
        find: () => any 
    }) =>{
    bot.sendMessage(msg.from.id,'os eventos são:')
    const eventos= await model.find()
    var x: string | number
    var y: any
    for(x in eventos){
        var evento_atual=eventos[x]
        bot.sendMessage(msg.from.id,'Nome: '+evento_atual.titulo+'\nDesc:'+evento_atual.desc)
        //setTimeout(bot.sendMessage(msg.from.id,'Nome: '+evento_atual.titulo+'\nDesc:'+evento_atual.desc),1000)

    }
}