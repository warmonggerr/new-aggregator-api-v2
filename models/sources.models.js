const sourcesFromDb = (data) => {
    let items = []
    data.forEach((item) => {
        items.push(item.id)
    })
    return items;
}

module.exports = {
    sourcesFromDb
}