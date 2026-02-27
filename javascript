async function main(){
  // технический метод для остановки времени
  const sleep = async (n) => new Promise((resolve) => setTimeout(resolve, n))

  let counter = 0

  function func(){
      return ++counter
  }
  
  // код тут
  function createCash(fn, ttl) {
    let cachedValue = null;
    let lastUpdate = 0;
    
    return function() {
      const now = Date.now();
      
      if (cachedValue === null || (now - lastUpdate) > ttl) {
        cachedValue = fn();
        lastUpdate = now;
      }
      
      return cachedValue;
    }
  }

  // пример использования
  const myCash = createCash(func, 1000) // функция принимает на вход функцию для вызова, и время через которое значение становится неактуальным

  await sleep(1000)
  console.log(myCash()) // 1
  console.log(myCash()) // 1

  await sleep(3000)
  console.log(myCash()) // 2
  console.log(myCash()) // 2
}

main()