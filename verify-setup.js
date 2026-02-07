const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('='.repeat(60));
console.log('  DEVELOPMENT ENVIRONMENT VERIFICATION');
console.log('  Generated:', new Date().toLocaleString());
console.log('='.repeat(60));
console.log();

const requirements = {
  git: 2.40, node: 20, npm: 10, express: 5, react: 19, next: 15
};

let allPassed = true;

function checkMajorVersion(name, current, minimum) {
  const majorVersion = parseInt(current.replace('v', '').split('.')[0]);
  const passed = majorVersion >= minimum;
  if (!passed) allPassed = false;
  const status = passed ? 'PASS' : 'FAIL';
  console.log(`${status} - Requires ${minimum}.x or higher, found ${current}`);
  return passed;
}

// Git
console.log('GIT');
console.log('-'.repeat(40));
try {
  const gitVersion = execSync('git --version').toString().trim();
  console.log('Version:', gitVersion);
  const gitUser = execSync('git config --global user.name').toString().trim();
  const gitEmail = execSync('git config --global user.email').toString().trim();
  console.log('User:', gitUser);
  console.log('Email:', gitEmail);
} catch (e) { console.log('FAIL - Git not installed'); allPassed = false; }
console.log();

// Node.js
console.log('NODE.JS');
console.log('-'.repeat(40));
console.log('Version:', process.version);
checkMajorVersion('Node.js', process.version, requirements.node);
console.log();

// npm
console.log('NPM');
console.log('-'.repeat(40));
const npmVersion = execSync('npm --version').toString().trim();
console.log('Version:', npmVersion);
checkMajorVersion('npm', npmVersion, requirements.npm);
console.log();

// Express
console.log('EXPRESS.JS');
console.log('-'.repeat(40));
try {
  const expressPath = path.join(__dirname, 'express-test', 'node_modules', 'express', 'package.json');
  if (fs.existsSync(expressPath)) {
    const expressPkg = require(expressPath);
    console.log('Version:', expressPkg.version);
    checkMajorVersion('Express', expressPkg.version, requirements.express);
  } else { console.log('FAIL - Not found in express-test folder'); allPassed = false; }
} catch (e) { console.log('FAIL - Not installed'); allPassed = false; }
console.log();

// React
console.log('REACT');
console.log('-'.repeat(40));
try {
  const reactPath = path.join(__dirname, 'react-test', 'node_modules', 'react', 'package.json');
  if (fs.existsSync(reactPath)) {
    const reactPkg = require(reactPath);
    console.log('Version:', reactPkg.version);
    checkMajorVersion('React', reactPkg.version, requirements.react);
  } else { console.log('FAIL - Not found in react-test folder'); allPassed = false; }
} catch (e) { console.log('FAIL - Not installed'); allPassed = false; }
console.log();

// Next.js
console.log('NEXT.JS');
console.log('-'.repeat(40));
try {
  const nextPath = path.join(__dirname, 'nextjs-test', 'node_modules', 'next', 'package.json');
  if (fs.existsSync(nextPath)) {
    const nextPkg = require(nextPath);
    console.log('Version:', nextPkg.version);
    checkMajorVersion('Next.js', nextPkg.version, requirements.next);
  } else { console.log('FAIL - Not found in nextjs-test folder'); allPassed = false; }
} catch (e) { console.log('FAIL - Not installed'); allPassed = false; }
console.log();

console.log('='.repeat(60));
if (allPassed) {
  console.log('  ALL CHECKS PASSED - Your environment is ready!');
} else {
  console.log('  SOME CHECKS FAILED - Please review the issues above');
}
console.log('='.repeat(60));