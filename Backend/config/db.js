const mongoose= require('mongoose');
const uri= process.env.MONGODB_URI||"mongodb+srv://irfan74:irfan4868@ecom-cluster.qol9kpp.mongodb.net/test"
const connectdb = ()=>{
  mongoose.connect(uri,{
      useNewUrlParser:true,
      useUnifiedTopology:true,
      
  }).then(con=>{
      console.log(`mongo db connected to ${con.connection.host}`)
  })
}
module.exports = connectdb