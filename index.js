const core = require('@actions/core');
const github = require('@actions/github');


function createTitle() {
  switch (github.context.eventName) {
    case 'push':
      return github.context.payload.head_commit.id;
  }
}

function createReleaseNotes() {
  switch (github.context.eventName) {
    case 'push':
      return github.context.payload.head_commit.message;
  }
}

async function run() {
  try {
    const params = {
      token: core.getInput('token'),
      product_id: core.getInput('product_id'),
      version_id: 0,
      assembly_id: 0,
      title: core.getInput('title'),
      release_notes: core.getInput('release_notes'),
      visible: '',
      set_rft: '',
    };
    if (params.title.trim().length < 1) {
      params.title = createTitle();
    }

    if (params.release_notes.trim().length < 1) {
      params.release_notes = createReleaseNotes();
    }

    // if (github.context.eventName === 'push') {

    // core.info(`The event name is: ${github.context.eventName}`)
    // core.info(JSON.stringify(github.context.payload));
    // }

    // let PARAMS = {
    //   token: core.getInput('token'),
    //   product_id: core.getInput('product_id'),
    //   version_id: 0,
    //   assembly_id: 0,
    //   title: '',
    //   release_notes: '',
    //   visible: '',
    //   set_rft: '',
    // };
    //
    // fetch('https://api.vk.com/method/bugtracker.saveProductVersion', {})
    const params_string = JSON.stringify(params, undefined, 2);
    console.log(`params: ${params_string}`);


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
