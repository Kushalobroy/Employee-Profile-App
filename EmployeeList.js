import React from 'react';
import { FlatList } from 'react-native';
import EmployeeCard from './EmployeeCard';

const EmployeeList = ({ data }) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <EmployeeCard employee={item} />}
    />
  );
};

export default EmployeeList;
