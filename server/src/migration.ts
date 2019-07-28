import { fetchSounds, migrateSoundDB } from './datastore'

export const migrateSoundDatabase = async () => {
  try {
    await fetchSounds()
  }
  catch (e) {
    console.log('Migrating sound DB')
    await migrateSoundDB()
  }
}
