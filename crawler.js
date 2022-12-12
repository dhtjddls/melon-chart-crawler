// module
const axios = require('axios');
const cheerio = require('cheerio');

function crawler() {
    const url = 'https://news.naver.com/main/main.naver?mode=LSD&mid=shm&sid1=105';

    axios.get(url)
      .then(res => {
            if(res.status == 200){

                // 크롤링
                let crawledNews = [];
                // [{title: "...", summary: "...", img: "..."}, {}, {}]

                // res.data에 있는 tag를 cheerio로 검생하여 변수에 담기
                const $ = cheerio.load(res.data);
                const $newsList = $('#main_content > div > div._persist > div > div');

                $newsList.each(function (i) {
                  crawledNews[i] = {
                    title: $(this).find('#main_content > div > div._persist > div > div > div.cluster_body > ul > li > div.cluster_text > a').text(),
                    img: $(this).find('#main_content > div > div._persist > div > div > div.cluster_body > ul > li > div.cluster_thumb > div > a > img').attr('src'),

                  };
                });
                console.log(crawledNews);
            }
        });
}

crawler();