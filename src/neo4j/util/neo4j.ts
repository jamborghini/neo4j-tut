import neo4j, { Driver } from 'neo4j-driver';
import { Neo4jConfig } from '../interface/neo4j-config';

export const createDriver = async ({scheme, host, password, username, port}: Neo4jConfig) => {
  const driver: Driver = neo4j.driver(
    `${scheme}://${host}/${port}`,
    neo4j.auth.basic(username, password),
  );

  await driver.verifyConnectivity();

  return driver;
};
