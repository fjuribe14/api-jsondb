const uuid = require('uuid/v4')
const fs = require('fs')
const json2xls = require('json2xls')

const dataCtrl = {}

// read json file
const data_json = fs.readFileSync('src/db/data.json', 'utf-8')
// parse json to arr
let Data = JSON.parse(data_json)
// parse json to xls
const xls = json2xls(Data)

dataCtrl.data = (req, res) => {
    fs.writeFileSync('src/db/data.xlsx', xls, 'binary')
    res.render('data.ejs', {
        Data
    })
}

dataCtrl.createData = (req, res) => {
    res.render('new.ejs')
}

dataCtrl.newData = async (req, res) => {
    const { name, email, age, sex } = req.body
    const newData = {
        id: uuid(),
        date: new Date(Date.now()),
        name,
        email,
        age,
        sex
    }
    await Data.push(newData)
    // parse arr to json
    const data_json = JSON.stringify(Data)
    // write on file json
    fs.writeFileSync('src/db/data.json', data_json, 'utf-8')

    res.redirect('/data')
}

dataCtrl.deleteData = async (req, res) => {
    Data = await Data.filter(data => data.id != req.params.id)
    // parse arr to json
    const data_json = JSON.stringify(Data)
    // write on file json
    fs.writeFileSync('src/db/data.json', data_json, 'utf-8')
    res.redirect('/data')
}

dataCtrl.updateData = async (req, res) => {
    const upgradeData = await Data.filter(data => data.id == req.params.id)
    const [ { name, email, age } ] =  upgradeData
    res.render('update.ejs',{
        name,
        email,
        age
    })
}

dataCtrl.upgradeData = async (req, res) => {
    const upgradeData = await Data.filter(data => data.id == req.params.id)
    res.send(upgradeData)
}

module.exports = dataCtrl