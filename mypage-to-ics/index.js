import App from 'app';

// JavaScript dependencies
const dependencies = {
  "moment": "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.3/moment.min.js",
  "ics": "https://cdn.rawgit.com/angeloashmore/ics-js/master/ics.es5.min.js"
};

// Load dependencies and run the app
$.getScript(dependencies["moment"], () => {
  $.getScript(dependencies["ics"], () => {
    const app = new App();
    app.execute();
  });
});
