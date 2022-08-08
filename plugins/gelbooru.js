const axios = require("axios");
module.exports = {
  name: "gelbooru",
  run: async (req, res) => {
    var { search } = req.query;
    if(!search) return res.json({error : "Dcm vui lòng nhập từ khóa tìm kiếm!"});
    try {
      var url = "https://gelbooru.com/index.php?page=dapi&s=post&q=index&json=1&tags=" + encodeURI(search).replace("%20", "_");
      const get = await axios.get(url);
      var post = get.data.post;
      var data = [];
      var format = ["jpeg", "jpg", "png"];
      for(let a of post) {
        for (let b of format) {
          if (a.file_url.indexOf(b) !== -1) data.push(a.file_url.replace(/\/\//g, '//').replace(/\//g, '/'));
        }
      }
      return res.json({ count: data.length, data: data});
    } catch (error) { 
      return res.json({error : `${error}`});
    }
  }
};
