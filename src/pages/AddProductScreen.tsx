import React, { useState, useContext } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ProductContext } from '../context/ProductContext';
import AppLayout from '../layouts/AppLayout';
import { Picker } from '@react-native-picker/picker';

const AddProductScreen = ({ navigation }: any) => {
  const { addProduct } = useContext(ProductContext);

  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [unit, setUnit] = useState('pcs');
  const [type, setType] = useState<'fridge' | 'freezer' | ''>('');
  const [bestBefore, setBestBefore] = useState<Date>(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleAdd = () => {
    let newErrors: { [key: string]: string } = {};

    if (!name.trim()) newErrors.name = "You haven't filled in the product name";
    if (!amount.trim()) newErrors.amount = "You haven't filled in the amount";
    if (!type) newErrors.type = "You haven't selected fridge or freezer";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    addProduct({
      name,
      amount: amount + ' ' + unit,
      bestBefore: bestBefore.toISOString().split('T')[0],
      type: type as 'fridge' | 'freezer',
    });

    setName('');
    setAmount('');
    setUnit('pcs');
    setType('');
    setBestBefore(new Date());
    setErrors({});
    navigation.navigate('Home');
  };

  return (
    <AppLayout title='FRIDGER'>
      <Text style={styles.title}>Add Product</Text>

      <TextInput
        style={styles.input}
        placeholder='Product name'
        value={name}
        onChangeText={(text) => {
          setName(text);
          setErrors((e) => ({ ...e, name: '' }));
        }}
      />
      {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flex: 1 }}>
          <TextInput
            style={[styles.input, { marginVertical: 0 }]}
            placeholder='Amount'
            value={amount}
            onChangeText={(text) => {
              setAmount(text);
              setErrors((e) => ({ ...e, amount: '' }));
            }}
            keyboardType='numeric'
          />
        </View>

        <View style={[styles.pickerContainer, { width: 130 }]}>
          <Picker
            selectedValue={unit}
            onValueChange={(itemValue) => setUnit(itemValue)}
            style={styles.picker}
            mode='dropdown'>
            <Picker.Item label='pcs' value='pcs' />
            <Picker.Item label='gram' value='g' />
            <Picker.Item label='dl' value='dl' />
            <Picker.Item label='ml' value='ml' />
            <Picker.Item label='kg' value='kg' />
          </Picker>
        </View>
      </View>

      {errors.amount && <Text style={styles.errorText}>{errors.amount}</Text>}

      <View style={styles.typeContainer}>
        <TouchableOpacity
          style={[styles.typeButton, type === 'fridge' && styles.selectedType]}
          onPress={() => {
            setType('fridge');
            setErrors((e) => ({ ...e, type: '' }));
          }}>
          <Text style={styles.typeText}>Fridge</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.typeButton, type === 'freezer' && styles.selectedType]}
          onPress={() => {
            setType('freezer');
            setErrors((e) => ({ ...e, type: '' }));
          }}>
          <Text style={styles.typeText}>Freezer</Text>
        </TouchableOpacity>
      </View>
      {errors.type && <Text style={styles.errorText}>{errors.type}</Text>}

      <TouchableOpacity
        onPress={() => setShowPicker(true)}
        style={styles.dateButton}>
        <Text style={styles.dateText}>
          Best before: {bestBefore.toLocaleDateString('en-GB')}
        </Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={bestBefore}
          mode='date'
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(event, selectedDate) => {
            setShowPicker(false);
            if (selectedDate) setBestBefore(selectedDate);
          }}
        />
      )}

      <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity>
    </AppLayout>
  );
};

export default AddProductScreen;

const styles = StyleSheet.create({
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  input: {
    backgroundColor: '#F2F2F2',
    height: 50,
    borderRadius: 5,
    marginVertical: 6,
    paddingHorizontal: 10,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
  },
  pickerContainer: {
    backgroundColor: '#F2F2F2',
    marginLeft: 8,
    borderRadius: 5,
    width: 130,
    height: 50,
    justifyContent: 'center',
  },
  picker: {
    height: 100,
    width: '100%',
    color: '#000',
    padding: 0,
    margin: 0,
    fontSize: 16,
  },
  typeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 12,
  },
  typeButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#bbb',
    width: '40%',
    alignItems: 'center',
  },
  selectedType: {
    backgroundColor: '#63A621',
  },
  typeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },

  dateButton: {
    backgroundColor: '#F2F2F2',
    padding: 10,
    borderRadius: 5,
    marginVertical: 6,
  },
  dateText: {
    fontSize: 16,
    color: '#333',
  },
  addButton: {
    backgroundColor: '#F2A74B',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  addButtonText: { fontSize: 18, fontWeight: 'bold' },
  errorText: {
    color: '#F20530',
    marginBottom: 6,
    marginLeft: 4,
  },
});
