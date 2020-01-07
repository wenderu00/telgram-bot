export const go=async (
    msg: { 
        from: {
            id: number;
            first_name: string; 
            last_name: string 
        };
        text: string;
        date: any 
    },
    bot: { 
        sendMessage: (arg0: number, arg1: string) => void 
    }, 
    model: { 
        findOne: (arg0: { titulo: string }) => any; 
        findByIdAndUpdate: (arg0:number, arg1: { participantes: any }) => any 
    }) => {
    const chat_id=msg.from.id

    const texto=msg.text.split(' ')

    const titulo=texto[1]

    const inscrito={
        nome: msg.from.first_name+' '+msg.from.last_name,
        id: chat_id,
        date:Date(msg.date)
    }

    const evento= await model.findOne({titulo: titulo})
    var event_id: number
    if(evento){
        event_id=evento._id
    }
    
    if(!evento || !titulo){
        bot.sendMessage(chat_id,'Esse evento não existe')
    }
    else{
        evento.participantes.push(inscrito)
        await model.findByIdAndUpdate(event_id,{participantes:evento.participantes})
    
        bot.sendMessage(chat_id,'você se inscreveu com sucesso!')
    
        bot.sendMessage(evento.criador,inscrito.nome+' se inscreveu no evento '+evento.titulo)
    }
}
