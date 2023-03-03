const core = require('@actions/core');
const github = require('@actions/github');
const fetch = require('./fetch');
const https = require('https');

async function run() {
  try {
    const params = {
      token: core.getInput('token'),
      product_id: core.getInput('product_id'),
      version_id: 0,
      assembly_id: 0,
      title: core.getInput('title'),
      release_notes: core.getInput('release_notes'),
      visible: core.getInput('visible'),
      set_rft: core.getInput('set_rft'),
    };

    const params_string = JSON.stringify(params, undefined, 2);
    console.log(`params: ${params_string}`);

    const response = https.get('https://api.vk.com/method/bugtracker.saveProductVersion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(params),
    });
    core.debug(`Response: ${response}`);


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
