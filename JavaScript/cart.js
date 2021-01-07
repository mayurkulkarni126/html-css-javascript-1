var productList = [];
window.onload = function () {
    setDefaultValues();
}

function setDefaultValues() {
    prepareHomeMenu();
}

function prepareHomeMenu() {
    // show active class and the show/hide section according to menu.
    var menu = document.getElementById('homeMenu');
    menu.classList.add('active');

    var addProductMenu = document.getElementById('addProductMenu');
    addProductMenu.classList.remove('active');

    var listSection = document.getElementById('listSection');
    listSection.style.display = 'block';

    var addSection = document.getElementById('addSection');
    addSection.style.display = 'none';

    if (productList.length) {
        document.getElementById('no-product').style.display = 'none';
    } else {
        document.getElementById('no-product').style.display = 'block';
    }
}

function prepareAddProductMenu() {
    // show active class and the show/hide section according to menu.
    var addProductMenu = document.getElementById('addProductMenu');
    addProductMenu.classList.add('active');

    var homeMenu = document.getElementById('homeMenu');
    homeMenu.classList.remove('active');

    var addSection = document.getElementById('addSection');
    addSection.style.display = 'block';

    var listSection = document.getElementById('listSection');
    listSection.style.display = 'none';

    var form = document.querySelector('form');
    form.addEventListener('keyup', function () {
        var productName = document.getElementById('productName').value;
        var price = document.getElementById('price').value;
        var description = document.getElementById('description').value;

        var btnElement = document.getElementById('submitBtn');
        if (productName !== '' && price !== '' && description !== '') {
            btnElement.removeAttribute('disabled');
            btnElement.classList.add('btn-success');
            btnElement.classList.remove('btn-secondary');
        } else {
            btnElement.setAttribute('disabled', '');
            btnElement.classList.add('btn-secondary');
            btnElement.classList.remove('btn-success');
        }
    });
}

function addProduct() {
    // get values
    var productDetails = {
        productId: Math.round(Math.random() * 100),
        productName: document.getElementById('productName').value,
        price: document.getElementById('price').value,
        description: document.getElementById('description').value,
    };
    productList.push(productDetails);
    // push in last row
    document.getElementById('listRow').innerHTML += createCardElement(productDetails);
    clearForm();
    alert('Product Added Successfully!');
    prepareHomeMenu();
}

function createCardElement(productDetails) {
    return '<div class="col-4 mb-3" id="card-' + productDetails.productId + '">\n' +
        '      <div class="card">\n' +
        '           <img src="image-placeholder.jpg" class="card-img-top" alt="">\n' +
        '                 <div class="card-body p-3">\n' +
        '                       <h5 class="card-title text-primary mb-2">' + productDetails.productName + '</h5>\n' +
        '                        <h6 class="mb-2">$ ' + productDetails.price + '</h6>\n' +
        '                        <p class="card-text mb-2">' + productDetails.description + '</p>\n' +
        '                        <button type="button" onclick="deleteProduct(' + productDetails.productId + ')" class="btn btn-sm btn-danger">Delete Product</a></button>\n' +
        '                  </div>\n' +
        '      </div>\n' +
        '</div>'
}

function deleteProduct(productId) {
    var index = productList.findIndex(p => p.productId === productId);
    if (index > -1) {
        productList.splice(index, 1);
    }
    if (!productList.length) {
        document.getElementById('no-product').style.display = 'block';
    }
    var cardId = 'card-' + productId;
    document.getElementById(cardId).style.display = 'none';
}

function clearForm() {
    document.getElementById('productName').value = '';
    document.getElementById('price').value = '';
    document.getElementById('description').value = '';

    // set button to disabled by default
    var btnElement = document.getElementById('submitBtn');
    btnElement.setAttribute('disabled', '');
    btnElement.classList.add('btn-secondary');
    btnElement.classList.remove('btn-success');
}
