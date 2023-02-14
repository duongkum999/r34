const axios = require("axios")
module.exports = {
    name: "danbooru",
    run: async (req, res) => {
        var {
            query,
            l = 10,
        } = req.query;
        if (!query) return res.json({
            error: "Thiếu query"
        });
        //var gioihan = limit || "50"
        new Promise(async a=> {
            let resolve = [];
            for (let i = 0; i < l; i++)try {
                let danbooru = await axios({
                    method: 'get',
                    url: 'https://danbooru.donmai.us/posts.json?tags='+ encodeURI(query).replace("%20", "_") +'&z=5&limit=200' +`page=b${((Math.random()*6068868 - 60686)+60688)<<0}`,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                resolve.push(...danbooru.data);
            } catch(e) {
                continue;
            };
            a(resolve);
        })
        .then(data=>{
            let link = [];
            let map = data.map($=>$.large_file_url);
            
            map.forEach($=>link.includes($)?'':link.push($));
            res.send({
                count: link.length, data: link,
            })
        });

    }
};
