const axios = require("axios")
module.exports = {
  name: "gelbooru",
  run: async (req, res) => {
    var { search } = req.query;
    if(!search) return res.json({error : "Dcm vui lòng nhập từ khóa tìm kiếm!"});
    var url = "https://gelbooru.com/index.php?page=dapi&s=post&q=index&json=1&tags=" + encodeURI(search).replace("%20", "_");
    const res = await axios.get(url);
    var post = res.data.post;
    var data = [];
    for(let a of post) {
      data.push(a.file_url.replace(/\/\//g, '//').replace(/\//g, '/'));
    }
    res.json(data);
  }
};
