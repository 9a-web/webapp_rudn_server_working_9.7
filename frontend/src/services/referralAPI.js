/**
 * API сервис для работы с реферальной системой
 */

import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 
                     (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:8001');

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Получить реферальный код пользователя
 * @param {number} telegram_id - ID пользователя в Telegram
 * @returns {Promise} - { referral_code, referral_link, bot_username }
 */
export const getReferralCode = async (telegram_id) => {
  const response = await api.get(`/referral/code/${telegram_id}`);
  return response.data;
};

/**
 * Получить статистику по рефералам
 * @param {number} telegram_id - ID пользователя в Telegram
 * @returns {Promise} - статистика рефералов
 */
export const getReferralStats = async (telegram_id) => {
  const response = await api.get(`/referral/stats/${telegram_id}`);
  return response.data;
};

/**
 * Получить дерево рефералов
 * @param {number} telegram_id - ID пользователя в Telegram
 * @returns {Promise} - дерево рефералов
 */
export const getReferralTree = async (telegram_id) => {
  const response = await api.get(`/referral/tree/${telegram_id}`);
  return response.data;
};

export default {
  getReferralCode,
  getReferralStats,
  getReferralTree,
};
