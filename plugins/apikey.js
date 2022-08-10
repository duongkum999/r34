var apikey = [
  "8adb5ee609123e2289db00d46dbfb27a5a6977429d335eda308b899fe5acba2e",
  "382d29d670374903684f737760014bd2ce8f48bd8e751655ec970e2e0df8885d"
];

module.exports = {
  name: "yandex",
  run: async (req, res) => {
    const axios = require("axios");
    var { search } = req.query;
    if(!search) return res.json({error : "Dcm vui lòng nhập từ khóa tìm kiếm!"});
    try {
      var url = "https://serpapi.com/search.json?engine=yandex_images&text=" + encodeURI(search) + "&api_key=" + apikey[Math.floor(Math.random()*apikey.length)];
      const get = (await axios.get(url)).data;
      if ('error' in get) return res.json({ count: 0, data: []});
      const endpoint = get.search_metadata.json_endpoint;
      var check = 1;
      var data = [];
      for( var image of get.images_results) { data.push(image.original); }
      await getlink(get.serpapi_pagination.next);

       async function getlink(urlpage) {
        var getnextpage = (await axios.get(urlpage)).data;
        for(var image of getnextpage.images_results) { data.push(image.original); }
        if (urlpage !== endpoint && check < 11) {
          check++;
          getlink(getnextpage.serpapi_pagination.next);
        } else return;
      }
      return res.json({ search: search, count: data.length, data: data});
    } catch (error) { return res.json({error : `${error}`}); }
  }
};
var apikey = [

  "8adb5ee609123e2289db00d46dbfb27a5a6977429d335eda308b899fe5acba2e",

  "382d29d670374903684f737760014bd2ce8f48bd8e751655ec970e2e0df8885d"

];

module.exports = {

  name: "yandex",

  run: async (req, res) => {

    const axios = require("axios");

    var { search } = req.query;

    if(!search) return res.json({error : "Dcm vui lòng nhập từ khóa tìm kiếm!"});

    try {

      var key = "&api_key=" + apikey[Math.floor(Math.random()*apikey.length)];

      var url = "https://serpapi.com/search.json?engine=yandex_images&text=" + search + key;

      const get = (await axios.get(url)).data;

      if ('error' in get) return res.json({ search: search, count: 0, data: []});

      const endpoint = get.search_metadata.json_endpoint + key;

      var nextpage = get.serpapi_pagination.next + key;

      for( var image of get.images_results) { data.push(image.original); }

      var check = 1;

      var data = [];

      var urlpage = "";

      while (urlpage !== endpoint && check <= 10) {

        var getnextpage = (await axios.get(nextpage)).data;

        for(var image of getnextpage.images_results) { data.push(image.original); }

        check++;

        urlpage = nextpage;

        nextpage = getnextpage.serpapi_pagination.next + key;

	  }

      return res.json({ search: search, count: data.length, data: data});

    } catch (error) { return res.json({error : `${error}`}); }

  }

};
