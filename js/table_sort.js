var active_column_sort;
var active_sort_dir = 'asc';

$(document).on('click', 'table#data_list thead th', function() {
    var header = $('table#data_list').find('th');
    var fa_sort_dir = 'fa-sort-amount-up';

    // negate sort type if it is same column
    if (typeof(active_column_sort) != 'undefined' && active_column_sort == this.cellIndex) {
        active_sort_dir = (active_sort_dir == 'asc') ? 'desc' : 'asc';
    } else {
        // remove currently active sort if different column
        header.find('i.sort_dir').remove();
    }
    
    // set sort
    active_column_sort = this.cellIndex;

    if (active_sort_dir == 'desc') {
        fa_sort_dir = 'fa-sort-amount-down';
    }

    $(this).html(
        $(this).text() + 
        `<i class="sort_dir pull-right fa ` + fa_sort_dir + `"></i>`
    );

    var key_name;

    switch(active_column_sort) {
        case 1:
            key_name = 'country';
            break;
        case 2:
            key_name = 'age';
            break;
        case 0:
        default:
            key_name = 'name';
            break;
    }

    sortData(key_name);
});

function sortData(key_name) {
    var sorted_employees = Object.values(employees).sort(function(a, b) {
        switch(key_name) {
            case 'name':
                if (active_sort_dir == 'desc') 
                    return b.first_name + ' ' + b.last_name == a.first_name + ' ' + a.last_name ? 0 : +(b.first_name + ' ' + b.last_name > a.first_name + ' ' + a.last_name) || -1;

                return a.first_name + ' ' + a.last_name == b.first_name + ' ' + b.last_name ? 0 : +(a.first_name + ' ' + a.last_name > b.first_name + ' ' + b.last_name) || -1;
                break;
            case 'country':
                if (active_sort_dir == 'desc') 
                    return countries[b.country_id].name == countries[a.country_id].name ? 0 : +(countries[b.country_id].name > countries[a.country_id].name) || -1;

                return countries[a.country_id].name == countries[b.country_id].name ? 0 : +(countries[a.country_id].name > countries[b.country_id].name) || -1;
                break;
            case 'age':
                if (active_sort_dir == 'desc') return b.age - a.age;

                return a.age - b.age;
                break;
        }
        // return a.first_name == b.first_name ? 0 : +(a.first_name > b.first_name) || -1;

        // if (a.first_name < b.first_name) {
        //     return -1;
        // }
        // if (a.first_name > b.first_name) {
        //     return 1;
        // }
        // return 0;
    });

    renderEmployees(sorted_employees);
}