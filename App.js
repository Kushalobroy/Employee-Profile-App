import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {  Button } from 'react-native';
import EmployeeList from './EmployeeList';
import axios from 'axios';
import SingleCardView from './SingleCardView';
export default function App() {
  const [data, setData] = useState([]);
  const [singleCardView, setSingleCardView] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://mocki.io/v1/3a4b56bd-ad05-4b12-a181-1eb9a4f5ac8d');
      const employees = response.data;

    // Create a map to store employees by id
    const employeesById = new Map();
    employees.forEach((employee) => {
      employeesById.set(employee.id, employee);
    });

    // Update each employee to include manager's name
    employees.forEach((employee) => {
      if (employee.parentId && employeesById.has(employee.parentId)) {
        employee.manager = employeesById.get(employee.parentId).name;
      }
    });

    setData(employees);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const toggleView = () => {
    setSingleCardView(!singleCardView);
  };

  const onSelectEmployee = (employee) => {
    setSelectedEmployee(employee);
  };

  return (
    <View>
      {!singleCardView ? (
        <EmployeeList data={data} />
      ) : (
        <SingleCardView employee={selectedEmployee} />
      )}
      <Button title={singleCardView ? 'Switch to List View' : 'Switch to Single Card View'} onPress={toggleView} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
