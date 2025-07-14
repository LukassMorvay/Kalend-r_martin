// const calendar = document.getElementById('calendar');
// const monthYear = document.getElementById('monthYear');
// const modal = document.getElementById('taskModal');
// const cancelBtn = document.getElementById('cancelModal');
// const taskForm = document.getElementById('taskForm');
// const selectedDateInput = document.getElementById('selectedDate');
// const editIndexInput = document.getElementById('editIndex');
// const modalDateDisplay = document.getElementById('modalDateDisplay');
// const taskList = document.getElementById('taskList');
// const holidayNotes = document.getElementById('holidayNotes');
// const holidayList = document.getElementById('holidayList');
// const addHolidayBtn = document.getElementById('addHoliday');
// const holidayModal = document.getElementById('holidayModal');
// const holidayForm = document.getElementById('holidayForm');
// const cancelHolidayBtn = document.getElementById('cancelHoliday');
// const holidayEditIndex = document.getElementById('holidayEditIndex');
// const holidayNotesText = document.getElementById('holidayNotesText');
// const holidayType = document.getElementById('holidayType');

// const viewButtons = document.querySelectorAll('#viewControls button');
// let currentView = 'month'; // default view

// viewButtons.forEach(button => {
//   button.addEventListener('click', () => {
//     const newView = button.dataset.view;

//     // Remove current view class from #calendar
//     calendar.classList.remove(`${currentView}-view`);

//     // Add new view class
//     calendar.classList.add(`${newView}-view`);

//     // Update active button styling
//     viewButtons.forEach(btn => btn.classList.remove('active'));
//     button.classList.add('active');

//     currentView = newView;
//     renderCalendar(currentDate); // Re-render calendar if needed
//     renderHolidayNotes(currentDate);
//   });
// });

// // Details modal elements
// const detailsModal = document.getElementById('detailsModal');
// const detailsContent = document.getElementById('detailsContent');
// const closeDetailsBtn = document.getElementById('closeDetails');
// const editDetailsBtn = document.getElementById('editDetails');
// const callStatusCheckbox = document.getElementById('callStatus');

// const popisSelect = document.getElementById('popis');
// const customPopisInput = document.getElementById('customPopis');
// const customPopisLabel = document.getElementById('customPopisLabel');

// popisSelect.addEventListener('change', function () {
//   if (popisSelect.value === 'Ostatné') {
//     customPopisInput.style.display = 'block';
//     customPopisLabel.style.display = 'block';
//     customPopisInput.required = true;
//   } else {
//     customPopisInput.style.display = 'none';
//     customPopisLabel.style.display = 'none';
//     customPopisInput.required = false;
//     customPopisInput.value = ''; // clear custom value
//   }
// });

// let currentDate = new Date();
// let currentTask = null; // Store the current task for editing from details modal

// function renderCalendar(date) {
//   calendar.innerHTML = '';
//   const year = date.getFullYear();
//   const month = date.getMonth();
//   const day = date.getDate();

//   if (currentView === 'month') {
//     monthYear.textContent = date.toLocaleString('sk-SK', { month: 'long', year: 'numeric' });
//   } else if (currentView === 'week') {
//     const monday = new Date(date);
//     const dayOfWeek = monday.getDay();
//     const offset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
//     monday.setDate(date.getDate() + offset);
//     const sunday = new Date(monday);
//     sunday.setDate(monday.getDate() + 6);

//     monthYear.textContent = `${monday.toLocaleDateString('sk-SK')} – ${sunday.toLocaleDateString('sk-SK')}`;
//   } else if (currentView === 'day') {
//     monthYear.textContent = date.toLocaleDateString('sk-SK', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
//   }

//   if (currentView === 'month') {
//     const firstDay = new Date(year, month, 1).getDay();
//     const daysInMonth = new Date(year, month + 1, 0).getDate();
//     let startOffset = firstDay === 0 ? 6 : firstDay - 1;

//     for (let i = 0; i < startOffset; i++) {
//       const blank = document.createElement('div');
//       calendar.appendChild(blank);
//     }

//     for (let d = 1; d <= daysInMonth; d++) {
//       const dateStr = `${year}-${(month + 1).toString().padStart(2, '0')}-${d.toString().padStart(2, '0')}`;
//       renderDayCell(dateStr);
//     }

//   } else if (currentView === 'week') {
//     const currentDay = date.getDay();
//     const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay;
//     for (let i = 0; i < 7; i++) {
//       const d = new Date(date);
//       d.setDate(date.getDate() + mondayOffset + i);
//       const dateStr = d.toISOString().split('T')[0];
//       renderDayCell(dateStr);
//     }

//   } else if (currentView === 'day') {
//     const dateStr = date.toISOString().split('T')[0];
//     renderDayCell(dateStr);
//   }
//   const dayPicker = document.getElementById('dayPicker');

//   if (currentView === 'day') {
//     dayPicker.classList.remove('hidden');
//     dayPicker.innerHTML = ''; // clear previous buttons

//     const selectedDate = new Date(date);
//     const currentDay = selectedDate.getDay();
//     const offset = currentDay === 0 ? -6 : 1 - currentDay;
//     const monday = new Date(selectedDate);
//     monday.setDate(selectedDate.getDate() + offset);

//     const daysSk = ['Po', 'Ut', 'St', 'Št', 'Pi', 'So', 'Ne'];

//     for (let i = 0; i < 7; i++) {
//       const dayDate = new Date(monday);
//       dayDate.setDate(monday.getDate() + i);
//       const isoDate = dayDate.toISOString().split('T')[0];

//       const btn = document.createElement('button');
//       btn.textContent = daysSk[i];
//       if (isoDate === selectedDate.toISOString().split('T')[0]) {
//         btn.classList.add('active');
//       }

//       btn.addEventListener('click', () => {
//         currentDate = new Date(isoDate);
//         renderCalendar(currentDate);
//       });

//       dayPicker.appendChild(btn);
//     }

//   } else {
//     dayPicker.classList.add('hidden');
//   }
// }

// function renderDayCell(dateStr) {
//   const dayDiv = document.createElement('div');
//   dayDiv.className = 'day';
//   dayDiv.dataset.date = dateStr;

//   const dateObj = new Date(dateStr);
//   const formatted = dateObj.toLocaleDateString('sk-SK', {
//     weekday: 'short',
//     day: 'numeric',
//     month: 'numeric'
//   });

//   // Add holiday info above the day (between column and day content)
//   const holidays = getHolidays();
//   holidays.forEach(holiday => {
//     const fromDate = new Date(holiday.from);
//     const toDate = new Date(holiday.to);
//     if (dateObj >= fromDate && dateObj <= toDate) {
//       const holidayBanner = document.createElement('div');
//       holidayBanner.className = 'holiday-banner';
//       holidayBanner.textContent = `${holiday.holidayEmployee || holiday.otherEmployee || holiday.mechanik || 'Neznámy'} - ${holiday.type}`;
//       dayDiv.appendChild(holidayBanner);
//     }
//   });

//   if (currentView !== 'day') {
//     dayDiv.innerHTML += `<div class="date">${formatted}</div>`; // Add date after holiday banner
//     const tasks = getTasksForDate(dateStr).sort((a, b) => {
//       if (a.start === 'prenocovanie') return 1;
//       if (b.start === 'prenocovanie') return -1;
//       return a.start.localeCompare(b.start);
//     });

//     tasks.forEach(task => {
//       const badge = document.createElement('div');
//       badge.className = `task-badge ${sanitizeClassName(task.mechanik)} ${sanitizeClassName(task.popis)}`;
//       badge.textContent = `${task.isCalled ? '📞 ' : ''}${task.start === 'prenocovanie' ? 'Prenocovanie' : task.start + '-' + task.end} ${task.popis} ${task.znacka} ${task.meno || ''}`;
//       badge.style.cursor = "pointer";
//       badge.addEventListener('click', (e) => {
//         e.stopPropagation();
//         showTaskDetails(task, dateStr);
//       });
//       dayDiv.appendChild(badge);
//     });

//     dayDiv.addEventListener('click', () => openModal(dateStr));
//     calendar.appendChild(dayDiv);
//     return;
//   }

//   // DAILY VIEW WITH TIME BLOCKS
//   const title = document.createElement('div');
//   title.className = 'date-title';
//   title.textContent = formatted;
//   dayDiv.appendChild(title);

//   for (let hour = 8; hour <= 16; hour++) {
//     const hourBlock = document.createElement('div');
//     hourBlock.className = 'hour-block';
//     const hourLabel = `${hour.toString().padStart(2, '0')}:00`;

//     const label = document.createElement('div');
//     label.className = 'hour-label';
//     label.textContent = hourLabel;

//     const slot = document.createElement('div');
//     slot.className = 'hour-slot';

//     const tasks = getTasksForDate(dateStr).filter(task => {
//       if (task.start === 'prenocovanie') return false;
//       const taskHour = parseInt(task.start.split(':')[0]);
//       return taskHour === hour;
//     });

//     tasks.sort((a, b) => a.start.localeCompare(b.start)).forEach(task => {
//       const badge = document.createElement('div');
//       badge.className = `task-badge ${sanitizeClassName(task.mechanik)} ${sanitizeClassName(task.popis)}`;
//       badge.textContent = `${task.isCalled ? '📞 ' : ''}${task.start}-${task.end} ${task.popis} ${task.znacka} ${task.meno || ''}`;
//       badge.style.cursor = "pointer";
//       badge.addEventListener('click', (e) => {
//         e.stopPropagation();
//         showTaskDetails(task, dateStr);
//       });
//       slot.appendChild(badge);
//     });

//     hourBlock.appendChild(label);
//     hourBlock.appendChild(slot);
//     dayDiv.appendChild(hourBlock);
//   }

//   // Add separator and PRENOCOVANIE block
//   const separator = document.createElement('hr');
//   separator.className = 'prenocovanie-separator';
//   dayDiv.appendChild(separator);

//   const prenocovanieBlock = document.createElement('div');
//   prenocovanieBlock.className = 'prenocovanie-block';
//   const prenocovanieLabel = document.createElement('div');
//   prenocovanieLabel.className = 'hour-label';
//   prenocovanieLabel.textContent = 'PRENOCOVANIE';
//   const prenocovanieSlot = document.createElement('div');
//   prenocovanieSlot.className = 'hour-slot';

//   const prenocovanieTasks = getTasksForDate(dateStr).filter(task => task.start === 'prenocovanie');
//   prenocovanieTasks.forEach(task => {
//     const badge = document.createElement('div');
//     badge.className = `task-badge ${sanitizeClassName(task.mechanik)} ${sanitizeClassName(task.popis)}`;
//     badge.textContent = `${task.isCalled ? '📞 ' : ''}Prenocovanie ${task.popis} ${task.znacka} ${task.meno || ''}`;
//     badge.style.cursor = "pointer";
//     badge.addEventListener('click', (e) => {
//       e.stopPropagation();
//       showTaskDetails(task, dateStr);
//     });
//     prenocovanieSlot.appendChild(badge);
//   });

//   prenocovanieBlock.appendChild(prenocovanieLabel);
//   prenocovanieBlock.appendChild(prenocovanieSlot);
//   dayDiv.appendChild(prenocovanieBlock);

//   dayDiv.addEventListener('click', () => openModal(dateStr));
//   calendar.appendChild(dayDiv);
// }

// function openModal(dateStr) {
//   selectedDateInput.value = dateStr;
//   editIndexInput.value = -1;
//   modalDateDisplay.textContent = dateStr;
//   modal.classList.remove('hidden');
//   renderTaskList(dateStr);
//   taskForm.reset();
// }

// function getTasksForDate(dateStr) {
//   const all = JSON.parse(localStorage.getItem('autoglas-tasks') || '{}');
//   return all[dateStr] || [];
// }

// function saveTasksForDate(dateStr, tasks) {
//   const all = JSON.parse(localStorage.getItem('autoglas-tasks') || '{}');
//   all[dateStr] = tasks;
//   localStorage.setItem('autoglas-tasks', JSON.stringify(all));
// }

// function renderTaskList(dateStr) {
//   const tasks = getTasksForDate(dateStr).sort((a, b) => {
//     if (a.start === 'prenocovanie') return 1;
//     if (b.start === 'prenocovanie') return -1;
//     return a.start.localeCompare(b.start);
//   });
//   taskList.innerHTML = '';

//   tasks.forEach((task, index) => {
//     const div = document.createElement('div');
//     div.className = `task ${sanitizeClassName(task.mechanik)} task-badge ${sanitizeClassName(task.popis)}`;

//     // Create the clickable span for showing task details
//     const taskSpan = document.createElement('span');
//     taskSpan.textContent = `${task.isCalled ? '📞 ' : ''}${task.start === 'prenocovanie' ? 'Prenocovanie' : task.start + '–' + task.end} ${task.popis} ${task.znacka} ${task.meno || ''}`;
//     taskSpan.style.cursor = 'pointer';
//     taskSpan.addEventListener('click', () => showTaskDetails(task, dateStr));

//     // Create the buttons container
//     const buttonsDiv = document.createElement('div');
//     buttonsDiv.className = 'task-buttons';

//     // Create edit button
//     const editBtn = document.createElement('button');
//     editBtn.className = 'edit-btn';
//     editBtn.setAttribute('aria-label', 'Edit task');
//     editBtn.innerHTML = '✏️';
//     editBtn.addEventListener('click', () => editTask(dateStr, index));

//     // Create delete button
//     const deleteBtn = document.createElement('button');
//     deleteBtn.className = 'delete-btn';
//     deleteBtn.setAttribute('aria-label', 'Delete task');
//     deleteBtn.innerHTML = '🗑️';
//     deleteBtn.addEventListener('click', () => deleteTask(dateStr, index));

//     // Append buttons to button container
//     buttonsDiv.appendChild(editBtn);
//     buttonsDiv.appendChild(deleteBtn);

//     // Append everything to the task row
//     div.appendChild(taskSpan);
//     div.appendChild(buttonsDiv);
//     taskList.appendChild(div);
//   });
// }

// function showTaskDetails(task, dateStr) {
//   currentTask = task; // Store the task for editing
//   detailsContent.innerHTML = `
//   <h3>Detail objednávky</h3>
//   ${task.mechanik ? `<p><strong>Mechanik:</strong> ${task.mechanik}</p>` : ''}
//   <p><strong>Popis práce:</strong> ${task.popis}</p>
//   <p><strong>Značka auta:</strong> ${task.znacka}</p>
//   <p><strong>Meno zákazníka:</strong> ${task.meno || '—'}</p>
//   <p><strong>Poisťovňa:</strong> ${task.poistovna}</p>
//   <p><strong>Čas:</strong> ${task.start === 'prenocovanie' ? 'Prenocovanie' : task.start + ' – ' + task.end}</p>
//   <p><strong>Telefón:</strong> ${task.telefon || '—'}</p>
//   ${task.extraInfo ? `<p><strong>Ďalšie info:</strong> ${task.extraInfo}</p>` : ''}
// `;
//   callStatusCheckbox.checked = task.isCalled || false;
//   callStatusCheckbox.dataset.dateStr = dateStr;
//   callStatusCheckbox.dataset.index = getTasksForDate(dateStr).findIndex(t => 
//     t.start === task.start &&
//     t.end === task.end &&
//     t.popis === task.popis &&
//     t.znacka === task.znacka &&
//     t.meno === task.meno
//   );
//   detailsModal.classList.remove('hidden');
// }

// function deleteTask(dateStr, index) {
//   if (confirm('Naozaj chcete vymazať túto úlohu?')) {
//     const tasks = getTasksForDate(dateStr);
//     tasks.splice(index, 1);
//     saveTasksForDate(dateStr, tasks);
//     renderTaskList(dateStr);
//     renderCalendar(currentDate);
//   }
// }

// function editTask(dateStr, index) {
//   const task = getTasksForDate(dateStr)[index];
//   taskForm.mechanik.value = task.mechanik || '';
//   taskForm.popis.value = task.popis;
//   taskForm.znacka.value = task.znacka;
//   taskForm.poistovna.value = task.poistovna;
//   taskForm.startTime.value = task.start;
//   taskForm.endTime.value = task.end || '';
//   taskForm.meno.value = task.meno || '';
//   taskForm.telefon.value = task.telefon || '';
//   taskForm.extraInfo.value = task.extraInfo || '';
//   selectedDateInput.value = dateStr;
//   editIndexInput.value = index;
//   modal.classList.remove('hidden');
//   renderTaskList(dateStr);
// }

// function sanitizeClassName(name) {
//   return name
//     .normalize('NFD')
//     .replace(/[\u0300-\u036f]/g, '')
//     .replace(/\s+/g, '_')
//     .replace(/[^a-zA-Z0-9_]/g, '');
// }

// taskForm.addEventListener('submit', function (e) {
//   e.preventDefault();

//   const popisValue = taskForm.popis.value === 'Ostatné' ? taskForm.customPopis.value : taskForm.popis.value;
//   const popisClassValue = taskForm.popis.value === 'Ostatné' ? 'Ostatné' : taskForm.popis.value;

//   const dateStr = selectedDateInput.value;
//   const index = parseInt(editIndexInput.value);
//   const tasks = getTasksForDate(dateStr);
//   const isCalled = index >= 0 ? tasks[index].isCalled || false : false;

//   const task = {
//     mechanik: taskForm.mechanik.value || '',
//     popis: taskForm.popis.value === 'Ostatné' ? taskForm.customPopis.value : taskForm.popis.value,
//     znacka: taskForm.znacka.value,
//     poistovna: taskForm.poistovna.value,
//     start: taskForm.startTime.value,
//     end: taskForm.endTime.value || '',
//     telefon: taskForm.telefon.value,
//     extraInfo: taskForm.extraInfo.value,
//     meno: taskForm.meno.value,
//     isCalled: isCalled
//   };

//   if (task.start !== 'prenocovanie' && task.start >= task.end) {
//     alert('Čas konca musí byť po čase začiatku.');
//     return;
//   }

//   if (!task.meno || !task.telefon) {
//     alert('Meno zákazníka a telefónne číslo sú povinné polia.');
//     return;
//   }

//   if (task.start !== 'prenocovanie' && !task.end) {
//     alert('Čas konca je povinný pre úlohy, ktoré nie sú prenocovaním.');
//     return;
//   }

//   if (index >= 0) {
//     tasks[index] = task;
//   } else {
//     tasks.push(task);
//   }

//   saveTasksForDate(dateStr, tasks);
//   modal.classList.add('hidden');
//   taskForm.reset();
//   renderCalendar(currentDate);
// });

// callStatusCheckbox.addEventListener('change', () => {
//   const dateStr = callStatusCheckbox.dataset.dateStr;
//   const index = parseInt(callStatusCheckbox.dataset.index);
//   const tasks = getTasksForDate(dateStr);
//   if (index >= 0) {
//     tasks[index].isCalled = callStatusCheckbox.checked;
//     saveTasksForDate(dateStr, tasks);
//     renderTaskList(dateStr);
//     renderCalendar(currentDate);
//   }
// });

// cancelBtn.addEventListener('click', () => {
//   modal.classList.add('hidden');
// });

// closeDetailsBtn.addEventListener('click', () => {
//   detailsModal.classList.add('hidden');
// });

// editDetailsBtn.addEventListener('click', () => {
//   if (currentTask) {
//     const dateStr = selectedDateInput.value || currentDate.toISOString().split('T')[0];
//     const tasks = getTasksForDate(dateStr);
//     const index = tasks.findIndex(task => 
//       task.start === currentTask.start &&
//       task.end === currentTask.end &&
//       task.popis === currentTask.popis &&
//       task.znacka === currentTask.znacka &&
//       task.meno === task.meno
//     );
//     if (index !== -1) {
//       editTask(dateStr, index);
//       detailsModal.classList.add('hidden');
//     }
//   }
// });

// document.getElementById('prevMonth').addEventListener('click', () => {
//   if (currentView === 'month') {
//     currentDate.setMonth(currentDate.getMonth() - 1);
//   } else if (currentView === 'week') {
//     currentDate.setDate(currentDate.getDate() - 7);
//   } else if (currentView === 'day') {
//     currentDate.setDate(currentDate.getDate() - 1);
//   }
//   renderCalendar(currentDate);
//   renderHolidayNotes(currentDate);
// });

// document.getElementById('nextMonth').addEventListener('click', () => {
//   if (currentView === 'month') {
//     currentDate.setMonth(currentDate.getMonth() + 1);
//   } else if (currentView === 'week') {
//     currentDate.setDate(currentDate.getDate() + 7);
//   } else if (currentView === 'day') {
//     currentDate.setDate(currentDate.getDate() + 1);
//   }
//   renderCalendar(currentDate);
//   renderHolidayNotes(currentDate);
// });

// window.editTask = editTask;
// window.deleteTask = deleteTask;
// window.showTaskDetails = showTaskDetails;

// function getHolidays() {
//   return JSON.parse(localStorage.getItem('autoglas-holidays') || '[]');
// }

// function saveHolidays(holidays) {
//   localStorage.setItem('autoglas-holidays', JSON.stringify(holidays));
// }

// function renderHolidayNotes(date) {
//   const holidays = getHolidays();
//   holidayList.innerHTML = '';
//   const month = date.getMonth();
//   const year = date.getFullYear();

//   holidays.forEach((holiday, index) => {
//     const fromDate = new Date(holiday.from);
//     const toDate = new Date(holiday.to);
//     if (fromDate.getMonth() === month && fromDate.getFullYear() === year) {
//       const div = document.createElement('div');
//       div.className = 'holiday-item';
//       div.innerHTML = `${holiday.holidayEmployee || holiday.otherEmployee || holiday.mechanik || 'Neznámy'}: ${fromDate.toLocaleDateString('sk-SK')} - ${toDate.toLocaleDateString('sk-SK')} (${holiday.type})<br><small>${holiday.notes || ''}</small>`;
//       const buttonsDiv = document.createElement('div');
//       buttonsDiv.className = 'holiday-buttons';
//       const editBtn = document.createElement('button');
//       editBtn.className = 'edit-holiday';
//       editBtn.innerHTML = '✏️';
//       editBtn.addEventListener('click', () => editHoliday(index));
//       const deleteBtn = document.createElement('button');
//       deleteBtn.className = 'delete-holiday';
//       deleteBtn.innerHTML = '🗑️';
//       deleteBtn.addEventListener('click', () => deleteHoliday(index));
//       buttonsDiv.appendChild(editBtn);
//       buttonsDiv.appendChild(deleteBtn);
//       div.appendChild(buttonsDiv);
//       holidayList.appendChild(div);
//     }
//   });
// }

// function deleteHoliday(index) {
//   if (confirm('Naozaj chcete vymazať túto dovolenku/poznámku?')) {
//     const holidays = getHolidays();
//     holidays.splice(index, 1);
//     saveHolidays(holidays);
//     renderHolidayNotes(currentDate);
//     renderCalendar(currentDate);
//   }
// }

// function editHoliday(index) {
//   const holidays = getHolidays();
//   const holiday = holidays[index];
//   holidayEditIndex.value = index;
//   holidayForm.holidayEmployee.value = holiday.holidayEmployee || holiday.otherEmployee || holiday.mechanik || '';
//   holidayForm.holidayFrom.value = holiday.from;
//   holidayForm.holidayTo.value = holiday.to;
//   holidayType.value = holiday.type;
//   holidayNotesText.value = holiday.notes || '';
//   holidayModal.classList.remove('hidden');
// }

// addHolidayBtn.addEventListener('click', () => {
//   holidayEditIndex.value = -1;
//   holidayForm.reset();
//   holidayModal.classList.remove('hidden');
// });

// holidayForm.addEventListener('submit', function (e) {
//   e.preventDefault();

//   const holiday = {
//     mechanik: '', // Zachované pre spätnú kompatibilitu
//     otherEmployee: '', // Zachované pre spätnú kompatibilitu
//     holidayEmployee: holidayForm.holidayEmployee.value,
//     from: holidayForm.holidayFrom.value,
//     to: holidayForm.holidayTo.value,
//     type: holidayForm.holidayType.value,
//     notes: holidayNotesText.value
//   };

//   const fromDate = new Date(holiday.from);
//   const toDate = new Date(holiday.to);
//   if (fromDate > toDate) {
//     alert('Dátum od musí byť pred dátumom do.');
//     return;
//   }

//   const holidays = getHolidays();
//   const index = parseInt(holidayEditIndex.value);
//   if (index >= 0) {
//     holidays[index] = holiday;
//   } else {
//     holidays.push(holiday);
//   }
//   saveHolidays(holidays);
//   holidayModal.classList.add('hidden');
//   renderHolidayNotes(currentDate);
//   renderCalendar(currentDate);
// });

// cancelHolidayBtn.addEventListener('click', () => {
//   holidayModal.classList.add('hidden');
// });

// renderCalendar(currentDate);
// renderHolidayNotes(currentDate);

// document.querySelectorAll('#viewControls button').forEach(btn => {
//   btn.addEventListener('click', () => {
//     document.querySelectorAll('#viewControls button').forEach(b => b.classList.remove('active'));
//     btn.classList.add('active');
//     currentView = btn.dataset.view;
//     renderCalendar(currentDate);
//     renderHolidayNotes(currentDate);
//   });
// });







const calendar = document.getElementById('calendar');
const monthYear = document.getElementById('monthYear');
const modal = document.getElementById('taskModal');
const cancelBtn = document.getElementById('cancelModal');
const taskForm = document.getElementById('taskForm');
const selectedDateInput = document.getElementById('selectedDate');
const editIndexInput = document.getElementById('editIndex');
const modalDateDisplay = document.getElementById('modalDateDisplay');
const taskList = document.getElementById('taskList');
const holidayNotes = document.getElementById('holidayNotes');
const holidayList = document.getElementById('holidayList');
const addHolidayBtn = document.getElementById('addHoliday');
const holidayModal = document.getElementById('holidayModal');
const holidayForm = document.getElementById('holidayForm');
const cancelHolidayBtn = document.getElementById('cancelHoliday');
const holidayEditIndex = document.getElementById('holidayEditIndex');
const holidayNotesText = document.getElementById('holidayNotesText');
const holidayType = document.getElementById('holidayType');

// Replace this with your actual Render backend URL
const API_BASE_URL = 'https://your-app-name.onrender.com/api';

// Cache for tasks and holidays to improve performance
let tasksCache = {};
let holidaysCache = [];

const viewButtons = document.querySelectorAll('#viewControls button');
let currentView = 'month'; // default view

viewButtons.forEach(button => {
  button.addEventListener('click', () => {
    const newView = button.dataset.view;

    // Remove current view class from #calendar
    calendar.classList.remove(`${currentView}-view`);

    // Add new view class
    calendar.classList.add(`${newView}-view`);

    // Update active button styling
    viewButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    currentView = newView;
    renderCalendar(currentDate); // Re-render calendar if needed
    renderHolidayNotes(currentDate);
  });
});

// Details modal elements
const detailsModal = document.getElementById('detailsModal');
const detailsContent = document.getElementById('detailsContent');
const closeDetailsBtn = document.getElementById('closeDetails');
const editDetailsBtn = document.getElementById('editDetails');
const callStatusCheckbox = document.getElementById('callStatus');

const popisSelect = document.getElementById('popis');
const customPopisInput = document.getElementById('customPopis');
const customPopisLabel = document.getElementById('customPopisLabel');

popisSelect.addEventListener('change', function () {
  if (popisSelect.value === 'Ostatné') {
    customPopisInput.style.display = 'block';
    customPopisLabel.style.display = 'block';
    customPopisInput.required = true;
  } else {
    customPopisInput.style.display = 'none';
    customPopisLabel.style.display = 'none';
    customPopisInput.required = false;
    customPopisInput.value = ''; // clear custom value
  }
});

let currentDate = new Date();
let currentTask = null; // Store the current task for editing from details modal

// API functions
async function fetchTasks(date) {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks?date=${date}`);
    if (!response.ok) throw new Error('Failed to fetch tasks');
    const tasks = await response.json();
    tasksCache[date] = tasks;
    return tasks;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    // Fallback to cache if available
    return tasksCache[date] || [];
  }
}

async function saveTasks(tasks, date) {
  try {
    // Delete existing tasks for this date
    const existingTasks = tasksCache[date] || [];
    for (const task of existingTasks) {
      if (task._id) {
        await fetch(`${API_BASE_URL}/tasks/${task._id}`, {
          method: 'DELETE'
        });
      }
    }

    // Save new tasks
    const savedTasks = [];
    for (const task of tasks) {
      const taskData = { ...task, date };
      const response = await fetch(`${API_BASE_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(taskData)
      });
      
      if (response.ok) {
        const savedTask = await response.json();
        savedTasks.push(savedTask);
      }
    }
    
    tasksCache[date] = savedTasks;
    return savedTasks;
  } catch (error) {
    console.error('Error saving tasks:', error);
    throw error;
  }
}

async function fetchHolidays() {
  try {
    const response = await fetch(`${API_BASE_URL}/holidays`);
    if (!response.ok) throw new Error('Failed to fetch holidays');
    const holidays = await response.json();
    holidaysCache = holidays;
    return holidays;
  } catch (error) {
    console.error('Error fetching holidays:', error);
    return holidaysCache;
  }
}

async function saveHoliday(holiday) {
  try {
    const response = await fetch(`${API_BASE_URL}/holidays`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(holiday)
    });
    
    if (!response.ok) throw new Error('Failed to save holiday');
    const savedHoliday = await response.json();
    
    // Update cache
    await fetchHolidays();
    return savedHoliday;
  } catch (error) {
    console.error('Error saving holiday:', error);
    throw error;
  }
}

async function deleteHoliday(holidayId) {
  try {
    const response = await fetch(`${API_BASE_URL}/holidays/${holidayId}`, {
      method: 'DELETE'
    });
    
    if (!response.ok) throw new Error('Failed to delete holiday');
    
    // Update cache
    await fetchHolidays();
    return true;
  } catch (error) {
    console.error('Error deleting holiday:', error);
    throw error;
  }
}

async function renderCalendar(date) {
  calendar.innerHTML = '';
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  if (currentView === 'month') {
    monthYear.textContent = date.toLocaleString('sk-SK', { month: 'long', year: 'numeric' });
  } else if (currentView === 'week') {
    const monday = new Date(date);
    const dayOfWeek = monday.getDay();
    const offset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    monday.setDate(date.getDate() + offset);
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);

    monthYear.textContent = `${monday.toLocaleDateString('sk-SK')} – ${sunday.toLocaleDateString('sk-SK')}`;
  } else if (currentView === 'day') {
    monthYear.textContent = date.toLocaleDateString('sk-SK', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  }

  if (currentView === 'month') {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    let startOffset = firstDay === 0 ? 6 : firstDay - 1;

    for (let i = 0; i < startOffset; i++) {
      const blank = document.createElement('div');
      calendar.appendChild(blank);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${year}-${(month + 1).toString().padStart(2, '0')}-${d.toString().padStart(2, '0')}`;
      await renderDayCell(dateStr);
    }

  } else if (currentView === 'week') {
    const currentDay = date.getDay();
    const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay;
    for (let i = 0; i < 7; i++) {
      const d = new Date(date);
      d.setDate(date.getDate() + mondayOffset + i);
      const dateStr = d.toISOString().split('T')[0];
      await renderDayCell(dateStr);
    }

  } else if (currentView === 'day') {
    const dateStr = date.toISOString().split('T')[0];
    await renderDayCell(dateStr);
  }
  
  const dayPicker = document.getElementById('dayPicker');

  if (currentView === 'day') {
    dayPicker.classList.remove('hidden');
    dayPicker.innerHTML = ''; // clear previous buttons

    const selectedDate = new Date(date);
    const currentDay = selectedDate.getDay();
    const offset = currentDay === 0 ? -6 : 1 - currentDay;
    const monday = new Date(selectedDate);
    monday.setDate(selectedDate.getDate() + offset);

    const daysSk = ['Po', 'Ut', 'St', 'Št', 'Pi', 'So', 'Ne'];

    for (let i = 0; i < 7; i++) {
      const dayDate = new Date(monday);
      dayDate.setDate(monday.getDate() + i);
      const isoDate = dayDate.toISOString().split('T')[0];

      const btn = document.createElement('button');
      btn.textContent = daysSk[i];
      if (isoDate === selectedDate.toISOString().split('T')[0]) {
        btn.classList.add('active');
      }

      btn.addEventListener('click', () => {
        currentDate = new Date(isoDate);
        renderCalendar(currentDate);
      });

      dayPicker.appendChild(btn);
    }

  } else {
    dayPicker.classList.add('hidden');
  }
}

async function renderDayCell(dateStr) {
  const dayDiv = document.createElement('div');
  dayDiv.className = 'day';
  dayDiv.dataset.date = dateStr;

  const dateObj = new Date(dateStr);
  const formatted = dateObj.toLocaleDateString('sk-SK', {
    weekday: 'short',
    day: 'numeric',
    month: 'numeric'
  });

  // Add holiday info above the day (between column and day content)
  const holidays = await getHolidays();
  holidays.forEach(holiday => {
    const fromDate = new Date(holiday.from);
    const toDate = new Date(holiday.to);
    if (dateObj >= fromDate && dateObj <= toDate) {
      const holidayBanner = document.createElement('div');
      holidayBanner.className = 'holiday-banner';
      holidayBanner.textContent = `${holiday.holidayEmployee || holiday.otherEmployee || holiday.mechanik || 'Neznámy'} - ${holiday.type}`;
      dayDiv.appendChild(holidayBanner);
    }
  });

  if (currentView !== 'day') {
    dayDiv.innerHTML += `<div class="date">${formatted}</div>`; // Add date after holiday banner
    const tasks = (await getTasksForDate(dateStr)).sort((a, b) => {
      if (a.start === 'prenocovanie') return 1;
      if (b.start === 'prenocovanie') return -1;
      return a.start.localeCompare(b.start);
    });

    tasks.forEach(task => {
      const badge = document.createElement('div');
      badge.className = `task-badge ${sanitizeClassName(task.mechanik)} ${sanitizeClassName(task.popis)}`;
      badge.textContent = `${task.isCalled ? '📞 ' : ''}${task.start === 'prenocovanie' ? 'Prenocovanie' : task.start + '-' + task.end} ${task.popis} ${task.znacka} ${task.meno || ''}`;
      badge.style.cursor = "pointer";
      badge.addEventListener('click', (e) => {
        e.stopPropagation();
        showTaskDetails(task, dateStr);
      });
      dayDiv.appendChild(badge);
    });

    dayDiv.addEventListener('click', () => openModal(dateStr));
    calendar.appendChild(dayDiv);
    return;
  }

  // DAILY VIEW WITH TIME BLOCKS
  const title = document.createElement('div');
  title.className = 'date-title';
  title.textContent = formatted;
  dayDiv.appendChild(title);

  for (let hour = 8; hour <= 16; hour++) {
    const hourBlock = document.createElement('div');
    hourBlock.className = 'hour-block';
    const hourLabel = `${hour.toString().padStart(2, '0')}:00`;

    const label = document.createElement('div');
    label.className = 'hour-label';
    label.textContent = hourLabel;

    const slot = document.createElement('div');
    slot.className = 'hour-slot';

    const tasks = (await getTasksForDate(dateStr)).filter(task => {
      if (task.start === 'prenocovanie') return false;
      const taskHour = parseInt(task.start.split(':')[0]);
      return taskHour === hour;
    });

    tasks.sort((a, b) => a.start.localeCompare(b.start)).forEach(task => {
      const badge = document.createElement('div');
      badge.className = `task-badge ${sanitizeClassName(task.mechanik)} ${sanitizeClassName(task.popis)}`;
      badge.textContent = `${task.isCalled ? '📞 ' : ''}${task.start}-${task.end} ${task.popis} ${task.znacka} ${task.meno || ''}`;
      badge.style.cursor = "pointer";
      badge.addEventListener('click', (e) => {
        e.stopPropagation();
        showTaskDetails(task, dateStr);
      });
      slot.appendChild(badge);
    });

    hourBlock.appendChild(label);
    hourBlock.appendChild(slot);
    dayDiv.appendChild(hourBlock);
  }

  // Add separator and PRENOCOVANIE block
  const separator = document.createElement('hr');
  separator.className = 'prenocovanie-separator';
  dayDiv.appendChild(separator);

  const prenocovanieBlock = document.createElement('div');
  prenocovanieBlock.className = 'prenocovanie-block';
  const prenocovanieLabel = document.createElement('div');
  prenocovanieLabel.className = 'hour-label';
  prenocovanieLabel.textContent = 'PRENOCOVANIE';
  const prenocovanieSlot = document.createElement('div');
  prenocovanieSlot.className = 'hour-slot';

  const prenocovanieTasks = (await getTasksForDate(dateStr)).filter(task => task.start === 'prenocovanie');
  prenocovanieTasks.forEach(task => {
    const badge = document.createElement('div');
    badge.className = `task-badge ${sanitizeClassName(task.mechanik)} ${sanitizeClassName(task.popis)}`;
    badge.textContent = `${task.isCalled ? '📞 ' : ''}Prenocovanie ${task.popis} ${task.znacka} ${task.meno || ''}`;
    badge.style.cursor = "pointer";
    badge.addEventListener('click', (e) => {
      e.stopPropagation();
      showTaskDetails(task, dateStr);
    });
    prenocovanieSlot.appendChild(badge);
  });

  prenocovanieBlock.appendChild(prenocovanieLabel);
  prenocovanieBlock.appendChild(prenocovanieSlot);
  dayDiv.appendChild(prenocovanieBlock);

  dayDiv.addEventListener('click', () => openModal(dateStr));
  calendar.appendChild(dayDiv);
}

async function openModal(dateStr) {
  selectedDateInput.value = dateStr;
  editIndexInput.value = -1;
  modalDateDisplay.textContent = dateStr;
  modal.classList.remove('hidden');
  await renderTaskList(dateStr);
  taskForm.reset();
}

async function getTasksForDate(dateStr) {
  if (!tasksCache[dateStr]) {
    await fetchTasks(dateStr);
  }
  return tasksCache[dateStr] || [];
}

async function saveTasksForDate(dateStr, tasks) {
  try {
    await saveTasks(tasks, dateStr);
  } catch (error) {
    alert('Chyba pri ukladaní úloh. Skúste to znova.');
    console.error('Error saving tasks:', error);
  }
}

async function renderTaskList(dateStr) {
  const tasks = (await getTasksForDate(dateStr)).sort((a, b) => {
    if (a.start === 'prenocovanie') return 1;
    if (b.start === 'prenocovanie') return -1;
    return a.start.localeCompare(b.start);
  });
  taskList.innerHTML = '';

  tasks.forEach((task, index) => {
    const div = document.createElement('div');
    div.className = `task ${sanitizeClassName(task.mechanik)} task-badge ${sanitizeClassName(task.popis)}`;

    // Create the clickable span for showing task details
    const taskSpan = document.createElement('span');
    taskSpan.textContent = `${task.isCalled ? '📞 ' : ''}${task.start === 'prenocovanie' ? 'Prenocovanie' : task.start + '–' + task.end} ${task.popis} ${task.znacka} ${task.meno || ''}`;
    taskSpan.style.cursor = 'pointer';
    taskSpan.addEventListener('click', () => showTaskDetails(task, dateStr));

    // Create the buttons container
    const buttonsDiv = document.createElement('div');
    buttonsDiv.className = 'task-buttons';

    // Create edit button
    const editBtn = document.createElement('button');
    editBtn.className = 'edit-btn';
    editBtn.setAttribute('aria-label', 'Edit task');
    editBtn.innerHTML = '✏️';
    editBtn.addEventListener('click', () => editTask(dateStr, index));

    // Create delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.setAttribute('aria-label', 'Delete task');
    deleteBtn.innerHTML = '🗑️';
    deleteBtn.addEventListener('click', () => deleteTask(dateStr, index));

    // Append buttons to button container
    buttonsDiv.appendChild(editBtn);
    buttonsDiv.appendChild(deleteBtn);

    // Append everything to the task row
    div.appendChild(taskSpan);
    div.appendChild(buttonsDiv);
    taskList.appendChild(div);
  });
}

function showTaskDetails(task, dateStr) {
  currentTask = task; // Store the task for editing
  detailsContent.innerHTML = `
  <h3>Detail objednávky</h3>
  ${task.mechanik ? `<p><strong>Mechanik:</strong> ${task.mechanik}</p>` : ''}
  <p><strong>Popis práce:</strong> ${task.popis}</p>
  <p><strong>Značka auta:</strong> ${task.znacka}</p>
  <p><strong>Meno zákazníka:</strong> ${task.meno || '—'}</p>
  <p><strong>Poisťovňa:</strong> ${task.poistovna}</p>
  <p><strong>Čas:</strong> ${task.start === 'prenocovanie' ? 'Prenocovanie' : task.start + ' – ' + task.end}</p>
  <p><strong>Telefón:</strong> ${task.telefon || '—'}</p>
  ${task.extraInfo ? `<p><strong>Ďalšie info:</strong> ${task.extraInfo}</p>` : ''}
`;
  callStatusCheckbox.checked = task.isCalled || false;
  callStatusCheckbox.dataset.dateStr = dateStr;
  
  // Find the task index in the current tasks array
  const tasks = tasksCache[dateStr] || [];
  const taskIndex = tasks.findIndex(t => 
    t._id === task._id || (
      t.start === task.start &&
      t.end === task.end &&
      t.popis === task.popis &&
      t.znacka === task.znacka &&
      t.meno === task.meno
    )
  );
  
  callStatusCheckbox.dataset.index = taskIndex;
  detailsModal.classList.remove('hidden');
}

async function deleteTask(dateStr, index) {
  if (confirm('Naozaj chcete vymazať túto úlohu?')) {
    const tasks = await getTasksForDate(dateStr);
    tasks.splice(index, 1);
    await saveTasksForDate(dateStr, tasks);
    await renderTaskList(dateStr);
    await renderCalendar(currentDate);
  }
}

async function editTask(dateStr, index) {
  const task = (await getTasksForDate(dateStr))[index];
  taskForm.mechanik.value = task.mechanik || '';
  taskForm.popis.value = task.popis;
  taskForm.znacka.value = task.znacka;
  taskForm.poistovna.value = task.poistovna;
  taskForm.startTime.value = task.start;
  taskForm.endTime.value = task.end || '';
  taskForm.meno.value = task.meno || '';
  taskForm.telefon.value = task.telefon || '';
  taskForm.extraInfo.value = task.extraInfo || '';
  selectedDateInput.value = dateStr;
  editIndexInput.value = index;
  modal.classList.remove('hidden');
  await renderTaskList(dateStr);
}

function sanitizeClassName(name) {
  return name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '_')
    .replace(/[^a-zA-Z0-9_]/g, '');
}

taskForm.addEventListener('submit', async function (e) {
  e.preventDefault();

  const popisValue = taskForm.popis.value === 'Ostatné' ? taskForm.customPopis.value : taskForm.popis.value;
  const popisClassValue = taskForm.popis.value === 'Ostatné' ? 'Ostatné' : taskForm.popis.value;

  const dateStr = selectedDateInput.value;
  const index = parseInt(editIndexInput.value);
  const tasks = await getTasksForDate(dateStr);
  const isCalled = index >= 0 ? tasks[index].isCalled || false : false;

  const task = {
    mechanik: taskForm.mechanik.value || '',
    popis: taskForm.popis.value === 'Ostatné' ? taskForm.customPopis.value : taskForm.popis.value,
    znacka: taskForm.znacka.value,
    poistovna: taskForm.poistovna.value,
    start: taskForm.startTime.value,
    end: taskForm.endTime.value || '',
    telefon: taskForm.telefon.value,
    extraInfo: taskForm.extraInfo.value,
    meno: taskForm.meno.value,
    isCalled: isCalled
  };

  if (task.start !== 'prenocovanie' && task.start >= task.end) {
    alert('Čas konca musí byť po čase začiatku.');
    return;
  }

  if (!task.meno || !task.telefon) {
    alert('Meno zákazníka a telefónne číslo sú povinné polia.');
    return;
  }

  if (task.start !== 'prenocovanie' && !task.end) {
    alert('Čas konca je povinný pre úlohy, ktoré nie sú prenocovaním.');
    return;
  }

  if (index >= 0) {
    tasks[index] = task;
  } else {
    tasks.push(task);
  }

  await saveTasksForDate(dateStr, tasks);
  modal.classList.add('hidden');
  taskForm.reset();
  await renderCalendar(currentDate);
});

callStatusCheckbox.addEventListener('change', async () => {
  const dateStr = callStatusCheckbox.dataset.dateStr;
  const index = parseInt(callStatusCheckbox.dataset.index);
  const tasks = await getTasksForDate(dateStr);
  if (index >= 0 && tasks[index]) {
    tasks[index].isCalled = callStatusCheckbox.checked;
    await saveTasksForDate(dateStr, tasks);
    await renderTaskList(dateStr);
    await renderCalendar(currentDate);
  }
});

cancelBtn.addEventListener('click', () => {
  modal.classList.add('hidden');
});

closeDetailsBtn.addEventListener('click', () => {
  detailsModal.classList.add('hidden');
});

editDetailsBtn.addEventListener('click', async () => {
  if (currentTask) {
    const dateStr = selectedDateInput.value || currentDate.toISOString().split('T')[0];
    const tasks = await getTasksForDate(dateStr);
    const index = tasks.findIndex(task => 
      task._id === currentTask._id || (
        task.start === currentTask.start &&
        task.end === currentTask.end &&
        task.popis === currentTask.popis &&
        task.znacka === currentTask.znacka &&
        task.meno === currentTask.meno
      )
    );
    if (index !== -1) {
      await editTask(dateStr, index);
      detailsModal.classList.add('hidden');
    }
  }
});

document.getElementById('prevMonth').addEventListener('click', async () => {
  if (currentView === 'month') {
    currentDate.setMonth(currentDate.getMonth() - 1);
  } else if (currentView === 'week') {
    currentDate.setDate(currentDate.getDate() - 7);
  } else if (currentView === 'day') {
    currentDate.setDate(currentDate.getDate() - 1);
  }
  await renderCalendar(currentDate);
  await renderHolidayNotes(currentDate);
});

document.getElementById('nextMonth').addEventListener('click', async () => {
  if (currentView === 'month') {
    currentDate.setMonth(currentDate.getMonth() + 1);
  } else if (currentView === 'week') {
    currentDate.setDate(currentDate.getDate() + 7);
  } else if (currentView === 'day') {
    currentDate.setDate(currentDate.getDate() + 1);
  }
  await renderCalendar(currentDate);
  await renderHolidayNotes(currentDate);
});

window.editTask = editTask;
window.deleteTask = deleteTask;
window.showTaskDetails = showTaskDetails;

async function getHolidays() {
  if (holidaysCache.length === 0) {
    await fetchHolidays();
  }
  return holidaysCache;
}

async function saveHolidays(holidays) {
  // This function is kept for compatibility but individual holiday operations are preferred
  console.warn('saveHolidays is deprecated, use saveHoliday for individual operations');
}

async function renderHolidayNotes(date) {
  const holidays = await getHolidays();
  holidayList.innerHTML = '';
  const month = date.getMonth();
  const year = date.getFullYear();

  holidays.forEach((holiday, index) => {
    const fromDate = new Date(holiday.from);
    const toDate = new Date(holiday.to);
    if (fromDate.getMonth() === month && fromDate.getFullYear() === year) {
      const div = document.createElement('div');
      div.className = 'holiday-item';
      div.innerHTML = `${holiday.holidayEmployee || holiday.otherEmployee || holiday.mechanik || 'Neznámy'}: ${fromDate.toLocaleDateString('sk-SK')} - ${toDate.toLocaleDateString('sk-SK')} (${holiday.type})<br><small>${holiday.notes || ''}</small>`;
      const buttonsDiv = document.createElement('div');
      buttonsDiv.className = 'holiday-buttons';
      const editBtn = document.createElement('button');
      editBtn.className = 'edit-holiday';
      editBtn.innerHTML = '✏️';
      editBtn.addEventListener('click', () => editHoliday(holiday));
      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'delete-holiday';
      deleteBtn.innerHTML = '🗑️';
      deleteBtn.addEventListener('click', () => deleteHolidayById(holiday._id));
      buttonsDiv.appendChild(editBtn);
      buttonsDiv.appendChild(deleteBtn);
      div.appendChild(buttonsDiv);
      holidayList.appendChild(div);
    }
  });
}

async function deleteHolidayById(holidayId) {
  if (confirm('Naozaj chcete vymazať túto dovolenku/poznámku?')) {
    try {
      await deleteHoliday(holidayId);
      await renderHolidayNotes(currentDate);
      await renderCalendar(currentDate);
    } catch (error) {
      alert('Chyba pri mazaní dovolenky. Skúste to znova.');
    }
  }
}

function editHoliday(holiday) {
  holidayEditIndex.value = holiday._id; // Store the database ID instead of array index
  holidayForm.holidayEmployee.value = holiday.holidayEmployee || holiday.otherEmployee || holiday.mechanik || '';
  holidayForm.holidayFrom.value = holiday.from;
  holidayForm.holidayTo.value = holiday.to;
  holidayType.value = holiday.type;
  holidayNotesText.value = holiday.notes || '';
  holidayModal.classList.remove('hidden');
}

addHolidayBtn.addEventListener('click', () => {
  holidayEditIndex.value = -1;
  holidayForm.reset();
  holidayModal.classList.remove('hidden');
});

// holidayForm.addEventListener('submit', async function (e) {
//   e.preventDefault();

//   const holiday = {
//     mechanik: '', // Zachované pre spätnú kompatibilitu
//     otherEmployee: '', // Zachované pre spätnú kompatibilitu
//     holidayEmployee: holidayForm.holidayEmployee.value,
//     from: holidayForm.holidayFrom.value,
//     to: holidayForm.holidayTo.value,
//     type: holidayForm.holidayType.value,
//     notes: holidayNotesText.value
//   };

//   const fromDate = new Date(holiday.from);
//   const toDate = new Date(holiday.to);
//   if (fromDate > to