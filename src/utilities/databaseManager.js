const getUser = () => {
    const existingUser = localStorage.getItem('userId');
    if (existingUser) {
        return existingUser; 
    } else {
        const newUser = 'user-' + new Date().getTime();
        localStorage.setItem('userId', newUser)
        return newUser;
    }
}


const getDataKey = () => {
    const userId = getUser();
    return `emaJohn/carts/${userId}`
}

// push to local storage: a temporary place for database
const getDatabaseCard = () => {
    const dataKey = getDataKey();
    const data = localStorage.getItem(dataKey) || "{}";
    return JSON.parse(data);
}

const addToDatabaseCard = (key, count) => {
    const currentCard = getDatabaseCard();
    currentCard[key] = count;
    localStorage.setItem(getDataKey(), JSON.stringify(currentCard));
}

const removeFromDatabaseCard = key => {
    const currentCard = getDatabaseCard();
    delete currentCard[key];
    localStorage.setItem(getDataKey(), JSON.stringify(currentCard));
}

const processOrder = (card) => {
    localStorage.removeItem(getDataKey());
}


export { addToDatabaseCard, getDatabaseCard, removeFromDatabaseCard, processOrder };


// polyfill to support older browser
const localStorage = window.localStorage || (() => {
  let store = {}
  return {
    getItem(key) {
      return store[key]
    },
    setItem(key, value) {
      store[key] = value.toString()
    },
    clear() {
      store = {}
    }
  };
})()


// end of poly fill