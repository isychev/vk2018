import { Pedometer } from 'expo'

import { Pedometer } from "expo";

console.log('was in componentDidMount 123')
console.log(Pedometer.isAvailableAsync())
Pedometer.watchStepCount(result => {
  console.log(result);
});