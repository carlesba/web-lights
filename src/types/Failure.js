import FSM from 'models/FSM'
const Failure = FSM([
 'NoInternet',
 'CannotFindLocalConfig',
 'CannotCreateApp',
 'CannotSyncHue',
 'PressLinkButton'
])

export default Failure
