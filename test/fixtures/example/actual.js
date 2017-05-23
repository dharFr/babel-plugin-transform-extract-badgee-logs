import badgee from 'badgee';

badgee.log('Single param log');
badgee.log('Multiple', 'params', 'log', hey[0]);
const logger = badgee.get('logger');

function foo() {
  logger.log("logging to logger");
  blah();
}