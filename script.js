$(".exval").keypress(function (event) {
    event = event || window.event;
    if (event.charCode && event.charCode != 0 && event.charCode != 46 && (event.charCode < 48 || event.charCode > 57))
        return false;
});

// ______________________________

fetch('https://api.monobank.ua/bank/currency')
    .then(function (resp) { return resp.json() })
    .then(function (data) {
        console.log(data);
        document.querySelector('.usd_buy').textContent = data[0].rateBuy;
        document.querySelector('.usd_sell').textContent = data[0].rateSell;
        document.querySelector('.eur_buy').textContent = data[1].rateBuy;
        document.querySelector('.eur_sell').textContent = data[1].rateSell;
    })
    .catch(function () {

    })

// ______________________________
document.getElementById('input1').value = 100;
document.getElementById('input2').value = 100;

document.getElementById('input1').addEventListener('input', calc);
document.getElementById('input2').addEventListener('input', calc_rev);
document.getElementById('exchange1').addEventListener('change', calc);
document.getElementById('exchange2').addEventListener('change', calc_rev);

function calc() {
    let c = {
        'USD': document.getElementById('usd_sell').textContent,
        'EUR': document.getElementById('eur_sell').textContent
    };
    let temp = 0;
    let val1 = document.getElementById('input1').value;
    let cur1 = document.getElementById('exchange1').value;
    let cur2 = document.getElementById('exchange2').value;
    if (cur1 == cur2) {
        document.getElementById('input2').value = document.getElementById('input1').value;
    }
    else if (((cur1 == 'USD') && (cur2 == 'EUR')) || ((cur1 == 'EUR') && (cur2 == 'USD'))) {
        temp = val1 * c[cur1];
        document.getElementById('input2').value = Math.ceil((temp / c[cur2]) * 100) / 100;
    }
    else if (cur1 == 'UAH') {
        document.getElementById('input2').value = Math.ceil((val1 / c[cur2]) * 100) / 100;
    }
    else {
        document.getElementById('input2').value = Math.ceil((val1 * c[cur1]) * 100) / 100;
    }
}

function calc_rev() {
    let c = {
        'USD': document.getElementById('usd_sell').textContent,
        'EUR': document.getElementById('eur_sell').textContent
    };
    let temp = 0;
    let val2 = document.getElementById('input2').value;
    let cur1 = document.getElementById('exchange1').value;
    let cur2 = document.getElementById('exchange2').value;
    if (cur1 == cur2) {
        document.getElementById('input1').value = document.getElementById('input2').value;
    }
    else if (((cur1 == 'USD') && (cur2 == 'EUR')) || ((cur1 == 'EUR') && (cur2 == 'USD'))) {
        temp = val2 * c[cur2];
        document.getElementById('input1').value = Math.ceil((temp / c[cur1]) * 100) / 100;
    }
    else if (cur2 == 'UAH') {
        document.getElementById('input1').value = Math.ceil((val2 / c[cur1]) * 100) / 100;
    }
    else {
        document.getElementById('input1').value = Math.ceil((val2 * c[cur2]) * 100) / 100;
    }
}