const app = require('./app')

// listen
async function main(){
    const port = app.get('port')
    await app.listen(port)
    console.log('server on port', port)
}main()