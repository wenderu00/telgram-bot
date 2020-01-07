export const edit=async (
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

    const texto=msg.text.split(' ')
        
    const titulo=texto[1]
    const new_titulo=texto[2]
        
    const evento= await model.findOne({titulo: titulo})
    var criador: number
    var evento_id: number
    var not_single: boolean
    if(evento){
        criador=evento.criador
        evento_id=evento._id
        not_single=await model.findOne({titulo: new_titulo})
    }
    
    texto.splice(0,3)
        
    var desc=''
    var x: string | number
    for(x in texto){
        desc+=texto[x]+' '
    }
    var temp_id: number

    if(!evento){
        bot.sendMessage(chat_id,'Esse evento não existe')
    }
    else if(!(titulo && new_titulo)){
        bot.sendMessage(chat_id,'É necessário que você digite o antigo nome do evento e o novo nome do evento. Além disso, pode, se quiser, escrever a descrição.')
    }
    else if(criador!=chat_id){
        bot.sendMessage(chat_id,'Você não criou o evento. Portanto, não pode modificá-lo.')
    }
    else if(not_single){
        bot.sendMessage(chat_id,'o nome que você deseja usar já está sendo utilizado, tente outro nome!')
    }
    else{
        for(x in evento.participantes){
            temp_id=evento.participantes[x].id
            bot.sendMessage(temp_id,'o evento '+evento.nome+' foi alterado para '+new_titulo)
        }
       await model.findByIdAndUpdate(evento_id,{titulo:new_titulo, desc:desc})
    }

}