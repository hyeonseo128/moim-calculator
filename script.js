document.addEventListener("DOMContentLoaded", () => {
    const table = document.getElementById('calculator-table');
    const totalExpenseElement = document.getElementById('total-expense');
    const perPersonExpenseElement = document.getElementById('per-person-expense');
  
    // 행 합계 계산
    function calculateTotal(row) {
      let total = 0;
      const amountCells = row.querySelectorAll('.split-cell:nth-child(2)');
      amountCells.forEach(cell => {
        const value = parseFloat(cell.innerText) || 0;
        total += value;
      });
  
      const totalCell = row.querySelector('.total');
      if (totalCell) {
        totalCell.innerText = Math.round(total);
      }
    }
  
    // 추가 금액 계산 및 색상 설정
    function calculateExtraAmount(row, perPersonExpense) {
      const nameCell = row.cells[0];
      if (!nameCell || nameCell.innerText.trim() === "") {
        return; // 이름이 없으면 계산하지 않음
      }
  
      const advanceCell = row.cells[1];
      const totalCell = row.querySelector('.total');
      const extraAmountCell = row.cells[row.cells.length - 1];
  
      const advance = parseFloat(advanceCell.innerText) || 0;
      const total = parseFloat(totalCell.innerText) || 0;
      const extraAmount = perPersonExpense - (advance + total);
  
      // 추가 금액 표시
      extraAmountCell.innerText = Math.round(extraAmount);
  
      // 추가 금액 음수일 경우 배경색 변경
      if (extraAmount < 0) {
        extraAmountCell.classList.add("negative");
      } else {
        extraAmountCell.classList.remove("negative");
      }
    }
  
    // 총 지출액 및 1인당 금액 계산
    function updateSettlement() {
      if (!totalExpenseElement || !perPersonExpenseElement) return;
  
      const rows = table.querySelectorAll('tbody tr');
      let totalExpense = 0;
      let personCount = 0;
  
      rows.forEach(row => {
        const nameCell = row.cells[0];
        if (nameCell && nameCell.innerText.trim() !== "") {
          personCount++; // 이름이 있으면 사람 수 증가
        }
  
        const rowTotalCell = row.querySelector('.total');
        if (rowTotalCell) {
          totalExpense += parseFloat(rowTotalCell.innerText) || 0; // 합계 값 더하기
        }
      });
  
      // 총 지출액 및 1인당 금액 계산
      totalExpenseElement.innerText = totalExpense;
      const perPersonExpense = personCount > 0 ? Math.round(totalExpense / personCount) : 0;
      perPersonExpenseElement.innerText = perPersonExpense;
  
      // 각 행의 추가 금액 계산
      rows.forEach(row => calculateExtraAmount(row, perPersonExpense));
    }
  
    // 모든 행의 합계 및 정산 업데이트
    function updateAllTotals() {
      const rows = table.querySelectorAll('tbody tr');
      rows.forEach(calculateTotal); // 각 행의 합계 계산
      updateSettlement(); // 정산 구역 및 추가 금액 업데이트
    }
  
    table.addEventListener('input', updateAllTotals);
  });
  