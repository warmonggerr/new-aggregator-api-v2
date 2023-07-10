const sourcesFromDb = (data) => {
    let items = []
    data.forEach((item) => {
        items.push(item.id)
    })
    return items;
}

const articlesFromDb = (sources, data) => {
    let results = []
    sources.forEach((newsId) => {
        console.log("source :: ", newsId)
        console.log(data)
        let articles = data.filter(function (article) {
            return article.source.id === newsId
        })
        console.log("source :: articles :: ", newsId, articles)
        for (const article of articles){
            results.push(article)
        }
    })
    return results
}

module.exports = {
    sourcesFromDb,
    articlesFromDb
}