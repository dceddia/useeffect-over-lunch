const items = [
  { id: 'couch', name: 'Comfy Couch', price: 599 },
  { id: 'table', name: 'Kitchen Table', price: 199 },
  { id: 'coffee-maker', name: 'Aeropress', price: 25 },
];

export default function loadItem(id) {
  let timer;

  const promise = new Promise((resolve, reject) => {
    timer = setTimeout(() => {
      const item = items.find((item) => item.id === id);
      if (item) {
        resolve(item);
      } else {
        reject('Item not found');
      }
    }, 1000);
  });

  promise.cancel = () => clearTimeout(timer);
  return promise;
}
