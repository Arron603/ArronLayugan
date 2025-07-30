const projects = {
    "Cosmetic": []
  };
  
  const workloadData = {};
  const projectName = "Cosmetic";
  
  function addEmployee() {
    const employee = document.getElementById("employeeName").value.trim();
    if (!employee || projects[projectName].includes(employee)) return;
  
    projects[projectName].push(employee);
    document.getElementById("employeeName").value = "";
    updateEmployeeDropdown();
  }
  
  function updateEmployeeDropdown() {
    const employeeSelect = document.getElementById("employeeSelect");
    employeeSelect.innerHTML = "";
  
    projects[projectName].forEach(emp => {
      const option = document.createElement("option");
      option.value = emp;
      option.textContent = emp;
      employeeSelect.appendChild(option);
    });
  }
  
  function allocateEmployee() {
    const employee = document.getElementById("employeeSelect").value;
    const percent = parseInt(document.getElementById("allocationPercent").value);
  
    if (!employee || isNaN(percent) || percent <= 0 || percent > 100) {
      alert("Please enter a valid percentage between 1 and 100.");
      return;
    }
  
    const current = workloadData[employee] || 0;
    if (current + percent > 100) {
      alert(`${employee} already has ${current}%. Cannot exceed 100%.`);
      return;
    }
  
    const table = document.getElementById("allocationsTable");
    const row = document.createElement("tr");
  
    const projectCell = document.createElement("td");
    projectCell.textContent = projectName;
  
    const employeeCell = document.createElement("td");
    employeeCell.textContent = `${employee} (${percent}%)`;
  
    row.appendChild(projectCell);
    row.appendChild(employeeCell);
    table.appendChild(row);
  
    updateWorkloadChart(employee, percent);
    document.getElementById("allocationPercent").value = "";
  }
  
  function updateWorkloadChart(employee, percent) {
    if (!workloadData[employee]) workloadData[employee] = 0;
    workloadData[employee] += percent;
  
    const labels = Object.keys(workloadData);
    const data = labels.map(e => workloadData[e]);
  
    workloadChart.data.labels = labels;
    workloadChart.data.datasets[0].data = data;
    workloadChart.update();
  }
  
  window.onload = () => {
    updateEmployeeDropdown();
  
    const ctx = document.getElementById('workloadChart').getContext('2d');
    window.workloadChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [],
        datasets: [{
          label: 'Allocations (%)',
          data: [],
          backgroundColor: 'rgba(0, 119, 204, 0.8)'
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max: 100
          }
        }
      }
    });
  };
  