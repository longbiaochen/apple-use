import { runCommand, which } from "./shell.mjs";

const CHECKS = [
  { name: "memo", kind: "cli" },
  { name: "remindctl", kind: "cli" },
  { name: "himalaya", kind: "cli" },
  { name: "osascript", kind: "system" },
  { name: "shortcuts", kind: "system" },
];

function checkTool(name, kind) {
  const path = which(name);
  return {
    name,
    kind,
    installed: Boolean(path),
    path,
  };
}

function checkRemindersStatus() {
  const result = runCommand("remindctl", ["status"]);
  return {
    ok: result.status === 0,
    output: (result.stdout || result.stderr).trim(),
  };
}

function checkNotesStatus() {
  const folderProbe = runCommand("osascript", ["-e", 'tell application "Notes" to get name of first folder']);
  const noteProbe = runCommand(
    "osascript",
    ["-e", 'tell application "Notes" to get name of first note of first folder'],
    { timeout: 4000 },
  );

  return {
    folderProbeOk: folderProbe.status === 0,
    folderProbe: (folderProbe.stdout || folderProbe.stderr).trim(),
    noteProbeOk: noteProbe.status === 0 && !noteProbe.error,
    noteProbe: noteProbe.error?.code === "ETIMEDOUT"
      ? "Timed out while reading note content or note metadata."
      : (noteProbe.stdout || noteProbe.stderr).trim(),
  };
}

function checkMailStatus() {
  const version = runCommand("himalaya", ["--version"]);
  const accounts = runCommand("himalaya", ["account", "list", "--json"]);

  return {
    versionOk: version.status === 0,
    version: (version.stdout || version.stderr).trim(),
    accountsOk: accounts.status === 0,
    accounts: accounts.status === 0
      ? JSON.parse(accounts.stdout)
      : (accounts.stdout || accounts.stderr).trim(),
    executionSurface: "Himalaya",
    reviewSurface: "Apple Mail",
    nativeEdgeSurface: "macos-use",
  };
}

export async function runDoctor() {
  return {
    generatedAt: new Date().toISOString(),
    tools: CHECKS.map((tool) => checkTool(tool.name, tool.kind)),
    reminders: checkRemindersStatus(),
    notes: checkNotesStatus(),
    mail: checkMailStatus(),
  };
}
