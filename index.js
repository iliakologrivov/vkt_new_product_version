const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios');

async function run() {
  try {
    const data = {
      token: core.getInput('token'),
      product_id: core.getInput('product_id'),
      version_id: 0,
      assembly_id: 0,
      title: core.getInput('title'),
      release_notes: core.getInput('release_notes'),
      visible: core.getInput('visible'),
      set_rft: core.getInput('set_rft'),
    };

    const params_string = JSON.stringify(data, undefined, 2);
    console.log(`params: ${params_string}`);

    const response = await axios.post('https://api.vk.com/method/bugtracker.saveProductVersion', data);
    const response_text = JSON.stringify(response, undefined, 2);
    console.log(`Response: ${response_text}`);

    core.setOutput('version_id', 0);
    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2);
    const eventName = github.context.eventName;
    console.log(`The event name: ${eventName}`);
    console.log(`The event payload: ${payload}`);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
