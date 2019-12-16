/* importar as configurações do servidor */
const app = require('./config/server');
const PORT = 80

/* parametrizar a porta de escuta */
app.listen(PORT, function(){
	console.log(`Server online on PORT ${PORT}`);
})