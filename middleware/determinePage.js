function determinePage(req, res, next){
    const totalPage = Math.floor(books.length / perPage ) + 1;
		 	if(page+ 2 > totalPage){
		 		res.locals.hide2 = true;
		 	}
		 	if( page ==1 && totalPage <=2 ){
		 		res.locals.hide1 = true;
		 		res.locals.trick1 = true;
			}
			if( page ==2 && totalPage <=2 ){
				res.locals.hide1 = true;
				res.locals.trick1 = false;
				res.locals.trick2 = true;
			}
			if(totalPage < 3){
				res.locals.circle3 = true;
			}
			if(totalPage >= 3 && page < totalPage){
				 	if(page == 1){
						res.locals.hide1 = true;
						res.locals.hide2 = true;
						res.locals.trick1 = true;
					}
					if(page == 2){
						res.locals.hide1 = true;
						res.locals.hide2 = true;
						res.locals.trick1 = false;
						res.locals.trick2 = true;
					 }

        }
        res.render('product.pug', {
            books: books.slice(start , end),
            total: books.length,
            page: page,
            totalPage: totalPage
        })
        
}

module.exports= determinePage;