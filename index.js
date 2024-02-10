#!/usr/bin/env node

global.ADK_PATH = __dirname;

var Program = require("wiz-cliparse");

//Step 1

// Intializing the Program
var prg = new Program(
  "adk",
  "ArrowAI Application Development Kit",
  "[global-options] [command] [command-options] [arguments]",
  "Arrowai Application Development Kit helps you to develop UI Applications for the ArrowAI platform"
);
prg.addOpt("v", "version", "Displays the installed version of adk");

// For UI SDK
var cmdCreateUISdk = prg.addCmd(
  "createuisdk",
  "Create New App with Basic Code",
  "[folder]",
  "Initializes the application and Creates basic code. In case Folder is not given, it will use your current folder (if empty)"
);
cmdCreateUISdk.addOpt("d", "app-dir", "App directory.", { hasArg: true });

var cmdStartUISdk = prg.addCmd("startuisdk", "Run the app on Local Server");
cmdStartUISdk.addOpt("d", "app-dir", "App directory.", { hasArg: true });

// For Channel SDK
var cmdCreateChannelSdk = prg.addCmd(
  "createchannelsdk",
  "Create New App with Basic Code"
);
cmdCreateChannelSdk.addOpt("d", "app-dir", "App directory.", { hasArg: true });

var cmdStartchannelSdk = prg.addCmd(
  "startchannelsdk",
  "Run the app on Local Server"
);
cmdStartchannelSdk.addOpt("d", "app-dir", "App directory.", { hasArg: true });

//For Bot SDK
var cmdCreateBotSdk = prg.addCmd(
  "createbotsdk",
  "Create New App with Basic Code"
);
cmdCreateBotSdk.addOpt("d", "app-dir", "App directory.", { hasArg: true });

var cmdStartBotSdk = prg.addCmd("startbotsdk", "Run the app on Local Server");
cmdStartBotSdk.addOpt("d", "app-dir", "App directory.", { hasArg: true });

//Package Application
const cmdPack = prg.addCmd("package", "Package the Application");
cmdPack.addOpt("d", "app-dir", "App directory.", { hasArg: true });

var cmdCreateBotSdk = prg.addCmd(
  "createfrontendsdk",
  "Create New App with Basic Code"
);
cmdCreateBotSdk.addOpt("d", "app-dir", "App directory.", { hasArg: true });

var cmdStartFrontendSdk = prg.addCmd(
  "startfrontendsdk",
  "Run the app on Local Server"
);
cmdStartFrontendSdk.addOpt("d", "app-dir", "App directory.", { hasArg: true });

var cmdCreateWebChatSdk = prg.addCmd(
  "createwebchatsdk",
  "Create New App with Basic Code"
);
cmdCreateWebChatSdk.addOpt("d", "app-dir", "App directory.", { hasArg: true });

var cmdStartWebChatSdk = prg.addCmd(
  "startwebchatsdk",
  "Run the app on Local Server"
);
cmdStartWebChatSdk.addOpt("d", "app-dir", "App directory.", { hasArg: true });

//Package ApiModule
const cmdModule = prg.addCmd("package", "Package the Application");
cmdModule.addOpt("d", "app-dir", "App directory.", { hasArg: true });

var cmdCreateModuleSdk = prg.addCmd(
  "createapimodulesdk",
  "Create New App with Basic Code"
);
cmdCreateModuleSdk.addOpt("d", "app-dir", "App directory.", { hasArg: true });

var cmdStartModuleSdk = prg.addCmd(
  "startapimodulesdk",
  "Run the app on Local Server"
);
cmdStartModuleSdk.addOpt("d", "app-dir", "App directory.", { hasArg: true });

//Step 2

// Parsing:
let res = null;
try {
  res = prg.parse();
} catch (err) {
  if (err.startsWith("Unrecognized global option")) {
    const opt = err.match(/Unrecognized global option: (.*)./)[1];
    console.error(
      `adk: '${opt}' is not a valid option. Please type 'adk --help' to get the list of supported commands.`
    );
  }
  if (err.startsWith("Unrecognized command")) {
    const cmd = err.match(/Unrecognized command: (.*)./)[1];
    console.error(`adk: '${cmd}' is not a valid command. See 'adk --help'`);
  } else {
    console.error(err);
  }
  process.exit(1);
}

if (res.opts.has("app-dir")) {
  const directory = res.optArg.get("app-dir");
  if (fileUtil.fileExists(directory)) {
    process.chdir(directory);
  } else {
    console.log("The specified path to the directory is not valid.");
    process.exit(1);
  }
}

function executeCLICommand(error) {
  if (error) {
    console.log(error);
    process.exit(1);
  }
  switch (res.cmd) {
    case "createuisdk": {
      require("./lib/cli/createsdk").run(process.cwd(), "ui");
      break;
    }

    case "startuisdk": {
      require("./lib/cli/startuisdk").run(process.cwd());
      break;
    }
    case "createchannelsdk": {
      require("./lib/cli/createsdk").run(process.cwd(), "channel");
      break;
    }
    case "startchannelsdk": {
      require("./lib/cli/startchannelsdk").run(process.cwd());
      break;
    }
    case "createbotsdk": {
      require("./lib/cli/createsdk").run(process.cwd(), "bot");
      break;
    }
    case "startbotsdk": {
      require("./lib/cli/startbotsdk").run(process.cwd());
      break;
    }
    case "createfrontendsdk": {
      require("./lib/cli/createsdk").run(process.cwd(), "element");
      break;
    }
    case "startfrontendsdk": {
      require("./lib/cli/create-element").run(process.cwd());
      break;
    }

    case "createapimodulesdk": {
      require("./lib/cli/createsdk").run(process.cwd(), "module");
      break;
    }
    case "startapimodulesdk": {
      require("./lib/cli/startapimodulesdk").run(process.cwd(), ".env");
      break;
    }
    case "createwebchatsdk": {
      require("./lib/cli/createsdk").run(process.cwd(), "web-chat-element");
      break;
    }
    case "startwebchatsdk": {
      require("./lib/cli/create-webchat-element").run(process.cwd());
      break;
    }
    default:
      console.log("unknown command:" + res.cmd);
    // code block
  }
}
executeCLICommand();
