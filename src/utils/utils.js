export const calculateDateDiffInDays = (d1) => {
    var d = new Date();
    d1 = new Date(d1);

    var t2 = d.getTime();
    var t1 = d1.getTime();

    return parseInt((t2-t1)/(24*3600*1000));
}

export const sortJobSync = (searchObject, list) => {
    let returnedList = list;
    const {keywords, city, location} = searchObject;

    if (keywords) {
        returnedList = [...sortJobsByTitle(keywords, returnedList) ,...sortJobsByDesc(keywords, returnedList)];
        var resArr = [];
        returnedList.forEach(function(item){
        var i = resArr.findIndex(x => x.id === item.id);
            if(i <= -1){
                resArr.push(item);
            }
        });
        returnedList = resArr;
    }

    if (city && !location) {
        returnedList = sortJobsByCity(city, returnedList);
    }

    if (location) {
        returnedList = sortJobsByCity(location, returnedList);
    }

    return returnedList;
}

const sortJobsByTitle = (title, list) => {
    let returnedList = list;

    returnedList = returnedList.filter(item => {
        return item.title.toLowerCase().includes(title.toLowerCase());
    })

    return returnedList;
}

const sortJobsByDesc = (desc, list) => {
    let returnedList = list;

    returnedList = returnedList.filter(item => {
        return item.description.toLowerCase().includes(desc.toLowerCase());
    })

    return returnedList;
}

const sortJobsByCity = (city, list) => {
    let returnedList = list;

    returnedList = returnedList.filter(item => {
        return item.location.toLowerCase().includes(city.toLowerCase());
    })

    return returnedList;
}

export const paginate = (
    totalItems,
    currentPage = 1,
    pageSize = 10,
    maxPages = 10
) => {
    // calculate total pages
    let totalPages = Math.ceil(totalItems / pageSize);

    // ensure current page isn't out of range
    if (currentPage < 1) {
        currentPage = 1;
    } else if (currentPage > totalPages) {
        currentPage = totalPages;
    }

    let startPage, endPage;
    if (totalPages <= maxPages) {
        // total pages less than max so show all pages
        startPage = 1;
        endPage = totalPages;
    } else {
        // total pages more than max so calculate start and end pages
        let maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
        let maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;
        if (currentPage <= maxPagesBeforeCurrentPage) {
            // current page near the start
            startPage = 1;
            endPage = maxPages;
        } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
            // current page near the end
            startPage = totalPages - maxPages + 1;
            endPage = totalPages;
        } else {
            // current page somewhere in the middle
            startPage = currentPage - maxPagesBeforeCurrentPage;
            endPage = currentPage + maxPagesAfterCurrentPage;
        }
    }

    // calculate start and end item indexes
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);

    // return object with all pager properties required by the view
    return {
        totalItems: totalItems,
        currentPage: currentPage,
        pageSize: pageSize,
        totalPages: totalPages,
        startPage: startPage,
        endPage: endPage,
        startIndex: startIndex,
        endIndex: endIndex,
        pages: pages
    };
}
