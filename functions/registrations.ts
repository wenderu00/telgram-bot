export const registrations= async (
    msg: { 
        from: { id: number } 
    },
    bot: { 
        sendMessage: (arg0: number, arg1: string) => void 
    },
    model: {
        find: () => any 
    }) =>{
    const chat_id= msg.from.id

    const eventos= await model.find()

    var existe=false
    var evento_atual: { participantes: string | any[]; titulo: any }
    var inscrito: boolean
    var x: string | number
    var len: number
    var i: number
    for(x in eventos){
        evento_atual=eventos[x]
        inscrito=false
        len=evento_atual.participantes.length
        i=0
        while(i<len && !inscrito){
            if(evento_atual.participantes[i].id==chat_id){
                inscrito=true
            }
            i++
        }

        if(inscrito && !existe){
            existe=true
            bot.sendMessage(chat_id,'Os eventos que você está inscrito, são:')
            bot.sendMessage(chat_id,evento_atual.titulo)
        }
        else if(inscrito){   
            bot.sendMessage(chat_id,evento_atual.titulo)
        }
        
    }
    if(!existe){
        bot.sendMessage(chat_id,'você não está inscrito em nenhum evento.')
    }
}
