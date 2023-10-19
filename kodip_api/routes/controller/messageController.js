const messages = require('../../models/userModel');

class messageController{
//setting up message center

/*

    // get all the messages the user has sent and recieved
    async chatHistory(req, res){
        //req.headers.data
        const user = 'john_doe';
        const ChatHistory = await messages.find();
res.json({message:`${user}'s Chat History`, chatHistory});
    }
*/
async sendMessage(req, res){

    const message = req.body.message;

    io.emit('chat message', message);

    res.json({message:'message sent'});
}
}

module.exports = new messageController();