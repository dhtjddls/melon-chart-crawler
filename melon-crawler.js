// module
const axios = require('axios');
const cheerio = require('cheerio');

function meloncrawler() {
    const url = `https://www.melon.com/chart/index.htm`;

    axios.get(url)
      .then(res => {
            if(res.status == 200){

                // 크롤링
                let crawledMusic = [];
                // [{title: "...", artist: "...", img: "..."}, {}, {}]

                // res.data에 있는 tag를 cheerio로 검생하여 변수에 담기
                const $ = cheerio.load(res.data);
                const $musicList = $('table > tbody > tr');

                $musicList.each(function (i) {
                  crawledMusic[i] = {
                    title: $(this).find('div > div > div.ellipsis.rank01 > span > a').text(),
                    artist: $(this).find('div > div > div.ellipsis.rank02 > a').text(),
                    img: $(this).find('div > a > img').attr('src'),

                  };
                });
                console.log(crawledMusic);
            }
        });
}

meloncrawler();