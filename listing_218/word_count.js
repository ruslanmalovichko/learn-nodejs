const fs = require('fs');
const tasks = [];
const wordCounts = {};
const filesDir = './text';
let completedTasks = 0;

function checkIfComplete() {
  completedTasks++;
  if (completedTasks === tasks.length) { // When all tasks finished
    for (let index in wordCounts) {
      console.log(`${index}: ${wordCounts[index]}`); // Print all word counts
    }
  }
}

function addWordCount(word) {
  wordCounts[word] = (wordCounts[word]) ? wordCounts[word] + 1 : 1; // Prepare object {word: COUNT_NUMBER}
}

function countWordsInText(text) {
  const words = text
    .toString()
    .toLowerCase()
    .split(/\W+/)
    .sort(); // Put words in array
  words
    .filter(word => word) // Remove empty words
    .forEach(word => addWordCount(word));
}

fs.readdir(filesDir, (err, files) => {
  if (err) throw err;
  files.forEach(file => { // Get each file from files
    const task = (file => {
      return () => {
        fs.readFile(file, (err, text) => { // Get text from text file
          // console.log(file);
          if (err) throw err;
          // console.log(text);
          countWordsInText(text); // Call countWordsInText and send text
          checkIfComplete(); // Call checkIfComplete
        });
      };
    })(`${filesDir}/${file}`); // Function remembers the file
    tasks.push(task);
  });
  tasks.forEach((task) => { // Get each task from tasks
    task(); // Call task
  });
});

