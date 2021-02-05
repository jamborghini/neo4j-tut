import { Inject, Injectable } from '@nestjs/common';
import neo4j, { Driver, Session } from 'neo4j-driver';
import Result from 'neo4j-driver/types/result';
import { Neo4jConfig } from './interface/neo4j-config';
import { NEO4J_CONFIG, NEO4J_DRIVER } from './neo4j.constants';

@Injectable()
export class Neo4jService {
  constructor(
    @Inject(NEO4J_CONFIG) private readonly config: Neo4jConfig,
    @Inject(NEO4J_DRIVER) private readonly driver: Driver,
  ) {}

  async getDriver(): Promise<Driver> {
    return this.driver;
  }

  async getConfig(): Promise<Neo4jConfig> {
    return this.config;
  }

  async getReadSession(database?): Promise<Session> {
    return this.driver.session({
      database: database || this.config.database,
      defaultAccessMode: neo4j.session.READ,
    });
  }

  async getWriteSession(database?): Promise<Session> {
    return this.driver.session({
      database: database || this.config.database,
      defaultAccessMode: neo4j.session.WRITE,
    });
  }

  async read(cypher: string, params?: Record<string, any>, database?: string): Promise<Result> {
    const session = await this.getReadSession(database);
    return session.run(cypher, params);
  }

  async write(cypher: string, params?: Record<string, any>, database?: string): Promise<Result> {
    const session = await this.getWriteSession(database);
    return session.run(cypher, params);
  }
}
