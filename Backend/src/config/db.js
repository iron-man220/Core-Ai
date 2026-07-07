import sql from 'mssql';
import dotenv from 'dotenv';
dotenv.config();

const dbServer = process.env.DB_SERVER || 'localhost';
const [serverHost, instanceName] = dbServer.split('\\');
const dbPort = parseInt(process.env.DB_PORT || '1433', 10);

const createConfig = (host, instance, port) => {
  const cfg = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: host,
    database: process.env.DB_DATABASE,
    options: {
      encrypt: false, // Use true for azure
      trustServerCertificate: true, // Use true for local development
      connectTimeout: 4000,
    }
  };
  if (instance) {
    cfg.options.instanceName = instance;
  } else {
    cfg.port = port;
  }
  return cfg;
};

// Failover configurations sequence
const configsToTry = [
  createConfig('127.0.0.1', instanceName, null),
  createConfig('localhost', instanceName, null),
  createConfig(serverHost, instanceName, null),
  createConfig('127.0.0.1', null, dbPort),
  createConfig(serverHost, null, dbPort)
];

let activePool;

/**
 * Returns a connection pool promise
 * Silently attempts failover connections and caches the working pool
 */
const getPool = async () => {
  if (activePool) return activePool;

  for (let i = 0; i < configsToTry.length; i++) {
    try {
      const pool = await new sql.ConnectionPool(configsToTry[i]).connect();
      activePool = pool;
      return pool;
    } catch (err) {
      // Fail silently to keep the logs clean.
    }
  }

  throw new Error('All SQL Server connection configurations failed. Please make sure that SQLEXPRESS is running and user credentials in .env are correct.');
};

export { sql, getPool };
