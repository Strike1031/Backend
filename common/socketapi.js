var Transaction = require("../models/transactions");

let symbolName = "USDT";
let transactions;
function socketapi(io) {
  io.on('connection', (socket) => {
    if(transactions){
      io.emit("TransactionData", transactions);
    }
    console.log(`⚡: ${socket.id} user just connected!`);
    socket.on('disconnect', () => {
      console.log('🔥: A user disconnected');
    });

    socket.on("changeSymbol", async (arg) => {
      symbolName = arg;
      const tmpTransactions = await Transaction.find({symbol: { $regex: symbolName + '$' }}).sort({eventTime: -1});
      transactions = tmpTransactions;
      io.emit("TransactionData", transactions);
    });
  });

  setInterval(async () => {
    const tmpTransactions = await Transaction.find({symbol: { $regex: symbolName + '$' }}).sort({eventTime: -1});
    transactions = tmpTransactions;
    io.emit("TransactionData", transactions);
  }, 20000);
}


module.exports = socketapi;