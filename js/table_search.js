$(document).on('input', 'input[name=searchData]', function() {
    var searchValue = this.value;
    searchData(searchValue);
});

function searchData(searchValue) {
    // sortData()
    var filteredEmployees = Object.values(employees).filter(function(elm,idx) {
        if (elm.first_name.toLowerCase().indexOf(searchValue) >= 0) {
            return true;
        }

        if (elm.last_name.toLowerCase().indexOf(searchValue) >= 0) {
            return true;
        }

        if (elm.age.toString().toLowerCase().indexOf(searchValue) >= 0) {
            return true;
        }

        if (countries[elm.country_id].name.toLowerCase().indexOf(searchValue) >= 0) {
            return true;
        }

        return false;
    });


    renderEmployees(filteredEmployees);
}