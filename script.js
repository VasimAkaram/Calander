const holidays = {
  // Format: 'YYYY-MM-DD': { name: 'Holiday Name', type: 'holiday' or 'famous-day' }
  '2024-01-01': { name: "New Year's Day", type: 'holiday' },
  '2024-08-15': { name: 'Independence Day', type: 'holiday' },
  '2024-10-02': { name: 'Gandhi Jayanti', type: 'famous-day' },
  '2024-12-25': { name: 'Christmas', type: 'holiday' },
  // Add more as needed
};

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const yearSelect = document.getElementById('yearSelect');
const monthName = document.getElementById('monthName');
const calendarBody = document.getElementById('calendarBody');
const eventInfo = document.getElementById('eventInfo');

let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth();

function populateYearSelect() {
  yearSelect.innerHTML = '';
  for (let y = currentYear - 10; y <= currentYear + 10; y++) {
    const opt = document.createElement('option');
    opt.value = y;
    opt.textContent = y;
    if (y === currentYear) opt.selected = true;
    yearSelect.appendChild(opt);
  }
}

function generateCalendar(year, month) {
  monthName.textContent = monthNames[month];
  calendarBody.innerHTML = '';
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();
  let date = 1;
  for (let i = 0; i < 6; i++) {
    const row = document.createElement('tr');
    for (let j = 0; j < 7; j++) {
      const cell = document.createElement('td');
      if (i === 0 && j < firstDay) {
        cell.textContent = '';
      } else if (date > daysInMonth) {
        cell.textContent = '';
      } else {
        cell.textContent = date;
        const dateStr = `${year}-${String(month+1).padStart(2,'0')}-${String(date).padStart(2,'0')}`;
        if (holidays[dateStr]) {
          cell.classList.add(holidays[dateStr].type);
          cell.title = holidays[dateStr].name;
        }
        // Highlight today
        if (
          year === today.getFullYear() &&
          month === today.getMonth() &&
          date === today.getDate()
        ) {
          cell.classList.add('today');
          cell.title = (cell.title ? cell.title + ' | ' : '') + 'Today';
        }
        cell.addEventListener('click', () => showEventInfo(dateStr));
        date++;
      }
      row.appendChild(cell);
    }
    calendarBody.appendChild(row);
    if (date > daysInMonth) break;
  }
}

function showEventInfo(dateStr) {
  if (holidays[dateStr]) {
    eventInfo.textContent = `${dateStr}: ${holidays[dateStr].name}`;
    eventInfo.className = 'visible';
  } else {
    eventInfo.textContent = '';
    eventInfo.className = '';
  }
}

document.getElementById('prevMonth').addEventListener('click', () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  yearSelect.value = currentYear;
  generateCalendar(currentYear, currentMonth);
});

document.getElementById('nextMonth').addEventListener('click', () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  yearSelect.value = currentYear;
  generateCalendar(currentYear, currentMonth);
});

yearSelect.addEventListener('change', (e) => {
  currentYear = parseInt(e.target.value);
  generateCalendar(currentYear, currentMonth);
});

// Initialize
populateYearSelect();
generateCalendar(currentYear, currentMonth); 