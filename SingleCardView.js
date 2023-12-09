import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import EmployeeCard from './EmployeeCard';

const SingleCardView = ({ employee }) => {
  return (
    <View style={styles.container}>
      <EmployeeCard employee={employee} />
      <Text>Reporting Manager: {employee.manager}</Text>
      <Text>Subordinates: {employee.subordinates.join(', ')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});

export default SingleCardView;
