import readLights from './common/readLights'

const syncLights = context => {
  readLights(context)
    .fork(
      err => { console.error('bad stuff', err)},
      lights => { console.log('done', lights) }
    )
}

export default syncLights
