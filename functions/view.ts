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

    const eventos= await model.find()
    bot.sendMessage(msg.from.id,'os eventos são:')

    var x: string | number
    for(x in eventos){
        var evento_atual=eventos[x]
        bot.sendMessage(msg.from.id,'Nome: '+evento_atual.titulo+'\nDesc:'+evento_atual.desc)
    }
}