

export const billListData = {
  expense: [
    {
      type: 'foods',
      name: "餐饮",
      list: [
        { type: 'food', name: '餐费' },
        { type: 'drinks', name: '酒水饮料' },
        { type: 'dessert', name: '甜品零食' }
      ]
    }, {
      type: 'taxi',
      name: "交通",
      list: [
        { type: 'taxi', name: '出租车' },
      ]
    }, {
      type: 'recreation',
      name: "娱乐",
      list: [
        { type: 'game', name: '游戏' },
      ]
    }
  ],
  income: [
    {
      type: 'professional',
      name: "职业收入",
      list: [
        { type: 'salary', name: '工资' },
        { type: 'bonus', name: '奖金' }
      ]
    }, {
      type: 'other',
      name: "其他收入",
      list: [
        { type: 'gift', name: '礼金' },
        { type: 'investment', name: '投资回报' }
      ]
    }
  ]
}

export const billTypeToName = Object.keys(billListData).reduce((prev, key) => {
  billListData[key].forEach(bill => {
    bill.list.forEach(item => {
      prev[item.type] = item.name;
    });
  });
  return prev;
}, {});