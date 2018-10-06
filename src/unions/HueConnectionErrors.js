import FSM from 'models/FSM'

export default FSM(
  'HueConnectionErros',
  ['PressButton', 'BadRequest', 'NoInternet']
)
