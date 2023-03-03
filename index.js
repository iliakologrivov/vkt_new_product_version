const core = require('@actions/core');
const github = require('@actions/github');

// most @actions toolkit packages have async methods
async function run() {
  try {
    // const token = core.getInput('token');
    // const product_id = core.getInput('product_id');

    // if (github.context.eventName === 'push') {

    core.info(`The event name is: ${github.context.eventName}`)
    core.info(JSON.stringify(github.context.payload));
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




    core.setOutput("version_id", 0);
    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2)
    console.log(`The event payload: ${payload}`);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
