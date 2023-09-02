const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();

// 获取网站标题和图标
app.get('/', (req, res) => {
  const siteUrl = req.query.url;
  if (!siteUrl) res.status(400).send('缺少url参数');
  axios.get(siteUrl)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      const title = $('title').text();
      res.send({
        status: 0,
        message: '获取成功',
        title,
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send(error.message);
    });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});