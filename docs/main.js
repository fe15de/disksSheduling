
let chart;

function getNums() {
    const text = document.getElementById('sequence').value;
    var arr = text.split(',').map(Number);
    
    var nums = arr.map((_, index) => index * -1);

    arr = shortestSeekTimeFirst(arr, arr[0], arr.length);
    
    console.log(arr)

    if (chart) {
    chart.destroy();
    }

    const ctx = document.getElementById('myChart').getContext('2d');
    chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: nums,
        datasets: [{
        label: 'SEQUENCE SSTF',
        data: arr,
        borderWidth: 1,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        }]
    },
    options: {
        indexAxis: 'y',
        scales: {
        x: {
            beginAtZero: true,
            position: 'top'
        }
        }
    }
    });
}



function calculatedifference(request, head, diff, n) {
    for (let i = 0; i < n; i++) {
        diff[i][0] = Math.abs(head - request[i]);
    }
}
 
function findMIN(diff, n) {
    let index = -1;
    let minimum = 1e9;
 
    for (let i = 0; i < n; i++) {
        if (!diff[i][1] && minimum > diff[i][0]) {
            minimum = diff[i][0];
            index = i;
        }
    }
    return index;
}
 
function shortestSeekTimeFirst(request, head, n) {
    if (n == 0) {
        return;
    }
  
    let diff = new Array(n);
    for (let i = 0; i < n; i++) {
        diff[i] = new Array(2);
    }
 
    let seekcount = 0;
 
    let seeksequence = new Array(n + 1);
 
    for (let i = 0; i < n; i++) {
        calculatedifference(request, head, diff, n);
        let index = findMIN(diff, n);
        diff[index][1] = 1;
 
        seekcount += diff[index][0];
 
        head = request[index];
        seeksequence[i] = head;
    }
 
    return seeksequence;
}
 