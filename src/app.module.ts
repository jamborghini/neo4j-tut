import { Module } from '@nestjs/common';
import { MovieModule } from './module/movie/movie.module';
import { Neo4jModule } from './neo4j/neo4j.module';

@Module({
  imports: [
    Neo4jModule.forRoot({
      scheme: 'neo4j',
      host: 'localhost',
      port: 7687,
      username: 'neo4j',
      password: 'root',
    }),
    MovieModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
