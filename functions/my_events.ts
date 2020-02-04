export const my_events= async(
    msg: {
        from: { id: number } 
    },
    bot: { 
        sendMessage: (arg0: number, arg1: string) => void 
    },
    model: {
        find: (arg0: { criador: any }) => any 
    }) => {
    const chat_id=msg.from.id

    const eventos= await model.find({criador: chat_id})
    var x: string | number
    //console.log(eventos.length)
    if(eventos.length==0){
        bot.sendMessage(chat_id,'Não existe nenhum evento criado por você. Crie um!')
    }
    else{
        for(x in eventos){
            bot.sendMessage(chat_id, eventos[x].titulo)
        }
    }
}