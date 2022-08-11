var apikey = [
  "8adb5ee609123e2289db00d46dbfb27a5a6977429d335eda308b899fe5acba2e",
  "e7f4b31ecf50732878461b4453a2aa6c7a773cc68b60010506be80e3c8291969",
  "803898902f62a7494ba00c3fede8fb622137b62d27e26b4dd50a703660add90c"
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
      if ('error' in get) return res.json({ search: search, error: get.error });
      const endpoint = get.search_metadata.json_endpoint + key;
      var nextpage = get.serpapi_pagination.next + key;
      for (const image of get.images_results) {
        data.push(image.original);
      }
      var check = 1;
      var data = [];
      var urlpage = "";
      while (urlpage !== endpoint && check <= 10) {
        var getnextpage = (await axios.get(nextpage)).data;
        for (const images of getnextpage.images_results) {
          data.push(images.original);
        }
        check++;
        urlpage = nextpage;
        nextpage = getnextpage.serpapi_pagination.next + key;
      }
      return res.json({ search: search, count: data.length, data: data});
    } catch (error) { return res.json({ search: search, error: `${error}`}); }
  }
};
