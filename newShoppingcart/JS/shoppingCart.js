	const shoppingCart=new Map();

	function goodsLoad() {
	var list = "";
	 for (var i = 0; i < goodsData.length; i++) {
		list += "<td id='goodstd'><img id='goodstd_img' src='"
		+goodsData[i].src+"' > <p id='Name'>"+goodsData[i].Name
		+"</p> <p style='color: #ff9933' id='goodstd_Price'>￥"
		+goodsData[i].Price
		+"</p> <button id='goodstd_btn' style='color:orange;' type='button' onclick='addshoppingCart(\""
		+goodsData[i].id+"\","
		+goodsData[i].Price+",\""
		+goodsData[i].Name+"\",\""
		+goodsData[i].src+"\")'>购买</button></td>"
	}
	document.getElementById("goods").innerHTML = list;
	
	showshoppingCart();
	
}

	
	function addshoppingCart(id, price, name, image) {
	    if (shoppingCart.has(id)) {
	        let item = shoppingCart.get(id);
	        item.quantity += 1;
	        shoppingCart.set(id, item);
	    } else {
	        let item = {
	            name: name,
	            price: price,
	            quantity: 1,
	            image: image
	        };
	        shoppingCart.set(id, item);
	    }
		updateSessionStorage()
	    showshoppingCart();
	}
	
	function add(id) {
	    let item = shoppingCart.get(id);
	    item.quantity += 1;
	    shoppingCart.set(id, item);
		updateSessionStorage();
		showshoppingCart();
	}
	
	function reduce(id) {
	    let item = shoppingCart.get(id);
	    if (item.quantity > 1) {
	        item.quantity -= 1;
	        shoppingCart.set(id, item);
	    } else {
	        shoppingCart.delete(id);
	    }
		updateSessionStorage();
		showshoppingCart()
	}

	function loadSessionStorage(){
		 let data = window.sessionStorage.getItem('shoppingCart');
		   if (data) {
		         let out = JSON.parse(data);
		         // shoppingCart.clear();
		         for (let [id, item] of out) {
		             shoppingCart.set(id, item);
		         }
	}
	}
	
	function showshoppingCart() {
    let table = "";
    let total = 0;
	

	loadSessionStorage();
	
    for (let [id, item] of shoppingCart) {
        let subTotal = item.price * item.quantity;
        total += subTotal;
        table += "<tr><td><img src='" + item.image + "'><br><span>"+item.name+"</span></td>" 
		+ "<td>" 
		+ item.price 
		+ "</td><td><button onclick='reduce(\"" + id + "\")'>-</button>" 
		+ item.quantity 
		+ "<button onclick='add(\"" + id + "\")'>+</button></td><td>" 
		+ subTotal 
		+ "</td><td><button onclick='deleteItem(\"" + id + "\")'>删除</button></td></tr>";
    }
	

    document.getElementById("shoppingCart").innerHTML = table;
    document.getElementById("total").innerHTML = total;
	let amount = calculateTotalQuantity();
	document.getElementById("amount").innerHTML = amount;
	
}


	function deleteItem(id) {
    shoppingCart.delete(id);
	updateSessionStorage();
    showshoppingCart();
}

	function calculateTotalQuantity() {
    let amount = 0;
    for (let [id, item] of shoppingCart) {
        amount += item.quantity;
    }
    return amount;
}


	function updateSessionStorage() {
    window.sessionStorage.setItem('shoppingCart', JSON.stringify(Array.from(shoppingCart.entries())));
}
	// console.log(window.sessionStorage.getItem('shoppingCart'));
	