import { AppDetails } from '@/Config';
import * as internalActions from '@/store/internalActions';
import * as Storage from '@/utils/AsyncStorage';
import { isEmpty } from 'lodash';
import axios from 'axios';
const BASE_URI = 'http://137.184.113.150:3003/api/'
// const BASE_URI = 'http://192.168.3.9:3003/api/'

export const getTasks = async ({state}) => {
  try {
    const res = await axios.get(BASE_URI + 'tasks');
    console.log(res.data);
    state.tasks = res.data;
  } catch (e) {
    console.log(e)
  }
}

export const getUsers = async ({state}) => {
  try {
    const res = await axios.get(BASE_URI + 'users');
    console.log(res.data);
    state.users = res.data;
  } catch (e) {
    console.log(e)
  }
}

export const createUser = async ({state}, data) => {
  try {
    const res = await axios.post(BASE_URI + 'add_user', data);
    console.log(res.data, '============ createUser');
    if (res.data) {
      state.currentUser = res.data;
    }
  } catch (e) {
    console.log(e)
  }
}

export const getCurrentUser = async ({state}) => {
  try {
    if (state.currentUser?.wallet) {
      const res = await axios.post(BASE_URI + 'get_user', {wallet: state.currentUser?.wallet});
      if (res.data) {
        state.currentUser = res.data;
      }
    }
  } catch (e) {
    console.log(e)
  }
}

export const completeTask = async ({state, actions}, data) => {
  try {
    const res = await axios.post(BASE_URI + 'complete_task', data);
    console.log(res.data);
    await actions.getTasks();
    await actions.createUser({wallet: state.currentUser?.wallet})
  } catch (e) {
    console.log(e)
  }
}

export const setWeekAmount = async ({state}, amount) => {
  try {
    await axios.post(BASE_URI + 'set_week_amount', {amount: amount, createdAt: new Date().getTime()});
  } catch (e) {
    console.log(e)
  }
}

export const getWeekAmount = async ({state}) => {
  try {
    const res = await axios.get(BASE_URI + 'get_week_amount');
    console.log(res, 'res');
    state.weekAmount = res.data?.amount
  } catch (e) {
    console.log(e)
  }
}

