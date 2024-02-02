import React, { useState } from 'react';

function App() {
  const [childcareRate, setChildcareRate] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedDays, setSelectedDays] = useState(new Array(7).fill(false));
  const [totalCost, setTotalCost] = useState(0);
  const [children, setChildren] = useState([]);
  const [newChild, setNewChild] = useState({ name: '', dob: '' });
  const handleRateChange = (event) => {
    setChildcareRate(event.target.value);
  };

  const [activeTab, setActiveTab] = useState('childcareCost');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const currentDate = new Date();

    let ageYears = currentDate.getFullYear() - birthDate.getFullYear();
    let ageMonths = currentDate.getMonth() - birthDate.getMonth();

    if (ageMonths < 0 || (ageMonths === 0 && currentDate.getDate() < birthDate.getDate())) {
      ageYears--;
      ageMonths = 12 + ageMonths;
    }

    return `${ageYears}Y ${ageMonths}M`;
  };


  const calculateTotal = () => {
    const rate = parseFloat(childcareRate);
    const monthIndex = months.indexOf(selectedMonth); // Assuming 'months' array from earlier
    const year = new Date().getFullYear(); // Or get the year from user input if needed

    let totalCost = 0;

    children.forEach(child => {
      selectedDays.forEach((isSelected, dayIndex) => {
        if (isSelected) {
          totalCost += getWeekdayCount(year, monthIndex, dayIndex) * rate;
        }
      });
    });

    setTotalCost(totalCost);
  };


  // Array of month names
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const handleDayChange = (position) => {
    const updatedSelectedDays = selectedDays.map((item, index) =>
      index === position ? !item : item
    );
    setSelectedDays(updatedSelectedDays);
  };

  const getWeekdayCount = (year, month, dayOfWeek) => {
    let count = 0;
    const date = new Date(year, month, 1);

    while (date.getMonth() === month) {
      if (date.getDay() === dayOfWeek) {
        count++;
      }
      date.setDate(date.getDate() + 1);
    }

    return count;
  };


  const handleChildChange = (e) => {
    setNewChild({ ...newChild, [e.target.name]: e.target.value });
  }; 

  const addChild = () => {
    setChildren([...children, newChild]);
    setNewChild({ name: '', dob: '' }); // Reset the form
  };

  const removeChild = (index) => {
    const newChildren = children.filter((_, childIndex) => childIndex !== index);
    setChildren(newChildren);
  };

  return (


    <div className="container">

      <h1>Childcare Cost Calculator</h1>
      <div>
        <h3>Add Child</h3>
        <div className="flex-container">
          <div className="flex-item">
            <label htmlFor="child-name">Name: </label>
            <input
              type="text"
              id="child-name"
              name="name"
              value={newChild.name}
              onChange={handleChildChange}
            />
          </div>
          <div className="flex-item">
            <label htmlFor="child-dob">DOB: </label>
            <input
              type="date"
              id="child-dob"
              name="dob"
              value={newChild.dob}
              onChange={handleChildChange}
            />
          </div><button onClick={addChild}>Add Child</button>
        </div>
        

        <h3>Children</h3>
        <div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>DOB</th>
                <th>Current Age</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {children.map((child, index) => (
                <tr key={index}>
                  <td>{child.name}</td>
                  <td>{child.dob}</td>
                  <td>{calculateAge(child.dob)}</td>
                  <td><button onClick={() => removeChild(index)}>Remove</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h3>Rates:</h3>
      </div>
      <div className="input-group">
        <label htmlFor="childcare-rate">Childcare Rate per Day: </label>
        <input
          type="number"
          id="childcare-rate"
          value={childcareRate}
          onChange={handleRateChange}
          placeholder="Childcare Rate per Day"
        />
      </div>

      <div className="input-group">
        <label htmlFor="month-select">Select Month: </label>
        <select id="month-select" value={selectedMonth} onChange={handleMonthChange}>
          <option value="">--Please choose a month--</option>
          {months.map((month, index) => (
            <option key={index} value={month}>{month}</option>
          ))}
        </select>
      </div>
      <h2>Calculation Options</h2>
      <div className="tab-navigation">
        <button onClick={() => handleTabChange('daysofWeek')} className={activeTab === 'daysofWeek' ? 'active' : ''}>Specific Days of Week</button>
        <button onClick={() => handleTabChange('testtab2')} className={activeTab === 'testtab2' ? 'active' : ''}>Test tab 2</button>
        <button onClick={() => handleTabChange('testtab3')} className={activeTab === 'testtab3' ? 'active' : ''}>Test tab 3</button>
        <button onClick={() => handleTabChange('testtab4')} className={activeTab === 'testtab4' ? 'active' : ''}>Test tab 4</button>
        <button onClick={() => handleTabChange('testtab5')} className={activeTab === 'testtab5' ? 'active' : ''}>Test tab 5</button>
        {/* More tabs as needed */}
      </div>
      <div className='tab-content'>
      {activeTab === 'daysofWeek' && (
      <div className="checkbox-group">
        {daysOfWeek.map((day, index) => (
          <div key={index}>
            <input
              type="checkbox"
              id={`day-${index}`}
              checked={selectedDays[index]}
              onChange={() => handleDayChange(index)}
            />
            <label htmlFor={`day-${index}`}>{day}</label>
          </div>
        ))}
      </div>
       )}
       {activeTab === 'testtab2' && (
        <h3>Test of Tab 2</h3>
        )}
        {activeTab === 'testtab3' && (
          <h3>Test of Tab 3</h3>
        )}
        {activeTab === 'testtab4' && (
          <h3>Test of Tab 4</h3>
        )}
        {activeTab === 'testtab5' && (
          <h3>Test of Tab 5</h3>
        )}
      </div>

      <button className="btn-calculate" onClick={calculateTotal}>Calculate</button>
      <div className="result">Total Cost for the Month: {totalCost}</div>
    </div>


  );
}

export default App;