var employees;
var selectedEmployeeId;

function loadEmployees() {
    // check if exists in local storage
    if (typeof(localStorage.employees) == 'undefined') {
        // if not exist yet get from dummy data and save it to local storage
        $.get('js/employees_data.json')
        .done(function(data) {
            syncModelToLocalStorage(data);
            loadEmployees();
        });
    } else {
        // load from local storage
        employees = JSON.parse(localStorage.employees);
        renderEmployees();
    }
}

function renderEmployees(custom_employees) {
    var the_table = $('table#data_list').find('tbody');

    // remove existing rows
    the_table.find('tr').remove();

    if (typeof(custom_employees) == 'undefined') {
        custom_employees = Object.values(employees);
    }

    custom_employees = searchData(custom_employees);
    custom_employees = sortData(custom_employees);

    custom_employees.forEach(function(elm, idx) {
        the_table.append(`
            <tr data-id="` + elm.id + `" onclick="loadEmployee(this)" style="cursor:pointer;">
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

function loadEmployee(row) {
    selectedEmployeeId = row.dataset.id;
    var employee = employees[selectedEmployeeId];

    // load data
    $('label[name=first_name_val]').text(employee.first_name);
    $('label[name=last_name_val]').text(employee.last_name);
    $('label[name=age_val]').text(employee.age);
    $('label[name=country_val]').text(countries[employee.country_id].name);

    // show form view
    document.getElementsByClassName('form_view')[0].classList.remove('hidden')

    // hide form add
    document.getElementById('form_add').parentNode.classList.add('hidden')
}

function saveEmployee() {
    var first_name = $('input[name=first_name]').val();
    var last_name = $('input[name=last_name]').val();
    var age = $('input[name=age]').val();
    var country_id = $('select[name=country_id]').val();

    employee = {
        first_name: first_name,
        last_name: last_name,
        age: age,
        country_id: country_id,
    }

    // validate input
    if (!validateEmployee(employee)) {
        return;
    }

    // save to local storage and reload data
    if (selectedEmployeeId == null) {
        // generate random id
        employeeId = parseInt(Math.random() * 100000);

        // check if there is any duplicate
        while(typeof(employees[employeeId]) != 'undefined') {
            employeeId = parseInt(Math.random() * 100000);
        }

        employee.id = employeeId;
    } else {
        employeeId = selectedEmployeeId;
    }

    employees[employeeId] = employee;
    syncModelToLocalStorage()

    clearEmployee();
    loadEmployees();
}

function validateEmployee(employee) {
    var isValid = true;

    if (employee.first_name.trim().length == 0) {
        alert('Input first name');
        isValid = false;
    }

    if (employee.last_name.trim().length == 0) {
        alert('Input last name');
        isValid = false;
    }

    if (isNaN(employee.age) || employee.age.length == 0) {
        alert('Age must be a number');
        isValid = false;
    }

    if (parseFloat(employee.age) < 17) {
        alert('At least 17yo to work here');
        isValid = false;
    }

    if (typeof(employee.country_id) == 'undefined' || employee.country_id.trim().length == 0) {
        alert('Select country');
        isValid = false;
    }

    return isValid;
}

function clearEmployee() {
    $('input[name=first_name]').val("");
    $('input[name=last_name]').val("");
    $('input[name=age]').val("");
    $('select[name=country_id]').val("");
}

function editEmployee() {
    clearEmployee();

    var employee = employees[selectedEmployeeId];
    $('input[name=first_name]').val(employee.first_name);
    $('input[name=last_name]').val(employee.last_name);
    $('input[name=age]').val(employee.age);
    $('select[name=country_id]').val(employee.country_id);

    addButtonToggle();
}

function deleteEmployee() {
    if (confirm('Delete this employee?')) {
        delete employees[selectedEmployeeId];
        selectedEmployeeId = null;

        syncModelToLocalStorage()

        loadEmployees();
    }
}

function syncModelToLocalStorage(data) {
    if (typeof(data) == 'undefined') {
        localStorage.employees = JSON.stringify(employees);
    } else {
        localStorage.employees = JSON.stringify(data);
    }
}

function initJShome() {
    loadEmployees();
}

$(document).on('submit', 'form#form_add', function(e) {
    saveEmployee();
    e.preventDefault();
    return false;
});

$('a.btn_add').click(function() {
    selectedEmployeeId = null;

    addButtonToggle();
    return false;
})

$('button.btn_edit').click(function() {
    editEmployee();
});

$('button.btn_delete').click(function() {
    deleteEmployee();
});

initJShome();