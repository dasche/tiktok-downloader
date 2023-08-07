const express = require('express')
const flash = require('connect-flash')
const session = require('express-session')
require('dotenv/config')
const TikTokNoWatermak = require('tiktok-no-watermark-api')

const app = express()

app.set('view engine' ,'ejs')
app.use('/', express.static('public'))

app.use(session({
    secret: process.env.SECRET || 'fried chicken'
}))
app.use(flash())

function abbreviateNumber(number) {
    const SI_SYMBOLS = ["", "k", "m", "b"];
    if (number < 1000) {
      return number.toString();
    }
    const exp = Math.floor(Math.log10(number) / 3);
    const abbreviated = (number / Math.pow(1000, exp)).toFixed(1);
    return abbreviated + SI_SYMBOLS[exp];
}

app.get('/', (req, res)=>{
    res.render('index', {message: req.flash('message')})
})

app.get('/download', (req, res)=>{
    const {url} = req.query
    if(!url || url.trim().length < 1 || url.length > 250){
        req.flash('message', 'Video not found!')
        res.redirect('/')
    } else{
        TikTokNoWatermak(url, true)
        .then(data => {
            data.result.details.total_views = abbreviateNumber(data.result.details.total_views)
            data.result.details.total_likes = abbreviateNumber(data.result.details.total_likes)
            data.result.details.total_comment = abbreviateNumber(data.result.details.total_comment)
            res.render('download', {result: data.result})
        })
        .catch((err)=>{
            console.log(err)
            req.flash('message', 'Video not found!')
            res.redirect('/')
        })
    }
})

const PORT = process.env.PORT || 5000

app.listen(PORT, ()=> console.log(`Running on port ${PORT}`))