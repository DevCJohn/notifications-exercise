const express = require('express')
const app = express();
var cors = require('cors')
const port = 3003;

app.use(cors())

app.get('/notification', (req, res) => {
      res.send([
          {id: 1, title: 'You have a new message from the team', body: 'Click here to read more...', date: new Date(), link: "http://www.example.com"},
          {id: 2, title: 'Ways to improve outreach', body: 'Click here to read more...', date: new Date('11/4/2021'), link: "http://www.example.com"},
          {id: 3, title: 'You have a new message from the team', body: 'We set up your website...', date: new Date('11/3/2021'), link: "http://www.example.com"},
          {id: 4, title: 'Top tips for Non-Profits', body: 'Click here to read more...', date: new Date('11/2/2021'), link: "http://www.example.com"},
          {id: 5, title: 'You have a new message from the team', body: "Please ensure your address is up to date...", date: new Date('11/2/2021'), link: "http://www.example.com"},
      ])
});

app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`);
});
