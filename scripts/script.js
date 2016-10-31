var etsyKey = "0huv60c7gbl3v9unm8dt7u2t"

//https://openapi.etsy.com/v2/listings/active.js?includes=Images,api_key=6f60tk5ueotsm8pbgzucea4h

// sample url https://openapi.etsy.com/v2/listings/active?api_key=0huv60c7gbl3v9unm8dt7u2t

// sample url https://openapi.etsy.com/v2/listings/active?api_key=0huv60c7gbl3v9unm8dt7u2t&keywords=apple


//Model


var ProductCollection = Backbone.Collection.extend({  
	url: "https://openapi.etsy.com/v2/listings/active", 
	parse: function(rawResponse){ 
		var parsedResponse = rawResponse.results
		return parsedResponse; 
	}
})





//Views

var searchNode = document.querySelector("input")

var searchForShit = function(e) {
	if(e.keyCode === 13) {
		location.hash = "search/" + e.target.value
		e.target.value = ""
	}
}

searchNode.addEventListener("keydown", searchForShit)

///listings/:listing_id/images/:li
var ListView = Backbone.View.extend({
	el: document.querySelector(".productDisplay"),
	_render: function(){ 
		var products = this.collection.models
		console.log(products)
		var htmlString = ""
		for(var i = 0; i < products.length; i++){
			var productModel = products[i]
			var imgUrl = productModel.attributes.MainImage.url_75x75
			htmlString += "<a href = '#details' > <img src ='" + imgUrl + "'/> </a>"
			console.log(productModel)
			
		}
		this.el.innerHTML = htmlString

	},
	initialize: function(){
		console.log("making a new view")
		this.collection.on("sync",this._render.bind(this))
	}
})





//CONTROLLER

var Controller = Backbone.Router.extend({ 
	routes: { 
 		"home": "handleHome", 
		"search/:term": "handleSearch",
		"*default": "handleDefault",
		"details": "handleDetails"
	},
	handleHome: function(){
		
		var productCollection = new ProductCollection(),
			view = new ListView({
				collection: productCollection
			})

		productCollection.fetch({
			data: {
				"api_key": etsyKey,
				"includes": "MainImage,shop"

			}
		})
	},
	handleSearch: function(term){ 

		var productCollection = new ProductCollection(), 
			view = new ListView({
				collection: productCollection
			})

		productCollection.fetch({
			datatype: 'jsonp',
			data: {

				"api_key": etsyKey,
				"keywords": term,
				"includes": "MainImage,shop"
			}
		})
	},

	handleDetails: function(term) {
		var productCollection = new ProductCollection(),
		view = new ListView({
			collection: productModel
		})
		productCollection.fetch({
			datatype: 'jsonp',
			data: {

				"api_key": etsyKey,
				"keywords": term,
				"includes": "MainImage,shop"
			}
		})
	}
	
	handleDefault: function(){ 
		location.hash = "home" 
	},
	initialize: function(){ 
		Backbone.history.start()
	}
})



var controller = new Controller()