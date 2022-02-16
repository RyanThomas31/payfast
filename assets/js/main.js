let islands_array = [
    { "image": "./assets/images/tane.jpg","name": "Tane", "id": 1, count: 1, price: 500 },
    { "image": "./assets/images/musha.jpg","name": "Musha", "id": 2, count: 1, price: 300}
];

let cart = [];

function appendNode(parent, element) {
    parent.appendChild(element);
};

function getDiv(container) {
    return document.getElementById(container);
};

function createNode(node) {
    let element = document.createElement(node);
    return element;
};

function displayislands(islands, container) {
    let islands_container = getDiv(container);
    islands_container.innerHTML = '';

    for (let i = 0; i < islands.length; i++) {
        let island = islands[i];

        let island_node = createNode("div");
        island_node.setAttribute("id", island.id);

        if (island.count > 0) {
            island_node.innerHTML = `<img src="${island.image}" alt="${island.name}" width="250" height="125"> ${island.name} <span id="badge">${island.count}</span> <span id="price">R ${island.price}</span`;
            appendNode(islands_container, island_node);
        }
    }
}

displayislands(islands_array, "islands");

function addOrRemoveislandsFromCart(action) {
    let container = '';

    if (action == "add") {
        container = getDiv("islands");

        takeAction(container)
    }
    else if (action == "remove") {
        container = getDiv("cart");

        takeAction(container)
    };

    function takeAction(container) {
        container.addEventListener("click", function (event) {
            let island_id = event.target.id;

            if (island_id !== "islands" && island_id !== "badge") {
                let island = islands_array.filter(function (island) {
                    return island.id == island_id;
                })[0];

                let island_in_cart = cart.filter(function (island) {
                    return island.id == island_id;
                })[0];

                if (island_in_cart == undefined) {
                    cart.push(island);
                } else if (action == "add") {
                    island_in_cart.count++;
                    console.log(island_in_cart.count);
                } else if (action == "remove") {
                    island_in_cart.count--;
                    console.log(island_in_cart.count);
                }
                
                let islandTotal = island_in_cart.count * island.price;
                let totalAmount = islandTotal + islandTotal;
                if (islandTotal > 0) {
                    document.getElementById(total).innerHTML = totalAmount;
                }

                displayislands(cart, "cart");
            };
        });
    };
}

addOrRemoveislandsFromCart('add');
addOrRemoveislandsFromCart('remove');


