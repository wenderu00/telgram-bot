export const cancel= async(
    msg: {
        from: { 
            id: number;
            first_name:string;
            last_name: string 
        }; 
        text: string 
    },
    bot: { 
        sendMessage: (arg0: number, arg1: string) => void 
    },
    model: { 
        findOne: (
            arg0: { 
                titulo: string 
            }) => any;
        findByIdAndUpdate: (
            arg0: number,
            arg1: {
                participantes: any
            }) => any 
    }
) => {
    const chat_id=msg.from.id
    const nome=msg.from.first_name+' '+msg.from.last_name

    const texto=msg.text.split(' ')
        
    const titulo=texto[1]

    const evento= await model.findOne({titulo: titulo})

    var len: number
    var i: number
    var continua: boolean
    if(!evento){
        bot.sendMessage(chat_id,'esse evento não existe')
    }
    else{
        len=evento.participantes.length
        i=0
        continua=true
        while(i<len && continua){
            if(evento.participantes[i].id==chat_id){
                evento.participantes.splice(i,1)
                bot.sendMessage(chat_id,'você cancelou sua inscrição com sucesso')
                bot.sendMessage(evento.criador,nome+' cancelou a participação no seu evento')
                await model.findByIdAndUpdate(evento._id,{participantes:evento.participantes})
                continua=false
            }
            i++
        }
    }
}
