const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios');

async function run() {
  try {
    const data = {
      token: process.env.API_TOKEN,
      product_id: Number(core.getInput('product_id')),
      version_id: -1,
      assembly_id: 0,
      title: core.getInput('title'),
      release_notes: core.getInput('release_notes'),
      visible: core.getBooleanInput('visible') ? 1 : 0,
      set_rft: core.getBooleanInput('set_rft') ? 1 : 0,
      v: 5.130
    };

    const params_string = JSON.stringify(data, undefined, 2);
    console.log(`params: ${params_string}`);

    const response = await axios.get('https://api.who2who.online/method/bugtracker.saveProductVersion', {params: data});
    if (response.data.error) {
      throw new Error(response.data.error.error_msg);
    }

    const response_text = JSON.stringify(response.data, undefined, 2);
    console.log(`Response: ${response_text}`);

    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2);
    const eventName = github.context.eventName;
    console.log(`The event name: ${eventName}`);
    console.log(`The event payload: ${payload}`);

    core.setOutput('version_id', 0);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
