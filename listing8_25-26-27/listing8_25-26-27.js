const post = { id: '1' };
const comment = { id: '1' };

localStorage.setItem(`/posts/${post.id}`, post);
localStorage.setItem(`/comments/${comment.id}`, comment);

function getAllKeys() {
  return Object.keys(localStorage);
}

function getAllKeysAndValues() {
  return getAllKeys()
    .reduce((obj, str) => { 
      obj[str] = localStorage.getItem(str); 
      return obj;
    }, {});
}

function getNamespaceItems(namespace) {
  return getAllKeys().filter(key => key.startsWith(namespace));
}

function expensiveWork() {
  return 'result-data';
}

// subsequent calls with the same argument will fetch the memoized result
function memoizedExpensiveOperation(data) {
  console.log('Ruslan data start');
  console.log(data);
  console.log('Ruslan data end');
  const key = `/memoized/${JSON.stringify(data)}`;
  console.log('Ruslan key start');
  console.log(key);
  console.log('Ruslan key end');

  const memoizedResult = localStorage.getItem(key);

  // if (memoizedResult != null) return memoizedResult;
  // do expensive work
  const result = expensiveWork(data);
  // save result to localStorage, never calculate again
  console.log('Ruslan result start');
  console.log(result);
  console.log('Ruslan result end');

  localStorage.setItem(key, result);
  return result;
}

memoizedExpensiveOperation('example');
console.log(getNamespaceItems('/memoized'));
console.log(getNamespaceItems('/comments'));

