export type Notify = {
  id: string;
  title: string;
  createTime: string;
};

export type NotifyDetail = {
  content: string;
} & Notify;

// Test Data
export const notifyData = (): Notify[] => {
  const list: Notify[] = [];
  for (let i = 0; i < 4; i++) {
    list.push({
      id: i.toString(),
      title: 'Test' + i,
      createTime: '2023/06/25 12:00'
    });
  }
  return list;
};
