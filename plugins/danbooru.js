const axios = require("axios")
module.exports = {
  name: "danbooru",
  run: async (req, res) => {
    var { query, limit } = req.query;
    if(!query) return res.json({error : "Thiếu query"});
    var gioihan = limit || "50"
    axios({
      method: 'get',
      url: 'https://danbooru.donmai.us/posts.json?tags='+ encodeURI(query).replace("%20", "_") +'&z=5&limit=' + gioihan,
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(async(body) =>{
      var data = []
      forEach(body.data, (element) =>{
        var url = element.large_file_url;
        var tags_string = element.tag_string;
        var file_ext = element.file_ext;
        data.push({url, tags_string, file_ext})
      })
      res.json(data)
    })
  }
};
function forEach(array, action){
  for(var i = 0; i < array.length; i++)
    action(array[i]);
}
