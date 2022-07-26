module.exports = {
	name: "gelbooru",
	run: async (req, res) => {
		try {
			var _axios = require("axios");
			var _cheerio = require("cheerio");
			var	t = req.query.name;
			if (t) {
				var exemptJson = await _axios.get("https://gelbooru.com//index.php?page=dapi&s=post&q=index&limit=1000&pid=0&tags=" + encodeURIComponent(t));
				var $ = _cheerio.load(exemptJson.data);
				var posts = $("posts").find("post");
				/** @type {!Array} */
				var self = [];
				/** @type {number} */
				var i = 0;
				for (; i < posts.length; i++) {
				  var fileUrl = $(posts[i]).attr("file_url");
				  var type = $(posts[i]).attr("file_url").substring($(posts[i]).attr("file_url").lastIndexOf(".") + 1);
				  var tagArr = $(posts[i]).attr("tags");
				  var _preview_url = $(posts[i]).attr("preview_url");
				  self.push({
					tags : tagArr,
					url : fileUrl,
					preview_url : _preview_url,
					type : type
				  });
				}
				res.json(self)
			} else res.json({
				msg: "Invaild link"
			})
		} catch (e) {
			console.log(e)
			res.json({
				msg: "Da xay ra loi"
			})
		}
	}
};
