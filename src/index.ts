import buildServer from './server';

async function main() {
  try {
    const server = await buildServer();
    await server.listen({ port: 8080 });
    console.log('Server listening at http://localhost:8080');
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

void main();
