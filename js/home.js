
var employees;

function loadEmployees() {
    // check if exists in local storage
    if (typeof(localStorage.employees) == 'undefined') {
        // if not exist yet get from dummy data and save it to local storage
        $.get('js/employees_data.json')
        .done(function(data) {
            localStorage.employees = JSON.stringify(data);
            loadEmployees();
        });
    } else {
        // load from local storage
        employees = JSON.parse(localStorage.employees);
        renderEmployees();
    }
}

function renderEmployees() {
    var the_table = $('table#data_list').find('tbody');

    // remove existing rows
    the_table.find('tr').remove();

    Object.values(employees).forEach(function(elm, idx) {
        the_table.append(`
            <tr>
                <td>` + elm.first_name + ` ` + elm.last_name + `</td>
                <td>` + countries[elm.country_id].name + `</td>
                <td>` + elm.age + `</td>
            </tr>
        `);
    });
}

function addButtonToggle() {
    // hide form view
    document.getElementsByClassName('form_view')[0].classList.add('hidden')

    // show form add
    document.getElementById('form_add').parentNode.classList.remove('hidden')
}

function loadEmployee() {
    // hide form view
    document.getElementsByClassName('form_view')[0].classList.remove('hidden')

    // show form add
    document.getElementById('form_add').parentNode.classList.add('hidden')
}

$(document).ready(function() {
    loadEmployees();
});