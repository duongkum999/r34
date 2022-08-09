const axios = require("axios");
module.exports = {
  name: "gelbooru",
  run: async (req, res) => {
    var { search } = req.query;
    if(!search) return res.json({error : "Dcm vui lòng nhập từ khóa tìm kiếm!"});
    try {
      var url = "https://gelbooru.com/index.php?page=dapi&s=post&q=index&json=1&tags=" + encodeURI(search).replace("%20", "_");
      const get = await axios.get(url);
      var count = get.data['@attributes'].count;
      if (count == 0) return res.json({ count: 0, data: []});
      var data = [];
      var pageid = Math.floor(count/100);
      pageid = pageid > 10 ? 10 : pageid;
      for (let i = 1; i <= pageid; i++) {
        var getall = await axios.get(url + "&pid=" + i);
        var post = getall.data.post;
        var format = ["jpeg", "jpg", "png"];
        for(let a of post) {
          for (let b of format) {
            if (a.file_url.indexOf(b) !== -1) data.push(a.file_url.replace(/\/\//g, '//').replace(/\//g, '/'));
          }
        }
      }
      return res.json({ count: data.length, data: data});
    } catch (error) { 
      return res.json({error : `${error}`});
    }
  }
};
