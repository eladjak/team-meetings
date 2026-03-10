export const ROOMS = [
  {
    id: 1,
    name: 'חדר ישיבות ראשי',
    capacity: 20,
    equipment: [1, 2], // מקרן ומסך
    location: 'קומה 2',
    description: 'חדר ישיבות גדול עם ציוד אורקולי מלא'
  },
  {
    id: 2,
    name: 'חדר צוות א׳',
    capacity: 8,
    equipment: [2], // מסך
    location: 'קומה 1',
    description: 'חדר ישיבות קטן לפגישות צוות'
  },
  {
    id: 3,
    name: 'חדר סטודיו',
    capacity: 4,
    equipment: [3, 4], // מצלמה ותאורה
    location: 'קומה 1',
    description: 'חדר מותאם להקלטות וצילומים'
  },
  {
    id: 4,
    name: 'חדר שקט',
    capacity: 2,
    equipment: [],
    location: 'קומה 2',
    description: 'חדר קטן לשיחות אישיות'
  }
];

export default ROOMS; 