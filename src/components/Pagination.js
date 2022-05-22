
const Pagination = {
    render: (href, range) => {
        let script = "";
        let hrefArr = href.split("/");
        for (let index = 1; index <= range; index++) {
            let link = [hrefArr[0], hrefArr[1], index, hrefArr[3]].join("/");
            script += `<a class="pagination" href="/${link}" value=${index}><span>${index}</span></a>`;
        }

        return script;
    }
}

export default Pagination;