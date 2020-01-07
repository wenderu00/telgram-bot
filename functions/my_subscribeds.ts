export const my_subscribeds=async(
    msg: { 
        from: { id: number };
        text: string 
    },
    bot: { 
        sendMessage: (arg0: number, arg1: string) => void 
    },
    model: { 
        findOne: (arg0: { titulo: string }) => any 
    }) => {
    const chat_id=msg.from.id

    const texto=msg.text.split(' ')
    
    const titulo=texto[1]

    const evento= await model.findOne({titulo: titulo})
    var criador: number
    var inscritos: { [x: string]: { nome: string } }
    if(evento){
        criador=evento.criador
        inscritos=evento.participantes
    }
    var x: string | number
    if(!evento){
        bot.sendMessage(chat_id,'O evento não existe.')
    }
    else if(criador!=chat_id){
        bot.sendMessage(chat_id,'Você não tem acesso aos inscritos desse evento, pois não foi você quem o criou.')
    }
    else if(inscritos.length===0){
        bot.sendMessage(chat_id,'Não há inscritos nesse evento.')
    }
    else{
        for(x in inscritos){
            bot.sendMessage(chat_id,inscritos[x].nome)
        }
    }
}