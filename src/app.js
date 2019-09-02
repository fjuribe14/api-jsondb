const express = require('express')
const path = require('path')

// init
const app = express()

// settings
app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// middlewares
app.use(express.urlencoded({extended:false}))

// static
app.use(express.static(path.join(__dirname, 'public')))

// routes
app.use(require('./routes/home'))
app.use(require('./routes/data'))
app.use((req, res, next)=>{
    res.status(404).render('404.ejs')
})


module.exports = app