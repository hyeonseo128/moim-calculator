document.addEventListener("DOMContentLoaded", () => {
    const table = document.getElementById('calculator-table');
  
    const placeholderTexts = ["지출 항목", "금액"];
  
    function setupPlaceholders(cell, index) {
      cell.innerText = placeholderTexts[index];
      cell.style.color = "#aaa";
  
      cell.addEventListener("focus", () => {
        if (cell.innerText === placeholderTexts[index]) {
          cell.innerText = "";
          cell.style.color = "#333";
        }
      });
  
      cell.addEventListener("blur", () => {
        if (cell.innerText.trim() === "") {
          cell.innerText = placeholderTexts[index];
          cell.style.color = "#aaa";
        }
      });
    }
  
    function addRow() {
      const newRow = document.createElement('tr');
      const columnCount = table.querySelector('thead tr').cells.length;
  
      for (let i = 0; i < columnCount; i++) {
        const cell = document.createElement('td');
        if (i >= 2 && i < columnCount - 2) {
          cell.innerHTML = `
            <div class="split-container">
              <div class="split-cell" contenteditable="true"></div>
              <div class="split-cell" contenteditable="true"></div>
            </div>`;
          const splitCells = cell.querySelectorAll('.split-cell');
          splitCells.forEach((splitCell, index) => setupPlaceholders(splitCell, index));
        } else if (i === columnCount - 2) {
          cell.className = 'total';
          cell.contentEditable = 'false';
        } else if (i === columnCount - 1) {
          cell.className = 'extra-amount';
          cell.contentEditable = 'false';
        } else {
          cell.contentEditable = 'true';
        }
        newRow.appendChild(cell);
      }
      table.querySelector('tbody').appendChild(newRow);
    }
  
    function addColumn() {
      const headerRow = table.querySelector('thead tr');
      const newHeaderCell = document.createElement('th');
      newHeaderCell.textContent = `지출${headerRow.cells.length - 3}`;
      headerRow.insertBefore(newHeaderCell, headerRow.cells[headerRow.cells.length - 2]);
  
      const rows = table.querySelectorAll('tbody tr');
      rows.forEach(row => {
        const newCell = document.createElement('td');
        newCell.innerHTML = `
          <div class="split-container">
            <div class="split-cell" contenteditable="true"></div>
            <div class="split-cell" contenteditable="true"></div>
          </div>`;
        const splitCells = newCell.querySelectorAll('.split-cell');
        splitCells.forEach((splitCell, index) => setupPlaceholders(splitCell, index));
        row.insertBefore(newCell, row.cells[row.cells.length - 2]);
      });
    }
  
    function deleteRow() {
      const tbody = table.querySelector('tbody');
      if (tbody.rows.length > 0) {
        tbody.deleteRow(tbody.rows.length - 1);
      } else {
        alert('삭제할 행이 없습니다.');
      }
    }
  
    function deleteColumn() {
      const headerRow = table.querySelector('thead tr');
      if (headerRow.cells.length > 5) {
        headerRow.deleteCell(headerRow.cells.length - 3);
  
        const rows = table.querySelectorAll('tbody tr');
        rows.forEach(row => {
          row.deleteCell(row.cells.length - 3);
        });
      } else {
        alert('삭제할 열이 없습니다.');
      }
    }
  
    document.getElementById('add-row').addEventListener('click', addRow);
    document.getElementById('add-column').addEventListener('click', addColumn);
    document.getElementById('delete-row').addEventListener('click', deleteRow);
    document.getElementById('delete-column').addEventListener('click', deleteColumn);
  
    for (let i = 0; i < 10; i++) addRow();
  });
  