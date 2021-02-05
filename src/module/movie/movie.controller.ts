import { Controller, Get } from '@nestjs/common';
import { Neo4jService } from '../../neo4j/neo4j.service';

interface Actor {
  name?: string;
}

interface Movie {
  title?: string;
}

interface Result {
  actor: any;
  movies: Movie[];
}

@Controller('movie')
export class MovieController {
  constructor(private readonly neo4jService: Neo4jService) {}

  @Get()
  async temp(): Promise<Result> {
    const { records, summary } = await this.neo4jService.read(
      `MATCH (actor:Person{name:"Keanu Reeves"})-[a:ACTED_IN]-(movie:Movie) RETURN actor,a,movie`,
    );

    return {
      // @ts-ignore
      actor: records[0]._fields[0].properties.name as Actor,
      movies: records.map(x => x.map(y => y)) as Movie[],
    };
  }
}
