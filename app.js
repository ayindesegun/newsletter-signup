const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const request = require('request')
const https = require('https')
//const mailchimp = require('mailchimp-marketing')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/signup.html')
})


app.post('/', (req, res) => {
  const fName = req.body.firstName
  const lName = req.body.lastName
  const email = req.body.email

  const data = {
    members: [
      {
        email_address: email,
        status: 'subscribed',
        merge_fields: {
          FNAME: fName,
          LNAME: lName,
        },
      },
    ],
  }
  const jsonData = JSON.stringify(data)
  const url = 'https://us14.api.mailchimp.com/3.0/lists/11da4e5431'
  const options = {
    method: 'POST',
    auth: 'ayinde-segun:da71cf609d9898fecef838a5e60a6464-us14',
  }
  const request = https.request(url, options, (response) => {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + '/success.html')
    } else {
      res.sendFile(__dirname + '/error.html')
    }

    response.on('data', (data) => {
      console.log(JSON.parse(data))
    })
  })
  request.write(jsonData)
  request.end()
})

app.post('/error', (req, res) => {
    res.redirect('/')
})

app.listen(process.env.PORT || 3000, () => {
  console.log('The server is up and running on port 3000')
})

/* const apiKey = '' 
   const audienceId = ''
 */
