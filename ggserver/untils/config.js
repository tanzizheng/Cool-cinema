// 1引入数据库插件
var mongoose = require('mongoose');
// 链接数据库
var Mongoose = {
	// url : 'mongodb://localhost:27017/gg',
	connect(){
		mongoose.connect('mongodb://127.0.0.1:27017/gg' ,{useNewUrlParser: true,useUnifiedTopology: true }, (err)=>{
			if(err){
				console.log('数据库连接失败');
				return;
			}
			console.log('数据库连接成功');
		});
	}
};
// 导出数据库
module.exports = {
	Mongoose,
};