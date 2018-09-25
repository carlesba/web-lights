import FSM from 'models/FSM'
const Failure = FSM('Failure', [
 'NoInternet',
 'CannotFindLocalConfig',
 'CannotCreateApp',
 'CannotSyncHue',
 'PressLinkButton'
])

export default Failure
