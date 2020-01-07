export const remove=async (
    msg: { 
        from: { id: number }; 
        text: string 
    },
    bot: { 
        sendMessage: (arg0: number, arg1: string) => void 
    },
    model: { 
        findOne: (arg0: { titulo: string }) => any;
        findByIdAndDelete: (arg0: number) => any 
    }) => {

    const chat_id=msg.from.id

    const texto=msg.text.split(' ')
    
    const titulo=texto[1]

    const evento= await model.findOne({titulo: titulo})
    var criador: number
    var evento_id: number
    if(evento){
        criador=evento.criador
        evento_id=evento._id
    }

    var temp_id: number
    var x: string | number
    if(!evento || !titulo){
        bot.sendMessage(chat_id,'Esse evento não existe')
    }
    else if(criador!=chat_id){
        bot.sendMessage(chat_id,'Você não criou o evento. Portanto, não pode removê-lo.')
    }
    else{
        for(x in evento.participantes){
            temp_id=evento.participantes[x].id
            bot.sendMessage(temp_id,'o evento '+evento.nome+' foi cancelado.')
        }
        await model.findByIdAndDelete(evento_id)
        bot.sendMessage(chat_id,'evento removido com sucesso!')
    }
}