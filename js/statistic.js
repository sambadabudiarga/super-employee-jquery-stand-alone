var Emp_Countries = {};
var Emp_Datasets;

function loadChart() {
    var Country_No_Data = JSON.parse(JSON.stringify(countries));

    Emp_Datasets = {};

    Object.keys(countries).forEach(function(elm, idx) {
        Emp_Countries[elm] = countries[elm].name;
        Emp_Datasets[countries[elm].name] = {
            "label": countries[elm].name,
            "fill": false,
            "spanGaps": true,
            "borderColor": "rgba(" + parseInt(Math.random() * 200) + ", " + parseInt(Math.random() * 200) + ", " + parseInt(Math.random() * 200) + ", " + parseFloat(Math.random() * 1) + ")",
            "pointBorderColor": "rgba(" + parseInt(Math.random() * 200) + ", " + parseInt(Math.random() * 200) + ", " + parseInt(Math.random() * 200) + ", " + parseFloat(Math.random() * 1) + ")",
            "pointBackgroundColor": "rgba(" + parseInt(Math.random() * 200) + ", " + parseInt(Math.random() * 200) + ", " + parseInt(Math.random() * 200) + ", " + parseFloat(Math.random() * 1) + ")",
            "pointHoverBackgroundColor": "#fff",
            "pointHoverBorderColor": "rgba(" + parseInt(Math.random() * 200) + ", " + parseInt(Math.random() * 200) + ", " + parseInt(Math.random() * 200) + ", " + parseFloat(Math.random() * 1) + ")",
            "data": []
        };
    })

    // set data
    Object.values(employees).forEach(function(elm, idx) {
        if (typeof(Country_No_Data[elm.country_id]) != 'undefined') delete Country_No_Data[elm.country_id]

        var y_count = 1;

        var data_exists = Emp_Datasets[countries[elm.country_id].name].data.find(function(elm_2) {
            return elm_2.x == elm.age;
        });

        // check if value exists
        if (typeof(data_exists) != 'undefined') {
            console.log('Ketemu sama di negara ' + countries[elm.country_id].name +',umur: ' + elm.age);
            data_exists.y++;
        } else {
            Emp_Datasets[countries[elm.country_id].name].data.push({'x': elm.age, 'y': 1});
        }
    });

    // remove country without data
    Object.values(Country_No_Data).forEach(function(elm, idx) {
        delete Emp_Datasets[elm.name];
    });

    var ctx = document.getElementById("lineChart").getContext("2d");
    window.myLine = new Chart(ctx, {
        type: 'scatter',
        showLine: true,
        data: {
            labels: Emp_Countries,
            datasets: Emp_Datasets,
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                    }
                }]
            },
            spanGaps: true,
            legend: {
                display: true,
                position: 'top',
            },
            tooltips: {
                callbacks: {
                    label: function(tooltipItem, data) {
                        return tooltipItem.datasetIndex + ' (Age ' + tooltipItem.xLabel + ') : ' + tooltipItem.yLabel;
                    }
                }
            },
            title: {
                display: true,
                text: 'Employee by Country and Age'
            }
        }
    });
}

function initJSstatistic() {
    getHeaderInfo();
    loadChart();
}

function getHeaderInfo() {
    var avg_age = 0;
    var sum_age = 0;
    var count_employee = Object.keys(employees).length;

    Object.values(employees).forEach(function(elm, idx) {
        sum_age += parseInt(elm.age);
    });

    if (count_employee == 0) avg_age = 0;
    else {
        avg_age = sum_age/count_employee;
    }

    $("#employee_count").text(count_employee);
    $("#employee_avg_age").text(avg_age);
}

initJSstatistic();