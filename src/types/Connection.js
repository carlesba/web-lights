import Union from 'models/Union'

const Connection = Union('Connection', [
  'Connected',
  'PressButton',
  'Disconnected'
])

export default Connection
