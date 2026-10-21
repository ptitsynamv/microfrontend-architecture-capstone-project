import { initFederation } from '@angular-architects/native-federation';

// Read the remote URLs at runtime, then start Angular with the federation loader.
initFederation('federation.manifest.json', {
  hostRemoteEntry: { url: './remoteEntry.json' },
})
  .then(async (federation) => {
    const { bootstrap } = await import('./bootstrap');
    await bootstrap(federation.loadRemoteModule);
  })
  .catch((err) => console.error(err));
